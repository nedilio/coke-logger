"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { validateUsername } from "@/lib/validations/username";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas";
import { eq } from "drizzle-orm";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  // Validate username before attempting signup
  const validation = await validateUsername(username);
  if (!validation.success) {
    throw new Error(validation.error);
  }

  try {
    // Create the user account with Better Auth
    const result = await auth.api.signUpEmail({ 
      body: { name, email, password } 
    });

    // Update the user record with the username
    // Better Auth creates the user but doesn't support custom fields in signUpEmail
    // So we need to update it separately
    if (result && email) {
      await db
        .update(user)
        .set({ username })
        .where(eq(user.email, email));
    }
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({ body: { email, password } });
    redirect("/dashboard");
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const signOutAction = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
    redirect("/login");
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
