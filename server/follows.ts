"use server";

import { nanoid } from "nanoid";
import { db } from "@/db/drizzle";
import { userFollows, user } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, and, like, or, count } from "drizzle-orm";

export interface UserWithFollowStatus {
  id: string;
  username: string | null;
  name: string | null;
  image: string | null;
  isFollowing: boolean;
  followersCount: number;
}

export interface FollowCounts {
  followers: number;
  following: number;
}

async function getCurrentUserId(): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user.id;
}

export async function followUser(targetUserId: string): Promise<void> {
  const currentUserId = await getCurrentUserId();

  if (currentUserId === targetUserId) {
    throw new Error("No puedes seguirte a ti mismo");
  }

  const existing = await db
    .select()
    .from(userFollows)
    .where(
      and(
        eq(userFollows.followerId, currentUserId),
        eq(userFollows.followingId, targetUserId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return;
  }

  await db.insert(userFollows).values({
    id: nanoid(),
    followerId: currentUserId,
    followingId: targetUserId,
  });
}

export async function unfollowUser(targetUserId: string): Promise<void> {
  const currentUserId = await getCurrentUserId();

  await db
    .delete(userFollows)
    .where(
      and(
        eq(userFollows.followerId, currentUserId),
        eq(userFollows.followingId, targetUserId)
      )
    );
}

export async function toggleFollow(targetUserId: string): Promise<{ isFollowing: boolean }> {
  const currentUserId = await getCurrentUserId();

  if (currentUserId === targetUserId) {
    throw new Error("No puedes seguirte a ti mismo");
  }

  const existing = await db
    .select()
    .from(userFollows)
    .where(
      and(
        eq(userFollows.followerId, currentUserId),
        eq(userFollows.followingId, targetUserId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(userFollows)
      .where(
        and(
          eq(userFollows.followerId, currentUserId),
          eq(userFollows.followingId, targetUserId)
        )
      );
    return { isFollowing: false };
  } else {
    await db.insert(userFollows).values({
      id: nanoid(),
      followerId: currentUserId,
      followingId: targetUserId,
    });
    return { isFollowing: true };
  }
}

export async function isFollowingAction(targetUserId: string): Promise<boolean> {
  const currentUserId = await getCurrentUserId();

  const existing = await db
    .select()
    .from(userFollows)
    .where(
      and(
        eq(userFollows.followerId, currentUserId),
        eq(userFollows.followingId, targetUserId)
      )
    )
    .limit(1);

  return existing.length > 0;
}

export async function getFollowingAction(): Promise<{
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
}[]> {
  const currentUserId = await getCurrentUserId();

  const following = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
    })
    .from(userFollows)
    .innerJoin(user, eq(userFollows.followingId, user.id))
    .where(eq(userFollows.followerId, currentUserId));

  return following;
}

export async function searchUsersAction(query: string): Promise<UserWithFollowStatus[]> {
  const currentUserId = await getCurrentUserId();
  const searchPattern = `%${query}%`;

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
    })
    .from(user)
    .where(
      and(
        eq(user.id, user.id),
        or(
          like(user.username, searchPattern),
          like(user.name, searchPattern)
        )
      )
    )
    .limit(20);

  const userIds = users.map((u) => u.id);

  if (userIds.length === 0) {
    return [];
  }

  const followingStatus = await db
    .select({
      followingId: userFollows.followingId,
    })
    .from(userFollows)
    .where(
      and(
        eq(userFollows.followerId, currentUserId),
        eq(userFollows.followingId, userIds[0])
      )
    );

  const followingMap = new Set(followingStatus.map((f) => f.followingId));

  const followerCounts = await db
    .select({
      followingId: userFollows.followingId,
      count: count(),
    })
    .from(userFollows)
    .groupBy(userFollows.followingId);

  const countsMap = new Map(followerCounts.map((c) => [c.followingId, c.count]));

  return users.map((u) => ({
    id: u.id,
    username: u.username,
    name: u.name,
    image: u.image,
    isFollowing: followingMap.has(u.id),
    followersCount: countsMap.get(u.id) || 0,
  }));
}

export async function getAllUsersWithFollowStatus(): Promise<UserWithFollowStatus[]> {
  const currentUserId = await getCurrentUserId();

  const users = await db
    .select({
      id: user.id,
      name: user.name,
      username: user.username,
      image: user.image,
    })
    .from(user)
    .where(eq(user.id, user.id));

  const following = await db
    .select({ followingId: userFollows.followingId })
    .from(userFollows)
    .where(eq(userFollows.followerId, currentUserId));

  const followingSet = new Set(following.map((f) => f.followingId));

  const followerCounts = await db
    .select({
      followingId: userFollows.followingId,
      count: count(),
    })
    .from(userFollows)
    .groupBy(userFollows.followingId);

  const countsMap = new Map(followerCounts.map((c) => [c.followingId, c.count]));

  return users
    .filter((u) => u.id !== currentUserId)
    .map((u) => ({
      id: u.id,
      username: u.username,
      name: u.name,
      image: u.image,
      isFollowing: followingSet.has(u.id),
      followersCount: countsMap.get(u.id) || 0,
    }));
}

export async function getUserFollowCounts(userId: string): Promise<FollowCounts> {
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

export async function getFollowingIds(): Promise<string[]> {
  const currentUserId = await getCurrentUserId();

  const following = await db
    .select({ followingId: userFollows.followingId })
    .from(userFollows)
    .where(eq(userFollows.followerId, currentUserId));

  return following.map((f) => f.followingId);
}
