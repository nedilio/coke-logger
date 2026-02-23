import { nanoid } from "nanoid";
import { db } from "@/db/drizzle";
import { userFollows } from "@/db/schemas";
import { eq, and, count } from "drizzle-orm";
import type { IUserFollowsRepository } from "./interfaces/i-follow-repository";

export class UserFollowsRepository implements IUserFollowsRepository {
  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const [existing] = await db
      .select()
      .from(userFollows)
      .where(
        and(
          eq(userFollows.followerId, followerId),
          eq(userFollows.followingId, followingId)
        )
      )
      .limit(1);
    return !!existing;
  }

  async follow(followerId: string, followingId: string): Promise<void> {
    const existing = await this.isFollowing(followerId, followingId);
    if (!existing) {
      await db.insert(userFollows).values({
        id: nanoid(),
        followerId,
        followingId,
      });
    }
  }

  async unfollow(followerId: string, followingId: string): Promise<void> {
    await db
      .delete(userFollows)
      .where(
        and(
          eq(userFollows.followerId, followerId),
          eq(userFollows.followingId, followingId)
        )
      );
  }

  async getFollowers(userId: string): Promise<string[]> {
    const followers = await db
      .select({ followerId: userFollows.followerId })
      .from(userFollows)
      .where(eq(userFollows.followingId, userId));
    return followers.map((f) => f.followerId);
  }

  async getFollowing(userId: string): Promise<string[]> {
    const following = await db
      .select({ followingId: userFollows.followingId })
      .from(userFollows)
      .where(eq(userFollows.followerId, userId));
    return following.map((f) => f.followingId);
  }

  async getFollowCounts(userId: string): Promise<{
    followers: number;
    following: number;
  }> {
    const [followersResult] = await db
      .select({ count: count() })
      .from(userFollows)
      .where(eq(userFollows.followingId, userId));

    const [followingResult] = await db
      .select({ count: count() })
      .from(userFollows)
      .where(eq(userFollows.followerId, userId));

    return {
      followers: followersResult?.count || 0,
      following: followingResult?.count || 0,
    };
  }
}

export const userFollowsRepository = new UserFollowsRepository();
