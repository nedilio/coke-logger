"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;

  try {
    // Better Auth's username plugin handles username validation and creation
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        username, // Username plugin handles this automatically
      },
    });
    redirect("/dashboard");
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
    // Let middleware handle redirect to dashboard
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
