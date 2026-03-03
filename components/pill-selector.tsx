"use client";

import { cn } from "@/lib/utils";

interface PillSelectorOption {
  value: string;
  label: string;
}

interface PillSelectorProps {
  options: readonly PillSelectorOption[] | PillSelectorOption[];
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
                "flex-1 min-w-20 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200",
                "focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "outline-none",
                isSelected
                  ? "bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/30"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
