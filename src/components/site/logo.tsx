export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold text-lg tracking-tight uppercase ${className}`}>
      <svg viewBox="0 0 64 64" className="size-6" aria-hidden="true">
        <rect width="64" height="64" rx="12" fill="currentColor" className="text-surface" />
        <path d="M8 40 L20 40 L26 22 L32 44 L38 30 L44 34 L56 34" fill="none" stroke="#2dd4a8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="44" cy="34" r="3" fill="#73ffb8" />
      </svg>
      <span>
        Tech<span className="text-accent">Radar</span>
        <span className="text-muted-foreground/50 font-light ml-1">BR</span>
      </span>
    </span>
  );
}