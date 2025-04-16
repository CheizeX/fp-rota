/**
 * Utilidades para la tabla de rotación
 * Este archivo contiene funciones de utilidad reutilizables para la tabla
 */

import { EmotionType, RiskLevel } from "@/types/table";

/**
 * Determina el nivel de riesgo basado en el porcentaje
 * @param percentage Porcentaje de riesgo
 * @returns Nivel de riesgo (Alto, Medio, Bajo)
 */
export const getRiskLevel = (percentage: number): RiskLevel => {
  if (percentage >= 70) return "Alto";
  if (percentage >= 40) return "Medio";
  return "Bajo";
};

/**
 * Determina el color de clase CSS basado en el porcentaje de riesgo
 * @param percentage Porcentaje de riesgo
 * @returns Clase CSS para el color
 */
export const getRiskColorClass = (percentage: number): string => {
  if (percentage >= 70) return "text-danger-600";
  if (percentage >= 40) return "text-warning-600";
  return "text-success-600";
};

/**
 * Determina la emoción basada en el porcentaje de riesgo
 * @param percentage Porcentaje de riesgo
 * @param emotion Emoción opcional predefinida
 * @returns Tipo de emoción
 */
export const getEmotionByRisk = (
  percentage: number,
  emotion?: EmotionType
): EmotionType => {
  if (emotion) return emotion;

  if (percentage >= 70) return "Enojado";
  if (percentage >= 40) return "Confundido";
  return "Felíz";
};

/**
 * Calcula los días restantes hasta la fecha proporcionada
 * @param dateString Fecha en formato string
 * @returns Número de días restantes
 */
export const calculateDaysLeft = (dateString: string): number => {
  try {
    // Extraer día, mes y año del string con formato "dd Mon. yyyy"
    const match = dateString.match(/(\d+)\s(\w+)\.\s(\d+)/);
    if (!match) return 0;

    const day = parseInt(match[1]);
    const monthStr = match[2];
    const year = parseInt(match[3]);

    // Mapa de abreviaturas de meses a números
    const monthMap: Record<string, number> = {
      Ene: 0,
      Feb: 1,
      Mar: 2,
      Abr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Ago: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dic: 11,
    };

    const month = monthMap[monthStr];
    if (month === undefined) return 0;

    // Crear fechas para comparación
    const targetDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a inicio del día

    // Calcular diferencia en días
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error("Error calculating days left:", error);
    return 0;
  }
};

/**
 * Determina el probable motivo de salida basado en el porcentaje de riesgo
 * @param percentage Porcentaje de riesgo
 * @returns String con el motivo probable
 */
export const getProbableCause = (percentage: number): string => {
  if (percentage >= 70) {
    return "Insatisfacción laboral y búsqueda de mejores oportunidades";
  } else if (percentage >= 40) {
    return "Falta de crecimiento profesional y compensación insuficiente";
  } else {
    return "Bajo riesgo de rotación";
  }
};
