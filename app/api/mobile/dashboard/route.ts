import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCokeLogsByUser } from "@/server/services/coke-log-service";
import { getDashboardStats } from "@/server/services/stats-service";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const [stats, logs] = await Promise.all([
    getDashboardStats(userId),
    getCokeLogsByUser(userId),
  ]);
  const requestedTimeZone = new URL(request.url).searchParams.get("timeZone") ?? "UTC";
  let timeZone = "UTC";
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: requestedTimeZone });
    timeZone = requestedTimeZone;
  } catch {
    // Ignore invalid client values and keep the UTC default.
  }
  const dateKey = (date: Date) => new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  const todayKey = dateKey(new Date());
  const todayLogs = logs.filter((log) => dateKey(new Date(log.consumedAt)) === todayKey);

  return NextResponse.json({
    stats,
    today: {
      count: todayLogs.length,
      volumeML: todayLogs.reduce((total, log) => total + log.sizeML, 0),
    },
    recentLogs: logs.slice(0, 20),
  });
}
