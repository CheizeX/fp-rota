// filepath: /Users/ezequielrivas/Desktop/fp-rotation/components/charts/BarChart.tsx
import {
  generateDailyAddRemoveData,
  groupAddRemoveDataByTimeframe,
} from "@/data/rotationData";
import { TimeframeOption } from "@/types";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useChartOptions } from "../../hooks/charts/useChartOptions";

interface BarChartProps {
  timeframe: TimeframeOption;
  year: string;
  chartRef?: React.RefObject<any>;
  onDataCheck?: (hasData: boolean) => void;
  showPredictionLine?: boolean;
}

export const BarChart: FC<BarChartProps> = ({
  timeframe,
  chartRef: externalChartRef,
  year,
  onDataCheck,
  showPredictionLine = false, // Valor por defecto
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Referencia del gráfico para la funcionalidad de descarga
  const internalChartRef = useRef(null);
  const chartRef = externalChartRef || internalChartRef;

  // Generamos datos filtrados según el año seleccionado y los agrupamos por el período elegido
  const data = useMemo(() => {
    // Convertimos el año de string a number
    const selectedYear = parseInt(year);

    // Generamos los datos filtrados por el año seleccionado
    const filteredData = generateDailyAddRemoveData(selectedYear);

    // Agrupamos los datos según el período seleccionado
    const groupedData = groupAddRemoveDataByTimeframe(filteredData);

    // Retornamos los datos del período seleccionado o usamos mensual como fallback
    return groupedData[timeframe] || groupedData.monthly;
  }, [timeframe, year]);

  useEffect(() => {
    if (onDataCheck && data) {
      const hasData = data.some(
        (item) => Math.abs(item.increases) > 0 || Math.abs(item.decreases) > 0
      );

      onDataCheck(hasData);
    }
  }, [data, onDataCheck]);

  // Obtenemos las opciones del gráfico desde el hook personalizado
  const option = useChartOptions({
    data,
    isDark,
    showPredictionLine,
  });

  if (!mounted) {
    return <div className="h-[400px] w-full bg-content1"></div>;
  }

  return (
    <div className="relative">
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "400px", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={false}
      />
    </div>
  );
};
