import type { LineScore } from "@/workshop/state/workshopSession";
import { SCORE_MIN, SCORE_MAX } from "@/workshop/state/workshopSession";
import type { ServiceLine } from "@/workshop/data/workshopContent";
import { cn } from "@/lib/utils";

const PALETTE = [
  "bg-emerald-500/90",
  "bg-sky-500/90",
  "bg-violet-500/90",
  "bg-amber-500/90",
  "bg-rose-500/85",
  "bg-cyan-500/85",
  "bg-fuchsia-500/80",
  "bg-lime-500/85",
];

function posFromScore(v: number, min: number, max: number): number {
  return ((v - min) / (max - min)) * 100;
}

interface PortfolioMatrixProps {
  serviceLines: ServiceLine[];
  scoresByServiceLine: Record<string, LineScore>;
  onPointClick?: (serviceId: string) => void;
  className?: string;
}

export function PortfolioMatrix({
  serviceLines,
  scoresByServiceLine,
  onPointClick,
  className,
}: PortfolioMatrixProps) {
  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative mx-auto aspect-[4/3] max-h-[min(420px,55vh)] w-full max-w-2xl rounded-xl border border-zinc-800/90 bg-zinc-950/80 p-3 sm:p-4"
        role="img"
        aria-label="Matriz madurez frente a relevancia del portfolio. Cada punto es una línea de servicio."
      >
        {/* Quadrant labels */}
        <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Alta relevancia
        </span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Baja relevancia
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 [writing-mode:vertical-rl] rotate-180">
          Baja madurez
        </span>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 [writing-mode:vertical-rl]">
          Alta madurez
        </span>

        {/* Grid background */}
        <div
          className="absolute inset-10 rounded-lg border border-zinc-800/60 bg-[linear-gradient(to_right,rgba(63,63,70,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(63,63,70,0.35)_1px,transparent_1px)] bg-size-[25%_25%]"
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-10 bottom-10 w-px bg-zinc-700/50"
          aria-hidden
        />
        <div
          className="absolute top-1/2 left-10 right-10 h-px bg-zinc-700/50"
          aria-hidden
        />

        <div className="absolute inset-10">
          {serviceLines.map((s, i) => {
            const sc = scoresByServiceLine[s.id] ?? {
              maturity: 3,
              relevance: 3,
            };
            const xPct = posFromScore(sc.maturity, SCORE_MIN, SCORE_MAX);
            const yPct = 100 - posFromScore(sc.relevance, SCORE_MIN, SCORE_MAX);
            const color = PALETTE[i % PALETTE.length];
            return (
              <button
                key={s.id}
                type="button"
                title={`${s.title}: madurez ${sc.maturity}, relevancia ${sc.relevance}`}
                aria-label={`${s.title}: madurez ${sc.maturity}, relevancia ${sc.relevance}. Ir a detalle de la línea.`}
                className={cn(
                  "absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md ring-2 ring-zinc-950 transition hover:scale-110 hover:ring-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500",
                  color
                )}
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                }}
                onClick={() => onPointClick?.(s.id)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-zinc-500">
        {serviceLines.map((s, i) => (
          <li key={s.id} className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                PALETTE[i % PALETTE.length]
              )}
            >
              {i + 1}
            </span>
            <span className="text-zinc-400">{s.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
