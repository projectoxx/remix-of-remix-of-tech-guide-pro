import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { BadgeChip } from "./score-badge";
import { Star } from "lucide-react";
import { getProductImageUrl, getProductOverrides } from "@/lib/affiliate";
import { useEffect, useState } from "react";

const badgeMap: Record<NonNullable<Product["badge"]>, { label: string; variant: "accent" | "highlight" | "premium" }> = {
  premium: { label: "Premium", variant: "premium" },
  "custo-beneficio": { label: "Custo-benefício", variant: "highlight" },
  "editors-choice": { label: "Escolha do editor", variant: "accent" },
  "menor-preco": { label: "Menor preço 6 meses", variant: "highlight" },
};

export function ProductTile({ product }: { product: Product }) {
  const badge = product.badge ? badgeMap[product.badge] : undefined;
  const [img, setImg] = useState<string>(product.imageUrl || "");
  const [ovr, setOvr] = useState<ReturnType<typeof getProductOverrides>>({});
  useEffect(() => {
    setImg(getProductImageUrl(product.slug));
    setOvr(getProductOverrides(product.slug));
  }, [product.slug]);
  const displayPrice = typeof ovr.priceMin === "number" && ovr.priceMin > 0 ? ovr.priceMin : product.priceMin;
  const priceOld = ovr.priceOld && ovr.priceOld > displayPrice ? ovr.priceOld : undefined;
  const discountPct =
    ovr.discountPct ??
    (priceOld ? Math.round(((priceOld - displayPrice) / priceOld) * 100) : undefined);
  const offerLabel = ovr.offerLabel;
  const isPortrait = product.categorySlug === "celulares" || product.categorySlug === "smartwatch";
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="card-lab group flex flex-col overflow-hidden rounded-xl"
    >
      <div
        className={
          "relative overflow-hidden " +
          (isPortrait ? "aspect-[4/3] bg-white p-6" : "aspect-[4/3] bg-surface-2")
        }
      >
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            width={800}
            height={600}
            className={
              "absolute inset-0 h-full w-full " +
              (isPortrait ? "object-contain p-4" : "object-cover")
            }
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-foreground/25 font-display font-extrabold text-4xl px-6 text-center leading-tight">
            {product.brand}
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {badge && <BadgeChip variant={badge.variant}>{badge.label}</BadgeChip>}
          {offerLabel && (
            <span className="inline-flex items-center gap-1 bg-destructive text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full shadow-sm">
              🔥 {offerLabel}
            </span>
          )}
        </div>
        {discountPct && discountPct > 0 && (
          <div className="absolute top-3 right-3 bg-highlight text-foreground font-display font-extrabold text-sm px-2.5 py-1 rounded-full shadow-sm">
            -{discountPct}%
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white shadow-sm border border-hairline px-2.5 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
          <Star className="size-3.5 fill-highlight text-highlight" />
          <span className="tabular-nums">{product.score.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs font-semibold text-accent">{product.categoryName}</span>
        <h3 className="font-display font-bold text-base leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-foreground/70 line-clamp-2">{product.summary}</p>
        <div className="mt-auto pt-3 flex items-baseline gap-2 flex-wrap">
          {priceOld && (
            <span className="text-xs text-muted-foreground line-through">{formatBRL(priceOld)}</span>
          )}
          <span className="font-display font-extrabold text-lg text-foreground">{formatBRL(displayPrice)}</span>
          <span className="text-xs text-muted-foreground">no ML</span>
        </div>
      </div>
    </Link>
  );
}