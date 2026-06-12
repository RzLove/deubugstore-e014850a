import { createFileRoute } from "@tanstack/react-router";
import { Header, Banner, Hero, Benefits } from "@/components/store/LandingUI";
import { FeaturedSection } from "@/components/store/FeaturedSection";
import { Footer } from "@/components/store/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deu Bug Store — OS MELHORES JOGOS COM O MELHOR PREÇO!" },
      {
        name: "description",
        content: "Aqui o bug é só no preço! Entrega automática, compra 100% segura e suporte 24/7. Os melhores jogos digitais com descontos insanos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Persistent Glitch Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        {/* Animated Glitch Scanline */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_rgba(123,46,255,0.5)] animate-[scanline_8s_linear_infinite]"></div>
      </div>

      <Header />
      <Banner />
      
      <main className="relative z-10">
        <Hero />
        <Benefits />
        <FeaturedSection />
      </main>

      <Footer />

      <style>{`
        @keyframes scanline {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
}
