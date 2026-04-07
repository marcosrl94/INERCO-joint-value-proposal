import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assetPocs } from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { ExternalLink, Gauge, Layers, Package, Timer, Users } from "lucide-react";

export function AssetsSection() {
  return (
    <SectionShell
      id="activos"
      eyebrow="Bloque 3"
      title="Activos y pruebas de concepto"
      description="Tres activos: ALQUID (Net Zero), riesgo físico/transición (con integración LEAP/TNFD/cadena en el mismo marco) y suite de reporting CSRD en preparación. Ajustad alcance en la nota de sala."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {assetPocs.map((a) => (
          <Card
            key={a.id}
            className="group flex flex-col border-zinc-800/90 bg-zinc-900/35 transition-all duration-300 hover:border-sky-500/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
          >
            <CardHeader className="gap-1 border-b border-white/[0.04] pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {a.subtitle}
              </p>
              <CardTitle className="text-lg font-semibold leading-snug text-zinc-100">
                {a.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4 pt-4 text-sm text-zinc-400">
              {a.previewProducto ? (
                <div className="rounded-lg border border-sky-500/20 bg-sky-500/[0.06] p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-sky-400/90">
                    <Layers className="size-3.5" />
                    Preview
                  </p>
                  <p className="text-[13px] leading-relaxed text-zinc-300">
                    {a.previewProducto}
                  </p>
                </div>
              ) : null}
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  <Package className="size-3.5" />
                  Qué demuestra
                </p>
                <p className="leading-relaxed">{a.demuestra}</p>
              </div>
              {a.detalleAmpliado ? (
                <div className="rounded-lg border border-white/[0.06] bg-zinc-950/60 p-3">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                    Detalle
                  </p>
                  <p className="text-[13px] leading-relaxed text-zinc-400">
                    {a.detalleAmpliado}
                  </p>
                </div>
              ) : null}
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                  <Users className="size-3.5" />
                  Tipo de cliente
                </p>
                <p className="leading-relaxed">{a.tipoCliente}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/[0.06] bg-zinc-950/50 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-zinc-500">
                    <Timer className="size-3.5" />
                    Esfuerzo estimado
                  </p>
                  <p className="text-zinc-300">{a.esfuerzo}</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-zinc-950/50 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase text-zinc-500">
                    <Gauge className="size-3.5" />
                    Industrialización
                  </p>
                  <p className="text-zinc-300">{a.industrializacion}</p>
                </div>
              </div>
              {a.enlaceExterno ? (
                <p className="mt-auto border-t border-zinc-800/80 pt-3">
                  <a
                    href={a.enlaceExterno.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400/95 underline-offset-4 transition-colors hover:text-sky-300 hover:underline"
                  >
                    {a.enlaceExterno.etiqueta}
                    <ExternalLink className="size-3.5 shrink-0 opacity-80" />
                  </a>
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
      <EditableNote sectionId="activos" className="mt-10" />
    </SectionShell>
  );
}
