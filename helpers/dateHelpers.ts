import type { YearOption } from "@/types";

// Función para generar opciones de años basadas en los datos disponibles
export const generateYearOptions = (): YearOption[] => {
  // Aseguramos que siempre estén disponibles 2024 y 2025 (sin depender de yearCounts)
  const fixedYears = [2024, 2025];

  // Generamos directamente el array de opciones a partir de los años fijos
  return fixedYears.map((year) => ({
    key: year.toString(),
    label: year.toString(),
  }));
};
