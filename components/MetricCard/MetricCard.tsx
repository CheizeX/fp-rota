"use client";

import { Card, CardBody } from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import { FC, useEffect, useState } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string | number;
  trendPositive?: boolean;
  trendNeutral?: boolean;
  from?: string;
}

export const MetricCard: FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendPositive,
  trendNeutral,
  from = "el mes anterior",
}) => {
  // SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Convertir trend a número para determinar si es positivo/negativo/neutral
  const numericTrend =
    typeof trend === "string"
      ? parseFloat(trend.replace(/[^-\d.]/g, ""))
      : trend;

  // Determinar si es positivo/neutral/negativo basado en el valor numérico
  const isPositive =
    trendPositive !== undefined ? trendPositive : numericTrend > 0;

  const isNeutral =
    trendNeutral !== undefined ? trendNeutral : numericTrend === 0;

  // Determinar colores y iconos basados en el valor numérico
  const trendIcon = isPositive
    ? "lucide:trending-up"
    : isNeutral
      ? "lucide:minus"
      : "lucide:trending-down";

  const trendColor = isPositive
    ? "text-green-600"
    : isNeutral
      ? "text-gray-500"
      : "text-red-600";

  // Formatear el texto de tendencia
  const formattedTrend =
    typeof trend === "number" || !isNaN(numericTrend)
      ? `${numericTrend > 0 ? "+" : ""}${numericTrend}% ${from}`
      : trend;

  return (
    <Card
      shadow="none"
      radius="sm"
      className="border-none w-1/5 min-w-56 h-[120px] xl:h-[160px] shadow-lg"
    >
      <CardBody className="p-4">
        <div className="flex flex-col gap-1 xl:gap-[18px]">
          {mounted ? (
            <span className="text-2xl xl:text-3xl text-foreground font-bold">
              {value}
            </span>
          ) : (
            <div className="h-8 w-24 bg-default-100 animate-pulse rounded"></div>
          )}
          <span className="text-md xl:text-lg text-default-600 font-semibold">
            {title}
          </span>
          {mounted ? (
            <div
              className={`flex items-center gap-1 text-xs xl:text-sm mt-2 ${trendColor}`}
            >
              <Icon icon={trendIcon} className="w-4 h-4 xl:h-5 xl:w-5" />
              <span className="text-foreground">{formattedTrend}</span>
            </div>
          ) : (
            <div className="h-4 w-20 bg-default-100 animate-pulse rounded mt-2"></div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
