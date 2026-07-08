export type Category = {
  slug: string;
  name: string;
  description: string;
  count: number;
};

export type ScoreBreakdown = {
  imagem: number;
  som: number;
  sistema: number;
  velocidade: number;
  construcao: number;
  recursos: number;
  conectividade: number;
  custoBeneficio: number;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  priceAvg: number;
  priceMin: number;
  priceMax: number;
  badge?: "premium" | "custo-beneficio" | "editors-choice" | "menor-preco";
  summary: string;
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
  verdict: string;
  goodFor: string[];
  notFor: string[];
  faq: { q: string; a: string }[];
  affiliateUrl: string;
  gradient: [string, string];
};

export type Comparison = {
  slug: string;
  title: string;
  intro: string;
  productSlugs: [string, string];
  winnerBy: { criterion: string; winnerSlug: string }[];
};

export type Ranking = {
  slug: string;
  title: string;
  intro: string;
  productSlugs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  publishedAt: string;
  author: string;
};

export type Guide = {
  slug: string;
  question: string;               // pergunta como as pessoas pesquisam no Google
  h1: string;                     // headline editorial (pode ser igual à pergunta)
  intro: string;                  // parágrafo introdutório
  categorySlug: string;
  categoryName: string;
  updatedAt: string;              // ISO
  productSlugs: string[];         // ranking dentro do guia
  verdict: string;
  faq: { q: string; a: string }[];
};

export const categories: Category[] = [
  { slug: "smart-tvs", name: "Smart TVs", description: "Reviews de TVs 4K, 8K, OLED, QLED e Mini LED.", count: 42 },
  { slug: "celulares", name: "Celulares", description: "Smartphones Android e iPhone testados em laboratório.", count: 78 },
  { slug: "notebooks", name: "Notebooks", description: "Laptops para trabalho, estudo e games.", count: 51 },
  { slug: "fones-bluetooth", name: "Fones Bluetooth", description: "Fones TWS, over-ear e cancelamento de ruído.", count: 63 },
  { slug: "tablets", name: "Tablets", description: "iPads, tablets Android e alternativas premium.", count: 24 },
  { slug: "smartwatch", name: "Smartwatch", description: "Relógios inteligentes e wearables.", count: 31 },
  { slug: "monitores", name: "Monitores", description: "Monitores gaming, produtividade e OLED.", count: 38 },
  { slug: "videogames", name: "Videogames", description: "Consoles, portáteis e acessórios de gaming.", count: 22 },
  { slug: "cameras", name: "Câmeras", description: "Câmeras mirrorless, DSLR e action cams.", count: 19 },
  { slug: "roteadores", name: "Roteadores Wi-Fi", description: "Wi-Fi 6, Wi-Fi 7 e mesh systems.", count: 17 },
  { slug: "ssd", name: "SSD e HDs", description: "Armazenamento interno, externo e NVMe.", count: 29 },
  { slug: "tv-box", name: "TV Box e Projetores", description: "TV Box Android e projetores 4K.", count: 15 },
];

const g = (a: string, b: string): [string, string] => [a, b];

