import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, boolean, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const cokeLog = pgTable(
  "coke_log",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    cokeType: text("coke_type").notNull(), // "original", "zero", "light"
    format: text("format").notNull(), // "glass", "can", "plastic"
    sizeML: integer("size_ml").notNull(),
    notes: text("notes"),
    isPublic: boolean("is_public").default(false).notNull(),
    consumedAt: timestamp("consumed_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("coke_log_userId_idx").on(table.userId),
    index("coke_log_consumedAt_idx").on(table.consumedAt),
    index("coke_log_isPublic_idx").on(table.isPublic),
  ],
);

export const cokeLogRelations = relations(cokeLog, ({ one }) => ({
  user: one(user, {
    fields: [cokeLog.userId],
    references: [user.id],
  }),
}));

// Export types for use in components
export type CokeLog = typeof cokeLog.$inferSelect;
export type NewCokeLog = typeof cokeLog.$inferInsert;
