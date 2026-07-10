import { useState, type FormEvent } from "react";
import { subscribeAlert } from "@/lib/alerts.functions";
import { Check, Loader2 } from "lucide-react";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg(null);
    try {
      await subscribeAlert({ data: { email } });
      setStatus("success");
      setMsg("Pronto! Você vai receber as próximas ofertas em " + email + ".");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMsg((err as Error).message || "Não foi possível cadastrar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={"flex flex-col gap-2 " + className}>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          aria-label="Seu e-mail"
          className="flex-1 bg-white text-foreground px-4 py-3 rounded-lg border border-hairline outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-affiliate whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Salvando
            </>
          ) : status === "success" ? (
            <>
              <Check className="size-4" /> Assinado
            </>
          ) : (
            "Assinar"
          )}
        </button>
      </div>
      {msg && (
        <p
          className={
            "text-xs " + (status === "error" ? "text-destructive" : "text-foreground/70")
          }
        >
          {msg}
        </p>
      )}
    </form>
  );
}
