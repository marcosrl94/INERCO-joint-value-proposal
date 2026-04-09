import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clampBudgetNumber,
  createDefaultSession,
  loadSession,
  saveSession,
  type WorkshopSessionV1,
  type LineScore,
  SCORE_MIN,
  SCORE_MAX,
  FIT_MIN,
  FIT_MAX,
  SUSCEPTIBILITY_MIN,
  SUSCEPTIBILITY_MAX,
} from "@/workshop/state/workshopSession";

export type WorkshopSessionApi = {
  session: WorkshopSessionV1;
  setDecision: (id: string, value: string) => void;
  setServiceLineScore: (
    serviceId: string,
    field: keyof LineScore,
    value: number
  ) => void;
  setPdvRowScore: (
    pdvId: string,
    field: keyof LineScore,
    value: number
  ) => void;
  setSectorFit: (serviceId: string, sectorId: string, value: number) => void;
  setGeoFit: (serviceId: string, geoId: string, value: number) => void;
  setPieceSusceptibility: (
    serviceId: string,
    pieceId: string,
    value: number
  ) => void;
  setBudgetPersonas: (
    part: "nfq" | "inerco",
    field: "fte" | "costeMedioK",
    value: number | null
  ) => void;
  setBudgetFacturacionPorFteK: (value: number | null) => void;
  setBudgetTicketMedioPonderadoK: (value: number | null) => void;
  setBudgetDimensionTicket: (dimensionId: string, value: number | null) => void;
  setBudgetIngresoEscenario: (
    escenarioId: string,
    year: "fy27" | "fy28" | "fy29",
    value: number | null
  ) => void;
  resetScores: () => void;
  reload: () => void;
  persist: (s: WorkshopSessionV1) => void;
};

const WorkshopSessionContext = createContext<WorkshopSessionApi | null>(null);

