import { useState } from "react";
import { ShowcaseProductCard, type ShowcaseProduct } from "./MinecraftSection";
import { PurchaseModal } from "./PurchaseModal";

const BANNER = "/otimizacao-banner.png";

const product: ShowcaseProduct = {
  id: "otimizacao-pc",
  name: "Otimização de PC para Jogos — FPS Boost + Debloat Windows",
  description:
    "Script premium de otimização aplicado remotamente: ganho real de FPS, menos input lag e travamentos, e remoção de bloatware do Windows. Suporte incluso via Discord e WhatsApp.",
  originalPrice: "R$ 100,00",
  discountedPrice: "R$ 35,00",
  discount: "65%",
  stock: 30,
  badge: "FPS BOOST",
};

export function OptimizationSection() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
            OTIMI<span className="text-neon-cyan">ZAÇÃO</span>
          </h2>
          <p className="mt-2 text-sm text-white/50 font-semibold">
            Mais FPS, menos lag e Windows 100% leve
          </p>
        </div>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          ENTREGA RÁPIDA
        </div>
      </div>

      <div className="mb-10 overflow-hidden rounded-2xl border border-neon-cyan/25 shadow-[0_0_45px_-12px_rgba(34,211,238,0.45)]">
        <img
          src={BANNER}
          alt="Otimização de PC para jogos — mais FPS, menos lag e Windows leve"
          className="aspect-[16/9] w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ShowcaseProductCard
          product={product}
          onBuy={setSelectedProduct}
          tone="cyan"
          image={BANNER}
        />
      </div>

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
