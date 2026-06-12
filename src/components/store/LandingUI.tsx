import {
  ShoppingCart,
  User,
  Search,
  BadgeCheck,
  Eye,
  HelpCircle,
  Star,
  MessageSquare,
  ArrowRight,
  KeyRound,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";

/* ---------------- HEADER ---------------- */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:gap-6 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="relative">
            <span className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
              Stm<span className="text-primary"> Store</span>
            </span>
          </div>
          <BadgeCheck className="h-5 w-5 fill-primary text-white" />
        </a>

        {/* Search */}
        <div className="relative mx-auto w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            placeholder="O que você está procurando?"
            className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button className="hidden h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-white/80 transition hover:border-primary/50 hover:bg-white/[0.06] hover:text-white sm:inline-flex">
            <User className="h-4 w-4" />
            Entrar
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.7)] transition hover:bg-primary/90 hover:shadow-[0_0_32px_-2px_rgba(139,92,246,0.9)]">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-black text-primary">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- ANNOUNCEMENT BANNER ---------------- */
export function Banner() {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-[#a855f7] to-primary">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:gap-6 sm:px-6">
        <p className="text-center text-sm font-semibold text-white sm:text-left">
          Deseja solicitar algum jogo que não encontrou?
        </p>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-full bg-black px-4 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-primary">
          Clique aqui <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-4 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a0b2e] via-[#0d0518] to-[#1a0b2e] shadow-[0_0_60px_-10px_rgba(139,92,246,0.4)]">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80"
          alt="Banner principal Stm Store"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        {/* Glow overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute -left-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

        <div className="relative z-10 grid gap-8 p-6 sm:p-10 md:grid-cols-2 md:p-14 lg:p-16">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
              Stm Store
            </div>

            <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Os melhores
              <br /> jogos{" "}
              <span className="bg-gradient-to-r from-primary via-[#c084fc] to-primary bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]">
                Steam
              </span>
            </h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(139,92,246,0.8)] transition hover:shadow-[0_0_28px_-2px_rgba(139,92,246,1)]">
                <KeyRound className="h-4 w-4" />
                Receba e ative na hora
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_-4px_rgba(139,92,246,0.8)] transition hover:shadow-[0_0_28px_-2px_rgba(139,92,246,1)]">
                <UserCircle2 className="h-4 w-4" />
                Jogo direto na sua conta pessoal
              </span>
            </div>
          </div>

          {/* RIGHT — descriptive block */}
          <div className="flex items-center">
            <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <h2 className="font-display text-xl font-black uppercase tracking-wide text-white">
                A loja mais confiável do Brasil
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Na <span className="font-bold text-primary">Stm Store</span>{" "}
                você encontra os maiores títulos da Steam com entrega 100%
                automática, suporte humano 24/7 e preços imbatíveis. Compre
                com segurança e jogue em minutos — sem complicação, sem
                espera, sem bug no preço.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                <BadgeCheck className="h-4 w-4" />
                Licenças 100% originais
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STATS + SUPPORT ---------------- */
const stats = [
  { value: "10.500+", label: "Vendas Realizadas", icon: Eye },
  { value: "FAQs", label: "Central de dúvidas", icon: HelpCircle, link: "Acesse agora →" },
  { value: "59.500+", label: "Acessos", icon: ShoppingCart },
  { value: "4.9 ★", label: "Avaliações recebidas", icon: Star, stars: true },
];

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.07.07 0 0 0-.073.035c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.249.073.073 0 0 0-.073-.035 19.736 19.736 0 0 0-3.76 1.169.066.066 0 0 0-.03.027C2.533 8.046 1.78 11.61 2.144 15.13a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.073.073 0 0 0 .079-.026c.461-.63.873-1.295 1.226-1.994a.072.072 0 0 0-.04-.101 13.1 13.1 0 0 1-1.872-.892.073.073 0 0 1-.007-.121c.126-.094.252-.192.372-.291a.07.07 0 0 1 .073-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .074.009c.12.099.246.198.373.292a.073.073 0 0 1-.006.121c-.598.349-1.22.645-1.873.891a.072.072 0 0 0-.038.102c.36.698.772 1.362 1.225 1.993a.072.072 0 0 0 .079.027 19.84 19.84 0 0 0 6.002-3.03.073.073 0 0 0 .031-.055c.5-4.066-.838-7.602-3.549-10.735a.058.058 0 0 0-.03-.027zM8.02 13.001c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] p-5 transition hover:border-primary/50 hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.5)]"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/30" />
              <div className="relative flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="font-display text-2xl font-black text-white sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="text-xs font-medium text-white/60">{s.label}</div>
                  <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-[#c084fc]" />
                  {s.link && (
                    <div className="pt-1 text-xs font-bold text-primary">{s.link}</div>
                  )}
                  {s.stars && (
                    <div className="flex gap-0.5 pt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/15 text-primary shadow-[0_0_20px_-6px_rgba(139,92,246,0.8)]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support / Feedback */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <button className="group flex h-16 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0c] text-sm font-bold text-white/80 transition hover:border-primary/60 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)]">
          <DiscordIcon className="h-5 w-5 text-primary transition group-hover:scale-110" />
          Suporte Discord
        </button>
        <button className="group flex h-16 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0c] text-sm font-bold text-white/80 transition hover:border-primary/60 hover:bg-white/[0.04] hover:text-white hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)]">
          <Star className="h-5 w-5 fill-primary text-primary transition group-hover:scale-110" />
          Feedbacks
        </button>
      </div>
    </section>
  );
}
