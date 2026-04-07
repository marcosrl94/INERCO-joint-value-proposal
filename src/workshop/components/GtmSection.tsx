import {
  campaignCorporatesFy2026,
  gtmHorizons,
  sectorReachFy2026,
  taxonomiaCompartida,
  type LlegadaNivel,
} from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  CalendarRange,
  Filter,
  Globe2,
  LineChart,
  Megaphone,
  Radar,
  Target,
} from "lucide-react";

const llegadaCopy: Record<
  LlegadaNivel,
  { label: string; className: string }
> = {
  "muy-alta": {
    label: "Llegada muy alta",
    className:
      "border-emerald-400/40 bg-emerald-500/15 text-emerald-100",
  },
  alta: {
    label: "Llegada alta",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200/95",
  },
  media: {
    label: "Llegada media",
    className: "border-zinc-600 bg-zinc-800/80 text-zinc-300",
  },
  emergente: {
    label: "Emergente",
    className: "border-zinc-700 bg-transparent text-zinc-500",
  },
};

export function GtmSection() {
  return (
    <SectionShell
      id="gtm"
      eyebrow="04 · Comercial"
      title="Plan comercial y priorización temporal"
      description="Campaña agregada por segmento, calendario por tramos (FY27 desde sep. 2026; jul. 2026 como arranque más pronto) y acciones comerciales asociadas."
    >
      <div className="mb-8 rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 text-xs leading-relaxed text-zinc-500">
        <p className="font-medium text-zinc-400">Priorización por segmento y tramo</p>
        <p className="mt-2">{taxonomiaCompartida.macrosectores}</p>
        <p className="mt-2">
          <span className="text-zinc-600">0–6 meses · </span>
          {taxonomiaCompartida.h1}
        </p>
        <p className="mt-1">
          <span className="text-zinc-600">6–12 meses · </span>
          {taxonomiaCompartida.h2}
        </p>
        <p className="mt-1">
          <span className="text-zinc-600">12–24 meses · </span>
          {taxonomiaCompartida.h3}
        </p>
      </div>

      {/* Campaña FY2026 — tabla por sector */}
      <div className="mb-14 rounded-2xl border border-zinc-800/90 bg-zinc-900/35 p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <Radar className="size-3.5 text-emerald-500/90" />
              {campaignCorporatesFy2026.titulo}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <span className="text-zinc-500">Fuente: </span>
              {campaignCorporatesFy2026.fuente}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3 text-xs">
            <div className="rounded-lg border border-white/[0.08] bg-zinc-950/60 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Cuentas (orden magnitud)
              </p>
              <p className="mt-0.5 font-mono text-sm text-zinc-200">
                {campaignCorporatesFy2026.totalesOrientativos.cuentasUnicas}
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-zinc-950/60 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Contactos (filas)
              </p>
              <p className="mt-0.5 font-mono text-sm text-zinc-200">
                {campaignCorporatesFy2026.totalesOrientativos.contactosTotales}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 border-t border-zinc-800/80 pt-4 text-xs leading-relaxed text-zinc-500">
          {campaignCorporatesFy2026.notaMetodologia}
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800/80">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/90 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  <th className="px-3 py-3">Sector (macro)</th>
                  <th className="px-3 py-3 text-right">Cuentas</th>
                  <th className="px-3 py-3 text-right">Contactos</th>
                  <th className="px-3 py-3">Profundidad</th>
                  <th className="px-3 py-3">Llegada</th>
                  <th className="px-3 py-3 min-w-[200px]">Alcance para GTM conjunto</th>
                  <th className="px-3 py-3 min-w-[180px]">Criba sugerida</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {sectorReachFy2026.map((row) => {
                  const L = llegadaCopy[row.llegada];
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-zinc-800/70 transition-colors hover:bg-zinc-800/35"
                    >
                      <td className="px-3 py-3 align-top font-medium text-zinc-100">
                        {row.sector}
                      </td>
                      <td className="px-3 py-3 align-top text-right tabular-nums text-zinc-400">
                        {row.cuentasCampaña}
                      </td>
                      <td className="px-3 py-3 align-top text-right tabular-nums text-zinc-400">
                        {row.contactosCampaña}
                      </td>
                      <td className="px-3 py-3 align-top text-zinc-500">
                        {row.profundidad}
                      </td>
                      <td className="px-3 py-3 align-top">
                        <Badge
                          variant="outline"
                          className={cn("font-medium", L.className)}
                        >
                          {L.label}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 align-top text-xs leading-relaxed text-zinc-400">
                        {row.alcance}
                      </td>
                      <td className="px-3 py-3 align-top text-xs leading-relaxed text-zinc-500">
                        <span className="inline-flex items-start gap-1.5">
                          <Filter className="mt-0.5 size-3 shrink-0 text-zinc-600" />
                          {row.criba}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 flex items-start gap-2 text-xs text-zinc-600">
          <BarChart3 className="mt-0.5 size-3.5 shrink-0 text-zinc-600" />
          <span>
            Los totales por sector no suman el 100 % del universo: hay cuentas
            transversales (holding, servicios) y contactos en revisión. La criba
            final debe cruzar <strong className="font-medium text-zinc-500">estado comercial</strong>,{" "}
            <strong className="font-medium text-zinc-500">temática</strong> y{" "}
            <strong className="font-medium text-zinc-500">encaje NFQ×INERCO</strong>.
          </span>
        </p>
      </div>

      {/* Línea temporal vertical + referencia a años naturales */}
      <div className="relative">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <CalendarRange className="size-3.5 text-emerald-500/90" />
              Línea temporal (priorización)
            </p>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-zinc-400">
              Referencia principal: <span className="text-zinc-300">inicio FY27 en sep. 2026</span>.
              Arranque más pronto posible: <span className="text-zinc-300">jul. 2026</span> (adelanta
              cada ventana ~dos meses).
            </p>
          </div>
        </div>

        {/* Ráil: meses (FY27 = sep. 2026) */}
        <div className="mb-10 overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-950/60">
          <div className="flex h-9 items-center border-b border-zinc-800/80 bg-zinc-900/50 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <span className="flex-1 text-center">2026</span>
            <span className="flex-1 text-center">2027</span>
            <span className="flex-1 text-center">2028</span>
          </div>
          <div className="grid min-h-[3.5rem] grid-cols-3 gap-px bg-zinc-800/80 p-px">
            <div
              className="flex flex-col justify-center bg-emerald-500/15 px-2 py-2 text-center"
              title="0–6 meses desde inicio FY27 (sep. 2026)"
            >
              <span className="text-[11px] font-semibold tabular-nums text-emerald-200/95">
                0–6 meses
              </span>
              <span className="text-[9px] leading-tight text-zinc-500">
                sep. 2026 – feb. 2027
              </span>
            </div>
            <div
              className="flex flex-col justify-center bg-amber-500/10 px-2 py-2 text-center"
              title="6–12 meses desde inicio FY27"
            >
              <span className="text-[11px] font-semibold tabular-nums text-amber-200/95">
                6–12 meses
              </span>
              <span className="text-[9px] leading-tight text-zinc-500">
                mar. – ago. 2027
              </span>
            </div>
            <div
              className="flex flex-col justify-center bg-sky-500/10 px-2 py-2 text-center"
              title="12–24 meses desde inicio FY27"
            >
              <span className="text-[11px] font-semibold tabular-nums text-sky-200/95">
                12–24 meses
              </span>
              <span className="text-[9px] leading-tight text-zinc-500">
                sep. 2027 – ago. 2028
              </span>
            </div>
          </div>
          <p className="border-t border-zinc-800/80 px-3 py-2 text-[10px] leading-relaxed text-zinc-600">
            FY27 arranca en <span className="text-zinc-500">sep. 2026</span>. Si todo se adelanta al
            máximo, usar <span className="text-zinc-500">jul. 2026</span> como mes cero (cada tramo se
            desplaza ~dos meses antes).
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-[52px] top-4 bottom-4 hidden w-px bg-gradient-to-b from-emerald-500/45 via-zinc-600/80 to-zinc-800 md:left-[76px] lg:block" />

          <ol className="relative space-y-0">
            {gtmHorizons.map((h, i) => (
              <li
                key={h.id}
                id={`gtm-${h.id}`}
                className="scroll-mt-28 relative flex gap-4 pb-12 last:pb-0 md:gap-6"
              >
                <div className="flex w-14 shrink-0 flex-col items-end pt-1 md:w-20">
                  <span className="rounded-md border border-zinc-700 bg-zinc-900/80 px-1.5 py-0.5 text-center font-mono text-[10px] font-semibold tabular-nums text-amber-200/90 md:text-[11px]">
                    {h.arcoAnual}
                  </span>
                  <span className="mt-1 hidden text-right text-[9px] leading-tight text-zinc-600 md:block">
                    Calendario
                  </span>
                </div>

                <div className="relative flex shrink-0 flex-col items-center pt-1.5">
                  <span className="relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-emerald-500/25 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                  <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950 text-[11px] font-bold text-zinc-400">
                    {i + 1}
                  </span>
                </div>

                <article className="min-w-0 flex-1 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 p-5 transition-all hover:border-emerald-500/20 md:p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                        {h.periodo}
                      </p>
                      <p className="mt-1 font-heading text-xl font-semibold text-zinc-100 md:text-2xl">
                        {h.meses}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-zinc-500 md:text-sm">
                        {h.ventanaCalendario}
                      </p>
                    </div>
                  </div>

                  <dl className="space-y-4 text-sm md:text-[15px]">
                <div>
                  <dt className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    <Globe2 className="size-3.5" />
                    Países prioritarios
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {h.paises.map((p) => (
                        <li
                          key={p}
                          className="rounded-md border border-white/[0.08] bg-zinc-950/60 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    <Target className="size-3.5" />
                    Segmentos
                  </dt>
                  <dd>
                    <ul className="space-y-1.5 text-zinc-400">
                      {h.segmentos.map((s) => (
                        <li key={s} className="flex gap-2">
                          <ArrowRight className="mt-0.5 size-3 shrink-0 text-zinc-600" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div>
                  <dt className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    <LineChart className="size-3.5" />
                    Oferta principal
                  </dt>
                  <dd className="leading-relaxed text-zinc-300">
                    {h.ofertaPrincipal}
                  </dd>
                </div>

                <div className="rounded-xl border border-sky-500/15 bg-sky-500/[0.06] p-3">
                  <dt className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-sky-300/90">
                    <Radar className="size-3.5" />
                    Lectura de alcance / llegada
                  </dt>
                  <dd className="leading-relaxed text-zinc-400">
                    {h.lecturaAlcance}
                  </dd>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-3">
                  <dt className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-emerald-400/90">
                    <Megaphone className="size-3.5" />
                    Acción comercial sugerida
                  </dt>
                  <dd className="leading-relaxed text-zinc-400">
                    {h.accionComercial}
                  </dd>
                </div>
              </dl>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <EditableNote sectionId="gtm" className="mt-10" />
    </SectionShell>
  );
}
