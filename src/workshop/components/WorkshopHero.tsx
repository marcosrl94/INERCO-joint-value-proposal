import { Button } from "@/components/ui/button";
import { workshopMeta } from "@/workshop/data/workshopContent";
import { ArrowRight, ClipboardList, Sparkles } from "lucide-react";

const NFQ_LOGO = "/branding/nfq-logo.png";
const INERCO_LOGO = "/branding/inerco-logo.png";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface WorkshopHeroProps {
  onExecutiveSummary: () => void;
}

export function WorkshopHero({ onExecutiveSummary }: WorkshopHeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/[0.06] scroll-mt-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(59,130,246,0.06),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(260px,340px)] lg:gap-14 xl:gap-16">
          {/* Columna principal — copy (debajo del bloque marca en móvil) */}
          <div className="order-2 min-w-0 lg:order-1">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              <Sparkles className="size-3.5 text-emerald-400/90" aria-hidden />
              {workshopMeta.facilitacion}
            </div>

            <h1 className="max-w-4xl font-heading text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl md:leading-[1.1]">
              {workshopMeta.titulo}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              {workshopMeta.subtitulo}
            </p>

            <p className="mt-4 text-sm text-zinc-500">
              Sesión presencial · {workshopMeta.fechaSesion}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 gap-2 bg-emerald-600 text-white hover:bg-emerald-500"
                onClick={() => scrollToId("servicios")}
              >
                Empezar workshop
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-zinc-600 bg-zinc-900/50 text-zinc-100 hover:bg-zinc-800"
                onClick={onExecutiveSummary}
              >
                <ClipboardList className="size-4" />
                Ver resumen ejecutivo
              </Button>
            </div>
          </div>

          {/* Columna lateral — INERCO protagonista + NFQ (arriba en móvil, a la derecha en desktop) */}
          <aside
            className="order-1 lg:order-2 lg:pt-2"
            aria-label="Marcas NFQ e INERCO"
          >
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-white p-6 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)] ring-1 ring-black/[0.04] sm:p-8">
              <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-emerald-500/[0.07]" />
              <div className="relative flex flex-col items-center gap-6">
                <div className="flex w-full flex-col items-center">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Ingeniería & medio ambiente
                  </p>
                  <img
                    src={INERCO_LOGO}
                    alt="INERCO"
                    className="h-[4.25rem] w-auto max-w-full object-contain sm:h-[5rem]"
                    width={320}
                    height={120}
                    decoding="async"
                  />
                </div>

                <div
                  className="w-full border-t border-zinc-200/90"
                  role="presentation"
                />

                <div className="flex w-full flex-col items-center gap-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Consultoría financiera & ESG
                  </p>
                  <img
                    src={NFQ_LOGO}
                    alt="NFQ beyond consulting"
                    className="h-10 w-auto max-w-[min(100%,260px)] object-contain sm:h-11"
                    width={280}
                    height={100}
                    decoding="async"
                  />
                  <p className="text-center text-[11px] leading-relaxed text-zinc-500">
                    Joint workshop · definición de colaboración
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
