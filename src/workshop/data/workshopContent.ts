/**
 * Contenido editable del workshop NFQ × INERCO.
 * Modifica este archivo para adaptar textos, prioridades y datos de ejemplo.
 */

import type { CapacityBand } from "@/workshop/data/serviceCapacity";

/** Pieza desagregada de la propuesta de valor conjunta (priorización en pestaña Desglose) */
export interface ValuePropPiece {
  id: string;
  label: string;
  /** Contexto breve para la sala */
  description?: string;
}

export interface ServiceLine {
  id: string;
  title: string;
  description: string;
  /** Resumen en cara de ficha (1 frase cada parte) */
  inerco: string;
  nfq: string;
  /** Capacidad relativa por parte — alimenta badge y matriz parametrizable */
  capacityNfq: CapacityBand;
  capacityInerco: CapacityBand;
  /** Propuesta de valor NFQ (bullets) */
  nfqPropuestaValor: string[];
  /** Credenciales / foco NFQ (bullets) */
  nfqCredenciales: string[];
  /** Screening previo INERCO a partir de información pública (no exhaustivo) */
  inercoScreeningPublico: {
    fuente: string;
    senales: string[];
    /** Texto guía para completar en sala con INERCO */
    sumUpPlaceholder: string;
  };
  /** Ids de `pdvServiciosModelo` a mostrar como extracto embebido solo en esta ficha */
  pdvRowIds: string[];
  /**
   * Entregables / mandatos tipo conjuntos (vista joint aterrizada a proyecto),
   * más allá del extracto genérico de la matriz PdV.
   */
  serviciosTipoConjuntos: string[];
  /**
   * Piezas de propuesta evaluables en sala (susceptibilidad de integrar en oferta conjunta).
   */
  valuePropPieces: ValuePropPiece[];
}

/** Identificador de horizonte — mismo id que `gtmHorizons` */
export type GtmHorizonId = "h1" | "h2" | "h3";

export interface ClientAccount {
  id: string;
  cliente: string;
  /** Tipo de cuenta / sub-sector (texto libre, lectura humana) */
  sector: string;
  /** Mismo id que una fila de `sectorReachFy2026` — alineado con el GTM agregado */
  sectorClusterId: string;
  geografia: string;
  relacionPrevia: string;
  fitComercial: "alto" | "medio" | "explorar";
  siguientePaso: string;
  /** Contexto extra para la sala (solo visible al expandir “Ver ficha”) */
  detalleFacilitacion?: string;
  /** Una línea que engancha con oferta, país o prioridad comercial */
  gtmPuenteCuenta: string;
  /** Línea temática del PdV (ej. Estrategia, Cambio climático) */
  temaPdV?: string;
  /** Interlocutor conocido en cuenta (referencia PdV) */
  contactoReferencia?: string;
}

export interface LeadHighlight {
  id: string;
  titulo: string;
  contexto: string;
  owner: string;
  /** Coherencia con mapa GTM / cluster */
  sectorClusterId?: string;
  /** Cómo este lead conecta con la priorización comercial */
  gtmPuente?: string;
}

export interface AssetPoc {
  id: string;
  title: string;
  subtitle: string;
  demuestra: string;
  tipoCliente: string;
  esfuerzo: string;
  industrializacion: string;
  /** Enlace público al producto o landing */
  enlaceExterno?: { href: string; etiqueta: string };
  /** Vista previa / propuesta de valor en una frase */
  previewProducto?: string;
  /** Referencias de mercado opcionales (p. ej. proveedor para parte del alcance) */
  referenciasMercado?: {
    nombre: string;
    href: string;
    descripcion: string;
    /** Logo público (favicon o asset); la UI tiene fallback si no carga */
    logoUrl?: string;
  }[];
}

/** Nivel de “llegada”: profundidad de relación / multi-contacto en cartera FY2026 */
export type LlegadaNivel = "muy-alta" | "alta" | "media" | "emergente";

export interface SectorReachRow {
  id: string;
  /** Etiqueta corta para filtros — alineada conceptualmente con GTM */
  shortLabel: string;
  /** Frase puente hacia GTM (sin repetir la tabla de alcance) */
  gtmPuente: string;
  sector: string;
  /** Cuentas únicas con al menos un contacto en campaña (tras deduplicar entidad) */
  cuentasCampaña: number;
  /** Filas de contacto en el listado (incluye duplicados por cuenta) */
  contactosCampaña: number;
  /** Contactos medios por cuenta — proxy de profundidad */
  profundidad: string;
  llegada: LlegadaNivel;
  /** Cómo interpretamos el alcance para GTM conjunto */
  alcance: string;
  /** Criterio de criba lógica (no todas las cuentas entran al mismo bucket) */
  criba: string;
}

export interface CampaignCorporatesMeta {
  titulo: string;
  fuente: string;
  notaMetodologia: string;
  totalesOrientativos: {
    cuentasUnicas: string;
    contactosTotales: string;
  };
}

export interface GtmHorizon {
  id: string;
  periodo: string;
  meses: string;
  /** Ventana en calendario (meses; referencia FY27 = sep. 2026) */
  arcoAnual: string;
  /** Nota de arranque (jul. vs sep.) y lectura operativa */
  ventanaCalendario: string;
  paises: string[];
  segmentos: string[];
  ofertaPrincipal: string;
  accionComercial: string;
  /** Cómo leer alcance y llegada en este tramo */
  lecturaAlcance: string;
}

/** Metadatos del bloque personas — los valores numéricos se capturan en sesión */
export const budgetFteParams = {
  periodo: "Año 1 · acuerdo por definir en sesión",
  nota:
    "Unidad de todas las cifras editables de este bloque: miles de euros (k€); p. ej. 85 → 85.000 €, no euros sueltos. Variables: FTE por parte × coste medio (k€/FTE·año, carga equiparable) → inversión en personas (k€). Sirve de ancla frente a ingresos conjuntos e hipótesis de facturación por FTE más abajo. Rellenar en sala según finanzas de cada parte.",
} as const;

export function budgetInversionPersonasK(
  fte: number,
  costeK: number
): number {
  return Math.round(fte * costeK);
}

export interface ProjectVolumeScenario {
  id: string;
  etiqueta: string;
  proyectosVendidos: string;
  descripcion: string;
  implicacionInversion: string;
}

/** Dimensión de ingreso para ticket medio (valores k€ en sesión) */
export interface BudgetDimensionIngreso {
  id: string;
  nombre: string;
  nota?: string;
}

export const budgetDimensionesIngreso: BudgetDimensionIngreso[] = [
  {
    id: "net-zero-industrial",
    nombre: "Net Zero / industrial",
    nota: "SOW tipo: hoja de ruta, modelización, integración con activos.",
  },
  {
    id: "riesgo-fisico",
    nombre: "Riesgo físico / transición",
    nota: "Mayor componente datos y escenarios; proyectos algo mayores.",
  },
  {
    id: "reporting-finanzas",
    nombre: "Reporting / CSRD / marco regulatorio",
    nota: "Proyectos más acotados; repetición y producto.",
  },
  {
    id: "otros-mix",
    nombre: "Otros / mix sectorial",
    nota: "PoCs, diagnósticos, bundles con INERCO fuera del core.",
  },
];

