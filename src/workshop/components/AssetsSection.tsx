import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assetPocs, serviceLines } from "@/workshop/data/workshopContent";
import { useWorkshopSession } from "@/workshop/hooks/useWorkshopSession";
import { compositeScore } from "@/workshop/state/workshopSession";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { cn } from "@/lib/utils";
import {
  Cloud,
  ExternalLink,
  Gauge,
  Layers,
  LayoutList,
  Package,
  Timer,
  Users,
} from "lucide-react";

/** Misma orden y colores que `PortfolioMatrix` y la leyenda de priorización */
const SERVICE_LINE_PALETTE = [
  "bg-emerald-500/90",
  "bg-sky-500/90",
  "bg-violet-500/90",
  "bg-amber-500/90",
  "bg-rose-500/85",
  "bg-cyan-500/85",
  "bg-fuchsia-500/80",
  "bg-lime-500/85",
] as const;

function assetLinkedServiceLineId(assetId: string): string | null {
  if (assetId === "alquid") return "net-zero";
  if (assetId === "riesgo") return "riesgo-fisico";
  if (assetId === "csrd") return "sustainable-finance";
  return null;
}

function lineBadgeForAssetId(assetId: string): {
  catalogNumber: number;
  dotClass: string;
} | null {
  const lineId = assetLinkedServiceLineId(assetId);
  if (!lineId) return null;
  const idx = serviceLines.findIndex((s) => s.id === lineId);
  if (idx < 0) return null;
  return {
    catalogNumber: idx + 1,
    dotClass: SERVICE_LINE_PALETTE[idx % SERVICE_LINE_PALETTE.length],
  };
}

function PortfolioLineBadge({ assetId }: { assetId: string }) {
  const badge = lineBadgeForAssetId(assetId);
  if (!badge) return null;
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ring-2 ring-zinc-950",
        badge.dotClass
      )}
      aria-label={`Línea de oferta ${badge.catalogNumber} del portfolio`}
      title={`Encaje con línea de oferta ${badge.catalogNumber} (Priorización)`}
    >
      {badge.catalogNumber}
    </span>
  );
}

function ReferenciaLogo({ alt, logoUrl }: { alt: string; logoUrl?: string }) {
  const [ok, setOk] = useState(!!logoUrl);
  if (!logoUrl || !ok) {
    return (
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/10 text-sky-400">
        <Cloud className="size-5" aria-hidden />
      </span>
    );
  }
  return (
    <img
      src={logoUrl}
      alt={alt}
      width={44}
      height={44}
      className="size-11 shrink-0 rounded-xl border border-white/[0.08] bg-white object-contain p-1.5"
      onError={() => setOk(false)}
    />
  );
}

