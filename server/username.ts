"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Update username for current user
// Note: Better Auth's username plugin provides built-in updateUser method
// This action wraps it for convenience and adds revalidation
export async function updateUsernameAction(newUsername: string) {
  // Authenticate
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Use Better Auth's built-in updateUser method
  const updatedUser = await auth.api.updateUser({
    headers: await headers(),
    body: {
      username: newUsername,
    },
  });

  // Revalidate relevant pages
  revalidatePath("/settings");
  revalidatePath("/profile");

  return updatedUser;
}

// Check if username is available
// Note: Better Auth provides auth.api.isUsernameAvailable
export async function checkUsernameAvailabilityAction(username: string) {
  const response = await auth.api.isUsernameAvailable({
    body: {
      username,
    },
  });

  return response;
}
