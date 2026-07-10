import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCatalogSnapshot, type CatalogSnapshot, type OverrideRow } from "@/lib/catalog.functions";
import { products as baseProducts, type Product, formatBRL } from "@/lib/mock-data";

type Ctx = CatalogSnapshot & {
  allProducts: Product[];
  getProduct: (slug: string) => Product | undefined;
  getOverride: (slug: string) => OverrideRow | undefined;
  getImage: (slug: string) => string;
  getAffiliateUrl: (slug: string) => string;
  displayFor: (p: Product) => DisplayInfo;
  refresh: () => Promise<void>;
};

export type DisplayInfo = {
  imageUrl: string;
  priceMin: number;
  priceOld?: number;
  discountPct?: number;
  offerLabel?: string;
  affiliateUrl: string;
  hasAffiliateLink: boolean;
};

const EMPTY: CatalogSnapshot = { overrides: {}, userProducts: [] };
const CatalogContext = createContext<Ctx | null>(null);

export function CatalogProvider({
  initial,
  children,
}: {
  initial?: CatalogSnapshot;
  children: ReactNode;
}) {
  const [snap, setSnap] = useState<CatalogSnapshot>(initial ?? EMPTY);

  async function refresh() {
    try {
      const s = await getCatalogSnapshot();
      setSnap(s);
    } catch (e) {
      console.error("[catalog] refresh failed", e);
    }
  }

  useEffect(() => {
    if (!initial) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allProducts: Product[] = [...baseProducts, ...snap.userProducts];

  function getProduct(slug: string) {
    return allProducts.find((p) => p.slug === slug);
  }
  function getOverride(slug: string) {
    return snap.overrides[slug];
  }
  function getImage(slug: string) {
    const ovr = snap.overrides[slug];
    if (ovr?.image_url) return ovr.image_url;
    return getProduct(slug)?.imageUrl || "";
  }
  function getAffiliateUrl(slug: string) {
    const ovr = snap.overrides[slug];
    if (ovr?.affiliate_url) return ovr.affiliate_url;
    return getProduct(slug)?.affiliateUrl || "";
  }
  function displayFor(p: Product): DisplayInfo {
    const ovr = snap.overrides[p.slug];
    const priceMin =
      typeof ovr?.price_min === "number" && ovr.price_min > 0 ? ovr.price_min : p.priceMin;
    const priceOld =
      typeof ovr?.price_old === "number" && ovr.price_old > priceMin ? ovr.price_old : undefined;
    let discountPct = ovr?.discount_pct ?? undefined;
    if (!discountPct && priceOld) {
      discountPct = Math.round(((priceOld - priceMin) / priceOld) * 100);
    }
    const affiliateUrl = ovr?.affiliate_url || p.affiliateUrl || "";
    const hasAffiliateLink = Boolean(affiliateUrl && affiliateUrl !== "#");
    return {
      imageUrl: ovr?.image_url || p.imageUrl || "",
      priceMin,
      priceOld,
      discountPct: discountPct ?? undefined,
      offerLabel: ovr?.offer_label || undefined,
      affiliateUrl,
      hasAffiliateLink,
    };
  }

  const value: Ctx = {
    ...snap,
    allProducts,
    getProduct,
    getOverride,
    getImage,
    getAffiliateUrl,
    displayFor,
    refresh,
  };
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Ctx {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    // Fallback in case a component renders outside provider (shouldn't happen)
    return {
      overrides: {},
      userProducts: [],
      allProducts: baseProducts,
      getProduct: (slug) => baseProducts.find((p) => p.slug === slug),
      getOverride: () => undefined,
      getImage: (slug) => baseProducts.find((p) => p.slug === slug)?.imageUrl || "",
      getAffiliateUrl: (slug) => baseProducts.find((p) => p.slug === slug)?.affiliateUrl || "",
      displayFor: (p) => ({
        imageUrl: p.imageUrl || "",
        priceMin: p.priceMin,
        priceOld: undefined,
        discountPct: undefined,
        offerLabel: undefined,
        affiliateUrl: p.affiliateUrl || "",
        hasAffiliateLink: Boolean(p.affiliateUrl && p.affiliateUrl !== "#"),
      }),
      refresh: async () => {},
    };
  }
  return ctx;
}

export { formatBRL };
