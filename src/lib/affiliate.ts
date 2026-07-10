// Legacy shim — real data now lives in the database via server functions.
// Left here so any stale import doesn't break the build.
export type ProductOverrides = {
  priceMin?: number;
  priceOld?: number;
  discountPct?: number;
  offerLabel?: string;
};

export function getAllAffiliateOverrides(): Record<string, string> {
  return {};
}

export function getAllProductImageOverrides(): Record<string, string> {
  return {};
}

export function getAllProductOverrides(): Record<string, ProductOverrides> {
  return {};
}
