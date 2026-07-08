import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp, Zap, Clock } from "lucide-react";
import heroImage from "@/assets/hero-oled.jpg";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeader } from "@/components/site/section-header";
import { ProductTile } from "@/components/site/product-tile";
import { ScoreBadge, BadgeChip } from "@/components/site/score-badge";
import {
  articles,
  categories,
  comparisons,
  formatBRL,
  products,
  rankings,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = products[0];
  const trending = products.slice(1, 5);
  const deals = products.slice(0, 4);
  const bestValue = products.find((p) => p.badge === "custo-beneficio")!;
  const topRanking = rankings[1];
  const topComparison = comparisons[0];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container-page py-10 md:py-14 space-y-20">
        {/* HERO */}
        <section className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative overflow-hidden rounded-sm border border-hairline">
            <img
              src={heroImage}
              alt={featured.name}
              width={1600}
              height={1000}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <BadgeChip variant="accent">Editor's Choice</BadgeChip>
              <BadgeChip>Review / TVs</BadgeChip>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="eyebrow">Análise em destaque</span>
              <span className="size-1 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">há 2h</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-balance">
              A masterclass em OLED: <span className="text-accent">Sony A95L</span> redefine o que é brilho.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {featured.summary}
            </p>
            <div className="flex items-end gap-4 pt-2">
              <div className="flex items-baseline gap-1">
                <ScoreBadge score={featured.score} size="xl" />
                <span className="font-mono text-xs text-muted-foreground pb-3">/10</span>
              </div>
              <Link
                to="/produto/$slug"
                params={{ slug: featured.slug }}
                className="ml-auto inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 font-display font-bold uppercase text-sm tracking-tight hover:bg-accent transition-colors"
              >
                Ler review completo <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section>
          <SectionHeader
            eyebrow="Explore"
            title="Categorias em destaque"
            subtitle="Dados precisos, medições reais, zero hype. Todo produto passa pelo laboratório TechRadar."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="card-lab rounded-sm p-4 group"
              >
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-2">
                  {c.count} reviews
                </div>
                <div className="font-display font-bold text-sm leading-tight group-hover:text-accent transition-colors">
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BENTO PRINCIPAL */}
        <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 auto-rows-[minmax(0,auto)]">
          {/* Ranking */}
          <div className="md:col-span-2 lg:col-span-6 card-lab p-6 md:p-8 rounded-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-4 text-accent" />
              <span className="eyebrow">Ranking / Semanal</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-6 leading-tight">
              {topRanking.title}
            </h3>
            <ol className="space-y-3">
              {topRanking.productSlugs.map((slug, i) => {
                const p = products.find((x) => x.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link
                      to="/produto/$slug"
                      params={{ slug }}
                      className="flex items-center gap-4 py-3 border-b border-hairline last:border-b-0 group"
                    >
                      <span className={`font-mono text-sm tabular-nums ${i === 0 ? "text-accent" : "text-muted-foreground"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{p.brand} · {formatBRL(p.priceAvg)}</div>
                      </div>
                      <span className="bg-white/5 border border-hairline px-2 py-1 font-mono text-xs tabular-nums text-accent">
                        {p.score.toFixed(1)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
            <Link to="/rankings" className="mt-6 inline-flex items-center gap-1 text-sm text-accent hover:underline">
              Ver todos os rankings <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Custo-benefício */}
          <Link
            to="/produto/$slug"
            params={{ slug: bestValue.slug }}
            className="md:col-span-2 lg:col-span-3 bg-accent text-background p-6 rounded-sm flex flex-col justify-between group min-h-52 hover:brightness-105 transition-all"
          >
            <div className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-70">Best Value</div>
            <div>
              <h3 className="font-display font-extrabold text-2xl leading-tight mb-2">
                {bestValue.name}: performance flagship por menos.
              </h3>
              <p className="text-background/70 text-sm">{bestValue.summary.split(".")[0]}.</p>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-extrabold text-3xl">{formatBRL(bestValue.priceAvg)}</span>
              <span className="font-mono text-xs opacity-70">Nota {bestValue.score}</span>
            </div>
          </Link>

          {/* Comparativo */}
          <Link
            to="/comparativo/$slug"
            params={{ slug: topComparison.slug }}
            className="md:col-span-2 lg:col-span-3 card-lab rounded-sm p-6 flex flex-col justify-between min-h-52 group"
          >
            <div className="eyebrow">Comparativo Direto</div>
            <div>
              <div className="font-display font-extrabold text-2xl italic text-accent leading-none mb-3">VS.</div>
              <h3 className="font-display font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                {topComparison.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-accent">
              Ver duelo completo <ArrowRight className="size-4" />
            </div>
          </Link>
        </section>

        {/* TRENDING */}
        <section>
          <SectionHeader
            eyebrow="Sinal em alta"
            title="Produtos em alta"
            subtitle="Os produtos mais consultados e testados nas últimas 72 horas."
            action={
              <Link to="/rankings" className="text-sm text-accent hover:underline inline-flex items-center gap-1">
                Ver rankings <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((p) => (
              <ProductTile key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* PROMOÇÕES */}
        <section>
          <SectionHeader
            eyebrow="Radar de preços"
            title="Promoções do dia"
            subtitle="Alertas de menor preço em 90 dias. Verificamos historicamente antes de recomendar."
            action={
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                <Clock className="size-3.5" />
                Atualizado agora
              </div>
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((p) => (
              <Link
                key={p.slug}
                to="/produto/$slug"
                params={{ slug: p.slug }}
                className="card-lab p-4 rounded-sm group"
              >
                <div
                  className="aspect-square mb-4 rounded-sm relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]}30)`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center text-foreground/25 font-display font-extrabold text-2xl">
                    {p.brand}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-accent mb-1 uppercase tracking-widest">Mercado Livre</div>
                <h4 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-accent transition-colors">{p.name}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-lg">{formatBRL(p.priceMin)}</span>
                  <span className="text-xs text-muted-foreground line-through">{formatBRL(p.priceMax)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ARTIGOS */}
        <section>
          <SectionHeader eyebrow="Editorial" title="Guias e artigos recentes" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((a) => (
              <article key={a.slug} className="group cursor-pointer">
                <div className="aspect-[4/3] mb-4 bg-surface border border-hairline rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-highlight/10" />
                  <div className="absolute inset-0 grid place-items-center text-4xl font-display font-extrabold text-foreground/10">
                    {a.category}
                  </div>
                </div>
                <div className="eyebrow mb-2">{a.category} · {a.readingMinutes} min</div>
                <h3 className="font-display font-bold text-lg leading-snug group-hover:text-accent transition-colors">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-3">
                  Por {a.author}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-accent text-background rounded-sm py-10 px-6 md:py-14 md:px-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-15 pointer-events-none">
            <Zap className="size-full" />
          </div>
          <div className="flex-1 space-y-2 relative">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">Receba o TechRadar.</h2>
            <p className="text-background/80 font-medium">O resumo técnico essencial enviado todas as sextas — reviews, alertas de preço e vazamentos.</p>
          </div>
          <form className="w-full md:w-96 flex relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              className="flex-1 bg-background text-foreground px-4 py-3 rounded-l-sm border-0 outline-none focus:ring-2 ring-background/30"
            />
            <button
              type="submit"
              className="bg-background/15 hover:bg-background/25 text-background font-display font-extrabold px-6 uppercase text-sm border-l border-background/20 transition-colors rounded-r-sm"
            >
              Assinar
            </button>
          </form>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
