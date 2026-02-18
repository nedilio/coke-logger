import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ═══════════════════════════════════════════════════════
  // VERIFICACIÓN OPTIMISTA DE COOKIE (NO SEGURA POR SÍ SOLA)
  // ═══════════════════════════════════════════════════════
  // IMPORTANTE: Esta verificación NO valida la sesión completa
  // Solo verifica si existe una cookie de sesión
  // La validación real de la sesión ocurre en cada página
  const sessionCookie = getSessionCookie(request);
  
  // ═══════════════════════════════════════════════════════
  // RUTAS PROTEGIDAS
  // ═══════════════════════════════════════════════════════
  const protectedRoutes = ["/dashboard"];
  
  // Si intenta acceder a ruta protegida sin cookie, redirigir a login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // ═══════════════════════════════════════════════════════
  // ANTI-LOOP: Permitir acceso a /login y /signup
  // ═══════════════════════════════════════════════════════
  // Para /login y /signup: SIEMPRE permitir acceso
  // La página verificará la sesión completa y decidirá si redirigir
  // Esto evita loops cuando la cookie existe pero la sesión expiró:
  // 
  // Flujo sin loop:
  // 1. Cookie expirada → acceso a /dashboard
  // 2. Proxy: cookie existe → permite acceso (optimista)
  // 3. Dashboard page: sesión inválida → redirect("/login")
  // 4. Proxy: detecta que va a /login → permite acceso (NO redirige)
  // 5. Login page: verifica sesión → inválida → muestra form
  // ✅ NO LOOP
  
  return NextResponse.next();
}

export const config = {
  // Excluir archivos estáticos, APIs, y assets
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
