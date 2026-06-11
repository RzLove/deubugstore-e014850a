import { Search, ShoppingCart, User, BadgeCheck } from "lucide-react";

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center gap-6 px-4 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <div className="relative grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-white font-display font-extrabold glow-primary">
            DB
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="font-display text-lg font-extrabold tracking-tight">
              Deu Bug Store
            </span>
            <BadgeCheck className="h-4 w-4 fill-primary text-background" />
          </div>
        </a>

        <div className="relative flex-1 max-w-xl mx-auto">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="O que você está procurando?"
            className="h-12 w-full rounded-full border border-border bg-secondary/60 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground/80 outline-none focus:border-primary focus:ring-2 focus:ring-ring transition"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:inline-flex h-11 items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-secondary">
            <User className="h-4 w-4" />
            Entrar
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground glow-primary transition hover:bg-primary-glow">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-primary">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
