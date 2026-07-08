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

export function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}