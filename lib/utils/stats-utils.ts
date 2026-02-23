import type { CokeLog } from "@/db/schemas";
import { getDateRangeForPeriod, isDateInRange } from "./date-utils";

export interface DashboardStats {
  totalLogs: number;
  logsThisWeek: number;
  mlThisWeek: number;
  mlThisMonth: number;
  favoriteType: string;
  favoriteSizeML: number;
}

export function calculateDashboardStats(logs: CokeLog[]): DashboardStats {
  const weekRange = getDateRangeForPeriod("week");
  const monthRange = getDateRangeForPeriod("month");

  const totalLogs = logs.length;

  let logsThisWeek = 0;
  let mlThisWeek = 0;
  let mlThisMonth = 0;
  const cokeTypes: string[] = [];
  const sizes: number[] = [];

  for (const log of logs) {
    const consumedAt = new Date(log.consumedAt);
    const inWeek = isDateInRange(consumedAt, weekRange);
    const inMonth = isDateInRange(consumedAt, monthRange);

    if (inWeek) {
      logsThisWeek++;
      mlThisWeek += log.sizeML;
    }

    if (inMonth) {
      mlThisMonth += log.sizeML;
    }

    cokeTypes.push(log.cokeType);
    sizes.push(log.sizeML);
  }

  const favoriteType = calculateMode(cokeTypes) || "None";
  const favoriteSizeML = (calculateMode(sizes) as number | undefined) || 0;

  return {
    totalLogs,
    logsThisWeek,
    mlThisWeek,
    mlThisMonth,
    favoriteType,
    favoriteSizeML,
  };
}

export function calculateMode<T extends string | number>(
  values: T[]
): T | undefined {
  if (values.length === 0) return undefined;

  const counts = values.reduce(
    (acc, val) => {
      const key = String(val);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] as T;
}

export function calculateTotalML(logs: CokeLog[]): number {
  return logs.reduce((sum, log) => sum + log.sizeML, 0);
}

export function calculateAverageML(logs: CokeLog[]): number {
  if (logs.length === 0) return 0;
  return calculateTotalML(logs) / logs.length;
}
