"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  username: string | null;
}

export interface Session {
  user: SessionUser;
}

export async function getCurrentSession(): Promise<Session | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return null;
  }
  return {
    user: {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email,
      image: session.user.image ?? null,
      username: session.user.username ?? null,
    },
  };
}

export async function requireAuth(): Promise<Session> {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getCurrentSession();
  return session?.user?.id ?? null;
}

export async function requireUserId(): Promise<string> {
  const session = await requireAuth();
  return session.user.id;
}
