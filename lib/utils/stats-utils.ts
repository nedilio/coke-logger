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

  const logsThisWeek = logs.filter((log) =>
    isDateInRange(new Date(log.consumedAt), weekRange)
  ).length;

  const mlThisWeek = logs
    .filter((log) => isDateInRange(new Date(log.consumedAt), weekRange))
    .reduce((sum, log) => sum + log.sizeML, 0);

  const mlThisMonth = logs
    .filter((log) => isDateInRange(new Date(log.consumedAt), monthRange))
    .reduce((sum, log) => sum + log.sizeML, 0);

  const favoriteType = calculateMode(
    logs.map((log) => log.cokeType)
  ) || "None";

  const favoriteSizeML = calculateMode(
    logs.map((log) => log.sizeML)
  ) || 0;

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
