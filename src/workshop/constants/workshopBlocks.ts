/** Orden de bloques en la navegación principal (modo presentación). */
export const WORKSHOP_NAV_BLOCKS = [
  { id: "servicios", label: "Oferta" },
  { id: "priorizacion", label: "Priorización" },
  { id: "clientes", label: "Mercado" },
  { id: "activos", label: "Activos" },
  { id: "gtm", label: "Comercial" },
  { id: "budget", label: "Inversión" },
] as const;

export type WorkshopNavBlockId = (typeof WORKSHOP_NAV_BLOCKS)[number]["id"];

export function isWorkshopNavBlockId(id: string): id is WorkshopNavBlockId {
  return WORKSHOP_NAV_BLOCKS.some((b) => b.id === id);
}

export const WORKSHOP_HERO_ID = "hero";
export const WORKSHOP_CLOSE_ID = "resumen";

export function navBlockIndex(id: string): number {
  return WORKSHOP_NAV_BLOCKS.findIndex((b) => b.id === id);
}

export function getNavBlockLabel(id: string): string | undefined {
  return WORKSHOP_NAV_BLOCKS.find((b) => b.id === id)?.label;
}
