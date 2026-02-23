import { db } from "@/db/drizzle";
import { user, userFollows } from "@/db/schemas";
import { eq, like, or, count } from "drizzle-orm";
import type { IUserRepository } from "./interfaces/i-user-repository";

export class UserRepository implements IUserRepository {
  async findById(id: string) {
    const [found] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        username: user.username,
        displayUsername: user.displayUsername,
      })
      .from(user)
      .where(eq(user.id, id))
      .limit(1);
    return found || null;
  }

  async findByUsername(username: string) {
    const [found] = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        username: user.username,
        displayUsername: user.displayUsername,
      })
      .from(user)
      .where(eq(user.username, username))
      .limit(1);
    return found || null;
  }

  async search(
    query: string,
    limit: number = 20
  ): Promise<
    {
      id: string;
      name: string;
      email: string;
      image: string | null;
      username: string | null;
      displayUsername: string | null;
    }[]
  > {
    const searchPattern = `%${query}%`;
    return db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        username: user.username,
        displayUsername: user.displayUsername,
      })
      .from(user)
      .where(
        or(like(user.username, searchPattern), like(user.name, searchPattern))
      )
      .limit(limit);
  }
}

export const userRepository = new UserRepository();