function useWorkshopSessionState(): WorkshopSessionApi {
  const [session, setSession] = useState<WorkshopSessionV1>(() =>
    loadSession()
  );

  const patchSession = useCallback(
    (fn: (prev: WorkshopSessionV1) => WorkshopSessionV1) => {
      setSession((prev) => {
        const next = fn(prev);
        saveSession(next);
        return next;
      });
    },
    []
  );

  const setDecision = useCallback(
    (id: string, value: string) => {
      patchSession((prev) => ({
        ...prev,
        decisions: { ...prev.decisions, [id]: value },
      }));
    },
    [patchSession]
  );

  const setServiceLineScore = useCallback(
    (serviceId: string, field: keyof LineScore, value: number) => {
      const v = Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.round(value)));
      patchSession((prev) => {
        const p = prev.scoresByServiceLine[serviceId] ?? {
          maturity: 3,
          relevance: 3,
        };
        return {
          ...prev,
          scoresByServiceLine: {
            ...prev.scoresByServiceLine,
            [serviceId]: { ...p, [field]: v },
          },
        };
      });
    },
    [patchSession]
  );

  const setPdvRowScore = useCallback(
    (pdvId: string, field: keyof LineScore, value: number) => {
      const v = Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.round(value)));
      patchSession((prev) => {
        const p = prev.scoresByPdvRow[pdvId] ?? {
          maturity: 3,
          relevance: 3,
        };
        return {
          ...prev,
          scoresByPdvRow: {
            ...prev.scoresByPdvRow,
            [pdvId]: { ...p, [field]: v },
          },
        };
      });
    },
    [patchSession]
  );

  const setSectorFit = useCallback(
    (serviceId: string, sectorId: string, value: number) => {
      const v = Math.min(FIT_MAX, Math.max(FIT_MIN, Math.round(value)));
      patchSession((prev) => {
        const row = { ...(prev.fitByServiceAndSector[serviceId] ?? {}) };
        if (v === 0) delete row[sectorId];
        else row[sectorId] = v;
        return {
          ...prev,
          fitByServiceAndSector: {
            ...prev.fitByServiceAndSector,
            [serviceId]: row,
          },
        };
      });
    },
    [patchSession]
  );

  const setGeoFit = useCallback(
    (serviceId: string, geoId: string, value: number) => {
      const v = Math.min(FIT_MAX, Math.max(FIT_MIN, Math.round(value)));
      patchSession((prev) => {
        const row = { ...(prev.fitByServiceAndGeo[serviceId] ?? {}) };
        if (v === 0) delete row[geoId];
        else row[geoId] = v;
        return {
          ...prev,
          fitByServiceAndGeo: {
            ...prev.fitByServiceAndGeo,
            [serviceId]: row,
          },
        };
      });
    },
    [patchSession]
  );

  const setPieceSusceptibility = useCallback(
    (serviceId: string, pieceId: string, value: number) => {
      const v = Math.min(
        SUSCEPTIBILITY_MAX,
        Math.max(SUSCEPTIBILITY_MIN, Math.round(value))
      );
      patchSession((prev) => {
        const line = {
          ...(prev.susceptibilityByServiceLine[serviceId] ?? {}),
        };
        line[pieceId] = v;
        return {
          ...prev,
          susceptibilityByServiceLine: {
            ...prev.susceptibilityByServiceLine,
            [serviceId]: line,
          },
        };
      });
    },
    [patchSession]
  );

  const setBudgetPersonas = useCallback(
    (
      part: "nfq" | "inerco",
      field: "fte" | "costeMedioK",
      value: number | null
    ) => {
      const nextVal = value === null ? null : clampBudgetNumber(value);
      patchSession((prev) => {
        const b = prev.budget;
        const cur = b[part];
        return {
          ...prev,
          budget: {
            ...b,
            [part]: { ...cur, [field]: nextVal },
          },
        };
      });
    },
    [patchSession]
  );

  const setBudgetFacturacionPorFteK = useCallback(
    (value: number | null) => {
      const nextVal = value === null ? null : clampBudgetNumber(value);
      patchSession((prev) => ({
        ...prev,
        budget: { ...prev.budget, facturacionPorFteK: nextVal },
      }));
    },
    [patchSession]
  );

  const setBudgetTicketMedioPonderadoK = useCallback(
    (value: number | null) => {
      const nextVal = value === null ? null : clampBudgetNumber(value);
      patchSession((prev) => ({
        ...prev,
        budget: { ...prev.budget, ticketMedioPonderadoK: nextVal },
      }));
    },
    [patchSession]
  );

  const setBudgetDimensionTicket = useCallback(
    (dimensionId: string, value: number | null) => {
      const nextVal = value === null ? null : clampBudgetNumber(value);
      patchSession((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          ticketsPorDimension: {
            ...prev.budget.ticketsPorDimension,
            [dimensionId]: nextVal,
          },
        },
      }));
    },
    [patchSession]
  );

  const setBudgetIngresoEscenario = useCallback(
    (
      escenarioId: string,
      year: "fy27" | "fy28" | "fy29",
      value: number | null
    ) => {
      const nextVal = value === null ? null : clampBudgetNumber(value);
      patchSession((prev) => {
        const row = prev.budget.ingresosPorEscenario[escenarioId] ?? {
          fy27: null,
          fy28: null,
          fy29: null,
        };
        return {
          ...prev,
          budget: {
            ...prev.budget,
            ingresosPorEscenario: {
              ...prev.budget.ingresosPorEscenario,
              [escenarioId]: { ...row, [year]: nextVal },
            },
          },
        };
      });
    },
    [patchSession]
  );

  const resetScores = useCallback(() => {
    if (
      !confirm(
        "¿Restablecer puntuaciones (líneas de oferta, piezas de propuesta y cruces mercado)? Las decisiones en texto se mantienen."
      )
    )
      return;
    const fresh = createDefaultSession();
    patchSession((prev) => ({
      ...prev,
      scoresByServiceLine: fresh.scoresByServiceLine,
      scoresByPdvRow: fresh.scoresByPdvRow,
      susceptibilityByServiceLine: fresh.susceptibilityByServiceLine,
      fitByServiceAndSector: {},
      fitByServiceAndGeo: {},
      budget: prev.budget,
    }));
  }, [patchSession]);

  const reload = useCallback(() => {
    setSession(loadSession());
  }, []);

  const persist = useCallback((s: WorkshopSessionV1) => {
    setSession(s);
    saveSession(s);
  }, []);

  return useMemo(
    () => ({
      session,
      setDecision,
      setServiceLineScore,
      setPdvRowScore,
      setSectorFit,
      setGeoFit,
      setPieceSusceptibility,
      setBudgetPersonas,
      setBudgetFacturacionPorFteK,
      setBudgetTicketMedioPonderadoK,
      setBudgetDimensionTicket,
      setBudgetIngresoEscenario,
      resetScores,
      reload,
      persist,
    }),
    [
      session,
      setDecision,
      setServiceLineScore,
      setPdvRowScore,
      setSectorFit,
      setGeoFit,
      setPieceSusceptibility,
      setBudgetPersonas,
      setBudgetFacturacionPorFteK,
      setBudgetTicketMedioPonderadoK,
      setBudgetDimensionTicket,
      setBudgetIngresoEscenario,
      resetScores,
      reload,
      persist,
    ]
  );
}

export function WorkshopSessionProvider({ children }: { children: ReactNode }) {
  const value = useWorkshopSessionState();
  return (
    <WorkshopSessionContext.Provider value={value}>
      {children}
    </WorkshopSessionContext.Provider>
  );
}

export function useWorkshopSession(): WorkshopSessionApi {
  const ctx = useContext(WorkshopSessionContext);
  if (!ctx) {
    throw new Error(
      "useWorkshopSession debe usarse dentro de WorkshopSessionProvider"
    );
  }
  return ctx;
}
