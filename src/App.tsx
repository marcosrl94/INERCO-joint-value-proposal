import { lazy, Suspense } from "react";

const WorkshopPage = lazy(() =>
  import("@/workshop/WorkshopPage").then((m) => ({ default: m.WorkshopPage }))
);

function WorkshopFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 antialiased"
      role="status"
      aria-live="polite"
    >
      <span className="text-sm">Cargando workshop…</span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<WorkshopFallback />}>
      <WorkshopPage />
    </Suspense>
  );
}
