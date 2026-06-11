import { Eye, HelpCircle, ShoppingBag, Star, MessagesSquare, Heart, KeyRound, User } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
  { value: "10.500+", label: "Vendas Realizadas", icon: Eye },
  { value: "FAQs", label: "Central de dúvidas", icon: HelpCircle, link: "→ Acesse agora" },
  { value: "59.500+", label: "Acessos", icon: ShoppingBag },
  { value: "4.9 ★", label: "Avaliações recebidas", icon: Star, stars: true },
];

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-[1280px] px-4 pt-8 sm:px-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border glow-primary-lg">
        <img
          src={heroBanner}
          alt="Deu Bug Store — os melhores jogos Steam"
          width={1920}
          height={720}
          className="h-[260px] w-full object-cover sm:h-[360px] md:h-[440px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <div className="flex items-center gap-2 self-start rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-semibold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary-glow shadow-[0_0_10px] shadow-primary" />
            DEU BUG STORE
          </div>
          <div className="max-w-xl space-y-4">
            <h1 className="font-display text-3xl font-extrabold leading-[0.95] sm:text-5xl md:text-6xl">
              Os melhores <br />
              jogos <span className="text-gradient-primary">Steam</span>
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold backdrop-blur">
                <KeyRound className="h-4 w-4 text-primary-glow" />
                Receba e ative na hora
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-semibold backdrop-blur">
                <User className="h-4 w-4 text-primary-glow" />
                Jogo direto na sua conta pessoal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="surface-card group relative flex items-center justify-between p-5 transition hover:border-primary/50"
            >
              <div className="space-y-1">
                <div className="font-display text-2xl font-extrabold sm:text-3xl">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
                {s.link && (
                  <div className="pt-1 text-xs font-semibold text-primary-glow">{s.link}</div>
                )}
                {s.stars && (
                  <div className="flex gap-0.5 pt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                )}
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-primary-glow glow-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Discord / Feedback */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <button className="surface-card flex h-14 items-center justify-center gap-2.5 text-sm font-semibold transition hover:border-primary/50 hover:bg-secondary/60">
          <MessagesSquare className="h-4 w-4 text-primary-glow" />
          Suporte Discord
        </button>
        <button className="surface-card flex h-14 items-center justify-center gap-2.5 text-sm font-semibold transition hover:border-primary/50 hover:bg-secondary/60">
          <Heart className="h-4 w-4 text-primary-glow" />
          Feedbacks
        </button>
      </div>
    </section>
  );
}
