"use server";

import { cokeLogRepository } from "@/server/repositories";
import type { CokeLog } from "@/db/schemas";
import type { CreateCokeLogInput, UpdateCokeLogInput } from "@/lib/validations/coke-log";
import { revalidatePath } from "next/cache";

export async function createCokeLog(
  userId: string,
  data: CreateCokeLogInput
): Promise<CokeLog> {
  const newLog = await cokeLogRepository.create({
    userId,
    ...data,
  });

  revalidatePath("/dashboard");
  revalidatePath("/create");

  return newLog;
}

export async function getCokeLogById(
  userId: string,
  logId: string
): Promise<CokeLog> {
  const log = await cokeLogRepository.findById(logId);
  if (!log || log.userId !== userId) {
    throw new Error("Log not found");
  }
  return log;
}

export async function getCokeLogsByUser(userId: string): Promise<CokeLog[]> {
  return cokeLogRepository.findByUserId(userId);
}

export async function getPublicCokeLogs(limit: number = 50): Promise<CokeLog[]> {
  return cokeLogRepository.findPublic(limit);
}

export async function updateCokeLog(
  userId: string,
  logId: string,
  data: UpdateCokeLogInput
): Promise<CokeLog> {
  const existing = await cokeLogRepository.findById(logId);
  if (!existing || existing.userId !== userId) {
    throw new Error("Log not found");
  }

  const updated = await cokeLogRepository.update(logId, data);
  if (!updated) {
    throw new Error("Failed to update log");
  }

  revalidatePath("/dashboard");

  return updated;
}

export async function toggleCokeLogPrivacy(
  userId: string,
  logId: string
): Promise<CokeLog> {
  const existing = await cokeLogRepository.findById(logId);
  if (!existing || existing.userId !== userId) {
    throw new Error("Log not found");
  }

  const updated = await cokeLogRepository.update(logId, {
    isPublic: !existing.isPublic,
  });
  if (!updated) {
    throw new Error("Failed to update log");
  }

  revalidatePath("/dashboard");
  revalidatePath("/feed");

  return updated;
}

export async function deleteCokeLog(
  userId: string,
  logId: string
): Promise<{ success: boolean }> {
  const existing = await cokeLogRepository.findById(logId);
  if (!existing || existing.userId !== userId) {
    throw new Error("Log not found");
  }

  await cokeLogRepository.delete(logId);

  revalidatePath("/dashboard");

  return { success: true };
}