/** FTE implícito = ingresos anuales conjuntos (k€) ÷ facturación de referencia por FTE (k€/FTE·año), ambos definidos en sesión */
export function fteImplicitoDesdeIngresosK(
  ingresosK: number,
  facturacionPorFteK: number
): number | null {
  if (
    !Number.isFinite(ingresosK) ||
    !Number.isFinite(facturacionPorFteK) ||
    facturacionPorFteK <= 0
  ) {
    return null;
  }
  return ingresosK / facturacionPorFteK;
}

export const budgetIngresosVisionNota =
  "Facturación conjunta anual en miles de euros (k€) por escenario de volumen: rellenar en sesión. Los FTE implícitos (tabla siguiente) = ingresos (k€) ÷ regla de facturación por FTE y año (k€/FTE·año), ambos acordados en sala. La base de personas (tabla superior) es independiente; en escenarios altos pueden valorarse refuerzos, partners o subcontratación.";

export interface DecisionTag {
  id: string;
  label: string;
  defaultValue: string;
}

export const workshopMeta = {
  titulo: "NFQ × INERCO | Modelo de colaboración conjunta",
  subtitulo:
    "Propuesta para integrar capacidades de ingeniería ambiental (INERCO) y asesoría financiera y ESG (NFQ): oferta conjunta, cartera objetivo, activos, plan comercial e inversión compartida.",
  fechaSesion: "Abril 2026",
  facilitacion: "Documento de trabajo confidencial · NFQ e INERCO",
};

/** Modelo PdV INERCO × NFQ — matriz Core / ingeniería / consultora / activo (extracto del documento de servicios) */
export interface PdvServicioRow {
  id: string;
  core: string;
  servicioInerco: string;
  servicioNfq: string;
  activoDigital?: string;
}

export const pdvServiciosModelo: PdvServicioRow[] = [
  {
    id: "estrategia",
    core: "Estrategia — planes directores",
    servicioInerco:
      "Diagnóstico técnico-operativo ESG, brechas en procesos, activos y cadena de valor, hojas de ruta de implantación realistas.",
    servicioNfq:
      "Framework estratégico, modelo de gobierno, KPIs, target operating model y priorización por impacto en riesgo, negocio, regulación y reporting.",
  },
  {
    id: "dd-esg",
    core: "ESG Due diligence",
    servicioInerco:
      "Due diligence técnica y ambiental sobre activos, instalaciones, operaciones, permisos, cumplimiento, pasivos y exposición operativa ESG.",
    servicioNfq:
      "Traducción de hallazgos a implicaciones económico-financieras, riesgos, contingencias, provisiones, covenant risk, valoración y plan de remediación.",
    activoDigital: "DNSH evaluator",
  },
  {
    id: "data-digital",
    core: "Data y transformación digital",
    servicioInerco:
      "Identificación del dato técnico de origen, fuentes operativas, métricas ambientales y sociales, criterios de calidad y trazabilidad.",
    servicioNfq:
      "Diseño del data model ESG, arquitectura funcional, workflows, controles, integración con ERP/riesgos/reporting y casos de uso digitales.",
    activoDigital: "Databricks, Snowflake (o equivalente)",
  },
  {
    id: "pdv-net-zero",
    core: "Cambio climático — Net Zero",
    servicioInerco:
      "Palancas técnicas de descarbonización por instalación, proceso o cadena: eficiencia, electrificación, combustibles, rediseño operativo y reducción real de emisiones.",
    servicioNfq:
      "Plan de transición, modelización económica y financiera Net Zero, integración en planificación, riesgos y reporting interno/externo.",
    activoDigital: "ALQUID Net Zero",
  },
  {
    id: "adaptacion",
    core: "Adaptación al cambio climático",
    servicioInerco:
      "Vulnerabilidad física de activos y operaciones, medidas de adaptación y priorización técnica.",
    servicioNfq:
      "Integración en mapas de riesgo, impacto financiero, escenarios, stress testing e inversiones de resiliencia.",
    activoDigital: "Climate X",
  },
  {
    id: "biodiv",
    core: "Biodiversidad — TNFD / SBTN",
    servicioInerco:
      "Aplicación de marcos TNFD/SBTN desde activo, territorio y operación; dependencias, impactos y presiones materiales.",
    servicioNfq:
      "Traducción a gobierno corporativo, indicadores, reporting, gestión de riesgo y priorización estratégica por sector o cartera.",
  },
  {
    id: "csrd",
    core: "Reporting — CSRD y normativas equivalentes",
    servicioInerco:
      "Identificación y robustecimiento del dato técnico de origen, métricas operativas y evidencias para disclosures ESG.",
    servicioNfq:
      "Modelo de reporting, doble materialidad, arquitectura de dato, controles, workflow de cierre y auditabilidad.",
    activoDigital: "ESG reporting suite",
  },
];

export const executiveSummaryBullets = [
  "Cerrar un portfolio inicial de servicios conjuntos alineado con regulación (CSRD, taxonomía, riesgo climático) y capacidad técnica INERCO.",
  "Priorizar sectores y cuentas con tracción o relación previa y acordar dos pruebas de concepto con potencial de repetición a 12–24 meses.",
  "Definir go-to-market por tramos temporales (0–6, 6–12 y 12–24 meses) con geografía, segmentos y acciones comerciales concretas.",
  "Acordar inversión mínima, reparto de roles y gobernanza entre NFQ e INERCO.",
];

