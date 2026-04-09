import {
  decisionTags,
  mercadoGeografias,
  pdvServiciosModelo,
  proximosPasosInmediatos,
  proximosPasosPorPeriodo,
  sectorReachFy2026,
  serviceLines,
  workshopMeta,
} from "@/workshop/data/workshopContent";

export const SESSION_STORAGE_KEY = "workshop-nfq-inerco-session";
const LEGACY_DECISIONS_KEY = "workshop-nfq-inerco-decisions";

export const SCORE_MIN = 1;
export const SCORE_MAX = 5;
/** Escala de encaje en cruces (0 = sin marcar / sin foco) */
export const FIT_MIN = 0;
export const FIT_MAX = 3;

/** Susceptibilidad de integrar cada pieza en la propuesta conjunta (0 = sin marcar, 1–3 = baja → alta) */
export const SUSCEPTIBILITY_MIN = 0;
export const SUSCEPTIBILITY_MAX = 3;

export interface LineScore {
  maturity: number;
  relevance: number;
}

/** Por línea de oferta: id de pieza → susceptibilidad 0–3 */
export type SusceptibilityByServiceLine = Record<string, Record<string, number>>;

export type WorkshopSessionV1 = {
  version: 1;
  decisions: Record<string, string>;
  scoresByServiceLine: Record<string, LineScore>;
  scoresByPdvRow: Record<string, LineScore>;
  susceptibilityByServiceLine: SusceptibilityByServiceLine;
  fitByServiceAndSector: Record<string, Record<string, number>>;
  fitByServiceAndGeo: Record<string, Record<string, number>>;
};

function defaultDecisions(): Record<string, string> {
  return Object.fromEntries(decisionTags.map((d) => [d.id, d.defaultValue]));
}

function defaultLineScores(): Record<string, LineScore> {
  const mid = Math.round((SCORE_MIN + SCORE_MAX) / 2);
  const base = { maturity: mid, relevance: mid };
  return Object.fromEntries(serviceLines.map((s) => [s.id, { ...base }]));
}

function defaultPdvScores(): Record<string, LineScore> {
  const mid = Math.round((SCORE_MIN + SCORE_MAX) / 2);
  const base = { maturity: mid, relevance: mid };
  return Object.fromEntries(pdvServiciosModelo.map((r) => [r.id, { ...base }]));
}

function defaultSusceptibilityByServiceLine(): SusceptibilityByServiceLine {
  return Object.fromEntries(
    serviceLines.map((s) => [
      s.id,
      Object.fromEntries(
        s.valuePropPieces.map((p) => [p.id, SUSCEPTIBILITY_MIN])
      ),
    ])
  );
}

export function createDefaultSession(): WorkshopSessionV1 {
  return {
    version: 1,
    decisions: defaultDecisions(),
    scoresByServiceLine: defaultLineScores(),
    scoresByPdvRow: defaultPdvScores(),
    susceptibilityByServiceLine: defaultSusceptibilityByServiceLine(),
    fitByServiceAndSector: {},
    fitByServiceAndGeo: {},
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v != null && typeof v === "object" && !Array.isArray(v);
}

function parseLineScore(v: unknown): LineScore | null {
  if (!isRecord(v)) return null;
  const m = v.maturity;
  const r = v.relevance;
  if (typeof m !== "number" || typeof r !== "number") return null;
  if (m < SCORE_MIN || m > SCORE_MAX || r < SCORE_MIN || r > SCORE_MAX)
    return null;
  return { maturity: m, relevance: r };
}

function clampScore(n: number): number {
  return Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.round(n)));
}

function clampFit(n: number): number {
  return Math.min(FIT_MAX, Math.max(FIT_MIN, Math.round(n)));
}

function clampSusceptibility(n: number): number {
  return Math.min(
    SUSCEPTIBILITY_MAX,
    Math.max(SUSCEPTIBILITY_MIN, Math.round(n))
  );
}

