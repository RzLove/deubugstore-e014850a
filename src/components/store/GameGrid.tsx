import { ShoppingCart } from "lucide-react";
import crimson from "@/assets/cat-popular.jpg";
import crusader from "@/assets/cat-rpg.jpg";
import cyberpunk from "@/assets/cat-shooter.jpg";
import ds2 from "@/assets/cat-fight.jpg";
import ds3 from "@/assets/cat-action.jpg";
import dsr from "@/assets/cat-horror.jpg";

const games = [
  {
    id: 1,
    name: "Crimson Desert",
    discount: "-90%",
    originalPrice: "R$ 349,99",
    discountedPrice: "R$ 34,90",
    cover: crimson,
  },
  {
    id: 2,
    name: "Crusader Kings III",
    discount: "-92%",
    originalPrice: "R$ 179,99",
    discountedPrice: "R$ 14,90",
    cover: crusader,
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    discount: "-93%",
    originalPrice: "R$ 299,89",
    discountedPrice: "R$ 19,90",
    cover: cyberpunk,
  },
  {
    id: 4,
    name: "Dark Souls II",
    discount: "-90%",
    originalPrice: "R$ 154,90",
    discountedPrice: "R$ 14,90",
    cover: ds2,
  },
  {
    id: 5,
    name: "Dark Souls III",
    discount: "-95%",
    originalPrice: "R$ 327,50",
    discountedPrice: "R$ 17,90",
    cover: ds3,
  },
  {
    id: 6,
    name: "Dark Souls Remastered",
    discount: "-90%",
    originalPrice: "R$ 154,90",
    discountedPrice: "R$ 14,90",
    cover: dsr,
  },
];

export function GameGrid() {
  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl text-white">🎮 Ofertas Imperdíveis</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <a
            key={game.id}
            href={`/game/${game.id}`}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-[#0f111a] border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:bg-[#1a1d2e] hover:shadow-2xl hover:shadow-primary/20"
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
                
                <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-300 group-hover:bg-primary-glow group-hover:scale-110">
                  <ShoppingCart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
