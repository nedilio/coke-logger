"use server";

import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { validateUsername } from "@/lib/validations/username";
import { revalidatePath } from "next/cache";

// Update username for current user
export async function updateUsernameAction(newUsername: string) {
  // Authenticate
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Validate username
  const validation = await validateUsername(newUsername, session.user.id);
  if (!validation.success) {
    throw new Error(validation.error);
  }

  // Update in database
  const [updatedUser] = await db
    .update(user)
    .set({ username: newUsername })
    .where(eq(user.id, session.user.id))
    .returning();

  // Revalidate relevant pages
  revalidatePath("/settings");
  revalidatePath("/profile");

  return updatedUser;
}

// Check if username is available
export async function checkUsernameAvailabilityAction(username: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const validation = await validateUsername(
    username, 
    session?.user?.id
  );

  return {
    available: validation.success,
    message: validation.success ? "Username is available" : validation.error,
  };
}
