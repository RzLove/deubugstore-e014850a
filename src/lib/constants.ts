/**
 * Centralized external links for the Deu Bug Store.
 * Update here to roll out new URLs everywhere they're used.
 */
export const DISCORD_URL = "https://discord.gg/ZmUDcCCtNx";

// ============================================================
// WhatsApp — contato oficial
// ALTERE AQUI para trocar o link/número em todo o site.
// ============================================================
/** Link curto oficial "clique para conversar" do WhatsApp. */
export const WHATSAPP_LINK = "https://wa.me/message/MNQIDQ62KZQ2D1";
/** Formato legível mostrado para o usuário. */
export const WHATSAPP_PHONE_DISPLAY = "+55 (75) 9889-27020";

// Mantido por compatibilidade — prefira WHATSAPP_LINK em código novo.
export const WHATSAPP_URL = WHATSAPP_LINK;

/**
 * Monta um link do WhatsApp com mensagem pré-preenchida.
 * Use em CTAs de produto para já mandar o nome do item.
 */
export function buildWhatsAppLink(productName?: string): string {
  if (!productName) return WHATSAPP_LINK;
  const message = `Olá, vim do site e tenho interesse em ${productName}. Pode me passar mais informações?`;
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}