/** Migra JSON parcial o legacy a sesión completa y válida. */
export function normalizeSession(raw: unknown): WorkshopSessionV1 {
  const base = createDefaultSession();
  if (!isRecord(raw) || raw.version !== 1) {
    return base;
  }

  const out: WorkshopSessionV1 = { ...base, version: 1 };

  if (isRecord(raw.decisions)) {
    for (const d of decisionTags) {
      const val = raw.decisions[d.id];
      if (typeof val === "string") out.decisions[d.id] = val;
    }
  }

  if (isRecord(raw.scoresByServiceLine)) {
    for (const s of serviceLines) {
      const sc = parseLineScore(raw.scoresByServiceLine[s.id]);
      if (sc) out.scoresByServiceLine[s.id] = sc;
    }
  }

  if (isRecord(raw.scoresByPdvRow)) {
    for (const r of pdvServiciosModelo) {
      const sc = parseLineScore(raw.scoresByPdvRow[r.id]);
      if (sc) out.scoresByPdvRow[r.id] = sc;
    }
  }

  if (isRecord(raw.susceptibilityByServiceLine)) {
    for (const s of serviceLines) {
      const incoming = raw.susceptibilityByServiceLine[s.id];
      if (!isRecord(incoming)) continue;
      for (const p of s.valuePropPieces) {
        const v = incoming[p.id];
        if (typeof v === "number") {
          out.susceptibilityByServiceLine[s.id][p.id] =
            clampSusceptibility(v);
        }
      }
    }
  }

  if (isRecord(raw.fitByServiceAndSector)) {
    for (const s of serviceLines) {
      const row = raw.fitByServiceAndSector[s.id];
      if (!isRecord(row)) continue;
      for (const sec of sectorReachFy2026) {
        const f = row[sec.id];
        if (typeof f === "number" && f >= FIT_MIN && f <= FIT_MAX) {
          if (!out.fitByServiceAndSector[s.id]) out.fitByServiceAndSector[s.id] = {};
          out.fitByServiceAndSector[s.id][sec.id] = clampFit(f);
        }
      }
    }
  }

  if (isRecord(raw.fitByServiceAndGeo)) {
    for (const s of serviceLines) {
      const row = raw.fitByServiceAndGeo[s.id];
      if (!isRecord(row)) continue;
      for (const g of mercadoGeografias) {
        const f = row[g.id];
        if (typeof f === "number" && f >= FIT_MIN && f <= FIT_MAX) {
          if (!out.fitByServiceAndGeo[s.id]) out.fitByServiceAndGeo[s.id] = {};
          out.fitByServiceAndGeo[s.id][g.id] = clampFit(f);
        }
      }
    }
  }

  return out;
}

export function loadSession(): WorkshopSessionV1 {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      return normalizeSession(parsed);
    }
  } catch {
    /* ignore */
  }

  const session = createDefaultSession();
  try {
    const leg = localStorage.getItem(LEGACY_DECISIONS_KEY);
    if (leg) {
      const parsed = JSON.parse(leg) as unknown;
      if (isRecord(parsed)) {
        for (const d of decisionTags) {
          const v = parsed[d.id];
          if (typeof v === "string") session.decisions[d.id] = v;
        }
      }
    }
  } catch {
    /* ignore */
  }
  return session;
}

export function saveSession(session: WorkshopSessionV1): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    try {
      localStorage.setItem(LEGACY_DECISIONS_KEY, JSON.stringify(session.decisions));
    } catch {
      /* ignore */
    }
  } catch {
    /* ignore */
  }
}

export function compositeScore(line: LineScore): number {
  return (line.maturity + line.relevance) / 2;
}

export function topServiceLinesByComposite(
  scores: Record<string, LineScore>,
  n: number
): { id: string; title: string; score: number }[] {
  const ranked = serviceLines.map((s) => {
    const sc = scores[s.id] ?? { maturity: 3, relevance: 3 };
    return {
      id: s.id,
      title: s.title,
      score: compositeScore(sc),
    };
  });
  ranked.sort((a, b) => b.score - a.score);
  return ranked.slice(0, n);
}