export const products: Product[] = [
  {
    slug: "sony-a95l-65",
    name: 'Sony BRAVIA XR A95L 65"',
    brand: "Sony",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 9.4,
    scoreBreakdown: { imagem: 9.8, som: 9.2, sistema: 9.0, velocidade: 9.1, construcao: 9.5, recursos: 9.4, conectividade: 9.0, custoBeneficio: 8.4 },
    priceAvg: 24999,
    priceMin: 22990,
    priceMax: 27499,
    badge: "editors-choice",
    summary: "O painel QD-OLED de segunda geração entrega o melhor processamento de imagem que já testamos em laboratório. Cores impecáveis, brilho de pico recorde e o processador Cognitive XR trabalha em outro patamar.",
    pros: [
      "Painel QD-OLED com brilho de pico acima de 1.300 nits",
      "Processamento de imagem líder de mercado",
      "Google TV fluido e completo",
      "Áudio Acoustic Surface Audio+ excepcional",
    ],
    cons: [
      "Preço bastante elevado",
      "Apenas 2 portas HDMI 2.1",
      "Design com pé central pode limitar rack",
    ],
    specs: [
      { label: "Tecnologia", value: "QD-OLED (2ª geração)" },
      { label: "Resolução", value: "4K UHD (3840×2160)" },
      { label: "Taxa de atualização", value: "120 Hz nativa" },
      { label: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { label: "Processador", value: "Cognitive Processor XR" },
      { label: "Sistema", value: "Google TV" },
      { label: "HDMI 2.1", value: "2 portas" },
      { label: "Áudio", value: "Acoustic Surface Audio+ 60W" },
    ],
    verdict: "Se você quer o topo absoluto em imagem OLED em 2024 e o preço não é limitante, o A95L é imbatível. Para uso misto (filmes, esportes, games) é a compra mais completa do mercado.",
    goodFor: ["Cinéfilos exigentes", "Home theater premium", "Jogadores de PS5 competitivo"],
    notFor: ["Quem busca custo-benefício", "Ambientes muito claros com sol direto"],
    faq: [
      { q: "Suporta 120Hz no PS5 e Xbox Series X?", a: "Sim. As duas portas HDMI 2.1 suportam 4K@120Hz, VRR e ALLM." },
      { q: "Tem risco de burn-in?", a: "É OLED, então existe risco teórico. Na prática, o Panel Refresh e Pixel Shift da Sony minimizam bastante em uso normal." },
      { q: "Vale mais que a LG G4?", a: "Para cores puras e cinema, sim. A G4 tem brilho maior e é melhor para ambientes claros." },
    ],
    affiliateUrl: "#",
    gradient: g("#0d3b3a", "#2dd4a8"),
  },
  {
    slug: "lg-c3-55",
    name: 'LG OLED C3 55"',
    brand: "LG",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 9.1,
    scoreBreakdown: { imagem: 9.4, som: 8.4, sistema: 9.0, velocidade: 9.3, construcao: 9.0, recursos: 9.6, conectividade: 9.8, custoBeneficio: 9.0 },
    priceAvg: 8499,
    priceMin: 7899,
    priceMax: 9299,
    badge: "custo-beneficio",
    summary: "A LG C3 é o padrão-ouro de OLED com preço acessível. Quatro portas HDMI 2.1, webOS 23 fluido, e desempenho excepcional em games e filmes.",
    pros: ["4 portas HDMI 2.1 completas", "webOS 23 rápido e completo", "Excelente para gaming", "Preto perfeito OLED"],
    cons: ["Brilho de pico menor que QD-OLED", "Áudio mediano — soundbar recomendada"],
    specs: [
      { label: "Tecnologia", value: "OLED evo" },
      { label: "Resolução", value: "4K UHD" },
      { label: "Taxa de atualização", value: "120 Hz" },
      { label: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { label: "Sistema", value: "webOS 23" },
      { label: "HDMI 2.1", value: "4 portas" },
    ],
    verdict: "A TV mais equilibrada de 2024. Se você joga PS5/Xbox/PC e quer OLED sem gastar R$ 25k, é imbatível.",
    goodFor: ["Gamers de nova geração", "Uso misto filmes + games", "Quem busca melhor custo-benefício OLED"],
    notFor: ["Salas com muita luz direta", "Áudio sem soundbar"],
    faq: [
      { q: "Todas as 4 HDMI são 2.1?", a: "Sim, todas as 4 suportam 4K@120Hz, VRR, ALLM e G-SYNC compatível." },
      { q: "Compatível com Dolby Vision Gaming?", a: "Sim, em 4K@120Hz." },
    ],
    affiliateUrl: "#",
    gradient: g("#12263a", "#4f6b9a"),
  },
  {
    slug: "samsung-s95c-65",
    name: 'Samsung S95C QD-OLED 65"',
    brand: "Samsung",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 9.2,
    scoreBreakdown: { imagem: 9.5, som: 8.8, sistema: 8.5, velocidade: 9.4, construcao: 9.6, recursos: 9.2, conectividade: 9.4, custoBeneficio: 8.6 },
    priceAvg: 16999,
    priceMin: 14999,
    priceMax: 18990,
    badge: "premium",
    summary: "Design ultrafino One Connect, brilho altíssimo e cores QD-OLED. Alternativa Samsung ao topo Sony com melhor preço.",
    pros: ["Design One Connect impecável", "Cores QD-OLED vibrantes", "144Hz para PC gaming"],
    cons: ["Sem Dolby Vision", "Tizen OS mais lento que webOS"],
    specs: [
      { label: "Tecnologia", value: "QD-OLED" },
      { label: "Taxa de atualização", value: "144 Hz" },
      { label: "HDR", value: "HDR10+, HLG" },
      { label: "Sistema", value: "Tizen 2023" },
      { label: "HDMI 2.1", value: "4 portas" },
    ],
    verdict: "Segundo lugar consistente atrás do A95L em quase tudo, com design superior.",
    goodFor: ["Design lovers", "Gamers PC 144Hz"],
    notFor: ["Fãs de Dolby Vision"],
    faq: [
      { q: "Tem Dolby Vision?", a: "Não. Samsung usa apenas HDR10+." },
    ],
    affiliateUrl: "#",
    gradient: g("#1b4332", "#2dd4a8"),
  },
  {
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    categorySlug: "celulares",
    categoryName: "Celulares",
    score: 9.2,
    scoreBreakdown: { imagem: 9.5, som: 8.4, sistema: 9.0, velocidade: 9.6, construcao: 9.7, recursos: 9.5, conectividade: 9.6, custoBeneficio: 8.2 },
    priceAvg: 8999,
    priceMin: 7499,
    priceMax: 10999,
    badge: "editors-choice",
    summary: "O smartphone Android mais completo de 2024. Câmera de 200MP, S-Pen integrada, tela AMOLED 2X de 2600 nits e Snapdragon 8 Gen 3 for Galaxy.",
    pros: ["Zoom óptico de até 5x com ótima qualidade", "Tela mais brilhante do mercado", "7 anos de atualização", "Galaxy AI útil no dia a dia"],
    cons: ["Preço elevado", "Câmera 10MP telefoto foi retirada", "Sem carregador na caixa"],
    specs: [
      { label: "Tela", value: '6,8" Dynamic AMOLED 2X 120Hz' },
      { label: "Processador", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "RAM", value: "12 GB" },
      { label: "Armazenamento", value: "256 / 512 GB / 1 TB" },
      { label: "Câmera principal", value: "200 MP f/1.7 OIS" },
      { label: "Bateria", value: "5000 mAh" },
      { label: "Carregamento", value: "45W com fio, 15W sem fio" },
    ],
    verdict: "Se você quer o melhor Android hoje e vai usar por muitos anos, é a escolha certa. A garantia de 7 anos de updates justifica o preço.",
    goodFor: ["Produtividade com S-Pen", "Fotografia móvel avançada", "Quem troca de celular a cada 3-4 anos"],
    notFor: ["Quem quer preço baixo", "Fãs de design compacto"],
    faq: [
      { q: "Vale mais que iPhone 15 Pro Max?", a: "Depende do ecossistema. No Android, é o mais completo." },
      { q: "A S-Pen precisa ser carregada?", a: "Não, ela usa Bluetooth por indução." },
    ],
    affiliateUrl: "#",
    gradient: g("#12263a", "#73ffb8"),
  },
  {
    slug: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    categorySlug: "celulares",
    categoryName: "Celulares",
    score: 9.0,
    scoreBreakdown: { imagem: 9.4, som: 8.8, sistema: 9.6, velocidade: 9.7, construcao: 9.5, recursos: 9.0, conectividade: 9.0, custoBeneficio: 7.8 },
    priceAvg: 10499,
    priceMin: 9299,
    priceMax: 12999,
    badge: "premium",
    summary: "Titânio, USB-C, chip A17 Pro e a melhor câmera de vídeo do mercado móvel. iOS 17 no seu melhor.",
    pros: ["Chassi em titânio leve", "Vídeo cinema-grade", "Ecossistema Apple imbatível"],
    cons: ["Preço absurdo no Brasil", "Sem carregador rápido embalado"],
    specs: [
      { label: "Tela", value: '6,7" Super Retina XDR 120Hz' },
      { label: "Chip", value: "Apple A17 Pro" },
      { label: "Armazenamento", value: "256 / 512 GB / 1 TB" },
      { label: "Câmera principal", value: "48 MP f/1.78" },
    ],
    verdict: "Melhor iPhone já feito. Vale muito para quem já vive no ecossistema Apple.",
    goodFor: ["Ecossistema Apple", "Videomakers móveis"],
    notFor: ["Quem prioriza custo-benefício"],
    faq: [
      { q: "USB-C é 3.0 ou 2.0?", a: "3.0 apenas no Pro / Pro Max, transferência muito rápida." },
    ],
    affiliateUrl: "#",
    gradient: g("#1a1a2e", "#94a3b8"),
  },
  {
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    categorySlug: "fones-bluetooth",
    categoryName: "Fones Bluetooth",
    score: 9.3,
    scoreBreakdown: { imagem: 0, som: 9.5, sistema: 9.0, velocidade: 9.0, construcao: 9.0, recursos: 9.6, conectividade: 9.5, custoBeneficio: 8.8 },
    priceAvg: 2199,
    priceMin: 1890,
    priceMax: 2499,
    badge: "menor-preco",
    summary: "O rei absoluto do cancelamento de ruído. 30 horas de bateria, som excepcional e o melhor ANC do mercado.",
    pros: ["ANC líder de mercado", "30h de autonomia", "Chamadas com qualidade excelente"],
    cons: ["Não dobra como o XM4", "Case grande"],
    specs: [
      { label: "Drivers", value: "30mm" },
      { label: "Bateria", value: "30h com ANC" },
      { label: "Bluetooth", value: "5.2 multiponto" },
      { label: "Codecs", value: "LDAC, AAC, SBC" },
    ],
    verdict: "Se você quer o melhor ANC em 2024, não tem discussão.",
    goodFor: ["Viagens de avião", "Trabalho remoto", "Ambientes barulhentos"],
    notFor: ["Quem prioriza portabilidade extrema"],
    faq: [
      { q: "Vale mais que o Bose QC Ultra?", a: "Empata em ANC, ganha em som e bateria." },
    ],
    affiliateUrl: "#",
    gradient: g("#12263a", "#2dd4a8"),
  },
  {
    slug: "macbook-pro-m3-max",
    name: "MacBook Pro 14 M3 Max",
    brand: "Apple",
    categorySlug: "notebooks",
    categoryName: "Notebooks",
    score: 9.6,
    scoreBreakdown: { imagem: 9.8, som: 9.4, sistema: 9.7, velocidade: 9.9, construcao: 9.8, recursos: 9.4, conectividade: 9.2, custoBeneficio: 8.0 },
    priceAvg: 32999,
    priceMin: 29999,
    priceMax: 36990,
    badge: "editors-choice",
    summary: "A máquina profissional mais rápida e eficiente do mundo em um laptop. Tela XDR mini-LED, bateria colossal e chip M3 Max devastador em cargas criativas.",
    pros: ["Performance profissional líder", "Tela mini-LED de referência", "Autonomia excepcional", "Silencioso mesmo sob carga"],
    cons: ["Preço estratosférico", "Sem upgrade após compra"],
    specs: [
      { label: "Tela", value: '14,2" Liquid Retina XDR 120Hz' },
      { label: "Chip", value: "Apple M3 Max (14/16 CPU, 30/40 GPU)" },
      { label: "Memória", value: "36 GB unificada" },
      { label: "SSD", value: "1 TB PCIe 4.0" },
      { label: "Bateria", value: "22h vídeo" },
    ],
    verdict: "Se seu trabalho paga R$ 30k em um laptop (edição 4K/8K, 3D, dev pesado), é a melhor máquina do mundo.",
    goodFor: ["Editores de vídeo profissionais", "Devs iOS/Mac", "Motion designers"],
    notFor: ["Uso geral", "Gamers hardcore"],
    faq: [
      { q: "Roda jogos Windows?", a: "Alguns via Crossover/Whisky, mas não é uma máquina para gaming." },
    ],
    affiliateUrl: "#",
    gradient: g("#12263a", "#73ffb8"),
  },
  {
    slug: "poco-f6",
    name: "POCO F6",
    brand: "Xiaomi",
    categorySlug: "celulares",
    categoryName: "Celulares",
    score: 8.6,
    scoreBreakdown: { imagem: 8.4, som: 8.0, sistema: 8.4, velocidade: 9.4, construcao: 8.4, recursos: 8.6, conectividade: 8.6, custoBeneficio: 9.8 },
    priceAvg: 2799,
    priceMin: 2499,
    priceMax: 3199,
    badge: "custo-beneficio",
    summary: "Performance de topo de linha por menos de R$ 3.000. Snapdragon 8s Gen 3, tela AMOLED 120Hz e carregamento de 90W.",
    pros: ["Custo-benefício absurdo", "Carregamento 90W", "Snapdragon 8s Gen 3"],
    cons: ["Câmera não é topo", "HyperOS com bloatware"],
    specs: [
      { label: "Tela", value: '6,67" AMOLED 120Hz' },
      { label: "Chip", value: "Snapdragon 8s Gen 3" },
      { label: "RAM", value: "8 / 12 GB" },
      { label: "Bateria", value: "5000 mAh, 90W" },
    ],
    verdict: "Melhor performance por real do mercado em 2024.",
    goodFor: ["Quem quer performance top pagando menos", "Gamers móveis"],
    notFor: ["Fotógrafos móveis exigentes"],
    faq: [
      { q: "Tem versão global?", a: "Sim, e recomendamos a versão global para atualizações consistentes." },
    ],
    affiliateUrl: "#",
    gradient: g("#1b4332", "#73ffb8"),
  },
];

export const comparisons: Comparison[] = [
  {
    slug: "sony-a95l-vs-lg-c3",
    title: "Sony A95L vs LG C3: O duelo dos OLEDs premium",
    intro: "Testamos as duas OLEDs mais desejadas de 2024 lado a lado em laboratório. Brilho, cor, gaming e áudio — o vencedor não é óbvio.",
    productSlugs: ["sony-a95l-65", "lg-c3-55"],
    winnerBy: [
      { criterion: "Brilho de pico", winnerSlug: "sony-a95l-65" },
      { criterion: "Fidelidade de cor", winnerSlug: "sony-a95l-65" },
      { criterion: "Recursos gaming", winnerSlug: "lg-c3-55" },
      { criterion: "Custo-benefício", winnerSlug: "lg-c3-55" },
      { criterion: "Processamento de imagem", winnerSlug: "sony-a95l-65" },
      { criterion: "Sistema operacional", winnerSlug: "lg-c3-55" },
    ],
  },
  {
    slug: "galaxy-s24-ultra-vs-iphone-15-pro-max",
    title: "Galaxy S24 Ultra vs iPhone 15 Pro Max",
    intro: "O melhor Android vs o melhor iPhone. Câmera, performance, tela, autonomia — comparativo definitivo.",
    productSlugs: ["samsung-galaxy-s24-ultra", "iphone-15-pro-max"],
    winnerBy: [
      { criterion: "Câmera fotográfica", winnerSlug: "samsung-galaxy-s24-ultra" },
      { criterion: "Câmera de vídeo", winnerSlug: "iphone-15-pro-max" },
      { criterion: "Performance", winnerSlug: "iphone-15-pro-max" },
      { criterion: "Tela", winnerSlug: "samsung-galaxy-s24-ultra" },
      { criterion: "Autonomia", winnerSlug: "samsung-galaxy-s24-ultra" },
      { criterion: "Ecossistema", winnerSlug: "iphone-15-pro-max" },
    ],
  },
];

export const rankings: Ranking[] = [
  {
    slug: "melhores-tvs-2024",
    title: "As Melhores TVs de 2024",
    intro: "Ranking laboratorial das TVs premium testadas em 2024 — do topo QD-OLED à melhor custo-benefício.",
    productSlugs: ["sony-a95l-65", "samsung-s95c-65", "lg-c3-55"],
  },
  {
    slug: "melhores-celulares-2024",
    title: "Os Melhores Celulares de 2024",
    intro: "Do flagship absoluto ao melhor custo-benefício, ranking completo.",
    productSlugs: ["samsung-galaxy-s24-ultra", "iphone-15-pro-max", "poco-f6"],
  },
  {
    slug: "melhores-fones-bluetooth",
    title: "Os Melhores Fones Bluetooth",
    intro: "Ranking de fones over-ear e TWS com cancelamento de ruído.",
    productSlugs: ["sony-wh-1000xm5"],
  },
];

export const articles: Article[] = [
  { slug: "guia-tvs-oled-2024", title: "Guia completo: como escolher uma TV OLED em 2024", excerpt: "QD-OLED, WOLED, MLA — entenda as tecnologias e descubra qual comprar.", category: "Guia", readingMinutes: 12, publishedAt: "2024-10-18", author: "Ricardo Menezes" },
  { slug: "vale-a-pena-mini-led", title: "Mini LED vs OLED: vale a pena migrar em 2024?", excerpt: "Comparamos brilho, contraste, burn-in e preço nas duas tecnologias de ponta.", category: "Análise", readingMinutes: 8, publishedAt: "2024-10-14", author: "Carolina Vieira" },
  { slug: "melhores-tvs-para-ps5", title: "As 5 melhores TVs para PS5 e Xbox Series X", excerpt: "HDMI 2.1, 120Hz, VRR — os requisitos que importam e nossos vencedores.", category: "Ranking", readingMinutes: 10, publishedAt: "2024-10-10", author: "Ricardo Menezes" },
  { slug: "iphone-16-vs-galaxy-s24", title: "iPhone 16 vs Galaxy S24: quem venceu 2024?", excerpt: "Análise técnica dos flagships mais vendidos do ano.", category: "Comparativo", readingMinutes: 15, publishedAt: "2024-10-05", author: "Bruno Sato" },
];

export const guides: Guide[] = [
  {
    slug: "melhor-tv-para-comprar-2026",
    question: "Qual a melhor TV para comprar em 2026?",
    h1: "Qual a melhor TV para comprar em 2026?",
    intro:
      "Testamos as principais smart TVs vendidas no Mercado Livre e reunimos aqui as escolhas mais equilibradas entre imagem, preço e durabilidade. Se você quer acertar na compra sem gastar horas comparando ficha técnica, comece por esta lista — atualizada mensalmente.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-14",
    productSlugs: ["sony-a95l-65", "lg-c3-55", "samsung-s95c-65"],
    verdict:
      "Para a maioria das pessoas, a LG OLED C3 é o melhor equilíbrio entre preço, qualidade de imagem e recursos para jogos em 2026. Se o orçamento permitir, a Sony A95L entrega a melhor imagem do mercado.",
    faq: [
      { q: "Vale a pena comprar TV OLED em 2026?", a: "Sim, para quem assiste filmes e séries ou joga PS5/Xbox Series X. O preto perfeito e o tempo de resposta seguem imbatíveis. Para ambientes muito claros, uma Mini LED de topo pode ser preferível." },
      { q: "Quantas polegadas comprar?", a: "Para salas comuns, 55\" resolve muito bem. A partir de 3 metros de distância, 65\" começa a valer a pena." },
      { q: "Onde comprar com segurança?", a: "No Mercado Livre, prefira lojas oficiais das marcas (Sony, LG, Samsung) e verifique se a entrega é feita pelo Mercado Envios Full." },
    ],
  },
  {
    slug: "tvs-baratas-mais-procuradas",
    question: "Quais TVs baratas são as mais procuradas hoje?",
    h1: "As TVs baratas mais procuradas (e que realmente valem a pena)",
    intro:
      "Barato não pode significar arrependimento. Selecionamos as smart TVs mais buscadas por quem quer gastar pouco, filtrando pelas que têm boa nota em imagem, sistema fluido e reputação sólida no pós-venda.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-10",
    productSlugs: ["lg-c3-55"],
    verdict:
      "Se o teto é abaixo de R$ 3.000, priorize resolução 4K, HDR10 e um sistema conhecido (Google TV, webOS ou Roku TV). Fuja de marcas sem suporte no Brasil.",
    faq: [
      { q: "TV barata dura menos?", a: "Não necessariamente. O que muda é o controle de qualidade e o suporte pós-venda. Marcas conhecidas com garantia estendida diluem esse risco." },
      { q: "Vale pagar mais por 4K?", a: "Sim. A diferença de preço entre Full HD e 4K encolheu muito, e conteúdo 4K já é padrão em streaming." },
    ],
  },
  {
    slug: "melhor-tv-55-polegadas-custo-beneficio",
    question: "Qual a melhor TV 55 polegadas custo-benefício?",
    h1: "Melhor TV 55\" custo-benefício",
    intro:
      "55 polegadas é o tamanho mais vendido no Brasil e onde a briga por custo-benefício é mais dura. Comparamos brilho, sistema, gaming e preço para escolher as que mais entregam por real gasto.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-08",
    productSlugs: ["lg-c3-55", "samsung-s95c-65"],
    verdict:
      "A LG OLED C3 55\" reina no custo-benefício premium. Para orçamentos menores, procure QLEDs de 55\" da Samsung ou TCL com 120Hz.",
    faq: [
      { q: "OLED de 55\" vale a pena?", a: "Vale, se você consumir filmes/séries e jogar. Para quem só assiste TV aberta, uma QLED entrega mais brilho por menos." },
    ],
  },
  {
    slug: "melhor-celular-ate-3000-reais",
    question: "Qual o melhor celular até 3.000 reais?",
    h1: "Melhor celular até R$ 3.000 em 2026",
    intro:
      "Nessa faixa está a maior briga de smartphones no Mercado Livre. Nossa recomendação prioriza processador atual, tela AMOLED e política de atualização — os três pontos que decidem se o aparelho envelhece bem.",
    categorySlug: "celulares",
    categoryName: "Celulares",
    updatedAt: "2026-06-05",
    productSlugs: ["poco-f6"],
    verdict:
      "O POCO F6 é hoje o melhor custo-benefício abaixo de R$ 3.000, com performance de topo, AMOLED 120Hz e carregamento rápido. Se quiser marca com mais lojas físicas, avalie Motorola Edge 50 ou Galaxy A55.",
    faq: [
      { q: "Melhor comprar direto do Mercado Livre ou loja física?", a: "No Mercado Livre você geralmente paga menos, mas confirme se é uma loja oficial ou MercadoLíder Platinum para garantir a nota fiscal e a garantia." },
      { q: "Vale esperar Black Friday?", a: "Se não tem urgência, sim. A faixa de R$ 2.500–3.000 costuma ter os melhores descontos em novembro." },
    ],
  },
  {
    slug: "melhor-iphone-para-comprar",
    question: "Qual o melhor iPhone para comprar hoje?",
    h1: "Qual iPhone comprar hoje: guia direto ao ponto",
    intro:
      "Se você já decidiu que quer iPhone, resta escolher entre custo-benefício, câmera ou o topo absoluto. Aqui está o resumo por perfil, com foco nos modelos que realmente compensam no Mercado Livre.",
    categorySlug: "celulares",
    categoryName: "Celulares",
    updatedAt: "2026-06-02",
    productSlugs: ["iphone-15-pro-max"],
    verdict:
      "O iPhone 15 Pro Max segue como a compra mais completa da Apple no Brasil. Se quer economizar sem perder muito, um iPhone 15 (não Pro) atende a maioria por 30–40% menos.",
    faq: [
      { q: "Vale a pena comprar iPhone recondicionado?", a: "Vale, desde que seja de vendedor com reputação verde, garantia mínima de 90 dias e teste de bateria acima de 85%." },
    ],
  },
  {
    slug: "melhor-fone-bluetooth-com-cancelamento-de-ruido",
    question: "Qual o melhor fone Bluetooth com cancelamento de ruído?",
    h1: "Melhor fone Bluetooth com cancelamento de ruído",
    intro:
      "O cancelamento ativo virou padrão nos fones premium. Testamos autonomia, qualidade de chamada e conforto em uso prolongado — o objetivo é você escolher em 2 minutos.",
    categorySlug: "fones-bluetooth",
    categoryName: "Fones Bluetooth",
    updatedAt: "2026-05-28",
    productSlugs: ["sony-wh-1000xm5"],
    verdict:
      "Sony WH-1000XM5 é a escolha segura: melhor ANC do mercado, som equilibrado e 30h de bateria. Se prefere modelos in-ear, olhe para os Sony WF-1000XM5 ou Apple AirPods Pro 2.",
    faq: [
      { q: "Preciso pagar caro para ter cancelamento bom?", a: "O salto grande está entre R$ 300 e R$ 1.000. Acima disso, o ganho é mais em conforto, chamadas e codecs de alta resolução." },
    ],
  },
  {
    slug: "melhor-notebook-para-trabalho-remoto",
    question: "Qual o melhor notebook para trabalho remoto?",
    h1: "Melhor notebook para trabalho remoto em 2026",
    intro:
      "Trabalho remoto exige três coisas: bateria que aguente um dia inteiro, tela que não canse os olhos e webcam decente. Selecionamos os notebooks que entregam esse pacote sem exageros de preço.",
    categorySlug: "notebooks",
    categoryName: "Notebooks",
    updatedAt: "2026-05-22",
    productSlugs: ["macbook-pro-m3-max"],
    verdict:
      "Para quem trabalha com edição, código pesado ou design, o MacBook Pro M3 é imbatível em autonomia e silêncio. Para trabalho de escritório, um notebook com Ryzen 7 ou Core i5 recente entrega o essencial por muito menos.",
    faq: [
      { q: "Mac ou Windows para trabalho remoto?", a: "Se sua empresa usa Office 365, Teams e sistemas web, tanto faz. Mac ganha em bateria e revenda; Windows ganha em variedade e preço." },
    ],
  },
];

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function findCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function findComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function findRanking(slug: string): Ranking | undefined {
  return rankings.find((r) => r.slug === slug);
}

export function findGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCategory(slug: string): Guide[] {
  return guides.filter((g) => g.categorySlug === slug);
}

export function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}