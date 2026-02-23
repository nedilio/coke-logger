"use server";

import { requireUserId } from "@/server/services/auth-service";
import {
  followUser as followUserService,
  unfollowUser as unfollowUserService,
  toggleFollow as toggleFollowService,
  isFollowing as isFollowingService,
  getFollowing as getFollowingService,
  searchUsers as searchUsersService,
  getAllUsersWithFollowStatus as getAllUsersWithFollowStatusService,
  getUserFollowCounts as getUserFollowCountsService,
  getFollowingIds as getFollowingIdsService,
} from "@/server/services/follow-service";

export type { UserWithFollowStatus, FollowCounts } from "@/server/services/follow-service";

export { getUserFollowCountsService as getUserFollowCounts };

export async function getAllUsersWithFollowStatus() {
  const currentUserId = await requireUserId();
  return getAllUsersWithFollowStatusService(currentUserId);
}

export async function toggleFollow(targetUserId: string) {
  const currentUserId = await requireUserId();
  return toggleFollowService(currentUserId, targetUserId);
}

export async function followUserAction(targetUserId: string): Promise<void> {
  const currentUserId = await requireUserId();
  return followUserService(currentUserId, targetUserId);
}

export async function unfollowUserAction(targetUserId: string): Promise<void> {
  const currentUserId = await requireUserId();
  return unfollowUserService(currentUserId, targetUserId);
}

export async function toggleFollowAction(targetUserId: string) {
  const currentUserId = await requireUserId();
  return toggleFollowService(currentUserId, targetUserId);
}

export async function isFollowingAction(targetUserId: string): Promise<boolean> {
  const currentUserId = await requireUserId();
  return isFollowingService(currentUserId, targetUserId);
}

export async function getFollowingAction() {
  const currentUserId = await requireUserId();
  return getFollowingService(currentUserId);
}

export async function searchUsersAction(query: string) {
  const currentUserId = await requireUserId();
  return searchUsersService(currentUserId, query);
}

export async function getAllUsersWithFollowStatusAction() {
  const currentUserId = await requireUserId();
  return getAllUsersWithFollowStatusService(currentUserId);
}

export async function getUserFollowCountsAction(userId: string) {
  return getUserFollowCountsService(userId);
}

export async function getFollowingIdsAction() {
  const currentUserId = await requireUserId();
  return getFollowingIdsService(currentUserId);
}
