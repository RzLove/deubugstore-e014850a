/**
 * Botão flutuante de WhatsApp — fixo no canto inferior direito.
 * Aparece em todas as páginas via src/routes/__root.tsx.
 * Para trocar o número, edite WHATSAPP_LINK em src/lib/constants.ts.
 */
import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Atendimento via WhatsApp"
      title="Atendimento via WhatsApp"
      className="fixed bottom-4 right-4 z-[90] group inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.55)] transition-all hover:scale-110 hover:shadow-[0_8px_40px_rgba(37,211,102,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70 sm:bottom-5 sm:right-5 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-ping" aria-hidden="true" />
      <MessageCircle className="relative h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.2} />
    </a>
  );
}
