import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import minecraftBanner from "@/assets/minecraft-banner.png.asset.json";

interface MinecraftProduct {
  id: string;
  name: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  stock: number;
  badge: string;
}

const products: MinecraftProduct[] = [
  {
    id: "mc-perm",
    name: "Minecraft Java e Bedrock – Acesso Total e Permanente",
    description:
      "Acesso permanente e total às edições Java e Bedrock do Minecraft. Jogue sem limite de tempo.",
    originalPrice: "R$ 149,90",
    discountedPrice: "R$ 80,00",
    discount: "47%",
    stock: 42,
    badge: "ACESSO PERMANENTE",
  },
  {
    id: "mc-gp30",
    name: "Minecraft Java e Bedrock ou Game Pass 30D",
    description:
      "Acesso por 30 dias ao Minecraft Java e Bedrock ou Game Pass. Entrega rápida.",
    originalPrice: "R$ 79,90",
    discountedPrice: "R$ 30,00",
    discount: "62%",
    stock: 35,
    badge: "30 DIAS",
  },
  {
    id: "mc-ms30",
    name: "Minecraft Java e Bedrock ou Microsoft 30D",
    description:
      "Acesso por 30 dias ao Minecraft Java e Bedrock ou conta Microsoft. Entrega rápida.",
    originalPrice: "R$ 79,90",
    discountedPrice: "R$ 30,00",
    discount: "62%",
    stock: 38,
    badge: "30 DIAS",
  },
];

function MinecraftCard({
  product,
  onBuy,
}: {
  product: MinecraftProduct;
  onBuy: (name: string) => void;
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-sm border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-[#0E0E12] hover:shadow-[0_30px_60px_-15px_rgba(34,197,94,0.45)] hover:border-neon-green/50 shadow-2xl shadow-black/40">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={minecraftBanner.url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black rounded-sm shadow-xl">
          {product.discount} OFF
        </div>
        <div className="absolute top-4 right-4 bg-neon-green text-black px-2.5 py-1 text-[10px] font-black rounded-full shadow-[0_0_18px_rgba(168,255,51,0.45)] border border-neon-green/60 uppercase tracking-widest">
          {product.badge}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 font-display text-lg font-bold uppercase tracking-tight text-white group-hover:text-neon-green transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-white/50 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 line-through font-bold tracking-wider leading-none mb-1">
              {product.originalPrice}
            </span>
            <span className="font-display text-2xl font-black text-[#A8FF33] leading-none drop-shadow-[0_0_8px_rgba(168,255,51,0.2)]">
              {product.discountedPrice}
            </span>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
              À vista no Pix
            </span>
            <span className="mt-1 text-[10px] font-semibold text-white/40">
              ({product.stock} em estoque)
            </span>
          </div>

          <button
            onClick={() => onBuy(product.name)}
            className="flex min-h-[44px] h-11 px-4 items-center justify-center gap-2 rounded-lg bg-neon-green text-black text-[10px] font-black transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(168,255,51,0.4)] uppercase tracking-widest border border-neon-green/40"
          >
            <ShoppingCart className="h-4 w-4" /> COMPRAR
          </button>
        </div>
      </div>
      <div className="absolute inset-0 border-2 rounded-2xl transition-all duration-500 pointer-events-none border-neon-green/0 group-hover:border-neon-green/30" />
    </div>
  );
}

export function MinecraftSection() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
            MINE<span className="text-neon-green">CRAFT</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 font-semibold">
            Acesso permanente e contas de 30 dias
          </p>
        </div>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-neon-green/30 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          ENTREGA RÁPIDA
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <MinecraftCard key={p.id} product={p} onBuy={setSelectedProduct} />
        ))}
      </div>

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
