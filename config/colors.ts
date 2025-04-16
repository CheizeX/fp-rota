/**
 * Usar estos colores para mantener consistencia en todos los componentes
 */

export const COLORS = {
  // Colores principales
  PRIMARY: "#381EFF",
  PRIMARY_HOVER: "#453FFF",
  SECONDARY: "#9BFA00",
  SECONDARY_HOVER: "#6BB500",
  TERTIARY: "#3B82F6",
  TERTIARY_HOVER: "#3B82F6",

  // Colores de texto
  TEXT: "#737373",
  TEXT_BLACK: "#1F1F1F",
  TEXT_WHITE: "#FAFAFA",

  // Colores de fondo
  BACKGROUND_DARK: "rgba(40, 40, 40, 0.55)",
  BACKGROUND_LIGHT: "rgba(255, 255, 255, 0.55)",
  BACKGROUND_BADGE: "#636AFF33",

  // Colores para gráficos
  INCREASES: "#22C55E",
  DECREASES: "#EF4444",

  // Colores para bordes
  BORDER_DARK: "rgba(70, 70, 70, 0.5)",
  BORDER_LIGHT: "rgba(220, 220, 220, 0.5)",

  // Colores para líneas
  LINE_DARK: "rgba(255, 255, 255, 0.1)",
  LINE_LIGHT: "rgba(0, 0, 0, 0.1)",
};

/**
 * Función para generar un color en la escala entre dos colores
 */
export const generateColorInScale = (
  startColor: string,
  endColor: string,
  index: number,
  total: number
) => {
  // Convertir colores hexadecimales a componentes RGB
  const startRGB = {
    r: parseInt(startColor.slice(1, 3), 16),
    g: parseInt(startColor.slice(3, 5), 16),
    b: parseInt(startColor.slice(5, 7), 16),
  };

  // Asegurarse de que endColor tenga 7 caracteres (incluido #)
  const normalizedEndColor = endColor.length === 6 ? `#${endColor}` : endColor;

  const endRGB = {
    r: parseInt(normalizedEndColor.slice(1, 3), 16),
    g: parseInt(normalizedEndColor.slice(3, 5), 16),
    b: parseInt(normalizedEndColor.slice(5, 7), 16),
  };

  // Calcular el color intermedio basado en la posición
  const factor = total === 1 ? 0 : index / (total - 1);

  const r = Math.round(startRGB.r + factor * (endRGB.r - startRGB.r));
  const g = Math.round(startRGB.g + factor * (endRGB.g - startRGB.g));
  const b = Math.round(startRGB.b + factor * (endRGB.b - startRGB.b));

  // Convertir de nuevo a formato hexadecimal
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
};
