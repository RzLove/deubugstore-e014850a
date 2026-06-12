import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { games } from "@/lib/games";
import { useNavigate } from "@tanstack/react-router";

export function GameGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
          CATÁLOGO DE <span className="text-neon-green">JOGOS</span>
        </h2>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          SISTEMA ONLINE
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => navigate({ to: "/game/$id", params: { id: game.id.toString() } })}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0C] border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:bg-[#0E0E12] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] hover:border-white/10 cursor-pointer shadow-2xl shadow-black/40"
          >
            {/* Header Image Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={game.cover}
                alt={game.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Platform Icon (Steam style) */}
              <div className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded bg-black/80 backdrop-blur-sm text-white border border-white/10 shadow-lg group-hover:border-primary/50 transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.051 16.51c-2.438-.962-4.051-3.321-4.051-6.01 0-3.59 2.91-6.5 6.5-6.5 2.147 0 4.049 1.042 5.228 2.645l-3.21 1.332c-.067-2.19-1.838-3.958-4.033-4.02l2.053-1.353c-1.523-.101-2.738 1.314-2.84 2.834l-1.352-2.052c.062 2.195 1.83 3.966 4.025 4.029l-2.053 1.353c1.523.101 2.738-1.314 2.84-2.834l1.352 2.052c-.062-2.195-1.83-3.966-4.025-4.029L9.61 7.234z" />
                </svg>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black rounded-sm shadow-xl">
                {game.discount} OFF
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="line-clamp-1 font-display text-lg font-bold text-white group-hover:text-neon-cyan transition-colors uppercase tracking-tight">
                  {game.name}
                </h3>
                <div className="text-[10px] text-white/30 font-black tracking-widest uppercase">Ativação Instantânea</div>
              </div>
              
              <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 line-through font-bold tracking-wider leading-none mb-1">
                    {game.originalPrice}
                  </span>
                  <span className="font-display text-2xl font-black text-[#A8FF33] leading-none drop-shadow-[0_0_8px_rgba(168,255,51,0.2)]">
                    {game.discountedPrice}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(game.name);
                  }}
                  className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary text-[10px] font-black text-white transition-all duration-300 hover:bg-primary-glow hover:scale-105 shadow-[0_0_15px_rgba(123,46,255,0.3)] uppercase tracking-widest border border-primary/20"
                >
                  <ShoppingCart className="h-4 w-4" /> COMPRAR
                </button>
              </div>
            </div>
            
            {/* Hover Highlight Overlay */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-all duration-500 pointer-events-none" />
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


