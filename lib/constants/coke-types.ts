// Coke type options
export const COKE_TYPES = ["original", "zero", "light"] as const;
export type CokeType = (typeof COKE_TYPES)[number];

// Format options
export const FORMATS = ["glass", "can", "plastic"] as const;
export type Format = (typeof FORMATS)[number];

// Common size presets (in ml)
export const COMMON_SIZES = [220, 350, 500, 600, 1000, 1500, 2000] as const;
export type CommonSize = (typeof COMMON_SIZES)[number];
