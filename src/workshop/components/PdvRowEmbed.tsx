import { pdvServiciosModelo } from "@/workshop/data/workshopContent";
import type { PdvServicioRow } from "@/workshop/data/workshopContent";
import { Cpu, Table2 } from "lucide-react";

export function pdvRowsFor(ids: string[]): PdvServicioRow[] {
  return ids
    .map((id) => pdvServiciosModelo.find((r) => r.id === id))
    .filter((r): r is PdvServicioRow => r != null);
}

export function PdvRowEmbed({ rows }: { rows: PdvServicioRow[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-lg border border-violet-500/20 bg-violet-500/[0.04]">
      <p className="flex items-center gap-2 border-b border-violet-500/15 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-violet-300/90 md:px-4 md:py-3">
        <Table2 className="size-3.5 shrink-0" aria-hidden />
        Roles conjuntos por servicio (extracto)
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs md:min-w-0 md:text-sm">
          <thead>
            <tr className="border-b border-zinc-800/90 bg-zinc-950/80 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 md:text-[11px]">
              <th className="px-3 py-2.5 align-bottom md:px-4 md:py-3">Core</th>
              <th className="px-3 py-2.5 align-bottom text-emerald-400/85 md:px-4 md:py-3">
                INERCO
              </th>
              <th className="px-3 py-2.5 align-bottom text-sky-400/85 md:px-4 md:py-3">
                NFQ
              </th>
              <th className="px-3 py-2.5 align-bottom text-zinc-500 md:px-4 md:py-3">
                Herramienta
              </th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-800/60 last:border-0"
              >
                <td className="align-top px-3 py-3 font-medium text-zinc-200 md:px-4 md:py-3.5">
                  {row.core}
                </td>
                <td className="align-top px-3 py-3 leading-relaxed text-zinc-400 md:px-4 md:py-3.5">
                  {row.servicioInerco}
                </td>
                <td className="align-top px-3 py-3 leading-relaxed text-zinc-400 md:px-4 md:py-3.5">
                  {row.servicioNfq}
                </td>
                <td className="align-top px-3 py-3 text-zinc-500 md:px-4 md:py-3.5">
                  <span className="inline-flex items-center gap-1">
                    <Cpu className="size-3 shrink-0 text-zinc-600" aria-hidden />
                    {row.activoDigital ?? "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
