import { Search, ShoppingCart, User, BadgeCheck } from "lucide-react";

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center gap-6 px-4 sm:px-6">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <div className="relative h-12 w-auto overflow-hidden">
            <img 
              src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
              alt="Deu Bug Store"
              className="h-full w-auto object-contain"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = "/placeholder.svg";
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement?.classList.add("hidden");
              }}
            />
            {/* Fallback SVG/Logo when the external image is not loaded */}
            <div className="flex items-center gap-3 group shrink-0 logo-fallback">
               <div className="relative h-10 w-10 flex items-center justify-center bg-primary/20 rounded-lg">
                  <span className="text-white font-bold">DB</span>
               </div>
               <span className="font-display text-lg font-extrabold tracking-tight hidden sm:block">
                  Deu Bug Store
               </span>
            </div>
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
