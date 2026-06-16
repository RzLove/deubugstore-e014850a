import { BadgeCheck, MessagesSquare, MessageCircle, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/store/SocialIcons";
import { DISCORD_URL, WHATSAPP_LINK, WHATSAPP_PHONE_DISPLAY } from "@/lib/constants";
import logo from "@/assets/deu-bug-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5 bg-[#050507]">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        {/* Brand Row */}
        <div className="mb-14 flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
          <div className="group flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/50 bg-black shadow-[0_0_18px_rgba(139,92,246,0.45)]">
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
          <div>
            <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
              Deu Bug <span className="text-primary italic">Store</span>
            </span>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-neon-green/80">
              Glitch nos preços, não na entrega.
            </p>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1 — Institucional */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">
              Institucional
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li>
                <a
                  href="/sobre"
                  className="transition-colors hover:text-neon-green"
                >
                  Sobre a Deu Bug Store
                </a>
              </li>
              <li>
                <a
                  href="/como-funciona"
                  className="transition-colors hover:text-neon-green"
                >
                  Como Funciona
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="transition-colors hover:text-neon-green"
                >
                  Blog / Novidades
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2 — Ajuda */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">
              Ajuda
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li>
                <a
                  href="/faq"
                  className="transition-colors hover:text-neon-green"
                >
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neon-green"
                >
                  Suporte Discord
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neon-green"
                >
                  Fale no WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="/politica-de-troca"
                  className="transition-colors hover:text-neon-green"
                >
                  Política de Troca
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3 — Legal */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">
              Legal
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li>
                <a
                  href="/termos-de-uso"
                  className="transition-colors hover:text-neon-green"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/politica-de-privacidade"
                  className="transition-colors hover:text-neon-green"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/politica-de-reembolso"
                  className="transition-colors hover:text-neon-green"
                >
                  Política de Reembolso
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4 — Redes Sociais */}
          <div className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">
              Redes Sociais
            </h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li>
                <a
                  href="https://www.tiktok.com/@deu.bug.aqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neon-green"
                >
                  <TikTokIcon className="h-4 w-4" />
                  TikTok @deu.bug.aqui
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@deubugaqui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neon-green"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube @deubugaqui
                </a>
              </li>
              <li>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-neon-green"
                >
                  <MessagesSquare className="h-4 w-4" />
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* WhatsApp CTA Bar */}
        <div className="mt-14 rounded-2xl border border-white/5 bg-[#070709] p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366] shadow-[0_0_18px_rgba(37,211,102,0.25)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-display text-sm font-black uppercase tracking-[0.18em] text-white">
                  Atendimento rápido pelo WhatsApp
                </h4>
                <p className="mt-1 text-sm text-white/60">
                  Fale com a gente:{" "}
                  <span className="font-bold text-white">{WHATSAPP_PHONE_DISPLAY}</span>
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
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <span className="text-xs font-bold text-white/30">
            © 2026 Deu Bug Store. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-3 w-3 text-neon-cyan" /> SISTEMA SEGURO
            </span>
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neon-green" /> ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

