export type GameCategory =
  | "popular"
  | "acao"
  | "rpg"
  | "terror"
  | "luta"
  | "tiro"
  | "simulacao";

export interface BundleItem {
  name: string;
  cover: string;
  minReq: SysReq;
  recReq: SysReq;
}

export interface SysReq {
  os: string;
  cpu: string;
  ram: string;
  gpu: string;
  directx?: string;
  storage: string;
  notes?: string;
}

export interface Game {
  id: string | number;
  slug: string;
  name: string;
  originalPrice: string;
  discountedPrice: string;
  /** Just the percent like "96%" (no "OFF" suffix) */
  discount: string;
  cover: string;
  /** Curta descrição usada em cards/carrosséis */
  description: string;
  /** Descrição completa (2-3 parágrafos) usada na página do produto */
  about: string;
  /** Gêneros/tags exibidos como badges na página do produto */
  tags: string[];
  /** Classificação indicativa (ex.: "18", "16", "Livre") */
  rating: string;
  platform: string;
  /** Texto curto legado, ainda usado em alguns lugares */
  minRequirements: string;
  recommendedRequirements: string;
  /** Estruturas reais para a página do produto */
  minReq: SysReq;
  recReq: SysReq;
  delivery: string;
  /** YouTube video ID used in the popular games trailer player */
  trailer?: string;
  categories: GameCategory[];
  /** Quantidade em estoque exibida nos cards */
  stock: number;
  /** Se presente, marca o produto como bundle/combo e descreve os jogos inclusos */
  bundle?: BundleItem[];
}

const steamHeader = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const defaultDelivery =
  "Envio automático por e-mail em até 5 minutos após a confirmação do pagamento.";

const platformPC = "PC";

const flat = (r: SysReq) =>
  `OS: ${r.os} · CPU: ${r.cpu} · RAM: ${r.ram} · GPU: ${r.gpu} · ${
    r.directx ? `DirectX: ${r.directx} · ` : ""
  }HD: ${r.storage}${r.notes ? ` · ${r.notes}` : ""}`;

// Helper to round percent
const pct = (orig: number, now: number) => `${Math.round((1 - now / orig) * 100)}%`;

interface RawGame {
  id: number;
  name: string;
  appId: number;
  origNumber: number;
  newNumber: number;
  trailer?: string;
  categories: GameCategory[];
  short: string;
  about: string;
  tags: string[];
  rating: string;
  minReq: SysReq;
  recReq: SysReq;
}

const toBRL = (n: number) =>
  `R$ ${n.toFixed(2).replace(".", ",")}`;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Requisitos comuns
const lowEnd: SysReq = {
  os: "Windows 10 64-bit",
  cpu: "Intel Core i3-4160 / AMD FX-6300",
  ram: "4 GB",
  gpu: "GTX 660 2GB / Radeon HD 7870",
  directx: "11",
  storage: "20 GB",
};

