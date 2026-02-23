export function formatMLToL(ml: number): string {
  const liters = ml / 1000;
  if (liters >= 1) {
    return `${liters.toFixed(2)}L`;
  }
  return `${ml}ml`;
}

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function mapCokeTypeToDisplay(type: string): string {
  const typeMap: Record<string, string> = {
    original: "Original",
    zero: "Zero",
    light: "Light",
  };
  return typeMap[type.toLowerCase()] || type;
}
