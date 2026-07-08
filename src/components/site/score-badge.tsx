import { cn } from "@/lib/utils";

export function ScoreBadge({
  score,
  size = "md",
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const tone = score >= 9 ? "text-accent" : score >= 8 ? "text-highlight" : score >= 6.5 ? "text-foreground" : "text-muted-foreground";
  const sizes = {
    sm: "text-base",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-7xl",
  } as const;
  return (
    <span className={cn("font-display font-extrabold tracking-tighter tabular-nums", tone, sizes[size], className)}>
      {score.toFixed(1)}
    </span>
  );
}

export function BadgeChip({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "highlight" | "premium";
}) {
  const styles = {
    default: "bg-white/5 text-muted-foreground border-hairline",
    accent: "bg-accent/10 text-accent border-accent/25",
    highlight: "bg-highlight/10 text-highlight border-highlight/25",
    premium: "bg-foreground/10 text-foreground border-foreground/20",
  }[variant];
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 border font-mono text-[10px] tracking-widest uppercase rounded-sm", styles)}>
      {children}
    </span>
  );
}