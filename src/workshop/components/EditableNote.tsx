import { useEffect, useId, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EditableNoteProps {
  sectionId: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function EditableNote({
  sectionId,
  label = "Notas del equipo",
  placeholder = "Acuerdos, riesgos abiertos o próximos pasos…",
  className,
}: EditableNoteProps) {
  const storageKey = `workshop-nfq-inerco-${sectionId}`;
  const [value, setValue] = useState("");
  const id = useId();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setValue(saved);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* ignore */
    }
  }, [storageKey, value]);

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-zinc-700/80 bg-zinc-900/40 p-4",
        className
      )}
    >
      <Label htmlFor={id} className="text-xs font-medium text-zinc-500">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="mt-2 min-h-[88px] resize-y border-zinc-700/80 bg-zinc-950/50 text-sm text-zinc-200 placeholder:text-zinc-600"
      />
    </div>
  );
}
