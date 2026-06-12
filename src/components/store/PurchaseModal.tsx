import { MessagesSquare, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PurchaseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

export function PurchaseModal({ isOpen, onOpenChange, productName }: PurchaseModalProps) {
  const whatsappNumber = "5511999999999"; // Exemplo
  const discordLink = "https://discord.gg/deubug"; // Exemplo
  
  const handleWhatsapp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse em comprar: ${productName || "um jogo"}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleDiscord = () => {
    window.open(discordLink, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/10 bg-[#0f111a] text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold">Como deseja finalizar sua compra?</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Escolha um dos canais abaixo para concluir o pedido de <span className="text-primary-glow font-bold">{productName}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            onClick={handleDiscord}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#5865F2]/10 p-4 transition hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 group"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#5865F2] text-white">
              <MessagesSquare className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-bold group-hover:text-[#5865F2] transition-colors">Finalizar via Discord</div>
              <div className="text-xs text-muted-foreground">Entre em nosso servidor e abra um ticket</div>
            </div>
          </button>

          <button
            onClick={handleWhatsapp}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#25D366]/10 p-4 transition hover:bg-[#25D366]/20 hover:border-[#25D366]/50 group"
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="font-bold group-hover:text-[#25D366] transition-colors">Finalizar via WhatsApp</div>
              <div className="text-xs text-muted-foreground">Fale diretamente com um atendente</div>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
