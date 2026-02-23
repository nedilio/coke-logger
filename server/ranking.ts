"use server";

import { db } from "@/db/drizzle";
import { cokeLog, user, userFollows } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, gte, lte, sql, desc, inArray } from "drizzle-orm";

export interface RankingEntry {
  position: number;
  username: string;
  totalML: number;
  totalL: string;
  favoriteType: string;
}

export type RankingPeriod = "week" | "month";
export type RankingFilter = "following" | "all";

export async function getDateRangeLabel(period: RankingPeriod): Promise<string> {
  const { start, end } = getDateRangeForPeriod(period);
  const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long" });
  
  if (period === "week") {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = monthFormatter.format(start);
    return `${startDay} - ${endDay} de ${month}`;
  } else {
    const month = monthFormatter.format(start);
    const year = start.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }
}

function getDateRangeForPeriod(period: RankingPeriod): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  if (period === "week") {
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    start.setDate(now.getDate() + mondayOffset);
    start.setHours(0, 0, 0, 0);
    
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
}

function formatMLToL(ml: number): string {
  const liters = ml / 1000;
  if (liters >= 1) {
    return `${liters.toFixed(1)}L`;
  }
  return `${ml}ml`;
}

function mapCokeType(type: string): string {
  const typeMap: Record<string, string> = {
    original: "Original",
    zero: "Zero",
    light: "Light",
  };
  return typeMap[type.toLowerCase()] || type;
}

async function getCurrentUserId(): Promise<string | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id || null;
}

export async function getRankingAction(
  period: RankingPeriod, 
  filter: RankingFilter = "following"
): Promise<RankingEntry[]> {
  const { start, end } = getDateRangeForPeriod(period);
  const currentUserId = await getCurrentUserId();

  let userIdsFilter: string[] | undefined;

  if (filter === "following" && currentUserId) {
    const following = await db
      .select({ followingId: userFollows.followingId })
      .from(userFollows)
      .where(eq(userFollows.followerId, currentUserId));
    
    const followingIds = following.map((f) => f.followingId);
    userIdsFilter = [...followingIds, currentUserId]; // Include current user
    
    if (userIdsFilter.length === 0) {
      return [];
    }
  }

  const baseCondition = and(
    eq(cokeLog.isPublic, true),
    gte(cokeLog.consumedAt, start),
    lte(cokeLog.consumedAt, end)
  );

  let whereCondition;
  if (userIdsFilter) {
    whereCondition = and(
      baseCondition,
      inArray(cokeLog.userId, userIdsFilter)
    );
  } else {
    whereCondition = baseCondition;
  }

  const results = await db
    .select({
      username: user.username,
      totalML: sql<number>`COALESCE(SUM(${cokeLog.sizeML}), 0)`,
      favoriteType: sql<string>`MODE() WITHIN GROUP (ORDER BY ${cokeLog.cokeType})`,
    })
    .from(cokeLog)
    .innerJoin(user, eq(cokeLog.userId, user.id))
    .where(whereCondition)
    .groupBy(user.id, user.username)
    .orderBy(desc(sql`COALESCE(SUM(${cokeLog.sizeML}), 0)`));

  return results.map((row, index) => ({
    position: index + 1,
    username: row.username || "Unknown",
    totalML: Number(row.totalML),
    totalL: formatMLToL(Number(row.totalML)),
    favoriteType: mapCokeType(row.favoriteType || "original"),
  }));
}
