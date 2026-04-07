import { useMemo, useState, type ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clientAccounts,
  clientsVsGtmCopy,
  primerosLeads,
  sectorReachFy2026,
  taxonomiaCompartida,
} from "@/workshop/data/workshopContent";
import type { LlegadaNivel } from "@/workshop/data/workshopContent";
import { SectionShell } from "@/workshop/components/SectionShell";
import { EditableNote } from "@/workshop/components/EditableNote";
import { cn } from "@/lib/utils";
import {
  Building2,
  ChevronDown,
  Cpu,
  Factory,
  HeartPulse,
  Landmark,
  Layers,
  LayoutGrid,
  MapPin,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  Zap,
} from "lucide-react";

const llegadaEtiqueta: Record<LlegadaNivel, string> = {
  "muy-alta": "muy alta",
  alta: "alta",
  media: "media",
  emergente: "emergente",
};

const clusterIcon: Record<string, ComponentType<{ className?: string }>> = {
  "energia-utilities": Zap,
  "infra-ingenieria": Building2,
  "telco-digital": Cpu,
  "retail-consumo": ShoppingBag,
  inmobiliario: Landmark,
  "salud-pharma": HeartPulse,
  "turismo-movilidad": Truck,
  "industrial-manufactura": Factory,
};

function reachMap() {
  return Object.fromEntries(sectorReachFy2026.map((r) => [r.id, r]));
}

function FitBadge({ fit }: { fit: "alto" | "medio" | "explorar" }) {
  const label =
    fit === "alto" ? "Fit alto" : fit === "medio" ? "Fit medio" : "Explorar";
  return (
    <Badge
      variant="outline"
      className={cn(
        "shrink-0 font-medium",
        fit === "alto" && "border-emerald-500/35 text-emerald-200",
        fit === "medio" && "border-amber-500/30 text-amber-200/90",
        fit === "explorar" && "border-zinc-600 text-zinc-400"
      )}
    >
      {label}
    </Badge>
  );
}

