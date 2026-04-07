import { useState } from "react";
import { WorkshopNav } from "@/workshop/components/WorkshopNav";
import { WorkshopHero } from "@/workshop/components/WorkshopHero";
import { ExecutiveSummaryDialog } from "@/workshop/components/ExecutiveSummaryDialog";
import { ServicesSection } from "@/workshop/components/ServicesSection";
import { ClientsSection } from "@/workshop/components/ClientsSection";
import { AssetsSection } from "@/workshop/components/AssetsSection";
import { GtmSection } from "@/workshop/components/GtmSection";
import { BudgetSection } from "@/workshop/components/BudgetSection";
import { SummarySection } from "@/workshop/components/SummarySection";
import { workshopMeta } from "@/workshop/data/workshopContent";

export function WorkshopPage() {
  const [execOpen, setExecOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <ExecutiveSummaryDialog open={execOpen} onOpenChange={setExecOpen} />
      <WorkshopNav />
      <main>
        <WorkshopHero onExecutiveSummary={() => setExecOpen(true)} />
        <ServicesSection />
        <ClientsSection />
        <AssetsSection />
        <GtmSection />
        <BudgetSection />
        <SummarySection />
      </main>

      <footer className="border-t border-white/[0.06] bg-zinc-950 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.2em] text-zinc-600">
            NFQ × INERCO · {workshopMeta.fechaSesion}
          </p>
          <p className="mt-2 text-center text-xs text-zinc-500">
            Documento de trabajo. Distribución solo entre participantes autorizados.
          </p>
        </div>
      </footer>
    </div>
  );
}
