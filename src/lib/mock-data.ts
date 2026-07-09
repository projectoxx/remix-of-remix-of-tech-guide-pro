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
  imageUrl?: string;
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
    slug: "tcl-50p755",
    name: 'TCL 50P755 4K Google TV 50"',
    brand: "TCL",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 8.4,
    scoreBreakdown: { imagem: 8.4, som: 7.6, sistema: 8.6, velocidade: 8.4, construcao: 8.0, recursos: 8.4, conectividade: 8.4, custoBeneficio: 9.6 },
    priceAvg: 2299,
    priceMin: 1999,
    priceMax: 2599,
    badge: "custo-beneficio",
    summary: "Uma das TVs 4K mais vendidas do Mercado Livre. Google TV nativo, HDR10 e Dolby Vision, e um dos melhores preços em 50 polegadas de marca conhecida.",
    pros: ["Google TV completo e rápido", "Dolby Vision e HDR10", "Comando de voz por controle", "Preço muito competitivo"],
    cons: ["Som fraco — soundbar recomendada", "Brilho médio para ambientes muito claros"],
    specs: [
      { label: "Tela", value: '50" LED 4K UHD' },
      { label: "Resolução", value: "3840×2160" },
      { label: "HDR", value: "Dolby Vision, HDR10, HLG" },
      { label: "Sistema", value: "Google TV" },
      { label: "HDMI", value: "3 portas" },
      { label: "Wi-Fi", value: "Dual band" },
    ],
    verdict: "É a compra mais segura para quem quer uma 4K de 50\" com marca reconhecida abaixo de R$ 2.500. Vale muito a pena.",
    goodFor: ["Sala pequena/média", "Streaming (Netflix, Prime, Disney+)", "Quem quer 4K sem gastar muito"],
    notFor: ["Ambientes com sol forte na tela", "Cinéfilos exigentes com som"],
    faq: [
      { q: "A TCL 50P755 é boa?", a: "Sim. É uma das TVs 4K mais equilibradas na faixa de R$ 2.000. Google TV nativo, imagem sólida em Dolby Vision e boa reputação no Mercado Livre." },
      { q: "Tem Netflix e Disney+?", a: "Sim, todos os apps de streaming principais estão pré-instalados." },
      { q: "Serve para PS5?", a: "Serve para jogar em 4K a 60Hz. Não tem 120Hz nativo — para gaming competitivo, procure a linha C755 ou uma OLED." },
    ],
    affiliateUrl: "#",
    gradient: g("#0f172a", "#0f4c81"),
    imageUrl: "",
  },
  {
    slug: "samsung-du7700-50",
    name: 'Smart TV Samsung 50" UHD 4K 50DU7700',
    brand: "Samsung",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 8.2,
    scoreBreakdown: { imagem: 8.2, som: 7.8, sistema: 8.4, velocidade: 8.2, construcao: 8.4, recursos: 8.2, conectividade: 8.2, custoBeneficio: 8.8 },
    priceAvg: 2599,
    priceMin: 2299,
    priceMax: 2999,
    badge: "editors-choice",
    summary: "A Smart TV Samsung 50DU7700 é a Samsung 4K mais vendida do Brasil em 50\": processador Crystal 4K, Tizen fluido, PurColor e o padrão de acabamento Samsung por menos de R$ 3.000.",
    pros: ["Marca com a maior rede de assistência do país", "Tizen atualizado, com todos os apps", "Design AirSlim ultrafino", "PurColor com boa cobertura para o preço"],
    cons: ["Sem Dolby Vision", "Apenas HDR10+ para HDR"],
    specs: [
      { label: "Tela", value: '50" LED Crystal UHD 4K' },
      { label: "Processador", value: "Crystal 4K" },
      { label: "HDR", value: "HDR10+, HLG" },
      { label: "Sistema", value: "Tizen (Samsung)" },
      { label: "HDMI", value: "3 portas" },
      { label: "Compatibilidade", value: "Alexa, Bixby, SmartThings" },
    ],
    verdict: "Se você quer marca forte, garantia fácil e uma TV 4K sem grandes surpresas, a Samsung 50DU7700 é o padrão-ouro do custo-benefício Samsung em 2026. Compra segura.",
    goodFor: ["Quem valoriza marca e assistência", "Uso familiar", "Streaming e TV aberta"],
    notFor: ["Fãs de Dolby Vision", "Gamers de nova geração"],
    faq: [
      { q: "A Samsung 50DU7700 é boa?", a: "Sim. É a TV Samsung mais equilibrada até R$ 3.000. Imagem sólida em 4K, Tizen atualizado, e é a mais recomendada por quem já teve outras Samsung." },
      { q: "Qual a diferença para a DU8000?", a: "A DU8000 tem processador melhor e cores um pouco mais precisas. Se a diferença for menor que R$ 300, prefira a DU8000." },
      { q: "Vale mais que uma TCL QLED P7L?", a: "Depende: a Samsung ganha em marca, assistência e Tizen fluido; a TCL ganha em Dolby Vision e painel QLED. Empate técnico." },
    ],
    affiliateUrl: "#",
    gradient: g("#0f172a", "#1e3a8a"),
    imageUrl: "",
  },
  {
    slug: "lg-ur8750-50",
    name: 'Smart TV HQ 50" QLED UHD 4K HQ-QLED50SM',
    brand: "HQ",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 7.9,
    scoreBreakdown: { imagem: 8.2, som: 7.4, sistema: 7.8, velocidade: 7.8, construcao: 7.6, recursos: 8.2, conectividade: 8.0, custoBeneficio: 9.6 },
    priceAvg: 1899,
    priceMin: 1699,
    priceMax: 2199,
    badge: "custo-beneficio",
    summary: "A HQ HQ-QLED50SM é o QLED 50\" mais barato do Mercado Livre em 2026. Painel QLED 4K, HDR10 e sistema smart nacional — uma opção interessante para quem quer QLED sem gastar muito.",
    pros: ["Preço agressivo para QLED 50\"", "Painel QLED com boa cobertura de cor", "HDR10 nativo", "3 portas HDMI"],
    cons: ["Sistema smart menos completo que Google TV/Tizen", "Marca com menos assistência", "Som apenas 16W"],
    specs: [
      { label: "Tela", value: '50" QLED 4K UHD' },
      { label: "Resolução", value: "3840×2160" },
      { label: "HDR", value: "HDR10" },
      { label: "Sistema", value: "Smart TV Linux" },
      { label: "HDMI", value: "3 portas" },
      { label: "Wi-Fi", value: "Dual band" },
    ],
    verdict: "A HQ QLED 50 é a compra racional para quem quer painel QLED em 4K abaixo de R$ 2.000. Não espere a fluidez de uma Samsung ou LG, mas para o preço a imagem surpreende.",
    goodFor: ["Orçamento apertado", "Quem quer QLED sem gastar R$ 3.000", "Segunda TV"],
    notFor: ["Quem depende de marca com muita assistência", "Cinéfilos exigentes"],
    faq: [
      { q: "A Smart TV HQ QLED 50 é boa?", a: "Para o preço, sim. É o QLED 50\" 4K mais barato no Mercado Livre e entrega imagem acima do esperado para a faixa. Perde para Samsung/LG em sistema e assistência." },
      { q: "Vale a pena comprar TV da marca HQ?", a: "Vale se o orçamento é curto e você quer QLED. Compre sempre com garantia estendida do Mercado Livre — nessa faixa ela compensa muito." },
      { q: "Tem Netflix e Prime Video?", a: "Sim, os principais apps de streaming vêm instalados. A loja é limitada em comparação com Google TV." },
    ],
    affiliateUrl: "#",
    gradient: g("#0f172a", "#1e40af"),
    imageUrl: "",
  },
  {
    slug: "philco-ptv50g70",
    name: 'Smart TV TCL 50" QLED 4K P7L',
    brand: "TCL",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 8.6,
    scoreBreakdown: { imagem: 8.8, som: 7.6, sistema: 8.6, velocidade: 8.6, construcao: 8.2, recursos: 8.8, conectividade: 8.4, custoBeneficio: 9.6 },
    priceAvg: 2599,
    priceMin: 2299,
    priceMax: 2999,
    badge: "editors-choice",
    summary: "A TCL P7L QLED é hoje um dos QLEDs 4K de 50\" mais bem avaliados do Mercado Livre. Google TV nativo, Dolby Vision, HDR10+ e cores QLED por menos de R$ 3.000.",
    pros: ["Painel QLED com cores vibrantes", "Dolby Vision + HDR10+", "Google TV completo com Chromecast", "Controle por voz Google Assistente"],
    cons: ["Som fraco — soundbar recomendada", "60Hz apenas (não é ideal para PS5 competitivo)"],
    specs: [
      { label: "Tela", value: '50" QLED 4K UHD' },
      { label: "Resolução", value: "3840×2160" },
      { label: "HDR", value: "Dolby Vision, HDR10+, HLG" },
      { label: "Sistema", value: "Google TV" },
      { label: "HDMI", value: "3 portas" },
      { label: "Áudio", value: "Dolby Atmos" },
    ],
    verdict: "A TCL P7L é a QLED com o melhor custo-benefício de 2026 no Brasil. Dolby Vision, cores QLED e Google TV nativo pelo preço de uma UHD comum. Compra altamente recomendada.",
    goodFor: ["Sala principal", "Consumo pesado de streaming em Dolby Vision", "Quem quer QLED sem gastar muito"],
    notFor: ["Gamers de PS5/Xbox que exigem 120Hz", "Home theater sem soundbar"],
    faq: [
      { q: "A TV TCL P7L QLED é boa?", a: "Sim, e é uma das melhores 4K QLED até R$ 3.000. Ganha da concorrência direta em Dolby Vision e no painel QLED, e mantém o Google TV nativo que é referência em fluidez." },
      { q: "Vale mais que a Samsung DU7700?", a: "Para consumo de streaming e filmes em HDR, a TCL P7L ganha por causa do Dolby Vision e do QLED. A Samsung ainda ganha em rede de assistência." },
      { q: "Serve para PS5 e Xbox Series X?", a: "Roda muito bem em 4K a 60Hz. Não tem 120Hz nativo — para gaming competitivo, olhe a linha C755 da TCL." },
    ],
    affiliateUrl: "#",
    gradient: g("#0f172a", "#0f4c81"),
    imageUrl: "",
  },
  {
    slug: "aoc-s5195-50",
    name: 'Smart TV Multi 43" FHD DLED Roku',
    brand: "Multilaser",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 7.6,
    scoreBreakdown: { imagem: 7.4, som: 7.0, sistema: 8.6, velocidade: 8.0, construcao: 7.4, recursos: 7.6, conectividade: 7.6, custoBeneficio: 9.6 },
    priceAvg: 1399,
    priceMin: 1199,
    priceMax: 1599,
    badge: "menor-preco",
    summary: "A Smart TV Multi (Multilaser) DLED 43\" com Roku é uma das TVs Full HD mais baratas com sistema smart de verdade. Perfeita para quarto, cozinha ou como segunda TV.",
    pros: ["Roku TV — o sistema mais simples do mercado", "Preço muito baixo para uma smart de marca", "Sem propaganda invasiva", "3 portas HDMI"],
    cons: ["Full HD apenas (não é 4K)", "Painel DLED básico", "Som apenas 16W"],
    specs: [
      { label: "Tela", value: '43" DLED Full HD' },
      { label: "Resolução", value: "1920×1080" },
      { label: "Sistema", value: "Roku TV" },
      { label: "HDMI", value: "3 portas" },
      { label: "Wi-Fi", value: "Integrado" },
    ],
    verdict: "Para quem quer uma smart TV de marca conhecida abaixo de R$ 1.500, a Multi Roku 43 Full HD é a mais racional. Roku TV é fácil, rápido e não pesa no dia a dia.",
    goodFor: ["Quarto", "Cozinha", "Segunda TV da casa", "Pessoas menos técnicas"],
    notFor: ["Sala principal", "Quem quer 4K"],
    faq: [
      { q: "A Smart TV Multi 43 Roku é boa?", a: "Para o preço, sim. É uma das smart TVs 43\" mais baratas com sistema Roku — que é o mais simples do mercado. Full HD é suficiente para quarto e para conteúdo em SD/HD." },
      { q: "Vale a pena Full HD em 2026?", a: "Vale para telas até 43\" em uso de quarto ou cozinha. Para sala com sofá longe da TV, prefira 4K." },
      { q: "Tem Netflix, Prime Video e Globoplay?", a: "Sim, todos os principais apps estão disponíveis na loja Roku." },
    ],
    affiliateUrl: "#",
    gradient: g("#1e293b", "#475569"),
    imageUrl: "",
  },
  {
    slug: "philips-50pug7908",
    name: 'Smart TV Philco 32" P32VIK Roku LED Dolby Audio',
    brand: "Philco",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 7.7,
    scoreBreakdown: { imagem: 7.4, som: 8.0, sistema: 8.6, velocidade: 8.0, construcao: 7.6, recursos: 7.8, conectividade: 7.6, custoBeneficio: 9.6 },
    priceAvg: 999,
    priceMin: 899,
    priceMax: 1199,
    badge: "menor-preco",
    summary: "A Philco P32VIK é a smart TV 32\" com Roku e Dolby Audio mais vendida do Mercado Livre. Compacta, simples e ideal para quarto — abaixo de R$ 1.000.",
    pros: ["Sistema Roku — o mais rápido em TVs de entrada", "Dolby Audio embutido", "Preço abaixo de R$ 1.000", "Marca com assistência no Brasil"],
    cons: ["Resolução apenas HD (1366×768)", "Painel LED básico", "Não é 4K"],
    specs: [
      { label: "Tela", value: '32" LED HD' },
      { label: "Resolução", value: "1366×768" },
      { label: "Sistema", value: "Roku TV" },
      { label: "Áudio", value: "Dolby Audio" },
      { label: "HDMI", value: "3 portas" },
    ],
    verdict: "Se você quer uma smart TV pequena e barata para quarto ou cozinha, a Philco P32VIK Roku é uma das compras mais racionais do Mercado Livre em 2026.",
    goodFor: ["Quarto", "Cozinha", "Escritório", "Casa de praia"],
    notFor: ["Sala principal", "Quem quer 4K ou HDR"],
    faq: [
      { q: "A Philco P32VIK Roku é boa?", a: "Sim, para o preço. É a smart TV 32\" com Roku e Dolby Audio mais bem avaliada abaixo de R$ 1.000. Ideal para quarto e uso secundário." },
      { q: "Roku TV é bom mesmo?", a: "É o sistema mais fácil de usar entre smart TVs. Recebe atualizações mensais e tem todos os apps principais (Netflix, Prime, Disney+, Globoplay, YouTube)." },
      { q: "É 4K?", a: "Não, é HD (1366×768). Em 32 polegadas a diferença para Full HD é pequena, e é o que garante o preço abaixo de R$ 1.000." },
    ],
    affiliateUrl: "#",
    gradient: g("#1e293b", "#334155"),
    imageUrl: "",
  },
  {
    slug: "samsung-du7700-43",
    name: 'Smart TV Philco 43" P43VIK Roku LED Dolby Audio',
    brand: "Philco",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 7.9,
    scoreBreakdown: { imagem: 7.8, som: 8.0, sistema: 8.6, velocidade: 8.0, construcao: 7.6, recursos: 8.0, conectividade: 7.8, custoBeneficio: 9.6 },
    priceAvg: 1499,
    priceMin: 1299,
    priceMax: 1699,
    badge: "menor-preco",
    summary: "A Philco P43VIK é a smart TV Full HD 43\" com Roku e Dolby Audio mais vendida do Mercado Livre. Ideal para quem quer uma TV de sala pequena ou quarto amplo, abaixo de R$ 1.500.",
    pros: ["Roku TV com Netflix, Prime e Globoplay", "Full HD 1920×1080", "Dolby Audio embutido", "Marca com assistência no Brasil"],
    cons: ["Não é 4K", "Painel LED de entrada", "60Hz apenas"],
    specs: [
      { label: "Tela", value: '43" LED Full HD' },
      { label: "Resolução", value: "1920×1080" },
      { label: "Sistema", value: "Roku TV" },
      { label: "Áudio", value: "Dolby Audio" },
      { label: "HDMI", value: "3 portas" },
    ],
    verdict: "A Philco P43VIK Roku é a smart TV Full HD 43\" mais racional abaixo de R$ 1.500 em 2026. Roku + Dolby Audio + marca conhecida — combinação difícil de bater no preço.",
    goodFor: ["Sala pequena", "Quarto grande", "Uso principal em streaming"],
    notFor: ["Quem quer 4K", "Salas acima de 15m²"],
    faq: [
      { q: "A Philco P43VIK Roku é boa?", a: "Sim, para quem quer smart TV 43\" com Roku e Dolby Audio abaixo de R$ 1.500. É a mais recomendada da faixa por quem prioriza sistema simples e marca com assistência." },
      { q: "43\" Full HD é suficiente para sala?", a: "Para salas até 3m de distância do sofá, sim. Acima disso, prefira uma 50\" 4K." },
      { q: "Vale mais que a Multi Roku 43?", a: "Empate técnico. A Philco tem Dolby Audio e marca mais tradicional; a Multi tem preço um pouco menor. Escolha pela oferta do dia." },
    ],
    affiliateUrl: "#",
    gradient: g("#1e293b", "#0f4c81"),
    imageUrl: "",
  },
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
    name: 'Smart TV Samsung 65" Crystal LED LH65BEFH4GGXZD',
    brand: "Samsung",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 8.4,
    scoreBreakdown: { imagem: 8.4, som: 7.8, sistema: 8.6, velocidade: 8.4, construcao: 8.4, recursos: 8.2, conectividade: 8.4, custoBeneficio: 9.2 },
    priceAvg: 4499,
    priceMin: 3999,
    priceMax: 4999,
    badge: "custo-beneficio",
    summary: "A Samsung 65LH65BEFH é a smart TV Full HD de 65 polegadas mais vendida para uso corporativo e residencial de tela grande. Ideal para salas amplas, tela grande com padrão Samsung por preço muito abaixo de uma 65\" 4K.",
    pros: ["65 polegadas por menos de R$ 5.000", "Padrão Samsung de acabamento", "Ideal para tela grande em ambientes corporativos ou salas amplas", "Marca com maior rede de assistência"],
    cons: ["Full HD (não é 4K)", "Sistema smart mais enxuto que Tizen residencial", "60Hz apenas"],
    specs: [
      { label: "Tela", value: '65" LED Crystal Full HD' },
      { label: "Resolução", value: "1920×1080" },
      { label: "Sistema", value: "Samsung Smart Signage" },
      { label: "HDMI", value: "2 portas" },
      { label: "Aplicações", value: "Residencial e corporativo" },
    ],
    verdict: "É a Samsung 65\" mais barata do Mercado Livre. Se você prioriza tamanho de tela e marca acima de resolução 4K, vale muito. Para consumo pesado de streaming em 4K, prefira uma DU7700.",
    goodFor: ["Salas grandes", "Ambientes corporativos e comerciais", "Tela grande com marca forte a preço baixo"],
    notFor: ["Quem quer 4K", "Home theater premium"],
    faq: [
      { q: "A Samsung 65LH65BEFH é boa?", a: "Sim, se o seu objetivo é tela grande com marca forte pelo menor preço. É uma linha originalmente comercial que virou queridinha residencial pelo custo-benefício em 65\"." },
      { q: "Vale a pena 65\" Full HD em 2026?", a: "Vale se a distância até o sofá é maior que 3,5m e o orçamento não permite uma 65\" 4K. A percepção de nitidez é boa a partir dessa distância." },
      { q: "É melhor que uma 55\" 4K no mesmo preço?", a: "Depende do uso. Para TV aberta, esportes e streaming em Full HD, os 65\" impressionam mais. Para Netflix/Prime em 4K nativo, prefira uma 55\" 4K." },
    ],
    affiliateUrl: "#",
    gradient: g("#0f172a", "#1e3a8a"),
    imageUrl: "",
  },
  {
    slug: "samsung-s95c-65",
    name: 'Hisense Smart TV FHD 43" 43A4NV',
    brand: "Hisense",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    score: 8.0,
    scoreBreakdown: { imagem: 7.8, som: 7.6, sistema: 8.2, velocidade: 8.0, construcao: 7.8, recursos: 8.4, conectividade: 8.0, custoBeneficio: 9.4 },
    priceAvg: 1599,
    priceMin: 1399,
    priceMax: 1799,
    badge: "custo-beneficio",
    summary: "A Hisense 43A4NV é uma smart TV Full HD 43\" com HDR10, DTS Virtual X e compatibilidade Alexa/Google Home. A Hisense cresceu muito no Brasil e essa é a linha de entrada mais recomendada em 2026.",
    pros: ["HDR10 (raro nessa faixa Full HD)", "DTS Virtual X para som imersivo", "Compatível com Alexa e Google Home", "Sistema VIDAA fluido e limpo"],
    cons: ["Não é 4K", "Painel LED básico", "Marca com assistência ainda em expansão no Brasil"],
    specs: [
      { label: "Tela", value: '43" LED Full HD' },
      { label: "Resolução", value: "1920×1080" },
      { label: "HDR", value: "HDR10" },
      { label: "Áudio", value: "DTS Virtual X" },
      { label: "Sistema", value: "VIDAA" },
      { label: "Compatibilidade", value: "Alexa, Google Home" },
    ],
    verdict: "A Hisense 43A4NV é uma das melhores smart TVs Full HD 43\" abaixo de R$ 1.800 em 2026. HDR10, DTS Virtual X e compatibilidade com assistentes é raro nessa faixa.",
    goodFor: ["Quarto ou sala pequena", "Streaming em Full HD", "Integração com casa inteligente (Alexa/Google Home)"],
    notFor: ["Quem quer 4K", "Salas grandes"],
    faq: [
      { q: "A Hisense 43A4NV é boa?", a: "Sim, é uma das smart TVs 43\" Full HD com melhor conjunto de recursos abaixo de R$ 1.800. HDR10, DTS Virtual X e Alexa/Google Home em uma faixa onde a concorrência é básica." },
      { q: "Hisense é uma marca confiável?", a: "É uma das maiores fabricantes de TV do mundo (top 3 global) e cresceu rápido no Brasil desde 2023. Boa reputação em painéis e sistema smart." },
      { q: "Vale mais que a Multi Roku 43?", a: "Ganha em HDR e recursos de áudio. Perde um pouco em fluidez de sistema (Roku é mais direto). Para quem valoriza imagem, escolha a Hisense." },
    ],
    affiliateUrl: "#",
    gradient: g("#0d3b3a", "#059669"),
    imageUrl: "",
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
    name: 'MacBook Neo 13"',
    brand: "Neo",
    categorySlug: "notebooks",
    categoryName: "Notebooks",
    score: 7.6,
    scoreBreakdown: { imagem: 7.6, som: 7.2, sistema: 7.8, velocidade: 7.8, construcao: 7.8, recursos: 7.6, conectividade: 7.8, custoBeneficio: 9.4 },
    priceAvg: 2299,
    priceMin: 1999,
    priceMax: 2599,
    badge: "custo-beneficio",
    summary: 'O MacBook Neo 13" é um notebook fino e leve com design inspirado nos MacBooks, tela de 13 polegadas Full HD e boa autonomia. Uma opção interessante para estudo e trabalho leve no Mercado Livre.',
    pros: ['Design fino e leve estilo MacBook', 'Tela 13" Full HD IPS', 'Boa autonomia para o preço', 'Ótimo para estudo, home office e navegação'],
    cons: ["Não é um MacBook Apple (é linha alternativa)", "Performance limitada para tarefas pesadas", "Suporte técnico depende do vendedor"],
    specs: [
      { label: "Tela", value: '13" IPS Full HD' },
      { label: "Sistema", value: "Windows" },
      { label: "RAM", value: "8 GB" },
      { label: "Armazenamento", value: "256 GB SSD" },
      { label: "Bateria", value: "Até 8h uso misto" },
    ],
    verdict: 'O MacBook Neo 13" é uma opção honesta abaixo de R$ 2.500 para quem quer um notebook leve, com aparência premium, para estudo e produtividade básica. Não confunda com o MacBook original da Apple.',
    goodFor: ["Estudantes", "Home office leve", "Segundo notebook", "Uso escolar/faculdade"],
    notFor: ["Edição de vídeo pesada", "Design 3D", "Gamers"],
    faq: [
      { q: 'O MacBook Neo 13" é bom?', a: "É uma boa opção para estudo e produtividade leve. Tem design bonito, tela Full HD e boa autonomia. Não é um MacBook da Apple, então gerencie expectativa de performance." },
      { q: "Vem com Windows ou macOS?", a: "Vem com Windows pré-instalado. É um notebook Windows com formato inspirado nos MacBooks." },
      { q: "Serve para trabalhar em casa?", a: "Sim, para tarefas comuns: navegador, Office, videoconferência, streaming e estudo. Para software pesado, prefira um notebook com Ryzen 5/7 ou Core i5/i7." },
    ],
    affiliateUrl: "#",
    gradient: g("#12263a", "#94a3b8"),
    imageUrl: "",
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
    slug: "tcl-50p755-e-boa",
    question: "A TV TCL 50P755 é boa?",
    h1: "A TCL 50P755 é boa? Análise completa em 2026",
    intro:
      "A TCL 50P755 aparece no topo dos mais vendidos do Mercado Livre há meses. Testamos imagem, sistema Google TV, som e reputação de vendedores para responder se ela realmente vale a pena.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-07-01",
    productSlugs: ["tcl-50p755"],
    verdict:
      "Sim, a TCL 50P755 é boa e é uma das melhores compras de 4K abaixo de R$ 2.500. Ganha da concorrência direta em suporte a Dolby Vision e no sistema Google TV. Perde só em som — resolva com uma soundbar.",
    faq: [
      { q: "Vale a pena TCL em 2026?", a: "Vale. A marca cresceu muito no Brasil, tem assistência e as TVs 4K entram no topo de mais vendidos consistentemente." },
      { q: "Como comprar TCL com segurança no Mercado Livre?", a: "Filtre por vendedores oficiais TCL ou MercadoLíder Platinum, e prefira envio Full para receber com nota fiscal e garantia." },
    ],
  },
  {
    slug: "samsung-du7700-e-boa",
    question: "A Samsung DU7700 é boa?",
    h1: "Samsung DU7700 é boa? Vale a pena em 2026?",
    intro:
      "A linha DU7700 é a Samsung 4K mais vendida do Brasil. Analisamos a versão de 50\" que domina o Mercado Livre para responder se ela merece a fama.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-28",
    productSlugs: ["samsung-du7700-50", "samsung-du7700-43"],
    verdict:
      "Sim, a Samsung DU7700 é boa e continua sendo a escolha mais segura da faixa até R$ 3.000. Tizen fluido, marca com assistência ampla e imagem estável. Faltou Dolby Vision — mas esse é o único ponto realmente negativo.",
    faq: [
      { q: "Qual a diferença da DU7700 para a DU8000?", a: "A DU8000 tem processador melhor e HDR mais convincente. Se a diferença de preço for menor que R$ 300, prefira a DU8000." },
      { q: "50 ou 43 polegadas?", a: "50\" é o padrão de sala hoje. 43\" só se for para quarto ou sala muito pequena (<10m²)." },
    ],
  },
  {
    slug: "lg-ur8750-e-boa",
    question: "A LG UR8750 é boa?",
    h1: "LG UR8750 é boa? Análise honesta",
    intro:
      "A UR8750 é o principal modelo LED da LG na faixa intermediária. Testamos o webOS 23, o painel de 50\" e o comportamento em streaming e TV aberta.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-25",
    productSlugs: ["lg-ur8750-50"],
    verdict:
      "Sim, a LG UR8750 é boa — e ganha da concorrência no sistema. O webOS 23 continua sendo o mais rápido entre Smart TVs. Para uso pesado em streaming, é a mais confortável do dia a dia.",
    faq: [
      { q: "A LG UR8750 é boa para PS5?", a: "É boa para jogar em 4K a 60Hz. Se você quer 120Hz e VRR, precisa subir para uma QNED ou OLED." },
      { q: "Vale mais que a Samsung DU7700?", a: "Empate técnico. LG ganha no sistema; Samsung ganha em brilho pontual e assistência." },
    ],
  },
  {
    slug: "philco-ptv50g70-e-boa",
    question: "A TV Philco 50\" 4K é boa?",
    h1: "Philco PTV50G70 é boa? Vale o preço?",
    intro:
      "A Philco PTV50G70 é a TV 4K de 50\" mais barata do Mercado Livre entre marcas com alguma tradição. Vale o desconto? Testamos.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-22",
    productSlugs: ["philco-ptv50g70"],
    verdict:
      "É boa para o preço. Não compete com Samsung/LG em brilho e acabamento, mas entrega 4K real e Google TV abaixo de R$ 2.000 — algo que nenhuma marca top consegue.",
    faq: [
      { q: "TV Philco dura?", a: "Depende do modelo e do lote. Reserve a garantia estendida do Mercado Livre — nessa faixa de preço, ela compensa." },
      { q: "Vale a pena pagar mais na TCL P755?", a: "Vale, se o orçamento permitir. Você ganha Dolby Vision, melhor brilho e um app menos travado." },
    ],
  },
  {
    slug: "aoc-roku-tv-e-boa",
    question: "A AOC Roku TV é boa?",
    h1: "AOC Roku TV 50\" é boa? Análise do S5195",
    intro:
      "A AOC subiu de novo no ranking de vendas por causa da parceria com Roku. É a TV mais simples de usar da faixa — mas vale a pena?",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-18",
    productSlugs: ["aoc-s5195-50"],
    verdict:
      "Sim. Para quem só quer ligar e assistir, é a mais indicada. Roku TV é reconhecidamente o sistema mais direto ao ponto entre Smart TVs.",
    faq: [
      { q: "Roku TV recebe atualização?", a: "Sim, o Roku envia atualizações mensais e é conhecido por manter suporte por muitos anos." },
      { q: "Perde para Google TV em quê?", a: "Em recomendações personalizadas e integração Chromecast. Ganha em velocidade e simplicidade." },
    ],
  },
  {
    slug: "philips-ambilight-e-boa",
    question: "A Philips com Ambilight vale a pena?",
    h1: "Philips 50PUG7908 com Ambilight vale a pena?",
    intro:
      "O Ambilight é exclusivo da Philips e transforma a experiência de assistir. Testamos se ele justifica o preço um pouco maior que a concorrência.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-14",
    productSlugs: ["philips-50pug7908"],
    verdict:
      "Vale muito para quem consome filmes e séries em casa. O efeito Ambilight cria imersão que nenhuma outra TV na faixa oferece — e ainda vem com Dolby Vision.",
    faq: [
      { q: "Ambilight funciona com qualquer conteúdo?", a: "Sim, ele lê a imagem em tempo real e projeta a cor correspondente na parede — inclusive com jogos e streaming." },
      { q: "Precisa de parede clara?", a: "Sim. Em paredes escuras o efeito fica sutil demais. Ideal: parede branca ou clara atrás da TV." },
    ],
  },
  {
    slug: "melhor-tv-ate-2000-reais",
    question: "Qual a melhor TV até 2.000 reais?",
    h1: "Melhor TV até R$ 2.000 em 2026",
    intro:
      "Nessa faixa a briga é feroz. Selecionamos as três TVs que oferecem 4K, marca reconhecida e o menor risco de arrependimento.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-12",
    productSlugs: ["philco-ptv50g70", "aoc-s5195-50", "samsung-du7700-43"],
    verdict:
      "Até R$ 2.000, a Samsung DU7700 43\" é o melhor conjunto marca + qualidade. Se prioridade for tamanho maior (50\"), vá de Philco ou AOC.",
    faq: [
      { q: "É melhor 50\" barata ou 43\" de marca top?", a: "Se a distância até o sofá é maior que 2,5m, prefira 50\". Menos que isso, 43\" de marca top é a compra mais consciente." },
    ],
  },
  {
    slug: "melhor-tv-ate-3000-reais",
    question: "Qual a melhor TV até 3.000 reais?",
    h1: "Melhor TV até R$ 3.000 em 2026",
    intro:
      "Faixa premium do custo-benefício. Aqui já cabem Samsung, LG, TCL e Philips com Dolby Vision, Ambilight e sistemas atualizados.",
    categorySlug: "smart-tvs",
    categoryName: "Smart TVs",
    updatedAt: "2026-06-10",
    productSlugs: ["philips-50pug7908", "tcl-50p755", "lg-ur8750-50", "samsung-du7700-50"],
    verdict:
      "A Philips 50PUG7908 leva pelo Ambilight + Dolby Vision. Empate técnico entre TCL P755, LG UR8750 e Samsung DU7700 — escolha pela marca que você mais confia.",
    faq: [
      { q: "Vale esperar Black Friday?", a: "Sim, esses modelos caem entre 15% e 25% em novembro. Se não tem urgência, espera compensa." },
    ],
  },
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