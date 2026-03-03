"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInAction, type SignInResponse } from "@/server/users";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState<SignInResponse, FormData>(
    signInAction,
    { error: undefined },
  );

  const prevErrorRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (state?.error && state.error !== prevErrorRef.current) {
      prevErrorRef.current = state.error;
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="glass border border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Bienvenido de vuelta
          </CardTitle>
          <CardDescription className="text-white/60">
            Ingresa a tu cuenta de Coke Logger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup className="[&_input::placeholder]:text-white/40 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input:focus]:border-[#DC2626] [&_input:focus]:ring-[#DC2626]/30">
              <Field>
                <FieldLabel htmlFor="email" className="text-white/80">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={state?.email}
                  aria-invalid={!!state?.error}
                  placeholder="m@example.com"
                  required
                />
                {state?.error && (
                  <FieldError className="text-red-400">
                    {state.error}
                  </FieldError>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white/80">
                    Contraseña
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm text-white/50 underline-offset-4 hover:underline hover:text-white transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit" className="w-full bg-[#DC2626] hover:bg-[#B91C1C] glow-red transition-all duration-300" disabled={pending}>
                  {pending ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                <FieldDescription className="text-center text-white/60">
                  ¿No tienes cuenta?{" "}
                  <Link
                    href="/signup"
                    className="text-white underline hover:text-white/70 transition-colors"
                  >
                    Regístrate
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white/40 text-xs">
        Al continuar, aceptas nuestros{" "}
        <Link
          href="/terms"
          className="text-white/60 underline hover:text-white transition-colors"
        >
          Términos de Servicio
        </Link>{" "}
        y{" "}
        <Link
          href="/privacy"
          className="text-white/60 underline hover:text-white transition-colors"
        >
          Política de Privacidad
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
