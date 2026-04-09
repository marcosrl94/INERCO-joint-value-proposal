import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { serviceLines } from "@/workshop/data/workshopContent";
import { useWorkshopSession } from "@/workshop/hooks/useWorkshopSession";
import { SCORE_MIN, SCORE_MAX } from "@/workshop/state/workshopSession";
import { SectionShell } from "@/workshop/components/SectionShell";
import { scrollToWorkshopBlock } from "@/workshop/lib/scrollToWorkshopBlock";
import { OfferDrillDownPanel } from "@/workshop/components/OfferDrillDownPanel";
import { PortfolioMatrix } from "@/workshop/components/PortfolioMatrix";
import { ServiceMarketCrossMatrix } from "@/workshop/components/ServiceMarketCrossMatrix";
import { Grid3x3, ListTree, MapPin, RotateCcw } from "lucide-react";

const FOCUS_SERVICE_EVENT = "workshop-focus-service";

function scrollToService(serviceId: string) {
  window.dispatchEvent(
    new CustomEvent(FOCUS_SERVICE_EVENT, { detail: serviceId })
  );
  scrollToWorkshopBlock("servicios");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document
        .getElementById(`service-line-${serviceId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

export function PrioritizationSection() {
  const {
    session,
    setServiceLineScore,
    setPieceSusceptibility,
    setSectorFit,
    setGeoFit,
    resetScores,
  } = useWorkshopSession();

  return (
    <SectionShell
      id="priorizacion"
      slideIndex={1}
      eyebrow="02 · Trabajo en sala"
      title="Priorización y cruces"
      description="Puntuad madurez y relevancia por línea de oferta; en Desglose, priorizad piezas de propuesta por susceptibilidad de integrar; completad el encaje con macrosectores y geografías del plan comercial. Los datos se guardan en este navegador."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          Madurez: listo para industrializar · Relevancia: encaje en portfolio
          conjunto.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-zinc-700 text-zinc-400"
          onClick={resetScores}
        >
          <RotateCcw className="mr-1.5 size-3.5" aria-hidden />
          Reset puntuaciones
        </Button>
      </div>

      <Tabs defaultValue="oferta" className="gap-6">
        <TabsList variant="line" className="w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="oferta" className="gap-1.5">
            <Grid3x3 className="size-3.5 opacity-70" aria-hidden />
            Oferta
          </TabsTrigger>
          <TabsTrigger value="desglose" className="gap-1.5">
            <ListTree className="size-3.5 opacity-70" aria-hidden />
            Desglose
          </TabsTrigger>
          <TabsTrigger value="mercado" className="gap-1.5">
            <MapPin className="size-3.5 opacity-70" aria-hidden />
            Cruce mercado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="oferta" className="space-y-10">
          <PortfolioMatrix
            serviceLines={serviceLines}
            scoresByServiceLine={session.scoresByServiceLine}
            onPointClick={(id) => scrollToService(id)}
          />

          <div className="grid gap-6 md:grid-cols-2">
            {serviceLines.map((s) => {
              const sc = session.scoresByServiceLine[s.id] ?? {
                maturity: 3,
                relevance: 3,
              };
              return (
                <div
                  key={s.id}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4"
                >
                  <p className="text-sm font-medium text-zinc-200">{s.title}</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-[11px] text-zinc-500">
                        <Label>Madurez ({SCORE_MIN}–{SCORE_MAX})</Label>
                        <span className="tabular-nums text-zinc-400">
                          {sc.maturity}
                        </span>
                      </div>
                      <Slider
                        min={SCORE_MIN}
                        max={SCORE_MAX}
                        step={1}
                        value={[sc.maturity]}
                        onValueChange={(v) =>
                          setServiceLineScore(s.id, "maturity", v[0] ?? 3)
                        }
                        aria-label={`Madurez para ${s.title}`}
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex justify-between text-[11px] text-zinc-500">
                        <Label>Relevancia ({SCORE_MIN}–{SCORE_MAX})</Label>
                        <span className="tabular-nums text-zinc-400">
                          {sc.relevance}
                        </span>
                      </div>
                      <Slider
                        min={SCORE_MIN}
                        max={SCORE_MAX}
                        step={1}
                        value={[sc.relevance]}
                        onValueChange={(v) =>
                          setServiceLineScore(s.id, "relevance", v[0] ?? 3)
                        }
                        aria-label={`Relevancia para ${s.title}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="desglose" className="space-y-4">
          <OfferDrillDownPanel
            serviceLines={serviceLines}
            scoresByServiceLine={session.scoresByServiceLine}
            susceptibilityByServiceLine={session.susceptibilityByServiceLine}
            setPieceSusceptibility={setPieceSusceptibility}
            onOpenServiceLine={scrollToService}
          />
        </TabsContent>

        <TabsContent value="mercado" className="space-y-10">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">
              Servicio × macrosector
            </h3>
            <ServiceMarketCrossMatrix
              mode="sector"
              fitByServiceAnd={session.fitByServiceAndSector}
              onChange={(serviceId, sectorId, value) =>
                setSectorFit(serviceId, sectorId, value)
              }
            />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">
              Servicio × geografía
            </h3>
            <ServiceMarketCrossMatrix
              mode="geo"
              fitByServiceAnd={session.fitByServiceAndGeo}
              onChange={(serviceId, geoId, value) =>
                setGeoFit(serviceId, geoId, value)
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </SectionShell>
  );
}
