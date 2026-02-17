"use server";

import { nanoid } from "nanoid";
import { db } from "@/db/drizzle";
import { cokeLog } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createCokeLogSchema, updateCokeLogSchema } from "@/lib/validations/coke-log";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// CREATE - Add new coke log entry
export async function createCokeLogAction(data: unknown) {
  // 1. Authenticate user
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // 2. Validate input
  const validatedData = createCokeLogSchema.parse(data);

  // 3. Insert into database
  const [newLog] = await db.insert(cokeLog).values({
    id: nanoid(),
    userId: session.user.id,
    ...validatedData,
  }).returning();

  // 4. Revalidate cache
  revalidatePath("/dashboard");

  return newLog;
}

// READ - Get all logs for current user
export async function getCokeLogsAction() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const logs = await db.query.cokeLog.findMany({
    where: eq(cokeLog.userId, session.user.id),
    orderBy: [desc(cokeLog.consumedAt)],
  });

  return logs;
}

// READ - Get single log by ID
export async function getCokeLogByIdAction(logId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const log = await db.query.cokeLog.findFirst({
    where: and(
      eq(cokeLog.id, logId),
      eq(cokeLog.userId, session.user.id)
    ),
  });

  if (!log) {
    throw new Error("Log not found");
  }

  return log;
}

// READ - Get public logs from all users (public feed)
export async function getPublicCokeLogsAction(limit: number = 50) {
  const logs = await db.query.cokeLog.findMany({
    where: eq(cokeLog.isPublic, true),
    orderBy: [desc(cokeLog.consumedAt)],
    limit,
    with: {
      user: {
        columns: {
          id: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return logs;
}

// UPDATE - Edit existing log
export async function updateCokeLogAction(logId: string, data: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const validatedData = updateCokeLogSchema.parse(data);

  const [updatedLog] = await db
    .update(cokeLog)
    .set(validatedData)
    .where(and(
      eq(cokeLog.id, logId),
      eq(cokeLog.userId, session.user.id)
    ))
    .returning();

  if (!updatedLog) {
    throw new Error("Log not found");
  }

  revalidatePath("/dashboard");

  return updatedLog;
}

// UPDATE - Toggle privacy of a log
export async function toggleCokeLogPrivacyAction(logId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // First, get the current log
  const currentLog = await db.query.cokeLog.findFirst({
    where: and(
      eq(cokeLog.id, logId),
      eq(cokeLog.userId, session.user.id)
    ),
  });

  if (!currentLog) {
    throw new Error("Log not found");
  }

  // Toggle the privacy
  const [updatedLog] = await db
    .update(cokeLog)
    .set({ isPublic: !currentLog.isPublic })
    .where(and(
      eq(cokeLog.id, logId),
      eq(cokeLog.userId, session.user.id)
    ))
    .returning();

  revalidatePath("/dashboard");
  revalidatePath("/feed");

  return updatedLog;
}

// DELETE - Remove log
export async function deleteCokeLogAction(logId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [deletedLog] = await db
    .delete(cokeLog)
    .where(and(
      eq(cokeLog.id, logId),
      eq(cokeLog.userId, session.user.id)
    ))
    .returning();

  if (!deletedLog) {
    throw new Error("Log not found");
  }

  revalidatePath("/dashboard");

  return { success: true };
}
