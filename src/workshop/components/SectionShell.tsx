import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-t border-white/[0.06] py-16 md:py-24",
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