export const serviceLines: ServiceLine[] = [
  {
    id: "net-zero",
    title: "Net Zero y transición industrial",
    description:
      "Hojas de ruta de descarbonización, escenarios y planes de inversión alineados con ciencia y regulación sectorial.",
    inerco:
      "Ingeniería de procesos, balances energéticos, medición y verificación, integración con activos industriales.",
    nfq:
      "Estrategia Net Zero, storytelling para financiación, KPIs para inversores y mercados de capital, integración con reporting.",
    capacityNfq: "alta",
    capacityInerco: "alta",
    nfqPropuestaValor: [
      "Conectar la narrativa de descarbonización con expectativas de inversores y supervisión (KPIs, capex, payback).",
      "Diseñar hojas de ruta “financiables”: hitos, gobernanza y reporting bajo CSRD/ESRS donde aplique.",
      "Empaquetar oferta conjunta con lenguaje de producto y riesgo, no solo técnico.",
    ],
    nfqCredenciales: [
      "Asesoría ESG y reporting a corporates (marco regulador europeo).",
      "Equipos que cruzan estrategia, datos y reporting para due diligence y emisiones vinculadas.",
      "Experiencia en acompañar transiciones con foco en materialidad y gobernanza.",
    ],
    inercoScreeningPublico: {
      fuente:
        "Screening previo no exhaustivo: posicionamiento público INERCO como grupo de ingeniería y medio ambiente, proyectos industriales y energía.",
      senales: [
        "Historial en ingeniería ambiental, eficiencia energética y soluciones en planta para sectores industriales y energéticos.",
        "Capacidad de despliegue en obra y operación (medición, verificación, optimización de procesos).",
        "Encaje natural con activos físicos donde la descarbonización es técnica y de inversión.",
      ],
      sumUpPlaceholder:
        "Completar con INERCO: referencias recientes, límites de capacidad por vertical y datos típicos que suelen aportar en diagnóstico Net Zero.",
    },
    pdvRowIds: ["pdv-net-zero"],
    serviciosTipoConjuntos: [
      "Diagnóstico y hoja de ruta Net Zero por activo o vertical (ingeniería + modelo económico-financiero).",
      "Inventarios y verificación de emisiones con trazabilidad hasta reporting y conversación con inversores.",
      "Escenarios de descarbonización (ALQUID / sensibilidades) integrados en capex, payback y narrativa corporativa.",
      "Acompañamiento en planes directores de sostenibilidad con priorización por impacto en riesgo y cadena de valor.",
    ],
    valuePropPieces: [
      {
        id: "nz-huella-op",
        label: "Cálculo de huella operacional (Scope 1/2)",
        description: "Inventarios, MRV y línea base operativa.",
      },
      {
        id: "nz-s3-cats-1-14",
        label: "Scope 3 · Categorías 1–14 (GHG Protocol)",
        description:
          "Bloque agregado: bienes y servicios adquiridos, bienes de capital, combustible y energía upstream, transporte y distribución up/downstream, residuos operativos, viajes y desplazamiento de empleados, arrendamientos, procesamiento y uso de productos vendidos, fin de vida, franquicias — una sola lectura de susceptibilidad para el conjunto.",
      },
      {
        id: "nz-s3-cat-15",
        label: "Scope 3 · Cat. 15 — Inversiones",
        description:
          "GHG Protocol: emisiones de inversiones y financiación (cartera, activos financieros, participadas).",
      },
      {
        id: "nz-plan-transicion",
        label: "Planes de transición",
        description: "Escenarios, gobierno e hitos ejecutables.",
      },
      {
        id: "nz-plan-descarb",
        label: "Planes de descarbonización",
        description: "Palancas técnicas, priorización y costes.",
      },
      {
        id: "nz-tcfd",
        label: "Reporting tipo TCFD / narrativa inversores",
        description: "Materialidad, KPIs y conversación con mercado de capitales.",
      },
    ],
  },
  {
    id: "riesgo-fisico",
    title: "Riesgo climático físico y de transición",
    description:
      "Evaluación de exposición física y de transición para activos, cadenas de suministro y decisiones de capex.",
    inerco:
      "Modelos técnicos, datos de emplazamiento, escenarios de estrés operativo y recomendaciones de mitigación/adaptación.",
    nfq:
      "Integración en marcos TCFD / IFRS, materialidad financiera, stress testing para comités de riesgo y fondos.",
    capacityNfq: "alta",
    capacityInerco: "media",
    nfqPropuestaValor: [
      "Traducir exposición física/transición a materialidad financiera y requisitos de reporte (incl. doble materialidad).",
      "Diseñar stress tests y narrativas para comités de riesgo y fondos.",
      "Alinear outputs técnicos con preguntas típicas de inversores y supervisión.",
    ],
    nfqCredenciales: [
      "Proyectos de integración de clima en gobierno corporativo y reporting.",
      "Trabajo con equipos de riesgos y finanzas en marcos TCFD / IFRS S2 (según contexto cliente).",
      "Capacidad de “puente” entre modelo técnico y capas financieras.",
    ],
    inercoScreeningPublico: {
      fuente:
        "Screening previo: INERCO como proveedor de estudios ambientales, ingeniería y soporte a instalaciones y proyectos.",
      senales: [
        "Fortaleza probable en datos de emplazamiento, obra y operación — inputs para escenarios de daño y disrupción.",
        "Experiencia sectorial en industria e infraestructuras donde el riesgo físico es localizado.",
        "Capacidad de recomendar medidas de adaptación/mitigación a nivel de activo.",
      ],
      sumUpPlaceholder:
        "Validar con INERCO: modelos propios vs datos externos, granularidad geográfica y tiempos de entrega típicos.",
    },
    pdvRowIds: ["adaptacion"],
    serviciosTipoConjuntos: [
      "Evaluación de riesgo físico y de transición por activo o cartera (datos técnicos + lectura financiera y de reporting).",
      "Stress tests y escenarios para comités de riesgos, materialidad y requisitos TCFD / IFRS S2.",
      "Integración de capas LEAP / TNFD / cadena (agua, biodiversidad, EUDR) en un único marco de riesgo cuando el perímetro lo exige.",
      "Climate X (u otras fuentes) como capa analítica alineada a preguntas de dirección y supervisión.",
    ],
    valuePropPieces: [
      {
        id: "rf-fisico",
        label: "Exposición y escenarios físicos",
        description: "Amenazas localizadas, daño y vulnerabilidad de activo.",
      },
      {
        id: "rf-transicion",
        label: "Riesgo de transición",
        description: "Política, mercado, tecnología y coste implícito de carbono.",
      },
      {
        id: "rf-stress",
        label: "Stress testing y escenarios",
        description: "Comités de riesgo, dirección y sensibilidades.",
      },
      {
        id: "rf-materialidad",
        label: "Materialidad financiera / IFRS S2",
        description: "Traducción técnica a impacto en cuentas y gobierno.",
      },
      {
        id: "rf-cadena",
        label: "Capas cadena / LEAP / TNFD (perímetro ampliado)",
        description: "Cuando el encaje exige agua, naturaleza o EUDR en el mismo marco.",
      },
    ],
  },
  {
    id: "biodiversidad",
    title: "Biodiversidad e impacto ambiental",
    description:
      "Medición de impactos, dependencias y riesgos; preparación para marcos emergentes (TNFD, LEAP, EUDR).",
    inerco:
      "Inventarios ambientales, estudios de línea base, soluciones de monitorización y cumplimiento sectorial.",
    nfq:
      "Diseño de métricas financieras, due diligence sostenible y reporting integrado en cadenas de valor.",
    capacityNfq: "media",
    capacityInerco: "alta",
    nfqPropuestaValor: [
      "Conectar biodiversidad y cadena de suministro con riesgo financiero, reporting y expectativas de inversores.",
      "Estructurar due diligence y gaps de datos para EUDR / TNFD según madurez del cliente.",
      "Priorizar qué evidencias “cuentan” para inversores y contratos.",
    ],
    nfqCredenciales: [
      "Asesoría en sostenibilidad aplicada a cadenas de valor y criterios de inversión.",
      "Experiencia en integración de criterios ambientales en procesos de compras y riesgo.",
    ],
    inercoScreeningPublico: {
      fuente:
        "Screening previo: INERCO en estudios ambientales, calidad ambiental y acompañamiento a proyectos con impacto en suelo y recursos.",
      senales: [
        "Línea base, inventarios y seguimiento ambiental como base para métricas de impacto.",
        "Encaje con sectores con presión territorial (industria, infra, agro perimetral).",
        "Capacidad técnica para propuestas de mitigación/compensación ligadas a obra y operación.",
      ],
      sumUpPlaceholder:
        "Completar con INERCO: experiencia TNFD/LEAP, datos de especies/uso del suelo y límites de alcance por proyecto.",
    },
    pdvRowIds: ["biodiv"],
    serviciosTipoConjuntos: [
      "Inventarios y línea base ambiental; dependencias e impactos TNFD / SBTN desde activo y territorio.",
      "Due diligence de biodiversidad y cadena con traducción a riesgo, contratos y reporting.",
      "Preparación de revelaciones y gobierno de datos para integrar naturaleza en CSRD / criterios de inversión.",
      "EUDR y trazabilidad de suministro con evidencias técnicas auditables.",
    ],
    valuePropPieces: [
      {
        id: "bio-linea-base",
        label: "Línea base e inventarios (TNFD / SBTN)",
        description: "Dependencias, impactos y presiones desde activo y territorio.",
      },
      {
        id: "bio-dd",
        label: "Due diligence biodiversidad y cadena",
        description: "Riesgo contractual, proveedores y evidencias.",
      },
      {
        id: "bio-reporting",
        label: "Reporting e integración en CSRD / inversión",
        description: "Gobernanza corporativa e indicadores materiales.",
      },
      {
        id: "bio-eudr",
        label: "EUDR y trazabilidad",
        description: "Georreferencia, masa crítica y controles.",
      },
    ],
  },
  {
    id: "sustainable-finance",
    title: "Reporting y cumplimiento ESG",
    description:
      "Reporting bajo CSRD / ESRS, gobierno del dato y controles; alineación con expectativas de inversores y supervisión.",
    inerco:
      "Evidencia técnica verificable, datos operativos y metodologías de cuantificación de impacto.",
    nfq:
      "Políticas de producto, second party opinions, data lineage y controles para cumplimiento normativo.",
    capacityNfq: "alta",
    capacityInerco: "media",
    nfqPropuestaValor: [
      "Diseñar marcos de datos y gobierno para reporting CSRD/ESRS con trazabilidad hasta fuente operativa.",
      "Estructura de KPIs, marcos verdes y diálogo con inversores y entidades supervisoras.",
      "Second party opinion y documentación para mercado de capitales.",
    ],
    nfqCredenciales: [
      "Equipo focalizado en ESG advisory y cumplimiento normativo europeo.",
      "Proyectos cruzando riesgo, datos y reporting corporativo.",
      "Experiencia en coordinación con legal, auditoría y negocio.",
    ],
    inercoScreeningPublico: {
      fuente:
        "Screening previo: INERCO como fuente de evidencia técnica y mediciones para sustentar cifras y metodologías.",
      senales: [
        "Habitual en cuantificación de impactos ambientales y huellas a nivel de instalación/proyecto.",
        "Aporta rigor metodológico para que el reporting no sea solo narrativa.",
        "Complementa equipos de sostenibilidad corporativa cuando faltan datos primarios.",
      ],
      sumUpPlaceholder:
        "Acordar con INERCO: SLAs de datos, validación y formatos de entrega para integrarse en informe anual.",
    },
    pdvRowIds: ["csrd", "data-digital"],
    serviciosTipoConjuntos: [
      "Análisis de doble materialidad y diseño del perímetro ESRS con fuentes operativas y controles.",
      "Reporting CSRD / memoria: arquitectura de datos, workflows de cierre y preparación para assurance.",
      "Posicionamiento en índices y ratings (p. ej. DJSI, Sustainalytics) con evidencia técnica verificable.",
      "Segunda opinión, marcos verdes y diálogo con inversores y supervisión apoyados en dato de planta.",
      "Cuando el encargo es de plataforma: data model ESG, integración ERP/riesgos y gobierno del dato.",
    ],
    valuePropPieces: [
      {
        id: "sf-materialidad",
        label: "Doble materialidad y perímetro ESRS",
        description: "Diseño de alcance, stakeholders y matriz de temas.",
      },
      {
        id: "sf-datos",
        label: "Arquitectura de datos y controles (CSRD)",
        description: "Lineage, workflows de cierre y preparación a assurance.",
      },
      {
        id: "sf-memoria",
        label: "Memoria / revelaciones y KPIs",
        description: "Estructura de información no financiera auditables.",
      },
      {
        id: "sf-ratings",
        label: "Índices, ratings y diálogo inversores",
        description: "DJSI, Sustainalytics, second party opinion donde aplique.",
      },
      {
        id: "sf-plataforma",
        label: "Plataforma / integración ERP–riesgos",
        description: "Cuando el mandato es sistemas y gobierno del dato.",
      },
    ],
  },
  {
    id: "due-diligence",
    title: "Due diligence, DNSH y taxonomía",
    description:
      "Evaluación de elegibilidad y alineación con taxonomía UE, DNSH y criterios sectoriales.",
    inerco:
      "Análisis técnicos de proyectos, pruebas de no-daño significativo y documentación de obra/operación.",
    nfq:
      "Marcos de elegibilidad, criterios de reporting y coordinación con equipos legales y de riesgos.",
    capacityNfq: "alta",
    capacityInerco: "alta",
    nfqPropuestaValor: [
      "Orquestar criterios de taxonomía y DNSH con controles documentales auditables.",
      "Coordinar legal, riesgo y sostenibilidad con un único hilo de preguntas y evidencias.",
      "Traducir requisitos normativos a checklist operativo para proyecto/activo.",
    ],
    nfqCredenciales: [
      "Asesoría en marcos regulatorios de sostenibilidad y reporting corporativo.",
      "Experiencia en transacciones y reporting donde la elegibilidad es condición de cierre.",
    ],
    inercoScreeningPublico: {
      fuente:
        "Screening previo: INERCO en evaluación ambiental de proyectos y cumplimiento sectorial (referencias públicas de ingeniería ambiental).",
      senales: [
        "Capacidad de demostrar DNSH con evidencia técnica de obra y operación.",
        "Encaje con proyectos de infraestructura e industria donde la taxonomía exige pruebas físicas.",
        "Documentación típica: estudios, permisos, seguimiento ambiental.",
      ],
      sumUpPlaceholder:
        "Definir con INERCO: plantillas mínimas de evidencia DNSH y roles en data room.",
    },
    pdvRowIds: ["dd-esg"],
    serviciosTipoConjuntos: [
      "ESG due diligence en transacciones: hallazgos técnicos + implicaciones financieras, contingencias y plan de remediación.",
      "Prueba DNSH y elegibilidad taxonómica con documentación de obra/operación y checklist en data room.",
      "Coordinación legal–riesgo–sostenibilidad con un único hilo de evidencias auditables.",
      "Uso de DNSH evaluator (u otras herramientas) como capa de cribado coherente con la DD financiera.",
    ],
    valuePropPieces: [
      {
        id: "dd-transaccional",
        label: "ESG due diligence transaccional",
        description: "Hallazgos técnicos + implicaciones financieras y contingencias.",
      },
      {
        id: "dd-dnsh",
        label: "DNSH y taxonomía UE",
        description: "Elegibilidad, pruebas y checklist por actividad.",
      },
      {
        id: "dd-obra",
        label: "Evidencias de obra y operación",
        description: "Permisos, estudios, seguimiento ambiental en data room.",
      },
      {
        id: "dd-legal",
        label: "Coordinación legal–riesgo–sostenibilidad",
        description: "Un solo hilo de preguntas y documentación auditables.",
      },
    ],
  },
];

