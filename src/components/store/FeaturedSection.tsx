import { ShoppingCart, TrendingDown } from "lucide-react";

const games = [
  { id: 1, name: "Call of Duty: Black Ops 6", price: "R$ 199,90", oldPrice: "R$ 349,90", discount: "-42%", tag: "Lançamento", cover: "https://shared.cloudflare.steamstatic.com/store_apps/2933620/header.jpg" },
  { id: 2, name: "Red Dead Redemption 2", price: "R$ 89,90", oldPrice: "R$ 299,00", discount: "-70%", tag: "Mais vendido", cover: "https://shared.cloudflare.steamstatic.com/store_apps/1174180/header.jpg" },
  { id: 3, name: "EA Sports FC 24", price: "R$ 49,90", oldPrice: "R$ 359,00", discount: "-86%", tag: "Promoção", cover: "https://shared.cloudflare.steamstatic.com/store_apps/2195250/header.jpg" },
  { id: 4, name: "GTA V", price: "R$ 34,90", oldPrice: "R$ 149,00", discount: "-76%", tag: "Clássico", cover: "https://shared.cloudflare.steamstatic.com/store_apps/271590/header.jpg" },
  { id: 5, name: "Elden Ring", price: "R$ 139,90", oldPrice: "R$ 249,00", discount: "-44%", tag: "GOTY", cover: "https://shared.cloudflare.steamstatic.com/store_apps/1245620/header.jpg" },
];

export function FeaturedSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]"></div>
      
      <div className="mx-auto max-w-[1280px] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
             <div className="inline-block px-3 py-1 bg-neon-green/10 border border-neon-green/30 text-neon-green text-[10px] font-black uppercase tracking-[0.2em] rounded">
                OFERTAS BUGADAS
             </div>
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                DESTAQUES DA <span className="text-neon-green">SEMANA</span>
             </h2>
          </div>
          <button className="text-sm font-bold text-white/40 hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2 group">
            Ver catálogo completo <div className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all"></div>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="group bg-[#111115] border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(123,46,255,0.1)] hover:-translate-y-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={game.cover} 
                  alt={game.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111115] to-transparent opacity-60"></div>
                
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                   <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded shadow-lg">
                     {game.discount}
                   </span>
                   <span className="bg-black/80 backdrop-blur text-neon-cyan text-[9px] font-bold px-2 py-0.5 rounded border border-neon-cyan/20">
                     {game.tag}
                   </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <h3 className="font-bold text-white line-clamp-1 group-hover:text-neon-cyan transition-colors">
                  {game.name}
                </h3>
                
                <div className="flex items-end justify-between">
                   <div className="space-y-1">
                      <div className="text-[10px] text-white/30 line-through font-bold">{game.oldPrice}</div>
                      <div className="text-xl font-black text-white">{game.price}</div>
                   </div>
                   <button className="h-10 w-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_15px_rgba(123,46,255,0.5)] transition-all active:scale-90">
                      <ShoppingCart className="h-4 w-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
