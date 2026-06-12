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
  const discordLink = "https://discord.gg/yWTY2Y83Ha";
  
  const handleWhatsapp = () => {
    const message = encodeURIComponent(`Olá! Tenho interesse em comprar: ${productName || "um jogo"}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleDiscord = () => {
    window.open(discordLink, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-primary/20 bg-[#050507] text-white overflow-hidden">
        {/* Neon decorative glow */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-neon-green/10 blur-[80px] pointer-events-none" />
        
        <DialogHeader className="relative z-10">
          <DialogTitle className="font-display text-2xl font-black uppercase tracking-tighter">
            Finalizar <span className="text-primary">Compra</span>
          </DialogTitle>
          <DialogDescription className="text-white/40 font-medium">
            O bug está quase completo! Escolha onde quer concluir seu pedido de <span className="text-neon-cyan font-bold italic">{productName}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-6 relative z-10">
          <button
            onClick={handleDiscord}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#5865F2]/5 p-5 transition-all hover:bg-[#5865F2]/15 hover:border-[#5865F2]/50 hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#5865F2] text-white shadow-[0_0_20px_rgba(88,101,242,0.4)] group-hover:scale-110 transition-transform">
              <MessagesSquare className="h-7 w-7" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black uppercase tracking-widest group-hover:text-[#5865F2] transition-colors">Discord</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Entre no servidor e abra um ticket</div>
            </div>
          </button>

          <button
            onClick={handleWhatsapp}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-[#25D366]/5 p-5 transition-all hover:bg-[#25D366]/15 hover:border-[#25D366]/50 hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black uppercase tracking-widest group-hover:text-[#25D366] transition-colors">WhatsApp</div>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Fale diretamente com nosso sistema</div>
            </div>
          </button>
        </div>

        <div className="flex justify-center pt-2 relative z-10">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 animate-pulse">
            Sistema de Atendimento Seguro // Protocolo Ativo
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
