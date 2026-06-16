import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { useCatalog } from "@/lib/use-catalog";
import { GameCard } from "./GameGrid";

const LAUNCH_SLUGS = [
  "007-first-light-deluxe-lies-of-p-overture",
  "monster-hunter-wilds",
  "lego-batman-legacy-of-the-dark-knight",
  "death-stranding-2-deluxe",
  "forza-horizon-6",
];

export function ReleasesSection() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { games } = useCatalog();

  const releases = LAUNCH_SLUGS.map(
    (slug) => games.find((g) => g.slug === slug),
  ).filter(Boolean);

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
          <span className="text-neon-cyan">LANÇAMENTOS</span>
        </h2>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          RECÉM ADICIONADOS
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {releases.map((g) => (
          <GameCard
            key={g!.id}
            game={g!}
            onBuy={setSelectedProduct}
            launchBadge
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("catalogo");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-[#0A0A0C]/70 px-6 py-3 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(139,92,246,0.55)]"
        >
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
