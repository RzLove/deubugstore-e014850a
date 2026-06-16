import { Star, User, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Lucas M.",
    comment: "Comprei GTA 5 e recebi em 2 minutos. Super recomendo!",
    rating: 5,
    color: "bg-neon-cyan",
    gradient: "from-neon-cyan/20",
  },
  {
    name: "Ana Paula R.",
    comment: "Streaming do Netflix chegou automático, funciona perfeitamente.",
    rating: 5,
    color: "bg-neon-green",
    gradient: "from-neon-green/20",
  },
  {
    name: "Felipe S.",
    comment: "Melhor preço que encontrei, suporte top no Discord.",
    rating: 5,
    color: "bg-primary",
    gradient: "from-primary/20",
  },
  {
    name: "Julia C.",
    comment: "Comprou Spider-Man 2 e ativou na hora. Muito fácil!",
    rating: 5,
    color: "bg-neon-green-soft",
    gradient: "from-[#7CFC00]/20",
  },
  {
    name: "Gabriel T.",
    comment: "Já fiz 5 compras e nunca tive problema. Deu Bug é confiável demais!",
    rating: 5,
    color: "bg-neon-cyan",
    gradient: "from-neon-cyan/20",
  },
  {
    name: "Mariana L.",
    comment: "Paguei no Pix e em menos de 1 minuto já tinha o jogo. Incrível!",
    rating: 5,
    color: "bg-primary",
    gradient: "from-primary/20",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "fill-white/10 text-white/10"}`}
        />
      ))}
    </div>
  );
}

function Avatar({ name, color }: { name: string; color: string }) {
  const initial = name.charAt(0);
  return (
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-lg font-black uppercase text-white`}
    >
      {initial}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-20 sm:px-6">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="font-display text-3xl font-black italic uppercase tracking-tight text-white sm:text-4xl">
          O que nossos <span className="text-neon-green">clientes</span> dizem
        </h2>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neon-green/20 bg-neon-green/10 px-5 py-2 text-sm font-bold text-neon-green">
          <BadgeCheck className="h-4 w-4" />
          +4.900 clientes satisfeitos
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0A0A0C]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_40px_-8px_rgba(139,92,246,0.2)]"
          >
            {/* Top accent line */}
            <div className={`absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r ${t.gradient} to-transparent`} />

            <div className="flex items-center gap-3">
              <Avatar name={t.name} color={t.color} />
              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-white">
                  {t.name}
                </h4>
                <StarRating count={t.rating} />
              </div>
            </div>

            <p className="text-sm leading-relaxed text-white/60">
              "{t.comment}"
            </p>

            <div className="mt-auto flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-neon-green" />
              <span className="text-[11px] font-black uppercase tracking-widest text-neon-green/80">
                Cliente verificado
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
