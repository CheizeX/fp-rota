import { useMemo } from "react";
import { COLORS } from "../../config/colors";
import { aspectData } from "../../data/rotationData";
import {
  generateColorInScale,
  getLabelColor,
} from "../../helpers/colorHelpers";
import { AspectOption, ViewMode } from "../../types";

interface UseHorizontalBarChartOptionsProps {
  isDark: boolean;
  aspect: AspectOption;
  viewMode: ViewMode;
}

export const useHorizontalBarChartOptions = ({
  isDark,
  aspect,
  viewMode,
}: UseHorizontalBarChartOptionsProps) => {

  return useMemo(() => {
    // Seleccionamos los datos absolutos
    const absoluteData =
      aspectData[aspect as keyof typeof aspectData]?.absolute || [];

    // Obtenemos el total precomputado
    const total = aspectData[aspect as keyof typeof aspectData]?.total || 0;

    // Creamos el dataset apropiado según el modo de visualización
    let dataset = absoluteData;

    // Si estamos en modo relativo, calculamos los porcentajes basados en el total
    if (viewMode === "relative" && total > 0) {
      dataset = absoluteData.map((item) => ({
        ...item,
        value: Number(((item.value / total) * 100).toFixed(1)),
      }));
    }

    // Ordenamos los datos de mayor a menor
    const sortedData = [...dataset].sort((a, b) => b.value - a.value);

    // Definimos los colores de inicio y fin para la escala
    const startColor = isDark ? "#D8E1FF" : COLORS.PRIMARY;
    const endColor = isDark ? COLORS.PRIMARY : "#D8E1FF";

    // Asignamos colores a cada barra según la posición
    const coloredData = sortedData.map((item, index) => {
      const color = generateColorInScale(
        startColor,
        endColor,
        index,
        sortedData.length
      );
      return {
        ...item,
        itemStyle: {
          color,
        },
        labelColor: getLabelColor(color), // Add labelColor property
      };
    });

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: isDark
          ? COLORS.BACKGROUND_DARK
          : COLORS.BACKGROUND_LIGHT,
        borderColor: isDark ? COLORS.BORDER_DARK : COLORS.BORDER_LIGHT,
        borderWidth: 1,
        extraCssText: isDark
          ? "backdrop-filter: blur(30px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); border-radius: 8px;"
          : "backdrop-filter: blur(30px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-radius: 8px;",
        textStyle: {
          color: isDark ? COLORS.TEXT_WHITE : COLORS.TEXT_BLACK,
          fontFamily: "'Mulish', sans-serif",
        },
        formatter: function (params: any) {
          const name = params[0].name;
          const value = params[0].value;

          return `
          <div style="padding: 8px;">
            <div style="margin-bottom: 4px; font-weight: bold;">${name}</div>
            <div>Rotación: ${value}${viewMode === "relative" ? "%" : ""}</div>
          </div>
          `;
        },
      },
      grid: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 30,
        containLabel: true,
      },

      // Configuración de dataZoom para permitir scroll vertical
      dataZoom: [
        {
          type: "slider",
          show: true,
          yAxisIndex: [0],
          width: 20,
          right: 0,
          start: 0,
          end:
            sortedData.length > 8
              ? Math.min(100, (8 * 100) / sortedData.length)
              : 100,
          filterMode: "filter",
          brushSelect: false,
          handleSize: "80%",
          showDetail: false,
          borderColor: "transparent",
          fillerColor: "rgba(56, 30, 255, 0.1)",
          handleStyle: {
            color: COLORS.PRIMARY,
            borderColor: COLORS.PRIMARY,
          },
          textStyle: {
            color: COLORS.TEXT,
          },
        },
        {
          type: "inside",
          yAxisIndex: [0],
          zoomOnMouseWheel: true,
          moveOnMouseMove: true,
          moveOnMouseWheel: true,
        },
      ],
      xAxis: {
        type: "value",
        // Ocultamos las líneas y etiquetas del eje X
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          show: false,
          fontFamily: "'Mulish', sans-serif",
        },
      },
      yAxis: {
        type: "category",
        // Invertimos el orden para que el valor más alto esté arriba
        data: [...sortedData].reverse().map((item) => item.label),
        axisLabel: {
          color: COLORS.TEXT,
          interval: 0,
          margin: 10,
          overflow: "truncate",
          width: 200,
          fontFamily: "'Mulish', sans-serif",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: aspect,
          type: "bar",
          barCategoryGap: "4px",
          data: [...coloredData].reverse().map((item) => ({
            value: item.value,
            itemStyle: item.itemStyle,
            label: {
              color: item.labelColor, // Set color per bar here
            },
          })),
          itemStyle: {
            borderRadius: [10, 10, 10, 10],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          label: {
            show: true,
            position: "insideLeft",
            formatter: viewMode === "relative" ? "{c}%" : "{c}",
            fontSize: 14,
            fontWeight: "bold",
            distance: 10,
            align: "left",
            verticalAlign: "middle",
            fontFamily: "'Mulish', sans-serif",
          },
        },
      ],
    };
  }, [isDark, aspect, viewMode]);
};
