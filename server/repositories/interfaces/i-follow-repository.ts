export interface IUserFollowsRepository {
  isFollowing(followerId: string, followingId: string): Promise<boolean>;
  follow(followerId: string, followingId: string): Promise<void>;
  unfollow(followerId: string, followingId: string): Promise<void>;
  getFollowers(userId: string): Promise<string[]>;
  getFollowing(userId: string): Promise<string[]>;
  getFollowCounts(userId: string): Promise<{
    followers: number;
    following: number;
  }>;
}
