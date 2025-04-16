/**
 * Tipos y constantes para opciones de UI (filtros, selectores)
 */

// Opciones de período
export type TimeframeOption =
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface TimeframeOptionItem {
  key: TimeframeOption;
  label: string;
}

export interface YearOption {
  key: string;
  label: string;
}

export const timeframeOptions: TimeframeOptionItem[] = [
  { key: "weekly", label: "Semanal" },
  { key: "biweekly", label: "Quincenal" },
  { key: "monthly", label: "Mensual" },
  { key: "quarterly", label: "Trimestral" },
  { key: "yearly", label: "Anual" },
];

export interface ChartOption {
  key: string;
  label: string;
  icon?: string;
}

export type AspectOption =
  | "department" // Unidad organizativa
  | "gender" // Género
  | "age" // Rango generacional
  | "seniority" // Antigüedad
  | "nationality" // Nacionalidad
  | "hierarchy" // Jerarquía
  | "education"; // Nivel educativo

export interface AspectOptionItem {
  key: AspectOption;
  label: string;
  icon?: string;
}

export const aspectOptions: AspectOptionItem[] = [
  {
    key: "department",
    label: "Unidad organizativa",
    icon: "lucide:briefcase",
  },
  {
    key: "gender",
    label: "Género",
    icon: "lucide:users",
  },
  {
    key: "age",
    label: "Rango de edad",
    icon: "lucide:hourglass",
  },
  {
    key: "seniority",
    label: "Antigüedad",
    icon: "lucide:clock",
  },
  {
    key: "nationality",
    label: "Nacionalidad",
    icon: "lucide:globe",
  },
  {
    key: "hierarchy",
    label: "Nivel jerárquico",
    icon: "lucide:layers",
  },
  {
    key: "education",
    label: "Nivel educativo",
    icon: "lucide:graduation-cap",
  },
];

export type ViewMode = "absolute" | "relative";
