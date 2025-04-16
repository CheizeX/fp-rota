"use client";

import { dailyEmployeeCounts } from "@/data/personnelEvents";
import {
  generateDailyRotationData,
  groupRotationDataByTimeframe,
} from "@/data/rotationData";
import { ScrollShadow } from "@fichap-team/fichapui";
import { useMemo } from "react";
import { MetricCard } from "../../components/MetricCard/MetricCard";

const CardsSection = () => {
  // Calculamos los datos en tiempo real para asegurar coherencia con otras secciones
  const metrics = useMemo(() => {
    // Generate rotation data needed for calculations
    const dailyRotationData = generateDailyRotationData();
    const rotationChartData = groupRotationDataByTimeframe(dailyRotationData);

    // Obtenemos el último dato de empleados activos
    const currentDate = new Date();
    const latestEmployeeData =
      dailyEmployeeCounts[dailyEmployeeCounts.length - 1];
    const totalActiveEmployees = latestEmployeeData.activeEmployees;

    // Calculamos el período actual y anterior para comparaciones
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Filtrar para datos del mes actual
    const currentMonthData = dailyEmployeeCounts.filter(
      (day) =>
        day.date.getMonth() === currentMonth &&
        day.date.getFullYear() === currentYear
    );

    // Filtrar para datos del mes anterior
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousMonthData = dailyEmployeeCounts.filter(
      (day) =>
        day.date.getMonth() === previousMonth &&
        day.date.getFullYear() === previousYear
    );

    // Calcular altas y bajas totales considerando todos los períodos históricos
    const allData = dailyEmployeeCounts.filter(
      (day) => day.date <= currentDate
    );

    const totalHires = allData.reduce((sum, day) => sum + day.hires, 0);
    const totalTerminations = allData.reduce(
      (sum, day) => sum + day.terminations,
      0
    );

    // Calcular altas y bajas del mes actual y anterior
    const currentMonthHires = currentMonthData.reduce(
      (sum, day) => sum + day.hires,
      0
    );
    const currentMonthTerminations = currentMonthData.reduce(
      (sum, day) => sum + day.terminations,
      0
    );
    const previousMonthHires = previousMonthData.reduce(
      (sum, day) => sum + day.hires,
      0
    );
    const previousMonthTerminations = previousMonthData.reduce(
      (sum, day) => sum + day.terminations,
      0
    );

    // Calcular tasa de rotación actual (anualizada)
    const currentRotationRate =
      currentMonthTerminations > 0
        ? parseFloat(
            (
              ((currentMonthTerminations * 12) / totalActiveEmployees) *
              100
            ).toFixed(1)
          )
        : parseFloat(
            (rotationChartData.monthly.length > 0
              ? rotationChartData.monthly[rotationChartData.monthly.length - 1]
                  .current
              : 0
            ).toFixed(1)
          );

    // Calcular tasa de rotación del mes anterior (anualizada)
    const previousMonthActiveEmployees =
      totalActiveEmployees - (currentMonthHires - currentMonthTerminations);
    const previousRotationRate =
      previousMonthTerminations > 0
        ? parseFloat(
            (
              ((previousMonthTerminations * 12) /
                previousMonthActiveEmployees) *
              100
            ).toFixed(1)
          )
        : parseFloat(
            (rotationChartData.monthly.length > 1
              ? rotationChartData.monthly[rotationChartData.monthly.length - 2]
                  .current
              : 0
            ).toFixed(1)
          );

    // Calcular predicción de rotación para el próximo mes
    const rotationTrend = currentRotationRate - previousRotationRate;

    // Verificamos que rotationChartData y sus componentes existan
    const hasRotationData =
      rotationChartData?.monthly && rotationChartData.monthly.length > 0;
    const latestRotationData = hasRotationData
      ? rotationChartData.monthly[rotationChartData.monthly.length - 1]
      : undefined;

    // Usamos los datos de predicción si están disponibles, sino hacemos una proyección simple
    const predictedRotationRate =
      latestRotationData?.prediction !== undefined
        ? parseFloat(latestRotationData.prediction.toFixed(1))
        : parseFloat((currentRotationRate + rotationTrend).toFixed(1));

    // Calcular tendencias (% de cambio)
    const employeeTrend =
      previousMonthActiveEmployees > 0
        ? Math.round(
            ((totalActiveEmployees - previousMonthActiveEmployees) /
              previousMonthActiveEmployees) *
              100
          )
        : 0;

    const hiresTrend =
      previousMonthHires > 0
        ? Math.round(
            ((currentMonthHires - previousMonthHires) / previousMonthHires) *
              100
          )
        : 0;

    const terminationsTrend =
      previousMonthTerminations > 0
        ? Math.round(
            ((currentMonthTerminations - previousMonthTerminations) /
              previousMonthTerminations) *
              100
          )
        : 0;

    // Tendencia de la rotación (cambio porcentual)
    const rotationPercentTrend =
      previousRotationRate > 0
        ? Math.round(
            ((currentRotationRate - previousRotationRate) /
              previousRotationRate) *
              100
          )
        : 0;

    return [
      {
        title: "Total de empleados",
        value: totalActiveEmployees.toString(),
        trend: employeeTrend,
        from: "desde el mes anterior",
      },
      {
        title: "Altas totales",
        value: totalHires.toString(),
        trend: hiresTrend,
        from: "desde el mes anterior",
      },
      {
        title: "Bajas totales",
        value: totalTerminations.toString(),
        trend: terminationsTrend,
        from: "desde el mes anterior",
      },
      {
        title: "Rotación prom. del mes",
        value: `${currentRotationRate}%`,
        trend: rotationPercentTrend,
        from: "desde el mes anterior",
      },
      {
        title: "Predicción de rotación",
        value: `${predictedRotationRate}%`,
        trend:
          predictedRotationRate > currentRotationRate
            ? Math.round(
                ((predictedRotationRate - currentRotationRate) /
                  currentRotationRate) *
                  100
              )
            : predictedRotationRate < currentRotationRate
              ? -Math.round(
                  ((currentRotationRate - predictedRotationRate) /
                    currentRotationRate) *
                    100
                )
              : 0,
        from: "para el próximo mes",
      },
    ];
  }, []);

  return (
    <ScrollShadow
      orientation="horizontal"
      className="flex gap-4 overflow-x-auto w-full px-2 py-4 sm:p-4"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          trend={metric.trend}
          from={metric.from}
        />
      ))}
    </ScrollShadow>
  );
};

export default CardsSection;
