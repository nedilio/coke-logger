"use server";

import { userFollowsRepository, userRepository } from "@/server/repositories";

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

export async function followUser(
  followerId: string,
  targetUserId: string,
): Promise<void> {
  if (followerId === targetUserId) {
    throw new Error("No puedes seguirte a ti mismo");
  }

  await userFollowsRepository.follow(followerId, targetUserId);
}

export async function unfollowUser(
  followerId: string,
  targetUserId: string,
): Promise<void> {
  await userFollowsRepository.unfollow(followerId, targetUserId);
}

export async function toggleFollow(
  followerId: string,
  targetUserId: string,
): Promise<{ isFollowing: boolean }> {
  if (followerId === targetUserId) {
    throw new Error("No puedes seguirte a ti mismo");
  }

  const isFollowing = await userFollowsRepository.isFollowing(
    followerId,
    targetUserId,
  );

  if (isFollowing) {
    await userFollowsRepository.unfollow(followerId, targetUserId);
    return { isFollowing: false };
  } else {
    await userFollowsRepository.follow(followerId, targetUserId);
    return { isFollowing: true };
  }
}

export async function isFollowing(
  followerId: string,
  targetUserId: string,
): Promise<boolean> {
  return userFollowsRepository.isFollowing(followerId, targetUserId);
}

export async function getFollowing(
  userId: string,
): Promise<
  {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  }[]
> {
  const followingIds = await userFollowsRepository.getFollowing(userId);
  const users = await Promise.all(
    followingIds.map((id) => userRepository.findById(id)),
  );
  return users.filter((u): u is NonNullable<typeof u> => u !== null);
}

export async function getUserFollowCounts(
  userId: string,
): Promise<FollowCounts> {
  return userFollowsRepository.getFollowCounts(userId);
}

export async function searchUsers(
  currentUserId: string,
  query: string,
): Promise<UserWithFollowStatus[]> {
  const users = await userRepository.search(query, 20);
  const userIds = users.map((u) => u.id);

  if (userIds.length === 0) {
    return [];
  }

  const followingIds = await userFollowsRepository.getFollowing(currentUserId);
  const followingSet = new Set(followingIds);

  const followerCounts = await Promise.all(
    userIds.map((id) => userFollowsRepository.getFollowCounts(id)),
  );

  return users.map((u, index) => ({
    id: u.id,
    username: u.username,
    name: u.name,
    image: u.image,
    isFollowing: followingSet.has(u.id),
    followersCount: followerCounts[index].followers,
  }));
}

export async function getAllUsersWithFollowStatus(
  currentUserId: string,
): Promise<UserWithFollowStatus[]> {
  const followingIds = await userFollowsRepository.getFollowing(currentUserId);
  const followingSet = new Set(followingIds);

  const allUsers = await userRepository.search("", 100);
  const userIds = allUsers
    .map((u) => u.id)
    .filter((id) => id !== currentUserId);

  const followerCounts = await Promise.all(
    userIds.map((id) => userFollowsRepository.getFollowCounts(id)),
  );

  return allUsers
    .filter((u) => u.id !== currentUserId)
    .map((u, index) => ({
      id: u.id,
      username: u.username,
      name: u.name,
      image: u.image,
      isFollowing: followingSet.has(u.id),
      followersCount: followerCounts[index].followers,
    }));
}

export async function getFollowingIds(userId: string): Promise<string[]> {
  return userFollowsRepository.getFollowing(userId);
}
