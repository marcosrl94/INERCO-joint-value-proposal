import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  decisionTags,
  proximosPasosInmediatos,
  proximosPasosPorPeriodo,
  serviceLines,
} from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { Input } from "@/components/ui/input";
import { useWorkshopSession } from "@/workshop/hooks/useWorkshopSession";
import { scrollToWorkshopBlock } from "@/workshop/lib/scrollToWorkshopBlock";
import {
  buildExportMarkdown,
  compositeScore,
} from "@/workshop/state/workshopSession";
import {
  CheckCircle2,
  ClipboardList,
  ListTodo,
  Sparkles,
} from "lucide-react";

const RESUMEN_NOTE_KEY = "workshop-nfq-inerco-resumen";

export function SummarySection() {
  const { session, setDecision } = useWorkshopSession();
  const [copied, setCopied] = useState(false);

  const topLines = serviceLines
    .map((s) => {
      const sc = session.scoresByServiceLine[s.id];
      return {
        id: s.id,
        title: s.title,
        composite: sc ? compositeScore(sc) : 3,
      };
    })
    .sort((a, b) => b.composite - a.composite)
    .slice(0, 5);

  const copyActa = useCallback(() => {
    let resumenNote = "";
    try {
      resumenNote = localStorage.getItem(RESUMEN_NOTE_KEY) ?? "";
    } catch {
      /* ignore */
    }
    const md = buildExportMarkdown(session, { resumenNote });
    void navigator.clipboard
      .writeText(md)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        window.prompt("Copie el texto manualmente:", md);
      });
  }, [session]);

  return (
    <SectionShell
      id="resumen"
      slideIndex={6}
      eyebrow="Cierre"
      title="Decisiones y acuerdos"
      description="Complete cada campo con el resultado consensuado. Las decisiones forman parte de la sesión guardada en este navegador; puede copiar un acta en Markdown al final."
    >
      <div className="mb-10 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 md:p-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90">
          <Sparkles className="size-3.5" aria-hidden />
          Síntesis de priorización (líneas de oferta)
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Ordenadas por media de madurez y relevancia en la sección Priorización.
        </p>
        <ol className="mt-4 space-y-2 text-sm text-zinc-300">
          {topLines.map((t, i) => (
            <li key={t.id} className="flex gap-2">
              <span className="font-mono text-xs text-zinc-500">{i + 1}.</span>
              <span>
                {t.title}
                <span className="ml-2 text-xs text-zinc-600">
                  ({t.composite.toFixed(1)})
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {decisionTags.map((d) => (
          <div
            key={d.id}
            className="rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-4 transition-colors hover:border-emerald-500/20"
          >
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              <CheckCircle2 className="size-3.5 text-emerald-500/90" />
              {d.label}
            </label>
            <Input
              value={session.decisions[d.id] ?? d.defaultValue}
              onChange={(e) => setDecision(d.id, e.target.value)}
              className="mt-3 border-zinc-700/80 bg-zinc-950/60 text-sm text-zinc-100 placeholder:text-zinc-600"
            />
          </div>
        ))}
      </div>

      <div
        id="proximos-pasos"
        className="mt-12 scroll-mt-32 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-5 md:p-6"
        aria-labelledby="proximos-pasos-heading"
      >
        <p
          id="proximos-pasos-heading"
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-300/90"
        >
          <ListTodo className="size-3.5" aria-hidden />
          Próximos pasos
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Ventana orientativa de 60–90 días para dejar acuerdos, modelo y pilotos por escrito. Los pasos de abajo son
          entregables verificables; asigne en la nota de cierre responsable y fecha por ítem.
        </p>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-wider text-amber-200/80">
          Inmediatos (post-reunión)
        </p>
        <ol className="mt-4 space-y-3">
          {proximosPasosInmediatos.map((p, i) => (
            <li
              key={p.id}
              className="flex gap-3 text-sm leading-relaxed text-zinc-300"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-amber-500/25 bg-amber-500/10 font-mono text-[11px] font-semibold tabular-nums text-amber-200/90">
                {i + 1}
              </span>
              <span className="min-w-0 pt-0.5">{p.texto}</span>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-[11px] font-semibold uppercase tracking-wider text-amber-200/80">
          Hoja de ruta 60–90 días
        </p>
        <div className="mt-5 space-y-8">
          {proximosPasosPorPeriodo.map((periodo) => (
            <section
              key={periodo.id}
              aria-labelledby={`${periodo.id}-title`}
            >
              <h3
                id={`${periodo.id}-title`}
                className="text-sm font-semibold text-zinc-200"
              >
                {periodo.titulo}
                <span className="ml-2 font-normal text-zinc-500">
                  · {periodo.ventana}
                </span>
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                {periodo.objetivo}
              </p>
              <ol className="mt-4 space-y-3">
                {periodo.items.map((item, i) => (
                  <li
                    key={item.id}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-amber-500/20 bg-zinc-950/40 font-mono text-[11px] font-semibold tabular-nums text-amber-200/70">
                      {i + 1}
                    </span>
                    <span className="min-w-0 pt-0.5">{item.texto}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-zinc-700 bg-zinc-950/50"
          onClick={() => scrollToWorkshopBlock("servicios")}
        >
          Volver a servicios
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-zinc-700 bg-zinc-950/50"
          onClick={() => scrollToWorkshopBlock("priorizacion")}
        >
          Ver priorización
        </Button>
        <Button
          type="button"
          className="bg-emerald-600 hover:bg-emerald-500"
          onClick={() => scrollToWorkshopBlock("budget")}
        >
          Revisar inversión
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="border border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
          onClick={copyActa}
        >
          <ClipboardList className="mr-2 size-4" aria-hidden />
          {copied ? "Acta copiada" : "Copiar acta (Markdown)"}
        </Button>
      </div>

      <EditableNote
        sectionId="resumen"
        label="Acta breve / próxima reunión"
        placeholder="Responsables, fechas, documentos a compartir…"
        className="mt-10"
      />
    </SectionShell>
  );
}
