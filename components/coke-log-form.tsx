"use client";

import { useState } from "react";
import { toast } from "sonner";
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
  isPublic: boolean;
}

export function CokeLogForm() {
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
    isPublic: false,
  });
  console.log({ formData });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.cokeType) {
      newErrors.cokeType = "Please select a coke type";
    }

    if (!formData.format) {
      newErrors.format = "Please select a format";
    }

    if (!formData.sizeML) {
      newErrors.sizeML = "Please select or enter a size";
    } else if (formData.sizeML < 1) {
      newErrors.sizeML = "Size must be at least 1ml";
    } else if (formData.sizeML > 10000) {
      newErrors.sizeML = "Size cannot exceed 10000ml (10L)";
    }

    if (!formData.consumedAt) {
      newErrors.consumedAt = "Please select when you consumed it";
    } else if (formData.consumedAt > new Date()) {
      newErrors.consumedAt = "Date cannot be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
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
        isPublic: formData.isPublic,
      };

      await createCokeLogAction(data);

      toast.success("Entry added successfully!");

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
        isPublic: false,
      });
      setErrors({});
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
        <CardTitle>Add New Coke Entry</CardTitle>
        <CardDescription>Track your Coca-Cola consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Coke Type */}
            <Field>
              <FieldLabel>Coke Type *</FieldLabel>
              <PillSelector
                name="cokeType"
                options={[
                  { value: "original", label: "Original" },
                  { value: "zero", label: "Zero" },
                  { value: "light", label: "Light" },
                ]}
                value={formData.cokeType}
                onChange={(value) =>
                  setFormData({ ...formData, cokeType: value as CokeType })
                }
                required
                error={errors.cokeType}
              />
            </Field>

            {/* Format */}
            <Field>
              <FieldLabel>Format *</FieldLabel>
              <PillSelector
                name="format"
                options={[
                  { value: "glass", label: "Glass" },
                  { value: "can", label: "Can" },
                  { value: "plastic", label: "Plastic" },
                ]}
                value={formData.format}
                onChange={(value) =>
                  setFormData({ ...formData, format: value as Format })
                }
                required
                error={errors.format}
              />
            </Field>

            {/* Size ML */}
            <Field>
              <FieldLabel>Size *</FieldLabel>
              <PillSelector
                name="size"
                options={[
                  { value: "250", label: "250ml" },
                  { value: "330", label: "330ml" },
                  { value: "500", label: "500ml" },
                  { value: "600", label: "600ml" },
                  { value: "1000", label: "1L" },
                  { value: "1500", label: "1.5L" },
                  { value: "2000", label: "2L" },
                  { value: "custom", label: "Custom" },
                ]}
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

              {formData.showCustomSize && (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    placeholder="Enter ml"
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
              )}
            </Field>

            {/* Consumed At */}
            <Field>
              <FieldLabel>When did you drink it? *</FieldLabel>
              <PillSelector
                name="consumedAt"
                options={[
                  { value: "now", label: "Now" },
                  { value: "1h", label: "1h ago" },
                  { value: "2h", label: "2h ago" },
                  { value: "3h", label: "3h ago" },
                  { value: "custom", label: "Custom" },
                ]}
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
                    console.log({ hoursAgo });
                    const date = new Date(Date.now() - hoursAgo * 3600000);
                    console.log({ date });
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

              {formData.showCustomDateTime && (
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
              )}
            </Field>

            {/* Notes */}
            <Field>
              <FieldLabel htmlFor="notes">Notes (optional)</FieldLabel>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Any notes about this drink..."
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
                {formData.notes.length}/250 characters
              </p>
            </Field>

            {/* Is Public */}
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="isPublic" className="cursor-pointer">
                  Make this entry public
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

            {/* Submit Button */}
            <Field>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Adding..." : "Add Entry"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
