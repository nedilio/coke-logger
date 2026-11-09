import { Check } from "lucide-react";
import { CokeLogo } from "@/components/coke-logo";

const BENEFITS = [
  "Registra una cokita en dos toques",
  "Resumen de la semana, el mes y el total",
  "La misma cuenta y los mismos datos que en la web",
] as const;

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const DEMO_PERCENT = 72;

function AppleLogo({ className }: { className?: string }): React.ReactElement {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22z" />
    </svg>
  );
}

function PhoneMockup(): React.ReactElement {
  const offset = RING_CIRCUMFERENCE * (1 - DEMO_PERCENT / 100);

  return (
    <div className="relative mx-auto w-60 sm:w-64 float" aria-hidden>
      <div className="absolute inset-0 -z-10 rounded-[3rem] bg-coke-red/40 blur-3xl" />
      <div className="rounded-[2.8rem] bg-gradient-to-b from-white/25 to-white/5 p-[3px] shadow-2xl">
        <div className="relative overflow-hidden rounded-[2.65rem] bg-coke-ink">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-10 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />

          <div className="flex flex-col gap-4 px-4 pb-6 pt-12">
            <div className="flex items-center gap-2">
              <CokeLogo className="size-7" />
              <span className="font-display text-sm font-bold">Hoy</span>
            </div>

            <div className="card-coke flex flex-col items-center gap-2 p-4">
              <div className="relative size-24">
                <svg viewBox="0 0 80 80" className="size-full -rotate-90">
                  <circle cx="40" cy="40" r={RING_RADIUS} fill="none" stroke="oklch(1 0 0 / 0.15)" strokeWidth="7" />
                  <circle
                    cx="40"
                    cy="40"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="white"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={RING_CIRCUMFERENCE}
                    strokeDashoffset={offset}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold">
                  {DEMO_PERCENT}%
                </span>
              </div>
              <p className="font-display text-2xl font-bold leading-none">1.42L</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">esta semana</p>
            </div>

            {[
              { label: "Original · lata", size: "350ml", w: "w-full" },
              { label: "Zero · vidrio", size: "237ml", w: "w-3/4" },
              { label: "Original · plástico", size: "500ml", w: "w-1/2" },
            ].map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>{row.label}</span>
                  <span>{row.size}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div className={`bar-coke h-full rounded-full ${row.w}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function IosAppSection(): React.ReactElement {
  return (
    <section id="ios" className="relative z-10 px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-coke-red/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-coke-bright ring-1 ring-coke-red/30">
            Muy pronto
          </span>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Pronto en tu <span className="text-gradient">iPhone</span>
          </h2>
          <p className="mb-8 text-lg text-white/60">
            Estamos terminando Cocacolita, la app nativa de Coke Logger. Registra
            tu cokita al momento, sin abrir el navegador.
          </p>

          <ul className="mb-10 space-y-3 text-left">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-white/80">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full btn-coke">
                  <Check className="size-3.5" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div
            aria-disabled
            className="inline-flex cursor-not-allowed items-center gap-3 rounded-xl border border-white/15 bg-black/60 px-5 py-3 text-left opacity-80"
          >
            <AppleLogo className="size-7" />
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-white/60">
                Próximamente en
              </span>
              <span className="block font-display text-lg font-semibold leading-tight">
                App Store
              </span>
            </span>
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}
