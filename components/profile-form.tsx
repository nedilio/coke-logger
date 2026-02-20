"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ProfileForm() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  return (
    <form>
      <Field>
        <FieldLabel htmlFor="picture">Picture</FieldLabel>
        <Input
          id="picture"
          type="file"
          onChange={(e) => {
            setFileUrl(
              e.target.files ? URL.createObjectURL(e.target.files[0]) : null,
            );
          }}
        />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>
      {fileUrl && (
        <img
          src={fileUrl}
          alt="Selected picture"
          className="w-24 h-24 rounded mb-4 shadow-sm object-cover border border-gray-300"
        />
      )}
      <Button>Subir</Button>
    </form>
  );
}
