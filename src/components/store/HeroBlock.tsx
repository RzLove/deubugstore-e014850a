import { useEffect, useRef, useState } from "react";
import { Eye, HelpCircle, ShoppingCart, Star, ArrowRight, Maximize2, X } from "lucide-react";
import banner from "@/assets/deu-bug-banner.png.asset.json";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatCard({
  delay,
  value,
  numericTarget,
  label,
  icon: Icon,
  extra,
  onClick,
  visible,
}: {
  delay: number;
  value: string;
  numericTarget?: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  extra?: React.ReactNode;
  onClick?: () => void;
  visible: boolean;
}) {
  const count = useCountUp(numericTarget ?? 0, visible && !!numericTarget);
  const display = numericTarget
    ? `${count.toLocaleString("pt-BR")}+`
    : value;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ transitionDelay: `${delay}ms` }}
      className={`group relative flex items-start justify-between gap-3 rounded-[14px] border border-primary/25 bg-[#141318] p-6 text-left transition-all duration-500 hover:border-primary/70 hover:shadow-[0_0_28px_-6px_rgba(124,58,237,0.7)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
          {display}
        </div>
        <div className="mt-1 h-[3px] w-10 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
        <div className="mt-3 text-sm font-medium text-white/75">{label}</div>
        {extra}
      </div>
      <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl border border-primary/50 bg-primary/10 text-primary-glow shadow-[0_0_18px_-4px_rgba(124,58,237,0.9)] transition group-hover:bg-primary/20">
        <Icon className="h-5 w-5" />
      </div>
    </button>
  );
}

export function HeroBlock() {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const scrollToFaq = () =>
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  const scrollToCatalog = () =>
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6">
      {/* BANNER */}
      <div
        style={{ transitionDelay: "0ms" }}
        className={`group relative overflow-hidden rounded-2xl border border-primary/35 shadow-[0_0_60px_-15px_rgba(124,58,237,0.65)] transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={scrollToCatalog}
          className="block w-full"
          aria-label="Ver catálogo de jogos"
        >
          <img
            src={banner.url}
            alt="Os melhores jogos Steam — Deu Bug Store"
            className="block h-auto w-full"
            loading="eager"
            decoding="async"
          />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightbox(true);
          }}
          aria-label="Expandir banner"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-black/60 text-white/80 backdrop-blur transition hover:border-primary hover:text-white"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* STATS */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          delay={150}
          visible={visible}
          value="10.500+"
          numericTarget={10500}
          label="Vendas Realizadas"
          icon={Eye}
        />
        <StatCard
          delay={250}
          visible={visible}
          value="FAQs"
          label="Central de dúvidas"
          icon={HelpCircle}
          onClick={scrollToFaq}
          extra={
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-glow">
              <ArrowRight className="h-3 w-3" /> Acesse agora
            </span>
          }
        />
        <StatCard
          delay={350}
          visible={visible}
          value="59.500+"
          numericTarget={59500}
          label="Acessos"
          icon={ShoppingCart}
        />
        <StatCard
          delay={450}
          visible={visible}
          value="4.9 ★"
          label="Avaliações recebidas"
          icon={Star}
          extra={
            <div className="mt-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-primary text-primary drop-shadow-[0_0_4px_rgba(124,58,237,0.8)]"
                />
              ))}
            </div>
          }
        />
      </div>

      {/* TWO WIDE BUTTONS */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            href: "https://discord.gg/",
            label: "Suporte Discord",
            external: true,
            delay: 550,
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-primary-glow"
                aria-hidden
              >
                <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3c-.214.39-.464.91-.636 1.32a18.27 18.27 0 0 0-5.844 0A12.7 12.7 0 0 0 9.44 3 19.74 19.74 0 0 0 5.677 4.37C2.058 9.79 1.07 15.07 1.564 20.28a19.94 19.94 0 0 0 6.067 3.07c.49-.67.927-1.38 1.303-2.13-.713-.27-1.395-.6-2.04-.99.171-.13.339-.26.5-.39 3.93 1.83 8.18 1.83 12.063 0 .163.13.33.26.5.39-.647.39-1.33.72-2.043.99.377.75.813 1.46 1.303 2.13a19.9 19.9 0 0 0 6.07-3.07c.578-6.04-.99-11.27-4.97-15.91zM8.02 16.36c-1.18 0-2.157-1.085-2.157-2.42 0-1.335.955-2.42 2.157-2.42 1.21 0 2.18 1.094 2.158 2.42 0 1.335-.955 2.42-2.158 2.42zm7.96 0c-1.18 0-2.157-1.085-2.157-2.42 0-1.335.955-2.42 2.157-2.42 1.21 0 2.18 1.094 2.158 2.42 0 1.335-.948 2.42-2.158 2.42z" />
              </svg>
            ),
          },
          {
            href: "#feedbacks",
            label: "Feedbacks",
            external: false,
            delay: 700,
            icon: <Star className="h-5 w-5 fill-primary-glow text-primary-glow" />,
          },
        ].map((b) => (
          <a
            key={b.label}
            href={b.href}
            target={b.external ? "_blank" : undefined}
            rel={b.external ? "noopener noreferrer" : undefined}
            style={{ transitionDelay: `${b.delay}ms` }}
            className={`flex h-14 items-center justify-center gap-3 rounded-[14px] border border-primary/25 bg-[#141318] text-sm font-bold text-white transition-all duration-500 hover:border-primary/70 hover:bg-[#1a1822] hover:shadow-[0_0_24px_-6px_rgba(124,58,237,0.7)] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {b.icon}
            {b.label}
          </a>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-white hover:border-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={banner.url}
            alt="Banner Deu Bug Store"
            className="max-h-[92vh] max-w-[96vw] rounded-xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
