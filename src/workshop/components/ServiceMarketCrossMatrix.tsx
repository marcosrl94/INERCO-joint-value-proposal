import {
  mercadoGeografias,
  sectorReachFy2026,
  serviceLines,
  type MercadoGeografia,
  type SectorReachRow,
} from "@/workshop/data/workshopContent";
import { cn } from "@/lib/utils";
import { FIT_MAX } from "@/workshop/state/workshopSession";

type CrossMode = "sector" | "geo";

type FitMap = Record<string, Record<string, number>>;

function cellBg(
  v: number | undefined
): { className: string; label: string } {
  if (v == null || v <= 0)
    return { className: "bg-zinc-950/40", label: "—" };
  if (v === 1)
    return {
      className: "bg-zinc-700/35 text-zinc-300",
      label: "Explorar",
    };
  if (v === 2)
    return {
      className: "bg-amber-500/25 text-amber-100",
      label: "Media",
    };
  return {
    className: "bg-emerald-500/30 text-emerald-100",
    label: "Priorizar",
  };
}

interface ServiceMarketCrossMatrixProps {
  mode: CrossMode;
  fitByServiceAnd: FitMap;
  onChange: (serviceId: string, colId: string, value: number) => void;
  highlightColumnId?: string | null;
  className?: string;
}

function columnsForMode(mode: CrossMode): {
  id: string;
  shortLabel: string;
  full?: string;
}[] {
  if (mode === "sector") {
    return sectorReachFy2026.map((r: SectorReachRow) => ({
      id: r.id,
      shortLabel: r.shortLabel,
      full: r.sector,
    }));
  }
  return mercadoGeografias.map((g: MercadoGeografia) => ({
    id: g.id,
    shortLabel: g.label,
    full: g.gtmHorizonHint,
  }));
}

export function ServiceMarketCrossMatrix({
  mode,
  fitByServiceAnd,
  onChange,
  highlightColumnId,
  className,
}: ServiceMarketCrossMatrixProps) {
  const cols = columnsForMode(mode);

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-zinc-800/80", className)}>
      <table className="w-full min-w-[720px] border-collapse text-left text-[11px] sm:text-xs">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-950/80">
            <th className="sticky left-0 z-10 min-w-[140px] border-r border-zinc-800/80 bg-zinc-950/95 px-2 py-2 font-semibold text-zinc-400">
              Línea de oferta
            </th>
            {cols.map((c) => (
              <th
                key={c.id}
                title={c.full}
                className={cn(
                  "max-w-[100px] px-1 py-2 text-center align-bottom font-medium leading-tight text-zinc-500",
                  highlightColumnId === c.id &&
                    "bg-emerald-500/10 text-emerald-200/90"
                )}
              >
                <span className="line-clamp-3">{c.shortLabel}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviceLines.map((s) => (
            <tr
              key={s.id}
              className="border-b border-zinc-800/50 last:border-0"
            >
              <td className="sticky left-0 z-10 border-r border-zinc-800/80 bg-zinc-950/90 px-2 py-1.5 font-medium text-zinc-300">
                <span className="line-clamp-2">{s.title}</span>
              </td>
              {cols.map((c) => {
                const v = fitByServiceAnd[s.id]?.[c.id];
                const { className: bg, label } = cellBg(v);
                return (
                  <td
                    key={c.id}
                    className={cn(
                      "p-0 align-middle",
                      highlightColumnId === c.id && "ring-1 ring-inset ring-emerald-500/20"
                    )}
                  >
                    <select
                      value={v && v > 0 ? v : 0}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        onChange(s.id, c.id, n);
                      }}
                      aria-label={`${s.title} — ${c.shortLabel}: encaje (${label})`}
                      className={cn(
                        "h-full min-h-[36px] w-full cursor-pointer border-0 bg-transparent px-0.5 py-1 text-center text-[10px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 sm:text-[11px]",
                        bg
                      )}
                    >
                      <option value={0}>—</option>
                      {Array.from({ length: FIT_MAX }, (_, i) => i + 1).map(
                        (n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-zinc-800/80 px-3 py-2 text-[10px] text-zinc-600">
        Escala: 1 explorar · 2 medio · 3 priorizar en portfolio para ese
        segmento. “—” sin foco.
      </p>
    </div>
  );
}
