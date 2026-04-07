import { Badge } from "@/components/ui/badge";
import type { CapacityBand } from "@/workshop/data/serviceCapacity";
import {
  capacityBandLabels,
  getJointCapacityReadout,
} from "@/workshop/data/serviceCapacity";
import { cn } from "@/lib/utils";

export function JointCapacityBadge({
  capacityNfq,
  capacityInerco,
  className,
}: {
  capacityNfq: CapacityBand;
  capacityInerco: CapacityBand;
  className?: string;
}) {
  const { badge } = getJointCapacityReadout(capacityNfq, capacityInerco);
  return (
    <Badge
      variant="outline"
      title="Lectura conjunta según matriz de capacidad (parametrizable en serviceCapacity.ts)"
      className={cn(
        "max-w-[200px] border font-medium leading-snug break-words sm:max-w-none",
        "border-violet-500/35 bg-violet-500/10 text-violet-100",
        className
      )}
    >
      {badge}
    </Badge>
  );
}

export function CapacityMiniChips({
  capacityNfq,
  capacityInerco,
  className,
}: {
  capacityNfq: CapacityBand;
  capacityInerco: CapacityBand;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5 text-[10px]", className)}>
      <span
        className="rounded-md border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 font-medium text-sky-200/95"
        title={capacityBandLabels[capacityNfq].hint}
      >
        NFQ · {capacityBandLabels[capacityNfq].label}
      </span>
      <span
        className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-200/95"
        title={capacityBandLabels[capacityInerco].hint}
      >
        INERCO · {capacityBandLabels[capacityInerco].label}
      </span>
    </div>
  );
}
