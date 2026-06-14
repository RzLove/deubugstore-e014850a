import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { searchGames, type Game } from "@/lib/games";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const stripAccents = (s: string) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const lower = stripAccents(text);
  const q = stripAccents(query);
  const idx = lower.indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent text-primary-glow font-bold">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

interface Props {
  className?: string;
  fullscreenMobile?: boolean;
}

export function SearchAutocomplete({ className = "" }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: Game[] = useMemo(() => {
    if (query.trim().length < 2) return [];
    return searchGames(query, 6);
  }, [query]);

  // Outside click + Esc
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => setActiveIndex(0), [query]);

  const goSearchPage = () => {
    setOpen(false);
    navigate({ to: "/busca", search: { q: query.trim() } });
  };

  const goGame = (g: Game) => {
    setOpen(false);
    setQuery("");
    navigate({ to: "/game/$id", params: { id: g.slug } });
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex] && open) goGame(results[activeIndex]);
      else if (query.trim()) goSearchPage();
    }
  };

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
        onClick={() => query.trim() && goSearchPage()}
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="O que você está procurando?"
        className="h-12 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
        aria-autocomplete="list"
        aria-expanded={showDropdown}
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-white"
          aria-label="Limpar"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-primary/30 bg-[#141318] shadow-[0_20px_60px_-15px_rgba(123,46,255,0.5)]">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              Nenhum jogo encontrado para <span className="text-white font-semibold">"{query}"</span>.
              <a
                href="#solicitar-jogo"
                className="mt-2 block w-fit rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary-glow"
              >
                Solicitar este jogo
              </a>
            </div>
          ) : (
            <ul role="listbox" className="max-h-[420px] overflow-y-auto py-1">
              {results.map((g, i) => (
                <li key={g.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => goGame(g)}
                    className={`flex w-full items-center gap-3 px-3 py-2 text-left transition ${
                      i === activeIndex
                        ? "bg-primary/15"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <img
                      src={g.cover}
                      alt={g.name}
                      className="h-12 w-20 shrink-0 rounded object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-white">
                        <Highlight text={g.name} query={query} />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {g.categories[0]?.toUpperCase()}
                      </div>
                    </div>
                    <div className="shrink-0 font-display text-sm font-extrabold text-[#d9f99d]">
                      {g.discountedPrice}
                    </div>
                  </button>
                </li>
              ))}
              <li className="border-t border-white/5">
                <button
                  type="button"
                  onClick={goSearchPage}
                  className="w-full px-3 py-2 text-center text-xs font-bold text-primary-glow hover:bg-white/[0.03]"
                >
                  Ver todos os resultados para "{query}"
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
