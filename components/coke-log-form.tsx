"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { PillSelector } from "@/components/pill-selector";
import { createCokeLogAction } from "@/server/coke-logs";
import type { CokeType, Format } from "@/lib/constants/coke-types";

const COKE_TYPE_OPTIONS = [
  { value: "original", label: "Original" },
  { value: "zero", label: "Zero" },
  { value: "light", label: "Light" },
] as const;

const FORMAT_OPTIONS = [
  { value: "glass", label: "Vidrio" },
  { value: "can", label: "Lata" },
  { value: "plastic", label: "Plástico" },
] as const;

const SIZE_OPTIONS = [
  { value: "220", label: "220ml" },
  { value: "350", label: "350ml" },
  { value: "500", label: "500ml" },
  { value: "600", label: "600ml" },
  { value: "1000", label: "1L" },
  { value: "1500", label: "1.5L" },
  { value: "2000", label: "2L" },
  { value: "custom", label: "Personalizado" },
] as const;

const CONSUMED_AT_OPTIONS = [
  { value: "now", label: "Ahora" },
  { value: "1h", label: "Hace 1 hora" },
  { value: "2h", label: "Hace 2 horas" },
  { value: "3h", label: "Hace 3 horas" },
  { value: "custom", label: "Personalizado" },
] as const;

interface FormData {
  cokeType: CokeType | null;
  format: Format | null;
  sizeML: number | null;
  customSizeInput: string;
  showCustomSize: boolean;
  consumedAt: Date;
  consumedAtQuickSelect: string;
  showCustomDateTime: boolean;
  customDateTimeInput: string;
  notes: string;
  imageUrl: string | null;
  isPublic: boolean;
}

