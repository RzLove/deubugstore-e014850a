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
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020203]/80 backdrop-blur-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-6 px-4 sm:px-6 relative z-10">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative h-14 w-auto flex items-center">
            <img 
              src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
              alt="Deu Bug Store Logo"
              className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(123,46,255,0.6)] relative z-20 min-w-[120px]"
              loading="eager"
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all relative group py-2"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-colors group text-sm font-bold text-white/70">
              <User className="h-4 w-4 group-hover:text-primary" />
              <span className="hidden md:inline">Entrar</span>
            </button>
            <button className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">Carrinho</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-primary ml-1">
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
        className={`lg:hidden absolute top-20 left-0 w-full bg-[#020203] border-b border-white/5 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <nav className="flex flex-col px-4 gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-bold uppercase tracking-widest text-white/60 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Banner() {
  return (
    <div className="relative w-full bg-[#0A0A0C] border-y border-white/5 overflow-hidden py-3">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 relative z-10">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
          Distribuição Global <span className="text-neon-cyan mx-2">//</span> Licenças 100% Originais
        </span>
        <button className="flex items-center gap-2 text-primary hover:text-white text-[10px] font-black uppercase tracking-widest transition-all group">
          SUPORTE PRIORITÁRIO <span className="group-hover:translate-x-1 transition-transform">{"->"}</span>
        </button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="mx-auto max-w-[1280px] w-full px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Marketplace Premium</span>
              </div>
              <h1 className="font-display text-5xl sm:text-7xl font-black leading-[0.95] tracking-tighter uppercase italic">
                Sua Melhor <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-neon-cyan to-primary bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">Experiência</span> <br />
                Digital
              </h1>
              <p className="text-xl font-medium text-white/50 max-w-lg leading-relaxed">
                Distribuição oficial de licenças premium com entrega instantânea e suporte dedicado 24/7.
              </p>
            </div>

            <div className="flex flex-wrap gap-10">
              {[
                { label: "Entrega Automática", icon: Zap, color: "text-neon-green" },
                { label: "Checkout Seguro", icon: Shield, color: "text-neon-cyan" },
                { label: "Suporte 24/7", icon: Check, color: "text-primary" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{item.label}</span>
                </div>
              ))}
            </div>

            <button className="group relative px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/10">
              Explorar Catálogo
            </button>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-[500px] mx-auto">
               <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
               <img 
                 src="https://drive.google.com/uc?export=view&id=1-jyC-sB4Jty704So0jkUqM6WLOLSJbhO" 
                 alt="Premium Distribution"
                 className="relative z-10 w-full h-full object-contain drop-shadow-2xl scale-110"
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const benefits = [
    { text: "Licenças Oficiais", icon: Shield, color: "text-primary" },
    { text: "Preços Competitivos", icon: Zap, color: "text-neon-green" },
    { text: "Ativação Imediata", icon: Zap, color: "text-neon-cyan" },
    { text: "Parcelamento 12x", icon: Check, color: "text-primary" },
    { text: "Catálogo Curado", icon: Gamepad2, color: "text-neon-green" }
  ];

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="p-8 bg-[#0A0A0C] border border-white/5 rounded-2xl flex flex-col items-center text-center gap-4 hover:border-white/10 transition-all group shadow-2xl"
            >
              <div className={`p-4 rounded-xl bg-white/5 ${b.color} group-hover:scale-110 transition-transform`}>
                <b.icon className="h-6 w-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                {b.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
