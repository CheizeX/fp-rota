"use client";

import { ChartCard } from "@/components/ChartCard/ChartCard";
import { FilterModal } from "@/components/FilterModal/FilterModal";
import { generateYearOptions } from "@/helpers/dateHelpers";
import { TimeframeOption, timeframeOptions } from "@/types";
import { useDisclosure } from "@fichap-team/fichapui";
import { useMemo, useState } from "react";
import { BarChart } from "../../components/charts/BarChart";

const DescriptionAndPrediction = () => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("monthly");
  const [year, setYear] = useState("2025");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Obtener todas las opciones de años posibles desde los datos
  const allYearOptions = generateYearOptions();

  // Filtrar opciones de años para incluir solo años con datos
  const yearOptions = useMemo(() => {
    return allYearOptions;
  }, [allYearOptions]);

  const handleYearChange = (newYear: string) => {
    setYear(newYear);
  };

  return (
    <section className='flex-1'>
      <ChartCard
        title='Rotación descriptiva y predictiva'
        description='Bajas/Total de colaboradores'
        icon='lucide:rotate-ccw'
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        year={year}
        setYear={handleYearChange}
        timeframeOptions={timeframeOptions}
        yearOptions={yearOptions}
        onFilter={onOpen}>
        <BarChart timeframe={timeframe} year={year} showPredictionLine={true} />
      </ChartCard>

      <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default DescriptionAndPrediction;
