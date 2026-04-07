import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Nfq Advisory
            <span className="block text-amber-500 mt-2">ESG & Sostenibilidad</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Acompañamos a nuestros clientes en la transición hacia modelos financieros sostenibles, conectando regulación, producto e impacto para crear valor económico y reputacional a largo plazo.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold">
              Descubrir Capacidades
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
