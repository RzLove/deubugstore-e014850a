import { ChevronLeft, ChevronRight } from "lucide-react";
import popular from "@/assets/cat-popular.jpg";
import action from "@/assets/cat-action.jpg";
import rpg from "@/assets/cat-rpg.jpg";
import horror from "@/assets/cat-horror.jpg";
import fight from "@/assets/cat-fight.jpg";
import shooter from "@/assets/cat-shooter.jpg";

const cats = [
  { label: "🥇 JOGOS POPULARES", img: popular },
  { label: "🎮 AÇÃO & AVENTURA", img: action },
  { label: "📈 RPG", img: rpg },
  { label: "👻 TERROR", img: horror },
  { label: "🥊 LUTA", img: fight },
  { label: "🔫 JOGOS DE TIRO", img: shooter },
];

export function Categories() {
  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Nossas Categorias</h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
      </div>

      <div className="relative mt-8">
        <button className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:border-primary/60 md:grid">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <a
              key={c.label}
              href="#"
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border transition hover:border-primary hover:glow-primary"
            >
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                width={640}
                height={896}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <div className="font-display text-xs font-extrabold tracking-wider sm:text-sm">
                  {c.label}
                </div>
              </div>
            </a>
          ))}
        </div>

        <button className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:border-primary/60 md:grid">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
