import {
  budgetDimensionesIngreso,
  budgetEscenariosProyectos,
  budgetFacturacionPorFteK,
  budgetFteParams,
  budgetIngresosVisionK,
  budgetIngresosVisionNota,
  budgetInversionPersonasK,
  budgetTicketMedioPonderadoK,
  fteImplicitoDesdeIngresosK,
} from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Building2,
  CalendarRange,
  Layers,
  Network,
  PiggyBank,
  TrendingUp,
} from "lucide-react";

function formatFteEs(n: number) {
  return n.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function BudgetSection() {
  const invNfq = budgetInversionPersonasK(
    budgetFteParams.nfq.fte,
    budgetFteParams.nfq.costeMedioFteKEur
  );
  const invInerco = budgetInversionPersonasK(
    budgetFteParams.inerco.fte,
    budgetFteParams.inerco.costeMedioFteKEur
  );
  const totalPersonas = invNfq + invInerco;

  return (
    <SectionShell
      id="budget"
      eyebrow="Bloque 5"
      title="Budget & People"
      description="Inversión desagregada por parte (NFQ vs INERCO), escenarios de volumen y visión de ingresos FY27–FY29 por dimensión y ticket."
    >
      {/* Inversión por parte — año 1 */}
      <div className="mb-10 rounded-2xl border border-white/[0.08] bg-zinc-900/45 p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <Layers className="size-3.5 text-emerald-500/90" />
              Inversión en personas · {budgetFteParams.periodo}
            </p>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-zinc-500">
              {budgetFteParams.nota}
            </p>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-200/90"
          >
            Total personas ≈ {totalPersonas} k€
          </Badge>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800/90">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/90 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Parte</th>
                <th className="px-4 py-3 text-right">FTE</th>
                <th className="px-4 py-3 text-right">Coste medio (k€/FTE·año)</th>
                <th className="px-4 py-3 text-right">Inversión (k€)</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800/70 hover:bg-zinc-800/30">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-sky-200/95">
                    <Network className="size-3.5 text-sky-400/80" />
                    NFQ
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {budgetFteParams.nfq.fte}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-400">
                  {budgetFteParams.nfq.costeMedioFteKEur}
                </td>
                <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-emerald-200/90">
                  {invNfq}
                </td>
              </tr>
              <tr className="border-b border-zinc-800/70 hover:bg-zinc-800/30">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-emerald-200/95">
                    <Building2 className="size-3.5 text-emerald-400/80" />
                    INERCO
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {budgetFteParams.inerco.fte}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-400">
                  {budgetFteParams.inerco.costeMedioFteKEur}
                </td>
                <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-emerald-200/90">
                  {invInerco}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-zinc-950/80">
                <td
                  className="px-4 py-3 text-xs font-medium text-zinc-400"
                  colSpan={3}
                >
                  Total inversión personas (lanzamiento, ambas partes)
                </td>
                <td className="px-4 py-3 text-right text-lg font-semibold tabular-nums text-zinc-100">
                  {totalPersonas} k€
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-zinc-600">
          Edita FTE y coste medio en{" "}
          <code className="rounded bg-zinc-800 px-1 py-0.5 text-[10px]">
            budgetFteParams
          </code>{" "}
          (workshopContent). El total se recalcula en la vista.
        </p>
      </div>

      {/* Escenarios por proyectos vendidos */}
      <div className="mb-10">
        <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <TrendingUp className="size-3.5 text-amber-400/90" />
          Escenarios según nº de proyectos vendidos
        </p>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-zinc-500">
          La base de coste fijo (personas año 1) es independiente del primer cierre; estos escenarios describen cómo escalar gasto variable, refuerzo de equipo y riesgo de saturación cuando sube el volumen de proyectos.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {budgetEscenariosProyectos.map((sc, i) => (
            <div
              key={sc.id}
              className={cn(
                "rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4",
                i === 1 && "border-amber-500/20 md:ring-1 md:ring-amber-500/10"
              )}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-zinc-200">
                  {sc.etiqueta}
                </span>
                <Badge
                  variant="outline"
                  className="border-zinc-600 text-[10px] text-zinc-400"
                >
                  {sc.proyectosVendidos}
                </Badge>
              </div>
              <p className="text-xs leading-relaxed text-zinc-500">
                {sc.descripcion}
              </p>
              <p className="mt-3 border-t border-zinc-800/80 pt-3 text-xs leading-relaxed text-zinc-400">
                <span className="font-medium text-zinc-500">Inversión: </span>
                {sc.implicacionInversion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Ingresos — visión FY27–FY29 */}
      <div className="mb-10 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 md:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90">
              <PiggyBank className="size-3.5" />
              Ingresos (visión FY27–FY29)
            </p>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-zinc-500">
              {budgetIngresosVisionNota} Regla FTE:{" "}
              <span className="font-medium text-zinc-400">
                {budgetFacturacionPorFteK} k€/FTE·año
              </span>{" "}
              (
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-[10px]">
                budgetFacturacionPorFteK
              </code>
              ). Ticket medio ponderado dimensión: ~{budgetTicketMedioPonderadoK} k€ (
              <code className="rounded bg-zinc-800 px-1 py-0.5 text-[10px]">
                budgetTicketMedioPonderadoK
              </code>
              ).
            </p>
          </div>
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Ticket medio por dimensión (k€ / proyecto tipo)
        </p>
        <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800/90">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/90 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Dimensión</th>
                <th className="px-4 py-3 text-right">Ticket medio</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {budgetDimensionesIngreso.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/25"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium">{d.nombre}</span>
                    {d.nota ? (
                      <p className="mt-1 text-[11px] text-zinc-600">{d.nota}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-emerald-200/90">
                    {d.ticketMedioK} k€
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <CalendarRange className="size-3.5 text-emerald-400/80" />
          Ingresos anuales estimados por escenario (k€)
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-800/90">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/90 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Escenario</th>
                <th className="px-4 py-3 text-right">FY27</th>
                <th className="px-4 py-3 text-right">FY28</th>
                <th className="px-4 py-3 text-right">FY29</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {budgetIngresosVisionK.map((row) => {
                const sc = budgetEscenariosProyectos.find(
                  (s) => s.id === row.escenarioId
                );
                return (
                  <tr
                    key={row.escenarioId}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/25"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-200">
                        {sc?.etiqueta ?? row.escenarioId}
                      </span>
                      {sc ? (
                        <p className="mt-0.5 text-[11px] text-zinc-600">
                          {sc.proyectosVendidos}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-200/90">
                      {row.fy27}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-200/90">
                      {row.fy28}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-200/90">
                      {row.fy29}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mb-3 mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <CalendarRange className="size-3.5 text-emerald-400/80" />
          FTE implícitos por escenario (ingresos ÷ {budgetFacturacionPorFteK} k€/FTE·año)
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-800/90">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/90 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <th className="px-4 py-3">Escenario</th>
                <th className="px-4 py-3 text-right">FY27</th>
                <th className="px-4 py-3 text-right">FY28</th>
                <th className="px-4 py-3 text-right">FY29</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {budgetIngresosVisionK.map((row) => {
                const sc = budgetEscenariosProyectos.find(
                  (s) => s.id === row.escenarioId
                );
                return (
                  <tr
                    key={row.escenarioId}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/25"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-200">
                        {sc?.etiqueta ?? row.escenarioId}
                      </span>
                      {sc ? (
                        <p className="mt-0.5 text-[11px] text-zinc-600">
                          {sc.proyectosVendidos}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-amber-200/90">
                      {formatFteEs(fteImplicitoDesdeIngresosK(row.fy27))} FTE
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-amber-200/90">
                      {formatFteEs(fteImplicitoDesdeIngresosK(row.fy28))} FTE
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-amber-200/90">
                      {formatFteEs(fteImplicitoDesdeIngresosK(row.fy29))} FTE
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <EditableNote sectionId="budget" className="mt-10" />
    </SectionShell>
  );
}
