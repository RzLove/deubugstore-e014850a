import { ShoppingCart, User, Search, Check, Shield, Zap, Gamepad2, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "#" },
    { label: "Serviços", href: "#" },
    { label: "Contato", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#050507]/90 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none"></div>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 relative z-10">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-14 w-auto flex items-center">
            {/* Logo image with explicit dimensions and higher priority */}
            <img 
              src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
              alt="Deu Bug Store Logo"
              className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(123,46,255,0.6)] relative z-20 min-w-[120px]"
              loading="eager"
              onError={(e) => {
                console.error("Logo failed to load");
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Styled Fallback that appears only if the image fails */}
            <div className="hidden flex items-center gap-3 animate-in fade-in duration-500">
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors"></div>
                <svg viewBox="0 0 100 100" className="relative w-10 h-10 drop-shadow-[0_0_8px_rgba(123,46,255,0.8)]">
                  <path d="M50 20 L80 40 L80 70 L50 90 L20 70 L20 40 Z" fill="none" stroke="#7B2EFF" strokeWidth="4" />
                  <circle cx="35" cy="45" r="4" fill="#39FF14" />
                  <circle cx="65" cy="45" r="4" fill="#39FF14" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-black uppercase tracking-tighter text-white">
                  DEU BUG <span className="text-primary italic">AQUI</span>
                </span>
                <span className="text-[10px] font-black text-neon-green/80 uppercase tracking-widest">Store System</span>
              </div>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-black uppercase tracking-widest text-white/60 hover:text-white transition-all relative group overflow-hidden py-2"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
              <span className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors group text-sm font-bold text-white/70">
              <User className="h-4 w-4 group-hover:text-neon-green" />
              <span className="hidden md:inline">Entrar</span>
            </button>
            <button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group text-sm font-bold">
              <ShoppingCart className="h-4 w-4 text-white/70 group-hover:text-neon-cyan" />
              <span className="hidden md:inline text-white/70">Carrinho</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-white shadow-[0_0_8px_rgba(123,46,255,0.8)]">
                0
              </span>
            </button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-20 left-0 w-full bg-[#050507] border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col px-4 gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-black uppercase tracking-widest text-white/60 hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-6 border-t border-white/5 sm:hidden">
            <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 text-white font-bold uppercase tracking-widest">
              <User className="h-5 w-5 text-neon-green" /> Entrar
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(123,46,255,0.3)]">
              <ShoppingCart className="h-5 w-5" /> Carrinho (0)
            </button>
          </div>
        </nav>
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
            <div className="relative w-full max-w-[480px] aspect-[16/9] flex items-center justify-center">
              {/* Image Banner */}
              <div className="relative z-10 w-full h-full flex items-center justify-center group overflow-hidden rounded-2xl border border-primary/20 bg-[#0c0c0e]/50 backdrop-blur-sm shadow-[0_0_50px_rgba(123,46,255,0.15)] transition-all hover:border-primary/40 hover:shadow-[0_0_60px_rgba(123,46,255,0.25)]">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full animate-pulse"></div>
                <img 
                  src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
                  alt="Deu Bug Store Banner"
                  className="relative z-10 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                
                {/* Fallback Mascot SVG if image fails */}
                <div className="hidden relative z-10 w-full h-full flex items-center justify-center">
                   <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-[0_0_30px_rgba(123,46,255,0.3)]">
                     <path d="M100 50 L140 90 L130 150 L70 150 L60 90 Z" fill="#0c0c0e" stroke="#7B2EFF" strokeWidth="3" />
                     <path d="M100 50 L140 90 L100 110 L60 90 Z" fill="#151518" stroke="#7B2EFF" strokeWidth="2" />
                     <path d="M80 150 L70 170 M120 150 L130 170" stroke="#39FF14" strokeWidth="4" strokeLinecap="round" />
                     <circle cx="85" cy="85" r="5" fill="#39FF14" className="animate-pulse" />
                     <circle cx="115" cy="85" r="5" fill="#39FF14" className="animate-pulse" />
                   </svg>
                </div>
              </div>

              {/* Error Box decoration */}
              <div className="absolute -top-6 -right-6 z-20 bg-black/80 border border-primary/50 backdrop-blur-md px-4 py-2 rounded font-mono text-xs text-primary shadow-[0_0_20px_rgba(123,46,255,0.2)] glitch-effect">
                SYSTEM OK
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
