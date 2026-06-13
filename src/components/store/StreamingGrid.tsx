import { ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PurchaseModal } from "./PurchaseModal";
import { streamingProducts, toBRL } from "@/lib/streaming";

export function StreamingGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section
      id="streaming"
      className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10"
    >
      <div className="flex flex-col gap-3 mb-10 sm:flex-row sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
          CATÁLOGO DE <span className="text-neon-green">STREAMING</span>
        </h2>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          ENTREGA AUTOMÁTICA
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {streamingProducts.map((p) => {
          const cheapest = p.variations.reduce((a, b) =>
            a.price < b.price ? a : b,
          );
          const isSoldOut = p.variations.every((v) => v.stock === 0);
          const discount = Math.round((1 - cheapest.price / p.originalPrice) * 100);
          return (
            <div
              key={p.id}
              onClick={() =>
                !isSoldOut && navigate({ to: "/streaming/$id", params: { id: p.id } })
              }
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0C] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-[#0E0E12] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:border-white/10 shadow-2xl shadow-black/40 ${isSoldOut ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div
                className="relative aspect-[16/9] w-full overflow-hidden"
                style={{ background: p.brand }}
              >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                {isSoldOut ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="bg-red-600 text-white px-4 py-2 text-sm font-black uppercase tracking-widest rounded-lg shadow-lg">
                      ESGOTADO
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black rounded-sm shadow-xl">
                      {discount}% OFF
                    </div>
                    <div className="absolute top-4 right-4 bg-neon-green text-black px-2.5 py-1 text-[10px] font-black rounded-full shadow-[0_0_18px_rgba(168,255,51,0.45)] border border-neon-green/60 uppercase tracking-widest flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Auto
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col flex-1 p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="line-clamp-1 font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors uppercase tracking-tight">
                    {p.name}
                  </h3>
                  <div className="text-[10px] text-white/30 font-black tracking-widest uppercase">
                    {p.variations.length} varia{p.variations.length > 1 ? 'ções' : 'ção'} · A partir de
                  </div>
                </div>

                <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
                  <div className="flex flex-col">
                    {isSoldOut ? (
                      <span className="font-display text-xl font-black text-red-500 leading-none">
                        INDISPONÍVEL
                      </span>
                    ) : (
                      <>
                        <span className="text-[10px] text-white/30 line-through font-bold tracking-wider leading-none mb-1">
                          {toBRL(p.originalPrice)}
                        </span>
                        <span className="font-display text-2xl font-black text-[#A8FF33] leading-none drop-shadow-[0_0_8px_rgba(168,255,51,0.2)]">
                          {toBRL(cheapest.price)}
                        </span>
                        <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                          À vista no Pix
                        </span>
                      </>
                    )}
                  </div>
                  {isSoldOut ? (
                    <span className="flex h-10 px-4 items-center justify-center rounded-lg bg-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest border border-white/10">
                      ESGOTADO
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(p.name);
                      }}
                      className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary text-[10px] font-black text-white transition-all duration-300 hover:bg-primary-glow hover:scale-105 shadow-[0_0_15px_rgba(123,46,255,0.3)] uppercase tracking-widest border border-primary/20"
                    >
                      <ShoppingCart className="h-4 w-4" /> COMPRAR
                    </button>
                  )}
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-all duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
