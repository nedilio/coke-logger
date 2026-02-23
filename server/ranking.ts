"use server";

import { getDateRangeLabel, getRanking } from "@/server/services/ranking-service";
import type { RankingEntry, RankingPeriod, RankingFilter } from "@/server/services/ranking-service";

export type { RankingEntry, RankingPeriod, RankingFilter };

export { getDateRangeLabel };

export async function getRankingAction(
  period: RankingPeriod,
  filter: RankingFilter = "following"
): Promise<RankingEntry[]> {
  return getRanking(period, filter);
}
