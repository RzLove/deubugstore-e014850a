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
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-background px-4 text-xs font-bold tracking-wide text-foreground transition hover:bg-card"
        >
          CLIQUE AQUI <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