/** Taxonomía sectorial compartida: mismos ids de macrosector en cuentas, campaña y GTM. */
/** Geografías canónicas para cruce oferta × mercado (alineadas a `gtmHorizons[].paises`). */
export interface MercadoGeografia {
  id: string;
  label: string;
  /** Tramo GTM de referencia (solo lectura en UI) */
  gtmHorizonHint?: string;
}

export const mercadoGeografias: MercadoGeografia[] = [
  { id: "es-pt", label: "España y Portugal", gtmHorizonHint: "Tramos 1–2" },
  { id: "mx-select", label: "México (select)", gtmHorizonHint: "Tramo 2" },
  { id: "sur-europa", label: "Sur de Europa", gtmHorizonHint: "Tramo 3" },
  {
    id: "latam-select",
    label: "Latam (select, partner local)",
    gtmHorizonHint: "Tramo 3",
  },
];

export const taxonomiaCompartida = {
  macrosectores:
    "Ocho macrosectores: Energía & utilities · Infra & ingeniería · Telco & digital · Retail & consumo · Inmobiliario · Salud & pharma · Turismo & movilidad · Industrial.",
  h1:
    "ES/PT: prioridad operativa en energía/utilities, infra con proyecto claro, industrial regulado, retail agro-EUDR, telco en modo ancla.",
  h2:
    "ES/PT + México (select): escalar infra/PPP, PE y fondos con activos industriales, inmobiliario y salud como expansión lateral con mandato y datos.",
  h3:
    "Sur Europa y Latam (select): industrialización, retail/turismo como playbooks, logístico a escala; siempre con partner local fuera del núcleo ES/PT.",
};

