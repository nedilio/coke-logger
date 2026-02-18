import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Verifica que el usuario esté autenticado
 * Redirige a /login si no lo está
 * 
 * @returns Sesión válida del usuario
 * 
 * @example
 * ```typescript
 * export default async function ProtectedPage() {
 *   const session = await requireAuth();
 *   return <div>Welcome {session.user.username}!</div>;
 * }
 * ```
 */
export async function requireAuth() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });
  
  if (!session?.user) {
    redirect("/login");
  }
  
  return session;
}

/**
 * Redirige a /dashboard si el usuario ya está autenticado
 * Útil para páginas de login/signup
 * 
 * @example
 * ```typescript
 * export default async function LoginPage() {
 *   await redirectIfAuthenticated();
 *   return <LoginForm />;
 * }
 * ```
 */
export async function redirectIfAuthenticated() {
  const session = await auth.api.getSession({ 
    headers: await headers() 
  });
  
  if (session?.user) {
    redirect("/dashboard");
  }
}
