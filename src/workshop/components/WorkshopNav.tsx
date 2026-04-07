import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "servicios", label: "Oferta" },
  { id: "clientes", label: "Mercado" },
  { id: "activos", label: "Activos" },
  { id: "gtm", label: "Comercial" },
  { id: "budget", label: "Inversión" },
] as const;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function WorkshopNav() {
  const [active, setActive] = useState<string>(navItems[0].id);

  useEffect(() => {
    const ids = ["hero", ...navItems.map((n) => n.id), "resumen"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          const id = visible[0].target.id;
          if (id === "hero") return;
          if (navItems.some((n) => n.id === id)) setActive(id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500/90 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            NFQ × INERCO
          </span>
        </div>
        <nav
          className="flex flex-wrap items-center gap-1 sm:justify-end"
          aria-label="Secciones del workshop"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToId(item.id)}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                active === item.id
                  ? "bg-zinc-800 text-zinc-100"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
