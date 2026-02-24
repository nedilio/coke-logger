"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function updateProfileImageAction(imageUrl: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [updatedUser] = await db
    .update(user)
    .set({ profileImageUrl: imageUrl })
    .where(eq(user.id, session.user.id))
    .returning();

  revalidatePath("/profile");
  revalidatePath("/settings");

  return updatedUser;
}
