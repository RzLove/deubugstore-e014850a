import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { DISCORD_URL, WHATSAPP_URL } from "@/lib/constants";
import welcomeBanner from "@/assets/welcome-banner.png.asset.json";

const STORAGE_KEY = "deubug:welcome-modal:last-shown";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Schedule open after ~1.5s if not shown in last 24h
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (Date.now() - last < ONE_DAY_MS) return;
    } catch {
      // ignore
    }
    const t = window.setTimeout(() => setOpen(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  // Body scroll lock + Esc + focus trap
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeBtnRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setOpen(false);
  }

  function handleCta(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    close();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        className="relative w-[92%] max-w-[560px] max-h-[92vh] overflow-y-auto rounded-2xl bg-[#141318] border border-primary/30 shadow-[0_0_60px_-10px_rgba(139,92,246,0.55)] animate-in fade-in zoom-in-95 duration-[250ms]"
      >
        {/* Banner image */}
        <div className="relative">
          <img
            src={welcomeBanner.url}
            alt="Deu Bug Store — Os melhores jogos Steam"
            className="w-full h-auto block rounded-t-2xl object-cover"
          />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute top-3 right-3 grid place-items-center h-10 w-10 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 text-center">
          <h2
            id="welcome-modal-title"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
          >
            Como funciona a compra? 🎮
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
            Selecione o jogo que deseja no site e finalize a compra no Discord
            ou no WhatsApp: é só abrir um ticket e informar o game escolhido.
            Nossa equipe entrega na hora!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => handleCta(DISCORD_URL)}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#7C3AED] text-white font-bold px-5 py-3 hover:bg-[#6D28D9] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(124,58,237,0.55)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              💬 Comprar pelo Discord
            </button>
            <button
              type="button"
              onClick={() => handleCta(WHATSAPP_URL)}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#25D366] text-white font-bold px-5 py-3 hover:bg-[#1FB855] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.55)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/70"
            >
              📱 Comprar pelo WhatsApp
            </button>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-5 text-sm text-white/50 underline underline-offset-4 hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
          >
            Continuar navegando
          </button>
        </div>
      </div>
    </div>
  );
}
