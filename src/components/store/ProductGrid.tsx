import { Gift, TrendingUp } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import popular from "@/assets/cat-popular.jpg";
import action from "@/assets/cat-action.jpg";
import rpg from "@/assets/cat-rpg.jpg";
import horror from "@/assets/cat-horror.jpg";
import fight from "@/assets/cat-fight.jpg";
import shooter from "@/assets/cat-shooter.jpg";

const products = [
  { name: "Combo Supremo (Todas as Keys da Loja)", old: "R$ 13.900,00", price: "R$ 119,99", off: "99% OFF", img: popular },
  { name: "Red Dawn Outlaw — Edição Definitiva", old: "R$ 339,00", price: "R$ 14,99", off: "96% OFF", img: popular },
  { name: "Shadow Strike: Vigilante", old: "R$ 299,00", price: "R$ 19,99", off: "93% OFF", img: action },
  { name: "Eldrith Sword: Awakening", old: "R$ 399,00", price: "R$ 22,99", off: "94% OFF", img: rpg },
  { name: "Phantom Whisper", old: "R$ 199,00", price: "R$ 12,99", off: "93% OFF", img: horror },
  { name: "Iron Fist Arena: Legacy", old: "R$ 249,00", price: "R$ 16,99", off: "93% OFF", img: fight },
  { name: "Operator Zero: Tactical", old: "R$ 379,00", price: "R$ 24,99", off: "93% OFF", img: shooter },
  { name: "Eldrith Sword: Chronicles II", old: "R$ 289,00", price: "R$ 18,99", off: "93% OFF", img: rpg },
  { name: "Phantom Whisper: Reborn", old: "R$ 219,00", price: "R$ 13,99", off: "93% OFF", img: horror },
  { name: "Combo Indie Selecionado", old: "R$ 899,00", price: "R$ 49,99", off: "94% OFF", img: action },
];

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">🥇 Jogos Populares</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((p) => (
          <article
            key={p.name}
            className="group surface-card overflow-hidden p-0 transition hover:-translate-y-1 hover:border-primary/60 hover:glow-primary"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={p.img}
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
                <span className="text-xs text-muted-foreground line-through">{p.old}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary-glow">
                  <TrendingUp className="h-3 w-3" /> {p.off}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-xl font-extrabold">{p.price}</div>
                  <div className="text-[11px] text-muted-foreground">À vista no Pix</div>
                </div>
                <div className="grid h-7 w-7 rotate-45 place-items-center rounded-md bg-[color:var(--pix)]/15 text-[color:var(--pix)]">
                  <span className="-rotate-45 text-xs font-extrabold">P</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProduct(p.name)}
                className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground transition hover:bg-primary-glow hover:glow-primary"
              >
                <Gift className="h-4 w-4" /> Comprar agora
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
