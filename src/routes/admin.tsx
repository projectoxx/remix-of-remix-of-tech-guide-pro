import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { products, formatBRL } from "@/lib/mock-data";
import {
  getAllAffiliateOverrides,
  setAffiliateUrl,
  clearAffiliateOverride,
} from "@/lib/affiliate";
import { Check, Save, Trash2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel de afiliados — TechRadar Brasil" },
      { name: "description", content: "Gerencie os links de afiliado do Mercado Livre para cada produto." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [savedSlug, setSavedSlug] = useState<string | null>(null);

  useEffect(() => {
    setValues(getAllAffiliateOverrides());
  }, []);

  function save(slug: string) {
    setAffiliateUrl(slug, values[slug] ?? "");
    setSavedSlug(slug);
    setTimeout(() => setSavedSlug(null), 1500);
  }

  function clear(slug: string) {
    clearAffiliateOverride(slug);
    setValues((v) => {
      const next = { ...v };
      delete next[slug];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="container-page py-12 space-y-8">
        <header className="max-w-3xl space-y-3">
          <div className="eyebrow text-accent">Painel de afiliados</div>
          <h1 className="trust-serif text-3xl md:text-4xl leading-tight">
            Cole seus links de afiliado do Mercado Livre
          </h1>
          <p className="text-foreground/70 leading-relaxed">
            Para cada produto abaixo, cole o link de afiliado gerado no seu painel do
            Mercado Livre e clique em <strong>Salvar</strong>. Todos os botões
            "Ver no Mercado Livre" do site vão passar a usar esse link imediatamente.
          </p>
          <div className="text-sm text-muted-foreground bg-surface border border-hairline rounded-lg p-4 leading-relaxed">
            <strong className="text-foreground">Importante:</strong> os links salvos aqui
            ficam guardados <em>neste navegador</em> (localStorage). Para deixá-los fixos
            para todos os visitantes, edite o campo <code className="font-mono text-xs bg-white px-1 py-0.5 rounded">affiliateUrl</code>{" "}
            de cada produto em <code className="font-mono text-xs bg-white px-1 py-0.5 rounded">src/lib/mock-data.ts</code>,
            ou peça para ativarmos o backend (Lovable Cloud) e centralizarmos tudo no banco.
          </div>
        </header>

        <div className="overflow-x-auto border border-hairline rounded-xl bg-white">
          <table className="w-full text-sm">
            <thead className="bg-surface border-b border-hairline text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Produto</th>
                <th className="text-left px-4 py-3 font-semibold">Categoria</th>
                <th className="text-left px-4 py-3 font-semibold">Preço médio</th>
                <th className="text-left px-4 py-3 font-semibold w-[45%]">Link de afiliado ML</th>
                <th className="text-right px-4 py-3 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {products.map((p) => {
                const val = values[p.slug] ?? "";
                const saved = savedSlug === p.slug;
                return (
                  <tr key={p.slug} className="hover:bg-surface/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.imageUrl && (
                          <img
                            src={p.imageUrl}
                            alt=""
                            loading="lazy"
                            className="size-12 object-cover rounded border border-hairline"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-foreground leading-tight">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.categoryName}</td>
                    <td className="px-4 py-3 font-medium">{formatBRL(p.priceAvg)}</td>
                    <td className="px-4 py-3">
                      <input
                        type="url"
                        placeholder="https://mercadolivre.com/sec/..."
                        value={val}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, [p.slug]: e.target.value }))
                        }
                        className="w-full bg-white border border-hairline rounded px-3 py-2 text-sm font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {val && (
                          <a
                            href={val}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-muted-foreground hover:text-accent"
                            title="Testar link"
                          >
                            <ExternalLink className="size-4" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => clear(p.slug)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                          title="Limpar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => save(p.slug)}
                          className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded font-semibold text-xs hover:bg-accent/90 transition-colors"
                        >
                          {saved ? <Check className="size-4" /> : <Save className="size-4" />}
                          {saved ? "Salvo" : "Salvar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}