"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let username = formData.get("username") as string;

  if (!username) {
    username = email.split("@")[0].toLowerCase();
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        username,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }

  redirect("/dashboard");
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }

  redirect("/dashboard");
};

export const signOutAction = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }

  redirect("/login");
};
