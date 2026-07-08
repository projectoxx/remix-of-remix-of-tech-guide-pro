export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-extrabold text-lg tracking-tight ${className}`}>
      <svg viewBox="0 0 64 64" className="size-7" aria-hidden="true">
        <rect width="64" height="64" rx="12" fill="#0f4c81" />
        <circle cx="32" cy="32" r="18" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
        <circle cx="32" cy="32" r="10" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
        <path d="M32 32 L32 14" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="32" r="3" fill="#f59e0b" />
      </svg>
      <span className="text-foreground">
        Tech<span className="text-accent">Radar</span>
        <span className="text-muted-foreground font-medium ml-1">BR</span>
      </span>
    </span>
  );
}