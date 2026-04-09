import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { ServiceLine, ValuePropPiece } from "@/workshop/data/workshopContent";
import type { LineScore } from "@/workshop/state/workshopSession";
import { SCORE_MAX, SUSCEPTIBILITY_MIN } from "@/workshop/state/workshopSession";
import { cn } from "@/lib/utils";
import { ExternalLink, SlidersHorizontal } from "lucide-react";

/** Misma orden que `PortfolioMatrix` y la leyenda bajo la matriz */
const PALETTE = [
  "bg-emerald-500/90",
  "bg-sky-500/90",
  "bg-violet-500/90",
  "bg-amber-500/90",
  "bg-rose-500/85",
  "bg-cyan-500/85",
  "bg-fuchsia-500/80",
  "bg-lime-500/85",
];

const SUSCEPTIBILITY_STEPS: {
  value: number;
  label: string;
  title: string;
}[] = [
  { value: 0, label: "—", title: "Sin marcar" },
  { value: 1, label: "Baja", title: "Baja susceptibilidad de integrar" },
  { value: 2, label: "Media", title: "Media susceptibilidad de integrar" },
  { value: 3, label: "Alta", title: "Alta susceptibilidad de integrar" },
];

interface OfferDrillDownPanelProps {
  serviceLines: ServiceLine[];
  scoresByServiceLine: Record<string, LineScore>;
  susceptibilityByServiceLine: Record<string, Record<string, number>>;
  setPieceSusceptibility: (
    serviceId: string,
    pieceId: string,
    value: number
  ) => void;
  onOpenServiceLine?: (serviceId: string) => void;
}

function linePriorityScore(sc: LineScore): number {
  return sc.relevance + sc.maturity;
}

/** Corta la línea Net Zero: antes del bloque S3·1–14, cat. 15, resto */
function partitionNetZeroPieces(pieces: ValuePropPiece[]) {
  const idxBundle = pieces.findIndex((p) => p.id === "nz-s3-cats-1-14");
  const idx15 = pieces.findIndex((p) => p.id === "nz-s3-cat-15");
  if (idxBundle === -1 || idx15 === -1) return null;
  return {
    before: pieces.slice(0, idxBundle),
    bundle1to14: pieces[idxBundle]!,
    cat15: pieces[idx15]!,
    after: pieces.slice(idx15 + 1),
  };
}

