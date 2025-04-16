import { COLORS } from "@/config/colors";

/**
 * Genera un color en la escala entre dos colores hexadecimales
 * @param startColor Color de inicio en formato hexadecimal (ej: "#241996")
 * @param endColor Color final en formato hexadecimal (ej: "#B9C6FF")
 * @param index Índice del elemento actual
 * @param total Número total de elementos en la colección
 * @returns Color intermedio en formato hexadecimal
 */

/**
 * Calcula el color del texto basado en la luminancia del color de fondo
 * @param bgColor Color de fondo en formato hexadecimal
 * @returns Color del texto (claro u oscuro) según la luminancia
 */
export const getLabelColor = (bgColor: string) => {
  const hex = bgColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7 ? COLORS.TEXT : COLORS.TEXT_WHITE;
};

export const generateColorInScale = (
  startColor: string,
  endColor: string,
  index: number,
  total: number
): string => {
  // Convertir colores hexadecimales a componentes RGB
  const startRGB = {
    r: parseInt(startColor.slice(1, 3), 16),
    g: parseInt(startColor.slice(3, 5), 16),
    b: parseInt(startColor.slice(5, 7), 16),
  };

  // Asegurarse de que endColor tenga 7 caracteres
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
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};
