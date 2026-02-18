import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthLayoutWrapper } from "@/components/auth-layout-wrapper";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <AuthLayoutWrapper>
      <Card className="glass-effect border-white/20 max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">
            Política de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-invert max-w-none text-sm text-red-100">
            <p className="text-center mb-4">
              Contenido próximamente
            </p>
            <p className="text-xs text-red-200 text-center">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>
          <Button asChild className="w-full" variant="outline">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardContent>
      </Card>
    </AuthLayoutWrapper>
  );
}
