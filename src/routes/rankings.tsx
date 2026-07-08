import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ScoreBadge } from "@/components/site/score-badge";
import { products, rankings, formatBRL, comparisons } from "@/lib/mock-data";

export const Route = createFileRoute("/rankings")({
  head: () => {
    const title = "Rankings de eletrônicos — Melhores TVs, celulares e mais | TechRadar Brasil";
    const description = "Rankings atualizados dos melhores eletrônicos por categoria e faixa de preço, com base em testes laboratoriais.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/rankings" },
      ],
      links: [{ rel: "canonical", href: "/rankings" }],
    };
  },
  component: RankingsPage,
});

function RankingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-12 space-y-14">
        <header className="max-w-3xl space-y-4">
          <div className="eyebrow">Rankings TechRadar</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-balance">
            Os melhores eletrônicos, testados e ranqueados.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Cada ranking é reordenado sempre que uma nova review sai do laboratório. Sem hype, sem parceria paga — apenas dados.
          </p>
        </header>

        <div className="space-y-16">
          {rankings.map((r) => (
            <section key={r.slug} className="space-y-6">
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div className="min-w-0">
                  <div className="eyebrow mb-2">Ranking</div>
                  <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-balance">{r.title}</h2>
                  <p className="text-muted-foreground text-sm mt-2 max-w-2xl">{r.intro}</p>
                </div>
              </div>
              <ol className="space-y-2">
                {r.productSlugs.map((slug, i) => {
                  const p = products.find((x) => x.slug === slug)!;
                  return (
                    <li key={slug}>
                      <Link
                        to="/produto/$slug"
                        params={{ slug }}
                        className="card-lab rounded-sm p-4 md:p-5 flex items-center gap-4 md:gap-6 group"
                      >
                        <span className={`font-display font-extrabold text-3xl md:text-4xl tabular-nums ${i === 0 ? "text-accent" : "text-muted-foreground/40"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div
                          className="hidden md:block size-16 shrink-0 rounded-sm relative overflow-hidden"
                          style={{ backgroundImage: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]}30)` }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="eyebrow mb-1">{p.categoryName} · {p.brand}</div>
                          <h3 className="font-display font-bold text-base md:text-lg truncate group-hover:text-accent transition-colors">{p.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{p.summary}</p>
                        </div>
                        <div className="text-right space-y-1 shrink-0">
                          <ScoreBadge score={p.score} size="md" />
                          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{formatBRL(p.priceAvg)}</div>
                        </div>
                        <ArrowRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors hidden md:block" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        <section className="pt-8 border-t border-hairline">
          <div className="eyebrow mb-2">Comparativos populares</div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-6">Duelo direto</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                to="/comparativo/$slug"
                params={{ slug: c.slug }}
                className="card-lab rounded-sm p-6 group"
              >
                <div className="font-display font-extrabold italic text-accent text-xl mb-3">VS.</div>
                <h3 className="font-display font-bold text-lg leading-tight group-hover:text-accent transition-colors">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.intro}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}