"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
import { PillSelector } from "@/components/pill-selector";
import {
  getRankingAction,
  getDateRangeLabel,
  type RankingEntry,
  type RankingPeriod,
  type RankingFilter,
} from "@/server/ranking";
import { AppHeader } from "@/components/app-header";
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
  { value: "following", label: "Siguiendo" },
  { value: "all", label: "Todos" },
] as const;

const PERIOD_OPTIONS = [
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
] as const;

export default function RankingPage() {
  const [period, setPeriod] = useState<RankingPeriod>("week");
  const [filter, setFilter] = useState<RankingFilter>("following");
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [dateLabel, setDateLabel] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const filterOptions = useMemo(() => FILTER_OPTIONS, []);
  const periodOptions = useMemo(() => PERIOD_OPTIONS, []);
  const maxML = useMemo(
    () => ranking.reduce((max, entry) => Math.max(max, entry.totalML), 0),
    [ranking],
  );

  useEffect(() => {
    startTransition(async () => {
      const [data, label] = await Promise.all([
        getRankingAction(period, filter),
        getDateRangeLabel(period),
      ]);
      setRanking(data);
      setDateLabel(label);
    });
  }, [period, filter]);

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-6">
      <AppHeader
        title="Ranking"
        description="Descubre quién consume más Coca-Cola"
      />

      <div className="flex gap-4">
        <PillSelector
          name="filter"
          options={filterOptions}
          value={filter}
          onChange={(value) => setFilter(value as RankingFilter)}
        />
      </div>

      <PillSelector
        name="period"
        options={periodOptions}
        value={period}
        onChange={(value) => setPeriod(value as RankingPeriod)}
      />

      <p className="text-xs uppercase tracking-[0.2em] text-white/50">{dateLabel}</p>

      <div className="card-noir p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          <span>Usuario</span>
          <span>Total</span>
        </div>

        {isPending ? (
          <p className="py-8 text-center text-white/50">Cargando...</p>
        ) : ranking.length === 0 ? (
          <p className="py-8 text-center text-white/50">
            {filter === "following"
              ? "No hay datos de usuarios que sigues. ¡Sigue a más personas!"
              : "No hay datos para este período"}
          </p>
        ) : (
          <ol className="space-y-3">
            {ranking.map((entry) => {
              const width =
                maxML > 0 ? Math.max(8, Math.round((entry.totalML / maxML) * 100)) : 8;
              const isPodium = entry.position <= 3;

              return (
                <li
                  key={entry.position}
                  className="grid grid-cols-[2rem_minmax(0,7rem)_1fr] sm:grid-cols-[2.5rem_minmax(0,10rem)_1fr] items-center gap-3"
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                      isPodium
                        ? "btn-coke text-white"
                        : "bg-white/5 text-white/50 ring-1 ring-white/10",
                    )}
                  >
                    {entry.position}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold uppercase tracking-wide text-white">
                      {entry.username}
                    </p>
                    <p className="truncate text-xs capitalize text-white/40">
                      {entry.favoriteType}
                    </p>
                  </div>
                  <div className="h-8 rounded-full bg-white/5">
                    <div
                      className="bar-coke flex h-full min-w-[4.5rem] items-center justify-end rounded-full px-3 transition-[width] duration-700 ease-out"
                      style={{ width: `${width}%` }}
                    >
                      <span className="text-xs font-semibold text-white tabular-nums">
                        {entry.totalL}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
