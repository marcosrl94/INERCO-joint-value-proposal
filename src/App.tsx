import { useState } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Pillars } from "./components/Pillars";
import { CasosDeExito } from "./components/CasosDeExito";
import { Chatbot } from "./components/tools/Chatbot";
import { Button } from "./components/ui/button";
import { Leaf, Menu, X } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"equipo" | "servicios" | "casos" | "help">("servicios");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "equipo", label: "Nuestro equipo" },
    { id: "servicios", label: "Nuestros servicios" },
    { id: "casos", label: "Nuestros casos de éxito" },
    { id: "help", label: "Help (IA Driven)" },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-amber-500/30 selection:text-white">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("servicios")}>
            <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="nfq-red" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F26522" />
                  <stop offset="100%" stopColor="#E62058" />
                </linearGradient>
                <linearGradient id="nfq-blue" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00AEEF" />
                  <stop offset="100%" stopColor="#1E224E" />
                </linearGradient>
              </defs>
              <polygon points="0,91.66 0,29.16 35,0 65,37.5" fill="url(#nfq-red)" />
              <polygon points="100,8.34 100,70.84 65,100 35,62.5" fill="url(#nfq-blue)" />
            </svg>
            <div className="flex flex-col justify-center ml-1">
              <span className="font-sans text-3xl font-semibold tracking-tighter text-white leading-none" style={{ letterSpacing: '-0.05em' }}>nfq</span>
              <div className="flex flex-col mt-[2px]">
                <span className="text-[0.4rem] font-semibold tracking-[0.25em] text-slate-400 leading-none">BEYOND</span>
                <span className="text-[0.4rem] font-semibold tracking-[0.25em] text-slate-400 leading-none mt-[1px]">CONSULTING</span>
              </div>
            </div>
            <span className="font-medium text-lg tracking-tight text-slate-400 border-l border-slate-700 pl-3 ml-2 h-8 flex items-center">ESG Advisory</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-medium transition-colors hover:text-amber-500 ${activeTab === item.id ? "text-amber-500 border-b-2 border-amber-500 py-5" : "text-slate-400 py-5"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white hover:bg-slate-800">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 border-b border-slate-800 shadow-lg py-4 px-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-sm font-medium transition-colors hover:text-amber-500 ${activeTab === item.id ? "text-amber-500" : "text-slate-400"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {activeTab === "equipo" && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <About />
          </div>
        )}
        
        {activeTab === "servicios" && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <Pillars />
          </div>
        )}

        {activeTab === "casos" && (
          <div className="animate-in fade-in duration-500">
            <CasosDeExito />
          </div>
        )}

        {activeTab === "help" && (
          <div className="animate-in fade-in duration-500 py-12 container mx-auto px-4 max-w-4xl min-h-[calc(100vh-64px)]">
            <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 h-[800px]">
              <Chatbot />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="nfq-red-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F26522" />
                    <stop offset="100%" stopColor="#E62058" />
                  </linearGradient>
                  <linearGradient id="nfq-blue-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00AEEF" />
                    <stop offset="100%" stopColor="#1E224E" />
                  </linearGradient>
                </defs>
                <polygon points="0,91.66 0,29.16 35,0 65,37.5" fill="url(#nfq-red-footer)" />
                <polygon points="100,8.34 100,70.84 65,100 35,62.5" fill="url(#nfq-blue-footer)" />
              </svg>
              <div className="flex flex-col justify-center text-left">
                <span className="font-sans text-5xl font-semibold tracking-tighter text-white leading-none" style={{ letterSpacing: '-0.05em' }}>nfq</span>
                <div className="flex flex-col mt-1">
                  <span className="text-[0.6rem] font-semibold tracking-[0.25em] text-slate-400 leading-none">BEYOND</span>
                  <span className="text-[0.6rem] font-semibold tracking-[0.25em] text-slate-400 leading-none mt-[2px]">CONSULTING</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mb-6 max-w-md mx-auto">
            Acompañamos a nuestros clientes en la transición hacia modelos financieros sostenibles, conectando regulación, producto e impacto.
          </p>
          <p className="text-sm text-slate-500">
            © 2026 Nfq. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
