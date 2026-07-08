import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ExternalLink, ShieldCheck, Check } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ScoreBadge } from "@/components/site/score-badge";
import {
  findGuide,
  findProduct,
  formatBRL,
  guides,
  type Guide,
  type Product,
} from "@/lib/mock-data";

export const Route = createFileRoute("/guia/$slug")({
  loader: ({ params }) => {
    const guide = findGuide(params.slug);
    if (!guide) throw notFound();
    const items = guide.productSlugs
      .map((s) => findProduct(s))
      .filter((p): p is Product => Boolean(p));
    const related = guides.filter((g) => g.slug !== guide.slug && g.categorySlug === guide.categorySlug).slice(0, 4);
    return { guide, items, related };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Guia não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const { guide } = loaderData;
    const title = `${guide.question} | TechRadar Brasil`;
    const description = guide.intro.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: guide.question },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/guia/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/guia/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: GuidePage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-display font-extrabold text-3xl mb-2">Guia não encontrado</h1>
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

function GuidePage() {
  const { guide, items, related } = Route.useLoaderData() as {
    guide: Guide;
    items: Product[];
    related: Guide[];
  };
  const updated = new Date(guide.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap mb-8">
          <Link to="/" className="hover:text-accent">Início</Link>
          <ArrowRight className="size-3" />
          <Link to="/categoria/$slug" params={{ slug: guide.categorySlug }} className="hover:text-accent">
            {guide.categoryName}
          </Link>
          <ArrowRight className="size-3" />
          <span className="text-foreground truncate">Guia</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-10">
            <header className="space-y-4">
              <div className="eyebrow">Guia · {guide.categoryName}</div>
              <h1 className="trust-serif text-4xl md:text-5xl leading-[1.1] text-balance">
                {guide.h1}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-accent" />
                  Análise independente
                </span>
                <span>·</span>
                <span>Atualizado em {updated}</span>
              </div>
              <p className="text-lg leading-relaxed text-foreground/80 text-pretty pt-2">{guide.intro}</p>
            </header>

            {/* Resumo rápido */}
            <div className="rounded-lg border border-hairline bg-surface p-6">
              <div className="eyebrow mb-2">A resposta rápida</div>
              <p className="text-foreground leading-relaxed">{guide.verdict}</p>
            </div>

            {/* Produtos recomendados */}
            <section className="space-y-6">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl">Nossas recomendações</h2>
              <ol className="space-y-5">
                {items.map((p, i) => (
                  <li key={p.slug} className="card-lab rounded-lg p-5 md:p-6">
                    <div className="grid md:grid-cols-[auto_1fr_auto] gap-5 items-start">
                      <div className="flex md:flex-col items-center md:items-start gap-3 md:min-w-24">
                        <div className="font-display font-extrabold text-3xl text-accent tabular-nums leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <ScoreBadge score={p.score} size="md" />
                          <span className="text-[10px] font-semibold text-muted-foreground">/10</span>
                        </div>
                      </div>
                      <div className="min-w-0 space-y-3">
                        <div className="eyebrow !text-muted-foreground !font-semibold">
                          {p.brand} · {p.categoryName}
                        </div>
                        <h3 className="font-display font-bold text-xl leading-snug">
                          <Link to="/produto/$slug" params={{ slug: p.slug }} className="hover:text-accent transition-colors">
                            {p.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">{p.summary}</p>
                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                          {p.pros.slice(0, 3).map((pr) => (
                            <li key={pr} className="flex items-start gap-2 text-sm text-foreground/80">
                              <Check className="size-4 text-accent shrink-0 mt-0.5" />
                              <span>{pr}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:w-56 space-y-3 md:text-right">
                        <div>
                          <div className="text-xs text-muted-foreground">a partir de</div>
                          <div className="font-display font-extrabold text-2xl text-foreground">
                            {formatBRL(p.priceMin)}
                          </div>
                          <div className="text-xs text-muted-foreground">no Mercado Livre</div>
                        </div>
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener noreferrer"
                          className="btn-affiliate w-full text-sm"
                        >
                          Ver oferta <ExternalLink className="size-4" />
                        </a>
                        <Link
                          to="/produto/$slug"
                          params={{ slug: p.slug }}
                          className="block text-xs text-accent hover:underline"
                        >
                          Ler review completo →
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl">Perguntas frequentes</h2>
              <div className="space-y-2">
                {guide.faq.map((f) => (
                  <details key={f.q} className="card-lab rounded-lg p-5 group">
                    <summary className="font-display font-semibold cursor-pointer flex justify-between items-center gap-4 list-none">
                      <span>{f.q}</span>
                      <span className="text-accent font-mono text-lg group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-foreground/80 text-sm mt-3 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <p className="text-xs text-muted-foreground border-t border-hairline pt-4">
              Este guia contém links de afiliado. Se você comprar através deles, o TechRadar Brasil pode receber
              uma comissão — sem qualquer custo adicional para você. Isso não influencia nossas recomendações.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="card-lab rounded-lg p-5 sticky top-20">
              <div className="eyebrow mb-3">Escolha do editor</div>
              {items[0] && (
                <>
                  <div className="font-display font-bold text-lg leading-snug mb-1">{items[0].name}</div>
                  <div className="text-sm text-muted-foreground mb-4">{items[0].brand} · Nota {items[0].score}/10</div>
                  <a
                    href={items[0].affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="btn-affiliate w-full text-sm"
                  >
                    Ver no Mercado Livre <ExternalLink className="size-4" />
                  </a>
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    a partir de {formatBRL(items[0].priceMin)}
                  </div>
                </>
              )}
            </div>

            {related.length > 0 && (
              <div className="space-y-3">
                <div className="eyebrow">Outras perguntas em {guide.categoryName}</div>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/guia/$slug"
                        params={{ slug: r.slug }}
                        className="block card-lab rounded-lg p-4 hover:border-accent/50"
                      >
                        <div className="font-semibold text-sm leading-snug">{r.question}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}