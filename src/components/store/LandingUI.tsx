import {
  ShoppingCart,
  User,
  Search,
  BadgeCheck,
  Award,
  Tag,
  Zap,
  CreditCard,
  Star,
  Shield,
  Headphones,
  Gamepad2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headset,
} from "lucide-react";
import logo from "@/assets/deu-bug-logo.png.asset.json";
import mascot from "@/assets/deu-bug-mascote-blend.png.asset.json";

/* ---------------- HEADER ---------------- */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:gap-6 sm:px-6">
        {/* Logo + name */}
        <a href="/" className="flex shrink-0 items-center gap-3">
          <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-primary/40 bg-black shadow-[0_0_18px_-2px_rgba(139,92,246,0.7)] sm:h-14 sm:w-14">
            <img
              src={logo.url}
              alt="Deu Bug Store"
              width={112}
              height={112}
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="font-display text-xl font-black italic uppercase leading-none tracking-tight text-white sm:text-2xl">
              Deu Bug<br />
              <span className="bg-gradient-to-r from-primary via-neon-green to-primary bg-clip-text text-transparent">
                Store
              </span>
            </span>
            <BadgeCheck className="h-4 w-4 fill-primary text-white" />
          </div>
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
          <button className="hidden h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white/90 transition hover:text-white sm:inline-flex">
            <User className="h-4 w-4" />
            Entrar
          </button>
          <button className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 text-sm font-bold text-white shadow-[0_0_24px_-6px_rgba(139,92,246,0.8)] backdrop-blur transition hover:bg-primary/20">
            <ShoppingCart className="h-4 w-4 text-primary-glow" />
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
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0a0612]">
      {/* glitch pixels */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[5%] top-1/2 h-2 w-12 -translate-y-1/2 bg-neon-cyan/60 blur-[1px]" />
        <div className="absolute right-[7%] top-[30%] h-1.5 w-8 bg-neon-green/70" />
        <div className="absolute left-[18%] top-[20%] h-1 w-4 bg-primary/80" />
        <div className="absolute right-[18%] bottom-[20%] h-1 w-6 bg-[#FF2E5B]/70" />
      </div>
      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-center gap-3 px-4 py-3 sm:flex-row sm:gap-6 sm:px-6">
        <p className="text-center text-sm font-bold text-white">
          <Headset className="mr-2 inline h-4 w-4 -translate-y-0.5 text-neon-green" />
          Não encontrou algum jogo?{" "}
          <span className="text-neon-green">Nós conseguimos para você!</span>
        </p>
        <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/80 bg-transparent px-4 text-xs font-black uppercase tracking-widest text-white transition hover:border-neon-green hover:text-neon-green">
          Clique aqui <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */
export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-[#06030d] shadow-[0_0_80px_-20px_rgba(139,92,246,0.55)]">
        {/* glitch backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_70%,rgba(57,255,20,0.18),transparent_45%)]" />
          {/* horizontal glitch bars */}
          <div className="absolute inset-x-0 top-[18%] h-[2px] bg-neon-cyan/40" />
          <div className="absolute inset-x-0 top-[42%] h-[1px] bg-[#FF2E5B]/40" />
          <div className="absolute inset-x-0 bottom-[22%] h-[2px] bg-neon-green/40" />
          {/* pixel chips */}
          {[
            "left-[6%] top-[12%] h-2 w-10 bg-neon-cyan",
            "left-[10%] top-[26%] h-1 w-6 bg-primary",
            "left-[4%] bottom-[20%] h-2 w-8 bg-neon-green",
            "right-[6%] top-[10%] h-2 w-10 bg-[#FF2E5B]",
            "right-[12%] top-[34%] h-1.5 w-6 bg-neon-cyan",
            "right-[4%] bottom-[28%] h-1.5 w-12 bg-neon-green",
            "right-[20%] bottom-[12%] h-1 w-8 bg-primary",
            "left-[42%] top-[8%] h-1 w-4 bg-neon-green",
          ].map((c, i) => (
            <div key={i} className={`absolute opacity-70 ${c}`} />
          ))}
          {/* scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[size:100%_3px] mix-blend-overlay" />
        </div>

        {/* Nav arrows */}
        <button className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur transition hover:border-primary hover:text-white md:flex">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 backdrop-blur transition hover:border-primary hover:text-white md:flex">
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative z-10 grid items-center gap-10 px-6 py-10 sm:px-12 md:grid-cols-2 md:gap-6 md:py-16 lg:px-20 lg:py-20">
          {/* LEFT */}
          <div className="space-y-7">
            <h1 className="font-display text-5xl font-black italic uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="block text-white text-glitch glitch-skew">Os melhores</span>
              <span className="my-1 block bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-7xl text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.55)] sm:text-8xl lg:text-[8.5rem]">
                Jogos
              </span>
              <span className="block text-white text-glitch glitch-skew">com o melhor</span>
              <span className="block text-7xl text-glitch-green sm:text-8xl lg:text-[8.5rem]">
                Preço!
              </span>
            </h1>

            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
              <p className="text-base font-medium text-white/90 sm:text-lg">
                Aqui o bug é só no preço!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: Zap, t1: "Entrega", t2: "Automática" },
                { icon: Shield, t1: "Compra 100%", t2: "Segura" },
                { icon: Headphones, t1: "Suporte", t2: "24/7" },
              ].map(({ icon: Icon, t1, t2 }) => (
                <div key={t1} className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/50 bg-primary/10 text-primary-glow shadow-[0_0_14px_-4px_rgba(139,92,246,0.9)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-[10px] font-black uppercase leading-tight tracking-widest text-white">
                    {t1}
                    <br />
                    <span className="text-white/70">{t2}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#catalogo"
              className="neon-pulse inline-flex h-14 items-center gap-3 rounded-full border border-primary/60 bg-gradient-to-r from-primary via-[#9d5dff] to-primary px-7 text-sm font-black uppercase tracking-widest text-white transition hover:scale-[1.02]"
            >
              <Gamepad2 className="h-5 w-5" />
              Ver todos os jogos
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* RIGHT — mascot scene */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
            {/* broken monitor frame */}
            <div className="absolute inset-[8%] rounded-[28px] border-2 border-primary/40 bg-[#0a0518]/50 shadow-[inset_0_0_60px_rgba(139,92,246,0.35)]" />
            <div className="absolute inset-[8%] rounded-[28px] border-2 border-neon-green/20" style={{ transform: "translate(6px,4px)" }} />

            {/* DEU BUG AQUI text */}
            <div className="absolute right-[6%] top-[8%] z-20 text-right font-display font-black italic uppercase leading-[0.85] text-white drop-shadow-[0_0_18px_rgba(139,92,246,0.6)]">
              <div className="text-3xl text-glitch sm:text-4xl">Deu</div>
              <div className="text-5xl text-glitch glitch-skew sm:text-6xl">Bug</div>
              <div className="text-3xl text-glitch sm:text-4xl">Aqui</div>
            </div>

            {/* ERROR 404 badge */}
            <div className="absolute bottom-[18%] right-[6%] z-20 rounded-md border border-neon-green/60 bg-black/70 px-3 py-1 text-center font-display text-xs font-black uppercase tracking-widest text-neon-green shadow-[0_0_18px_-2px_rgba(57,255,20,0.7)]">
              Error
              <br />
              404
            </div>

            {/* halo ring */}
            <div className="absolute bottom-[6%] left-1/2 z-0 h-[60px] w-[78%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.55),transparent_70%)] blur-md" />
            <div
              className="absolute bottom-[8%] left-1/2 z-0 h-[26px] w-[60%] -translate-x-1/2 rounded-[50%] border border-neon-green/60"
              style={{ boxShadow: "0 0 30px rgba(57,255,20,0.6), inset 0 0 18px rgba(57,255,20,0.5)" }}
            />

            {/* mascot */}
            <img
              src={logo.url}
              alt="Mascote Deu Bug Store"
              className="float-y relative z-10 h-[88%] w-[88%] object-contain drop-shadow-[0_0_40px_rgba(57,255,20,0.4)]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- BENEFITS (HUD chips) ---------------- */
const benefits = [
  { icon: Award, t1: "Jogos Originais", t2: "E Garantidos" },
  { icon: Tag, t1: "Preços", t2: "Incríveis" },
  { icon: Zap, t1: "Ativação", t2: "Instantânea" },
  { icon: CreditCard, t1: "Parcele em até", t2: "12x" },
  { icon: Star, t1: "Os melhores", t2: "Lançamentos" },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6">
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 md:grid-cols-3 lg:grid-cols-5">
        {benefits.map(({ icon: Icon, t1, t2 }) => (
          <div
            key={t1}
            className="hud-chip group relative flex min-w-[230px] shrink-0 snap-start items-center gap-3 border border-primary/30 bg-gradient-to-br from-[#0d0817] to-[#0a0a0c] px-5 py-4 transition hover:border-neon-green/60 hover:shadow-[0_0_28px_-8px_rgba(57,255,20,0.6)] sm:min-w-0"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary-glow shadow-[0_0_16px_-4px_rgba(139,92,246,0.9)] transition group-hover:border-neon-green/60 group-hover:text-neon-green">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display text-[11px] font-black uppercase leading-tight tracking-widest">
              <div className="text-white">{t1}</div>
              <div className="text-neon-green">{t2}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
