import { z } from "zod";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { eq, and, ne } from "drizzle-orm";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be 20 characters or less")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens"
  )
  .regex(
    /^[a-zA-Z0-9]/,
    "Username must start with a letter or number"
  );

// Reserved usernames
const RESERVED_USERNAMES = [
  "admin", "api", "dashboard", "feed", "login", "logout",
  "signup", "register", "profile", "settings", "help", 
  "about", "terms", "privacy", "support", "contact", 
  "users", "public", "private", "user", "root", "system"
];

// Check if username is available (for signup/update)
export async function isUsernameAvailable(
  username: string, 
  currentUserId?: string
): Promise<boolean> {
  // Check reserved list
  if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
    return false;
  }

  // Check database
  const existing = await db.query.user.findFirst({
    where: currentUserId 
      ? and(eq(user.username, username), ne(user.id, currentUserId))
      : eq(user.username, username),
  });

  return !existing;
}

// Validate and check availability
export async function validateUsername(
  username: string,
  currentUserId?: string
) {
  // First validate format
  const parsed = usernameSchema.safeParse(username);
  if (!parsed.success) {
    return { 
      success: false as const, 
      error: parsed.error.issues[0].message 
    };
  }

  // Then check availability
  const available = await isUsernameAvailable(username, currentUserId);
  if (!available) {
    return { 
      success: false as const, 
      error: "This username is already taken" 
    };
  }

  return { success: true as const };
}
