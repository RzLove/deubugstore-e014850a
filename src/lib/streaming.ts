// Streaming products catalog — mirrors the game catalog structure
// (same card style, same product page pattern), categoria "streaming".

import crunchyrollCover from "@/assets/streaming/crunchyroll.png.asset.json";
import netflixCover from "@/assets/streaming/netflix.png.asset.json";
import disneyCover from "@/assets/streaming/disney.png.asset.json";
import hbomaxCover from "@/assets/streaming/hbomax.png.asset.json";
import primeCover from "@/assets/streaming/prime.png.asset.json";
import spotifyCover from "@/assets/streaming/spotify.png.asset.json";
import youtubeCover from "@/assets/streaming/youtube.png.asset.json";
import paramountCover from "@/assets/streaming/paramount.png.asset.json";
import appletvCover from "@/assets/streaming/appletv.png.asset.json";

export interface StreamingVariation {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface StreamingProduct {
  id: string;
  slug: string;
  name: string;
  cover: string;
  tagline: string;
  originalPrice: number;
  brand: string;
  glyph: string;
  variations: StreamingVariation[];
}

export const toBRL = (n: number) => `R$ ${n.toFixed(2).replace(".", ",")}`;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

interface RawStream {
  name: string;
  brand: string;
  glyph: string;
  cover: string;
  originalPrice: number;
  variations: StreamingVariation[];
}

const raw: RawStream[] = [
  {
    name: "Crunchyroll",
    brand: "#F47521",
    glyph: "CR",
    cover: crunchyrollCover.url,
    originalPrice: 39.9,
    variations: [
      { id: "mensal", name: "Crunchyroll 1 mês", price: 15.0, stock: 10 },
      { id: "anual", name: "Crunchyroll Anual", price: 30.0, stock: 6 },
    ],
  },
  {
    name: "Netflix",
    brand: "#E50914",
    glyph: "N",
    cover: netflixCover.url,
    originalPrice: 55.9,
    variations: [
      { id: "mensal", name: "Netflix conta de 1 a 3 meses", price: 18.0, stock: 8 },
      { id: "vitalicio", name: "Netflix Vitalício", price: 30.0, stock: 4 },
    ],
  },
  {
    name: "Disney+",
    brand: "#1E3C72",
    glyph: "D+",
    cover: disneyCover.url,
    originalPrice: 33.9,
    variations: [
      { id: "mensal", name: "Disney+ 1 mês", price: 15.0, stock: 7 },
    ],
  },
  {
    name: "Max",
    brand: "#7B2EFF",
    glyph: "M",
    cover: hbomaxCover.url,
    originalPrice: 34.9,
    variations: [
      { id: "mensal", name: "HBO Max 1 mês", price: 18.0, stock: 6 },
      { id: "anual", name: "HBO Max Anual", price: 35.0, stock: 3 },
    ],
  },
  {
    name: "Prime Video",
    brand: "#00A8E1",
    glyph: "P",
    cover: primeCover.url,
    originalPrice: 19.9,
    variations: [
      { id: "mensal", name: "Prime Video 1 mês", price: 15.0, stock: 9 },
      { id: "vitalicio", name: "Prime Video Premium Vitalício", price: 30.0, stock: 5 },
    ],
  },
  {
    name: "Spotify Premium",
    brand: "#1DB954",
    glyph: "S",
    cover: spotifyCover.url,
    originalPrice: 21.9,
    variations: [
      { id: "mensal", name: "Spotify Premium 1 mês", price: 10.0, stock: 12 },
      { id: "tresmeses", name: "Spotify Premium 3 meses", price: 15.0, stock: 8 },
      { id: "permanente", name: "Spotify Premium Permanente PC", price: 25.0, stock: 6 },
    ],
  },
  {
    name: "YouTube Premium",
    brand: "#FF0000",
    glyph: "YT",
    cover: youtubeCover.url,
    originalPrice: 24.9,
    variations: [
      { id: "familia", name: "YouTube Premium Conta Família", price: 15.0, stock: 8 },
    ],
  },
  {
    name: "Paramount+",
    brand: "#0064FF",
    glyph: "P+",
    cover: paramountCover.url,
    originalPrice: 18.9,
    variations: [
      { id: "mensal", name: "Paramount+ 1 mês", price: 15.0, stock: 6 },
      { id: "anual", name: "Paramount+ Anual", price: 35.0, stock: 4 },
    ],
  },
  {
    name: "Apple TV+",
    brand: "#111111",
    glyph: "tv+",
    cover: appletvCover.url,
    originalPrice: 21.9,
    variations: [
      { id: "esgotado", name: "Apple TV+ Tela - 30d", price: 0, stock: 0 },
    ],
  },
];

export const streamingProducts: StreamingProduct[] = raw.map((r) => ({
  id: slugify(r.name),
  slug: slugify(r.name),
  name: r.name,
  cover: r.cover,
  tagline: `${r.name} com entrega automática e suporte 30 dias.`,
  originalPrice: r.originalPrice,
  brand: r.brand,
  glyph: r.glyph,
  variations: r.variations,
}));

export function findStreaming(id: string): StreamingProduct | undefined {
  return streamingProducts.find((p) => p.id === id || p.slug === id);
}
