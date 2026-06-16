import { Gamepad2, Play, Rocket, Package, Tag, LayoutGrid } from "lucide-react";

export type CategoryKey =
  | "todos"
  | "jogos"
  | "streaming"
  | "lancamentos"
  | "combos"
  | "promocoes";

const TABS: { key: CategoryKey; label: string; icon: typeof Gamepad2 }[] = [
  { key: "todos", label: "Todos", icon: LayoutGrid },
  { key: "jogos", label: "Jogos Steam", icon: Gamepad2 },
  { key: "streaming", label: "Streaming", icon: Play },
  { key: "lancamentos", label: "Lançamentos", icon: Rocket },
  { key: "combos", label: "Combos", icon: Package },
  { key: "promocoes", label: "Promoções", icon: Tag },
];

interface Props {
  active: CategoryKey;
  onChange: (key: CategoryKey) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <section className="mx-auto mt-12 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
          NAVEGUE POR <span className="text-neon-green">CATEGORIA</span>
        </h2>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
      </div>

      <div className="flex flex-wrap gap-3">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={[
                "group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide",
                "border transition-all duration-300 backdrop-blur-sm",
                isActive
                  ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(139,92,246,0.7),0_0_40px_rgba(34,197,94,0.35)]"
                  : "bg-[#0A0A0C]/80 text-white/80 border-primary/40 hover:border-primary hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]",
              ].join(" ")}
              aria-pressed={isActive}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
