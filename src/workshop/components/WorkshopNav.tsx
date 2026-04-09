import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  WORKSHOP_CLOSE_ID,
  WORKSHOP_HERO_ID,
  WORKSHOP_NAV_BLOCKS,
  getNavBlockLabel,
  isWorkshopNavBlockId,
  navBlockIndex,
} from "@/workshop/constants/workshopBlocks";
import { scrollToWorkshopBlock } from "@/workshop/lib/scrollToWorkshopBlock";

type NavPhase = "hero" | "block" | "fin";

export function WorkshopNav() {
  const [phase, setPhase] = useState<NavPhase>("hero");
  const [activeBlockId, setActiveBlockId] = useState<string>(
    WORKSHOP_NAV_BLOCKS[0].id
  );

  const navIds = useMemo(
    () => WORKSHOP_NAV_BLOCKS.map((b) => b.id),
    []
  );

  const slideLabel = useMemo(() => {
    if (phase === "hero") return "Portada";
    if (phase === "fin") return "Cierre";
    const idx = navBlockIndex(activeBlockId);
    const label = getNavBlockLabel(activeBlockId);
    if (idx < 0 || !label) return "";
    return `${idx + 1} / ${WORKSHOP_NAV_BLOCKS.length} · ${label}`;
  }, [phase, activeBlockId]);

  useEffect(() => {
    const ids = [WORKSHOP_HERO_ID, ...navIds, WORKSHOP_CLOSE_ID];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio > 0.06)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible[0]?.target?.id) return;
        const id = visible[0].target.id;
        if (id === WORKSHOP_HERO_ID) {
          setPhase("hero");
          return;
        }
        if (id === WORKSHOP_CLOSE_ID) {
          setPhase("fin");
          return;
        }
        if (isWorkshopNavBlockId(id)) {
          setPhase("block");
          setActiveBlockId(id);
        }
      },
      { rootMargin: "-36% 0px -36% 0px", threshold: [0, 0.08, 0.2, 0.45] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navIds]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        return;
      }

      const ids = navIds;
      const go = (id: string) => {
        if (isWorkshopNavBlockId(id)) setActiveBlockId(id);
        scrollToWorkshopBlock(id);
      };

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        if (phase === "hero") {
          go(ids[0]);
          setPhase("block");
          return;
        }
        if (phase === "fin") return;
        const idx = navBlockIndex(activeBlockId);
        if (idx < 0) return;
        if (idx < ids.length - 1) go(ids[idx + 1]);
        else scrollToWorkshopBlock(WORKSHOP_CLOSE_ID);
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        if (phase === "fin") {
          go(ids[ids.length - 1]);
          return;
        }
        if (phase === "hero") return;
        const idx = navBlockIndex(activeBlockId);
        if (idx > 0) go(ids[idx - 1]);
        else scrollToWorkshopBlock(WORKSHOP_HERO_ID);
      }

      if (e.key === "Home") {
        e.preventDefault();
        setPhase("hero");
        scrollToWorkshopBlock(WORKSHOP_HERO_ID);
      }
      if (e.key === "End") {
        e.preventDefault();
        setPhase("fin");
        scrollToWorkshopBlock(WORKSHOP_CLOSE_ID);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, activeBlockId, navIds]);

  const currentIdx =
    phase === "block" ? navBlockIndex(activeBlockId) : phase === "fin" ? 999 : -1;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/90 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
            <div className="min-w-0">
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                NFQ × INERCO
              </span>
              <p
                className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600 sm:text-[11px]"
                aria-live="polite"
              >
                {slideLabel}
              </p>
            </div>
          </div>
          <nav
            className="flex flex-wrap items-center gap-1 sm:justify-end"
            aria-label="Secciones del workshop"
          >
            {WORKSHOP_NAV_BLOCKS.map((item) => {
              const idx = navBlockIndex(item.id);
              const isActive =
                phase === "block" && activeBlockId === item.id;
              const isPast =
                phase === "fin" ||
                (currentIdx >= 0 && idx < currentIdx);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => {
                    setPhase("block");
                    setActiveBlockId(item.id);
                    scrollToWorkshopBlock(item.id);
                  }}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-zinc-800 text-zinc-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                      : isPast
                        ? "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                        : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className="flex items-center gap-2 border-t border-white/[0.04] pt-2"
          aria-hidden
        >
          <div className="flex min-h-[3px] flex-1 gap-1">
            {WORKSHOP_NAV_BLOCKS.map((b, i) => {
              const done = phase === "fin" || (currentIdx >= 0 && i < currentIdx);
              const here = phase === "block" && currentIdx === i;
              return (
                <button
                  key={b.id}
                  type="button"
                  tabIndex={-1}
                  onClick={() => {
                    setPhase("block");
                    setActiveBlockId(b.id);
                    scrollToWorkshopBlock(b.id);
                  }}
                  className={cn(
                    "h-1 min-w-[2rem] flex-1 rounded-full transition-colors duration-300",
                    done
                      ? "bg-emerald-500/40"
                      : here
                        ? "bg-emerald-500/85 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                        : "bg-zinc-800"
                  )}
                  title={`Ir a ${b.label}`}
                />
              );
            })}
          </div>
          <span className="shrink-0 tabular-nums text-[10px] font-medium text-zinc-600">
            {phase === "hero"
              ? "—"
              : phase === "fin"
                ? `${WORKSHOP_NAV_BLOCKS.length}/${WORKSHOP_NAV_BLOCKS.length}`
                : `${Math.max(0, navBlockIndex(activeBlockId) + 1)}/${WORKSHOP_NAV_BLOCKS.length}`}
          </span>
        </div>
      </div>
    </header>
  );
}
