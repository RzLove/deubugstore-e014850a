import { Gift, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { games } from "@/lib/games";
import { useNavigate } from "@tanstack/react-router";

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">🥇 Jogos Populares</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {games.map((p) => (
          <article
            key={p.id}
            onClick={() => navigate({ to: "/game/$id", params: { id: p.id.toString() } })}
            className="group surface-card overflow-hidden p-0 transition hover:-translate-y-1 hover:border-primary/60 hover:glow-primary cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={p.cover}
                alt={p.name}
                loading="lazy"
                width={640}
                height={896}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-sm font-bold leading-snug">
                {p.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">{p.originalPrice}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary-glow">
                  <TrendingUp className="h-3 w-3" /> {p.discount} OFF
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-xl font-extrabold text-[#d9f99d]">{p.discountedPrice}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">À vista no Pix</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex h-6 w-6 rotate-45 place-items-center rounded-md bg-[color:var(--pix)]/15 text-[color:var(--pix)]">
                    <span className="-rotate-45 text-[10px] font-extrabold">P</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(p.name);
                }}
                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[10px] font-black uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary-glow hover:shadow-[0_0_20px_rgba(123,46,255,0.4)]"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> COMPRAR AGORA
              </button>
            </div>
          </article>
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

