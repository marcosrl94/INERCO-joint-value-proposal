import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  decisionTags,
  proximosPasosInmediatos,
} from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ListTodo } from "lucide-react";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SummarySection() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(decisionTags.map((d) => [d.id, d.defaultValue]))
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("workshop-nfq-inerco-decisions");
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, string>;
        setValues((v) => ({ ...v, ...parsed }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("workshop-nfq-inerco-decisions", JSON.stringify(values));
    } catch {
      /* ignore */
    }
  }, [values]);

  return (
    <SectionShell
      id="resumen"
      eyebrow="Cierre"
      title="Decisiones a cerrar hoy"
      description="Editad inline los campos para reflejar lo acordado en sala. Se guardan localmente en este dispositivo."
    >
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
              value={values[d.id] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [d.id]: e.target.value }))
              }
              className="mt-3 border-zinc-700/80 bg-zinc-950/60 text-sm text-zinc-100 placeholder:text-zinc-600"
            />
          </div>
        ))}
      </div>

      <div
        id="proximos-pasos"
        className="mt-12 scroll-mt-28 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-5 md:p-6"
      >
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-amber-300/90">
          <ListTodo className="size-3.5" aria-hidden />
          Próximos pasos inmediatos
        </p>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500">
          Tras cerrar las decisiones de arriba, priorizar estas acciones en los días siguientes. Editad la lista en{" "}
          <code className="rounded bg-zinc-900 px-1 py-0.5 text-[10px] text-zinc-500">
            proximosPasosInmediatos
          </code>{" "}
          si el taller acuerda otro orden o redacción.
        </p>
        <ol className="mt-5 space-y-3">
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
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-zinc-700 bg-zinc-950/50"
          onClick={() => scrollToId("servicios")}
        >
          Volver a servicios
        </Button>
        <Button
          type="button"
          className="bg-emerald-600 hover:bg-emerald-500"
          onClick={() => scrollToId("budget")}
        >
          Revisar budget
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
