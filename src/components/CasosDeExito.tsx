import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Building2, CheckCircle2, ArrowRight, Target, Lightbulb, BarChart } from "lucide-react";

type CaseStudy = {
  id: string;
  client: string;
  title: string;
  status: "Cerrado" | "En curso";
  challenge: string;
  approach: string[];
  results: string[];
  capabilities: string[];
  sector: "Entidades financieras" | "Entidades no financieras";
  domain: string;
};

const cases: CaseStudy[] = [
  {
    id: "1",
    client: "BBVA",
    title: "Salesforce ESG KPI",
    status: "Cerrado",
    challenge: "Desarrollar un sistema (repositorio) con el detalle de todas estas operaciones ESG/KPI-Linked que existen en CIB. Diferentes áreas de negocio están gestionando financiaciones ESG/KPI Linked con sus clientes, implementando diferentes soluciones. Es por ello que se busca una gestión de la actividad ESG/KPI Linked que dé cobertura a todas estas áreas.",
    approach: [
      "Registro del detalle de las operaciones KPIs que actualmente se registran en ficheros excel manuales.",
      "Permitir a los usuarios consultar todas las operaciones KPI Linked por geografía, área de negocio, tipo de KPI, sector, etc.",
      "Comparar los KPIs con el objetivo de analizar la evolución, obtener benchmarks.",
      "Generación de alertas para saber cuándo hay que revisar el KPI.",
      "Monitorización de las operaciones sostenibles: eventos asociados al seguimiento de compromisos fijados por el cliente."
    ],
    results: [
      "Sistema que ofrezca información relevante sobre sostenibilidad",
      "Base de datos común donde compartir la información generada",
      "Dashboard para el seguimiento económico de los clientes sobre los compromisos sostenibles"
    ],
    capabilities: ["Sostenibilidad", "Tecnología", "Finance & Risk"],
    sector: "Entidades financieras",
    domain: "Reporting & Corporates"
  },
  {
    id: "2",
    client: "Entidad Financiera",
    title: "Inteligencia Artificial Generativa",
    status: "Cerrado",
    challenge: "Mejorar la obtención de información de sostenibilidad de clientes de la entidad financiera, aplicando soluciones tecnológicas innovadoras para obtener datos de fuentes públicas como Science Based Targets Initiative (SBTi), Transition Pathway Initiative (TPI) y memorias de sostenibilidad de las empresas, con el objetivo de brindar información relevante a múltiples stakeholders del banco.",
    approach: [
      "Extracción automatizada de datos sobre objetivos de descarbonización y planes de transición de clientes desde SBTi y TPI usando web scraping.",
      "Aplicación de IA (OCR, NLP) para extraer datos de métricas GRI de memorias de sostenibilidad.",
      "Uso de grafos para inferir relaciones de sostenibilidad entre empresas.",
      "Automatización de procesos con Docker y AWS para generar repositorios de datos actualizados."
    ],
    results: [
      "Extracción automática de 24 campos de datos de SBTi y 57 de TPI para 7-10 compañías",
      "Informe con Respuestas a 80 preguntas sobre ESG de memorias de sostenibilidad con 75-85% de acierto",
      "Documentación complementaria sobre Prompts y metodologías aplicadas"
    ],
    capabilities: ["Tecnología", "Sostenibilidad"],
    sector: "Entidades financieras",
    domain: "Analytics"
  },
  {
    id: "3",
    client: "Entidad Financiera",
    title: "Sistema Integrado Riesgos Climáticos (CRIS)",
    status: "En curso",
    challenge: "Atender las necesidades de las instituciones financieras y los inversores de cuantificar el riesgo climático en sus carteras a medida que se acelera la transición global hacia un modelo de emisiones netas cero. A través del suministro de valoraciones y parámetros de riesgo ajustados al clima será posible analizar el riesgo y las oportunidades climáticas.",
    approach: [
      "El asesoramiento y la PMO trabajan con los diferentes equipos involucrados en la primera ejecución de los modelos de Riesgo Físico y de Transición.",
      "Preparación de insumos relacionados con la ejecución de cada modelo por clase de activo y sector.",
      "Diseño de la capa de explotación soportada en un aplicativo de inteligencia de negocios.",
      "Definición de los casos de uso relacionados con la práctica de gestión de riesgos del cliente."
    ],
    results: [
      "Implementación de una herramienta destinada a cuantificar los impactos financieros del riesgo climático en la cartera.",
      "Definición funcional de casos de uso vinculados a la herramienta"
    ],
    capabilities: ["Finance & Risk", "Tecnología"],
    sector: "Entidades financieras",
    domain: "Net Zero & ESG Risks"
  },
  {
    id: "4",
    client: "Corporación Sector Cárnico",
    title: "Second Party Opinion (SPO)",
    status: "Cerrado",
    challenge: "Una corporación líder del sector de la transformación de subproductos cárnicos, formalizó una transacción corporativa con un consorcio de instituciones financieras mediante un préstamo sindicado. Con el objetivo de su concesión, se requirió la evaluación de diversos indicadores relacionados con la sostenibilidad y el establecimiento de objetivos específicos en concordancia con los Principios de Préstamos Vinculados a la Sostenibilidad (SLLP).",
    approach: [
      "Diagnóstico relacionado con el modelo de governance e identificación de órganos y personalidades clave.",
      "Revisión de los impactos derivados de la estrategia de sostenibilidad y las operaciones de la compañía en términos de contribución a ODS.",
      "Evaluación de los KPIs propuestos y de su materialidad.",
      "Calibración de los SPTs y verificación de su ambición.",
      "Emisión del reporte SPO proporcionando una opinión veraz, razonable y transparente."
    ],
    results: [
      "Pre-assessment KPIs",
      "Informe de Second Party Opinion"
    ],
    capabilities: ["Sostenibilidad", "Finance & Risk"],
    sector: "Entidades no financieras",
    domain: "Sustainable Finance"
  }
];

