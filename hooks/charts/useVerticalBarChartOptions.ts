import { useMemo } from "react";
import { AspectOption, ViewMode, AspectDataItem } from "../../types";
import { aspectData } from "../../data/rotationData";
import { COLORS } from "../../config/colors";

interface UseVerticalBarChartOptionsProps {
  isDark: boolean;
  aspect: AspectOption;
  viewMode: ViewMode;
}

export const useVerticalBarChartOptions = ({
  isDark,
  aspect,
  viewMode,
}: UseVerticalBarChartOptionsProps) => {
  return useMemo(() => {
    // Seleccionamos el dataset de datos absolutos
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
        value: Number(((item.value / total) * 100).toFixed(1)), // Convertir a porcentaje con 1 decimal
      }));
    }

    // Usamos los datos sin alterar su orden original
    const originalData = [...dataset];

    // Asignamos el color uniforme a todas las barras
    const coloredData = originalData.map((item) => {
      return {
        ...item,
        itemStyle: {
          color: COLORS.PRIMARY,
        },
      };
    });

    const axisNameMap = {
      age: "Rango de edad",
      seniority: "Años",
      department: "Departamentos",
      hierarchy: "Nivel jerárquico",
      education: "Nivel educativo",
      gender: "Género",
      nationality: "País",
    };

    const xAxisName = axisNameMap[aspect] || "";

    return {
      textStyle: {
        fontFamily: "'Mulish', sans-serif",
      },
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
      legend: {
        data: ["Bajas"],
        bottom: 0,
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: COLORS.TEXT,
          fontFamily: "'Mulish', sans-serif",
        },
      },
      grid: {
        top: 60,
        bottom: 40,
        left: 10,
        right: 10,
        containLabel: true,
      },
      title: {
        text: "Bajas",
        left: 0,
        top: 0,
        textStyle: {
          fontSize: 16,
          fontWeight: 500,
          color: COLORS.TEXT,
          fontFamily: "'Mulish', sans-serif",
        },
      },
      barCategoryGap: "30%",
      xAxis: {
        type: "category",
        data: originalData.map((item) => item.label),
        axisLabel: {
          color: COLORS.TEXT,
          interval: 0,
          rotate: originalData.length > 6 ? 45 : 0,
          fontFamily: "'Mulish', sans-serif",
        },
        axisLine: {
          lineStyle: {
            color: isDark ? COLORS.LINE_DARK : COLORS.LINE_LIGHT,
          },
        },
        name: xAxisName,
        nameLocation: "middle",
        nameGap: 35,
        nameTextStyle: {
          fontWeight: 500,
          fontSize: 14,
          color: COLORS.TEXT,
          fontFamily: "'Mulish', sans-serif",
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: COLORS.TEXT,
          formatter: viewMode === "relative" ? "{value}%" : "{value}",
          fontFamily: "'Mulish', sans-serif",
        },
        splitLine: {
          lineStyle: {
            color: isDark ? COLORS.LINE_DARK : COLORS.LINE_LIGHT,
          },
        },
      },
      series: [
        {
          name: aspect,
          type: "bar",
          barWidth: "60%",
          barGap: "0%",
          barCategoryGap: "30%",
          data: coloredData.map((item) => ({
            value: item.value,
            itemStyle: item.itemStyle,
          })),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: COLORS.PRIMARY_HOVER,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
          },
          label: {
            show: true,
            position: "top",
            formatter: viewMode === "relative" ? "{c}%" : "{c}",
            color: COLORS.TEXT_WHITE,
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "'Mulish', sans-serif",
            distance: -25,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
          },
        },
      ],
    };
  }, [isDark, aspect, viewMode]);
};
