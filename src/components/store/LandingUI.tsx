import { ShoppingCart, User, Search, Check, Shield, Zap, Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none"></div>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 relative z-10">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors"></div>
            <svg viewBox="0 0 100 100" className="relative w-10 h-10 drop-shadow-[0_0_8px_rgba(123,46,255,0.8)]">
              <path d="M50 20 L80 40 L80 70 L50 90 L20 70 L20 40 Z" fill="none" stroke="#7B2EFF" strokeWidth="4" className="glitch-effect" />
              <circle cx="35" cy="45" r="4" fill="#39FF14" />
              <circle cx="65" cy="45" r="4" fill="#39FF14" />
              <path d="M40 30 L40 20 M60 30 L60 20 M30 50 L20 50 M70 50 L80 50" stroke="#7B2EFF" strokeWidth="2" />
            </svg>
          </div>
          <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
            DEU <span className="text-primary italic">BTORE</span>
          </span>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-auto">
          <div className="absolute inset-0 bg-primary/5 blur-md rounded-full"></div>
          <div className="relative flex items-center w-full bg-[#111115]/80 border border-white/10 rounded-full px-4 py-2 hover:border-primary/50 transition-colors group">
            <Search className="h-4 w-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors" />
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="bg-transparent border-none outline-none w-full text-sm text-white placeholder:text-white/20 focus:ring-0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors group text-sm font-bold text-white/70">
            <User className="h-4 w-4 group-hover:text-neon-green" />
            <span className="hidden sm:inline">Entrar</span>
          </button>
          <button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group text-sm font-bold">
            <ShoppingCart className="h-4 w-4 text-white/70 group-hover:text-neon-cyan" />
            <span className="hidden sm:inline text-white/70">Carrinho</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white shadow-[0_0_8px_rgba(123,46,255,0.8)]">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Banner() {
  return (
    <div className="relative w-full bg-[#0a0a0c] border-y border-white/5 overflow-hidden py-3">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(123,46,255,0.05),transparent)] animate-pulse"></div>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 relative z-10">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-white/80 uppercase">
          Não encontrou algum jogo? <span className="text-neon-cyan italic">Nós conseguimos para você!</span>
        </span>
        <button className="flex items-center gap-2 text-primary hover:text-primary-glow text-xs font-black uppercase tracking-widest transition-all group">
          CLIQUE AQUI <span className="group-hover:translate-x-1 transition-transform">{"->"}</span>
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-12 lg:py-20 overflow-hidden">
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(123,46,255,0.08),transparent_70%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-1 bg-neon-cyan/20 glitch-effect" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-2 bg-primary/20 glitch-effect" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 relative z-10">
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur hover:border-primary/50 transition-all text-white/40 hover:text-white">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur hover:border-primary/50 transition-all text-white/40 hover:text-white">
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter uppercase">
                OS MELHORES <span className="text-primary glitch-effect inline-block">JOGOS</span> <br />
                COM O MELHOR <span className="text-neon-green glitch-effect inline-block">PREÇO!</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/40 italic">
                Aqui o bug é só no <span className="text-neon-green/80 underline decoration-wavy underline-offset-8">preço</span>!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green group-hover:scale-110 group-hover:bg-neon-green/20 transition-all border border-neon-green/20">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="block text-xs font-black text-white/80 uppercase tracking-widest leading-tight">Entrega Automática</span>
              </div>
              <div className="space-y-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan group-hover:scale-110 group-hover:bg-neon-cyan/20 transition-all border border-neon-cyan/20">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="block text-xs font-black text-white/80 uppercase tracking-widest leading-tight">Compra 100% Segura</span>
              </div>
              <div className="space-y-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all border border-primary/20">
                  <Check className="h-5 w-5" />
                </div>
                <span className="block text-xs font-black text-white/80 uppercase tracking-widest leading-tight">Suporte 24/7</span>
              </div>
            </div>

            <button className="group relative px-10 py-5 bg-primary text-white font-black text-lg uppercase tracking-[0.2em] rounded-lg shadow-[0_0_30px_rgba(123,46,255,0.4)] hover:shadow-[0_0_50px_rgba(123,46,255,0.6)] transition-all hover:-translate-y-1 flex items-center gap-3">
              <span className="relative z-10">VER TODOS OS JOGOS</span>
              <Gamepad2 className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-lg"></div>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">{"->"}</span>
            </button>
          </div>

          {/* Right Content - Mascot */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[480px] aspect-square">
              {/* Error Box */}
              <div className="absolute -top-6 -right-6 z-20 bg-black/80 border border-primary/50 backdrop-blur-md px-4 py-2 rounded font-mono text-xs text-primary shadow-[0_0_20px_rgba(123,46,255,0.2)] glitch-effect">
                ERROR 404
              </div>

              {/* Deu Bug Text */}
              <div className="absolute bottom-10 left-0 z-20 font-display text-3xl font-black italic uppercase tracking-tighter text-neon-green drop-shadow-[0_0_10px_rgba(57,255,20,0.5)] glitch-effect">
                DEU BUG AQUI
              </div>

              {/* Mascot */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full animate-pulse"></div>
                 <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(123,46,255,0.3)]">
                   {/* Cyberpunk Bug Body */}
                   <path d="M100 50 L140 90 L130 150 L70 150 L60 90 Z" fill="#0c0c0e" stroke="#7B2EFF" strokeWidth="3" />
                   <path d="M100 50 L140 90 L100 110 L60 90 Z" fill="#151518" stroke="#7B2EFF" strokeWidth="2" />
                   {/* Neon Details */}
                   <path d="M80 150 L70 170 M120 150 L130 170" stroke="#39FF14" strokeWidth="4" strokeLinecap="round" />
                   <circle cx="85" cy="85" r="5" fill="#39FF14" className="animate-pulse" />
                   <circle cx="115" cy="85" r="5" fill="#39FF14" className="animate-pulse" />
                   {/* Circuits */}
                   <path d="M100 110 V140 M80 120 H120" stroke="#7B2EFF" strokeWidth="1" opacity="0.5" />
                 </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const benefits = [
    { text: "Jogos originais e garantidos", icon: Shield, color: "text-primary border-primary/20" },
    { text: "Preços incríveis", icon: Zap, color: "text-neon-green border-neon-green/20" },
    { text: "Ativação instantânea", icon: Zap, color: "text-neon-cyan border-neon-cyan/20" },
    { text: "Parcele em até 12x", icon: Check, color: "text-primary border-primary/20" },
    { text: "Os melhores lançamentos", icon: Gamepad2, color: "text-neon-green border-neon-green/20" }
  ];

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className={`p-6 bg-[#0c0c0e] border ${b.color} rounded-2xl flex flex-col items-center text-center gap-4 hover:bg-white/5 transition-all cursor-default group hover:-translate-y-1 shadow-lg`}
            >
              <div className={`p-3 rounded-xl bg-white/5 ${b.color.split(' ')[0]} group-hover:scale-110 transition-transform`}>
                <b.icon className="h-6 w-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
