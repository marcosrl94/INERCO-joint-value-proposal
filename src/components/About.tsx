import { Card, CardContent } from "./ui/card";
import { Users, Globe, Briefcase, Award } from "lucide-react";

export function About() {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">NFQ | Posicionamiento Global</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Contamos con más de 15 años de experiencia apoyando a nuestros principales clientes. Actualmente disponemos de equipos multidisciplinares con cobertura global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="border-slate-800 shadow-lg bg-slate-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{">"} 2.000</h3>
              <p className="text-slate-400 font-medium">FTEs como base recurrente</p>
            </CardContent>
          </Card>
          
          <Card className="border-slate-800 shadow-lg bg-slate-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">8 países</h3>
              <p className="text-slate-400 font-medium">Presencia global y nearshore</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 shadow-lg bg-slate-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
              <p className="text-slate-400 font-medium">Clientes activos</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800 shadow-lg bg-slate-800/50">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">15 años</h3>
              <p className="text-slate-400 font-medium">De experiencia</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-8 lg:p-12 border border-slate-800">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Capacidades ESG</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h4 className="text-xl font-bold text-amber-500 mb-4 border-b border-slate-700 pb-2">Finanzas y Riesgos</h4>
              <p className="text-slate-400 text-sm mb-4">
                Integración de los factores ESG en la gestión empresarial, desde la perspectiva del director financiero hasta el director de riesgos.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li>• Planificación Financiera</li>
                <li>• Riesgos Estructurales</li>
                <li>• Productos</li>
                <li>• Gestión de Activos</li>
                <li>• Pricing</li>
              </ul>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h4 className="text-xl font-bold text-amber-500 mb-4 border-b border-slate-700 pb-2">Sostenibilidad</h4>
              <p className="text-slate-400 text-sm mb-4">
                Comprender y medir los diferentes factores relacionados con los impactos sobre el medio ambiente y la sociedad.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li>• Clima (Mitigación & Adaptación)</li>
                <li>• Residuos (Economía Circular)</li>
                <li>• Derechos Humanos</li>
                <li>• Capital Natural & Biodiversidad</li>
                <li>• Diversidad e Inclusión</li>
              </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700">
              <h4 className="text-xl font-bold text-amber-500 mb-4 border-b border-slate-700 pb-2">Tecnología</h4>
              <p className="text-slate-400 text-sm mb-4">
                Implementar ideas, metodologías y componentes digitales para acelerar la transición de manera sostenible.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 font-medium">
                <li>• IoT & Smart Cities</li>
                <li>• Data & Inteligencia Artificial</li>
                <li>• Cloud & Automatización</li>
                <li>• Soluciones de Riesgo y Finanzas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
