"use client";

import { useState, useEffect, useTransition, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PillSelector } from "@/components/pill-selector";
import {
  getRankingAction,
  getDateRangeLabel,
  type RankingEntry,
  type RankingPeriod,
  type RankingFilter,
} from "@/server/ranking";
import { AppHeader } from "@/components/app-header";

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

      <p className="text-sm text-muted-foreground">{dateLabel}</p>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">#</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead className="text-right">ML (L)</TableHead>
              <TableHead className="text-right">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  Cargando...
                </TableCell>
              </TableRow>
            ) : ranking.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  {filter === "following"
                    ? "No hay datos de usuarios que sigues. ¡Sigue a más personas!"
                    : "No hay datos para este período"}
                </TableCell>
              </TableRow>
            ) : (
              ranking.map((entry) => (
                <TableRow key={entry.position}>
                  <TableCell className="font-medium">
                    {entry.position}
                  </TableCell>
                  <TableCell>{entry.username}</TableCell>
                  <TableCell className="text-right">{entry.totalL}</TableCell>
                  <TableCell className="text-right">
                    {entry.favoriteType}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
