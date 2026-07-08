import { products } from "./mock-data";

const KEY = "techradar.affiliate.v1";
const IMG_KEY = "techradar.productImages.v1";

function readMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function writeMap(map: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(map));
}

function readImgMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(IMG_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function writeImgMap(map: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(IMG_KEY, JSON.stringify(map));
}

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