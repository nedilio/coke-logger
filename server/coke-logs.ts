"use server";

import { requireUserId } from "@/server/services/auth-service";
import {
  createCokeLog,
  getCokeLogsByUser,
  getCokeLogById,
  getPublicCokeLogs,
  updateCokeLog,
  toggleCokeLogPrivacy,
  deleteCokeLog,
} from "@/server/services/coke-log-service";
import { getDashboardStats } from "@/server/services/stats-service";
import {
  createCokeLogSchema,
  updateCokeLogSchema,
} from "@/lib/validations/coke-log";

export async function createCokeLogAction(data: unknown) {
  const userId = await requireUserId();
  const validatedData = createCokeLogSchema.parse(data);
  return createCokeLog(userId, validatedData);
}

export async function getCokeLogsAction() {
  const userId = await requireUserId();
  return getCokeLogsByUser(userId);
}

export async function getDashboardStatsAction() {
  const userId = await requireUserId();
  return getDashboardStats(userId);
}

export async function getCokeLogByIdAction(logId: string) {
  const userId = await requireUserId();
  return getCokeLogById(userId, logId);
}

export async function getPublicCokeLogsAction(limit: number = 50) {
  return getPublicCokeLogs(limit);
}

export async function updateCokeLogAction(logId: string, data: unknown) {
  const userId = await requireUserId();
  const validatedData = updateCokeLogSchema.parse(data);
  return updateCokeLog(userId, logId, validatedData);
}

export async function toggleCokeLogPrivacyAction(logId: string) {
  const userId = await requireUserId();
  return toggleCokeLogPrivacy(userId, logId);
}

export async function deleteCokeLogAction(logId: string) {
  const userId = await requireUserId();
  return deleteCokeLog(userId, logId);
}
