"use client";

import { cn } from "@/lib/utils";

interface PillSelectorOption {
  value: string;
  label: string;
}

interface PillSelectorProps {
  options: PillSelectorOption[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
  required?: boolean;
  error?: string;
}

export function PillSelector({
  options,
  value,
  onChange,
  name,
  required = false,
  error,
}: PillSelectorProps) {
  return (
    <div className="space-y-2">
      <div
        role="radiogroup"
        aria-label={name}
        aria-required={required}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 min-w-20 px-4 py-2 rounded-full text-sm font-medium transition-all",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "outline-none",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
