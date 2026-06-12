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
                  <path d="M22.029 11.455c-.015-.436-.37-.781-.806-.781H16.86c.725-.87 1.139-1.956 1.139-3.136 0-2.833-2.305-5.138-5.138-5.138-1.571 0-2.986.711-3.929 1.83C8.455 3.394 7.42 3 6.3 3 3.925 3 2 4.925 2 7.3c0 .323.036.637.104.939-.413.435-.666 1.026-.666 1.677 0 1.05.674 1.944 1.611 2.273-.424.471-.682 1.09-.682 1.77 0 1.05.602 1.961 1.478 2.399C5.357 16.892 5 17.513 5 18.2c0 .326.064.636.179.921-.115.362-.179.749-.179 1.15 0 2.059 1.669 3.729 3.729 3.729.982 0 1.871-.382 2.535-1.004.665.622 1.554 1.004 2.536 1.004 2.059 0 3.729-1.67 3.729-3.729 0-.256-.026-.505-.075-.746.404-.377.653-.915.653-1.513 0-.756-.411-1.415-1.021-1.764.551-.371.913-.996.913-1.706 0-.853-.521-1.583-1.261-1.889.309-.371.492-.848.492-1.368 0-.466-.147-.899-.398-1.254h1.619c.437 0 .791-.345.806-.781zm-9.168-6.953c1.784 0 3.235 1.451 3.235 3.235 0 1.011-.466 1.914-1.192 2.503h-2.043v-2.181c0-1.04-.844-1.884-1.884-1.884-.131 0-.259.014-.383.041.542-1.012 1.419-1.714 2.267-1.714zm-6.561 1.398c.131 0 .259-.013.383-.041-.542 1.013-1.419 1.714-2.267 1.714-1.784 0-3.235-1.451-3.235-3.235 0-1.011.466-1.914 1.192-2.503h2.043v2.181c0 1.04.844 1.884 1.884 1.884z" />
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
