import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { FC, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { AspectOption, ViewMode } from "@/types";
import { usePieChartOptions } from "@/hooks/charts/usePieChartOptions";

interface PieChartProps {
  aspect: AspectOption;
  viewMode: ViewMode;
  chartRef?: React.RefObject<any>;
}

export const PieChart: FC<PieChartProps> = ({
  aspect,
  viewMode,
  chartRef: externalChartRef,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Referencia del gráfico para la funcionalidad de descarga
  const internalChartRef = useRef(null);
  const chartRef = externalChartRef || internalChartRef;

  // No necesitamos datos de rotación aquí, el hook usePieChartOptions ya usa aspectData internamente
  // Pasamos un array vacío ya que el hook ignora este parámetro y usa aspectData directamente
  const data = useMemo(() => [], []);

  // Callback memoizado para el resize
  const handleResize = useCallback(() => {
    if (chartRef.current) {
      const echartsInstance = chartRef.current.getEchartsInstance();
      echartsInstance.resize();
    }
  }, [chartRef]);

  // Obtenemos las opciones del gráfico desde el hook personalizado
  const option = usePieChartOptions({ isDark, aspect, viewMode });

  // Efecto para manejar el resize del contenedor
  useEffect(() => {
    if (!mounted) return;

    const currentContainer = containerRef.current;
    const resizeObserver = new ResizeObserver(handleResize);

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    // Llamar a resize inicialmente para asegurar el tamaño correcto
    handleResize();

    return () => {
      if (currentContainer) {
        resizeObserver.disconnect();
      }
    };
  }, [mounted, handleResize]);

  if (!mounted) {
    return <div className="h-[400px] w-full bg-content1"></div>;
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "400px", width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
        theme="fichap-theme"
      />
    </div>
  );
};