const raw: RawGame[] = [
  {
    id: 1,
    name: "Resident Evil Requiem (CONTA OFFLINE)",
    appId: 3241660,
    origNumber: 300,
    newNumber: 15.59,
    trailer: "M7yEzlF7dPo",
    categories: ["popular", "terror"],
    short:
      "O novo capítulo de Resident Evil chega com terror psicológico de tirar o fôlego e uma atmosfera sombria como nunca antes.",
    about:
      "Resident Evil Requiem é o nono capítulo principal da franquia da Capcom. A trama acompanha Grace Ashcroft, uma analista do FBI enviada para investigar uma série de mortes inexplicáveis em uma cidade isolada — onde a sombra das corporações farmacêuticas e dos vírus do passado ainda paira.\n\nO jogo combina o terror em primeira pessoa de Village com o ritmo de exploração e gestão de inventário dos clássicos, rodando na engine RE Engine com iluminação fotorrealista e som binaural. Inclui modo História completo com finais alternativos e suporte a DualSense.",
    tags: ["Terror", "Sobrevivência", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "GTX 1070 / RX 5700",
      directx: "12",
      storage: "80 GB SSD",
      notes: "*Requisitos sujeitos a alteração até o lançamento",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-10700 / AMD Ryzen 7 5700X",
      ram: "16 GB",
      gpu: "RTX 3070 / RX 6800",
      directx: "12",
      storage: "80 GB SSD",
      notes: "*Requisitos sujeitos a alteração até o lançamento",
    },
  },
  {
    id: 2,
    name: "Forza Horizon 6",
    appId: 1551360,
    origNumber: 300,
    newNumber: 17.99,
    trailer: "FYH9n37B7Yw",
    categories: ["popular", "acao"],
    short:
      "A próxima geração de Forza Horizon: mundo aberto cinematográfico, centenas de carros e a melhor sensação de velocidade do gênero.",
    about:
      "Forza Horizon 6 leva o festival de corrida mais aclamado do mundo a um novo continente, com biomas dinâmicos, clima sazonal de verdade e um mundo aberto duas vezes maior que o de FH5. Uma garagem com mais de 700 carros licenciados, do clássico ao hypercar elétrico.\n\nO modo carreira evolui com narrativa dinâmica, e o multiplayer (Horizon Open / EventLab 3.0) permite criar corridas, pistas e modos personalizados. Suporte completo a ray tracing no mundo aberto, volantes Logitech/Fanatec e haptics do DualSense.",
    tags: ["Corrida", "Mundo Aberto", "Modo Online"],
    rating: "Livre",
    minReq: {
      os: "Windows 10/11 64-bit",
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600",
      ram: "8 GB",
      gpu: "GTX 970 / RX 470",
      directx: "12",
      storage: "120 GB",
      notes: "*Requisitos estimados — sujeitos a alteração",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-10700K / AMD Ryzen 7 5800X",
      ram: "16 GB",
      gpu: "RTX 3070 / RX 6700 XT",
      directx: "12",
      storage: "120 GB SSD",
      notes: "*Requisitos estimados — sujeitos a alteração",
    },
  },
  {
    id: 3,
    name: "Crimson Desert (CONTA OFFLINE)",
    appId: 1601580,
    origNumber: 350,
    newNumber: 17.99,
    trailer: "1bDS3eNcCwc",
    categories: ["popular", "rpg"],
    short:
      "RPG de ação épico em um mundo medieval brutal. Explore terras vastas e enfrente bestas colossais em Pywel.",
    about:
      "Desenvolvido pela Pearl Abyss (Black Desert), Crimson Desert é um RPG de ação em mundo aberto que segue Macduff, mercenário endividado em meio à guerra civil do continente de Pywel. A narrativa cinematográfica é dirigida em capítulos, com combate físico que mistura armas brancas, magia e luta corpo a corpo.\n\nO mundo apresenta clima dinâmico, NPCs com rotina e batalhas contra chefes gigantes inspiradas em Shadow of the Colossus. Tecnologia BlackSpace Engine entrega vegetação procedural e física de pano avançada.",
    tags: ["RPG de Ação", "Mundo Aberto", "Modo História"],
    rating: "16",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-9400 / AMD Ryzen 5 2600",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "100 GB SSD",
      notes: "*Requisitos estimados — sujeitos a alteração",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-11700K / AMD Ryzen 7 5800X",
      ram: "32 GB",
      gpu: "RTX 3080 / RX 6800 XT",
      directx: "12",
      storage: "100 GB SSD",
    },
  },
  {
    id: 4,
    name: "Baldur's Gate 3",
    appId: 1086940,
    origNumber: 199,
    newNumber: 11.99,
    trailer: "OcP0WdH7rTs",
    categories: ["popular", "rpg"],
    short:
      "O aclamado RPG de fantasia da Larian Studios. Reúna sua party e mergulhe em uma campanha lendária inspirada em D&D.",
    about:
      "Vencedor do Game of the Year 2023, Baldur's Gate 3 traz a 5ª edição de Dungeons & Dragons para o videogame com uma campanha de mais de 100 horas. Após ser sequestrado por mind flayers, seu personagem precisa escolher entre conter um parasita ilithídico em sua cabeça — ou abraçá-lo.\n\nA Larian Studios oferece liberdade radical: cada decisão tem consequência, qualquer NPC importante pode morrer, e a narrativa se molda ao seu grupo. Combate em turnos, sistema de classes e raças do D&D, cooperativo para 4 jogadores online e modo split-screen local.",
    tags: ["RPG", "Estratégia em Turnos", "Modo História", "Modo Online"],
    rating: "16",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-4690 / AMD FX-8350",
      ram: "8 GB",
      gpu: "GTX 970 / RX 480 (4GB+)",
      directx: "11",
      storage: "150 GB SSD",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-8700K / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "RTX 2060 Super / RX 5700 XT",
      directx: "11",
      storage: "150 GB SSD",
    },
  },
  {
    id: 5,
    name: "Red Dead Redemption 2",
    appId: 1174180,
    origNumber: 299,
    newNumber: 11.99,
    trailer: "eaW0tYpxyp0",
    categories: ["popular", "tiro"],
    short:
      "Uma épica história de honra e traição na decadência do Velho Oeste americano. A obra-prima da Rockstar Games.",
    about:
      "Red Dead Redemption 2 acompanha Arthur Morgan, lugar-tenente da Gangue de Dutch van der Linde, em 1899 — uma época em que o Velho Oeste agoniza diante da modernidade. Após um assalto desastroso na cidade de Blackwater, a gangue foge pelo coração da América enquanto agentes federais, caçadores de recompensas e rivais os perseguem.\n\nA Rockstar entrega um mundo aberto considerado o mais detalhado já feito: ecossistema vivo com mais de 200 espécies de animais, NPCs com rotina completa e a melhor física de cavalos do meio. Inclui Red Dead Online.",
    tags: ["Mundo Aberto", "Tiro", "Modo História", "Modo Online"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit (build 1909+)",
      cpu: "Intel Core i5-2500K / AMD FX-6300",
      ram: "8 GB",
      gpu: "GTX 770 2GB / Radeon R9 280 3GB",
      directx: "12",
      storage: "150 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      ram: "12 GB",
      gpu: "GTX 1060 6GB / Radeon RX 480 4GB",
      directx: "12",
      storage: "150 GB SSD",
    },
  },
  {
    id: 6,
    name: "Red Dead Redemption 1",
    appId: 2668510,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "Quz0I5NgolY",
    categories: ["popular", "tiro"],
    short:
      "O clássico que definiu o western chega ao PC. Acompanhe John Marston em sua jornada de redenção no Velho Oeste.",
    about:
      "Red Dead Redemption coloca você na pele de John Marston, ex-fora-da-lei chantageado pelo governo dos EUA em 1911. Para reaver a família, ele precisa caçar antigos companheiros da Gangue Van der Linde — atravessando fronteiras, desertos mexicanos e a chegada brutal do século XX.\n\nA versão para PC traz a campanha original, o expansão de zumbis Undead Nightmare, gráficos a até 4K, taxa de quadros desbloqueada, suporte a ultrawide e controles totalmente remapeáveis.",
    tags: ["Mundo Aberto", "Tiro", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-2500K / AMD FX-6300",
      ram: "8 GB",
      gpu: "GTX 950 2GB / Radeon R9 380 2GB",
      directx: "12",
      storage: "115 GB",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "115 GB SSD",
    },
  },
  {
    id: 7,
    name: "Grand Theft Auto V Enhanced",
    appId: 3240220,
    origNumber: 150,
    newNumber: 11.99,
    trailer: "QkkoHAzjnUs",
    categories: ["popular", "tiro"],
    short:
      "A versão definitiva de GTA V com ray tracing e suporte aos hardwares mais recentes. Los Santos como você nunca viu.",
    about:
      "Grand Theft Auto V Enhanced é a edição mais avançada do clássico da Rockstar para PC. Reúne a campanha completa de Michael, Franklin e Trevor em Los Santos com ray tracing de reflexos, sombras e oclusão ambiental, texturas de altíssima resolução e tempos de carregamento drasticamente reduzidos.\n\nInclui GTA Online com todos os updates lançados, suporte nativo a 4K/60, ultrawide, HDR10 e controles do DualSense via cabo.",
    tags: ["Mundo Aberto", "Tiro", "Modo História", "Modo Online"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-6600K / AMD Ryzen 5 1600",
      ram: "8 GB",
      gpu: "GTX 1080 / RX 5700 XT",
      directx: "12",
      storage: "105 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-10700K / AMD Ryzen 7 5800X",
      ram: "16 GB",
      gpu: "RTX 3060 Ti / RX 6700 XT",
      directx: "12",
      storage: "105 GB SSD",
    },
  },
  {
    id: 8,
    name: "Grand Theft Auto V Legacy",
    appId: 271590,
    origNumber: 150,
    newNumber: 11.99,
    trailer: "QkkoHAzjnUs",
    categories: ["popular", "tiro"],
    short:
      "O fenômeno mundial da Rockstar. Viva a vida de três criminosos em Los Santos no clássico que vendeu mais de 200 milhões de cópias.",
    about:
      "Grand Theft Auto V Legacy é a versão original que conquistou o mundo: a campanha completa em Los Santos, alternando entre Michael, ex-ladrão de banco aposentado; Franklin, jovem que sobe na hierarquia do crime; e Trevor, um psicopata explosivo do interior.\n\nMais de 80 missões principais, dezenas de side activities, golpes elaborados (heists) e mundo aberto vivo. Esta edição inclui o GTA Online tradicional para até 30 jogadores em sessão.",
    tags: ["Mundo Aberto", "Tiro", "Modo História", "Modo Online"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core 2 Quad CPU Q6600 / AMD Phenom 9850",
      ram: "4 GB",
      gpu: "GTX 660 2GB / Radeon HD 7870 2GB",
      directx: "10",
      storage: "72 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-3470 / AMD X8 FX-8350",
      ram: "8 GB",
      gpu: "GTX 660 2GB / Radeon HD 7870 2GB",
      directx: "10",
      storage: "72 GB",
    },
  },
  {
    id: 9,
    name: "The Last Of Us Parte 2",
    appId: 2531310,
    origNumber: 200,
    newNumber: 11.99,
    trailer: "II-ZHaA_t9Q",
    categories: ["popular", "tiro"],
    short:
      "Cinco anos após o primeiro jogo, Ellie embarca em uma jornada implacável de vingança em um mundo pós-apocalíptico.",
    about:
      "The Last of Us Parte II se passa cinco anos depois dos eventos do primeiro jogo. Ellie, agora com 19 anos, vive uma vida frágil na comunidade de Jackson — até que um evento traumático a leva a uma jornada de vingança por Seattle dominada pelos Lobos e pelos Serafitas.\n\nA Naughty Dog redefine o stealth e o combate corpo a corpo, com IA reativa, animações brutais e duas perspectivas distintas que se cruzam. Acessibilidade premiada (mais de 60 opções) e dublagem completa em português brasileiro.",
    tags: ["Ação", "Tiro", "Stealth", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "GTX 1070 8GB / RX 5700",
      directx: "12",
      storage: "100 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-9700K / AMD Ryzen 7 5700X",
      ram: "16 GB",
      gpu: "RTX 3070 / RX 6800",
      directx: "12",
      storage: "100 GB SSD",
    },
  },
  {
    id: 10,
    name: "The Last Of Us",
    appId: 1888930,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "WoOEz4FbDSc",
    categories: ["popular", "tiro"],
    short:
      "Joel e Ellie atravessam os Estados Unidos devastados em uma das histórias mais marcantes dos videogames.",
    about:
      "The Last of Us Part I é o remake completo do clássico de 2013 reconstruído na engine da Parte II. Vinte anos após uma infecção fúngica devastar a humanidade, Joel — um contrabandista endurecido — é contratado para escoltar Ellie, uma garota de 14 anos, por uma América em ruínas.\n\nIA reformulada, faciais inéditos, modo permadeath e o DLC Left Behind incluso. A versão de PC adiciona Nvidia DLSS 3, AMD FSR 3, suporte a ultrawide 32:9 e haptics completos do DualSense.",
    tags: ["Ação", "Sobrevivência", "Tiro", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      ram: "16 GB",
      gpu: "GTX 970 / RX 470 (4GB)",
      directx: "12",
      storage: "100 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600X",
      ram: "16 GB",
      gpu: "RTX 2070 Super / RX 6700 XT",
      directx: "12",
      storage: "100 GB SSD",
    },
  },
  {
    id: 11,
    name: "Marvel's Spider-Man 2",
    appId: 2651280,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "qWa9DnUWjhI",
    categories: ["acao"],
    short:
      "Peter Parker e Miles Morales unem forças contra Venom em uma Nova York maior e cheia de surpresas.",
    about:
      "Marvel's Spider-Man 2 traz pela primeira vez Peter Parker e Miles Morales jogáveis em campanha conjunta. A história adapta a saga clássica do Simbionte: o terno preto altera Peter para sempre, enquanto Miles encara o vingativo Mister Negativo e o terror de Kraven, o Caçador.\n\nA Nova York agora inclui Queens e Brooklyn, com asa-delta para vôos longos e troca de personagens com um clique. Combate refinado, dezenas de uniformes, modo Foto avançado e dublagem em PT-BR completa.",
    tags: ["Super-Heróis", "Mundo Aberto", "Modo História"],
    rating: "14",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "GTX 1650 / RX 5500 XT",
      directx: "12",
      storage: "140 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i5-11400 / AMD Ryzen 5 5600",
      ram: "16 GB",
      gpu: "RTX 3070 / RX 6800 XT",
      directx: "12",
      storage: "140 GB SSD",
    },
  },
  {
    id: 12,
    name: "Marvel's Spider-Man: Miles Morales",
    appId: 1817190,
    origNumber: 200,
    newNumber: 11.99,
    trailer: "5b4xhKkn58E",
    categories: ["acao"],
    short:
      "Miles Morales descobre poderes que o diferenciam de Peter Parker em uma aventura inesquecível no Harlem.",
    about:
      "Marvel's Spider-Man: Miles Morales acompanha o adolescente afro-latino Miles enquanto se muda para o Harlem em pleno inverno nova-iorquino. Com Peter Parker em viagem, ele precisa proteger a cidade de uma guerra entre uma corporação de energia e um grupo terrorista de alta tecnologia.\n\nMiles tem habilidades únicas — bioeletricidade Vênus e camuflagem — que reescrevem o combate. Campanha de cerca de 10 horas, ray tracing nativo, modo desempenho, dublagem em PT-BR e o acessório Spider-Cat.",
    tags: ["Super-Heróis", "Mundo Aberto", "Modo História"],
    rating: "14",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i3-4160 / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 950 / RX 470",
      directx: "12",
      storage: "75 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-4670 / AMD Ryzen 5 1600",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "75 GB SSD",
    },
  },
  {
    id: 13,
    name: "Marvel's Spider-Man Remastered",
    appId: 1817070,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "q4GgI7vNyo4",
    categories: ["acao"],
    short:
      "A aventura definitiva do Homem-Aranha com gráficos remasterizados, ray tracing e todos os DLCs inclusos.",
    about:
      "Marvel's Spider-Man Remastered traz para o PC a aventura aclamada de 2018 com texturas refeitas, ray tracing de reflexos e Peter Parker com novo rosto. Oito anos após vestir o uniforme, Peter precisa impedir o Sr. Negativo, enquanto faz as pazes com Mary Jane Watson.\n\nInclui a trilogia A Cidade Que Nunca Dorme (Roubo de Joias, Territórios em Disputa e Aço Silencioso) e mais de 30 uniformes desbloqueáveis. Ultrawide, DLSS, FSR e modo Foto.",
    tags: ["Super-Heróis", "Mundo Aberto", "Modo História"],
    rating: "14",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i3-4160 / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 950 / RX 470",
      directx: "12",
      storage: "75 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-4670 / AMD Ryzen 5 1600",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "75 GB SSD",
    },
  },
  {
    id: 14,
    name: "God of War Ragnarök",
    appId: 2322010,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "EE-4GvjKcfs",
    categories: ["acao"],
    short:
      "Kratos e Atreus enfrentam o Ragnarök e os Nove Reinos em uma jornada épica pela mitologia nórdica.",
    about:
      "Sequência direta de God of War (2018), Ragnarök começa com o inverno de Fimbul cobrindo Midgard e Kratos e Atreus seguindo profecias inquietantes. Em três anos, Atreus cresceu — e a relação pai e filho se torna o coração da jornada que cruzará os nove reinos nórdicos.\n\nCombate refinado com novos elementos das Lâminas do Caos, do Machado Leviatã e da Lança Draupnir. Inclui o DLC Valhalla. Versão de PC com DLSS 3, FSR 3, ultrawide até 32:9 e HDR completo.",
    tags: ["Ação", "Mitologia", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-4670K / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 1060 6GB / RX 5500 XT 8GB",
      directx: "12",
      storage: "190 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "RTX 2060 Super / RX 5700 XT",
      directx: "12",
      storage: "190 GB SSD",
    },
  },
  {
    id: 15,
    name: "God of War",
    appId: 1593500,
    origNumber: 200,
    newNumber: 11.99,
    trailer: "FXz-IY-7-Lk",
    categories: ["acao"],
    short:
      "Kratos retorna em uma reinvenção brutal da série, agora ambientada nas terras geladas dos deuses nórdicos.",
    about:
      "God of War (2018) reinventa a franquia: Kratos vive isolado em Midgard com seu filho Atreus, e precisa atravessar as terras geladas para espalhar as cinzas de sua esposa do alto da montanha mais alta dos nove reinos.\n\nCâmera por cima do ombro sem cortes, o Machado Leviatã com mecânica de retorno e o relacionamento pai e filho redefinem o que um jogo de ação pode ser. PC com até 4K/60+, HDR, DLSS, FSR, ultrawide e dublagem em PT-BR.",
    tags: ["Ação", "Mitologia", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-2500K / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 960 4GB / R9 290X",
      directx: "11",
      storage: "70 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-6600K / AMD Ryzen 5 2400G",
      ram: "8 GB",
      gpu: "GTX 1060 6GB / RX 570 4GB",
      directx: "11",
      storage: "70 GB SSD",
    },
  },
  {
    id: 16,
    name: "Ghost of Tsushima",
    appId: 2215430,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "iwROgK94zcM",
    categories: ["acao"],
    short:
      "Em 1274, o samurai Jin Sakai enfrenta a invasão mongol da ilha de Tsushima em uma aventura deslumbrante.",
    about:
      "Ghost of Tsushima Director's Cut acompanha o samurai Jin Sakai durante a primeira invasão mongol do Japão. Diante da derrota brutal do clã, Jin precisa abandonar o código de honra dos samurais e se tornar o lendário Fantasma para libertar a ilha.\n\nA versão para PC inclui a expansão Ilha de Iki, o modo cooperativo Legends para até 4 jogadores, ray tracing, ultrawide e o icônico Modo Kurosawa em preto e branco com grão de filme.",
    tags: ["Ação", "Mundo Aberto", "Samurai", "Modo História", "Modo Online"],
    rating: "16",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i3-7100 / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 960 / RX 5500 XT",
      directx: "12",
      storage: "75 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i5-8600 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "RTX 2060 / RX 5600 XT",
      directx: "12",
      storage: "75 GB SSD",
    },
  },
  {
    id: 17,
    name: "SILENT HILL 2",
    appId: 2124490,
    origNumber: 350,
    newNumber: 11.99,
    trailer: "ttMOK5BPVqI",
    categories: ["terror"],
    short:
      "O remake do clássico de terror psicológico. James Sunderland retorna à cidade enevoada em busca de respostas perturbadoras.",
    about:
      "Reconstruído do zero pela Bloober Team na Unreal Engine 5, Silent Hill 2 segue James Sunderland, que recebe uma carta de sua falecida esposa pedindo para encontrá-la em Silent Hill. Ao chegar à cidade tomada pela névoa, encontra figuras grotescas, o icônico Pyramid Head e uma jornada psicológica sobre culpa e luto.\n\nCâmera por cima do ombro, combate reformulado, novos quebra-cabeças e os múltiplos finais clássicos preservados. Áudio binaural, ray tracing e suporte total a DualSense.",
    tags: ["Terror Psicológico", "Survival Horror", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-6700K / AMD Ryzen 5 3600",
      ram: "12 GB",
      gpu: "GTX 1080 / RX 5700",
      directx: "12",
      storage: "50 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-8700K / AMD Ryzen 5 5600X",
      ram: "16 GB",
      gpu: "RTX 2080 / RX 6800",
      directx: "12",
      storage: "50 GB SSD",
    },
  },
  {
    id: 18,
    name: "Resident Evil 4",
    appId: 2050650,
    origNumber: 200,
    newNumber: 11.99,
    trailer: "Z8RKZ-EsvKM",
    categories: ["terror"],
    short:
      "O remake aclamado pela crítica. Leon S. Kennedy retorna a uma aldeia rural para resgatar a filha do presidente.",
    about:
      "Remake completo do clássico de 2005. Seis anos após o desastre de Raccoon City, o agente especial Leon S. Kennedy é enviado a uma aldeia isolada da Espanha para resgatar Ashley Graham, filha do presidente dos EUA, sequestrada por uma seita conhecida como Los Iluminados.\n\nA RE Engine entrega iluminação fotorrealista, faca com defesa direta e Ada Wong como personagem jogável no DLC Separate Ways. Inclui o modo Mercenários, suporte VR no PSVR2 e dublagem em PT-BR.",
    tags: ["Terror", "Tiro em 3ª pessoa", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-7500 / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 1050 Ti 4GB / RX 560 4GB",
      directx: "12",
      storage: "60 GB SSD",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7 8700 / AMD Ryzen 5 5600",
      ram: "16 GB",
      gpu: "GTX 1070 / RX 5700",
      directx: "12",
      storage: "60 GB SSD",
    },
  },
  {
    id: 19,
    name: "DRAGON BALL SPARKING ZERO",
    appId: 1790600,
    origNumber: 290,
    newNumber: 11.99,
    trailer: "5_xRDhSP0CY",
    categories: ["luta"],
    short:
      "A nova geração da série Budokai Tenkaichi. Mais de 180 personagens em batalhas espetaculares e gráficos impressionantes.",
    about:
      "Sparking! ZERO é o retorno tão esperado da série Budokai Tenkaichi. Com mais de 180 lutadores de toda a saga Dragon Ball — incluindo formas inéditas como Goku Ultra Instinct, Gohan Bestial e Vegeta MUI — o jogo recria as batalhas em arenas 3D destrutíveis com câmera dinâmica.\n\nModo História ramificado em diferentes pontos de vista (Goku, Vegeta, Gohan, Frieza...), modo Episódio Personalizado para criar sua própria saga e batalhas online classificatórias para até 8 jogadores em sessão.",
    tags: ["Luta", "Anime", "Modo História", "Modo Online"],
    rating: "12",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-9400 / AMD Ryzen 5 1600",
      ram: "8 GB",
      gpu: "GTX 1070 / RX 5500 XT 8GB",
      directx: "12",
      storage: "30 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-9700 / AMD Ryzen 7 3700X",
      ram: "16 GB",
      gpu: "RTX 2070 / RX 5700 XT",
      directx: "12",
      storage: "30 GB SSD",
    },
  },
  {
    id: 20,
    name: "Hogwarts Legacy",
    appId: 990080,
    origNumber: 299.9,
    newNumber: 11.99,
    trailer: "1O6Qstncpnc",
    categories: ["rpg"],
    short:
      "Viva sua própria aventura no universo de Harry Potter. Frequente Hogwarts no século XIX e desvende um mistério ancestral.",
    about:
      "Hogwarts Legacy é um RPG de mundo aberto ambientado no século XIX, muito antes dos eventos dos livros. Você é um estudante do quinto ano que detém uma rara capacidade de manipular a Magia Ancestral, em meio a uma revolta dos duendes liderada por Ranrok.\n\nPersonalize seu bruxo, escolha entre as quatro casas (Grifinória, Sonserina, Corvinal e Lufa-Lufa), assista a aulas, brigue de varinha, monte vassoura, hipogrifos e explore Hogsmeade, a Floresta Proibida e Hogwarts.",
    tags: ["RPG", "Mundo Aberto", "Magia", "Modo História"],
    rating: "12",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-6600 / AMD Ryzen 5 1400",
      ram: "16 GB",
      gpu: "GTX 960 4GB / RX 470 4GB",
      directx: "12",
      storage: "85 GB SSD",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-8700 / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "GTX 1080 Ti / RX 5700 XT",
      directx: "12",
      storage: "85 GB SSD",
    },
  },
  {
    id: 21,
    name: "Horizon Zero Dawn Complete Edition",
    appId: 1151640,
    origNumber: 249,
    newNumber: 11.99,
    trailer: "u4-FCsiF5x4",
    categories: ["acao"],
    short:
      "Aloy explora um mundo pós-apocalíptico dominado por máquinas. Edição completa com a expansão The Frozen Wilds.",
    about:
      "Horizon Zero Dawn Complete Edition acompanha Aloy, uma jovem caçadora exilada das Nora, em um mundo onde a humanidade regrediu a tribos e máquinas colossais imitando dinossauros vagam pela natureza. Aloy precisa descobrir a verdade sobre seu passado — e o que aconteceu com o mundo antigo.\n\nInclui a campanha principal de 30+ horas e a expansão The Frozen Wilds, com novo bioma e três novas máquinas. Combate baseado em arco, armadilhas e exploração de pontos fracos.",
    tags: ["RPG de Ação", "Mundo Aberto", "Pós-Apocalíptico", "Modo História"],
    rating: "14",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-2500K / AMD FX-6300",
      ram: "8 GB",
      gpu: "GTX 780 3GB / GTX 1050 2GB / RX 470 4GB",
      directx: "12",
      storage: "100 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / GTX 1070 / RX 580 8GB",
      directx: "12",
      storage: "100 GB SSD",
    },
  },
  {
    id: 22,
    name: "Detroit Become Human",
    appId: 1222140,
    origNumber: 199,
    newNumber: 11.99,
    trailer: "Ka4yhoZSXgU",
    categories: ["acao"],
    short:
      "Em um futuro próximo, androides ganham consciência. Suas escolhas definem o destino de três personagens.",
    about:
      "Detroit: Become Human é um thriller narrativo da Quantic Dream ambientado em uma Detroit de 2038, onde androides realizam todo tipo de trabalho. Você controla três personagens: Kara, uma androide doméstica que protege uma criança; Connor, designado para caçar desviantes; e Markus, líder de uma revolução.\n\nMais de 40 finais diferentes e árvore de decisões com centenas de variáveis. Cada falha, cada escolha, cada morte impacta o resto da história — e nenhum personagem está a salvo.",
    tags: ["Aventura Narrativa", "Sci-fi", "Modo História"],
    rating: "16",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-2300 / AMD FX-8350",
      ram: "8 GB",
      gpu: "GTX 780 / GTX 1050 / RX 470",
      directx: "11",
      storage: "55 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-3770 / AMD Ryzen 5 1600",
      ram: "12 GB",
      gpu: "GTX 1080 / RX Vega 56",
      directx: "11",
      storage: "55 GB SSD",
    },
  },
  {
    id: 23,
    name: "Mortal Kombat 11",
    appId: 976310,
    origNumber: 229.99,
    newNumber: 11.99,
    trailer: "TGUEqbcs8r4",
    categories: ["luta"],
    short:
      "O retorno violento do icônico jogo de luta. Fatalities cinemáticos, roster expandido e modo história envolvente.",
    about:
      "Mortal Kombat 11 expande a saga após os eventos de MKX. A guardiã do tempo Kronika decide reiniciar a história — e Raiden, Liu Kang, Sub-Zero, Scorpion e novos lutadores precisam impedir que o passado e o futuro colidam.\n\nGore brutal com Fatalities, Brutalities e Fatal Blows totalmente cinematográficos. Modo história longo com cenas no nível de filme, Torres do Tempo eternas e customização profunda para cada lutador.",
    tags: ["Luta", "Modo História", "Modo Online"],
    rating: "18",
    minReq: {
      os: "Windows 7/10 64-bit",
      cpu: "Intel Core i5-750 / AMD Phenom II X4 965",
      ram: "8 GB",
      gpu: "GTX 670 / GTX 1050 / HD 7950",
      directx: "11",
      storage: "60 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-3570 / AMD Ryzen 5 1600",
      ram: "8 GB",
      gpu: "GTX 980 / GTX 1060 6GB / RX 470",
      directx: "11",
      storage: "60 GB SSD",
    },
  },
  {
    id: 24,
    name: "Cyberpunk 2077",
    appId: 1091500,
    origNumber: 200,
    newNumber: 11.99,
    trailer: "8X2kIfS6fb8",
    categories: ["rpg"],
    short:
      "Um RPG de mundo aberto em Night City, uma metrópole obcecada por poder, glamour e modificações corporais.",
    about:
      "Cyberpunk 2077, da CD Projekt RED, coloca você como V, um mercenário em Night City lutando por um implante único que garante a imortalidade — e pela presença de Johnny Silverhand (Keanu Reeves) instalada em sua mente.\n\nA atualização 2.0 reescreveu árvore de habilidades, combate veicular e IA da polícia. Tudo isso com ray tracing path-traced (Overdrive), DLSS 3.5 Ray Reconstruction e dublagem completa em português brasileiro.",
    tags: ["RPG", "Mundo Aberto", "Cyberpunk", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-6700 / AMD Ryzen 5 1600",
      ram: "12 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "70 GB SSD",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-12700 / AMD Ryzen 7 7800X3D",
      ram: "16 GB",
      gpu: "RTX 2060 Super / RX 5700 XT",
      directx: "12",
      storage: "70 GB SSD",
    },
  },
  {
    id: 25,
    name: "UNCHARTED: Coleção Legado dos Ladrões",
    appId: 1659420,
    origNumber: 260,
    newNumber: 11.99,
    trailer: "RvCFW7XPwBs",
    categories: ["acao"],
    short:
      "Inclui Uncharted 4: A Thief's End e Uncharted: The Lost Legacy. Aventura cinematográfica em busca de tesouros.",
    about:
      "A Uncharted: Legacy of Thieves Collection traz Uncharted 4: A Thief's End — em que Nathan Drake é arrastado de volta à vida de caçador de tesouros pelo irmão Sam para encontrar o ouro do pirata Henry Avery — e Uncharted: The Lost Legacy, com Chloe Frazer e Nadine Ross atravessando os Gates Ocidentais da Índia.\n\nA versão para PC traz 4K nativo, HDR, ultrawide até 21:9, DLSS, FSR, modo Foto e os modos online clássicos (Multiplayer e Sobrevivência).",
    tags: ["Ação", "Aventura", "Modo História"],
    rating: "14",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-4330 / AMD Ryzen 3 1200",
      ram: "8 GB",
      gpu: "GTX 960 4GB / GTX 1050 Ti / RX 470 4GB",
      directx: "12",
      storage: "126 GB SSD",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i7-4770K / AMD Ryzen 5 1500X",
      ram: "16 GB",
      gpu: "GTX 1060 6GB / GTX 1070 / RX 580 8GB",
      directx: "12",
      storage: "126 GB SSD",
    },
  },
  {
    id: 26,
    name: "171",
    appId: 1284190,
    origNumber: 59.99,
    newNumber: 11.99,
    trailer: "VvWXboS8X3I",
    categories: ["acao"],
    short:
      "O GTA brasileiro. Explore uma fictícia cidade tupiniquim cheia de personagens icônicos, missões e humor genuinamente nacional.",
    about:
      "171 é um jogo brasileiro inspirado em GTA, desenvolvido pela Betagames Group. Você joga como Lucas, um sujeito que retorna à fictícia cidade de Mucajá após sair da prisão, e precisa virar a vida correndo por dentro do mundo do crime tropical.\n\nMundo aberto com sotaque brasileiro de norte a sul, dublagem em PT-BR, veículos populares nacionais (de Fusca a moto Pop) e missões com humor regional. Em desenvolvimento ativo, recebe atualizações frequentes com novas missões.",
    tags: ["Mundo Aberto", "Ação", "Brasileiro", "Modo História"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-7400 / AMD Ryzen 3 1300X",
      ram: "8 GB",
      gpu: "GTX 1050 Ti / RX 560",
      directx: "12",
      storage: "30 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-9400F / AMD Ryzen 5 3600",
      ram: "16 GB",
      gpu: "GTX 1660 Super / RX 5600 XT",
      directx: "12",
      storage: "30 GB SSD",
    },
  },
  {
    id: 27,
    name: "Elden Ring",
    appId: 1245620,
    origNumber: 275,
    newNumber: 11.99,
    trailer: "E3Huy2cdih0",
    categories: ["rpg"],
    short:
      "O épico Soulslike da FromSoftware em parceria com George R. R. Martin. Explore as Terras Intermédias em busca da Runa Maior.",
    about:
      "Dirigido por Hidetaka Miyazaki com worldbuilding de George R. R. Martin, Elden Ring se passa nas Terras Intermédias após o estilhaçamento do Anel Prístino. Você é um Maculado, exilado de volta para reivindicar as Runas Maiores e se tornar Senhor Prístino.\n\nO primeiro mundo aberto da FromSoftware: seis grandes regiões, cavalo invocável Torrente, dungeons opcionais, chefes lendários e o famoso combate Soulslike. Inclui Cinzas das Sombras (Shadow of the Erdtree).",
    tags: ["RPG", "Soulslike", "Mundo Aberto", "Modo História", "Modo Online"],
    rating: "16",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X",
      ram: "12 GB",
      gpu: "GTX 1060 3GB / GTX 1050 Ti 4GB",
      directx: "12",
      storage: "60 GB SSD",
    },
    recReq: {
      os: "Windows 10/11 64-bit",
      cpu: "Intel Core i7-8700K / AMD Ryzen 5 3600X",
      ram: "16 GB",
      gpu: "GTX 1070 8GB / RX Vega 56 8GB",
      directx: "12",
      storage: "60 GB SSD",
    },
  },
  {
    id: 28,
    name: "Little Nightmares III",
    appId: 2511660,
    origNumber: 180,
    newNumber: 11.99,
    trailer: "u_uM6Cmd-1U",
    categories: ["terror"],
    short:
      "Low e Alone exploram a sinistra Espiral em uma aventura cooperativa cheia de quebra-cabeças e criaturas grotescas.",
    about:
      "Pela primeira vez, Little Nightmares chega com cooperativo. Low e Alone, dois amigos perdidos, precisam atravessar a Espiral — uma série de lugares decadentes habitados por figuras gigantes e perturbadoras — para encontrar a saída.\n\nDesenvolvido pela Supermassive Games, com puzzles que exigem cooperação real entre os dois personagens (cada um com habilidade única). Jogue em dupla online ou solo controlando os dois alternadamente.",
    tags: ["Terror", "Quebra-cabeça", "Cooperativo", "Modo História", "Modo Online"],
    rating: "12",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-8400 / AMD Ryzen 5 1600",
      ram: "8 GB",
      gpu: "GTX 1060 6GB / RX 580 8GB",
      directx: "12",
      storage: "25 GB SSD",
      notes: "*Requisitos estimados — sujeitos a alteração",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i7-9700K / AMD Ryzen 7 3700X",
      ram: "16 GB",
      gpu: "RTX 2070 / RX 5700 XT",
      directx: "12",
      storage: "25 GB SSD",
    },
  },
  {
    id: 29,
    name: "Hollow Knight: Silksong",
    appId: 1030300,
    origNumber: 60,
    newNumber: 11.99,
    trailer: "pFAknD_9U7c",
    categories: ["rpg"],
    short:
      "A muito aguardada sequência de Hollow Knight. Jogue como Hornet em um reino exuberante e perigoso.",
    about:
      "Hollow Knight: Silksong é a sequência do aclamado metroidvania da Team Cherry. Capturada e levada ao reino de Pharloom, a princesa-protetora Hornet precisa subir uma montanha cheia de cavaleiros, peregrinos e criaturas sedosas até descobrir o que esconde a coroa no topo.\n\nNovo mapa interconectado, mais de 150 inimigos inéditos, sistema de ferramentas que se equipa em loadouts e o combate elegante baseado na agulha e na seda. Trilha sonora completa de Christopher Larkin.",
    tags: ["Metroidvania", "Plataforma", "Modo História"],
    rating: "Livre",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i3 ou superior",
      ram: "4 GB",
      gpu: "Intel HD 4000 / GeForce GT 1030",
      directx: "11",
      storage: "9 GB",
    },
    recReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5 ou superior",
      ram: "8 GB",
      gpu: "GTX 1050 / RX 560",
      directx: "11",
      storage: "9 GB SSD",
    },
  },
  {
    id: 30,
    name: "Dying Light The Beast",
    appId: 3008130,
    origNumber: 250,
    newNumber: 11.99,
    trailer: "1JfdJ_BKQjE",
    categories: ["terror"],
    short:
      "Kyle Crane retorna em uma nova aventura de parkour e sobrevivência contra hordas de infectados em um mundo aberto brutal.",
    about:
      "Dying Light: The Beast traz o protagonista original, Kyle Crane, treze anos depois de Harran. Após 13 anos de cativeiro como cobaia, Crane escapa para a região alpina de Castor Woods — e descobre que o vírus o transformou em algo mais que humano: a Besta.\n\nParkour fluído, combate corpo a corpo brutal, novo modo veicular e ciclo dia/noite com os caçadores noturnos mais letais da série. Cooperativo online para até 4 jogadores em campanha completa.",
    tags: ["Terror", "Sobrevivência", "Parkour", "Modo História", "Modo Online"],
    rating: "18",
    minReq: {
      os: "Windows 10 64-bit",
      cpu: "Intel Core i5-8600K / AMD Ryzen 5 2600X",
      ram: "16 GB",
      gpu: "GTX 1080 / RX 5700",
      directx: "12",
      storage: "70 GB SSD",
    },
    recReq: {
      os: "Windows 11 64-bit",
      cpu: "Intel Core i5-11600K / AMD Ryzen 5 5600X",
      ram: "16 GB",
      gpu: "RTX 3070 / RX 6800",
      directx: "12",
      storage: "70 GB SSD",
    },
  },
];

