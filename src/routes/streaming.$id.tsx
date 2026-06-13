import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { PurchaseModal } from "@/components/store/PurchaseModal";
import { findStreaming, toBRL } from "@/lib/streaming";
import {
  ArrowLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Clock,
  Calendar,
  Headphones,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/streaming/$id")({
  component: StreamingDetailPage,
});

function StreamingDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const product = findStreaming(id);
  const [selectedVarId, setSelectedVarId] = useState<string>(
    product?.variations[0]?.id ?? "",
  );
  const [qty, setQty] = useState(1);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-white">
        <h1 className="text-4xl font-bold">Produto não encontrado</h1>
        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-4 flex items-center gap-2 text-primary-glow hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </button>
      </div>
    );
  }

  const selected =
    product.variations.find((v) => v.id === selectedVarId) ??
    product.variations[0];

  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-primary overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.05),transparent_70%)]" />
      </div>

      <Header cartCount={0} />

      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 relative z-10">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <button
            onClick={() => navigate({ to: "/" })}
            className="hover:text-primary-glow"
          >
            Início
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary-glow">Streaming</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr_0.9fr]">
          {/* Cover */}
          <div
            className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl border border-white/5 shadow-2xl"
            style={{ background: product.brand }}
          >
            <img
              src={product.cover}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Middle — info + variations */}
          <div className="space-y-5">
            <div className="text-xs font-bold text-muted-foreground">
              +100 Vendidos
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
              {selected.name}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-black text-white">
                {toBRL(selected.price)}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary-glow">
              <Zap className="h-3.5 w-3.5" /> Entrega Automática
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">Variações</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Selecione o produto desejado abaixo.
              </p>
              <div className="space-y-2">
                {product.variations.map((v) => {
                  const isSelected = v.id === selected.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVarId(v.id)}
                      className={`relative w-full flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute -top-2 left-4 rounded bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                          Selecionado
                        </span>
                      )}
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-black text-white text-sm"
                          style={{ background: product.brand }}
                        >
                          {product.glyph}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">
                            {v.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            Disponível ( {v.stock} )
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-white shrink-0 ml-3">
                        {toBRL(v.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — checkout */}
          <div className="space-y-4">
            {isSoldOut ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-6 shadow-2xl text-center">
                <div className="text-xl font-black text-red-500 uppercase tracking-widest mb-2">
                  PRODUTO ESGOTADO
                </div>
                <p className="text-sm text-muted-foreground">
                  Este produto está temporariamente indisponível. Volte em breve!
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0C] p-6 shadow-2xl">
                  <div className="text-sm font-bold text-white">Estoque disponível</div>
                  <div className="mt-2 font-display text-3xl font-black text-white">
                    {toBRL(selected.price)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {selected.stock} Disponível
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="h-9 w-9 rounded text-lg font-black text-white hover:bg-white/5"
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="font-bold text-white">{qty}</span>
                    <button
                      onClick={() =>
                        setQty((q) => Math.min(selected.stock, q + 1))
                      }
                      className="h-9 w-9 rounded text-lg font-black text-white hover:bg-white/5"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="mt-4 w-full h-12 rounded-lg bg-white text-black text-sm font-black uppercase tracking-widest hover:bg-white/90 transition"
                  >
                    Comprar agora
                  </button>
                  <button
                    onClick={() => setPurchaseOpen(true)}
                    className="mt-2 w-full h-12 rounded-lg bg-[#1c1b22] border border-white/10 text-white text-sm font-black uppercase tracking-widest hover:bg-[#26242d] transition"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0A0A0C] p-6 shadow-2xl space-y-3">
                  <div className="text-sm font-bold text-white">Meios de pagamentos</div>
                  <div className="text-xs text-muted-foreground">À vista</div>
                  <div className="flex h-10 w-10 rotate-45 place-items-center rounded-md bg-[color:var(--pix)]/15 text-[color:var(--pix)]">
                    <span className="-rotate-45 text-xs font-extrabold">P</span>
                  </div>
                </div>
              </>
            )}

            <div className="rounded-2xl border border-white/10 bg-[#0A0A0C] p-5 shadow-2xl space-y-3">
              <Trigger icon={<ShieldCheck className="h-5 w-5" />} title="Compra 100% Segura" desc="Pagamento protegido" />
              <Trigger icon={<Clock className="h-5 w-5" />} title="Entrega Instantânea" desc="Receba em poucos minutos" />
              <Trigger icon={<Calendar className="h-5 w-5" />} title="Acesso por 30 dias" desc="Aproveite durante todo o período" />
              <Trigger icon={<Headphones className="h-5 w-5" />} title="Suporte 30 dias" desc="Equipe disponível no Discord" />
            </div>
          </div>
        </div>

        {/* Descrição */}
        <section className="mt-12">
          <div className="text-sm font-bold text-white/60 mb-3">Descrição</div>
          <h2 className="text-center font-display text-3xl sm:text-4xl font-black text-white mb-8">
            Descrição do <span className="text-neon-green">Produto</span>
          </h2>

          <div className="space-y-5">
            <DescBlock title="Detalhes da Conta">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • <span className="font-bold text-white">Assinatura Ativa:</span>{" "}
                  Você recebe uma conta com o plano premium já ativado e pronto para usar.
                </li>
                <li>
                  • <span className="font-bold text-white">Plano Mais Completo:</span>{" "}
                  Acesso ao melhor plano disponível no serviço de streaming, com todos os recursos liberados.
                </li>
              </ul>
            </DescBlock>

            <DescBlock title="Regras Essenciais de Uso">
              <p className="text-sm text-muted-foreground mb-4">
                Para garantir o bom funcionamento para todos, siga as regras
                abaixo. O descumprimento pode levar à perda do acesso.
              </p>
              <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-5">
                <div className="flex items-center gap-2 text-red-400 font-black uppercase tracking-widest text-sm mb-3">
                  <AlertTriangle className="h-4 w-4" /> Leia com atenção
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-bold text-white">NÃO altere o e-mail ou a senha.</span>{" "}
                  Os dados de login não devem ser modificados.
                </p>
                <p className="text-sm text-muted-foreground">
                  Esta é uma{" "}
                  <span className="font-bold text-white">CONTA COMPARTILHADA</span>,
                  utilizada por mais de um usuário.
                </p>
              </div>
            </DescBlock>

            <DescBlock title="Garantia e Suporte">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-neon-green shrink-0" />
                  Oferecemos garantia de acesso durante 30 dias.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-neon-green shrink-0" />
                  Em caso de problemas com o acesso, entre em contato com
                  nosso suporte para receber assistência.
                </li>
              </ul>
            </DescBlock>
          </div>
        </section>
      </main>

      <Footer />

      <PurchaseModal
        isOpen={purchaseOpen}
        onOpenChange={setPurchaseOpen}
        productName={`${selected.name} (x${qty})`}
      />
    </div>
  );
}

function Trigger({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary-glow">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

function DescBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neon-green/15 bg-[#0A0F0C] p-6 shadow-2xl">
      <h3 className="text-lg sm:text-xl font-black text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}
