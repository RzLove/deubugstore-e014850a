import { ShoppingCart, ArrowRight, Ban } from "lucide-react";
import { useState, useMemo } from "react";
import { PurchaseModal } from "./PurchaseModal";
import { useCatalog } from "@/lib/use-catalog";
import { useNavigate } from "@tanstack/react-router";
import type { Game } from "@/lib/games";

type GameWithStatus = Game & { isSoldOut: boolean };

const PREVIEW_COUNT = 6;

export function GameCard({
  game,
  onBuy,
  launchBadge,
}: {
  game: GameWithStatus;
  onBuy: (name: string) => void;
  launchBadge?: boolean;
}) {
  const navigate = useNavigate();
  const soldOut = game.isSoldOut;

  return (
    <div
      onClick={() => {
        if (!soldOut) navigate({ to: "/game/$id", params: { id: game.slug } });
      }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0C]/80 backdrop-blur-sm border border-white/5 transition-all duration-500 ${
        soldOut
          ? "opacity-70 cursor-not-allowed"
          : "hover:-translate-y-2 hover:bg-[#0E0E12] hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.35)] hover:border-primary/40 cursor-pointer shadow-2xl shadow-black/40"
      }`}
    >
      {/* Sold-out overlay */}
      {soldOut && (
        <div className="absolute inset-0 z-20 bg-black/60 rounded-2xl pointer-events-none" />
      )}

      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={game.cover}
          alt={game.name}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            soldOut ? "" : "group-hover:scale-110"
          }`}
        />
        {soldOut ? (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2.5 py-1 text-[10px] font-black rounded-sm shadow-xl uppercase tracking-widest z-30">
            ESGOTADO
          </div>
        ) : launchBadge ? (
          <div className="absolute top-4 left-4 bg-neon-cyan text-black px-2.5 py-1 text-[10px] font-black rounded-sm shadow-[0_0_18px_rgba(0,255,255,0.45)] uppercase tracking-widest z-10">
            LANÇAMENTO
          </div>
        ) : (
          <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black rounded-sm shadow-xl">
            {game.discount} OFF
          </div>
        )}
        {!soldOut && game.bundle && game.bundle.length > 0 && (
          <div className="absolute top-4 right-4 bg-neon-green text-black px-2.5 py-1 text-[10px] font-black rounded-full shadow-[0_0_18px_rgba(168,255,51,0.45)] border border-neon-green/60 uppercase tracking-widest">
            🎁 COMBO 2 EM 1
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="space-y-1">
          <h3
            className={`line-clamp-1 font-display text-lg font-bold transition-colors uppercase tracking-tight ${
              soldOut
                ? "text-white/50"
                : "text-white group-hover:text-neon-cyan"
            }`}
          >
            {game.name}
          </h3>
          <div className="text-[10px] text-white/30 font-black tracking-widest uppercase">
            Acesso por 30 dias
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
          <div className="flex flex-col">
            {soldOut ? (
              <span className="font-display text-xl font-black text-white/30 leading-none">
                INDISPONÍVEL
              </span>
            ) : (
              <>
                <span className="text-[10px] text-white/30 line-through font-bold tracking-wider leading-none mb-1">
                  {game.originalPrice}
                </span>
                <span className="font-display text-2xl font-black text-[#A8FF33] leading-none drop-shadow-[0_0_8px_rgba(168,255,51,0.2)]">
                  {game.discountedPrice}
                </span>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  À vista no Pix
                </span>
                {game.stock < 10 ? (
                  <span className="mt-1 text-[10px] font-black uppercase tracking-wider text-orange-400">
                    Últimas {game.stock} unidades!
                  </span>
                ) : (
                  <span className="mt-1 text-[10px] font-semibold text-white/40">
                    {game.stock} em estoque
                  </span>
                )}
              </>
            )}
          </div>

          {soldOut ? (
            <button
              disabled
              className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-white/5 text-[10px] font-black text-white/30 uppercase tracking-widest border border-white/5 cursor-not-allowed"
            >
              <Ban className="h-4 w-4" /> ESGOTADO
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuy(game.name);
              }}
              className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary text-[10px] font-black text-white transition-all duration-300 hover:bg-primary-glow hover:scale-105 shadow-[0_0_15px_rgba(123,46,255,0.3)] uppercase tracking-widest border border-primary/20"
            >
              <ShoppingCart className="h-4 w-4" /> COMPRAR
            </button>
          )}
        </div>
      </div>
      <div
        className={`absolute inset-0 border-2 rounded-2xl transition-all duration-500 pointer-events-none ${
          soldOut
            ? "border-white/5"
            : "border-primary/0 group-hover:border-primary/30"
        }`}
      />
    </div>
  );
}

