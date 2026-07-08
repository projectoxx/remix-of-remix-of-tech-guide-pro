import { products } from "./mock-data";
import type { Product } from "./mock-data";

const KEY = "techradar.affiliate.v1";
const IMG_KEY = "techradar.productImages.v1";
const OVR_KEY = "techradar.productOverrides.v1";
const USR_KEY = "techradar.userProducts.v1";

/** Overrides editáveis pelo admin para cada produto (base ou custom). */
export type ProductOverrides = {
  priceMin?: number;      // preço "de agora"
  priceOld?: number;      // preço antigo (aparece riscado)
  discountPct?: number;   // % de desconto (0-99)
  offerLabel?: string;    // rótulo do selo de oferta (ex.: "Oferta relâmpago")
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

const readMap = () => readJSON<Record<string, string>>(KEY, {});
const writeMap = (m: Record<string, string>) => writeJSON(KEY, m);
const readImgMap = () => readJSON<Record<string, string>>(IMG_KEY, {});
const writeImgMap = (m: Record<string, string>) => writeJSON(IMG_KEY, m);
const readOvrMap = () => readJSON<Record<string, ProductOverrides>>(OVR_KEY, {});
const writeOvrMap = (m: Record<string, ProductOverrides>) => writeJSON(OVR_KEY, m);
const readUserProducts = () => readJSON<Product[]>(USR_KEY, []);
const writeUserProducts = (list: Product[]) => writeJSON(USR_KEY, list);

/** Retorna o link de afiliado atual (override do admin ou o padrão do produto). */
export function getAffiliateUrl(slug: string): string {
  const map = readMap();
  if (map[slug] && map[slug].trim() !== "") return map[slug];
  const p = products.find((p) => p.slug === slug);
  return p?.affiliateUrl || "#";
}

export function setAffiliateUrl(slug: string, url: string) {
  const map = readMap();
  if (url.trim() === "") {
    delete map[slug];
  } else {
    map[slug] = url.trim();
  }
  writeMap(map);
}

export function getAllAffiliateOverrides(): Record<string, string> {
  return readMap();
}

export function clearAffiliateOverride(slug: string) {
  setAffiliateUrl(slug, "");
}

/** Retorna a URL da imagem (override do admin — ex.: CDN do Mercado Livre — ou o padrão). */
export function getProductImageUrl(slug: string): string {
  const map = readImgMap();
  if (map[slug] && map[slug].trim() !== "") return map[slug];
  const p = products.find((p) => p.slug === slug);
  return p?.imageUrl || "";
}

export function setProductImageUrl(slug: string, url: string) {
  const map = readImgMap();
  if (url.trim() === "") {
    delete map[slug];
  } else {
    map[slug] = url.trim();
  }
  writeImgMap(map);
}

export function getAllProductImageOverrides(): Record<string, string> {
  return readImgMap();
}

/* -------- Overrides de preço / oferta -------- */

export function getProductOverrides(slug: string): ProductOverrides {
  return readOvrMap()[slug] ?? {};
}

export function getAllProductOverrides(): Record<string, ProductOverrides> {
  return readOvrMap();
}

export function setProductOverrides(slug: string, patch: ProductOverrides) {
  const map = readOvrMap();
  const current = map[slug] ?? {};
  const next: ProductOverrides = { ...current, ...patch };
  // limpar chaves vazias
  (Object.keys(next) as (keyof ProductOverrides)[]).forEach((k) => {
    const v = next[k];
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "") || (typeof v === "number" && Number.isNaN(v))) {
      delete next[k];
    }
  });
  if (Object.keys(next).length === 0) delete map[slug];
  else map[slug] = next;
  writeOvrMap(map);
}

/* -------- Produtos criados pelo admin -------- */

export function getUserProducts(): Product[] {
  return readUserProducts();
}

export function addUserProduct(p: Product) {
  const list = readUserProducts();
  const idx = list.findIndex((x) => x.slug === p.slug);
  if (idx >= 0) list[idx] = p;
  else list.push(p);
  writeUserProducts(list);
}

export function deleteUserProduct(slug: string) {
  writeUserProducts(readUserProducts().filter((p) => p.slug !== slug));
}

/* -------- Lista unificada -------- */

function baseBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug) ?? readUserProducts().find((p) => p.slug === slug);
}

/** Retorna todos os produtos (base + criados no admin) sem aplicar overrides. */
export function getAllProductsRaw(): Product[] {
  return [...products, ...readUserProducts()];
}

/** Aplica overrides de preço/oferta/imagem a um produto para exibição. */
export function applyDisplayOverrides(p: Product): Product & {
  displayPrice: number;
  priceOld?: number;
  discountPct?: number;
  offerLabel?: string;
} {
  const ovr = getProductOverrides(p.slug);
  const img = getProductImageUrl(p.slug);
  const displayPrice = typeof ovr.priceMin === "number" && ovr.priceMin > 0 ? ovr.priceMin : p.priceMin;
  let discountPct = ovr.discountPct;
  if (!discountPct && ovr.priceOld && displayPrice && ovr.priceOld > displayPrice) {
    discountPct = Math.round(((ovr.priceOld - displayPrice) / ovr.priceOld) * 100);
  }
  return {
    ...p,
    priceMin: displayPrice,
    imageUrl: img || p.imageUrl,
    displayPrice,
    priceOld: ovr.priceOld,
    discountPct,
    offerLabel: ovr.offerLabel,
  };
}

export function findAnyProduct(slug: string): Product | undefined {
  return baseBySlug(slug);
}