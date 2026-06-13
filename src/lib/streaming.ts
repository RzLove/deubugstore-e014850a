// Streaming products catalog — mirrors the game catalog structure
// (same card style, same product page pattern), categoria "streaming".

export interface StreamingVariation {
  id: string;
  name: string;
  price: number; // BRL
  stock: number;
}

export interface StreamingProduct {
  id: string;
  slug: string;
  name: string;
  /** Banner cover (gradient SVG data URI generated from brand color). */
  cover: string;
  /** Short tagline shown in cards. */
  tagline: string;
  /** Original (riscado) price for the default variation, used só p/ exibir desconto. */
  originalPrice: number;
  /** Brand color (hex) used in the banner gradient. */
  brand: string;
  /** Initial / glyph drawn on the banner. */
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

/** Build a vibrant SVG banner data URI in the brand color. */
function banner(brand: string, label: string, glyph: string): string {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand}"/>
      <stop offset="60%" stop-color="#0A0A0C"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <radialGradient id="r" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${brand}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${brand}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#g)"/>
  <rect width="800" height="450" fill="url(#r)"/>
  <g font-family="Inter, Arial, sans-serif" fill="#fff">
    <text x="60" y="220" font-size="120" font-weight="900" opacity="0.95">${glyph}</text>
    <text x="60" y="300" font-size="56" font-weight="900" letter-spacing="2">${label.toUpperCase()}</text>
    <text x="60" y="340" font-size="20" font-weight="700" opacity="0.7" letter-spacing="3">STREAMING • DEU BUG STORE</text>
    <rect x="60" y="370" width="220" height="34" rx="6" fill="#A8FF33"/>
    <text x="78" y="394" font-size="18" font-weight="900" fill="#000" letter-spacing="2">ENTREGA AUTOMÁTICA</text>
  </g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

interface RawStream {
  name: string;
  brand: string;
  glyph: string;
  originalPrice: number;
  variations: StreamingVariation[];
}

const raw: RawStream[] = [
  {
    name: "Crunchyroll",
    brand: "#F47521",
    glyph: "CR",
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
    originalPrice: 33.9,
    variations: [
      { id: "tela30", name: "Disney+ Tela - 30d", price: 9.9, stock: 7 },
      { id: "anual", name: "Disney+ Anual", price: 49.9, stock: 4 },
    ],
  },
  {
    name: "Max",
    brand: "#0046FF",
    glyph: "M",
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
    originalPrice: 18.9,
    variations: [
      { id: "tela30", name: "Paramount+ Tela - 30d", price: 7.5, stock: 6 },
      { id: "completa", name: "Paramount+ Completa - 30d", price: 14.9, stock: 4 },
    ],
  },
  {
    name: "Apple TV+",
    brand: "#A6A6A6",
    glyph: "tv+",
    originalPrice: 21.9,
    variations: [
      { id: "tela30", name: "Apple TV+ Tela - 30d", price: 9.9, stock: 5 },
      { id: "completa", name: "Apple TV+ Completa - 30d", price: 17.9, stock: 3 },
    ],
  },
  {
    name: "Canva Pro",
    brand: "#00C4CC",
    glyph: "Cv",
    originalPrice: 44.9,
    variations: [
      { id: "mensal", name: "Canva Pro Mensal", price: 12.9, stock: 10 },
      { id: "anual", name: "Canva Pro Anual", price: 99.9, stock: 5 },
    ],
  },
];

export const streamingProducts: StreamingProduct[] = raw.map((r) => ({
  id: slugify(r.name),
  slug: slugify(r.name),
  name: r.name,
  cover: banner(r.brand, r.name, r.glyph),
  tagline: `${r.name} com entrega automática e suporte 30 dias.`,
  originalPrice: r.originalPrice,
  brand: r.brand,
  glyph: r.glyph,
  variations: r.variations,
}));

export function findStreaming(id: string): StreamingProduct | undefined {
  return streamingProducts.find((p) => p.id === id || p.slug === id);
}