export function CokeLogForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    cokeType: null,
    format: null,
    sizeML: null,
    customSizeInput: "",
    showCustomSize: false,
    consumedAt: new Date(),
    consumedAtQuickSelect: "now",
    showCustomDateTime: false,
    customDateTimeInput: "",
    notes: "",
    imageUrl: null,
    isPublic: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.cokeType) {
      newErrors.cokeType = "Por favor selecciona un tipo de Coca-Cola";
    }

    if (!formData.format) {
      newErrors.format = "Por favor selecciona un formato";
    }

    if (!formData.sizeML) {
      newErrors.sizeML = "Por favor selecciona o ingresa un tamaño";
    } else if (formData.sizeML < 1) {
      newErrors.sizeML = "El tamaño debe ser al menos 1ml";
    } else if (formData.sizeML > 10000) {
      newErrors.sizeML = "El tamaño no puede exceder 10000ml (10L)";
    }

    if (!formData.consumedAt) {
      newErrors.consumedAt = "Por favor selecciona cuándo lo consumiste";
    } else if (formData.consumedAt > new Date()) {
      newErrors.consumedAt = "La fecha no puede estar en el futuro";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = {
        cokeType: formData.cokeType!,
        format: formData.format!,
        sizeML: formData.sizeML!,
        consumedAt: formData.consumedAt,
        notes: formData.notes || undefined,
        imageUrl: formData.imageUrl || undefined,
        isPublic: formData.isPublic,
      };

      await createCokeLogAction(data);

      toast.success("¡Entrada agregada exitosamente!");

      // Reset form
      setFormData({
        cokeType: null,
        format: null,
        sizeML: null,
        customSizeInput: "",
        showCustomSize: false,
        consumedAt: new Date(),
        consumedAtQuickSelect: "now",
        showCustomDateTime: false,
        customDateTimeInput: "",
        notes: "",
        imageUrl: null,
        isPublic: false,
      });
      setErrors({});

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating log:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add entry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar nuevo registro de Coca-Cola</CardTitle>
        <CardDescription>Registra tu consumo de Coca-Cola</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Tipo de Coca-Cola */}
            <Field>
              <FieldLabel>Tipo de Coca-Cola *</FieldLabel>
              <PillSelector
                name="cokeType"
                options={COKE_TYPE_OPTIONS}
                value={formData.cokeType}
                onChange={(value) =>
                  setFormData({ ...formData, cokeType: value as CokeType })
                }
                required
                error={errors.cokeType}
              />
            </Field>

            {/* Formato */}
            <Field>
              <FieldLabel>Formato *</FieldLabel>
              <PillSelector
                name="format"
                options={FORMAT_OPTIONS}
                value={formData.format}
                onChange={(value) =>
                  setFormData({ ...formData, format: value as Format })
                }
                required
                error={errors.format}
              />
            </Field>

            {/* Tamaño en ML */}
            <Field>
              <FieldLabel>Tamaño *</FieldLabel>
              <PillSelector
                name="size"
                options={SIZE_OPTIONS}
                value={
                  formData.showCustomSize
                    ? "custom"
                    : formData.sizeML?.toString() || null
                }
                onChange={(value) => {
                  if (value === "custom") {
                    setFormData({
                      ...formData,
                      showCustomSize: true,
                      sizeML: null,
                    });
                  } else {
                    setFormData({
                      ...formData,
                      showCustomSize: false,
                      sizeML: parseInt(value),
                    });
                  }
                }}
                required
                error={errors.sizeML}
              />

              {formData.showCustomSize ? (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="Ingrese ml"
                    value={formData.customSizeInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({
                        ...formData,
                        customSizeInput: value,
                        sizeML: value ? parseInt(value) : null,
                      });
                    }}
                  />
                  <span className="text-sm text-muted-foreground">ml</span>
                </div>
              ) : null}
            </Field>

            {/* Consumido en */}
            <Field>
              <FieldLabel>¿Cuándo tomaste cokita? *</FieldLabel>
              <PillSelector
                name="consumedAt"
                options={CONSUMED_AT_OPTIONS}
                value={formData.consumedAtQuickSelect}
                onChange={(value) => {
                  if (value === "custom") {
                    setFormData({
                      ...formData,
                      consumedAtQuickSelect: "custom",
                      showCustomDateTime: true,
                    });
                  } else {
                    const hoursAgo = value === "now" ? 0 : parseInt(value);
                    const date = new Date(Date.now() - hoursAgo * 3600000);
                    setFormData({
                      ...formData,
                      consumedAtQuickSelect: value,
                      showCustomDateTime: false,
                      consumedAt: date,
                    });
                  }
                }}
                required
                error={errors.consumedAt}
              />

              {formData.showCustomDateTime ? (
                <Input
                  type="datetime-local"
                  max={new Date().toISOString().slice(0, 16)}
                  value={formData.customDateTimeInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({
                      ...formData,
                      customDateTimeInput: value,
                      consumedAt: new Date(value),
                    });
                  }}
                  className="mt-2"
                />
              ) : null}
            </Field>

            {/* Notas */}
            <Field>
              <FieldLabel htmlFor="notes">Notas (opcional)</FieldLabel>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Cualquier nota sobre esta bebida..."
                value={formData.notes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 250) {
                    setFormData({ ...formData, notes: value });
                  }
                }}
                maxLength={250}
                rows={3}
              />
              <p className="text-xs text-muted-foreground text-right mt-1">
                {formData.notes.length}/250 caracteres
              </p>
            </Field>

            {/* Foto (opcional) */}
            <Field>
              <FieldLabel>Foto (opcional)</FieldLabel>
              {formData.imageUrl ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={formData.imageUrl}
                    alt="Foto del coke"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: null })}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <span className="text-sm text-muted-foreground">+ Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setFormData({ ...formData, imageUrl: objectUrl });
                      }
                    }}
                  />
                </label>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Agrega una foto de tu bebida (máx 4MB)
              </p>
            </Field>

            {/* Es público */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="isPublic" className="cursor-pointer">
                  Hacer esta entrada pública
                </FieldLabel>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPublic: checked })
                  }
                />
              </div>
            </Field>

            {/* Botón de envío */}
            <Field>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Agregando..." : "Agregar entrada"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
