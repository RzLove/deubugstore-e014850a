export interface Game {
  id: string | number;
  name: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  cover: string;
  description: string;
  platform: string;
  minRequirements: string;
  recommendedRequirements: string;
  delivery: string;
  /** YouTube video ID used in the popular games trailer player */
  trailer?: string;
}

import popular from "@/assets/cat-popular.jpg";
import action from "@/assets/cat-action.jpg";
import rpg from "@/assets/cat-rpg.jpg";
import horror from "@/assets/cat-horror.jpg";
import fight from "@/assets/cat-fight.jpg";
import shooter from "@/assets/cat-shooter.jpg";

export const games: Game[] = [
  {
    id: 1,
    name: "Crimson Desert",
    discount: "-90%",
    originalPrice: "R$ 349,99",
    discountedPrice: "R$ 34,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/1601580/header.jpg",
    description: "Um RPG de ação épico ambientado em um mundo vasto e impiedoso. Explore ruínas, lute contra monstros colossais e forje seu próprio destino nesta jornada inesquecível.",
    platform: "PC",
    minRequirements: "OS: Windows 10, Processador: Intel Core i5, Memória: 8GB RAM, Placa de vídeo: GTX 1060",
    recommendedRequirements: "OS: Windows 11, Processador: Intel Core i7, Memória: 16GB RAM, Placa de vídeo: RTX 3060",
    delivery: "Envio automático por e-mail em até 5 minutos após a confirmação do pagamento.",
  },
  {
    id: 2,
    name: "Crusader Kings III",
    discount: "-92%",
    originalPrice: "R$ 179,99",
    discountedPrice: "R$ 14,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/1158310/header.jpg",
    description: "Construa sua dinastia medieval, gerencie terras e conquiste reinos. A cada escolha, uma consequência na história do seu império.",
    platform: "PC",
    minRequirements: "OS: Windows 10, Processador: i3, Memória: 6GB RAM, Placa de vídeo: GTX 750",
    recommendedRequirements: "OS: Windows 10/11, Processador: i7, Memória: 12GB RAM, Placa de vídeo: GTX 1070",
    delivery: "Envio instantâneo para sua conta pessoal.",
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    discount: "-93%",
    originalPrice: "R$ 299,89",
    discountedPrice: "R$ 19,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/1091500/header.jpg",
    description: "Um RPG de ação em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.",
    platform: "PC",
    minRequirements: "OS: Windows 10, Processador: i7-6700, Memória: 12GB RAM, Placa de vídeo: GTX 1060",
    recommendedRequirements: "OS: Windows 11, Processador: Ryzen 5 3600, Memória: 16GB RAM, Placa de vídeo: RTX 3060",
    delivery: "Ativação direta na sua conta Steam.",
  },
  {
    id: 4,
    name: "Dark Souls II",
    discount: "-90%",
    originalPrice: "R$ 154,90",
    discountedPrice: "R$ 14,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/236430/header.jpg",
    description: "O segundo capítulo da aclamada série Souls. Prepare-se para morrer repetidamente em um mundo sombrio e desafiador.",
    platform: "PC",
    minRequirements: "OS: Windows 7, Processador: AMD A8, Memória: 4GB RAM, Placa de vídeo: HD 7850",
    recommendedRequirements: "OS: Windows 10, Processador: FX-8350, Memória: 8GB RAM, Placa de vídeo: GTX 960",
    delivery: "Key original entregue via sistema automatizado.",
  },
  {
    id: 5,
    name: "Dark Souls III",
    discount: "-95%",
    originalPrice: "R$ 327,50",
    discountedPrice: "R$ 17,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/374320/header.jpg",
    description: "A conclusão épica da trilogia que redefiniu o gênero. Enfrente lordes das cinzas em batalhas inesquecíveis.",
    platform: "PC",
    minRequirements: "OS: Windows 7, Processador: i3-2100, Memória: 4GB RAM, Placa de vídeo: GTX 750 Ti",
    recommendedRequirements: "OS: Windows 10, Processador: i7-3770, Memória: 8GB RAM, Placa de vídeo: GTX 970",
    delivery: "Envio instantâneo via e-mail.",
  },
  {
    id: 6,
    name: "Dark Souls Remastered",
    discount: "-90%",
    originalPrice: "R$ 154,90",
    discountedPrice: "R$ 14,90",
    cover: "https://shared.cloudflare.steamstatic.com/store_apps/570940/header.jpg",
    description: "O início da lenda, agora com visuais aprimorados e gameplay mais fluido. Retorne a Lordran.",
    platform: "PC",
    minRequirements: "OS: Windows 7, Processador: i5-2300, Memória: 4GB RAM, Placa de vídeo: GTX 465",
    recommendedRequirements: "OS: Windows 10, Processador: i7-2600, Memória: 8GB RAM, Placa de vídeo: GTX 970",
    delivery: "Ativação direta na sua conta.",
  },
];
