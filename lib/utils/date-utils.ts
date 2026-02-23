export type DatePeriod = "week" | "month";

export interface DateRange {
  start: Date;
  end: Date;
}

export function getWeekRange(date: Date = new Date()): DateRange {
  const now = new Date(date);
  const currentDay = now.getDay();
  const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  return { start: weekStart, end: weekEnd };
}

export function getMonthRange(date: Date = new Date()): DateRange {
  const now = new Date(date);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  monthEnd.setHours(23, 59, 59, 999);

  return { start: monthStart, end: monthEnd };
}

export function getDateRangeForPeriod(period: DatePeriod): DateRange {
  if (period === "week") {
    return getWeekRange();
  }
  return getMonthRange();
}

export function isDateInRange(date: Date, range: DateRange): boolean {
  return date >= range.start && date <= range.end;
}
