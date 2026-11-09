import { z } from "zod";

export const DELETE_ACCOUNT_CONFIRMATION = "ELIMINAR";

export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Ingresa tu contraseña"),
  confirmation: z.literal(DELETE_ACCOUNT_CONFIRMATION, {
    message: `Escribe ${DELETE_ACCOUNT_CONFIRMATION} para confirmar`,
  }),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
