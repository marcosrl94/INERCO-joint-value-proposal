import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Ritmo visual tipo “slide”: alterna fondo muy sutil entre bloques */
  slideIndex?: number;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  slideIndex,
}: SectionShellProps) {
  const stripe =
    slideIndex === 6
      ? "border-t-amber-500/15 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-zinc-900/40 [background-image:radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(245,158,11,0.05),transparent)]"
      : slideIndex != null && slideIndex % 2 === 1
        ? "bg-zinc-900/35 [background-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.04),transparent)]"
        : slideIndex != null && slideIndex % 2 === 0
          ? "bg-zinc-950/40"
          : null;

  return (
    <section
      id={id}
      data-workshop-slide={slideIndex != null ? slideIndex : undefined}
      className={cn(
        "scroll-mt-32 border-t border-white/[0.06] py-16 transition-[background] duration-500 md:scroll-mt-36 md:py-24",
        stripe,
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10 md:mb-14">
          {eyebrow ? (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-zinc-100 md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {description}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}
