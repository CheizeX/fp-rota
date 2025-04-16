"use client";

import { useMemo } from "react";
import { AddRemoveDataPoint as DataPoint } from "@/types";
import { COLORS } from "../../config/colors";
import {
  calculateDynamicYAxisRange,
  generateDataZoomConfig,
  generateTooltipBaseConfig,
} from "../../helpers/chartHelpers";

interface UseChartOptionsProps {
  data: DataPoint[];
  isDark: boolean;
  dynamicScale?: boolean;
  enableDataZoom?: boolean;
  showPredictionLine?: boolean;
}

export const useChartOptions = ({
  data,
  isDark,
  dynamicScale = true,
  enableDataZoom = true,
  showPredictionLine = false,
}: UseChartOptionsProps) => {
  // Calcular el rango del eje Y
  const yAxisRange = useMemo(() => {
    return calculateDynamicYAxisRange(data, dynamicScale, [
      "increases",
      "decreases",
    ]);
  }, [data, dynamicScale]);

  // Configuración de dataZoom
  const dataZoomConfig = useMemo(() => {
    return generateDataZoomConfig(
      data,
      enableDataZoom,
      COLORS.PRIMARY_HOVER,
      COLORS.TEXT
    );
  }, [data, enableDataZoom]);

  // Estilo base del tooltip
  const tooltipConfig = useMemo(() => {
    return generateTooltipBaseConfig(isDark);
  }, [isDark]);

  // Cálculo de datos de predicción en base a los datos de altas y bajas
  const predictionData = useMemo(() => {
    return data.map((item) => {
      if (
        typeof item.increases === "number" &&
        typeof item.decreases === "number"
      ) {
        return item.increases + item.decreases;
      }
      return null;
    });
  }, [data]);

  return useMemo(
    () => ({
      legend: {
        data: showPredictionLine
          ? ["Altas", "Bajas", "Predicción"]
          : ["Altas", "Bajas"],
        bottom: 10,
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: COLORS.TEXT,
          fontFamily: "'Mulish', sans-serif",
        },
      },
      grid: {
        top: 20,
        bottom: 80,
        left: 0,
        right: 10,
        containLabel: true,
      },
      dataZoom: dataZoomConfig,
      tooltip: {
        ...tooltipConfig,
        formatter: function (params: any) {
          const dataIndex = params[0].dataIndex;
          const period = data[dataIndex].timeLabel;
          const increases = Math.abs(data[dataIndex].increases);
          const decreases = Math.abs(data[dataIndex].decreases);
          const prediction = predictionData[dataIndex];

          return `
          <div style="padding: 8px;">
            <div style="margin-bottom: 4px; font-weight: bold;">${period}</div>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${COLORS.PRIMARY}; margin-right: 8px; border-radius: 50%;"></span>
              <span>Altas: ${increases}</span>
            </div>
            <div style="display: flex; align-items: center; margin-bottom: ${showPredictionLine ? "4px" : "0"};">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${COLORS.SECONDARY}; margin-right: 8px; border-radius: 50%;"></span>
              <span>Bajas: ${decreases}</span>
            </div>
            ${
              showPredictionLine
                ? `
            <div style="display: flex; align-items: center;">
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${COLORS.TERTIARY}; margin-right: 8px; border-radius: 50%;"></span>
              <span>Predicción: ${prediction !== null ? prediction : "N/A"}</span>
            </div>`
                : ""
            }
          </div>
        `;
        },
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.timeLabel),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: COLORS.TEXT,
          fontSize: 12,
          interval: data.length > 24 ? "auto" : 0,
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
          fontSize: 12,
          formatter: function (value: number) {
            return value;
          },
          align: "right",
          margin: 15,
        },
        min: yAxisRange[0],
        max: yAxisRange[1],
      },
      series: [
        {
          name: "Altas",
          type: "bar",
          stack: "Total",
          itemStyle: {
            color: COLORS.PRIMARY,
            borderRadius: [4, 4, 0, 0],
          },
          data: data.map((item) => item.increases),
          barCategoryGap: "30%",
        },
        {
          name: "Bajas",
          type: "bar",
          stack: "Total",
          itemStyle: {
            color: COLORS.SECONDARY,
            borderRadius: [0, 0, 4, 4],
          },
          data: data.map((item) => item.decreases),
        },
        ...(showPredictionLine
          ? [
              {
                name: "Predicción",
                type: "line",
                data: predictionData,
                color: COLORS.TERTIARY,
                lineStyle: { width: 2, type: "solid" },
                z: 1,
                showSymbol: false,
                smooth: true,
              },
            ]
          : []),
      ],
    }),
    [
      data,
      isDark,
      tooltipConfig,
      yAxisRange,
      dataZoomConfig,
      showPredictionLine,
      predictionData,
    ]
  );
};
