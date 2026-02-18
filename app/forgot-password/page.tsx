import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayoutWrapper } from "@/components/auth-layout-wrapper";
import { Clock } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <AuthLayoutWrapper>
      <Card className="glass-effect border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <CardDescription className="text-red-100">
            Esta funcionalidad estará disponible próximamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-red-200">
            Estamos trabajando en implementar la recuperación de contraseña. 
            Por ahora, contacta al soporte si necesitas ayuda.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Volver al Login</Link>
          </Button>
        </CardContent>
      </Card>
    </AuthLayoutWrapper>
  );
}