export const clientsVsGtmCopy = {
  bloque2rol:
    "Cuentas y relaciones de referencia agrupadas por segmento, con encaje comercial y próximos pasos. Las cifras por sector son orientativas (campaña interna FY2026).",
  linkGtm: "Ir a plan comercial y priorización",
  linkClientes: "Volver a cartera y segmentos",
};

/** Cuentas con proyecto y contacto según PdV INERCO × NFQ (sample clientes) */
export const clientAccounts: ClientAccount[] = [
  {
    id: "c1",
    cliente: "Ferrovial",
    temaPdV: "Estrategia",
    sector: "Infra · construcción y servicios · benchmarking rating",
    sectorClusterId: "infra-ingenieria",
    geografia: "ES / internacional",
    contactoReferencia: "Valentín Alfaya (Sostenibilidad)",
    relacionPrevia:
      "Proyecto activo: benchmarking y análisis de gap frente a requisitos de agencias de rating en materia de sostenibilidad; interlocutor en Sostenibilidad.",
    fitComercial: "alto",
    siguientePaso:
      "Cerrar alcance del gap analysis frente a criterios de rating y priorizar plan de acción conjunto INERCO (evidencia) + NFQ (posicionamiento y finanzas).",
    detalleFacilitacion:
      "Referencia explícita en el PdV de sample clientes; encaje natural con infra/concesiones y reporting de sostenibilidad.",
    gtmPuenteCuenta:
      "Infra & ingeniería: cuenta con mandato en estrategia y proyecto de sostenibilidad ya acotado (rating).",
  },
  {
    id: "c2",
    cliente: "Grupo Avintia",
    temaPdV: "Cambio climático",
    sector: "Construcción y promoción · riesgo físico y transición",
    sectorClusterId: "inmobiliario",
    geografia: "ES",
    contactoReferencia: "Diana Flores (Sostenibilidad)",
    relacionPrevia:
      "Proyecto en curso: evaluación de exposición a riesgo físico y de transición desde impactos potenciales sobre valor de activos y pasivos; contacto en Sostenibilidad.",
    fitComercial: "alto",
    siguientePaso:
      "Definir modelo de escenarios y trazabilidad de datos de activo para integrar en materialidad financiera y reporting.",
    detalleFacilitacion:
      "Encaje con riesgo climático y cartera inmobiliaria; útil para demostrar puente técnico–financiero.",
    gtmPuenteCuenta:
      "Inmobiliario / construcción con foco en clima — alineado con diagnósticos y riesgo físico.",
  },
  {
    id: "c3",
    cliente: "Grupo Ilunion",
    temaPdV: "Capital social",
    sector: "Servicios · economía social e impacto",
    sectorClusterId: "retail-consumo",
    geografia: "ES",
    contactoReferencia: "Beatriz Rubio (Impacto social)",
    relacionPrevia:
      "Desarrollo de metodología para cálculo de impactos no financieros granulares (región, filial, área) alineada a operativa.",
    fitComercial: "alto",
    siguientePaso:
      "Pilotar marco de métricas y trazabilidad con un subconjunto de unidades de negocio antes de escalar.",
    detalleFacilitacion:
      "Útil para ilustrar impacto social y gobierno de datos no financieros en grupo diversificado.",
    gtmPuenteCuenta:
      "Retail & consumo / servicios con foco social — expansión con mandato y datos.",
  },
  {
    id: "c4",
    cliente: "Elecnor",
    temaPdV: "Taxonomía UE",
    sector: "Infra · energía y concesiones · taxonomía",
    sectorClusterId: "infra-ingenieria",
    geografia: "ES / internacional",
    contactoReferencia: "Ruth Fernández (Sostenibilidad)",
    relacionPrevia:
      "Evaluación de alineamiento respecto al Reglamento de Taxonomía y actos delegados; contacto en Sostenibilidad.",
    fitComercial: "alto",
    siguientePaso:
      "Formalizar evidencias técnicas por actividad elegible y cierre con criterios de reporting y marco regulatorio (taxonomía).",
    detalleFacilitacion:
      "Referencia PdV en infra/energía; combina fuerte componente INERCO (actividad) y NFQ (marco y reporting).",
    gtmPuenteCuenta:
      "Infra & ingeniería: taxonomía y elegibilidad con proyecto explícito.",
  },
  {
    id: "c5",
    cliente: "HM Hospitales",
    temaPdV: "Reporting y posicionamiento",
    sector: "Sanidad privada · CSRD / ESRS",
    sectorClusterId: "salud-pharma",
    geografia: "ES",
    contactoReferencia: "Javier Tejedor (SSMAC)",
    relacionPrevia:
      "Elaboración de análisis de doble materialidad y apartados de memoria alineados con ESRS (CSRD); contacto en SSMAC.",
    fitComercial: "alto",
    siguientePaso:
      "Fijar perímetro de reporting, due diligence de dato clínico-operativo y plan de controles con vista a assurance.",
    detalleFacilitacion:
      "Caso sanitario con mandato claro de reporting; representa cluster Salud & pharma en el PdV.",
    gtmPuenteCuenta:
      "Salud & pharma: doble materialidad y memoria CSRD con mandato claro.",
  },
];

export const primerosLeads: LeadHighlight[] = [
  {
    id: "l1",
    titulo: "Ferrovial — posicionamiento ante rating",
    contexto:
      "Proyecto vivo de benchmarking y gap frente a agencias de rating en sostenibilidad; encaje fuerte infra + narrativa NFQ.",
    owner: "NFQ + INERCO (Sostenibilidad)",
    sectorClusterId: "infra-ingenieria",
    gtmPuente:
      "Infra: evidencia técnica y gobierno de datos para expectativas de rating.",
  },
  {
    id: "l2",
    titulo: "Elecnor — taxonomía y actividades elegibles",
    contexto:
      "Proyecto de alineamiento con Reglamento de Taxonomía y actos delegados; evidencia técnica por actividad.",
    owner: "NFQ (marco) + INERCO (actividad / obra)",
    sectorClusterId: "infra-ingenieria",
    gtmPuente:
      "Infra: taxonomía con pie en activo y evidencia por actividad elegible.",
  },
  {
    id: "l3",
    titulo: "HM Hospitales — doble materialidad y ESRS",
    contexto:
      "Doble materialidad y memoria alineada a CSRD; contacto SSMAC; referencia sanidad en el PdV.",
    owner: "NFQ (reporting) + INERCO (dato operativo / SSMAC)",
    sectorClusterId: "salud-pharma",
    gtmPuente:
      "Salud & pharma: reporting y compliance con foco en dato operativo y SSMAC.",
  },
];

