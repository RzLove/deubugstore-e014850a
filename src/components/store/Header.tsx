import { BadgeCheck, Youtube } from "lucide-react";
import { SearchAutocomplete } from "@/components/store/SearchAutocomplete";
import { TikTokIcon } from "@/components/store/SocialIcons";
import logo from "@/assets/deu-bug-logo.png.asset.json";

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center gap-6 px-4 sm:px-6">
        <a href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/60 bg-black shadow-[0_0_12px_rgba(123,46,255,0.55)] transition-shadow group-hover:shadow-[0_0_18px_rgba(123,46,255,0.85)] sm:h-12 sm:w-12">
            <img
              src={logo.url}
              alt="Deu Bug Store"
              width={96}
              height={96}
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="font-display text-lg font-extrabold tracking-tight text-white">
              Deu Bug <span className="text-primary italic">Store</span>
            </span>
            <BadgeCheck className="h-4 w-4 text-primary" />
          </div>
        </a>

        <SearchAutocomplete className="mx-auto flex-1 max-w-xl" />

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 mr-1">
            <a
              href="https://www.tiktok.com/@deu.bug.aqui"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:border-cyan-400/50 hover:text-cyan-400"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://youtube.com/@deubugaqui"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition hover:border-red-500/50 hover:text-red-500"
              aria-label="YouTube"
            >
              <Youtube className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </header>

  );
}
