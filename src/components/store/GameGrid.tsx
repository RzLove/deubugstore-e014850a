import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { games } from "@/lib/games";
import { useNavigate } from "@tanstack/react-router";

export function GameGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-white">🎮 Ofertas Imperdíveis</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate({ to: "/game/$id", params: { id: game.id.toString() } })}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-[#0f111a] border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:bg-[#1a1d2e] hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
          >
            {/* Header Image Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={game.cover}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Platform Icon (Steam style) */}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.051 16.51c-2.438-.962-4.051-3.321-4.051-6.01 0-3.59 2.91-6.5 6.5-6.5 2.147 0 4.049 1.042 5.228 2.645l-3.21 1.332c-.067-2.19-1.838-3.958-4.033-4.02l2.053-1.353c-1.523-.101-2.738 1.314-2.84 2.834l-1.352-2.052c.062 2.195 1.83 3.966 4.025 4.029l-2.053 1.353c1.523.101 2.738-1.314 2.84-2.834l1.352 2.052c-.062-2.195-1.83-3.966-4.025-4.029L9.61 7.234z" />
                </svg>
              </div>

              {/* Discount Badge */}
              <div className="absolute bottom-0 left-0 bg-[#d9f99d] px-3 py-1 text-xs font-black text-black">
                {game.discount}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="line-clamp-1 flex-1 font-display text-lg font-bold text-white group-hover:text-primary-glow transition-colors">
                  {game.name}
                </h3>
                <span className="text-sm text-muted-foreground line-through whitespace-nowrap">
                  {game.originalPrice}
                </span>
              </div>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Preço Final</span>
                  <span className="font-display text-2xl font-black text-[#d9f99d]">
                    {game.discountedPrice}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(game.name);
                  }}
                  className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary text-xs font-black text-primary-foreground transition-all duration-300 hover:bg-primary-glow hover:scale-105 shadow-[0_0_15px_rgba(123,46,255,0.3)]"
                >
                  <ShoppingCart className="h-4 w-4" /> COMPRAR AGORA
                </button>
              </div>
            </div>
          </div>
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

