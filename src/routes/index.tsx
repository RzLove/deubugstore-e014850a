import { createFileRoute } from "@tanstack/react-router";
import { Header, Banner, Hero, Benefits } from "@/components/store/LandingUI";
import { FeaturedSection } from "@/components/store/FeaturedSection";
import { GameGrid } from "@/components/store/GameGrid";
import { Footer } from "@/components/store/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEU BTORE — OS MELHORES JOGOS COM O MELHOR PREÇO!" },
      {
        name: "description",
        content: "DEU BTORE: Aqui o bug é só no preço! Entrega automática, compra 100% segura e suporte 24/7. Os melhores jogos digitais com o visual futurista e descontos insanos.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Dynamic Visual Effects Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Background Noise/Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Digital Snow/Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-[2px] h-[2px] bg-primary/40 rounded-full animate-fall shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
                opacity: 0.1 + Math.random() * 0.5
              }}
            />
          ))}
        </div>

        {/* Glitch Overlay Elements */}
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute top-1/4 left-0 w-full h-[1px] bg-neon-cyan animate-glitch-line" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-primary animate-glitch-line" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-neon-cyan/5 mix-blend-screen animate-pulse"></div>
        </div>

        {/* Scanlines Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] z-50 pointer-events-none opacity-20"></div>
        
        {/* Vertical Moving Scanline */}
        <div className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scanline pointer-events-none"></div>
      </div>

      <Header />
      <Banner />
      
      <main className="relative z-10">
        <Hero />
        <Benefits />
        <FeaturedSection />
        <GameGrid />
      </main>

      <Footer />

      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes fall {
          0% { transform: translateY(-100px) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
        }
        @keyframes glitch-line {
          0% { transform: scaleX(0); opacity: 0; left: 0; }
          5% { transform: scaleX(1); opacity: 1; }
          10% { transform: scaleX(1); opacity: 0; }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
