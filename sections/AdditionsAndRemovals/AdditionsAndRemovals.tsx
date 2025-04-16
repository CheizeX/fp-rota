"use client";

import { FilterModal } from "@/components/FilterModal/FilterModal";
import { generateYearOptions } from "@/helpers/dateHelpers";
import { TimeframeOption, timeframeOptions } from "@/types";
import { useDisclosure } from "@fichap-team/fichapui";
import { useMemo, useState } from "react";
import { ChartCard } from "../../components/ChartCard/ChartCard";
import { BarChart } from "../../components/charts/BarChart";

const AdditionsAndRemovals = () => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("monthly");
  const [year, setYear] = useState("2025");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Obtener todas las opciones de años posibles desde los datos
  const allYearOptions = generateYearOptions();

  // Filtrar opciones de años para incluir solo años con datos
  const yearOptions = useMemo(() => {
    return allYearOptions;
  }, [allYearOptions]);

  // Manejador para el cambio de año
  const handleYearChange = (newYear: string) => {
    setYear(newYear);
  };

  return (
    <section className="w-full px-2 py-4 sm:p-4 pt-0 sm:pt-0">
      <ChartCard
        title="Altas y bajas"
        description="Registro de altas y bajas de colaboradores en el periodo de tiempo seleccionado"
        icon="lucide:arrow-up-down"
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        year={year}
        setYear={handleYearChange}
        timeframeOptions={timeframeOptions}
        yearOptions={yearOptions}
        onFilter={onOpen}
      >
        <BarChart timeframe={timeframe} year={year} />
      </ChartCard>

      <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default AdditionsAndRemovals;
