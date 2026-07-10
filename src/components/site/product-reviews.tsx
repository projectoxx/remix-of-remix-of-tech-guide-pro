import { useEffect, useState, type FormEvent } from "react";
import { Star, MessageCircle, Loader2 } from "lucide-react";
import { listReviews, submitReview, type Review } from "@/lib/reviews.functions";

export function ProductReviews({ slug, productName }: { slug: string; productName: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    try {
      const rows = await listReviews({ data: { slug } });
      setReviews(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const cleanName = name.trim().slice(0, 60);
    const cleanComment = comment.trim().slice(0, 1000);
    if (!cleanName || cleanComment.length < 3) {
      setErr("Preencha nome e comentário (mín. 3 caracteres).");
      return;
    }
    setSending(true);
    try {
      await submitReview({
        data: { slug, rating, author: cleanName, comment: cleanComment },
      });
      await refresh();
      setName("");
      setComment("");
      setRating(5);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (e) {
      setErr((e as Error).message || "Não foi possível publicar. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="eyebrow mb-2">Avaliações de leitores</div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
            O que quem comprou está dizendo
          </h2>
        </div>
        {avg && (
          <div className="flex items-center gap-2 bg-highlight/15 px-4 py-2 rounded-full">
            <Star className="size-5 fill-highlight text-highlight" />
            <span className="font-display font-extrabold text-lg tabular-nums">{avg}</span>
            <span className="text-sm text-muted-foreground">
              / 5 · {reviews.length} avaliaç{reviews.length === 1 ? "ão" : "ões"}
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" /> Carregando avaliações…
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <article key={r.id} className="card-lab p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-display font-bold text-foreground">{r.author}</div>
                <div className="flex gap-0.5" aria-label={`${r.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        "size-4 " +
                        (i < r.rating ? "fill-highlight text-highlight" : "text-muted-foreground/30")
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                {r.comment}
              </p>
              <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                {new Date(r.created_at).toLocaleDateString("pt-BR")}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card-lab p-8 rounded-xl text-center space-y-2">
          <MessageCircle className="size-8 text-accent mx-auto" />
          <p className="text-foreground/70">
            Ainda não há avaliações para este produto. <strong>Seja o primeiro a comentar.</strong>
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="card-lab p-6 md:p-8 rounded-xl space-y-5 border-2 border-accent/20"
      >
        <div>
          <h3 className="font-display font-extrabold text-xl mb-1">Deixe sua avaliação</h3>
          <p className="text-sm text-muted-foreground">
            Comprou {productName}? Conte para outros leitores como foi sua experiência.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="rev-name"
              className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
            >
              Seu nome
            </label>
            <input
              id="rev-name"
              type="text"
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-hairline rounded-lg px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="Ex: Maria S."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Sua nota
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} estrelas`}
                  className="p-1"
                >
                  <Star
                    className={
                      "size-7 transition-colors " +
                      (n <= rating
                        ? "fill-highlight text-highlight"
                        : "text-muted-foreground/30 hover:text-highlight/60")
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="rev-comment"
            className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2"
          >
            Seu comentário
          </label>
          <textarea
            id="rev-comment"
            required
            maxLength={1000}
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white border border-hairline rounded-lg px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 resize-y"
            placeholder="Como está sendo sua experiência com este produto?"
          />
          <div className="text-[11px] text-muted-foreground mt-1 text-right tabular-nums">
            {comment.length}/1000
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button type="submit" disabled={sending} className="btn-affiliate disabled:opacity-60">
            {sending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Publicando…
              </>
            ) : (
              "Publicar avaliação"
            )}
          </button>
          {sent && (
            <span className="text-sm text-accent font-semibold">
              Obrigado! Sua avaliação foi publicada.
            </span>
          )}
          {err && <span className="text-sm text-destructive">{err}</span>}
        </div>
      </form>
    </section>
  );
}
