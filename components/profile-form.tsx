"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { useUploadThing } from "@/lib/uploadthing";
import { updateProfileImageAction } from "@/server/profile";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { startUpload } = useUploadThing("profileImage", {
    onUploadError: (error) => {
      toast.error(`Error al cargar imagen: ${error.message}`);
      console.error("Upload error:", error);
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error("Por favor selecciona una imagen");
      return;
    }

    setIsSaving(true);
    try {
      const uploadResult = await startUpload([file]);

      if (!uploadResult || !uploadResult[0]) {
        throw new Error("Error al subir imagen");
      }

      const imageUrl = uploadResult[0].url;
      await updateProfileImageAction(imageUrl);

      toast.success("Perfil actualizado");

      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (error) {
      toast.error("Error al actualizar perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="picture">Foto de perfil</FieldLabel>
        <input
          ref={fileInputRef}
          id="picture"
          type="file"
          accept="image/*"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-secondary file:text-secondary-foreground file:me-4 file:rounded-md file:px-4 file:text-sm file:font-medium file:ring-2 file:ring-ring file:ring-offset-2"
          onChange={handleFileChange}
        />
        <FieldDescription>
          Selecciona una imagen para tu perfil (máx 4MB)
        </FieldDescription>
      </Field>

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Vista previa:</p>
          <Avatar className="w-24 h-24 border-2 border-border">
            <AvatarImage src={previewUrl} alt="Vista previa" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
      )}

      <Button type="submit" disabled={isSaving || !previewUrl} className="mt-4">
        {isSaving ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