export function CasosDeExito() {
  const [activeDomain, setActiveDomain] = useState<string>("Todos");

  const domains = [
    "Todos",
    "Sustainable Finance",
    "Net Zero & ESG Risks",
    "Analytics",
    "Reporting & Corporates"
  ];

  const filteredCases = activeDomain === "Todos" 
    ? cases 
    : cases.filter(c => c.domain === activeDomain);

  return (
    <section className="py-16 bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nuestros casos de éxito</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a entidades financieras y corporaciones a integrar los factores ESG en sus modelos de negocio a través de proyectos multidisciplinares.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {domains.map(domain => (
            <Button
              key={domain}
              variant={activeDomain === domain ? "default" : "outline"}
              onClick={() => setActiveDomain(domain)}
              className={activeDomain === domain ? "bg-amber-500 text-slate-900 hover:bg-amber-600 border-amber-500" : "text-slate-300 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white"}
            >
              {domain}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-12">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseStudy) => (
              <Card key={caseStudy.id} className="overflow-hidden border-slate-700 shadow-xl bg-slate-800 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-12 gap-0">
                  {/* Left Column: Header & Context */}
                  <div className="md:col-span-4 bg-slate-900 border-r border-slate-700 text-white p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <Badge variant={caseStudy.status === "Cerrado" ? "secondary" : "default"} className={caseStudy.status === "Cerrado" ? "bg-slate-800 text-slate-300 hover:bg-slate-800 border border-slate-700" : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border border-amber-500/50"}>
                          {caseStudy.status}
                        </Badge>
                        <Building2 className="w-6 h-6 text-slate-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                      <p className="text-amber-500 font-medium mb-6">{caseStudy.client}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Desafío
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed opacity-90">
                            {caseStudy.challenge}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-800">
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.capabilities.map((cap, i) => (
                          <Badge key={i} variant="outline" className="bg-slate-800 border-slate-600 text-slate-300">
                            {cap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Approach & Results */}
                  <div className="md:col-span-8 p-8 bg-slate-800">
                    <div className="grid md:grid-cols-2 gap-8 h-full">
                      {/* Enfoque */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-500" />
                          Enfoque
                        </h4>
                        <ul className="space-y-4">
                          {caseStudy.approach.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resultados */}
                      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <BarChart className="w-5 h-5 text-amber-500" />
                          Resultados
                        </h4>
                        <ul className="space-y-4">
                          {caseStudy.results.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-700">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                              <span className="text-sm font-medium text-slate-200">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-slate-500">
              No hay casos de éxito disponibles para este dominio en este momento.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
