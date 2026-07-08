import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-balance">{title}</h2>
        {subtitle && <p className="text-muted-foreground text-sm mt-2 max-w-2xl">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}