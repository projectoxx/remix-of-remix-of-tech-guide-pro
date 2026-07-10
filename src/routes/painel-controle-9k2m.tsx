import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { categories, formatBRL, type Product } from "@/lib/mock-data";
import { useCatalog } from "@/context/catalog-context";
import {
  saveOverride,
  deleteOverride,
  saveUserProduct,
  deleteUserProduct,
  verifyAdminPassword,
} from "@/lib/catalog.functions";
import { Check, Save, Trash2, ExternalLink, Plus, Lock, LogOut, Loader2 } from "lucide-react";

export const Route = createFileRoute("/painel-controle-9k2m")({
  head: () => ({
    meta: [
      { title: "Painel — TechRadar Brasil" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PanelPage,
});

const SESSION_KEY = "techradar.panel.pw.v2";

function PanelPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPassword(window.sessionStorage.getItem(SESSION_KEY));
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {password ? (
        <PanelContent
          password={password}
          onLogout={() => {
            window.sessionStorage.removeItem(SESSION_KEY);
            setPassword(null);
          }}
        />
      ) : (
        <LoginGate
          onUnlock={(pw) => {
            window.sessionStorage.setItem(SESSION_KEY, pw);
            setPassword(pw);
          }}
        />
      )}
      <SiteFooter />
    </div>
  );
}

function LoginGate({ onUnlock }: { onUnlock: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await verifyAdminPassword({ data: { password: pw } });
      onUnlock(pw);
    } catch (e) {
      setErr((e as Error).message || "Senha incorreta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-page py-20 md:py-28">
      <div className="max-w-md mx-auto card-lab rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="size-12 grid place-items-center rounded-full bg-accent/10 text-accent">
            <Lock className="size-5" />
          </div>
          <div>
            <div className="eyebrow text-accent">Área restrita</div>
            <h1 className="trust-serif text-2xl leading-tight">Painel de controle</h1>
          </div>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          Painel privado do TechRadar Brasil. Digite a senha para gerenciar produtos, preços e
          links de afiliado. As alterações agora ficam salvas no servidor — aparecem em todos os
          dispositivos.
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="password"
            autoFocus
            required
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Senha"
            className="w-full bg-white border border-hairline rounded-lg px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {err && <div className="text-sm text-destructive">{err}</div>}
          <button
            type="submit"
            disabled={loading}
            className="btn-affiliate w-full justify-center disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Verificando…
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}

type RowState = {
  priceMin?: number;
  priceOld?: number;
  discountPct?: number;
  offerLabel?: string;
  imageUrl?: string;
  affiliateUrl?: string;
};

function PanelContent({ password, onLogout }: { password: string; onLogout: () => void }) {
  const catalog = useCatalog();
  const [rows, setRows] = useState<Record<string, RowState>>({});
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const allProducts = catalog.allProducts;

  // Prime row state with current overrides
  useEffect(() => {
    const next: Record<string, RowState> = {};
    for (const p of allProducts) {
      const o = catalog.overrides[p.slug];
      next[p.slug] = {
        priceMin: o?.price_min ?? undefined,
        priceOld: o?.price_old ?? undefined,
        discountPct: o?.discount_pct ?? undefined,
        offerLabel: o?.offer_label ?? undefined,
        imageUrl: o?.image_url ?? undefined,
        affiliateUrl: o?.affiliate_url ?? undefined,
      };
    }
    setRows(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog.overrides, catalog.userProducts.length]);

  function updateRow(slug: string, patch: Partial<RowState>) {
    setRows((prev) => ({ ...prev, [slug]: { ...(prev[slug] ?? {}), ...patch } }));
  }

  async function handleSave(slug: string) {
    const r = rows[slug] ?? {};
    setSavingSlug(slug);
    try {
      await saveOverride({
        data: {
          password,
          slug,
          priceMin: r.priceMin != null ? Number(r.priceMin) : null,
          priceOld: r.priceOld != null ? Number(r.priceOld) : null,
          discountPct: r.discountPct != null ? Number(r.discountPct) : null,
          offerLabel: r.offerLabel || null,
          imageUrl: r.imageUrl || null,
          affiliateUrl: r.affiliateUrl || null,
        },
      });
      await catalog.refresh();
      setSavedSlug(slug);
      setTimeout(() => setSavedSlug(null), 1500);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSavingSlug(null);
    }
  }

  async function handleRemoveUser(slug: string) {
    if (!confirm("Remover este produto do site?")) return;
    try {
      await deleteUserProduct({ data: { password, slug } });
      await catalog.refresh();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <main className="container-page py-10 space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-2">
          <div className="eyebrow text-accent">Painel privado</div>
          <h1 className="trust-serif text-3xl md:text-4xl leading-tight">
            Gerencie produtos, preços, ofertas e links de afiliado
          </h1>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Alterações são salvas no <strong>servidor</strong> e aparecem imediatamente em qualquer
            dispositivo — celular, tablet ou desktop.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowCreate((v) => !v)}
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-accent/90"
          >
            <Plus className="size-4" /> {showCreate ? "Fechar" : "Novo produto"}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 border border-hairline text-foreground font-semibold px-4 py-2.5 rounded-lg hover:border-accent hover:text-accent"
          >
            <LogOut className="size-4" /> Sair
          </button>
        </div>
      </header>

      {showCreate && (
        <CreateProductForm
          password={password}
          onCreated={async () => {
            setShowCreate(false);
            await catalog.refresh();
          }}
        />
      )}

      <div className="text-xs text-muted-foreground bg-surface border border-hairline rounded-lg p-3">
        <strong className="text-foreground">Total:</strong> {allProducts.length} produtos ·{" "}
        {catalog.userProducts.length} criados por você.
      </div>

      <div className="overflow-x-auto border border-hairline rounded-xl bg-white">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-hairline text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Produto</th>
              <th className="text-left px-3 py-3 font-semibold">Preço atual (R$)</th>
              <th className="text-left px-3 py-3 font-semibold">Preço antigo (R$)</th>
              <th className="text-left px-3 py-3 font-semibold">% desc.</th>
              <th className="text-left px-3 py-3 font-semibold">Rótulo de oferta</th>
              <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Imagem (URL)</th>
              <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Link ML</th>
              <th className="text-right px-3 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {allProducts.map((p) => {
              const isUser = catalog.userProducts.some((u) => u.slug === p.slug);
              const r = rows[p.slug] ?? {};
              const previewImg = r.imageUrl || p.imageUrl || "";
              const saved = savedSlug === p.slug;
              const saving = savingSlug === p.slug;
              return (
                <tr key={p.slug} className="hover:bg-surface/60 align-top">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      {previewImg ? (
                        <img
                          src={previewImg}
                          alt=""
                          loading="lazy"
                          className="size-12 object-cover rounded border border-hairline"
                        />
                      ) : (
                        <div className="size-12 grid place-items-center rounded border border-hairline bg-surface text-[10px] text-muted-foreground font-semibold">
                          s/foto
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground leading-tight">{p.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {p.brand} · {p.categoryName}
                          {isUser && <span className="ml-2 text-accent font-semibold">(seu)</span>}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          padrão: {formatBRL(p.priceMin)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <NumberInput
                      value={r.priceMin}
                      placeholder={String(p.priceMin)}
                      onChange={(n) => updateRow(p.slug, { priceMin: n })}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <NumberInput
                      value={r.priceOld}
                      placeholder="—"
                      onChange={(n) => updateRow(p.slug, { priceOld: n })}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <NumberInput
                      value={r.discountPct}
                      placeholder="auto"
                      onChange={(n) => updateRow(p.slug, { discountPct: n })}
                      max={99}
                      compact
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={r.offerLabel ?? ""}
                      placeholder="Ex.: Oferta relâmpago"
                      onChange={(e) => updateRow(p.slug, { offerLabel: e.target.value })}
                      className="w-32 bg-white border border-hairline rounded px-2 py-1.5 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="url"
                      placeholder="https://http2.mlstatic.com/..."
                      value={r.imageUrl ?? ""}
                      onChange={(e) => updateRow(p.slug, { imageUrl: e.target.value })}
                      className="w-full bg-white border border-hairline rounded px-2 py-1.5 text-xs font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="url"
                      placeholder="https://mercadolivre.com/sec/..."
                      value={r.affiliateUrl ?? ""}
                      onChange={(e) => updateRow(p.slug, { affiliateUrl: e.target.value })}
                      className="w-full bg-white border border-hairline rounded px-2 py-1.5 text-xs font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      {r.affiliateUrl && (
                        <a
                          href={r.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-muted-foreground hover:text-accent"
                          title="Testar link"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                      {isUser && (
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(p.slug)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                          title="Excluir produto"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSave(p.slug)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded font-semibold text-xs hover:bg-accent/90 disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : saved ? (
                          <Check className="size-4" />
                        ) : (
                          <Save className="size-4" />
                        )}
                        {saving ? "Salvando" : saved ? "Salvo" : "Salvar"}
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
  );
}

function NumberInput({
  value,
  placeholder,
  onChange,
  max,
  compact,
}: {
  value: number | undefined;
  placeholder: string;
  onChange: (n: number | undefined) => void;
  max?: number;
  compact?: boolean;
}) {
  return (
    <input
      type="number"
      min={0}
      max={max}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === "" ? undefined : Number(v));
      }}
      className={
        (compact ? "w-16 " : "w-24 ") +
        "bg-white border border-hairline rounded px-2 py-1.5 text-xs tabular-nums outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      }
    />
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function CreateProductForm({
  password,
  onCreated,
}: {
  password: string;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [score, setScore] = useState<number | "">(8);
  const [saving, setSaving] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name || !brand || !price || !summary) {
      alert("Preencha nome, marca, preço e resumo.");
      return;
    }
    const cat = categories.find((c) => c.slug === categorySlug)!;
    const slug = slugify(name);
    const p: Product = {
      slug,
      name,
      brand,
      categorySlug: cat.slug,
      categoryName: cat.name,
      score: typeof score === "number" ? score : 8,
      scoreBreakdown: {
        imagem: 8,
        som: 8,
        sistema: 8,
        velocidade: 8,
        construcao: 8,
        recursos: 8,
        conectividade: 8,
        custoBeneficio: 8,
      },
      priceAvg: Number(price),
      priceMin: Number(price),
      priceMax: Number(price),
      summary,
      pros: [],
      cons: [],
      specs: [],
      verdict: summary,
      goodFor: [],
      notFor: [],
      faq: [],
      affiliateUrl: affiliateUrl || "#",
      gradient: ["#0f172a", "#0f4c81"],
      imageUrl: imageUrl || "",
    };
    setSaving(true);
    try {
      await saveUserProduct({ data: { password, product: p as unknown as Record<string, unknown> } });
      if (affiliateUrl || imageUrl) {
        await saveOverride({
          data: {
            password,
            slug,
            imageUrl: imageUrl || null,
            affiliateUrl: affiliateUrl || null,
          },
        });
      }
      onCreated();
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="card-lab rounded-xl p-6 space-y-4 bg-white">
      <h2 className="font-display font-bold text-lg">Adicionar novo produto</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Nome do produto*">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Ex.: TCL 55C755 QLED 4K 55"'
            className="input"
          />
        </Field>
        <Field label="Marca*">
          <input
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Ex.: TCL"
            className="input"
          />
        </Field>
        <Field label="Categoria*">
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="input"
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preço (R$)*">
          <input
            type="number"
            min={1}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="input tabular-nums"
          />
        </Field>
        <Field label="Nota (0–10)">
          <input
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={score}
            onChange={(e) => setScore(e.target.value === "" ? "" : Number(e.target.value))}
            className="input tabular-nums"
          />
        </Field>
        <Field label="URL da imagem (ML)">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://http2.mlstatic.com/..."
            className="input font-mono text-xs"
          />
        </Field>
        <Field label="Link de afiliado ML" full>
          <input
            type="url"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            placeholder="https://mercadolivre.com/sec/..."
            className="input font-mono text-xs"
          />
        </Field>
        <Field label="Resumo curto*" full>
          <textarea
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="input"
            placeholder="Uma frase objetiva sobre o produto."
          />
        </Field>
      </div>
      <div className="flex gap-2 justify-end">
        <button type="submit" disabled={saving} className="btn-affiliate disabled:opacity-60">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}{" "}
          Criar produto
        </button>
      </div>
      <style>{`.input{width:100%;background:#fff;border:1px solid var(--color-hairline, #e5e7eb);border-radius:8px;padding:.55rem .75rem;outline:none;font-size:.875rem}.input:focus{border-color:var(--color-accent,#0f4c81);box-shadow:0 0 0 3px rgba(15,76,129,.15)}`}</style>
    </form>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={"block space-y-1 " + (full ? "md:col-span-2" : "")}>
      <span className="text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </label>
  );
}
