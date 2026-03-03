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
import { signUpAction, type SignUpResponse } from "@/server/users";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, pending] = useActionState<SignUpResponse, FormData>(
    signUpAction,
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
          <CardTitle className="text-2xl font-bold text-white">Crea tu cuenta</CardTitle>
          <CardDescription className="text-white/60">
            Empieza a trackear tu consumo de Coca-Cola
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action as (formData: FormData) => void}>
            <FieldGroup className="[&_input::placeholder]:text-white/40 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input:focus]:border-[#DC2626] [&_input:focus]:ring-[#DC2626]/30">
              <Field>
                <FieldLabel htmlFor="name" className="text-white/80">
                  Nombre
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state?.name}
                  aria-invalid={!!state?.fieldErrors?.name}
                  placeholder="Juan Pérez"
                  required
                />
                {state?.fieldErrors?.name && (
                  <FieldError className="text-red-400">
                    {state.fieldErrors.name}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username" className="text-white/80">
                  Usuario
                </FieldLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={state?.username}
                  aria-invalid={!!state?.fieldErrors?.username}
                  placeholder="juanperez"
                  required
                />
                {state?.fieldErrors?.username && (
                  <FieldError className="text-red-400">
                    {state.fieldErrors.username}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-white/80">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state?.email}
                  aria-invalid={!!state?.fieldErrors?.email}
                  placeholder="m@example.com"
                  required
                />
                {state?.fieldErrors?.email ? (
                  <FieldError className="text-red-400">
                    {state.fieldErrors.email}
                  </FieldError>
                ) : state?.error && !state.fieldErrors ? (
                  <FieldError className="text-red-400">
                    {state.error}
                  </FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-white/80">
                  Contraseña
                </FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  aria-invalid={!!state?.fieldErrors?.password}
                  required
                />
                {state?.fieldErrors?.password && (
                  <FieldError className="text-red-400">
                    {state.fieldErrors.password}
                  </FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" className="w-full bg-[#DC2626] hover:bg-[#B91C1C] glow-red transition-all duration-300" disabled={pending}>
                  {pending ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
                <FieldDescription className="text-center text-white/60">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/login"
                    className="text-white underline hover:text-white/70 transition-colors"
                  >
                    Inicia sesión
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
