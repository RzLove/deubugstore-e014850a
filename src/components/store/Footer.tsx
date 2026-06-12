import { BadgeCheck, MessagesSquare, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/deu-bug-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#050507]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div className="space-y-6 col-span-2 lg:col-span-1">
          <div className="group flex items-center gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-primary/50 bg-black shadow-[0_0_18px_rgba(123,46,255,0.45)]">
              <img
                src={logo.url}
                alt="Deu Bug Store"
                width={128}
                height={128}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0">
              <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
                Deu Bug <span className="text-primary italic">Store</span>
              </span>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.25em] text-neon-green/80">
                Glitch nos preços, não na entrega.
              </p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-white/40 leading-relaxed font-medium">
            Sua interface definitiva para keys digitais. <br />
            O sistema corrompido que entrega o <span className="text-neon-cyan italic">preço que você procura</span>.
          </p>
          <div className="flex items-center gap-3">
            {[MessagesSquare, Instagram, Youtube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/50 transition-all hover:shadow-[0_0_15px_rgba(123,46,255,0.3)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Navegação", links: ["Início", "Jogos Populares", "Lançamentos", "Categorias"] },
          { title: "Suporte", links: ["FAQ / Dúvidas", "Central de Ajuda", "Discord Oficial", "Contato Direto"] },
          { title: "Legal", links: ["Termos de Uso", "Privacidade", "Políticas", "Reembolso"] },
        ].map((g) => (
          <div key={g.title} className="space-y-6">
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-neon-green">{g.title}</h4>
            <ul className="space-y-4 text-sm font-bold text-white/30">
              {g.links.map((l) => (
                <li key={l}>
                  <a className="transition-colors hover:text-white" href="#">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-8 text-[10px] font-black uppercase tracking-widest text-white/20 sm:flex-row sm:px-6">
          <span>© 2026 DEU BUG STORE // PROTOCOL_V1.0</span>
          <div className="flex items-center gap-6">
             <span className="flex items-center gap-2">
                <BadgeCheck className="h-3 w-3 text-neon-cyan" /> SISTEMA SEGURO
             </span>
             <span className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-neon-green"></div> ONLINE
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
