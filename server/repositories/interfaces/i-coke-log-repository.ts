import type { CokeLog, NewCokeLog } from "@/db/schemas";

export interface ICokeLogRepository {
  create(data: NewCokeLog): Promise<CokeLog>;
  findById(id: string): Promise<CokeLog | null>;
  findByUserId(userId: string): Promise<CokeLog[]>;
  findPublic(limit?: number): Promise<CokeLog[]>;
  findByUserIdInDateRange(
    userId: string,
    start: Date,
    end: Date
  ): Promise<CokeLog[]>;
  update(id: string, data: Partial<NewCokeLog>): Promise<CokeLog | null>;
  delete(id: string): Promise<CokeLog | null>;
}
