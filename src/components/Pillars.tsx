import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { LineChart, Leaf, Building2, BarChart3, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export function Pillars() {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Los pilares sobre los que trabajamos</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Cuatro verticales destinadas a dar un servicio end-to-end dirigido a entidades financieras y grandes corporaciones que buscan integrar sostenibilidad, riesgos y financiación en su modelo de negocio.
          </p>
        </div>

        <Tabs defaultValue="finance" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto gap-2 bg-transparent">
            <TabsTrigger value="finance" className="data-[state=active]:bg-slate-800 data-[state=active]:text-amber-500 data-[state=active]:border-amber-500 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white transition-all">
              <LineChart className="w-4 h-4 mr-2" />
              Sustainable Finance
            </TabsTrigger>
            <TabsTrigger value="netzero" className="data-[state=active]:bg-slate-800 data-[state=active]:text-amber-500 data-[state=active]:border-amber-500 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white transition-all">
              <Leaf className="w-4 h-4 mr-2" />
              Net Zero & ESG Risks
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-800 data-[state=active]:text-amber-500 data-[state=active]:border-amber-500 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white transition-all">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="corporates" className="data-[state=active]:bg-slate-800 data-[state=active]:text-amber-500 data-[state=active]:border-amber-500 py-3 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white transition-all">
              <Building2 className="w-4 h-4 mr-2" />
              Reporting & Corporates
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-8">
            {/* SUSTAINABLE FINANCE */}
            <TabsContent value="finance" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-slate-700 shadow-xl overflow-hidden bg-slate-800">
                <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-8">
                  <CardTitle className="text-2xl text-white">Sustainable Finance</CardTitle>
                  <p className="text-slate-400 mt-2">
                    Ayudamos a canalizar capital hacia actividades sostenibles y de transición, estructurando soluciones de financiación e inversión sólidas y alineadas con los estándares internacionales.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 bg-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Detalle Exhaustivo de Capacidades</h3>
                    <Accordion className="w-full">
                      <AccordionItem value="item-1" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Marcos de Finanzas Sostenibles & Transición</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Definimos y operacionalizamos marcos de financiación sostenible y de transición alineados con los estándares internacionales (ICMA, LMA), aterrizándolos a los marcos regulatorios y contextos locales.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Sustainable Frameworks:</strong> Actualización del Estándar de Financiación Sostenible (Taxonomía Verde) y Desarrollo de Marcos de Financiación de Transición para sectores hard-to-abate.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Asesoramiento Taxonomías:</strong> Integración de actividades estratégicas identificadas en las Taxonomías no-UE (US, Colombia, México) y homogeneización de sistemas de validación.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Refuerzo de sistemas Due Diligence:</strong> Modelos basados en el análisis técnico de riesgos ambientales y sociales y el principio Do Not Significant Harm (DNSH).
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Sustainable Lending</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Integración sistemática de criterios ESG en todo el ciclo de originación, estructuración y seguimiento del crédito.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Elegibilidad de clientes y operaciones:</strong> Interpretación y aplicación de criterios del Fondo Europeo de Inversiones (FEI).
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Estructuración y validación:</strong> Despliegue de productos de financiación transaccional con enfoque en Supply Chain Finance Sostenible (confirming sostenible).
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Marcaje y trazabilidad:</strong> Diseño e implementación de sistemas de marcaje y clasificación para productos Dedicated Purpose y Sustainability Linked.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Sustainable Investing</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Integración de criterios ESG en todo el ciclo de toma de decisiones de inversión en los mercados de capitales.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Política de Exclusiones y Marco de Inversión:</strong> Análisis de exposiciones a sectores críticos y definición de guías de producto sostenible para Unit Linked (SFDR y MiFID II).
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Requerimientos de MiFID:</strong> Integración de preferencias de sostenibilidad, cuestionarios ESG y desarrollo de herramientas de simulación para gestores.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Análisis de proveedores e integración PIAs:</strong> Evaluación de cobertura y KPIs de PIAS en IICs, integración ESG en compras y engagement.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NET ZERO */}
            <TabsContent value="netzero" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-slate-700 shadow-xl overflow-hidden bg-slate-800">
                <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-8">
                  <CardTitle className="text-2xl text-white">Net Zero & ESG Risks</CardTitle>
                  <p className="text-slate-400 mt-2">
                    Avanzamos hacia el Net Zero y gestionamos los riesgos ESG convirtiendo la sostenibilidad en valor financiero mediante enfoques rigurosos en emisiones financiadas, alineación de carteras y riesgo climático.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 bg-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Detalle Exhaustivo de Capacidades</h3>
                    <Accordion className="w-full mb-8">
                      <AccordionItem value="item-1" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Carbon Accounting</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Medición y gestión de emisiones financiadas y KPIs climáticos de cartera para soportar reporting, análisis de riesgos y toma de decisiones.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Cálculo de emisiones financiadas:</strong> Actualización de factores de emisión (PCAF, CEDA, Exiobase) y ampliación de cobertura a nuevas clases de activos.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Proyección de métricas:</strong> Generación de modelos financieros y climáticos para proyectar métricas absolutas e intensidades.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Integración con ALQUID:</strong> Seguimiento y proyección combinando balance con supuestos climáticos (escenarios NGFS).
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Portfolio Alignment</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Medición de emisiones en la gestión financiera para evaluar la contribución del nuevo negocio al objetivo net zero.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Definición de objetivos:</strong> Medir intensidad de emisiones y trazar trayectorias de reducción propia orientando el capital.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Transition planning:</strong> Planes de transición que integran gestión del riesgo, apetito sectorial y mecanismos de carbon pricing interno.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Solución estratégica What-if:</strong> Simulación de escenarios para nuevas operaciones y evaluación de su efecto en el alineamiento de cartera.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Risk Management & TNFD</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Estrategia de descarbonización desde el análisis de materialidad hasta el diagnóstico de emisiones y dependencias naturales.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Modelos de impacto e integración:</strong> Composición de escenarios (riesgo físico/transición) y adaptación de modelos tradicionales (Merton, Gordon-Saphiro).
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">TNFD y Capital Natural:</strong> Evaluación de riesgos ambientales en cartera (CNAE-ENCORE), exposición al estrés hídrico y aplicación del enfoque LEAP.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* ALQUID Net Zero Highlight */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Leaf className="w-32 h-32 text-amber-500" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                            <svg viewBox="0 0 120 100" className="w-6 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id="alquid-red" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#F26522" />
                                  <stop offset="100%" stopColor="#ED1C24" />
                                </linearGradient>
                                <linearGradient id="alquid-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#00AEEF" />
                                  <stop offset="100%" stopColor="#27348B" />
                                </linearGradient>
                              </defs>
                              <polygon points="0,75 0,25 35,5 75,60 40,80" fill="url(#alquid-red)" />
                              <polygon points="120,25 120,75 85,95 45,40 80,20" fill="url(#alquid-blue)" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-white">Software ALQUID Net Zero</h4>
                        </div>
                        <p className="text-slate-300 mb-6 max-w-3xl leading-relaxed">
                          Nuestra solución tecnológica integral para la medición, gestión y proyección de emisiones financiadas. ALQUID Net Zero permite a las entidades financieras automatizar el cálculo de la huella de carbono de sus carteras, simular escenarios climáticos (NGFS) y trazar planes de transición efectivos hacia la descarbonización con total trazabilidad y rigor analítico.
                        </p>
                        <a 
                          href="https://www.alquid.io/solution/net-zero" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 bg-amber-500 text-slate-900 hover:bg-amber-400 h-11 px-6 py-2 shadow-lg shadow-amber-500/20"
                        >
                          Descubrir ALQUID Net Zero en detalle
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ANALYTICS */}
            <TabsContent value="analytics" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-slate-700 shadow-xl overflow-hidden bg-slate-800">
                <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-8">
                  <CardTitle className="text-2xl text-white">Analytics</CardTitle>
                  <p className="text-slate-400 mt-2">
                    Capacidades transversales para habilitar la ejecución de iniciativas ESG de forma end-to-end, desde la construcción del dato hasta la modelización con IA.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 bg-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Arquitectura de Soluciones</h3>
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-amber-500 mb-4 text-lg flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">1</div>
                          Data Foundation
                        </h4>
                        <ul className="space-y-3 text-slate-400">
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Data acquisition</span>
                            <span className="text-sm">Captura e ingesta de datos ESG estructurados y no estructurados.</span>
                          </li>
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Data transformation</span>
                            <span className="text-sm">Limpieza, normalización y tratamiento de calidad del dato.</span>
                          </li>
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Data storage</span>
                            <span className="text-sm">Arquitecturas de almacenamiento optimizadas para reporting y modelos.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-amber-500 mb-4 text-lg flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">2</div>
                          Analytics Integration
                        </h4>
                        <ul className="space-y-3 text-slate-400">
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Modeling</span>
                            <span className="text-sm">Desarrollo de modelos predictivos, scoring climático y proyecciones.</span>
                          </li>
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Implementation</span>
                            <span className="text-sm">Despliegue de motores de cálculo en entornos productivos.</span>
                          </li>
                          <li className="flex flex-col">
                            <span className="font-semibold text-slate-200">Integration</span>
                            <span className="text-sm">Conexión con sistemas core de finanzas, originación y reporting.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 text-white p-6 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-1 text-amber-500">Artificial Intelligence</h4>
                        <p className="text-slate-400 text-sm max-w-2xl">Acelerador transversal utilizado en todas las fases para la extracción de datos de memorias, análisis de sentimiento, generación de narrativas y optimización de modelos complejos.</p>
                      </div>
                      <BarChart3 className="w-12 h-12 text-amber-500/50 hidden sm:block" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REPORTING & CORPORATES */}
            <TabsContent value="corporates" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-slate-700 shadow-xl overflow-hidden bg-slate-800">
                <CardHeader className="bg-slate-800/50 border-b border-slate-700 pb-8">
                  <CardTitle className="text-2xl text-white">Reporting & Corporates</CardTitle>
                  <p className="text-slate-400 mt-2">
                    Acompañamos a las compañías en la integración del ESG en su modelo de negocio, convirtiendo el cumplimiento regulatorio en decisiones empresariales informadas.
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 bg-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Detalle Exhaustivo de Capacidades</h3>
                    <Accordion className="w-full">
                      <AccordionItem value="item-1" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Estrategia ESG y Financiación Sostenible</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Definición de prioridades estratégicas y estructuración de marcos de financiación sostenible alineados con normativa europea.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Análisis de doble materialidad:</strong> Evaluación estructurada de impactos, riesgos y oportunidades (IROs) conforme a CSRD y estándares ESRS.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Marcos de financiación:</strong> Estructuración de instrumentos y marcos conforme a ICMA y EU Green Bond Standard.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Second Party Opinions (SPOs):</strong> Emisión de opiniones independientes sobre marcos de financiación y estructuras vinculadas a objetivos ESG.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Riesgos e Impactos ESG</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Evaluación integrada de riesgos ESG con impacto potencial en el valor empresarial y cuantificación de impactos en el entorno.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Riesgos físicos y de transición:</strong> Modelización geoespacial de activos y análisis de escenarios sectoriales frente a la descarbonización.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Riesgos sociales y operativos:</strong> Evaluación integral de riesgos ambientales, cadena de suministro, derechos humanos y entorno socioeconómico.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Monetización de impactos:</strong> Modelización económica de impactos ESG, huella ambiental, capital natural y accesibilidad/inclusión (Ley 11/2023).
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-slate-700">
                        <AccordionTrigger className="text-slate-200 hover:text-amber-500">Reporting y Posicionamiento ESG</AccordionTrigger>
                        <AccordionContent className="text-slate-400 space-y-4 pt-2 pb-4">
                          <p>Consolidación estructurada de la información no financiera orientada al cumplimiento normativo y coherencia de datos.</p>
                          <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Reporting regulatorio (EINF y CSRD):</strong> Elaboración integral de memorias de sostenibilidad asegurando solidez técnica para verificación independiente.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Taxonomía de la UE:</strong> Análisis técnico de criterios sustantivos y DNSH para evaluar elegibilidad y alineamiento.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-slate-200">Marcos avanzados:</strong> Integración y divulgación climática (Ley 7/2021 y TCFD), divulgación de naturaleza (TNFD) y respuesta a índices/ratings ESG.
                              </div>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}