import { useMemo, useState } from "react";
import {
  Gamepad2,
  Play,
  Rocket,
  Package,
  Tag,
  LayoutGrid,
  ArrowUpDown,
} from "lucide-react";
import { useCatalog } from "@/lib/use-catalog";
import { GameCard } from "./GameGrid";
import { StreamingGrid } from "./StreamingGrid";
import { PurchaseModal } from "./PurchaseModal";

export type CatalogCategory =
  | "todos"
  | "lancamentos"
  | "jogos"
  | "combos"
  | "streaming"
  | "promocoes";

export type CatalogSort =
  | "relevancia"
  | "precoAsc"
  | "precoDesc"
  | "maisVendidos"
  | "alfabetica";

const TABS: { key: CatalogCategory; label: string; icon: typeof Gamepad2 }[] = [
  { key: "todos", label: "Todos", icon: LayoutGrid },
  { key: "lancamentos", label: "Lançamentos", icon: Rocket },
  { key: "jogos", label: "Jogos Steam", icon: Gamepad2 },
  { key: "combos", label: "Combos 2 em 1", icon: Package },
  { key: "streaming", label: "Streaming", icon: Play },
  { key: "promocoes", label: "Promoções", icon: Tag },
];

const SORTS: { key: CatalogSort; label: string }[] = [
  { key: "relevancia", label: "Relevância" },
  { key: "precoAsc", label: "Preço: Menor → Maior" },
  { key: "precoDesc", label: "Preço: Maior → Menor" },
  { key: "maisVendidos", label: "Mais vendidos" },
  { key: "alfabetica", label: "Ordem alfabética (A-Z)" },
];

function priceNumber(p: string) {
  return Number(
    String(p).replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."),
  );
}

function discountNumber(d: string) {
  return Number(String(d).replace(/[^\d.-]/g, "")) || 0;
}

export function CatalogBrowser() {
  const { games } = useCatalog();
  const [category, setCategory] = useState<CatalogCategory>("todos");
  const [sort, setSort] = useState<CatalogSort>("relevancia");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...games];

    switch (category) {
      case "lancamentos":
        list = [...games].reverse().filter((g) => !g.isSoldOut).slice(0, 12);
        break;
      case "combos":
        list = list.filter((g) => g.bundle && g.bundle.length > 0);
        break;
      case "promocoes":
        list = list
          .filter((g) => !g.isSoldOut && discountNumber(g.discount) > 0)
          .sort((a, b) => discountNumber(b.discount) - discountNumber(a.discount));
        break;
      case "jogos":
        list = list.filter((g) => !g.bundle || g.bundle.length === 0);
        break;
      case "todos":
      default:
        break;
    }

    switch (sort) {
      case "precoAsc":
        list.sort(
          (a, b) => priceNumber(a.discountedPrice) - priceNumber(b.discountedPrice),
        );
        break;
      case "precoDesc":
        list.sort(
          (a, b) => priceNumber(b.discountedPrice) - priceNumber(a.discountedPrice),
        );
        break;
      case "alfabetica":
        list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        break;
      case "maisVendidos":
        list.sort((a, b) => {
          const ap = a.categories?.includes("popular") ? 1 : 0;
          const bp = b.categories?.includes("popular") ? 1 : 0;
          return bp - ap;
        });
        break;
    }

    // Esgotados sempre por último (exceto se o filtro/sort especifica)
    if (category !== "promocoes") {
      list.sort((a, b) => Number(a.isSoldOut) - Number(b.isSoldOut));
    }

    return list;
  }, [games, category, sort]);

  const showStreaming = category === "streaming";

  return (
    <section
      id="catalogo"
      className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6 relative z-10"
    >
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
          CATÁLOGO <span className="text-neon-green">COMPLETO</span>
        </h2>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          {showStreaming ? "Streaming" : `${filtered.length} produtos`}
        </span>
      </div>

      {/* Filtros / Categorias */}
      <div className="rounded-2xl border border-primary/20 bg-[#0A0A0C]/70 backdrop-blur-sm p-4 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = category === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                aria-pressed={active}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide border transition-all duration-300",
                  active
                    ? "bg-primary text-white border-primary shadow-[0_0_18px_rgba(139,92,246,0.6)]"
                    : "bg-black/40 text-white/80 border-primary/30 hover:border-primary hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>

        {!showStreaming && (
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
            <ArrowUpDown className="h-4 w-4 text-neon-green" />
            <span className="hidden sm:inline">Ordenar:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as CatalogSort)}
              className="bg-black/60 border border-primary/30 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-neon-green cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-[#0A0A0C]">
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {showStreaming ? (
        <StreamingGrid />
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-primary/30 bg-[#0A0A0C]/80 p-12 text-center">
          <p className="text-white/60">Nenhum produto nesta categoria ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((g) => (
            <GameCard
              key={g.id}
              game={g}
              onBuy={setSelected}
              launchBadge={category === "lancamentos"}
            />
          ))}
        </div>
      )}

      <PurchaseModal
        isOpen={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        productName={selected || ""}
      />
    </section>
  );
}
