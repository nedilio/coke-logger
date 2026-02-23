import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const userFollows = pgTable(
  "user_follows",
  {
    id: text("id").primaryKey(),
    followerId: text("follower_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("user_follows_follower_following_idx").on(table.followerId, table.followingId),
    index("user_follows_follower_idx").on(table.followerId),
    index("user_follows_following_idx").on(table.followingId),
  ]
);

export const userFollowsRelations = relations(userFollows, ({ one }) => ({
  follower: one(user, {
    fields: [userFollows.followerId],
    references: [user.id],
    relationName: "follower",
  }),
  following: one(user, {
    fields: [userFollows.followingId],
    references: [user.id],
    relationName: "following",
  }),
}));

export type UserFollow = typeof userFollows.$inferSelect;
export type NewUserFollow = typeof userFollows.$inferInsert;
