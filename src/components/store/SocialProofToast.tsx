import { useEffect, useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import popular from "@/assets/cat-popular.jpg";
import action from "@/assets/cat-action.jpg";
import rpg from "@/assets/cat-rpg.jpg";
import horror from "@/assets/cat-horror.jpg";
import shooter from "@/assets/cat-shooter.jpg";

const events = [
  { name: "Lara G.", product: "Red Dawn Outlaw", img: popular, mins: 4 },
  { name: "Ana B.", product: "Shadow Strike: Vigilante", img: action, mins: 12 },
  { name: "Marcos S.", product: "Eldrith Sword: Awakening", img: rpg, mins: 23 },
  { name: "Júlia P.", product: "Phantom Whisper", img: horror, mins: 7 },
  { name: "Diego R.", product: "Operator Zero: Tactical", img: shooter, mins: 18 },
];

export function SocialProofToast() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setI((v) => (v + 1) % events.length);
        setVisible(true);
      }, 350);
    }, 15000);
    return () => clearInterval(id);
  }, [closed]);

  if (closed || !visible) return null;
  const e = events[i];

  return (
    <div className="toast-in fixed bottom-4 left-4 z-50 hidden w-[300px] surface-card items-center gap-3 p-3 pr-8 sm:flex">
      <img src={e.img} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
      <div className="min-w-0">
        <div className="text-[11px] text-muted-foreground">
          <span className="font-bold text-foreground">{e.name}</span> acabou de comprar
        </div>
        <div className="truncate text-sm font-bold">{e.product}</div>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-primary-glow">
          <CheckCircle2 className="h-3 w-3" /> há {e.mins} minutos
        </div>
      </div>
      <button
        onClick={() => setClosed(true)}
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
        aria-label="Fechar"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