export const assetPocs: AssetPoc[] = [
  {
    id: "alquid",
    title: "ALQUID / Net Zero industrial",
    subtitle: "Plantilla de hoja de ruta y escenarios para activo industrial representativo.",
    demuestra:
      "Cómo combinar modelo técnico INERCO con narrativa financiera y KPIs para inversores (CAPEX, payback, sensibilidad).",
    tipoCliente: "Industria mediana con presión regulatoria y de inversores.",
    esfuerzo: "8–10 semanas (MVP diagnóstico + entregable ejecutivo).",
    industrializacion:
      "Alta: metodología repetible por vertical (química, cemento, papel).",
    enlaceExterno: {
      href: "https://alquid.io",
      etiqueta: "alquid.io",
    },
    previewProducto:
      "Plataforma para medir, gestionar y proyectar emisiones y escenarios de descarbonización en activos industriales: inventarios, ALQUID Net Zero, trazabilidad y narrativa para dirección y stakeholders. Flujo típico: datos de planta → modelo de emisiones → escenarios (incl. sensibilidad) → salidas ejecutivas alineadas a reporting y conversaciones con inversores; complementa el diagnóstico INERCO con capa de producto y gobierno del dato.",
  },
  {
    id: "riesgo",
    title: "Riesgo físico / transición",
    subtitle:
      "Estrés de activos, exposición climática y lectura económica; integra naturaleza y cadena donde aplique.",
    demuestra:
      "Puente entre modelos de exposición (física y de transición) y lenguaje de materialidad financiera, escenarios y priorización de medidas; base para stress tests y conversación con dirección de riesgos y sostenibilidad. Alcance: amenazas climáticas y vulnerabilidad de activo; riesgo de transición (política, mercado, tecnología); integración de dimensiones LEAP, TNFD, cadena (agua, biodiversidad, suelo) y presiones EUDR cuando el perímetro lo exige, como capas de datos y materialidad enlazadas al mismo marco físico-transición. INERCO aporta modelo y evidencias; NFQ traduce a materialidad, escenarios y narrativa CSRD/IFRS donde proceda.",
    tipoCliente:
      "Corporativo con activos georreferenciados, infra en zonas sensibles o cartera de proyectos con colateral físico.",
    esfuerzo: "10–14 semanas con datos georreferenciados mínimos y acuerdo de perímetro.",
    industrializacion:
      "Media-alta: plantillas de datos y QA; reutilizable por sector con ajuste de supuestos.",
    referenciasMercado: [
      {
        nombre: "Climate X",
        href: "https://www.climate-x.com/",
        descripcion:
          "Opción de mercado para la capa de riesgo físico: datos y analítica (p. ej. Spectra) con pérdidas esperadas y escenarios por activo o cartera; integrable por API o informes. Complementa el marco conjunto cuando el cliente quiere un estándar de mercado en la parte física y NFQ/INERCO cierran materialidad, transición y reporting.",
        logoUrl: "https://www.climate-x.com/favicon.ico",
      },
    ],
  },
  {
    id: "csrd",
    title: "Suite de reporting CSRD (en preparación)",
    subtitle:
      "Herramienta conjunta para doble materialidad, datos operativos y cierre de información no financiera.",
    demuestra:
      "End-to-end desde fuente operativa y evidencias técnicas hasta estructura de revelaciones ESRS, controles y trazabilidad: el mismo hilo de datos que alimenta riesgo climático y métricas ambientales pasa a reporting bajo auditoría.",
    tipoCliente:
      "Grupos con mandato CSRD o en preparación; encaje fuerte con industria y sanidad donde el dato de planta es crítico.",
    esfuerzo: "Roadmap por fases: diagnóstico de gap 6–8 semanas; MVP de control de información 12–16 semanas según alcance.",
    industrializacion:
      "Alta: diseño modular (ESRS, datos, workflows); reutilizable en nuevos clientes con configuración.",
    previewProducto:
      "Línea de producto en desarrollo: arquitectura de datos ESG, workflows de validación, documentación metodológica y preparación para revisión interna / assurance — enlazada con el caso de riesgo físico-transición para que los mismos datos alimenten materialidad y memoria. Capa de reporting y control que cierra el ciclo desde operación técnica hasta disclosure.",
  },
];

/**
 * Alcance y llegada por sector — derivado del listado “Campañas FY2026 - Corporates”.
 * Cifras: orden de magnitud interno para facilitación; la criba fina (estado, temática, duplicados) es trabajo comercial previo a priorización.
 */
export const campaignCorporatesFy2026: CampaignCorporatesMeta = {
  titulo: "Campaña Corporates FY2026 — volumen y priorización",
  fuente: "Listado interno de leads y contactos (Campañas FY2026 - Corporates)",
  notaMetodologia:
    "Se agrupan entidades en macrosectores homogéneos para GTM. “Cuentas” = empresas distintas; “contactos” = filas del listado (varias personas por cuenta). La llegada refleja profundidad típica (multi-rol, CSO/ESG/IR). Cifras redondeadas y sujetas a criba (estado reunión, duplicados, relevancia NFQ×INERCO).",
  totalesOrientativos: {
    cuentasUnicas: "≈ 210–230",
    contactosTotales: "≈ 420–460",
  },
};

