import { Youtube, ArrowRight } from "lucide-react";
import { TikTokIcon } from "@/components/store/SocialIcons";

const socials = [
  {
    name: "TikTok",
    handle: "@deu.bug.aqui",
    description: "Cortes, ofertas relâmpago e novidades antes de todo mundo. Segue lá!",
    cta: "Seguir no TikTok",
    href: "https://www.tiktok.com/@deu.bug.aqui",
    icon: TikTokIcon,
    hoverBorder: "hover:border-cyan-400/60 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.5)]",
    hoverScale: "hover:scale-[1.02]",
    iconColor: "text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]",
  },
  {
    name: "YouTube",
    handle: "@deubugaqui",
    description: "Gameplays, reviews e tutoriais de ativação passo a passo. Inscreva-se!",
    cta: "Inscrever-se no YouTube",
    href: "https://youtube.com/@deubugaqui",
    icon: Youtube,
    hoverBorder: "hover:border-red-500/60 hover:shadow-[0_0_30px_-8px_rgba(239,68,68,0.5)]",
    hoverScale: "hover:scale-[1.02]",
    iconColor: "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]",
  },
];

export function SocialSection() {
  return (
    <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-black italic uppercase tracking-tight text-white sm:text-4xl">
          Acompanhe a <span className="text-primary">Deu Bug</span>
        </h2>
        <p className="mt-2 text-sm font-medium text-white/50">
          Conteúdo, promoções e bastidores nas nossas redes
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col items-center rounded-2xl border border-white/10 bg-[#0A0A0C] p-8 text-center transition-all duration-300 ${s.hoverBorder} ${s.hoverScale}`}
            >
              <div className={`mb-4 ${s.iconColor}`}>
                <Icon className="h-12 w-12" />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{s.handle}</h3>
              <p className="mt-2 max-w-xs text-sm text-white/50 leading-relaxed">
                {s.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition group-hover:border-white/20 group-hover:bg-white/10">
                {s.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