function Subsection({
  icon,
  title,
  highlight,
  games,
  onBuy,
}: {
  icon: string;
  title: string;
  highlight: string;
  games: GameWithStatus[];
  onBuy: (name: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  if (games.length === 0) return null;
  const visible = expanded ? games : games.slice(0, PREVIEW_COUNT);
  const hasMore = games.length > PREVIEW_COUNT;

  return (
    <div className="mt-20 first:mt-0">
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center">
        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
          <span className="text-2xl md:text-3xl">{icon}</span>
          {title} <span className="text-neon-green">{highlight}</span>
        </h3>
        <div className="h-px flex-1 mx-4 bg-gradient-to-r from-primary/40 via-white/10 to-transparent hidden md:block" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          {games.length} {games.length === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((g) => (
          <GameCard key={g.id} game={g} onBuy={onBuy} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-[#0A0A0C]/70 px-6 py-3 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(139,92,246,0.55)]"
          >
            {expanded ? "Ver menos" : "Ver todos"}
            <ArrowRight
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export function GameGrid() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { games } = useCatalog();

  const sections = useMemo(() => {
    const combos = games.filter((g) => g.bundle && g.bundle.length > 0);
    const comboIds = new Set(combos.map((g) => g.id));

    // Lançamentos: últimos adicionados (final do array). Excluir combos para não duplicar.
    const lancamentos = [...games]
      .reverse()
      .filter((g) => !comboIds.has(g.id) && !g.isSoldOut)
      .slice(0, 6);
    const lancIds = new Set(lancamentos.map((g) => g.id));

    // Mais vendidos: categoria "popular"
    const maisVendidos = games
      .filter(
        (g) =>
          g.categories?.includes("popular") &&
          !comboIds.has(g.id) &&
          !lancIds.has(g.id) &&
          !g.isSoldOut,
      )
      .slice(0, 8);
    const vendidosIds = new Set(maisVendidos.map((g) => g.id));

    const usados = new Set([...comboIds, ...lancIds, ...vendidosIds]);
    const jogosSteam = games.filter(
      (g) => !usados.has(g.id) && !g.isSoldOut,
    );

    // Esgotados: sempre no final, separados
    const esgotados = games.filter((g) => g.isSoldOut);

    return { lancamentos, maisVendidos, combos, jogosSteam, esgotados };
  }, [games]);

  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-4 sm:px-6 relative z-10">
      <div className="flex flex-col gap-3 mb-12 sm:flex-row sm:items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
          CATÁLOGO DE <span className="text-neon-green">JOGOS</span>
        </h2>
        <div className="h-px flex-1 mx-8 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />
        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          SISTEMA ONLINE
        </div>
      </div>

      <Subsection
        icon="🔥"
        title="Lançamentos"
        highlight="recentes"
        games={sections.lancamentos}
        onBuy={setSelectedProduct}
      />
      <Subsection
        icon="⭐"
        title="Mais"
        highlight="Vendidos"
        games={sections.maisVendidos}
        onBuy={setSelectedProduct}
      />
      <Subsection
        icon="🎁"
        title="Combos"
        highlight="2 em 1"
        games={sections.combos}
        onBuy={setSelectedProduct}
      />
      <Subsection
        icon="🎮"
        title="Jogos"
        highlight="Steam"
        games={sections.jogosSteam}
        onBuy={setSelectedProduct}
      />

      <PurchaseModal
        isOpen={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
        productName={selectedProduct || ""}
      />
    </section>
  );
}