export function buildExportMarkdown(
  session: WorkshopSessionV1,
  options?: { resumenNote?: string }
): string {
  const lines: string[] = [];
  lines.push(`# Acta workshop — ${workshopMeta.titulo}`);
  lines.push("");
  lines.push(`- **Fecha (contenido):** ${workshopMeta.fechaSesion}`);
  lines.push(`- **Generado:** ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push("## Decisiones");
  lines.push("");
  for (const d of decisionTags) {
    lines.push(`- **${d.label}:** ${session.decisions[d.id] ?? d.defaultValue}`);
  }
  lines.push("");
  lines.push("## Próximos pasos inmediatos");
  lines.push("");
  for (const p of proximosPasosInmediatos) {
    lines.push(`- ${p.texto}`);
  }
  lines.push("");
  lines.push("## Hoja de ruta 60–90 días");
  lines.push("");
  for (const periodo of proximosPasosPorPeriodo) {
    lines.push(`### ${periodo.titulo} (${periodo.ventana})`);
    lines.push("");
    lines.push(`*${periodo.objetivo}*`);
    lines.push("");
    for (const item of periodo.items) {
      lines.push(`- ${item.texto}`);
    }
    lines.push("");
  }
  lines.push("## Priorización — líneas de oferta (madurez / relevancia, 1–5)");
  lines.push("");
  lines.push("| Línea | Madurez | Relevancia |");
  lines.push("| --- | :---: | :---: |");
  for (const s of serviceLines) {
    const sc = session.scoresByServiceLine[s.id];
    lines.push(
      `| ${s.title} | ${sc?.maturity ?? "—"} | ${sc?.relevance ?? "—"} |`
    );
  }
  lines.push("");
  lines.push(
    "## Desglose — susceptibilidad de integrar piezas (0 = sin marcar; 1 = baja; 2 = media; 3 = alta)"
  );
  lines.push("");
  for (const s of serviceLines) {
    const row = session.susceptibilityByServiceLine[s.id];
    const parts: string[] = [];
    for (const p of s.valuePropPieces) {
      const v = row?.[p.id] ?? 0;
      if (v > 0) parts.push(`${p.label}: ${v}`);
    }
    if (parts.length) {
      lines.push(`### ${s.title}`);
      lines.push("");
      for (const line of parts) {
        lines.push(`- ${line}`);
      }
      lines.push("");
    }
  }
  lines.push("## Modelo PdV — puntuación por dimensión (1–5)");
  lines.push("");
  lines.push("| Dimensión (core) | Madurez | Relevancia |");
  lines.push("| --- | :---: | :---: |");
  for (const r of pdvServiciosModelo) {
    const sc = session.scoresByPdvRow[r.id];
    lines.push(
      `| ${r.core} | ${sc?.maturity ?? "—"} | ${sc?.relevance ?? "—"} |`
    );
  }
  lines.push("");
  lines.push("## Cruce servicio × sector (encaje 1–3, solo celdas marcadas)");
  lines.push("");
  for (const s of serviceLines) {
    const row = session.fitByServiceAndSector[s.id];
    if (!row || Object.keys(row).length === 0) continue;
    const parts: string[] = [];
    for (const sec of sectorReachFy2026) {
      const v = row[sec.id];
      if (v != null && v > 0) parts.push(`${sec.shortLabel}: ${v}`);
    }
    if (parts.length) lines.push(`- **${s.title}:** ${parts.join("; ")}`);
  }
  lines.push("");
  lines.push("## Cruce servicio × geografía (encaje 1–3, solo celdas marcadas)");
  lines.push("");
  for (const s of serviceLines) {
    const row = session.fitByServiceAndGeo[s.id];
    if (!row || Object.keys(row).length === 0) continue;
    const parts: string[] = [];
    for (const g of mercadoGeografias) {
      const v = row[g.id];
      if (v != null && v > 0) parts.push(`${g.label}: ${v}`);
    }
    if (parts.length) lines.push(`- **${s.title}:** ${parts.join("; ")}`);
  }
  if (options?.resumenNote?.trim()) {
    lines.push("");
    lines.push("## Notas de cierre");
    lines.push("");
    lines.push(options.resumenNote.trim());
  }
  lines.push("");
  return lines.join("\n");
}