function PieceItemRow({
  as: Tag = "li",
  serviceId,
  piece,
  pieceMap,
  setPieceSusceptibility,
}: {
  as?: "li" | "div";
  serviceId: string;
  piece: ValuePropPiece;
  pieceMap: Record<string, number>;
  setPieceSusceptibility: OfferDrillDownPanelProps["setPieceSusceptibility"];
}) {
  const current = pieceMap[piece.id] ?? SUSCEPTIBILITY_MIN;
  const embedded = Tag === "div";
  return (
    <Tag
      className={cn(
        embedded
          ? "border-0 bg-transparent p-0"
          : "rounded-lg border border-zinc-800/70 bg-zinc-950/40 p-3 sm:p-4"
      )}
    >
      <div className="mb-3">
        <p className="text-sm font-medium text-zinc-200">{piece.label}</p>
        {piece.description ? (
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            {piece.description}
          </p>
        ) : null}
      </div>
      <div
        className="flex flex-wrap gap-1.5"
        role="radiogroup"
        aria-label={`Susceptibilidad: ${piece.label}`}
      >
        {SUSCEPTIBILITY_STEPS.map((step) => {
          const on = current === step.value;
          return (
            <button
              key={step.value}
              type="button"
              role="radio"
              aria-checked={on}
              title={step.title}
              onClick={() =>
                setPieceSusceptibility(serviceId, piece.id, step.value)
              }
              className={cn(
                "min-h-9 min-w-[2.75rem] rounded-md border px-2.5 text-xs font-medium transition-colors",
                on
                  ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-100"
                  : "border-zinc-700/80 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              )}
            >
              {step.label}
            </button>
          );
        })}
      </div>
    </Tag>
  );
}

function PiecesList({
  serviceId,
  pieces,
  pieceMap,
  setPieceSusceptibility,
}: {
  serviceId: string;
  pieces: ValuePropPiece[];
  pieceMap: Record<string, number>;
  setPieceSusceptibility: OfferDrillDownPanelProps["setPieceSusceptibility"];
}) {
  const netZero = serviceId === "net-zero";
  const groups = netZero ? partitionNetZeroPieces(pieces) : null;

  if (netZero && groups) {
    const { before, bundle1to14, cat15, after } = groups;
    return (
      <ul className="space-y-4">
        {before.map((p) => (
          <PieceItemRow
            key={p.id}
            serviceId={serviceId}
            piece={p}
            pieceMap={pieceMap}
            setPieceSusceptibility={setPieceSusceptibility}
          />
        ))}
        <li className="list-none">
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/[0.06] p-3 sm:p-4">
            <PieceItemRow
              as="div"
              serviceId={serviceId}
              piece={bundle1to14}
              pieceMap={pieceMap}
              setPieceSusceptibility={setPieceSusceptibility}
            />
          </div>
        </li>
        <li className="list-none">
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-3 sm:p-4">
            <PieceItemRow
              as="div"
              serviceId={serviceId}
              piece={cat15}
              pieceMap={pieceMap}
              setPieceSusceptibility={setPieceSusceptibility}
            />
          </div>
        </li>
        {after.map((p) => (
          <PieceItemRow
            key={p.id}
            serviceId={serviceId}
            piece={p}
            pieceMap={pieceMap}
            setPieceSusceptibility={setPieceSusceptibility}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4">
      {pieces.map((p) => (
        <PieceItemRow
          key={p.id}
          serviceId={serviceId}
          piece={p}
          pieceMap={pieceMap}
          setPieceSusceptibility={setPieceSusceptibility}
        />
      ))}
    </ul>
  );
}

export function OfferDrillDownPanel({
  serviceLines,
  scoresByServiceLine,
  susceptibilityByServiceLine,
  setPieceSusceptibility,
  onOpenServiceLine,
}: OfferDrillDownPanelProps) {
  const sortedLines = useMemo(() => {
    return [...serviceLines]
      .map((s, sourceOrder) => {
        const sc = scoresByServiceLine[s.id] ?? {
          maturity: 3,
          relevance: 3,
        };
        return {
          s,
          sourceOrder,
          priority: linePriorityScore(sc),
        };
      })
      .sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return a.sourceOrder - b.sourceOrder;
      });
  }, [serviceLines, scoresByServiceLine]);

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-zinc-500">
        Las <span className="text-zinc-400">líneas de oferta</span> se muestran por
        prioridad según lo marcado en la pestaña Oferta:{" "}
        <span className="text-zinc-400">relevancia + madurez</span> (mayor suma
        primero). Dentro de cada línea, indicad la{" "}
        <span className="text-zinc-400">susceptibilidad de integrar</span> cada pieza
        (baja → alta); sin marcar deja la pieza fuera del foco.
      </p>

      <div className="space-y-6">
        {sortedLines.map(({ s, priority, sourceOrder }) => {
          const sc = scoresByServiceLine[s.id] ?? {
            maturity: 3,
            relevance: 3,
          };
          const pieceMap = susceptibilityByServiceLine[s.id] ?? {};
          /** Índice 1…n en el catálogo de líneas (igual que la matriz / leyenda) */
          const catalogNumber = sourceOrder + 1;
          const dot = PALETTE[sourceOrder % PALETTE.length];

          return (
            <article
              key={s.id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex gap-3">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md ring-2 ring-zinc-950",
                      dot
                    )}
                    aria-hidden
                  >
                    {catalogNumber}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100 sm:text-base">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                      Prioridad Oferta (relevancia + madurez):{" "}
                      <span className="tabular-nums font-medium text-zinc-300">
                        {priority}
                      </span>
                      <span className="text-zinc-600"> / {SCORE_MAX * 2}</span>
                      {" · "}
                      Relevancia{" "}
                      <span className="tabular-nums text-zinc-400">
                        {sc.relevance}
                      </span>
                      {" · "}
                      Madurez{" "}
                      <span className="tabular-nums text-zinc-400">
                        {sc.maturity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  <SlidersHorizontal className="size-3.5" aria-hidden />
                  Piezas de propuesta — susceptibilidad de integrar
                </p>
                <PiecesList
                  serviceId={s.id}
                  pieces={s.valuePropPieces}
                  pieceMap={pieceMap}
                  setPieceSusceptibility={setPieceSusceptibility}
                />
              </div>

              {onOpenServiceLine ? (
                <div className="mt-4 flex justify-end border-t border-zinc-800/60 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-9 gap-1.5 text-xs text-zinc-400 hover:text-zinc-100"
                    onClick={() => onOpenServiceLine(s.id)}
                  >
                    Contexto en «Líneas de servicio»
                    <ExternalLink className="size-3.5 opacity-70" aria-hidden />
                  </Button>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-600">
        Escala: sin marcar, baja, media o alta susceptibilidad de integrar cada pieza
        en la propuesta conjunta. Las piezas se editan en el contenido del taller.
      </p>
    </div>
  );
}