export function AssetsSection() {
  const { session } = useWorkshopSession();
  const [selectedId, setSelectedId] = useState(assetPocs[0].id);
  const selected = assetPocs.find((a) => a.id === selectedId) ?? assetPocs[0];
  const linkedLineId = assetLinkedServiceLineId(selected.id);
  const linkedLine = linkedLineId
    ? serviceLines.find((s) => s.id === linkedLineId)
    : undefined;
  const linkedScore = linkedLineId
    ? session.scoresByServiceLine[linkedLineId]
    : undefined;
  const linkedComposite =
    linkedScore != null ? compositeScore(linkedScore) : null;

  return (
    <SectionShell
      id="activos"
      slideIndex={3}
      eyebrow="04 · Activos"
      title="Activos y pruebas de concepto"
      description="Tres líneas de producto o prototipo priorizables en la colaboración. Cada ficha resume alcance, esfuerzo e industrialización; el bloque inferior sirve para acuerdos y próximos pasos."
    >
      <div className="mb-6 lg:hidden">
        <Label
          htmlFor="activo-poc"
          className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
        >
          <LayoutList className="size-3.5" aria-hidden />
          Activo / PoC
        </Label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger
            id="activo-poc"
            className="h-11 w-full border-zinc-700 bg-zinc-950/80 text-left text-sm text-zinc-100"
          >
            <SelectValue placeholder="Elija un activo" />
          </SelectTrigger>
          <SelectContent className="border-zinc-700 bg-zinc-950">
            {assetPocs.map((a) => (
              <SelectItem key={a.id} value={a.id} className="text-sm">
                <span className="flex items-center gap-2.5">
                  <PortfolioLineBadge assetId={a.id} />
                  <span className="min-w-0">{a.title}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <nav
          className="hidden shrink-0 lg:block lg:w-[min(100%,280px)] lg:pt-1"
          aria-label="Activos y PoCs"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Líneas
          </p>
          <ul className="space-y-1 border-l border-zinc-800 pl-1">
            {assetPocs.map((a) => {
              const on = a.id === selectedId;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(a.id)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-r-lg border border-transparent py-2.5 pl-3 pr-2 text-left text-sm leading-snug transition-colors",
                      on
                        ? "border-sky-500/30 bg-sky-500/10 font-medium text-sky-100 shadow-[inset_3px_0_0_0_rgba(56,189,248,0.85)]"
                        : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                    )}
                  >
                    <PortfolioLineBadge assetId={a.id} />
                    <span className="min-w-0">{a.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 flex-1">
          <Card className="border-zinc-800/90 bg-zinc-900/35 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-colors hover:border-sky-500/20">
            <CardHeader className="gap-3 border-b border-white/[0.06] px-5 pb-6 pt-6 sm:px-8 sm:pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 md:text-xs">
                {selected.subtitle}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <PortfolioLineBadge assetId={selected.id} />
                  <CardTitle className="text-xl font-semibold leading-snug text-zinc-100 sm:text-2xl md:text-3xl md:leading-tight">
                    {selected.title}
                  </CardTitle>
                </div>
                {linkedLine && linkedComposite != null && linkedComposite >= 4 ? (
                  <Badge
                    variant="outline"
                    className="w-fit shrink-0 border-emerald-500/35 text-[11px] font-normal text-emerald-200/90"
                    title="Media madurez+relevancia en Priorización para la línea de oferta asociada"
                  >
                    Sesión: {linkedLine.title} ({linkedComposite.toFixed(1)})
                  </Badge>
                ) : null}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 px-5 pb-8 pt-6 text-sm text-zinc-400 sm:px-8 md:gap-8 md:text-base">
              {selected.previewProducto ? (
                <div className="rounded-xl border border-sky-500/20 bg-sky-500/[0.06] p-4 md:p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-400/90 md:mb-3 md:text-xs">
                    <Layers className="size-4" />
                    Preview
                  </p>
                  <p className="leading-relaxed text-zinc-300">
                    {selected.previewProducto}
                  </p>
                </div>
              ) : null}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                  <Package className="size-4" />
                  Qué demuestra
                </p>
                <p className="leading-relaxed">{selected.demuestra}</p>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                  <Users className="size-4" />
                  Tipo de cliente
                </p>
                <p className="leading-relaxed">{selected.tipoCliente}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4 md:p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-zinc-500 md:text-xs">
                    <Timer className="size-4" />
                    Esfuerzo estimado
                  </p>
                  <p className="text-zinc-300">{selected.esfuerzo}</p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4 md:p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-zinc-500 md:text-xs">
                    <Gauge className="size-4" />
                    Industrialización
                  </p>
                  <p className="text-zinc-300">{selected.industrializacion}</p>
                </div>
              </div>
              {selected.referenciasMercado?.length ? (
                <div className="border-t border-zinc-800/80 pt-6">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 md:text-xs">
                    Opción para riesgo físico (mercado)
                  </p>
                  <ul className="space-y-3">
                    {selected.referenciasMercado.map((ref) => (
                      <li key={ref.href}>
                        <a
                          href={ref.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex gap-4 rounded-xl border border-sky-500/15 bg-gradient-to-br from-sky-500/[0.07] to-zinc-950/40 p-4 transition-colors hover:border-sky-500/30 md:p-5"
                        >
                          <ReferenciaLogo alt={ref.nombre} logoUrl={ref.logoUrl} />
                          <div className="min-w-0 flex-1">
                            <span className="inline-flex items-center gap-1.5 font-heading text-base font-semibold text-sky-200/95 group-hover:text-sky-100 md:text-lg">
                              {ref.nombre}
                              <ExternalLink className="size-4 shrink-0 opacity-70" />
                            </span>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                              {ref.descripcion}
                            </p>
                            <p className="mt-2 font-mono text-[11px] text-zinc-600">
                              {new URL(ref.href).hostname.replace(/^www\./, "")}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {selected.enlaceExterno ? (
                <p className="border-t border-zinc-800/80 pt-6">
                  <a
                    href={selected.enlaceExterno.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-base font-medium text-sky-400/95 underline-offset-4 transition-colors hover:text-sky-300 hover:underline"
                  >
                    {selected.enlaceExterno.etiqueta}
                    <ExternalLink className="size-4 shrink-0 opacity-80" />
                  </a>
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
      <EditableNote sectionId="activos" className="mt-10" />
    </SectionShell>
  );
}
