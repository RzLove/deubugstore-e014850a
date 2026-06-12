import { useState } from "react";
import { Flame, ChevronLeft, ChevronRight, Maximize2, VolumeX, ShoppingCart, ArrowRight, MessagesSquare } from "lucide-react";
import { PurchaseModal } from "./PurchaseModal";
import { games } from "@/lib/games";
import { useNavigate } from "@tanstack/react-router";

export function PopularGames() {
  const [selected, setSelected] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const navigate = useNavigate();
  const current = games[selected];

  return (
    <section className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
        {/* Left — pitch */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            <span className="text-gradient-primary">Deu Bug Store</span>
            <br />
            <span className="text-foreground">a melhor loja</span>
            <br />
            <span className="text-muted-foreground">de produtos digitais</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A nossa loja se destaca como a referência no mercado, oferecendo uma ampla variedade de
            produtos digitais com{" "}
            <a className="text-primary-glow underline-offset-4 hover:underline">preços competitivos</a>{" "}
            e qualidade incomparável.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground glow-primary transition hover:bg-primary-glow">
              Ver produtos <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => window.open("https://discord.gg/deubug", "_blank")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 text-sm font-semibold transition hover:border-primary/60 hover:bg-secondary"
            >
              <MessagesSquare className="h-4 w-4" /> Discord
            </button>
          </div>
        </div>

        {/* Right — carousel + player */}
        <div className="space-y-5">
          <div className="surface-card p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary-glow glow-primary">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-base font-bold">Jogos populares</div>
                <div className="text-xs text-muted-foreground">Selecione um jogo e assista ao trailer</div>
              </div>
            </div>
            <div className="relative">
              <button className="absolute left-0 top-1/2 z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:border-primary/60">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="scroll-px-2 flex gap-3 overflow-x-auto px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {games.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => setSelected(i)}
                    className={`relative shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      i === selected
                        ? "border-primary glow-primary"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={g.cover}
                      alt={g.name}
                      loading="lazy"
                      width={128}
                      height={180}
                      className="h-[180px] w-[128px] object-cover"
                    />
                  </button>
                ))}
              </div>
              <button className="absolute right-0 top-1/2 z-10 grid h-9 w-9 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/80 backdrop-blur transition hover:border-primary/60">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* "Player" */}
          <div 
            onClick={() => navigate({ to: "/game/$id", params: { id: current.id.toString() } })}
            className="relative overflow-hidden rounded-2xl border border-border glow-primary-lg cursor-pointer"
          >
            <img
              key={current.id}
              src={current.cover}
              alt={current.name}
              loading="lazy"
              width={1280}
              height={720}
              className="h-[280px] w-full object-cover sm:h-[360px] animate-in fade-in duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute right-3 top-3 flex gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background/70 backdrop-blur hover:border-primary/60">
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary-glow">
                <VolumeX className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 p-5">
              <div>
                <div className="font-display text-xl font-extrabold">{current.name}</div>
                <div className="mt-1 font-display text-2xl font-extrabold text-primary-glow">{current.discountedPrice}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPurchaseModalOpen(true);
                  }}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground glow-primary hover:bg-primary-glow"
                >
                  <ShoppingCart className="h-4 w-4" /> Comprar agora
                </button>
                <button 
                  onClick={() => navigate({ to: "/game/$id", params: { id: current.id.toString() } })}
                  className="inline-flex h-10 items-center rounded-lg border border-border bg-background/70 px-4 text-sm font-semibold backdrop-blur hover:border-primary/60"
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onOpenChange={setIsPurchaseModalOpen} 
        productName={current.name}
      />
    </section>
  );
}