export function ClientsSection() {
  const byCluster = useMemo(reachMap, []);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(sectorReachFy2026.map((s) => s.id))
  );
  const [openFichas, setOpenFichas] = useState<Set<string>>(new Set());

  const toggleCluster = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleFicha = (id: string) => {
    setOpenFichas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredClients = useMemo(() => {
    return clientAccounts.filter((c) => selected.has(c.sectorClusterId));
  }, [selected]);

  const singleCluster = useMemo(() => {
    if (selected.size !== 1) return null;
    const id = [...selected][0];
    return sectorReachFy2026.find((r) => r.id === id) ?? null;
  }, [selected]);

  const selectAll = () =>
    setSelected(new Set(sectorReachFy2026.map((s) => s.id)));
  const clearAll = () => setSelected(new Set());

  return (
    <SectionShell
      id="clientes"
      eyebrow="02 · Mercado"
      title="Cartera y segmentos objetivo"
      description={clientsVsGtmCopy.bloque2rol}
    >
      <div className="mb-8 rounded-2xl border border-white/[0.07] bg-zinc-900/40 p-4">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
            <Layers className="size-5 text-emerald-400/90" />
          </div>
          <div className="min-w-0 space-y-2">
            <p className="text-sm font-medium text-zinc-200">
              Ocho segmentos para priorizar conversación
            </p>
            <p className="text-xs leading-relaxed text-zinc-500">
              {taxonomiaCompartida.macrosectores}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Filtrar por segmento
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-zinc-500 hover:text-zinc-300"
              onClick={selectAll}
            >
              Todas
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-[11px] text-zinc-500 hover:text-zinc-300"
              onClick={clearAll}
            >
              Ninguna
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {sectorReachFy2026.map((row) => {
            const Icon = clusterIcon[row.id] ?? LayoutGrid;
            const on = selected.has(row.id);
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => toggleCluster(row.id)}
                className={cn(
                  "group flex max-w-full flex-col gap-0.5 rounded-xl border px-3 py-2 text-left transition-all sm:max-w-[220px]",
                  on
                    ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.12)]"
                    : "border-zinc-800 bg-zinc-950/40 opacity-60 hover:opacity-100"
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon
                    className={cn(
                      "size-3.5 shrink-0",
                      on ? "text-emerald-300/90" : "text-zinc-600"
                    )}
                  />
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      on ? "text-emerald-100" : "text-zinc-500"
                    )}
                  >
                    {row.shortLabel}
                  </span>
                </span>
                <span className="pl-[22px] text-[10px] leading-tight text-zinc-500">
                  {row.cuentasCampaña} en cartera · llegada {llegadaEtiqueta[row.llegada]}
                </span>
              </button>
            );
          })}
        </div>
        {singleCluster ? (
          <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/[0.06] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-300/90">
              Perspectiva del segmento · {singleCluster.shortLabel}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              {singleCluster.gtmPuente}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-[11px] text-zinc-600">
            Seleccione un solo segmento para ver el comentario estratégico de ese cluster.
          </p>
        )}
        <p className="mt-2 text-[11px] text-zinc-600">
          Cifras orientativas de cuentas y contactos por segmento (campaña FY2026).
        </p>
      </div>

      {/* Cuentas objetivo — fichas expandibles */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-zinc-200">
            Cuentas de referencia
          </h3>
          <span className="text-[11px] text-zinc-600">
            {filteredClients.length} mostradas
          </span>
        </div>

        <ul className="space-y-3">
          {filteredClients.map((row) => {
            const cluster = byCluster[row.sectorClusterId];
            const open = openFichas.has(row.id);
            return (
              <li
                key={row.id}
                className="overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-900/35 transition-colors hover:border-zinc-700/90"
              >
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-medium text-zinc-100">{row.cliente}</h4>
                      <FitBadge fit={row.fitComercial} />
                    </div>
                    <p className="text-xs leading-relaxed text-sky-300/85">
                      {row.gtmPuenteCuenta}
                    </p>
                    {row.temaPdV ? (
                      <p className="text-[11px] text-violet-300/90">
                        <span className="text-zinc-600">Eje temático · </span>
                        {row.temaPdV}
                      </p>
                    ) : null}
                    <p className="text-xs text-zinc-500">{row.sector}</p>
                    {row.contactoReferencia ? (
                      <p className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <User className="size-3 shrink-0 text-zinc-600" />
                        {row.contactoReferencia}
                      </p>
                    ) : null}
                    <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin className="size-3.5 shrink-0 text-zinc-600" />
                      {row.geografia}
                    </p>
                    {cluster ? (
                      <p className="text-[11px] text-zinc-600">
                        <span className="text-zinc-500">Macro: </span>
                        {cluster.shortLabel}
                        <span className="text-zinc-700"> · </span>
                        <span className="italic">
                          en campaña, llegada {llegadaEtiqueta[cluster.llegada]} a nivel sector
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0 gap-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                    onClick={() => toggleFicha(row.id)}
                    aria-expanded={open}
                  >
                    {open ? "Ocultar ficha" : "Ver ficha"}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </Button>
                </div>

                {open ? (
                  <div className="space-y-4 border-t border-zinc-800/80 bg-zinc-950/40 px-4 py-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Relación previa
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {row.relacionPrevia}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Siguiente paso
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                        {row.siguientePaso}
                      </p>
                    </div>
                    {row.detalleFacilitacion ? (
                      <div className="rounded-lg border border-dashed border-zinc-700/80 bg-zinc-900/50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                          Notas de facilitación (sala)
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                          {row.detalleFacilitacion}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="border-t border-zinc-800/60 px-4 py-2 text-[11px] text-zinc-600 sm:hidden">
                    Pulsa “Ver ficha” para relación, siguiente paso y notas.
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {filteredClients.length === 0 ? (
          <p className="rounded-xl border border-dashed border-zinc-700 py-8 text-center text-sm text-zinc-500">
            Ningún macrosector seleccionado. Usa “Todas” o activa filtros.
          </p>
        ) : null}
      </div>

      {/* Leads destacados */}
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Sparkles className="size-4 text-amber-400/90" />
          <h3 className="text-sm font-semibold text-zinc-200">
            Primeros leads (destacado)
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {primerosLeads.map((lead) => {
            const cl =
              lead.sectorClusterId != null
                ? byCluster[lead.sectorClusterId]
                : undefined;
            return (
              <Card
                key={lead.id}
                className="border-amber-500/20 bg-gradient-to-br from-amber-500/[0.07] to-zinc-950/40"
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <CardTitle className="text-base text-zinc-100">
                      {lead.titulo}
                    </CardTitle>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {cl ? (
                        <Badge
                          variant="outline"
                          className="border-amber-500/25 text-amber-200/90"
                        >
                          {cl.shortLabel}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-zinc-400">
                  <p className="leading-relaxed">{lead.contexto}</p>
                  {lead.gtmPuente ? (
                    <p className="border-l-2 border-sky-500/40 pl-3 text-xs leading-relaxed text-sky-200/80">
                      {lead.gtmPuente}
                    </p>
                  ) : null}
                  <p className="text-xs text-zinc-500">
                    <span className="font-medium text-zinc-400">
                      Coordinación:{" "}
                    </span>
                    {lead.owner}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <EditableNote sectionId="clientes" className="mt-10" />
    </SectionShell>
  );
}
