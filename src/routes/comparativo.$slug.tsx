import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Fragment } from "react";
import { ArrowRight, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ScoreBadge, BadgeChip } from "@/components/site/score-badge";
import { findComparison, findProduct, formatBRL, type Comparison, type Product } from "@/lib/mock-data";

export const Route = createFileRoute("/comparativo/$slug")({
  loader: ({ params }) => {
    const cmp = findComparison(params.slug);
    if (!cmp) throw notFound();
    const a = findProduct(cmp.productSlugs[0])!;
    const b = findProduct(cmp.productSlugs[1])!;
    return { cmp, a, b };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Comparativo não encontrado" }, { name: "robots", content: "noindex" }] };
    const { cmp } = loaderData;
    return {
      meta: [
        { title: `${cmp.title} — TechRadar Brasil` },
        { name: "description", content: cmp.intro },
        { property: "og:title", content: cmp.title },
        { property: "og:description", content: cmp.intro },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/comparativo/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/comparativo/${params.slug}` }],
    };
  },
  component: ComparisonPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-display font-extrabold text-3xl mb-2">Comparativo não encontrado</h1>
        <Link to="/" className="text-accent hover:underline">Voltar</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen grid place-items-center"><button onClick={reset} className="text-accent">Tentar de novo</button></div>
  ),
});

function ComparisonPage() {
  const { cmp, a, b } = Route.useLoaderData() as { cmp: Comparison; a: Product; b: Product };
  const aWins = cmp.winnerBy.filter((w) => w.winnerSlug === a.slug).length;
  const bWins = cmp.winnerBy.filter((w) => w.winnerSlug === b.slug).length;
  const overallWinner = a.score >= b.score ? a : b;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-10 space-y-14">
        <nav className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-accent">Início</Link>
          <ArrowRight className="size-3" />
          <span className="text-foreground">Comparativo</span>
        </nav>

        <header className="max-w-3xl space-y-4">
          <div className="eyebrow">Comparativo direto</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight leading-tight text-balance">
            {cmp.title}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{cmp.intro}</p>
        </header>

        {/* Duel cards */}
        <section className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {[a, b].map((p, i) => (
            <Fragment key={p.slug}>
              {i === 1 && (
                <div className="hidden md:grid place-items-center">
                  <div className="font-display font-extrabold italic text-accent text-6xl leading-none">VS.</div>
                </div>
              )}
              <Link
                to="/produto/$slug"
                params={{ slug: p.slug }}
                className="card-lab p-6 md:p-8 rounded-sm group"
              >
                <div
                  className="aspect-video rounded-sm mb-5 relative overflow-hidden"
                  style={{ backgroundImage: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]}30)` }}
                >
                  <div className="absolute inset-0 grid place-items-center text-foreground/25 font-display font-extrabold text-4xl">
                    {p.brand}
                  </div>
                </div>
                <div className="eyebrow mb-2">{p.categoryName}</div>
                <h2 className="font-display font-extrabold text-xl md:text-2xl mb-3 group-hover:text-accent transition-colors">{p.name}</h2>
                <div className="flex items-end justify-between border-t border-hairline pt-4">
                  <div className="flex items-baseline gap-1">
                    <ScoreBadge score={p.score} size="lg" />
                    <span className="font-mono text-[10px] text-muted-foreground">/10</span>
                  </div>
                  <div className="font-display font-bold text-lg">{formatBRL(p.priceAvg)}</div>
                </div>
              </Link>
            </Fragment>
          ))}
        </section>

        {/* Winner banner */}
        <section className="bg-accent text-background rounded-sm p-6 md:p-8 flex items-center gap-6 flex-wrap">
          <Trophy className="size-10 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">Veredito TechRadar</div>
            <div className="font-display font-extrabold text-2xl md:text-3xl leading-tight">
              {overallWinner.name} vence no geral
            </div>
            <div className="text-sm opacity-80 mt-1">
              {a.name}: <strong>{aWins}</strong> critérios · {b.name}: <strong>{bWins}</strong> critérios
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="overflow-x-auto">
          <table className="w-full text-left border border-hairline">
            <thead className="bg-surface">
              <tr>
                <th className="p-4 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">Critério</th>
                <th className="p-4 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{a.brand}</th>
                <th className="p-4 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">{b.brand}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {cmp.winnerBy.map((row) => (
                <tr key={row.criterion} className="hover:bg-white/[0.02]">
                  <td className="p-4 text-sm font-medium">{row.criterion}</td>
                  <td className="p-4">
                    {row.winnerSlug === a.slug ? <BadgeChip variant="accent">Vence</BadgeChip> : <span className="text-muted-foreground text-sm">—</span>}
                  </td>
                  <td className="p-4">
                    {row.winnerSlug === b.slug ? <BadgeChip variant="accent">Vence</BadgeChip> : <span className="text-muted-foreground text-sm">—</span>}
                  </td>
                </tr>
              ))}
              <tr className="bg-surface/50">
                <td className="p-4 font-display font-bold">Nota final</td>
                <td className="p-4"><ScoreBadge score={a.score} size="md" /></td>
                <td className="p-4"><ScoreBadge score={b.score} size="md" /></td>
              </tr>
              <tr>
                <td className="p-4 font-display font-bold">Preço médio</td>
                <td className="p-4 font-mono text-sm">{formatBRL(a.priceAvg)}</td>
                <td className="p-4 font-mono text-sm">{formatBRL(b.priceAvg)}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}