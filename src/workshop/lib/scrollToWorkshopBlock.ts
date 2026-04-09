/**
 * Navegación entre secciones del workshop (hero, bloques, cierre) con sensación “presentación”:
 * usa View Transitions API cuando existe; respeta prefers-reduced-motion.
 */
export function scrollToWorkshopBlock(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    el.scrollIntoView({ behavior: "auto", block: "start" });
    return;
  }

  const run = () => {
    el.scrollIntoView({ behavior: "instant", block: "start" });
  };

  if (typeof document.startViewTransition === "function") {
    document.startViewTransition(run);
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
