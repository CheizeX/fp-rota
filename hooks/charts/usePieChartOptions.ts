import { useMemo } from "react";
import { COLORS } from "../../config/colors";
import { aspectData } from "../../data/rotationData";
import { AspectOption, ViewMode } from "../../types";

interface UsePieChartOptionsProps {
  isDark: boolean;
  aspect: AspectOption;
  viewMode: ViewMode;
}

export const usePieChartOptions = ({
  isDark,
  aspect,
  viewMode,
}: UsePieChartOptionsProps) => {
  return useMemo(() => {
    const localAspectData =
      aspectData[aspect as keyof typeof aspectData]?.absolute || [];

    const total = aspectData[aspect as keyof typeof aspectData]?.total || 0;

    let dataToUse = [...localAspectData];

    // Si estamos en modo relativo, calcular los porcentajes con al menos 1 decimal
    if (viewMode === "relative" && total > 0) {
      dataToUse = localAspectData.map((item) => ({
        ...item,
        value: Number(((item.value / total) * 100).toFixed(1)), // Convertir a porcentaje con 1 decimal
      }));
    }

    // Formatear data para ECharts
    const chartData = dataToUse.map((item, index) => {
      // Asignar colores según la posición o alguna otra lógica
      let color;
      if (index === 0) {
        color = COLORS.PRIMARY;
      } else if (index === 1) {
        color = COLORS.SECONDARY;
      } else {
        color = COLORS.TERTIARY;
      }

      return {
        name: item.label,
        value: item.value,
        itemStyle: { color: color },
      };
    });

    // Obtenemos los nombres para la leyenda
    const legendData = chartData.map((item) => item.name);

    // Configuración del tooltip
    const tooltipConfig = {
      trigger: "item",
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
        if (params.seriesName === "Center") return "";

        const name = params.name;
        const value = params.value;
        const percent = params.percent;

        return `
        <div style="padding: 8px;">
          <div style="margin-bottom: 4px; font-weight: bold;">${name}</div>
          <div>${viewMode === "relative" ? "Porcentaje" : "Total"}: ${viewMode === "relative" ? value + "%" : value}</div>
        </div>
        `;
      },
    };

    // Configuración del texto para el centro del gráfico
    const richTextConfig = {
      total: {
        fontSize: 28,
        fontWeight: "bold",
        color: isDark ? COLORS.TEXT_WHITE : COLORS.TEXT_BLACK,
        padding: [0, 0, 5, 0],
        lineHeight: 40,
      },
      label: {
        fontSize: 14,
        color: COLORS.TEXT,
        lineHeight: 16,
      },
    };

    // Se hace responsivo basado en el tamaño del contenedor
    const getResponsiveConfig = () => {
      return {
        baseOption: {
          tooltip: tooltipConfig,
          legend: {
            orient: "vertical",
            right: "5%",
            top: "middle",
            itemWidth: 10,
            itemHeight: 10,
            icon: "circle",
            textStyle: {
              color: COLORS.TEXT,
              fontSize: 14,
              rich: {
                a: {
                  backgroundColor: COLORS.BACKGROUND_BADGE,
                  borderRadius: 9999,
                  padding: [6, 8],
                  color: COLORS.PRIMARY_HOVER,
                },
              },
            },
            formatter: function (name: string) {
              const item = chartData.find((item) => item.name === name);
              return `{a|${item?.value}${viewMode === "relative" ? "%" : ""}} ${name}`;
            },
            data: legendData,
          },
          series: [
            {
              name: aspect,
              type: "pie",
              radius: ["60%", "70%"],
              center: ["40%", "50%"],
              avoidLabelOverlap: true,
              label: { show: false },
              labelLine: { show: false },
              emphasis: {
                label: { show: false },
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.2)",
                },
              },
              data: chartData,
            },
            {
              name: "Center",
              type: "pie",
              radius: ["0", "30%"],
              center: ["40%", "50%"],
              tooltip: { show: false },
              label: {
                show: true,
                position: "center",
                formatter: () => {
                  return [`{total|${total}}`, `{label|Total de personal}`].join(
                    "\n"
                  );
                },
                rich: richTextConfig,
              },
              data: [
                {
                  value: total,
                  name: "Total",
                  itemStyle: { color: "transparent" },
                },
              ],
            },
          ],
        },
        media: [
          {
            query: {
              minWidth: 500,
            },
            option: {
              legend: {
                show: true,
              },
              series: [
                {
                  center: ["40%", "50%"],
                  radius: ["60%", "70%"],
                  label: { show: false },
                  labelLine: { show: false },
                },
                {
                  center: ["40%", "50%"],
                  radius: ["0", "30%"],
                },
              ],
            },
          },
          {
            query: {
              maxWidth: 500,
            },
            option: {
              legend: {
                textStyle: {
                  fontFamily: "'Mulish', sans-serif",
                },
                show: false, // Ocultar leyenda cuando el contenedor es pequeño
              },
              series: [
                {
                  center: ["50%", "40%"],
                  radius: ["50%", "65%"],
                  label: {
                    show: true,
                    position: "outside",
                    formatter: "{b}: {c}",
                    color: COLORS.TEXT,
                    fontSize: 12,
                    fontWeight: "bold",
                    borderRadius: 4,
                    padding: [4, 8],
                  },
                  labelLine: {
                    show: true,
                    length: 10,
                    length2: 10,
                    smooth: true,
                  },
                },
                {
                  center: ["50%", "40%"],
                  radius: ["0", "25%"],
                  label: {
                    rich: {
                      total: {
                        fontSize: 24,
                        lineHeight: 30,
                      },
                      label: {
                        fontSize: 12,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      };
    };

    return getResponsiveConfig();
  }, [isDark, aspect, viewMode]);
};
