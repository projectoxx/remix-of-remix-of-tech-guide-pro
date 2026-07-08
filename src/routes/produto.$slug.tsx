import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ScoreBadge, BadgeChip } from "@/components/site/score-badge";
import { ScoreBreakdownGrid } from "@/components/site/score-breakdown";
import { ProductTile } from "@/components/site/product-tile";
import { findProduct, formatBRL, products, type Product } from "@/lib/mock-data";
import { getAffiliateUrl } from "@/lib/affiliate";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    const related = products.filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug).slice(0, 4);
    return { product, related };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produto não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Review completo, nota ${product.score}/10 | TechRadar`;
    const description = product.summary;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produto/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produto/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            brand: { "@type": "Brand", name: product.brand },
            description: product.summary,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "BRL",
              lowPrice: product.priceMin,
              highPrice: product.priceMax,
              availability: "https://schema.org/InStock",
            },
            review: {
              "@type": "Review",
              reviewRating: { "@type": "Rating", ratingValue: product.score, bestRating: 10 },
              author: { "@type": "Organization", name: "TechRadar Brasil" },
              reviewBody: product.verdict,
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-display font-extrabold text-3xl mb-2">Produto não encontrado</h1>
        <Link to="/" className="text-accent hover:underline">Voltar ao início</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center">
      <button onClick={reset} className="text-accent">Tentar de novo</button>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-10 space-y-16">
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-accent">Início</Link>
          <ArrowRight className="size-3" />
          <Link to="/categoria/$slug" params={{ slug: product.categorySlug }} className="hover:text-accent">
            {product.categoryName}
          </Link>
          <ArrowRight className="size-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        {/* Hero */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-7 aspect-[4/3] rounded-sm border border-hairline overflow-hidden relative"
            style={{ backgroundImage: `radial-gradient(120% 90% at 30% 20%, ${product.gradient[1]}44, transparent 60%), linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]}22)` }}
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-foreground/20 font-display font-extrabold text-6xl md:text-7xl text-center px-8 leading-none">
                {product.brand}
              </div>
            )}
            {product.badge && (
              <div className="absolute top-4 left-4">
                <BadgeChip variant="accent">
                  {product.badge === "editors-choice" ? "Editor's Choice"
                    : product.badge === "custo-beneficio" ? "Custo-benefício"
                    : product.badge === "premium" ? "Premium"
                    : "Menor preço 6 meses"}
                </BadgeChip>
              </div>
            )}
          </div>
          <div className="lg:col-span-5 space-y-5">
            <div className="eyebrow">{product.categoryName} · {product.brand}</div>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl leading-tight tracking-tight text-balance">
              {product.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-pretty">{product.summary}</p>

            <div className="flex items-end gap-4 pt-2 pb-4 border-b border-hairline">
              <div className="flex items-baseline gap-1">
                <ScoreBadge score={product.score} size="xl" />
                <span className="font-mono text-xs text-muted-foreground pb-3">/10</span>
              </div>
              <div className="pb-2 space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Nota final</div>
                <div className="text-sm text-accent">Análise laboratorial</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display font-extrabold text-3xl">{formatBRL(product.priceAvg)}</span>
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">preço médio</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Variação: {formatBRL(product.priceMin)} – {formatBRL(product.priceMax)}
              </div>
            </div>

            <a
              href={getAffiliateUrl(product.slug)}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="btn-affiliate w-full text-base"
            >
              Ver oferta no Mercado Livre <ExternalLink className="size-4" />
            </a>
            <p className="text-[11px] text-muted-foreground text-center">
              Link de afiliado · sem custo adicional para você
            </p>
          </div>
        </section>

        {/* Score breakdown + Specs */}
        <section className="grid lg:grid-cols-2 gap-8">
          <div className="card-lab p-6 md:p-8 rounded-sm">
            <h2 className="font-display font-extrabold text-xl mb-6">Notas por critério</h2>
            <ScoreBreakdownGrid breakdown={product.scoreBreakdown} />
          </div>
          <div className="card-lab p-6 md:p-8 rounded-sm">
            <h2 className="font-display font-extrabold text-xl mb-6">Especificações técnicas</h2>
            <dl className="divide-y divide-hairline">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm font-medium text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Prós e contras */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="card-lab p-6 md:p-8 rounded-sm">
            <div className="eyebrow mb-4 text-accent">Prós</div>
            <ul className="space-y-3">
              {product.pros.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="size-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-lab p-6 md:p-8 rounded-sm">
            <div className="eyebrow mb-4 text-destructive">Contras</div>
            <ul className="space-y-3">
              {product.cons.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <X className="size-5 text-destructive shrink-0 mt-0.5" />
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Veredito */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="eyebrow">Veredito</div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-balance">
              Vale a pena?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{product.verdict}</p>
          </div>
          <div className="space-y-4">
            <div className="card-lab p-5 rounded-sm">
              <div className="eyebrow text-accent mb-3">Indicado para</div>
              <ul className="space-y-2 text-sm">
                {product.goodFor.map((g) => <li key={g}>· {g}</li>)}
              </ul>
            </div>
            <div className="card-lab p-5 rounded-sm">
              <div className="eyebrow text-destructive mb-3">Não indicado para</div>
              <ul className="space-y-2 text-sm">
                {product.notFor.map((g) => <li key={g}>· {g}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="eyebrow mb-2">Perguntas frequentes</div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-8">FAQ</h2>
          <div className="space-y-3">
            {product.faq.map((f) => (
              <details key={f.q} className="card-lab p-5 rounded-sm group">
                <summary className="font-display font-bold cursor-pointer flex justify-between items-center gap-4">
                  <span>{f.q}</span>
                  <span className="text-accent font-mono text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="eyebrow mb-2">Alternativas</div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-8">Você pode gostar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => <ProductTile key={p.slug} product={p} />)}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}