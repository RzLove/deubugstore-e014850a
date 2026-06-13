import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

import { games as allGames } from "@/lib/games";

const featuredGameIds = [1, 2, 3, 4, 5];
const games = allGames.filter(g => featuredGameIds.includes(Number(g.id))).map(g => ({
  id: g.id,
  name: g.name,
  price: g.discountedPrice,
  oldPrice: g.originalPrice,
  discount: g.discount,
  tag: Number(g.id) === 1 ? "Lançamento" : Number(g.id) === 2 || Number(g.id) === 5 ? "MAIS VENDIDO" : Number(g.id) === 3 ? "PROMOÇÃO" : "CLÁSSICO",
  cover: g.cover
}));

export function FeaturedSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="mx-auto max-w-[1280px] relative z-10">
        <div className="flex flex-col gap-3 mb-10 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            DESTAQUES DA <span className="text-neon-green">SEMANA</span>
          </h2>
          <button className="text-xs font-black text-primary hover:text-primary-glow transition-colors uppercase tracking-[0.2em] flex items-center gap-2 group self-start sm:self-auto">
            VER TODOS <span className="group-hover:translate-x-1 transition-transform">{"->"}</span>
          </button>
        </div>

        <div className="relative group/carousel">
          {/* Navigation Arrows */}
          <button className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/80 border border-white/10 text-white/40 hover:text-white hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-black/80 border border-white/10 text-white/40 hover:text-white hover:border-primary/50 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:flex">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {games.map((game) => (
              <div 
                key={game.id} 
                className="group bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_40px_rgba(123,46,255,0.1)] hover:-translate-y-2 cursor-pointer"
                onClick={() => window.location.href = `/game/${game.id}`}

              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={game.cover} 
                    alt={game.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                     <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-[0_0_15px_rgba(123,46,255,0.4)] glitch-effect">
                       {game.discount} OFF
                     </span>
                     {game.tag && (
                       <span className="bg-black/80 backdrop-blur text-neon-green text-[9px] font-black px-2 py-0.5 rounded border border-neon-green/30 uppercase tracking-widest">
                         {game.tag}
                       </span>
                     )}
                  </div>
                </div>

                <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                  <h3 className="font-bold text-white line-clamp-1 group-hover:text-neon-cyan transition-colors text-sm uppercase tracking-tight">
                    {game.name}
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                     <div className="space-y-1">
                        <div className="text-[10px] text-white/30 line-through font-bold tracking-wider">{game.oldPrice}</div>
                        <div className="text-xl font-black text-[#d9f99d] group-hover:text-neon-green transition-colors">{game.price}</div>
                     </div>
                     <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Simulação de clique no botão de compra
                          window.location.href = `/game/${game.id}`;
                        }}
                        className="h-10 w-full flex items-center justify-center gap-2 bg-primary text-[10px] font-black uppercase tracking-widest text-white rounded-xl border border-primary/20 hover:bg-primary-glow hover:shadow-[0_0_20px_rgba(123,46,255,0.6)] transition-all active:scale-95"
                     >
                        <ShoppingCart className="h-4 w-4" /> COMPRAR AGORA
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
