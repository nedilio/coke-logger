"use server";

import { getDateRangeLabel, getRanking } from "@/server/services/ranking-service";

export type RankingPeriod = "week" | "month";
export type RankingFilter = "following" | "all";

export interface RankingEntry {
  position: number;
  username: string;
  totalML: number;
  totalL: string;
  favoriteType: string;
}

export { getDateRangeLabel };

export async function getRankingAction(
  period: RankingPeriod,
  filter: RankingFilter = "following"
): Promise<RankingEntry[]> {
  return getRanking(period, filter);
}
