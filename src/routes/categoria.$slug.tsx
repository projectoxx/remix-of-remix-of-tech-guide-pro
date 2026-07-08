import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ProductTile } from "@/components/site/product-tile";
import { SectionHeader } from "@/components/site/section-header";
import { findCategory, productsByCategory, type Category, type Product } from "@/lib/mock-data";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const category = findCategory(params.slug);
    if (!category) throw notFound();
    return { category, items: productsByCategory(params.slug) };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Categoria não encontrada — TechRadar Brasil" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} — Reviews e Rankings | TechRadar Brasil`;
    const description = `${category.description} Confira reviews profissionais, comparativos e rankings de ${category.name.toLowerCase()} testados em laboratório.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/categoria/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categoria/${params.slug}` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-display font-extrabold text-3xl mb-2">Categoria não encontrada</h1>
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

function CategoryPage() {
  const { category, items } = Route.useLoaderData() as { category: Category; items: Product[] };
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-12 space-y-12">
        <nav className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Link to="/" className="hover:text-accent">Início</Link>
          <ArrowRight className="size-3" />
          <span className="text-foreground">{category.name}</span>
        </nav>

        <header className="max-w-3xl space-y-4">
          <div className="eyebrow">Categoria · {category.count} reviews</div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight text-balance">{category.name}</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">{category.description}</p>
        </header>

        {items.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Mais bem avaliados" title={`Melhores ${category.name.toLowerCase()} testados`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((p) => <ProductTile key={p.slug} product={p} />)}
            </div>
          </section>
        ) : (
          <div className="card-lab p-10 rounded-sm text-center">
            <p className="text-muted-foreground">Novos reviews desta categoria em breve.</p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}