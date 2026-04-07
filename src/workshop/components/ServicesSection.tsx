import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  pdvServiciosModelo,
  serviceLines,
  type PdvServicioRow,
} from "@/workshop/data/workshopContent";
import { getJointCapacityReadout } from "@/workshop/data/serviceCapacity";
import {
  CapacityMiniChips,
  JointCapacityBadge,
} from "@/workshop/components/ServiceCapacityBadges";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Building2,
  ChevronDown,
  ClipboardList,
  Cpu,
  FileSearch,
  Network,
  Sparkles,
  Table2,
} from "lucide-react";

function pdvRowsFor(ids: string[]): PdvServicioRow[] {
  return ids
    .map((id) => pdvServiciosModelo.find((r) => r.id === id))
    .filter((r): r is PdvServicioRow => r != null);
}

function PdvRowEmbed({ rows }: { rows: PdvServicioRow[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-lg border border-violet-500/20 bg-violet-500/[0.04]">
      <p className="flex items-center gap-2 border-b border-violet-500/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-violet-300/90">
        <Table2 className="size-3 shrink-0" aria-hidden />
        PdV — extracto (esta línea)
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-[11px]">
          <thead>
            <tr className="border-b border-zinc-800/90 bg-zinc-950/80 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
              <th className="px-2.5 py-2 align-bottom">Core</th>
              <th className="px-2.5 py-2 align-bottom text-emerald-400/85">INERCO</th>
              <th className="px-2.5 py-2 align-bottom text-sky-400/85">NFQ</th>
              <th className="px-2.5 py-2 align-bottom text-zinc-500">Herramienta</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-zinc-800/60 last:border-0"
              >
                <td className="align-top px-2.5 py-2.5 font-medium text-zinc-200">
                  {row.core}
                </td>
                <td className="align-top px-2.5 py-2.5 leading-relaxed text-zinc-400">
                  {row.servicioInerco}
                </td>
                <td className="align-top px-2.5 py-2.5 leading-relaxed text-zinc-400">
                  {row.servicioNfq}
                </td>
                <td className="align-top px-2.5 py-2.5 text-zinc-500">
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

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SectionShell
      id="servicios"
      eyebrow="Bloque 1"
      title="Servicios conjuntos"
      description="Cada tarjeta es una dimensión del workshop. La matriz PdV aparece solo como extracto dentro de la ficha que toca — no como bloque suelto. Activos y PoCs: Bloque 3."
    >
      <p className="mb-6 rounded-xl border border-white/[0.06] bg-zinc-900/40 px-4 py-3 text-xs leading-relaxed text-zinc-500">
        <Sparkles className="mr-1.5 inline size-3.5 text-emerald-400/90" />
        Badges de capacidad: fuente editable en{" "}
        <code className="rounded bg-zinc-800 px-1 py-0.5 text-[10px] text-zinc-400">
          serviceCapacity.ts
        </code>
        .
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {serviceLines.map((s) => {
          const open = openId === s.id;
          const lectura = getJointCapacityReadout(s.capacityNfq, s.capacityInerco);
          const pdvRows = pdvRowsFor(s.pdvRowIds);
          return (
            <Card
              key={s.id}
              className="group flex flex-col border-zinc-800/90 bg-zinc-900/35 transition-all duration-300 hover:border-emerald-500/25 hover:bg-zinc-900/60 hover:shadow-[0_0_0_1px_rgba(16,185,129,0.08)]"
            >
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-zinc-100">
                    {s.title}
                  </CardTitle>
                  <JointCapacityBadge
                    capacityNfq={s.capacityNfq}
                    capacityInerco={s.capacityInerco}
                  />
                </div>
                <CapacityMiniChips
                  capacityNfq={s.capacityNfq}
                  capacityInerco={s.capacityInerco}
                />
                <p className="text-[11px] leading-relaxed text-zinc-500">
                  {lectura.resumen}
                </p>
              </CardHeader>
              <CardContent className="mt-auto flex flex-1 flex-col space-y-4 text-sm text-zinc-400">
                <p className="leading-relaxed">{s.description}</p>

                <PdvRowEmbed rows={pdvRows} />

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.06] bg-zinc-950/50 p-3">
                    <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-400/90">
                      <Building2 className="size-3.5" />
                      INERCO (resumen)
                    </p>
                    <p className="leading-relaxed text-zinc-400">{s.inerco}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-zinc-950/50 p-3">
                    <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-400/90">
                      <Network className="size-3.5" />
                      NFQ (resumen)
                    </p>
                    <p className="leading-relaxed text-zinc-400">{s.nfq}</p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 w-full justify-between gap-2 border border-zinc-800/90 bg-zinc-950/40 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100",
                    open && "border-emerald-500/25 bg-emerald-500/5"
                  )}
                  onClick={() => setOpenId(open ? null : s.id)}
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-2 text-xs font-medium">
                    <ClipboardList className="size-3.5 text-emerald-500/90" />
                    {open ? "Cerrar ficha detallada" : "Abrir ficha detallada"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </Button>

                {open ? (
                  <div className="space-y-5 border-t border-zinc-800/80 pt-4">
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-sky-400/90">
                        <Network className="size-3.5" />
                        NFQ — propuesta de valor
                      </p>
                      <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-zinc-400">
                        {s.nfqPropuestaValor.map((line) => (
                          <li key={line.slice(0, 40)}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-sky-300/80">
                        <BookOpen className="size-3.5" />
                        NFQ — credenciales / foco
                      </p>
                      <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-zinc-400">
                        {s.nfqCredenciales.map((line) => (
                          <li key={line.slice(0, 40)}>{line}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
                      <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90">
                        <FileSearch className="size-3.5" />
                        INERCO — screening público (previo)
                      </p>
                      <p className="mb-3 text-[11px] italic leading-relaxed text-zinc-500">
                        {s.inercoScreeningPublico.fuente}
                      </p>
                      <ul className="list-inside list-disc space-y-1.5 text-xs leading-relaxed text-zinc-400">
                        {s.inercoScreeningPublico.senales.map((line) => (
                          <li key={line.slice(0, 40)}>{line}</li>
                        ))}
                      </ul>
                      <p className="mt-3 border-t border-emerald-500/10 pt-3 text-[11px] text-zinc-500">
                        <span className="font-medium text-zinc-400">
                          Guía para la sala:{" "}
                        </span>
                        {s.inercoScreeningPublico.sumUpPlaceholder}
                      </p>
                    </div>
                    <EditableNote
                      sectionId={`servicios-sumup-${s.id}`}
                      label="Sum-up en vivo (completar con INERCO)"
                      placeholder="Acuerdos, referencias concretas, gaps y owners…"
                    />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <EditableNote sectionId="servicios" className="mt-10" />
    </SectionShell>
  );
}