void lowEnd;

export const games: Game[] = raw.map((g) => {
  const newPrice = toBRL(g.newNumber);
  const oldPrice = toBRL(g.origNumber);
  const discount = pct(g.origNumber, g.newNumber);
  return {
    id: g.id,
    slug: slugify(g.name),
    name: g.name,
    originalPrice: oldPrice,
    discountedPrice: newPrice,
    discount,
    cover: steamHeader(g.appId),
    description: g.short,
    about: g.about,
    tags: g.tags,
    rating: g.rating,
    platform: platformPC,
    minRequirements: flat(g.minReq),
    recommendedRequirements: flat(g.recReq),
    minReq: g.minReq,
    recReq: g.recReq,
    delivery: defaultDelivery,
    trailer: g.trailer,
    categories: g.categories,
  };
});

// ===== Helpers de busca =====
const stripAccents = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const categoryLabel: Record<GameCategory, string[]> = {
  popular: ["popular", "populares", "destaque", "destaques"],
  acao: ["acao", "ação", "action", "aventura"],
  rpg: ["rpg", "role playing"],
  terror: ["terror", "horror", "medo"],
  luta: ["luta", "fight", "fighting"],
  tiro: ["tiro", "shooter", "fps", "tps"],
};

export function searchGames(query: string, limit = 30): Game[] {
  const q = stripAccents(query.trim());
  if (!q) return [];
  return games
    .map((g) => {
      const name = stripAccents(g.name);
      const tags = g.tags.map(stripAccents).join(" ");
      const cats = g.categories
        .flatMap((c) => categoryLabel[c])
        .map(stripAccents)
        .join(" ");
      const haystack = `${name} ${tags} ${cats}`;
      let score = 0;
      if (name.startsWith(q)) score += 100;
      if (name.includes(q)) score += 50;
      if (tags.includes(q)) score += 20;
      if (cats.includes(q)) score += 10;
      return { g, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.g);
}
