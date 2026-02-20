"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export interface SignUpResponse {
  error?: string;
  fieldErrors?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };
  name?: string;
  username?: string;
  email?: string;
}

function parseSignUpError(error: unknown): { message: string; fieldErrors?: SignUpResponse["fieldErrors"] } {
  const errorMessage = error instanceof Error ? error.message : "An error occurred during sign up";
  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes("invalid email") || (lowerMessage.includes("email") && lowerMessage.includes("format"))) {
    return { message: "El email no es válido", fieldErrors: { email: "El email no es válido" } };
  }
  if (lowerMessage.includes("email") && (lowerMessage.includes("already") || lowerMessage.includes("in use") || lowerMessage.includes("used"))) {
    return { message: "El email ya está en uso", fieldErrors: { email: "El email ya está en uso" } };
  }
  if (lowerMessage.includes("username") && (lowerMessage.includes("already") || lowerMessage.includes("taken"))) {
    return { message: "El nombre de usuario ya está en uso", fieldErrors: { username: "El nombre de usuario ya está en uso" } };
  }
  if (lowerMessage.includes("password")) {
    return { message: errorMessage, fieldErrors: { password: errorMessage } };
  }

  return { message: errorMessage };
}

export const signUpAction = async (
  state: SignUpResponse,
  formData: FormData,
): Promise<SignUpResponse> => {
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
    const { message, fieldErrors } = parseSignUpError(error);
    return { error: message, fieldErrors, name, username, email };
  }

  redirect("/dashboard");
};

export interface SignInResponse {
  error?: string;
  email?: string;
}

export const signInAction = async (
  state: SignInResponse,
  formData: FormData,
): Promise<SignInResponse> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({ body: { email, password } });
  } catch (error) {
    console.error("Sign in error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An error occurred during sign in";
    return { error: message, email };
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
