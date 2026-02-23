"use server";

import { cokeLogRepository } from "@/server/repositories";
import { calculateDashboardStats } from "@/lib/utils/stats-utils";
import type { DashboardStats } from "@/lib/utils/stats-utils";

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const logs = await cokeLogRepository.findByUserId(userId);
  return calculateDashboardStats(logs);
}
