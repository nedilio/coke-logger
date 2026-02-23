import { nanoid } from "nanoid";
import { db } from "@/db/drizzle";
import { cokeLog } from "@/db/schemas";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import type { ICokeLogRepository } from "./interfaces/i-coke-log-repository";
import type { CokeLog, NewCokeLog } from "@/db/schemas";

export class CokeLogRepository implements ICokeLogRepository {
  async create(data: Omit<NewCokeLog, "id">): Promise<CokeLog> {
    const [newLog] = await db
      .insert(cokeLog)
      .values({ id: nanoid(), ...data })
      .returning();
    return newLog;
  }

  async findById(id: string): Promise<CokeLog | null> {
    const [log] = await db
      .select()
      .from(cokeLog)
      .where(eq(cokeLog.id, id))
      .limit(1);
    return log || null;
  }

  async findByUserId(userId: string): Promise<CokeLog[]> {
    return db
      .select()
      .from(cokeLog)
      .where(eq(cokeLog.userId, userId))
      .orderBy(desc(cokeLog.consumedAt));
  }

  async findPublic(limit: number = 50): Promise<CokeLog[]> {
    return db
      .select()
      .from(cokeLog)
      .where(eq(cokeLog.isPublic, true))
      .orderBy(desc(cokeLog.consumedAt))
      .limit(limit);
  }

  async findByUserIdInDateRange(
    userId: string,
    start: Date,
    end: Date
  ): Promise<CokeLog[]> {
    return db
      .select()
      .from(cokeLog)
      .where(
        and(
          eq(cokeLog.userId, userId),
          gte(cokeLog.consumedAt, start),
          lte(cokeLog.consumedAt, end)
        )
      );
  }

  async update(
    id: string,
    data: Partial<NewCokeLog>
  ): Promise<CokeLog | null> {
    const [updated] = await db
      .update(cokeLog)
      .set(data)
      .where(eq(cokeLog.id, id))
      .returning();
    return updated || null;
  }

  async delete(id: string): Promise<CokeLog | null> {
    const [deleted] = await db
      .delete(cokeLog)
      .where(eq(cokeLog.id, id))
      .returning();
    return deleted || null;
  }
}

export const cokeLogRepository = new CokeLogRepository();