export const sectorReachFy2026: SectorReachRow[] = [
  {
    id: "energia-utilities",
    shortLabel: "Energía & utilities",
    gtmPuente:
      "Núcleo de volumen en campaña; prioridad energía/utilities e infra con escalado a proyectos estructurados.",
    sector: "Energía, utilities y regulados (gas, red, renovables IPP)",
    cuentasCampaña: 48,
    contactosCampaña: 102,
    profundidad: "~2,1 / cuenta",
    llegada: "alta",
    alcance:
      "Mayor densidad absoluta: Endesa/Enel, Naturgy, Repsol/MOEVE, Redeia, Enagás, renovables (Grenergy, Solaria, X-ELIO, Recurrent, etc.). Punto de palanca fuerte para Net Zero y reporting.",
    criba:
      "Priorizar cuentas con mandato CSRD/AFI y proyectos de capex verde; descartar filas puramente institucionales o duplicadas función.",
  },
  {
    id: "infra-ingenieria",
    shortLabel: "Infra & ingeniería",
    gtmPuente:
      "Diagnósticos y cuentas calientes en ES/PT; infra/PPP, México select y co-selling con promotores y estructuras de proyecto.",
    sector: "Infraestructuras, construcción e ingeniería (EPC, concesiones)",
    cuentasCampaña: 36,
    contactosCampaña: 71,
    profundidad: "~2,0 / cuenta",
    llegada: "alta",
    alcance:
      "Ferrovial, Sacyr, OHLA, Tecnicas Reunidas, Elecnor, Navantia: encaje natural INERCO (obra, activo) + NFQ (financiación, reporting).",
    criba:
      "Exigir línea clara a activo físico o proyecto; evitar contactos solo corporativos sin owner técnico.",
  },
  {
    id: "telco-digital",
    shortLabel: "Telco & digital",
    gtmPuente:
      "Una ancla en telco, alta profundidad por cuenta; no escalar a más cuentas hasta cerrar patrocinio único.",
    sector: "Telco, tecnología y conectividad",
    cuentasCampaña: 24,
    contactosCampaña: 78,
    profundidad: "~3,3 / cuenta",
    llegada: "muy-alta",
    alcance:
      "Telefónica y ecosistema concentran muchos contactos por cuenta (ESG, IR, datos). Llegada muy alta en profundidad; menor número de cuentas pero relación ramificada.",
    criba:
      "Elegir 1–2 cuentas “ancla” y un solo interlocutor patrocinador; evitar dispersión por demasiados sponsors internos.",
  },
  {
    id: "retail-consumo",
    shortLabel: "Retail & consumo",
    gtmPuente:
      "Agro, retail y cadena con presión EUDR / CSRD; playbooks a escala tras pilotos sólidos.",
    sector: "Retail, gran consumo y moda",
    cuentasCampaña: 34,
    contactosCampaña: 56,
    profundidad: "~1,6 / cuenta",
    llegada: "media",
    alcance:
      "IKEA, El Corte Inglés, Coca-Cola, Mahou, Grupo Piñero: buena cobertura para EUDR, packaging, cadena. Menos profundidad técnica por contacto que utilities.",
    criba:
      "Priorizar cuentas con presión regulatoria de cadena (EUDR, packaging) y owner de sostenibilidad con presupuesto.",
  },
  {
    id: "inmobiliario",
    shortLabel: "Inmobiliario",
    gtmPuente:
      "Inmobiliario cotizado y riesgo físico en activo; logístico y escala una vez validado el modelo.",
    sector: "Inmobiliario cotizado y promotores",
    cuentasCampaña: 19,
    contactosCampaña: 34,
    profundidad: "~1,8 / cuenta",
    llegada: "media",
    alcance:
      "Merlin, Colonial, Neinor, Metrovacesa: encaje riesgo físico en activo y reporting; volumen medio.",
    criba:
      "Filtrar por tipo de activo (logístico vs residencial) y materialidad climática; focalizar en carteras con deuda verde.",
  },
  {
    id: "salud-pharma",
    shortLabel: "Salud & pharma",
    gtmPuente:
      "Expansión lateral — mandato ESG, datos de planta y ciclos largos; priorizar cuentas ya maduras.",
    sector: "Salud, farmacia y biotech",
    cuentasCampaña: 24,
    contactosCampaña: 41,
    profundidad: "~1,7 / cuenta",
    llegada: "media",
    alcance:
      "Grifols, Insud, Reig Jofré, farmaindustria: interés ESG sólido; ciclo de venta más largo y sensibilidad compliance.",
    criba:
      "Priorizar donde exista owner ESG + acceso a planta o cadena de frío; evitar solo relaciones con dirección económica sin mandato de sostenibilidad.",
  },
  {
    id: "turismo-movilidad",
    shortLabel: "Turismo & movilidad",
    gtmPuente:
      "Turismo y movilidad como playbooks repetibles tras tracción en cuentas priorizadas; volumen menor que utilities o infra.",
    sector: "Turismo, movilidad y automotive retail",
    cuentasCampaña: 17,
    contactosCampaña: 29,
    profundidad: "~1,7 / cuenta",
    llegada: "media",
    alcance:
      "Meliá, NH, Cabify, Logista, Iberia (contacto): buen storytelling de descarbonización; alcance menor en volumen.",
    criba:
      "Seleccionar 2–3 cuentas con roadmap claro de huella y reporting CSRD.",
  },
  {
    id: "industrial-manufactura",
    shortLabel: "Industrial",
    gtmPuente:
      "Industria regulada y diagnósticos Net Zero en activo; PE y fondos con activos industriales.",
    sector: "Industrial, química y manufactura",
    cuentasCampaña: 30,
    contactosCampaña: 52,
    profundidad: "~1,7 / cuenta",
    llegada: "media",
    alcance:
      "Fluidra, Viscofan, Saica, cementeras asociadas: activos físicos claros; encaje ALQUID / Net Zero industrial.",
    criba:
      "Priorizar plantas con datos energéticos disponibles; co-financiación ya en cartera NFQ cuando aplique.",
  },
];

export const gtmHorizons: GtmHorizon[] = [
  {
    id: "h1",
    periodo: "Tramo 1",
    meses: "0–6 meses",
    arcoAnual: "sep. 2026 – feb. 2027",
    ventanaCalendario:
      "Referencia FY27: inicio sep. 2026. Si arranque jul. 2026 (lo antes posible): jul. – dic. 2026.",
    paises: ["España", "Portugal"],
    segmentos: [
      "Energía & utilities (regulados, redes, renovables IPP)",
      "Infra & ingeniería (EPC, concesiones — diagnósticos y cuentas calientes)",
      "Industrial (activos regulados, descarbonización / Net Zero en planta)",
      "Retail & consumo: agro, cadena y presión EUDR / CSRD",
      "Telco & digital: una cuenta ancla (alta profundidad, un patrocinador)",
    ],
    ofertaPrincipal:
      "Diagnósticos conjuntos Net Zero + reporting; primeras propuestas de riesgo físico ligadas a CSRD.",
    accionComercial:
      "Tres cuentas objetivo con plan conjunto; webinars sectoriales cerrados; propuestas tipo en energía/utilities, infra temprana y retail agro.",
    lecturaAlcance:
      "Priorizar mayor densidad en Energía & utilities e Infra & ingeniería; Telco solo como ancla única; Retail & consumo e Industrial en paralelo según capacidad.",
  },
  {
    id: "h2",
    periodo: "Tramo 2",
    meses: "6–12 meses",
    arcoAnual: "mar. 2027 – ago. 2027",
    ventanaCalendario:
      "FY27: mar. – ago. 2027. Con arranque jul. 2026: ene. – jun. 2027.",
    paises: ["España", "Portugal", "México (select)"],
    segmentos: [
      "Infra & PPP y proyectos (escala; incl. México select)",
      "Private equity y fondos con activos industriales",
      "Energía & utilities (proyectos estructurados)",
      "Inmobiliario cotizado (riesgo físico en activo, reporting)",
      "Salud & pharma (mandato ESG, datos de planta / compliance)",
    ],
    ofertaPrincipal:
      "Paquetes de due diligence + modelo técnico; stress test físico/transición para corporativos y fondos con activos; profundización en activo inmobiliario y planta.",
    accionComercial:
      "Partnerships con promotores y estructuras de proyecto; co-selling con riesgos; referencias de PoCs; expansión solo con criba de mandato y datos (inmobiliario, salud).",
    lecturaAlcance:
      "Continuidad desde el primer tramo en infra, energía e industrial; Inmobiliario y Salud & pharma ganan peso como expansión lateral. Geografía ES/PT más México select.",
  },
  {
    id: "h3",
    periodo: "Tramo 3",
    meses: "12–24 meses",
    arcoAnual: "sep. 2027 – ago. 2028",
    ventanaCalendario:
      "FY27: sep. 2027 – ago. 2028 (meses 12–24 desde sep. 2026). Con arranque jul. 2026: jul. 2027 – jun. 2028.",
    paises: ["Sur de Europa", "Latam select (con partner local)"],
    segmentos: [
      "Industrial: descarbonización profunda y repetición de módulos",
      "Retail & consumo: playbooks de cadena tras pilotos en el primer tramo",
      "Turismo & movilidad: narrativa y huella a escala",
      "Inmobiliario: real estate logístico y carteras maduras",
      "Energía / infra en Latam (siempre con partner local)",
    ],
    ofertaPrincipal:
      "Oferta modular industrializada; componentes reutilizables (datos, informes, QA).",
    accionComercial:
      "Programa de partners; pricing por módulos; governance estable entre NFQ e INERCO.",
    lecturaAlcance:
      "Retail y Turismo & movilidad pasan a playbooks solo después de victorias en los dos primeros tramos. Industrial e inmobiliario logístico en modo escala. En Latam select, partner local obligatorio; priorizar cuentas infra/energía con gobierno estable fuera del núcleo ibérico.",
  },
];

