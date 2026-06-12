import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { games } from "@/lib/games";
import { useState } from "react";
import { PurchaseModal } from "@/components/store/PurchaseModal";
import { 
  BadgeCheck, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Monitor, 
  Gamepad2, 
  Star, 
  ArrowLeft,
  ChevronRight,
  Info
} from "lucide-react";

export const Route = createFileRoute("/game/$id")({
  component: GameDetailPage,
});

function GameDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const game = games.find((g) => g.id.toString() === id);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-white">
        <h1 className="text-4xl font-bold">Jogo não encontrado</h1>
        <button 
          onClick={() => navigate({ to: "/" })}
          className="mt-4 flex items-center gap-2 text-primary-glow hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-primary overflow-x-hidden">
      {/* Glitch Background (Sync with Store Aesthetics) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05),transparent_70%)]"></div>
        
        {/* Animated Scanline */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-scanline"></div>
      </div>

      <Header cartCount={0} />
      
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <button onClick={() => navigate({ to: "/" })} className="hover:text-primary-glow">Início</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{game.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Left Column — Gallery & Info */}
          <div className="space-y-8">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 shadow-2xl glow-primary-lg">
              <img 
                src={game.cover} 
                alt={game.name} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-primary-glow">
                  <Gamepad2 className="h-3.5 w-3.5" />
                  {game.platform}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="relative bg-[#0A0A0C] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Corner Bug Decoration */}
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-[8px] font-black uppercase tracking-widest rounded skew-x-12 opacity-50">DEU BUG // SECURE</div>

              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white mb-6">
                <Info className="h-5 w-5 text-primary-glow" />
                Sobre o jogo
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {game.description}
              </p>
              
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary-glow mb-4">Requisitos Mínimos</h3>
                  <p className="text-xs text-muted-foreground leading-loose">{game.minRequirements}</p>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary-glow mb-4">Requisitos Recomendados</h3>
                  <p className="text-xs text-muted-foreground leading-loose">{game.recommendedRequirements}</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="relative bg-[#0A0A0C] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
               <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-white mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                Avaliações
              </h2>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border-b border-white/5 pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20" />
                      <div>
                        <div className="text-sm font-bold text-white">Usuário do Deu Bug</div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">O processo de compra foi extremamente rápido. Recebi a key em menos de 5 minutos e já estou jogando. Recomendo demais!</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Pricing & Checkout */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-[#0A0A0C] border border-primary/20 rounded-2xl overflow-hidden p-6 sm:p-8 shadow-2xl shadow-primary/10">
              {/* Premium Glow Header */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-neon-cyan to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]"></div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Oferta por tempo limitado</span>
              </div>
              
              <h1 className="font-display text-3xl font-black text-white sm:text-4xl leading-tight uppercase italic tracking-tighter">
                {game.name}
              </h1>
              
              <div className="mt-6 flex items-center gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground line-through decoration-primary/50">
                      {game.originalPrice}
                    </span>
                    <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-black text-primary-glow">
                      {game.discount} OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-4xl font-black text-[#d9f99d]">
                      {game.discountedPrice}
                    </span>
                  </div>
                  <span className="mt-1 text-xs font-semibold text-primary-glow">Pagamento via Pix (Entrega Imediata)</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="flex w-full h-14 items-center justify-center gap-3 rounded-xl bg-primary text-base font-black text-primary-foreground shadow-[0_0_30px_rgba(123,46,255,0.4)] transition-all hover:bg-primary-glow hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(123,46,255,0.6)]"
                >
                  <Zap className="h-5 w-5" /> COMPRAR AGORA
                </button>
              </div>

              {/* Conversion Triggers */}
              <div className="mt-8 space-y-4 rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-green-500/10 text-green-500">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Compra 100% Segura</div>
                    <div className="text-xs text-muted-foreground">Seu pagamento está protegido</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary-glow">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Entrega Instantânea</div>
                    <div className="text-xs text-muted-foreground">Receba em poucos minutos</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Ativação Permanente</div>
                    <div className="text-xs text-muted-foreground">O jogo é seu para sempre</div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 border-t border-white/5 pt-6">
                <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">Informações de Entrega</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {game.delivery}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
                <img src="https://logodownload.org/wp-content/uploads/2020/02/pix-bc-logo.png" alt="Pix" className="h-4" />
                <BadgeCheck className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onOpenChange={setIsPurchaseModalOpen} 
        productName={game.name}
      />
    </div>
  );
}
