import { createServerFn } from "@tanstack/react-start";

/** Public read of active products — uses admin client server-side (RLS bypassed)
 *  but only returns the safe public-facing columns. No auth required. */
export const listPublicProducts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("products")
      .select(
        "id, slug, category, name, short_description, description, rules, warranty, price, image, banner_image, stock, is_active, is_sold_out, delivery_type, variations, data, sort_order"
      )
      .eq("is_active", true)
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { products: data ?? [] };
  }
);
