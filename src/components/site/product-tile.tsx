import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatBRL } from "@/lib/mock-data";
import { ScoreBadge, BadgeChip } from "./score-badge";

const badgeMap: Record<NonNullable<Product["badge"]>, { label: string; variant: "accent" | "highlight" | "premium" }> = {
  premium: { label: "Premium", variant: "premium" },
  "custo-beneficio": { label: "Custo-benefício", variant: "highlight" },
  "editors-choice": { label: "Editor's Choice", variant: "accent" },
  "menor-preco": { label: "Menor preço 6 meses", variant: "highlight" },
};

export function ProductTile({ product }: { product: Product }) {
  const badge = product.badge ? badgeMap[product.badge] : undefined;
  return (
    <Link
      to="/produto/$slug"
      params={{ slug: product.slug }}
      className="card-lab group flex flex-col overflow-hidden rounded-sm"
    >
      <div
        className="aspect-[4/3] relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(120% 90% at 20% 10%, ${product.gradient[1]}55, transparent 60%), linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]}22)`,
        }}
      >
        <div className="absolute inset-0 grid place-items-center text-foreground/25 font-display font-extrabold text-4xl px-6 text-center leading-tight">
          {product.brand}
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          {badge && <BadgeChip variant={badge.variant}>{badge.label}</BadgeChip>}
        </div>
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm border border-hairline px-3 py-1.5 rounded-sm flex items-baseline gap-1">
          <ScoreBadge score={product.score} size="md" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">/10</span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="eyebrow">{product.categoryName}</span>
        <h3 className="font-display font-bold text-base leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.summary}</p>
        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="font-display font-extrabold text-lg text-foreground">{formatBRL(product.priceAvg)}</span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase">preço médio</span>
        </div>
      </div>
    </Link>
  );
}