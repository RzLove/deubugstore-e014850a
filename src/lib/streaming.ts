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
      { id: "anual", name: "Crunchyroll Anual", price: 11.0, stock: 4 },
      { id: "mensal", name: "Crunchyroll Mensal", price: 8.5, stock: 6 },
      { id: "tela30", name: "Crunchyroll Tela - 30d", price: 6.5, stock: 4 },
    ],
  },
  {
    name: "Netflix",
    brand: "#E50914",
    glyph: "N",
    cover: netflixCover.url,
    originalPrice: 55.9,
    variations: [
      { id: "tela30", name: "Netflix Tela - 30d", price: 14.9, stock: 8 },
      { id: "completa", name: "Netflix Conta Completa - 30d", price: 29.9, stock: 5 },
    ],
  },
  {
    name: "Disney+",
    brand: "#1E3C72",
    glyph: "D+",
    cover: disneyCover.url,
    originalPrice: 33.9,
    variations: [
      { id: "tela30", name: "Disney+ Tela - 30d", price: 9.9, stock: 7 },
      { id: "anual", name: "Disney+ Anual", price: 49.9, stock: 4 },
    ],
  },
  {
    name: "Max",
    brand: "#7B2EFF",
    glyph: "M",
    cover: hbomaxCover.url,
    originalPrice: 34.9,
    variations: [
      { id: "tela30", name: "Max Tela - 30d", price: 11.9, stock: 6 },
      { id: "completa", name: "Max Conta Completa - 30d", price: 24.9, stock: 3 },
    ],
  },
  {
    name: "Prime Video",
    brand: "#00A8E1",
    glyph: "P",
    cover: primeCover.url,
    originalPrice: 19.9,
    variations: [
      { id: "tela30", name: "Prime Video Tela - 30d", price: 8.9, stock: 9 },
      { id: "completa", name: "Prime Video Completa - 30d", price: 16.9, stock: 5 },
    ],
  },
  {
    name: "Spotify Premium",
    brand: "#1DB954",
    glyph: "S",
    cover: spotifyCover.url,
    originalPrice: 21.9,
    variations: [
      { id: "tela30", name: "Spotify Premium - 30d", price: 7.9, stock: 12 },
      { id: "anual", name: "Spotify Premium Anual", price: 69.9, stock: 4 },
    ],
  },
  {
    name: "YouTube Premium",
    brand: "#FF0000",
    glyph: "YT",
    cover: youtubeCover.url,
    originalPrice: 24.9,
    variations: [
      { id: "tela30", name: "YouTube Premium - 30d", price: 9.9, stock: 8 },
      { id: "anual", name: "YouTube Premium Anual", price: 89.9, stock: 3 },
    ],
  },
  {
    name: "Paramount+",
    brand: "#0064FF",
    glyph: "P+",
    cover: paramountCover.url,
    originalPrice: 18.9,
    variations: [
      { id: "tela30", name: "Paramount+ Tela - 30d", price: 7.5, stock: 6 },
      { id: "completa", name: "Paramount+ Completa - 30d", price: 14.9, stock: 4 },
    ],
  },
  {
    name: "Apple TV+",
    brand: "#111111",
    glyph: "tv+",
    cover: appletvCover.url,
    originalPrice: 21.9,
    variations: [
      { id: "tela30", name: "Apple TV+ Tela - 30d", price: 9.9, stock: 5 },
      { id: "completa", name: "Apple TV+ Completa - 30d", price: 17.9, stock: 3 },
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
