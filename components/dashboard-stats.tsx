import { FlaskConical, Droplets, Heart, Calendar } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsProps {
  totalLogs: number;
  logsThisWeek: number;
  favoriteType: string;
  favoriteSizeML: number;
  mlThisWeek: number;
  mlThisMonth: number;
}

function formatVolume(ml: number): string {
  return ml >= 1000 ? `${(ml / 1000).toFixed(2)}L` : `${ml}ml`;
}

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function ProgressRing({ percent }: { percent: number }): React.ReactElement {
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="relative size-40 sm:size-44 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="coke-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--coke-bright)" />
            <stop offset="60%" stopColor="var(--coke-red)" />
            <stop offset="100%" stopColor="var(--coke-crimson)" />
          </linearGradient>
          <filter id="coke-ring-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth="9"
        />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          stroke="url(#coke-ring)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          filter="url(#coke-ring-glow)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold text-white tabular-nums">
          {percent}%
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
          del mes
        </span>
      </div>
    </div>
  );
}

interface StatTileProps {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  className?: string;
}

function StatTile({ label, value, icon: Icon, className }: StatTileProps): React.ReactElement {
  return (
    <div className={cn("card-noir p-4 sm:p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
          {label}
        </span>
        <div className="rounded-full bg-coke-red/15 p-2 ring-1 ring-coke-red/30">
          <Icon className="size-4 text-coke-bright" />
        </div>
      </div>
      <div className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</div>
    </div>
  );
}

export function DashboardStats(props: DashboardStatsProps): React.ReactElement {
  // Share of this month's volume consumed this week. The week can start in the
  // previous month, so mlThisWeek may exceed mlThisMonth: clamp to 0–100.
  const weekShare =
    props.mlThisMonth > 0
      ? Math.min(100, Math.max(0, Math.round((props.mlThisWeek / props.mlThisMonth) * 100)))
      : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Hero card */}
      <div className="card-coke relative overflow-hidden p-5 sm:p-6 lg:col-span-3 flex flex-col sm:flex-row items-center gap-6">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <ProgressRing percent={weekShare} />
        <div className="relative flex-1 text-center sm:text-left space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Esta semana
          </p>
          <p className="font-display text-4xl sm:text-5xl font-bold text-white leading-none">
            {formatVolume(props.mlThisWeek)}
          </p>
          <p className="text-sm text-white/75">
            {props.logsThisWeek} {props.logsThisWeek === 1 ? "cokita" : "cokitas"} esta semana ·{" "}
            {weekShare}% de lo que llevas este mes
          </p>
        </div>
      </div>

      {/* Secondary tiles */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-2">
        <StatTile
          label="Este mes"
          value={formatVolume(props.mlThisMonth)}
          icon={Calendar}
        />
        <StatTile
          label="Total"
          value={`${props.totalLogs}`}
          icon={FlaskConical}
        />
        <StatTile
          label="Favorita"
          value={<span className="capitalize">{props.favoriteType}</span>}
          icon={Heart}
        />
        <StatTile
          label="Tamaño top"
          value={props.favoriteSizeML ? `${props.favoriteSizeML}ml` : "—"}
          icon={Droplets}
        />
      </div>
    </div>
  );
}