export function getGtmHorizonById(id: GtmHorizonId) {
  return gtmHorizons.find((h) => h.id === id);
}

/** Escenarios según nº de proyectos vendidos (encima del coste fijo de personas año 1) */
export const budgetEscenariosProyectos: ProjectVolumeScenario[] = [
  {
    id: "pocos",
    etiqueta: "Arranque",
    proyectosVendidos: "0–2 proyectos",
    descripcion:
      "Fase de validación: foco en PoCs y pipeline; la base de personas acordada se absorbe con visión de ramp-up.",
    implicacionInversion:
      "Mantener base de personas acordada; priorizar gasto variable bajo (viajes, datos externos) y posponer contrataciones adicionales hasta cerrar ventas.",
  },
  {
    id: "medio",
    etiqueta: "Tracción",
    proyectosVendidos: "3–5 proyectos",
    descripcion:
      "Mix de entregas en paralelo: sube la necesidad de PMO, QA y despliegue técnico.",
    implicacionInversion:
      "Añadir variable por proyecto (subcontratación puntual, horas extra, tooling) o subir gradualmente FTE en la parte más cargada (típicamente INERCO en modelo o NFQ en reporting).",
  },
  {
    id: "alto",
    etiqueta: "Escala",
    proyectosVendidos: "6+ proyectos",
    descripcion:
      "Industrialización parcial y riesgo de saturación si no se refuerza equipo o partners.",
    implicacionInversion:
      "Revisar tablas de reparto NFQ/INERCO; plantear terceros homologados o FTE adicional con umbral de margen por proyecto.",
  },
];

export const decisionTags: DecisionTag[] = [
  { id: "portfolio", label: "Portfolio inicial", defaultValue: "Net Zero industrial; Riesgo físico; CSRD / reporting" },
  { id: "sectores", label: "Sectores prioritarios", defaultValue: "Energía e infraestructuras; Agroalimentario; Industria pesada" },
  { id: "pocs", label: "2 PoCs a lanzar", defaultValue: "ALQUID / Net Zero; Riesgo físico / transición; Suite CSRD (en prep.)" },
  { id: "gtm", label: "GTM inicial", defaultValue: "ES/PT — utilities, infra, agro mid-cap, industrial" },
  { id: "equipo", label: "Equipo mínimo", defaultValue: "Completar en bloque Inversión (FTE y coste por parte)." },
];

/** Pasos operativos posteriores al cierre en sala — editable en datos */
export const proximosPasosInmediatos: { id: string; texto: string }[] = [
  {
    id: "acta",
    texto:
      "Circular acta o resumen de decisiones con owners y plazos (objetivo 48–72 h).",
  },
  {
    id: "seguimiento",
    texto:
      "Agendar comité de seguimiento conjunto (operativo / comercial) con periodicidad acordada.",
  },
  {
    id: "pocs-cuentas",
    texto:
      "Asignar responsable NFQ e INERCO por PoC o cuenta piloto y definir siguiente hito tangible.",
  },
  {
    id: "legal-datos",
    texto:
      "Si hubo acuerdos sobre datos, marca o IP, abrir hilo legal/compliance con checklist mínimo.",
  },
  {
    id: "pipeline",
    texto:
      "Actualizar pipeline compartido (oportunidades, etapa, próxima acción) con fecha.",
  },
];

export interface ProximoPasoPeriodoItem {
  id: string;
  texto: string;
}

export interface ProximoPasoPeriodo {
  id: string;
  titulo: string;
  /** Ventana dentro de la hoja de ruta 60–90 días */
  ventana: string;
  objetivo: string;
  items: ProximoPasoPeriodoItem[];
}

/** Hoja de ruta 60–90 días: entregables por ventana temporal (ajustable en datos) */
export const proximosPasosPorPeriodo: ProximoPasoPeriodo[] = [
  {
    id: "p1-formalizar",
    titulo: "Formalizar y arrancar",
    ventana: "Días 0–14",
    objetivo:
      "Salida de reunión por escrito, gobierno del acuerdo y canal operativo compartido sin ambigüedades.",
    items: [
      {
        id: "p1-acta",
        texto:
          "Publicar acta o resumen con decisiones explícitas, owner por tema y fecha de la primera revisión de seguimiento.",
      },
      {
        id: "p1-comite",
        texto:
          "Fijar en calendario el comité conjunto: al menos las dos primeras fechas y orden del día tipo.",
      },
      {
        id: "p1-pipeline",
        texto:
          "Definir herramienta y campos mínimos del pipeline compartido; nombrar responsable de mantenimiento semanal.",
      },
      {
        id: "p1-legal",
        texto:
          "Si aplica: expediente legal/compliance abierto con checklist (datos, marca, IP) y fecha objetivo de cierre del checklist.",
      },
    ],
  },
  {
    id: "p2-documentar",
    titulo: "Documentar modelo y pilotos",
    ventana: "Días 15–45",
    objetivo:
      "Modelo de colaboración y PoCs/cuentas piloto descritos con hitos verificables y mensaje comercial alineado.",
    items: [
      {
        id: "p2-modelo",
        texto:
          "Documento único (breve) de modelo operativo y comercial: roles NFQ/INERCO, reparto, escalado y contactos por frente.",
      },
      {
        id: "p2-pocs",
        texto:
          "Por cada PoC o cuenta piloto: alcance, entregable, fecha de hito de revisión y criterio de éxito medible.",
      },
      {
        id: "p2-gtm",
        texto:
          "Lista priorizada de cuentas objetivo y mensaje compartido (one-pager o deck base) validado por ambas partes.",
      },
      {
        id: "p2-budget",
        texto:
          "Cuadro de inversión vs. hitos actualizado; variaciones de alcance reflejadas con acuerdo explícito.",
      },
    ],
  },
  {
    id: "p3-ejecutar",
    titulo: "Ejecutar y decidir escala",
    ventana: "Días 46–90",
    objetivo:
      "Resultados de pilotos evaluados, decisión de inversión/FTE para el siguiente ciclo y prioridades actualizadas.",
    items: [
      {
        id: "p3-hitos",
        texto:
          "Ejecutar o cerrar formalmente cada hito de PoC con informe de resultado y decisión de siguiente paso (ampliar, iterar o parar).",
      },
      {
        id: "p3-inversion",
        texto:
          "Revisión formal de inversión y plantilla FTE frente a pipeline y entregas: decisión go/no-go a escala documentada.",
      },
      {
        id: "p3-portfolio",
        texto:
          "Actualizar portfolio y prioridades de líneas/sectores para el siguiente trimestre, con registro en acta o anexo.",
      },
      {
        id: "p3-partners",
        texto:
          "Acordar si se activan partners o refuerzos de equipo, con umbral de activación y responsable por parte.",
      },
    ],
  },
];
