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
      <Card className="glass-effect border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">Crea tu cuenta</CardTitle>
          <CardDescription className="text-white/90">
            Empieza a trackear tu consumo de Coca-Cola
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action as (formData: FormData) => void}>
            <FieldGroup className="[&_input::placeholder]:text-white/60">
              {/* OAuth temporalmente oculto - implementar después
              <Field>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              */}
              <Field>
                <FieldLabel htmlFor="name" className="text-white">
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
                  <FieldError className="text-white/90">
                    {state.fieldErrors.name}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="username" className="text-white">
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
                  <FieldError className="text-white/90">
                    {state.fieldErrors.username}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">
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
                  <FieldError className="text-white/90">
                    {state.fieldErrors.email}
                  </FieldError>
                ) : state?.error && !state.fieldErrors ? (
                  <FieldError className="text-white/90">
                    {state.error}
                  </FieldError>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="password" className="text-white">
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
                  <FieldError className="text-white/90">
                    {state.fieldErrors.password}
                  </FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
                <FieldDescription className="text-center text-white/90">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                    href="/login"
                    className="text-white underline hover:!text-white/70 transition-colors"
                  >
                    Inicia sesión
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center text-white/70 text-xs">
        Al continuar, aceptas nuestros{" "}
        <Link
          href="/terms"
          className="text-white/90 underline hover:!text-white transition-colors"
        >
          Términos de Servicio
        </Link>{" "}
        y{" "}
        <Link
          href="/privacy"
          className="text-white/90 underline hover:!text-white transition-colors"
        >
          Política de Privacidad
        </Link>
        .
      </FieldDescription>
    </div>
  );
}
