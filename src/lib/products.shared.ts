// Shared types & mappers used by both client and server modules.
import type { Game } from "./games";

export type ProductCategory = "games" | "streaming";

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
}

export interface ProductRow {
  id: string;
  slug: string;
  category: ProductCategory;
  name: string;
  short_description: string;
  description: string;
  rules: string;
  warranty: string;
  price: number;
  image: string;
  banner_image: string;
  stock: number;
  is_active: boolean;
  is_sold_out: boolean;
  delivery_type: string;
  variations: ProductVariation[];
  // Rich data preserved from seed (about/tags/req/trailer/bundle/etc.)
  // Stored as { game?: Game-like, streaming?: { brand, glyph, originalPrice, ... } }
  data: Record<string, any>;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const toBRL = (n: number) =>
  `R$ ${Number(n).toFixed(2).replace(".", ",")}`;

const pct = (orig: number, now: number) =>
  `${Math.max(0, Math.round((1 - now / Math.max(orig, 0.01)) * 100))}%`;

export function rowToGame(r: ProductRow): Game & { isSoldOut: boolean; isActive: boolean } {
  const seed: any = r.data?.game ?? {};
  const original = Number(seed.originalNumber ?? r.price);
  return {
    id: r.slug,
    slug: r.slug,
    name: r.name,
    originalPrice: toBRL(original),
    discountedPrice: toBRL(r.price),
    discount: pct(original, r.price),
    cover: r.image || seed.cover || "",
    description: r.short_description || seed.description || "",
    about: r.description || seed.about || "",
    tags: seed.tags ?? [],
    rating: seed.rating ?? "Livre",
    platform: seed.platform ?? "PC",
    minRequirements: seed.minRequirements ?? "",
    recommendedRequirements: seed.recommendedRequirements ?? "",
    minReq: seed.minReq ?? { os: "", cpu: "", ram: "", gpu: "", storage: "" },
    recReq: seed.recReq ?? { os: "", cpu: "", ram: "", gpu: "", storage: "" },
    delivery: seed.delivery ?? "Envio automático.",
    trailer: seed.trailer,
    trailerVideo: seed.trailerVideo,
    trailerIframe: seed.trailerIframe,
    categories: seed.categories ?? ["popular"],
    stock: r.stock,
    bundle: seed.bundle,
    isSoldOut: r.is_sold_out,
    isActive: r.is_active,
  } as any;
}

export interface StreamingProductView {
  id: string;
  slug: string;
  name: string;
  cover: string;
  tagline: string;
  originalPrice: number;
  brand: string;
  glyph: string;
  variations: { id: string; name: string; price: number; stock: number }[];
  description: string;
  rules: string;
  warranty: string;
  isActive: boolean;
  isSoldOut: boolean;
}

export function rowToStreaming(r: ProductRow): StreamingProductView {
  const seed: any = r.data?.streaming ?? {};
  return {
    id: r.slug,
    slug: r.slug,
    name: r.name,
    cover: r.image || seed.cover || "",
    tagline: r.short_description || `${r.name} com entrega automática.`,
    originalPrice: Number(seed.originalPrice ?? r.price * 2),
    brand: seed.brand ?? "#222",
    glyph: seed.glyph ?? r.name.slice(0, 2).toUpperCase(),
    variations: (r.variations ?? []).map((v) => ({
      id: v.id,
      name: v.name,
      price: Number(v.price),
      stock: Number(v.stock),
    })),
    description: r.description,
    rules: r.rules,
    warranty: r.warranty,
    isActive: r.is_active,
    isSoldOut: r.is_sold_out,
  };
}
