import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { categories } from "@/lib/mock-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface pt-16 pb-8">
      <div className="container-page grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">
        <div className="col-span-2">
          <Logo className="mb-6" />
          <p className="text-foreground/70 text-sm leading-relaxed mb-6 max-w-sm">
            Publicação editorial independente. Guias objetivos e comparativos honestos para você comprar eletrônicos com confiança.
          </p>
          <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
            Aviso: participamos de programas de afiliados (Mercado Livre, Amazon). Podemos receber uma comissão por compras qualificadas, sem custo adicional para você.
          </p>
        </div>
        <div className="space-y-3">
          <h5 className="font-display text-sm font-bold text-foreground">Categorias</h5>
          <ul className="text-sm text-foreground/70 space-y-2">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link to="/categoria/$slug" params={{ slug: c.slug }} className="hover:text-accent transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-display text-sm font-bold text-foreground">Recursos</h5>
          <ul className="text-sm text-foreground/70 space-y-2">
            <li><Link to="/" className="hover:text-accent transition-colors">Guias de compra</Link></li>
            <li><Link to="/rankings" className="hover:text-accent transition-colors">Rankings</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Comparativos</Link></li>
            <li><Link to="/" className="hover:text-accent transition-colors">Ofertas do dia</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-display text-sm font-bold text-foreground">Sobre</h5>
          <ul className="text-sm text-foreground/70 space-y-2">
            <li><a href="#" className="hover:text-accent transition-colors">Metodologia</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Quem somos</a></li>
            <li>
              <a href="mailto:suporte@techradarbrasil.store" className="hover:text-accent transition-colors">
                suporte@techradarbrasil.store
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-page pt-6 border-t border-hairline flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} TechRadar Brasil Media</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-accent">Privacidade</a>
          <a href="#" className="hover:text-accent">Termos</a>
          <a href="#" className="hover:text-accent">LGPD</a>
        </div>
      </div>
    </footer>
  );
}