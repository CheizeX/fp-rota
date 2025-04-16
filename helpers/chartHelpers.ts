/**
 * Funciones auxiliares compartidas para la configuración de gráficos
 */

import { COLORS } from "../config/colors";

/**
 * Calcula dinámicamente el rango del eje Y basado en los datos
 * @param data Los datos del gráfico
 * @param dynamicScale Si se debe calcular dinámicamente el rango
 * @param properties Propiedades numéricas para buscar en los datos
 * @returns Rango del eje Y [min, max]
 */
export const calculateDynamicYAxisRange = (
  data: any[],
  dynamicScale = true,
  properties: string[] = [
    "current",
    "previous",
    "prediction",
    "increases",
    "decreases",
    "value",
  ]
): [number, number] => {
  if (!dynamicScale) {
    return [-100, 100]; // Rango fijo predeterminado
  }

  // Encontrar el valor máximo absoluto en los datos
  let maxValue = 0;
  data.forEach((item) => {
    // Verificar todas las propiedades numéricas que podrían graficarse
    properties.forEach((prop) => {
      if (item[prop] !== undefined) {
        maxValue = Math.max(maxValue, Math.abs(item[prop]));
      }
    });
  });

  // Añadir padding al rango (20%)
  maxValue = Math.ceil(maxValue * 1.2);

  // Asegurarse de tener al menos un rango mínimo para valores muy pequeños
  maxValue = Math.max(maxValue, 10);

  return [-maxValue, maxValue];
};

/**
 * Genera la configuración dataZoom para gráficos
 * @param data Los datos del gráfico
 * @param enableDataZoom Si se debe habilitar dataZoom
 * @param primaryColor Color primario para los controles
 * @param textColor Color del texto
 * @returns Configuración dataZoom
 */
export const generateDataZoomConfig = (
  data: any[],
  enableDataZoom = true,
  primaryColor = COLORS.PRIMARY,
  textColor = COLORS.TEXT
) => {
  if (!enableDataZoom) return [];

  return [
    {
      type: "slider",
      show: true,
      xAxisIndex: 0,
      filterMode: "filter",
      height: 20,
      bottom: 40,
      start: 0,
      end: data.length > 12 ? Math.min(100, (12 * 100) / data.length) : 100,
      borderColor: "transparent",
      fillerColor: "rgba(56, 30, 255, 0.1)",
      handleStyle: {
        color: primaryColor,
        borderColor: primaryColor,
      },
      textStyle: {
        color: textColor,
      },
      handleSize: "80%",
      showDetail: false,
    },
    {
      type: "inside",
      xAxisIndex: 0,
      filterMode: "filter",
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
    },
  ];
};

/**
 * Genera configuración del tooltip con estilo consistente
 * @param isDark Modo oscuro activo
 * @returns Configuración de tooltip
 */
export const generateTooltipBaseConfig = (isDark: boolean) => {
  return {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    backgroundColor: isDark ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT,
    borderColor: isDark ? COLORS.BORDER_DARK : COLORS.BORDER_LIGHT,
    borderWidth: 1,
    extraCssText: isDark
      ? "backdrop-filter: blur(30px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); border-radius: 8px;"
      : "backdrop-filter: blur(30px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;",
    textStyle: {
      color: isDark ? COLORS.TEXT_WHITE : COLORS.TEXT_BLACK,
      fontFamily: "'Mulish', sans-serif",
    },
  };
};

/**
 * Genera una configuración base común para los gráficos
 * @param isDark Modo oscuro activo
 * @returns Configuración base
 */
export const generateBaseChartConfig = (isDark: boolean) => {
  return {
    textStyle: {
      fontFamily: "'Mulish', sans-serif",
    },
    grid: {
      top: 20,
      bottom: 80,
      left: 0,
      right: 10,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: COLORS.TEXT,
        fontSize: 12,
        fontFamily: "'Mulish', sans-serif",
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: isDark ? COLORS.LINE_DARK : COLORS.LINE_LIGHT,
        },
      },
      axisLabel: {
        color: COLORS.TEXT,
        fontFamily: "'Mulish', sans-serif",
      },
    },
  };
};
