import { BadgeCheck, MessagesSquare, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-white font-display font-extrabold glow-primary">
              DB
            </div>
            <span className="font-display font-extrabold">Deu Bug Store</span>
            <BadgeCheck className="h-4 w-4 fill-primary text-background" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Sua loja de keys Steam com entrega instantânea e os melhores preços do Brasil.
          </p>
        </div>

        {[
          { title: "Loja", links: ["Jogos Populares", "Lançamentos", "Promoções", "Combos"] },
          { title: "Suporte", links: ["FAQ", "Discord", "Política de Reembolso", "Contato"] },
          { title: "Institucional", links: ["Termos de Uso", "Privacidade", "Sobre nós", "Trabalhe conosco"] },
        ].map((g) => (
          <div key={g.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider">{g.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {g.links.map((l) => (
                <li key={l}>
                  <a className="transition hover:text-primary-glow" href="#">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 Deu Bug Store. Todos os direitos reservados.</span>
          <div className="flex items-center gap-3">
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary-glow">
              <MessagesSquare className="h-4 w-4" />
            </a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary-glow">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary-glow">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
