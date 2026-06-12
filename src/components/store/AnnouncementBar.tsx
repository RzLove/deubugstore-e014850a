import { Phone, ArrowRight } from "lucide-react";
import { DISCORD_URL } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary-glow to-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-3 px-4 py-3 sm:flex-row sm:gap-5">
        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold">
          <Phone className="h-4 w-4" />
          Deseja solicitar algum jogo que não encontrou?
        </div>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Solicitar um jogo pelo nosso Discord"
          className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-background px-5 py-2 text-xs font-bold tracking-wide text-foreground transition-all duration-200 ease-out hover:scale-105 hover:bg-card hover:shadow-[0_0_18px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          CLIQUE AQUI <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
