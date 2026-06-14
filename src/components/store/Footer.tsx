import { BadgeCheck, MessagesSquare, MessageCircle, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/store/SocialIcons";
import { DISCORD_URL, WHATSAPP_LINK, WHATSAPP_PHONE_DISPLAY } from "@/lib/constants";
import logo from "@/assets/deu-bug-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#050507]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div className="space-y-6 col-span-2 lg:col-span-1">
          <div className="group flex items-center gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-primary/50 bg-black shadow-[0_0_18px_rgba(123,46,255,0.45)]">
              <img
                src={logo.url}
                alt="Deu Bug Store"
                width={128}
                height={128}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0">
              <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
                Deu Bug <span className="text-primary italic">Store</span>
              </span>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-neon-green/80">
                Glitch nos preços, não na entrega.
              </p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-white/40 leading-relaxed font-medium">
            Sua interface definitiva para keys digitais. <br />
            O sistema corrompido que entrega o <span className="text-neon-cyan italic">preço que você procura</span>.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.tiktok.com/@deu.bug.aqui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@deubugaqui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:border-red-500/50 hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/60 transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(123,46,255,0.3)]"
            >
              <MessagesSquare className="h-5 w-5" />
            </a>
          </div>
        </div>

        {([
          {
            title: "Navegação",
            links: [
              { label: "Início", href: "/", external: false },
              { label: "Buscar Jogos", href: "/busca", external: false },
              { label: "WhatsApp", href: WHATSAPP_LINK, external: true },
              { label: "Discord", href: DISCORD_URL, external: true },
            ],
          },
          {
            title: "Suporte",
            links: [
              { label: "Fale no WhatsApp", href: WHATSAPP_LINK, external: true },
              { label: "Discord Oficial", href: DISCORD_URL, external: true },
              { label: "TikTok", href: "https://www.tiktok.com/@deu.bug.aqui", external: true },
              { label: "YouTube", href: "https://youtube.com/@deubugaqui", external: true },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Termos de Uso", href: WHATSAPP_LINK, external: true },
              { label: "Privacidade", href: WHATSAPP_LINK, external: true },
              { label: "Políticas", href: WHATSAPP_LINK, external: true },
              { label: "Reembolso", href: WHATSAPP_LINK, external: true },
            ],
          },
        ]).map((g) => (
          <div key={g.title} className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">{g.title}</h4>
            <ul className="space-y-4 text-sm font-bold text-white/30">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    className="transition-colors hover:text-white"
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Seção de contato — WhatsApp como canal principal */}
      <div className="border-t border-white/5 bg-[#070709]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366] shadow-[0_0_18px_rgba(37,211,102,0.25)]">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm font-black uppercase tracking-[0.18em] text-white">
                Atendimento rápido pelo WhatsApp
              </h4>
              <p className="mt-1 text-sm text-white/60">
                Fale com a gente: <span className="font-bold text-white">{WHATSAPP_PHONE_DISPLAY}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">
                Atendimento todos os dias — respondemos o mais rápido possível.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chamar no WhatsApp"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#25D366] px-6 text-sm font-bold text-white shadow-[0_0_22px_rgba(37,211,102,0.45)] transition hover:bg-[#1FB855] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70"
          >
            <MessageCircle className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      
      
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-8 text-[10px] font-black uppercase tracking-widest text-white/20 sm:flex-row sm:px-6">
          <span>© 2026 DEU BUG STORE // PROTOCOL_V1.0</span>
          <div className="flex items-center gap-6">
             <span className="flex items-center gap-2">
                <BadgeCheck className="h-3 w-3 text-neon-cyan" /> SISTEMA SEGURO
             </span>
             <span className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-neon-green"></div> ONLINE
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
