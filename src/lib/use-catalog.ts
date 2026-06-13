import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo } from "react";
import { listPublicProducts } from "@/lib/products.functions";
import {
  streamingProducts as staticStreaming,
  type StreamingProduct,
} from "@/lib/streaming";
import { games as staticGames } from "@/lib/games";
import type { Game } from "@/lib/games";

function parseNumber(v: unknown, fallback = 0): number {
  if (typeof v === "number") return v;
  const n = Number(String(v ?? "").replace(/[^\d.,-]/g, "").replace(",", "."));
  return isFinite(n) ? n : fallback;
}

function toBRL(n: number) {
  return `R$ ${n.toFixed(2).replace(".", ",")}`;
}

function rowToStreaming(r: any): StreamingProduct {
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
    variations: (r.variations ?? []).map((v: any) => ({
      id: v.id,
      name: v.name,
      price: Number(v.price),
      stock: Number(v.stock),
    })),
  };
}

function rowToGame(r: any): Game {
  const seed: any = r.data?.game ?? {};
  const price = Number(r.price);
  const original = Number(seed.originalNumber ?? price);
  const discount = `${Math.max(0, Math.round((1 - price / Math.max(original, 0.01)) * 100))}%`;
  return {
    id: r.slug,
    slug: r.slug,
    name: r.name,
    originalPrice: toBRL(original),
    discountedPrice: toBRL(price),
    discount,
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
    stock: Number(r.stock ?? 0),
    bundle: seed.bundle,
  } as Game;
}

/** Returns the merged catalog: DB rows take precedence; static items not in DB remain. */
export function useCatalog() {
  const fetcher = useServerFn(listPublicProducts);
  const q = useQuery({
    queryKey: ["public-products"],
    queryFn: () => fetcher(),
    staleTime: 30_000,
  });

  return useMemo(() => {
    const rows: any[] = (q.data as any)?.products ?? [];
    const dbStreaming = rows.filter((r) => r.category === "streaming");
    const dbGames = rows.filter((r) => r.category === "games");

    // STREAMING merge
    const dbStreamingSlugs = new Set(dbStreaming.map((r) => r.slug));
    const mergedStreaming: (StreamingProduct & { isSoldOut: boolean })[] = [
      ...dbStreaming.map((r) => ({
        ...rowToStreaming(r),
        isSoldOut: r.is_sold_out || (r.variations ?? []).every((v: any) => Number(v.stock) === 0),
      })),
      // keep static items only when DB has no copy (first load before seed/import)
      ...(dbStreaming.length === 0
        ? staticStreaming.map((s) => ({
            ...s,
            isSoldOut: s.variations.every((v) => v.stock === 0),
          }))
        : []
      ).filter((s) => !dbStreamingSlugs.has(s.slug)),
    ];

    // GAMES merge — same approach
    const dbGameSlugs = new Set(dbGames.map((r) => r.slug));
    const mergedGames: (Game & { isSoldOut: boolean })[] = [
      ...dbGames.map((r) => ({
        ...rowToGame(r),
        isSoldOut: r.is_sold_out || Number(r.stock ?? 0) === 0,
      })),
      ...(dbGames.length === 0
        ? staticGames.map((g) => ({ ...g, isSoldOut: (g.stock ?? 0) === 0 }))
        : []
      ).filter((g) => !dbGameSlugs.has(g.slug)),
    ];

    return {
      streaming: mergedStreaming,
      games: mergedGames,
      findStreaming: (id: string) =>
        mergedStreaming.find((p) => p.id === id || p.slug === id),
      findGame: (id: string) =>
        mergedGames.find((g) => g.id.toString() === id || g.slug === id),
      isLoading: q.isLoading,
      error: q.error,
    };
  }, [q.data, q.isLoading, q.error]);
}
