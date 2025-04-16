import { AspectOption, ViewMode } from "@/types";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { FC, useRef } from "react";
import { useHorizontalBarChartOptions } from "../../../hooks/charts/useHorizontalBarChartOptions";
import { useVerticalBarChartOptions } from "../../../hooks/charts/useVerticalBarChartOptions";

interface BarChartProps {
  aspect: AspectOption;
  viewMode: ViewMode;
  orientation: "horizontal" | "vertical";
  chartRef?: React.RefObject<any>;
}

export const BarChart: FC<BarChartProps> = ({
  aspect,
  viewMode,
  orientation,
  chartRef: externalChartRef,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Referencia del gráfico para la funcionalidad de descarga
  const internalChartRef = useRef(null);
  const chartRef = externalChartRef || internalChartRef;

  // Obtenemos las opciones del gráfico desde el hook específico según la orientación
  const option =
    orientation === "horizontal"
      ? useHorizontalBarChartOptions({ isDark, aspect, viewMode })
      : useVerticalBarChartOptions({ isDark, aspect, viewMode });

  return (
    <div className="relative">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "384px", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={false}
        theme="fichap-theme"
      />
    </div>
  );
};
