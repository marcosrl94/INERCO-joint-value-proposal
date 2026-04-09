import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { serviceLines } from "@/workshop/data/workshopContent";
import { PdvRowEmbed, pdvRowsFor } from "@/workshop/components/PdvRowEmbed";
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
  FileSearch,
  Handshake,
  LayoutList,
  Network,
  Sparkles,
} from "lucide-react";

const FOCUS_SERVICE_EVENT = "workshop-focus-service";

export function ServicesSection() {
  const [selectedId, setSelectedId] = useState(serviceLines[0].id);
  const [detailOpen, setDetailOpen] = useState(false);

  const selected = serviceLines.find((s) => s.id === selectedId) ?? serviceLines[0];

  useEffect(() => {
    const onFocus = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (typeof id === "string" && serviceLines.some((s) => s.id === id)) {
        setSelectedId(id);
      }
    };
    window.addEventListener(FOCUS_SERVICE_EVENT, onFocus);
    return () => window.removeEventListener(FOCUS_SERVICE_EVENT, onFocus);
  }, []);

  useEffect(() => {
    setDetailOpen(false);
  }, [selectedId]);

  const lectura = getJointCapacityReadout(
    selected.capacityNfq,
    selected.capacityInerco
  );
  const pdvRows = pdvRowsFor(selected.pdvRowIds);

  return (
    <SectionShell
      id="servicios"
      slideIndex={0}
      eyebrow="01 · Oferta"
      title="Líneas de servicio conjunto"
      description="Seleccione una dimensión para ver propuesta conjunta, reparto INERCO/NFQ, extracto de la matriz de roles y el detalle desplegable. Las etiquetas de capacidad indican dónde cada parte aporta más peso relativo en esa línea."
    >
      <p className="mb-6 rounded-xl border border-white/[0.06] bg-zinc-900/40 px-4 py-3 text-xs leading-relaxed text-zinc-400 md:text-sm">
        <Sparkles className="mr-1.5 inline size-3.5 text-emerald-400/90" aria-hidden />
        Capacidad relativa por parte: alto, medio o a reforzar — útil para priorizar conversación y staffing en propuestas.
      </p>

      {/* Móvil: selector */}
      <div className="mb-6 lg:hidden">
        <Label
          htmlFor="servicio-linea"
          className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
        >
          <LayoutList className="size-3.5" aria-hidden />
          Línea de servicio
        </Label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger
            id="servicio-linea"
            className="h-11 w-full border-zinc-700 bg-zinc-950/80 text-left text-sm text-zinc-100"
          >
            <SelectValue placeholder="Elija una línea" />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-950">
            {serviceLines.map((s) => (
              <SelectItem key={s.id} value={s.id} className="text-sm">
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Desktop: menú lateral */}
        <nav
          className="hidden shrink-0 lg:block lg:w-[min(100%,280px)] lg:pt-1"
          aria-label="Líneas de servicio"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Líneas
          </p>
          <ul className="space-y-1 border-l border-zinc-800 pl-1">
            {serviceLines.map((s) => {
              const on = s.id === selectedId;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(s.id)}
                    className={cn(
                      "w-full rounded-r-lg border border-transparent py-2.5 pl-3 pr-2 text-left text-sm leading-snug transition-colors",
                      on
                        ? "border-emerald-500/30 bg-emerald-500/10 font-medium text-emerald-100 shadow-[inset_3px_0_0_0_rgba(16,185,129,0.85)]"
                        : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                    )}
                  >
                    {s.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Ficha única — ancho completo del panel */}
        <div
          className="min-w-0 flex-1 scroll-mt-32"
          id={`service-line-${selected.id}`}
        >
          <Card className="border-zinc-800/90 bg-zinc-900/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <CardHeader className="gap-4 px-5 pb-2 pt-6 sm:px-8 sm:pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <CardTitle className="text-lg font-semibold leading-snug text-zinc-100 sm:text-xl md:text-2xl md:leading-tight">
                  {selected.title}
                </CardTitle>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <JointCapacityBadge
                    capacityNfq={selected.capacityNfq}
                    capacityInerco={selected.capacityInerco}
                    className="max-w-none text-xs sm:text-sm"
                  />
                  <CapacityMiniChips
                    capacityNfq={selected.capacityNfq}
                    capacityInerco={selected.capacityInerco}
                    className="justify-end text-[11px] sm:text-xs"
                  />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500 md:text-base">
                {lectura.resumen}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6 px-5 pb-8 pt-2 text-sm text-zinc-400 sm:px-8 md:space-y-8 md:text-base">
              <p className="leading-relaxed">{selected.description}</p>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4 md:p-6">
                <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90 md:text-xs">
                  <Handshake className="size-4 shrink-0" aria-hidden />
                  Servicios tipo / proyecto conjunto
                </p>
                <p className="mb-4 text-sm leading-relaxed text-zinc-500 md:text-[15px]">
                  Ejemplos de alcance tipo que pueden licitarse o pilotarse de forma conjunta (más cercanos a un SOW que a la fila resumida de la matriz).
                </p>
                <ul className="space-y-3 border-t border-emerald-500/10 pt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                  {selected.serviciosTipoConjuntos.map((line) => (
                    <li key={line.slice(0, 48)} className="flex gap-3">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-500/80"
                        aria-hidden
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PdvRowEmbed rows={pdvRows} />

              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4 md:p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-400/90 md:mb-3 md:text-xs">
                    <Building2 className="size-4" />
                    INERCO (resumen)
                  </p>
                  <p className="leading-relaxed text-zinc-400">{selected.inerco}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4 md:p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-400/90 md:mb-3 md:text-xs">
                    <Network className="size-4" />
                    NFQ (resumen)
                  </p>
                  <p className="leading-relaxed text-zinc-400">{selected.nfq}</p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-11 w-full justify-between gap-2 border border-zinc-800/90 bg-zinc-950/40 px-4 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 md:h-12",
                  detailOpen && "border-emerald-500/25 bg-emerald-500/5"
                )}
                onClick={() => setDetailOpen((v) => !v)}
                aria-expanded={detailOpen}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <ClipboardList className="size-4 text-emerald-500/90" />
                  {detailOpen ? "Cerrar ficha detallada" : "Abrir ficha detallada"}
                </span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 transition-transform",
                    detailOpen && "rotate-180"
                  )}
                />
              </Button>

              {detailOpen ? (
                <div className="space-y-6 border-t border-zinc-800/80 pt-6 md:space-y-8 md:pt-8">
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-400/90 md:text-[11px]">
                      <Network className="size-4" />
                      NFQ — propuesta de valor
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {selected.nfqPropuestaValor.map((line) => (
                        <li key={line.slice(0, 40)}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-300/80 md:text-[11px]">
                      <BookOpen className="size-4" />
                      NFQ — credenciales y foco
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {selected.nfqCredenciales.map((line) => (
                        <li key={line.slice(0, 40)}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 md:p-6">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/90 md:text-[11px]">
                      <FileSearch className="size-4" />
                      INERCO — señales públicas (referencia)
                    </p>
                    <p className="mb-3 text-sm italic leading-relaxed text-zinc-500 md:text-base">
                      {selected.inercoScreeningPublico.fuente}
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-400 md:text-base">
                      {selected.inercoScreeningPublico.senales.map((line) => (
                        <li key={line.slice(0, 40)}>{line}</li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-emerald-500/10 pt-4 text-sm text-zinc-500 md:text-base">
                      <span className="font-medium text-zinc-400">
                        Mensaje clave:{" "}
                      </span>
                      {selected.inercoScreeningPublico.sumUpPlaceholder}
                    </p>
                  </div>
                  <EditableNote
                    sectionId={`servicios-sumup-${selected.id}`}
                    label="Notas de cierre (equipo)"
                    placeholder="Acuerdos, referencias, gaps y responsables…"
                  />
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
      <EditableNote sectionId="servicios" className="mt-10" />
    </SectionShell>
  );
}
