import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "./admin-bootstrap.server";

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden: admin role required");
}

/** Ensures the bootstrap admin user exists and has the admin role.
 *  Safe to call on the /auth page (no auth required). Idempotent. */
export const ensureAdminBootstrap = createServerFn({ method: "POST" }).handler(
  async () => {
    const admin = await getAdmin();

    // Look up the user by email
    let userId: string | null = null;
    const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const found = list?.users?.find((u: any) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    if (found) {
      userId = found.id;
    } else {
      const { data: created, error } = await admin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,
      });
      if (error) throw new Error(`Falha ao criar admin: ${error.message}`);
      userId = created.user?.id ?? null;
    }
    if (!userId) throw new Error("Não foi possível obter o ID do admin");

    // Ensure admin role
    const { data: existingRole } = await admin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!existingRole) {
      await admin.from("user_roles").insert({ user_id: userId, role: "admin" });
    }

    return { ok: true };
  }
);

export const listAllProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const admin = await getAdmin();
    const { data, error } = await admin
      .from("products")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { products: data ?? [] };
  });

type ProductPayload = {
  id?: string;
  slug: string;
  category: "games" | "streaming";
  name: string;
  short_description?: string;
  description?: string;
  rules?: string;
  warranty?: string;
  price: number;
  image?: string;
  banner_image?: string;
  stock?: number;
  is_active?: boolean;
  is_sold_out?: boolean;
  delivery_type?: string;
  variations?: any[];
  data?: Record<string, any>;
  sort_order?: number;
};

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: ProductPayload) => {
    if (!d || typeof d !== "object") throw new Error("Payload inválido");
    if (!d.slug || !d.name || !d.category) throw new Error("slug, name e category são obrigatórios");
    if (!["games", "streaming"].includes(d.category)) throw new Error("category inválida");
    if (typeof d.price !== "number" || d.price < 0) throw new Error("price inválido");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const admin = await getAdmin();
    const row = {
      slug: data.slug,
      category: data.category,
      name: data.name,
      short_description: data.short_description ?? "",
      description: data.description ?? "",
      rules: data.rules ?? "",
      warranty: data.warranty ?? "",
      price: data.price,
      image: data.image ?? "",
      banner_image: data.banner_image ?? "",
      stock: data.stock ?? 0,
      is_active: data.is_active ?? true,
      is_sold_out: data.is_sold_out ?? false,
      delivery_type: data.delivery_type ?? "auto",
      variations: data.variations ?? [],
      data: data.data ?? {},
      sort_order: data.sort_order ?? 0,
    };
    if (data.id) {
      const { data: updated, error } = await admin
        .from("products")
        .update(row)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { product: updated };
    }
    const { data: inserted, error } = await admin
      .from("products")
      .upsert(row, { onConflict: "slug" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { product: inserted };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => {
    if (!d?.id) throw new Error("id obrigatório");
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const admin = await getAdmin();
    const { error } = await admin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Seeds the catalog with all current games + streaming products from static files.
 *  Skips slugs that already exist (does not overwrite admin edits). */
export const seedCatalog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const admin = await getAdmin();
    const { games } = await import("./games");
    const { streamingProducts } = await import("./streaming");

    const { data: existing } = await admin.from("products").select("slug");
    const existingSlugs = new Set((existing ?? []).map((r: any) => r.slug));

    const rows: any[] = [];
    let order = 0;

    for (const g of games as any[]) {
      if (existingSlugs.has(g.slug)) continue;
      const priceNum = Number(String(g.discountedPrice).replace(/[^\d,.-]/g, "").replace(",", "."));
      const origNum = Number(String(g.originalPrice).replace(/[^\d,.-]/g, "").replace(",", "."));
      rows.push({
        slug: g.slug,
        category: "games",
        name: g.name,
        short_description: g.description ?? "",
        description: g.about ?? "",
        rules: "",
        warranty: "",
        price: isFinite(priceNum) ? priceNum : 0,
        image: g.cover ?? "",
        banner_image: g.cover ?? "",
        stock: g.stock ?? 0,
        is_active: true,
        is_sold_out: (g.stock ?? 0) === 0,
        delivery_type: "auto",
        variations: [],
        data: { game: { ...g, originalNumber: origNum } },
        sort_order: order++,
      });
    }

    order = 0;
    for (const s of streamingProducts) {
      if (existingSlugs.has(s.slug)) continue;
      const minPrice = s.variations.reduce(
        (m, v) => (v.stock > 0 && v.price > 0 ? Math.min(m, v.price) : m),
        Number.POSITIVE_INFINITY
      );
      const totalStock = s.variations.reduce((a, v) => a + (v.stock ?? 0), 0);
      rows.push({
        slug: s.slug,
        category: "streaming",
        name: s.name,
        short_description: s.tagline,
        description: "",
        rules: "",
        warranty: "",
        price: isFinite(minPrice) ? minPrice : 0,
        image: s.cover,
        banner_image: s.cover,
        stock: totalStock,
        is_active: true,
        is_sold_out: totalStock === 0,
        delivery_type: "auto",
        variations: s.variations.map((v) => ({
          id: v.id,
          name: v.name,
          price: v.price,
          stock: v.stock,
          isActive: true,
        })),
        data: {
          streaming: {
            brand: s.brand,
            glyph: s.glyph,
            originalPrice: s.originalPrice,
          },
        },
        sort_order: order++,
      });
    }

    if (rows.length === 0) return { inserted: 0, skipped: existingSlugs.size };
    const { error } = await admin.from("products").insert(rows);
    if (error) throw new Error(error.message);
    return { inserted: rows.length, skipped: existingSlugs.size };
  });

/** Allows the admin to change their own password from the panel. */
export const changeAdminPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { newPassword: string }) => {
    if (!d?.newPassword || d.newPassword.length < 8) {
      throw new Error("Senha deve ter no mínimo 8 caracteres");
    }
    return d;
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const admin = await getAdmin();
    const { error } = await admin.auth.admin.updateUserById(context.userId, {
      password: data.newPassword,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
