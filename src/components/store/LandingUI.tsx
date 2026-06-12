import { ShoppingCart, User, Search, Check, Shield, Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050507]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 flex items-center justify-center">
            {/* Mascot Placeholder/SVG */}
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors"></div>
            <svg viewBox="0 0 100 100" className="relative w-10 h-10 drop-shadow-[0_0_8px_rgba(123,46,255,0.8)]">
              <path d="M50 20 L80 40 L80 70 L50 90 L20 70 L20 40 Z" fill="none" stroke="#7B2EFF" strokeWidth="4" className="glitch-effect" />
              <circle cx="35" cy="45" r="4" fill="#39FF14" />
              <circle cx="65" cy="45" r="4" fill="#39FF14" />
              <path d="M30 65 Q50 75 70 65" stroke="#00E5FF" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
            Deu Bug <span className="text-primary italic">Store</span>
          </span>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex relative flex-1 max-w-md mx-auto">
          <div className="absolute inset-0 bg-primary/5 blur-md rounded-full"></div>
          <div className="relative flex items-center w-full bg-[#111115]/80 border border-white/10 rounded-full px-4 py-2 hover:border-primary/50 transition-colors group">
            <Search className="h-4 w-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar jogos corrompidos..."
              className="bg-transparent border-none outline-none w-full text-sm text-white placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors group">
            <User className="h-5 w-5 text-white/70 group-hover:text-neon-green" />
          </button>
          <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-white/5 transition-colors group">
            <ShoppingCart className="h-5 w-5 text-white/70 group-hover:text-neon-cyan" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-[0_0_8px_rgba(123,46,255,0.8)]">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Banner() {
  return (
    <div className="relative w-full bg-primary/10 border-y border-primary/20 overflow-hidden py-2">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(123,46,255,0.1),transparent)] animate-pulse"></div>
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-4 px-4 text-center">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-white/90 uppercase">
          Não encontrou algum jogo? <span className="text-neon-cyan">Nós conseguimos para você!</span>
        </span>
        <button className="bg-primary hover:bg-primary/80 text-white text-[10px] font-black px-4 py-1 rounded shadow-[0_0_15px_rgba(123,46,255,0.5)] transition-all active:scale-95">
          CLIQUE AQUI
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
      {/* Background Glitch Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-1 bg-neon-cyan glitch-effect" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-2 bg-primary glitch-effect" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-1 bg-neon-green glitch-effect" style={{ animationDelay: '0.3s' }}></div>
      </div>

      <div className="mx-auto max-w-[1280px] w-full px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">
              OS MELHORES JOGOS <br />
              <span className="bg-gradient-to-r from-primary via-neon-cyan to-neon-green bg-clip-text text-transparent">
                COM O MELHOR PREÇO!
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white/60 italic">
              Aqui o bug é só no <span className="text-neon-green underline decoration-wavy underline-offset-8">preço</span>!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neon-green/20 text-neon-green group-hover:scale-125 transition-transform">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white/80">Entrega automática</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neon-cyan/20 text-neon-cyan group-hover:scale-125 transition-transform">
                <Shield className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white/80">Compra 100% segura</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:scale-125 transition-transform">
                <Zap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white/80">Suporte 24/7</span>
            </div>
          </div>

          <button className="group relative px-8 py-4 bg-primary text-white font-black text-lg uppercase tracking-widest rounded shadow-[0_0_30px_rgba(123,46,255,0.4)] hover:shadow-[0_0_50px_rgba(123,46,255,0.6)] transition-all hover:-translate-y-1">
            <span className="relative z-10">VER TODOS OS JOGOS</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>

        {/* Right Content - Mascot */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Holographic Screen */}
            <div className="absolute -top-10 -left-10 z-20 bg-[#111115]/80 border border-primary/40 backdrop-blur-md p-6 rounded-lg shadow-[0_0_40px_rgba(123,46,255,0.3)] glitch-effect">
               <div className="flex items-center gap-2 mb-2">
                 <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-[10px] font-mono text-primary font-bold">SYSTEM CRITICAL</span>
               </div>
               <div className="text-4xl font-black font-mono text-neon-cyan">ERROR 404</div>
               <div className="mt-2 text-[10px] font-mono text-white/40 leading-tight">
                 ROOT_SYSTEM: CORRUPTED<br />
                 PRICE_ALGORITHM: BUGGED
               </div>
            </div>

            {/* Mascot */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
               <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
               {/* Cyberpunk Bug Mascot SVG/Illustration */}
               <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                 {/* Body */}
                 <path d="M100 60 L140 100 L120 160 L80 160 L60 100 Z" fill="#111" stroke="#7B2EFF" strokeWidth="2" />
                 {/* Cyber limbs */}
                 <path d="M60 100 L30 80 M60 120 L30 140 M140 100 L170 80 M140 120 L170 140" stroke="#00E5FF" strokeWidth="4" className="glitch-effect" />
                 {/* Neon Eyes */}
                 <circle cx="85" cy="90" r="6" fill="#39FF14" className="animate-pulse" />
                 <circle cx="115" cy="90" r="6" fill="#39FF14" className="animate-pulse" />
                 {/* Circuits */}
                 <path d="M100 60 V40 M80 160 V180 M120 160 V180" stroke="#39FF14" strokeWidth="1" strokeDasharray="4 2" />
               </svg>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 overflow-hidden">
               {[...Array(20)].map((_, i) => (
                 <div 
                   key={i} 
                   className="absolute bg-primary/30 w-1 h-1 rounded-full animate-ping"
                   style={{
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                     animationDelay: `${Math.random() * 5}s`
                   }}
                 />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const benefits = [
    { text: "Jogos originais e garantidos", color: "border-primary text-primary" },
    { text: "Preços incríveis", color: "border-neon-green text-neon-green" },
    { text: "Ativação instantânea", color: "border-neon-cyan text-neon-cyan" },
    { text: "Parcele em até 12x", color: "border-primary text-primary" },
    { text: "Os melhores lançamentos", color: "border-neon-green text-neon-green" }
  ];

  return (
    <section className="py-20 px-4 bg-[#08080a]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className={`p-6 bg-[#111115] border ${b.color.split(' ')[0]} rounded-lg text-center hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all cursor-default group`}
            >
              <div className={`text-xs font-black uppercase tracking-widest ${b.color.split(' ')[1]} group-hover:glitch-effect`}>
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
