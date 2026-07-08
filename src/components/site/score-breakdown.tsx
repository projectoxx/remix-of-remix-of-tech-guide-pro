import type { ScoreBreakdown as Breakdown } from "@/lib/mock-data";

const labels: Record<keyof Breakdown, string> = {
  imagem: "Imagem",
  som: "Som",
  sistema: "Sistema",
  velocidade: "Velocidade",
  construcao: "Construção",
  recursos: "Recursos",
  conectividade: "Conectividade",
  custoBeneficio: "Custo-Benefício",
};

export function ScoreBreakdownGrid({ breakdown }: { breakdown: Breakdown }) {
  const entries = Object.entries(breakdown).filter(([, v]) => v > 0) as [keyof Breakdown, number][];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
      {entries.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">{labels[k]}</span>
            <span className="font-mono text-sm tabular-nums text-accent">{v.toFixed(1)}</span>
          </div>
          <div className="h-1 w-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-accent to-highlight transition-all"
              style={{ width: `${v * 10}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}