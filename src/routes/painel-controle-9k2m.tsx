import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { categories, products, formatBRL, type Product } from "@/lib/mock-data";
import {
  getAllAffiliateOverrides,
  setAffiliateUrl,
  getAllProductImageOverrides,
  setProductImageUrl,
  getAllProductOverrides,
  setProductOverrides,
  getUserProducts,
  addUserProduct,
  deleteUserProduct,
  type ProductOverrides,
} from "@/lib/affiliate";
import { Check, Save, Trash2, ExternalLink, Plus, Lock, LogOut } from "lucide-react";

export const Route = createFileRoute("/painel-controle-9k2m")({
  head: () => ({
    meta: [
      { title: "Painel — TechRadar Brasil" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PanelPage,
});

// SHA-256 de "techradar2026" — troque no código para mudar a senha.
const PASSWORD_HASH = "5f44161d92ecaa03ddf528a378287f2608a79e8d37676ebf6313043af80618e0";
const SESSION_KEY = "techradar.panel.unlocked.v1";

async function sha256(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function PanelPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(window.sessionStorage.getItem(SESSION_KEY) === "1");
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      {unlocked ? (
        <PanelContent
          onLogout={() => {
            window.sessionStorage.removeItem(SESSION_KEY);
            setUnlocked(false);
          }}
        />
      ) : (
        <LoginGate onUnlock={() => setUnlocked(true)} />
      )}
      <SiteFooter />
    </div>
  );
}

function LoginGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const h = await sha256(pw);
      if (h === PASSWORD_HASH) {
        window.sessionStorage.setItem(SESSION_KEY, "1");
        onUnlock();
      } else {
        setErr("Senha incorreta.");
      }
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
          Este é o painel privado do TechRadar Brasil. Digite sua senha para gerenciar produtos,
          links de afiliado, preços e ofertas.
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
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

function PanelContent({ onLogout }: { onLogout: () => void }) {
  const [affiliates, setAffiliates] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Record<string, string>>({});
  const [overrides, setOverrides] = useState<Record<string, ProductOverrides>>({});
  const [userList, setUserList] = useState<Product[]>([]);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  function reload() {
    setAffiliates(getAllAffiliateOverrides());
    setImages(getAllProductImageOverrides());
    setOverrides(getAllProductOverrides());
    setUserList(getUserProducts());
  }

  useEffect(() => {
    reload();
  }, []);

  const allProducts = useMemo<Product[]>(
    () => [...products, ...userList],
    [userList]
  );

  function saveRow(slug: string) {
    setAffiliateUrl(slug, affiliates[slug] ?? "");
    setProductImageUrl(slug, images[slug] ?? "");
    const ovr = overrides[slug] ?? {};
    setProductOverrides(slug, {
      priceMin: ovr.priceMin ? Number(ovr.priceMin) : undefined,
      priceOld: ovr.priceOld ? Number(ovr.priceOld) : undefined,
      discountPct: ovr.discountPct ? Number(ovr.discountPct) : undefined,
      offerLabel: ovr.offerLabel,
    });
    setSavedSlug(slug);
    setTimeout(() => setSavedSlug(null), 1500);
    reload();
  }

  function updateOverride(slug: string, patch: Partial<ProductOverrides>) {
    setOverrides((prev) => ({ ...prev, [slug]: { ...(prev[slug] ?? {}), ...patch } }));
  }

  function removeUser(slug: string) {
    if (!confirm("Remover este produto do site?")) return;
    deleteUserProduct(slug);
    reload();
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
            Alterações ficam salvas <em>neste navegador</em> (localStorage). Para publicar para todos
            os visitantes, ative um backend depois.
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
          onCreated={() => {
            setShowCreate(false);
            reload();
          }}
        />
      )}

      <div className="text-xs text-muted-foreground bg-surface border border-hairline rounded-lg p-3">
        <strong className="text-foreground">Total:</strong> {allProducts.length} produtos ·{" "}
        {products.length} do catálogo + {userList.length} criados por você.
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
              <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Imagem do ML (URL)</th>
              <th className="text-left px-3 py-3 font-semibold min-w-[200px]">Link de afiliado ML</th>
              <th className="text-right px-3 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {allProducts.map((p) => {
              const isUser = userList.some((u) => u.slug === p.slug);
              const val = affiliates[p.slug] ?? "";
              const imgVal = images[p.slug] ?? "";
              const previewImg = imgVal || p.imageUrl || "";
              const ovr = overrides[p.slug] ?? {};
              const saved = savedSlug === p.slug;
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
                      value={ovr.priceMin}
                      placeholder={String(p.priceMin)}
                      onChange={(n) => updateOverride(p.slug, { priceMin: n })}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <NumberInput
                      value={ovr.priceOld}
                      placeholder="—"
                      onChange={(n) => updateOverride(p.slug, { priceOld: n })}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <NumberInput
                      value={ovr.discountPct}
                      placeholder="auto"
                      onChange={(n) => updateOverride(p.slug, { discountPct: n })}
                      max={99}
                      compact
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="text"
                      value={ovr.offerLabel ?? ""}
                      placeholder="Ex.: Oferta relâmpago"
                      onChange={(e) => updateOverride(p.slug, { offerLabel: e.target.value })}
                      className="w-32 bg-white border border-hairline rounded px-2 py-1.5 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="url"
                      placeholder="https://http2.mlstatic.com/..."
                      value={imgVal}
                      onChange={(e) => setImages((v) => ({ ...v, [p.slug]: e.target.value }))}
                      className="w-full bg-white border border-hairline rounded px-2 py-1.5 text-xs font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="url"
                      placeholder="https://mercadolivre.com/sec/..."
                      value={val}
                      onChange={(e) => setAffiliates((v) => ({ ...v, [p.slug]: e.target.value }))}
                      className="w-full bg-white border border-hairline rounded px-2 py-1.5 text-xs font-mono outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-1.5">
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
                      {isUser && (
                        <button
                          type="button"
                          onClick={() => removeUser(p.slug)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                          title="Excluir produto"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => saveRow(p.slug)}
                        className="inline-flex items-center gap-1.5 bg-accent text-white px-3 py-2 rounded font-semibold text-xs hover:bg-accent/90"
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

function CreateProductForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState("");
  const [affiliateUrl, setAffiliateUrl_] = useState("");
  const [summary, setSummary] = useState("");
  const [score, setScore] = useState<number | "">(8);

  function submit(e: FormEvent) {
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
      scoreBreakdown: { imagem: 8, som: 8, sistema: 8, velocidade: 8, construcao: 8, recursos: 8, conectividade: 8, custoBeneficio: 8 },
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
    addUserProduct(p);
    if (affiliateUrl) setAffiliateUrl(slug, affiliateUrl);
    if (imageUrl) setProductImageUrl(slug, imageUrl);
    onCreated();
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
              <option key={c.slug} value={c.slug}>{c.name}</option>
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
            onChange={(e) => setAffiliateUrl_(e.target.value)}
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
        <button type="submit" className="btn-affiliate">
          <Plus className="size-4" /> Criar produto
        </button>
      </div>
      <style>{`.input{width:100%;background:#fff;border:1px solid var(--color-hairline, #e5e7eb);border-radius:8px;padding:.55rem .75rem;outline:none;font-size:.875rem}.input:focus{border-color:var(--color-accent,#0f4c81);box-shadow:0 0 0 3px rgba(15,76,129,.15)}`}</style>
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={"block space-y-1 " + (full ? "md:col-span-2" : "")}>
      <span className="text-xs font-semibold text-foreground/80">{label}</span>
      {children}
    </label>
  );
}