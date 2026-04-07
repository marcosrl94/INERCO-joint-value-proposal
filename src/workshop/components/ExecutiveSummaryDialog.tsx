import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { executiveSummaryBullets, workshopMeta } from "@/workshop/data/workshopContent";
import { ListChecks } from "lucide-react";

interface ExecutiveSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecutiveSummaryDialog({
  open,
  onOpenChange,
}: ExecutiveSummaryDialogProps) {
  const goToDecisions = () => {
    onOpenChange(false);
    requestAnimationFrame(() => {
      document.getElementById("resumen")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-lg border-zinc-800 bg-zinc-950 p-6 sm:max-w-xl"
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-zinc-100">
            Resumen ejecutivo
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            {workshopMeta.titulo}
          </DialogDescription>
        </DialogHeader>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
          {executiveSummaryBullets.map((line) => (
            <li key={line.slice(0, 32)} className="flex gap-3">
              <ListChecks className="mt-0.5 size-4 shrink-0 text-emerald-500/90" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end border-t border-zinc-800 pt-4">
          <Button
            type="button"
            className="bg-emerald-600 hover:bg-emerald-500"
            onClick={goToDecisions}
          >
            Ir a decisiones a cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
