import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { BadgeChip } from "./score-badge";
import { Star } from "lucide-react";
import { getProductImageUrl } from "@/lib/affiliate";
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
  useEffect(() => {
    setImg(getProductImageUrl(product.slug));
  }, [product.slug]);
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="card-lab group flex flex-col overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-2">
        {img ? (
          <img
            src={img}
            alt={product.name}
            loading="lazy"
            width={800}
            height={600}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-foreground/25 font-display font-extrabold text-4xl px-6 text-center leading-tight">
            {product.brand}
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {badge && <BadgeChip variant={badge.variant}>{badge.label}</BadgeChip>}
        </div>
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
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="font-display font-extrabold text-lg text-foreground">{formatBRL(product.priceMin)}</span>
          <span className="text-xs text-muted-foreground">no ML</span>
        </div>
      </div>
    </Link>
  );
}