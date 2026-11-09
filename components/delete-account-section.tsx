"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DELETE_ACCOUNT_CONFIRMATION } from "@/lib/validations/account";
import { deleteAccountAction } from "@/server/users";

export function DeleteAccountSection(): React.ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const canSubmit =
    password.length > 0 && confirmation === DELETE_ACCOUNT_CONFIRMATION && !isDeleting;

  function handleOpenChange(next: boolean): void {
    if (isDeleting) return;
    setOpen(next);
    if (!next) {
      setPassword("");
      setConfirmation("");
      setError(null);
    }
  }

  async function handleDelete(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setIsDeleting(true);
    setError(null);
    try {
      const result = await deleteAccountAction({
        password,
        confirmation: confirmation as typeof DELETE_ACCOUNT_CONFIRMATION,
      });
      if (!result.success) {
        setError(result.error ?? "No pudimos eliminar tu cuenta");
        setIsDeleting(false);
        return;
      }
      toast.success("Tu cuenta fue eliminada. ¡Gracias por las cokitas!");
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos eliminar tu cuenta");
      setIsDeleting(false);
    }
  }

  return (
    <section className="card-noir border-coke-red/25 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <div className="mt-0.5 h-fit rounded-full bg-coke-red/15 p-2 ring-1 ring-coke-red/30">
            <AlertTriangle className="size-4 text-coke-bright" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Eliminar cuenta</h3>
            <p className="mt-1 text-sm text-white/60">
              Borra para siempre tu perfil, tus registros y tus seguidores. No se
              puede deshacer.
            </p>
          </div>
        </div>

        <AlertDialog open={open} onOpenChange={handleOpenChange}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="shrink-0 border-coke-red/40 text-coke-bright hover:border-coke-red hover:bg-coke-red/15 hover:text-white"
            >
              <Trash2 className="size-4" />
              Eliminar mi cuenta
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <form onSubmit={handleDelete} className="space-y-5">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar tu cuenta para siempre?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se borrarán tu perfil, todos tus registros de consumo y tus
                  relaciones de seguimiento, en la web y en la app para iPhone.
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-2">
                <Label htmlFor="delete-password">Contraseña</Label>
                <Input
                  id="delete-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isDeleting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delete-confirmation">
                  Escribe <span className="font-bold text-coke-bright">{DELETE_ACCOUNT_CONFIRMATION}</span>{" "}
                  para confirmar
                </Label>
                <Input
                  id="delete-confirmation"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  autoComplete="off"
                  disabled={isDeleting}
                  required
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <AlertDialogFooter>
                <AlertDialogCancel type="button" disabled={isDeleting}>
                  Cancelar
                </AlertDialogCancel>
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="bg-none bg-destructive text-white shadow-none hover:bg-destructive/90"
                >
                  {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                  {isDeleting ? "Eliminando..." : "Eliminar cuenta"}
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
