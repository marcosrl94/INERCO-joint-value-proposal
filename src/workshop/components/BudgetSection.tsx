import {
  budgetDimensionesIngreso,
  budgetEscenariosProyectos,
  budgetFteParams,
  budgetIngresosVisionNota,
  budgetInversionPersonasK,
  fteImplicitoDesdeIngresosK,
} from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useWorkshopSession } from "@/workshop/hooks/useWorkshopSession";
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

/** Valores almacenados en miles de euros (k€) */
function formatKiloEuros(n: number) {
  return `${n.toLocaleString("es-ES")} k€`;
}

function parseOptionalNumber(s: string): number | null {
  const t = s.trim();
  if (t === "") return null;
  const n = Number.parseFloat(t.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function BudgetNumInput({
  value,
  onCommit,
  className,
  "aria-label": ariaLabel,
}: {
  value: number | null;
  onCommit: (v: number | null) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <Input
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      className={cn(
        "h-8 border-zinc-700 bg-zinc-950/80 text-right tabular-nums text-zinc-200 placeholder:text-zinc-600",
        className
      )}
      value={value === null ? "" : String(value)}
      placeholder="—"
      onChange={(e) => {
        const t = e.target.value;
        if (t.trim() === "") {
          onCommit(null);
          return;
        }
        const n = parseOptionalNumber(t);
        if (n !== null) onCommit(n);
      }}
    />
  );
}

export function BudgetSection() {
  const {
    session,
    setBudgetPersonas,
    setBudgetFacturacionPorFteK,
    setBudgetTicketMedioPonderadoK,
    setBudgetDimensionTicket,
    setBudgetIngresoEscenario,
  } = useWorkshopSession();
  const b = session.budget;

  const invNfq =
    b.nfq.fte != null && b.nfq.costeMedioK != null
      ? budgetInversionPersonasK(b.nfq.fte, b.nfq.costeMedioK)
      : null;
  const invInerco =
    b.inerco.fte != null && b.inerco.costeMedioK != null
      ? budgetInversionPersonasK(b.inerco.fte, b.inerco.costeMedioK)
      : null;
  const totalPersonas =
    invNfq != null || invInerco != null
      ? (invNfq ?? 0) + (invInerco ?? 0)
      : null;

  const factK = b.facturacionPorFteK;

  return (
    <SectionShell
      id="budget"
      slideIndex={5}
      eyebrow="06 · Inversión"
      title="Inversión y capacidad"
      description="Cifras sin prefijar (en miles de euros, k€): rellenad en sesión FTE, costes, regla de facturación por FTE e ingresos por escenario; los totales y FTE implícitos se calculan cuando las variables estén informadas."
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
            Total personas{" "}
            {totalPersonas != null ? `≈ ${formatKiloEuros(totalPersonas)}` : "—"}
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
                <td className="px-4 py-3 text-right">
                  <BudgetNumInput
                    aria-label="FTE NFQ"
                    value={b.nfq.fte}
                    onCommit={(v) => setBudgetPersonas("nfq", "fte", v)}
                    className="max-w-[7rem] ml-auto"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <BudgetNumInput
                      aria-label="Coste medio NFQ k€/FTE·año"
                      value={b.nfq.costeMedioK}
                      onCommit={(v) => setBudgetPersonas("nfq", "costeMedioK", v)}
                      className="max-w-[7rem] ml-auto"
                    />
                    <span className="text-xs text-zinc-500">k€</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-emerald-200/90">
                  {invNfq != null ? formatKiloEuros(invNfq) : "—"}
                </td>
              </tr>
              <tr className="border-b border-zinc-800/70 hover:bg-zinc-800/30">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-emerald-200/95">
                    <Building2 className="size-3.5 text-emerald-400/80" />
                    INERCO
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <BudgetNumInput
                    aria-label="FTE INERCO"
                    value={b.inerco.fte}
                    onCommit={(v) => setBudgetPersonas("inerco", "fte", v)}
                    className="max-w-[7rem] ml-auto"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <BudgetNumInput
                      aria-label="Coste medio INERCO k€/FTE·año"
                      value={b.inerco.costeMedioK}
                      onCommit={(v) =>
                        setBudgetPersonas("inerco", "costeMedioK", v)
                      }
                      className="max-w-[7rem] ml-auto"
                    />
                    <span className="text-xs text-zinc-500">k€</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-emerald-200/90">
                  {invInerco != null ? formatKiloEuros(invInerco) : "—"}
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
                  {totalPersonas != null ? formatKiloEuros(totalPersonas) : "—"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-zinc-600">
          Los supuestos de FTE y coste medio pueden ajustarse para reflejar el
          acuerdo interno de cada parte; el total se actualiza cuando ambos
          valores de una fila están informados.
        </p>
      </div>

      {/* Escenarios por proyectos vendidos */}
      <div className="mb-10">
        <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <TrendingUp className="size-3.5 text-amber-400/90" />
          Escenarios según nº de proyectos vendidos
        </p>
        <p className="mb-4 max-w-3xl text-xs leading-relaxed text-zinc-500">
          La base de coste fijo (personas año 1) es independiente del primer
          cierre; estos escenarios describen cómo escalar gasto variable,
          refuerzo de equipo y riesgo de saturación cuando sube el volumen de
          proyectos.
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
              {budgetIngresosVisionNota}{" "}
              <span className="font-medium text-zinc-400">
                Regla de referencia para FTE implícito (k€/FTE·año):
              </span>{" "}
              <span className="inline-flex items-center gap-1 align-middle">
                <BudgetNumInput
                  aria-label="Facturación por FTE k€/año"
                  value={b.facturacionPorFteK}
                  onCommit={setBudgetFacturacionPorFteK}
                  className="inline-flex h-7 max-w-[5.5rem]"
                />
                <span className="text-xs text-zinc-500">k€</span>
              </span>
              . Ticket medio ponderado (opcional):{" "}
              <span className="inline-flex items-center gap-1 align-middle">
                <BudgetNumInput
                  aria-label="Ticket medio ponderado k€"
                  value={b.ticketMedioPonderadoK}
                  onCommit={setBudgetTicketMedioPonderadoK}
                  className="inline-flex h-7 max-w-[5.5rem]"
                />
                <span className="text-xs text-zinc-500">k€</span>
              </span>
              .
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
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <BudgetNumInput
                        aria-label={`Ticket ${d.nombre}`}
                        value={b.ticketsPorDimension[d.id] ?? null}
                        onCommit={(v) => setBudgetDimensionTicket(d.id, v)}
                        className="max-w-[6rem]"
                      />
                      <span className="text-xs text-zinc-500">k€</span>
                    </div>
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
                <th className="px-4 py-3 text-right">FY27 (k€)</th>
                <th className="px-4 py-3 text-right">FY28 (k€)</th>
                <th className="px-4 py-3 text-right">FY29 (k€)</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              {budgetEscenariosProyectos.map((sc) => {
                const row = b.ingresosPorEscenario[sc.id];
                return (
                  <tr
                    key={sc.id}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/25"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-200">
                        {sc.etiqueta}
                      </span>
                      <p className="mt-0.5 text-[11px] text-zinc-600">
                        {sc.proyectosVendidos}
                      </p>
                    </td>
                    {(["fy27", "fy28", "fy29"] as const).map((yr) => (
                      <td key={yr} className="px-2 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <BudgetNumInput
                            aria-label={`${sc.etiqueta} ${yr} k€`}
                            value={row?.[yr] ?? null}
                            onCommit={(v) =>
                              setBudgetIngresoEscenario(sc.id, yr, v)
                            }
                          />
                          <span className="text-xs text-zinc-500">k€</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mb-3 mt-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <CalendarRange className="size-3.5 text-emerald-400/80" />
          FTE implícitos por escenario
          {factK != null && factK > 0
            ? ` (ingresos ÷ ${factK} k€/FTE·año)`
            : " (indicar facturación / FTE arriba)"}
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
              {budgetEscenariosProyectos.map((sc) => {
                const row = b.ingresosPorEscenario[sc.id];
                return (
                  <tr
                    key={sc.id}
                    className="border-b border-zinc-800/70 last:border-0 hover:bg-zinc-800/25"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-zinc-200">
                        {sc.etiqueta}
                      </span>
                      <p className="mt-0.5 text-[11px] text-zinc-600">
                        {sc.proyectosVendidos}
                      </p>
                    </td>
                    {(["fy27", "fy28", "fy29"] as const).map((yr) => {
                      const ing = row?.[yr];
                      const fte =
                        ing != null && factK != null && factK > 0
                          ? fteImplicitoDesdeIngresosK(ing, factK)
                          : null;
                      return (
                        <td
                          key={yr}
                          className="px-4 py-3 text-right tabular-nums text-amber-200/90"
                        >
                          {fte != null ? `${formatFteEs(fte)} FTE` : "—"}
                        </td>
                      );
                    })}
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
