import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { searchGames } from "@/lib/games";
import logo from "@/assets/deu-bug-logo.png.asset.json";
import { Search } from "lucide-react";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/busca")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Busca — Deu Bug Store" },
      { name: "description", content: "Resultados da busca na Deu Bug Store." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const results = q.trim().length >= 1 ? searchGames(q, 60) : [];

  return (
    <div className="relative min-h-screen text-white">
      <Header cartCount={0} />
      <main className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl sm:text-3xl font-black italic tracking-tight">
          {results.length > 0 ? (
            <>
              <span className="text-primary-glow">{results.length}</span>{" "}
              resultado{results.length !== 1 ? "s" : ""} para "{q}"
            </>
          ) : (
            <>Buscar jogos</>
          )}
        </h1>

        {results.length === 0 && q.trim() && (
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-[#0A0A0C] p-10 text-center">
            <img src={logo.url} alt="Deu Bug" className="h-16 w-16 opacity-80" />
            <p className="text-lg font-semibold">
              Nenhum jogo encontrado para "{q}"
            </p>
            <p className="text-sm text-muted-foreground">
              Tente outros termos ou solicite o título para o nosso time.
            </p>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground glow-primary"
            >
              Solicitar este jogo
            </a>
          </div>
        )}

        {!q.trim() && (
          <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-secondary/60 px-5 py-3 text-muted-foreground">
            <Search className="h-4 w-4" /> Use a busca do cabeçalho para encontrar um jogo.
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map((g) => (
              <button
                key={g.id}
                onClick={() =>
                  navigate({ to: "/game/$id", params: { id: g.id.toString() } })
                }
                className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#0A0A0C] text-left transition hover:border-primary/40 hover:shadow-[0_0_30px_rgba(123,46,255,0.25)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={g.cover}
                    alt={g.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-2 top-2 rounded bg-primary/90 px-2 py-0.5 text-[10px] font-black text-primary-foreground">
                    {g.discount} OFF
                  </span>
                </div>
                <div className="p-3">
                  <div className="line-clamp-2 text-sm font-bold text-white">
                    {g.name}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xs text-muted-foreground line-through">
                      {g.originalPrice}
                    </span>
                    <span className="font-display text-lg font-extrabold text-[#d9f99d]">
                      {g.discountedPrice}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/" className="text-sm text-primary-glow hover:underline">
            ← Voltar para a loja
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
