import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Logo } from "./logo";
import { categories } from "@/lib/mock-data";

const primaryNav = categories.slice(0, 6);

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-hairline">
      <div className="container-page h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="shrink-0 hover:opacity-90 transition-opacity">
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium uppercase tracking-wider text-muted-foreground min-w-0">
            {primaryNav.map((c) => (
              <Link
                key={c.slug}
                to="/categoria/$slug"
                params={{ slug: c.slug }}
                className="hover:text-accent transition-colors whitespace-nowrap"
                activeProps={{ className: "text-accent" }}
              >
                {c.name}
              </Link>
            ))}
            <Link to="/rankings" className="hover:text-accent transition-colors" activeProps={{ className: "text-accent" }}>
              Rankings
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-hairline px-3 py-1.5 rounded-sm w-56 focus-within:border-accent/40 transition-colors">
            <Search className="size-4 text-muted-foreground" aria-hidden />
            <input
              placeholder="Buscar review, produto..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground/60"
              aria-label="Buscar no TechRadar"
            />
            <kbd className="hidden lg:inline text-[10px] font-mono text-muted-foreground/60 border border-hairline px-1 rounded">/</kbd>
          </div>
          <button className="md:hidden p-2 text-muted-foreground hover:text-accent" aria-label="Buscar">
            <Search className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}