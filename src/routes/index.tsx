import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Star,
  BadgeCheck,
  Timer,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SectionHeader } from "@/components/site/section-header";
import {
  categories,
  formatBRL,
  guides,
  products,
  findProduct,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featuredGuide = guides[0];
  const featuredProduct = findProduct(featuredGuide.productSlugs[0])!;
  const otherGuides = guides.slice(1);

  // Abas por categoria (só as que têm guias)
  const guideCategories = useMemo(() => {
    const set = new Set(guides.map((g) => g.categorySlug));
    return categories.filter((c) => set.has(c.slug));
  }, []);
  const [activeCat, setActiveCat] = useState<string>("todos");
  const visibleGuides =
    activeCat === "todos" ? guides : guides.filter((g) => g.categorySlug === activeCat);

  const topPicks = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="border-b border-hairline bg-surface">
          <div className="container-page py-14 md:py-20 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                <ShieldCheck className="size-3.5" /> Análises independentes · atualizadas em 2026
              </div>
              <h1 className="trust-serif text-4xl md:text-6xl leading-[1.05] text-balance">
                Escolha o eletrônico certo <span className="text-accent">antes</span> de comprar.
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl text-pretty">
                Guias objetivos, comparativos honestos e nota final clara. Respondemos exatamente às perguntas que
                você faria no Google — e te levamos direto à melhor oferta no Mercado Livre.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/guia/$slug"
                  params={{ slug: featuredGuide.slug }}
                  className="btn-affiliate"
                >
                  Ver o guia da vez <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/rankings"
                  className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-foreground border border-hairline rounded-lg hover:border-accent hover:text-accent transition-colors"
                >
                  Rankings 2026
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><BadgeCheck className="size-4 text-accent" /> +300 produtos avaliados</span>
                <span className="inline-flex items-center gap-2"><Star className="size-4 text-highlight" /> Nota real por critério</span>
                <span className="inline-flex items-center gap-2"><Timer className="size-4 text-accent" /> Atualizado semanalmente</span>
              </div>
            </div>

            {/* Guia em destaque card */}
            <div className="lg:col-span-5">
              <Link
                to="/guia/$slug"
                params={{ slug: featuredGuide.slug }}
                className="card-lab rounded-2xl p-6 md:p-8 block group"
              >
                <div className="eyebrow mb-3">Guia da semana · {featuredGuide.categoryName}</div>
                <h2 className="trust-serif text-2xl md:text-3xl leading-tight mb-4 group-hover:text-accent transition-colors">
                  {featuredGuide.question}
                </h2>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {featuredGuide.intro}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-hairline">
                  <div>
                    <div className="text-xs text-muted-foreground">Top pick</div>
                    <div className="font-semibold text-sm">{featuredProduct.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">a partir de</div>
                    <div className="font-display font-extrabold text-xl text-foreground">
                      {formatBRL(featuredProduct.priceMin)}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* PERGUNTAS + ABAS */}
        <section className="container-page py-14 md:py-20">
          <SectionHeader
            eyebrow="As dúvidas mais buscadas"
            title="Perguntas que resolvemos por você"
            subtitle="Cada guia responde exatamente uma dúvida real — direto ao ponto, com produto recomendado e link para comprar."
          />

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <TabButton active={activeCat === "todos"} onClick={() => setActiveCat("todos")}>
              Todos
            </TabButton>
            {guideCategories.map((c) => (
              <TabButton key={c.slug} active={activeCat === c.slug} onClick={() => setActiveCat(c.slug)}>
                {c.name}
              </TabButton>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleGuides.map((g) => {
              const p = findProduct(g.productSlugs[0]);
              return (
                <Link
                  key={g.slug}
                  to="/guia/$slug"
                  params={{ slug: g.slug }}
                  className="card-lab rounded-xl p-6 flex flex-col gap-4 group"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-accent font-semibold">{g.categoryName}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">
                      {new Date(g.updatedAt).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug text-foreground group-hover:text-accent transition-colors">
                    {g.question}
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-2 flex-1">{g.intro}</p>
                  {p && (
                    <div className="flex items-center justify-between pt-3 border-t border-hairline">
                      <div className="text-xs">
                        <div className="text-muted-foreground">Top pick</div>
                        <div className="font-semibold text-foreground">{p.brand}</div>
                      </div>
                      <div className="text-xs text-right">
                        <div className="text-muted-foreground">a partir de</div>
                        <div className="font-display font-extrabold text-base text-foreground">{formatBRL(p.priceMin)}</div>
                      </div>
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-accent font-semibold">
                    Ler análise <ArrowRight className="size-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* PRODUTOS EM DESTAQUE (com CTA Mercado Livre) */}
        <section className="bg-surface border-y border-hairline">
          <div className="container-page py-14 md:py-20">
            <SectionHeader
              eyebrow="Recomendados"
              title="Os mais vendidos que valem a pena"
              subtitle="Selecionamos entre os mais buscados no Mercado Livre apenas os que passaram no nosso teste."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topPicks.map((p) => (
                <article key={p.slug} className="card-lab rounded-xl p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-accent uppercase tracking-wide">{p.categoryName}</div>
                    <div className="inline-flex items-center gap-1 bg-highlight/15 text-foreground px-2 py-0.5 rounded-full text-xs font-bold">
                      <Star className="size-3 fill-highlight text-highlight" /> {p.score.toFixed(1)}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug">
                    <Link to="/produto/$slug" params={{ slug: p.slug }} className="hover:text-accent transition-colors">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-3 flex-1">{p.summary}</p>
                  <div className="pt-3 border-t border-hairline space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground">a partir de</div>
                      <div className="font-display font-extrabold text-2xl text-foreground">
                        {formatBRL(p.priceMin)}
                      </div>
                    </div>
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="btn-affiliate w-full text-sm"
                    >
                      Ver no Mercado Livre <ExternalLink className="size-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="container-page py-14 md:py-20">
          <SectionHeader eyebrow="Navegue" title="Todas as categorias" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="card-lab rounded-lg p-4 group"
              >
                <div className="text-[11px] text-muted-foreground mb-1">{c.count} reviews</div>
                <div className="font-display font-semibold text-sm leading-tight group-hover:text-accent transition-colors">
                  {c.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CONFIANÇA / METODOLOGIA */}
        <section className="bg-accent text-white">
          <div className="container-page py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">Como recomendamos</div>
              <h2 className="trust-serif text-3xl md:text-4xl leading-tight mb-4">
                Você compra melhor quando confia em quem indica.
              </h2>
              <p className="text-white/85 leading-relaxed">
                Não aceitamos produtos gratuitos das marcas. Cada guia é reconstruído periodicamente com base em preço
                atual, atualizações de firmware e feedback de leitores. Ganhamos comissão do Mercado Livre por indicações
                — nunca do fabricante.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TrustStat n="4.9/5" label="Avaliação média dos leitores" />
              <TrustStat n="+300" label="Produtos avaliados" />
              <TrustStat n="7 anos" label="No mercado editorial" />
              <TrustStat n="0" label="Publicidade paga por marcas" />
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="container-page py-14 md:py-20">
          <div className="card-lab rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-2">
              <h2 className="trust-serif text-2xl md:text-3xl">Alertas de preço, direto no seu e-mail.</h2>
              <p className="text-foreground/70">
                Toda sexta enviamos um resumo curto: quedas de preço no Mercado Livre, novos guias e o que evitar comprar.
              </p>
            </div>
            <form className="w-full md:w-96 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                aria-label="Seu e-mail"
                className="flex-1 bg-white text-foreground px-4 py-3 rounded-lg border border-hairline outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button type="submit" className="btn-affiliate whitespace-nowrap">Assinar</button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "px-4 py-2 rounded-full text-sm font-semibold border transition-colors " +
        (active
          ? "bg-accent text-white border-accent"
          : "bg-white text-foreground/70 border-hairline hover:border-accent/60 hover:text-accent")
      }
    >
      {children}
    </button>
  );
}

function TrustStat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg p-5">
      <div className="trust-serif text-3xl md:text-4xl text-white mb-1">{n}</div>
      <div className="text-xs text-white/80 leading-snug">{label}</div>
    </div>
  );
}

