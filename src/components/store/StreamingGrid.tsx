import { ShoppingCart, Zap, Package } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PurchaseModal } from "./PurchaseModal";
import { toBRL } from "@/lib/streaming";
import { useCatalog } from "@/lib/use-catalog";

export function StreamingGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();
  const { streaming } = useCatalog();

  const { available, soldOut } = useMemo(() => {
    const avail = streaming.filter((p) => !p.isSoldOut);
    const out = streaming.filter((p) => p.isSoldOut);
    return { available: avail, soldOut: out };
  }, [streaming]);

  const renderCard = (p: typeof streaming[number], index: number) => {
    const activeVars = p.variations.length > 0 ? p.variations : [{ price: 0, stock: 0 } as any];
    const cheapest = activeVars.reduce((a, b) => (a.price < b.price ? a : b));
    const isSoldOut = p.isSoldOut;
    const discount = Math.round((1 - cheapest.price / Math.max(p.originalPrice, 0.01)) * 100);
    const variationCount = p.variations.length;
    const totalStock = p.variations.reduce((sum, v) => sum + (v.stock || 0), 0);

    return (
      <div
        key={p.id}
        onClick={() =>
          !isSoldOut && navigate({ to: "/streaming/$id", params: { id: p.id } })
        }
        className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-sm border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.35)] hover:border-[#8B5CF6]/40 shadow-2xl shadow-black/40 ${isSoldOut ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 60px -20px rgba(139,92,246,0.15)' }} />

        {/* Logo / Brand area */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${p.brand}22, ${p.brand}44)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0C]" />
          <img
            src={p.cover}
            alt={p.name}
            className="h-16 w-auto object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          />
          {isSoldOut ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <span className="bg-[#FF2E5B]/90 text-white px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-lg shadow-[0_0_20px_rgba(255,46,91,0.4)] border border-[#FF2E5B]/50">
                ESGOTADO
              </span>
            </div>
          ) : (
            <>
              {/* Discount badge */}
              <div className="absolute top-3 left-3 bg-[#8B5CF6] text-white px-2.5 py-1 text-[10px] font-black rounded-md shadow-[0_0_12px_rgba(139,92,246,0.5)]">
                {discount}% OFF
              </div>
              {/* Auto delivery badge */}
              <div className="absolute top-3 right-3 bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30 px-2.5 py-1 text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
                <Zap className="h-3 w-3" /> AUTO
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 space-y-3 relative z-10">
          {/* Name & Variations */}
          <div className="space-y-1.5">
            <h3 className="font-display text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors uppercase tracking-tight">
              {p.name}
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold tracking-widest uppercase">
              <Package className="h-3 w-3 text-[#8B5CF6]" />
              <span>
                {variationCount} {variationCount > 1 ? "variações" : "variação"}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[#39FF14]/70">Entrega automática</span>
            </div>
            {!isSoldOut && totalStock > 0 && (
              <div className="text-[10px] text-white/30 font-bold tracking-wider">
                {totalStock} em estoque
              </div>
            )}
          </div>

          {/* Price & CTA */}
          <div className="mt-auto pt-3 flex items-end justify-between border-t border-white/5">
            <div className="flex flex-col">
              {isSoldOut ? (
                <span className="font-display text-lg font-black text-[#FF2E5B] leading-none">
                  INDISPONÍVEL
                </span>
              ) : (
                <>
                  <span className="text-[11px] text-white/30 line-through font-bold tracking-wider leading-none mb-1">
                    {toBRL(p.originalPrice)}
                  </span>
                  <span className="font-display text-2xl font-black text-[#39FF14] leading-none drop-shadow-[0_0_10px_rgba(57,255,20,0.35)]">
                    {toBRL(cheapest.price)}
                  </span>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/30">
                    À vista no Pix
                  </span>
                </>
              )}
            </div>
            {isSoldOut ? (
              <span className="flex min-h-[44px] h-11 px-5 items-center justify-center rounded-xl bg-white/5 text-[10px] font-black text-white/30 uppercase tracking-[0.15em] border border-white/10 cursor-not-allowed">
                ESGOTADO
              </span>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(p.name);
                }}
                className="flex min-h-[44px] h-11 px-5 items-center justify-center gap-2 rounded-xl bg-[#39FF14] text-[10px] font-black text-[#020203] transition-all duration-300 hover:bg-[#7CFC00] hover:scale-105 hover:shadow-[0_0_25px_rgba(57,255,20,0.45)] uppercase tracking-[0.15em]"
              >
                <ShoppingCart className="h-4 w-4" /> COMPRAR
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="streaming"
      className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 mb-10 sm:flex-row sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
          CATÁLOGO DE <span className="text-[#8B5CF6]">STREAMING</span>
        </h2>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          ENTREGA AUTOMÁTICA
        </div>
      </div>

      {/* Available products */}
      {available.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {available.map((p, i) => renderCard(p, i))}
        </div>
      )}

      {/* Sold out products */}
      {soldOut.length > 0 && (
        <>
          <div className="mt-14 mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">
              ESGOTADOS
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {soldOut.map((p, i) => renderCard(p, i))}
          </div>
        </>
      )}

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
