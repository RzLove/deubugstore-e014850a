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
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.012 18.001c-3.151 0-5.706-2.553-5.706-5.704 0-.491.066-.967.186-1.42l3.414 1.417c.071 2.327 1.954 4.204 4.288 4.269l-2.182 1.438zm4.437-3.328c-.063 2.336-1.944 4.215-4.28 4.282l2.179-1.436c1.619-.107 2.91-1.396 3.019-3.013l1.437 2.179zm-.433-2.673l-1.436-2.178c.112-1.62.112-1.62.112-1.62l1.324 2.398z" />
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
