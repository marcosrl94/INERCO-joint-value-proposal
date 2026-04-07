/**
 * Capacidad por parte (NFQ / INERCO) — parametrizable.
 * La “prioridad” visual del workshop no excluye dimensiones: todas se tratan en sesión;
 * el badge resume el equilibrio de capacidad y dónde reforzar.
 */

export type CapacityBand = "alta" | "media" | "reforzar";

export const capacityBandLabels: Record<
  CapacityBand,
  { label: string; hint: string }
> = {
  alta: {
    label: "Alta",
    hint: "Equipo, metodología y referencias listas para co-entregar en cliente.",
  },
  media: {
    label: "Media",
    hint: "Capacidad suficiente con refuerzo o especialización del otro socio.",
  },
  reforzar: {
    label: "A reforzar",
    hint: "Gaps explícitos a cerrar en el workshop (personas, IP, casos).",
  },
};

/** Clave `${nfq}-${inerco}` — lectura en sala */
export const lecturaConjuntaPorCapacidad: Record<
  string,
  { badge: string; resumen: string }
> = {
  "alta-alta": {
    badge: "Bilateral fuerte",
    resumen:
      "Capacidad alta en ambos lados: candidato natural a pilotos conjuntos y propuestas integradas.",
  },
  "alta-media": {
    badge: "NFQ en cabeza",
    resumen:
      "NFQ puede liderar narrativa y producto; INERCO refuerza modelo y evidencia técnica.",
  },
  "alta-reforzar": {
    badge: "Reforzar INERCO",
    resumen:
      "NFQ muy sólida; acordar en sala cómo movilizar más capacidad INERCO (equipo, casos, IP).",
  },
  "media-alta": {
    badge: "INERCO en cabeza",
    resumen:
      "Ingeniería y datos fuertes; NFQ aporta capa financiera, reporting y go-to-market.",
  },
  "media-media": {
    badge: "Equilibrado",
    resumen:
      "Ambos con capacidad media: definir owners y plantilla mínima de entrega conjunta.",
  },
  "media-reforzar": {
    badge: "Reforzar INERCO",
    resumen:
      "Encaje medio en NFQ; priorizar evidencias y staffing INERCO para no diluir riesgo.",
  },
  "reforzar-alta": {
    badge: "Reforzar NFQ",
    resumen:
      "INERCO muy fuerte; acotar qué capa añade NFQ (producto, reporting, datos) sin solaparse.",
  },
  "reforzar-media": {
    badge: "Reforzar NFQ",
    resumen:
      "INERCO tira del modelo; NFQ debe clarificar oferta y empaquetado comercial.",
  },
  "reforzar-reforzar": {
    badge: "Co-crear capacidad",
    resumen:
      "Ambos a reforzar en esta dimensión: tratarla igualmente en el workshop para decidir si PoC o descarte.",
  },
};

export function getJointCapacityReadout(
  capacityNfq: CapacityBand,
  capacityInerco: CapacityBand
) {
  const key = `${capacityNfq}-${capacityInerco}`;
  return (
    lecturaConjuntaPorCapacidad[key] ?? {
      badge: "Revisar matriz",
      resumen: "Combinación no mapeada; actualiza `lecturaConjuntaPorCapacidad`.",
    }
  );
}
