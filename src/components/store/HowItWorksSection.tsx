import { Gamepad2, QrCode, Zap, CalendarCheck, ShieldCheck, MessageCircle, Send, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: Gamepad2,
    title: "Escolha seu jogo ou streaming",
    description: "Navegue pelo catálogo e encontre o título perfeito para você.",
    accent: "text-primary",
    glow: "shadow-[0_0_30px_-8px_rgba(139,92,246,0.4)]",
  },
  {
    icon: QrCode,
    title: "Pague com Pix de forma segura",
    description: "Pagamento instantâneo e 100% seguro. Sem burocracia.",
    accent: "text-neon-green",
    glow: "shadow-[0_0_30px_-8px_rgba(57,255,20,0.4)]",
  },
  {
    icon: Zap,
    title: "Receba os dados em até 5 minutos",
    description: "Entrega automática e super rápida direto no Discord ou WhatsApp.",
    accent: "text-neon-cyan",
    glow: "shadow-[0_0_30px_-8px_rgba(34,211,238,0.4)]",
  },
  {
    icon: CalendarCheck,
    title: "Jogue por vários dias na sua conta",
    description: "Acesso garantido por dias na sua conta. Aproveite sem limites.",
    accent: "text-primary",
    glow: "shadow-[0_0_30px_-8px_rgba(139,92,246,0.4)]",
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    text: "7 dias de garantia para reembolso",
  },
  {
    icon: MessageCircle,
    text: "Suporte via Discord e WhatsApp",
  },
  {
    icon: Send,
    text: "Entrega automática para streaming",
  },
  {
    icon: RotateCcw,
    text: "Reembolso em caso de problema técnico",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
      {/* Section Title */}
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-black italic uppercase tracking-tight text-white sm:text-4xl">
          Como <span className="text-neon-green">Funciona</span>
        </h2>
        <p className="mt-2 text-sm font-medium text-white/50">
          De escolher até jogar em 4 passos simples
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className={`group relative flex flex-col items-center rounded-2xl border border-white/10 bg-[#0A0A0C]/80 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:-translate-y-1 ${step.glow}`}
            >
              {/* Step number badge */}
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#0A0A0C] px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-white/60">
                Passo {index + 1}
              </span>

              {/* Icon */}
              <div className={`mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover:scale-110 ${step.accent}`}>
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <h3 className="font-display text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Guarantee Banner */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-primary/10 via-[#0A0A0C]/90 to-neon-green/10 p-6 sm:p-8 backdrop-blur-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neon-green">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-white/80 leading-tight">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
