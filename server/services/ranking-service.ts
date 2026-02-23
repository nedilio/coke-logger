"use server";

import { db } from "@/db/drizzle";
import { cokeLog, user, userFollows } from "@/db/schemas";
import { getDateRangeForPeriod } from "@/lib/utils/date-utils";
import { formatMLToL, mapCokeTypeToDisplay } from "@/lib/utils/format-utils";
import { getCurrentUserId } from "./auth-service";
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

export async function getDateRangeLabel(
  period: RankingPeriod,
): Promise<string> {
  const { start, end } = getDateRangeForPeriod(period);
  const monthFormatter = new Intl.DateTimeFormat("es-ES", { month: "long" });

  if (period === "week") {
    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = monthFormatter.format(start);
    const endMonth = monthFormatter.format(end);
    const year = end.getFullYear();

    if (start.getMonth() === end.getMonth()) {
      return `${startDay} - ${endDay} de ${startMonth} ${year}`;
    }
    return `${startDay} de ${startMonth} - ${endDay} de ${endMonth} ${year}`;
  } else {
    const month = monthFormatter.format(start);
    const year = start.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  }
}

export async function getRanking(
  period: RankingPeriod,
  filter: RankingFilter = "following",
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
    userIdsFilter = [...followingIds, currentUserId];

    if (userIdsFilter.length === 0) {
      return [];
    }
  }

  const baseCondition = and(
    eq(cokeLog.isPublic, true),
    gte(cokeLog.consumedAt, start),
    lte(cokeLog.consumedAt, end),
  );

  let whereCondition;
  if (userIdsFilter) {
    whereCondition = and(baseCondition, inArray(cokeLog.userId, userIdsFilter));
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
    favoriteType: mapCokeTypeToDisplay(row.favoriteType || "original"),
  }));
}
