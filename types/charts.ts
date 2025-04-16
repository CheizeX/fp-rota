/**
 * Tipos para estructuras de datos usadas en gráficos
 */

// Punto de datos base para todos los gráficos
export interface BaseDataPoint {
  // El texto que se muestra en el eje X del gráfico
  timeLabel: string;

  // La fecha completa en formato DD/MM/YYYY
  fullDate?: string;

  // Objeto Date para ordenar y hacer cálculos
  date?: Date;
}

// Datos para rotación y predicción
export interface RotationDataPoint extends BaseDataPoint {
  // Valor actual (datos históricos)
  current: number;

  // Valor del año anterior para comparación
  previous: number;

  // Valor de predicción (solo para meses futuros)
  prediction?: number;

  // Número de días incluidos en este punto de datos
  daysCount?: number;
}

// Datos para altas y bajas
export interface AddRemoveDataPoint extends BaseDataPoint {
  // Cantidad de altas (siempre positivo)
  increases: number;

  // Cantidad de bajas (siempre negativo)
  decreases: number;
}

// Estructura para los datos agrupados por período
export interface ChartData<T> {
  weekly: T[];
  biweekly: T[];
  monthly: T[];
  quarterly: T[];
  yearly: T[];
  [key: string]: T[];
}

export interface AspectDataItem {
  label: string;
  value: number;
  percentage: number;
  color?: string;
}

export interface AspectData {
  [key: string]: {
    absolute: AspectDataItem[];
    total: number;
  };
}

export interface AspectGroup {
  absolute: AspectDataItem[];
  total: number;
}
