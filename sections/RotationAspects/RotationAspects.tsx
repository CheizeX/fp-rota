"use client";

import { DownloadOptions } from "@/components/ChartCard/DownloadOptions";
import { FilterModal } from "@/components/FilterModal/FilterModal";
import { AspectOption, ViewMode, aspectOptions } from "@/types";
import { FilterIcon } from "@/icons/icons";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { PieChart } from "../../components/charts/PieChart";
import { BarChart as RotationAspectsBarChart } from "./components/RotationAspectsBarChart";

const RotationAspects = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("relative");
  const [aspect, setAspect] = useState<AspectOption>("department");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const chartRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  // Detectar el ancho del contenedor
  useEffect(() => {
    if (!containerRef.current) return;

    const checkWidth = () => {
      if (containerRef.current) {
        setIsNarrow(containerRef.current.offsetWidth < 510);
      }
    };

    // Verificar inicialmente
    checkWidth();

    // ResizeObserver para monitorear cambios de tamaño
    const resizeObserver = new ResizeObserver(checkWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Renderizar el gráfico adecuado según el aspecto seleccionado
  const renderChart = () => {
    switch (aspect) {
      case "nationality":
      case "department":
      case "hierarchy":
      case "education":
        return (
          <RotationAspectsBarChart
            aspect={aspect}
            viewMode={viewMode}
            orientation="horizontal"
            chartRef={chartRef}
          />
        );
      case "gender":
        return (
          <PieChart aspect={aspect} viewMode={viewMode} chartRef={chartRef} />
        );
      case "age":
      case "seniority":
        return (
          <RotationAspectsBarChart
            aspect={aspect}
            viewMode={viewMode}
            orientation="vertical"
            chartRef={chartRef}
          />
        );
      default:
        return (
          <RotationAspectsBarChart
            aspect={aspect}
            viewMode={viewMode}
            orientation="horizontal"
            chartRef={chartRef}
          />
        );
    }
  };

  return (
    <section className="flex w-full max-h-[560px]">
      <Card className="w-full mx-auto shadow-lg " disableRipple>
        <CardBody className="px-2 py-4 sm:p-6 ">
          <div
            className="flex items-start justify-between gap-4 "
            ref={containerRef}
          >
            <div
              className={`flex ${isNarrow ? "flex-col h-full justify-between items-start" : "items-center"} gap-2  border-primary `}
            >
              <div
                className={`flex ${isNarrow ? "flex-wrap flex-col justify-between mt-1 h-full" : "items-center"} gap-2 `}
              >
                <div className="w-fit flex justify-center items-center gap-2">
                  <Icon
                    icon="lucide:rotate-ccw"
                    className="text-default-400 text-2xl"
                  />
                  <label className="font-bold text-lg text-nowrap">
                    Rotación por
                  </label>
                </div>
                <div className={isNarrow ? " w-full" : ""}>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="min-w-[180px] justify-between"
                        endContent={
                          <Icon
                            icon="lucide:chevron-down"
                            className="text-sm"
                          />
                        }
                      >
                        {aspectOptions.find((opt) => opt.key === aspect)
                          ?.label || "Unidad organizativa"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Aspectos de rotación">
                      {aspectOptions.map((option) => (
                        <DropdownItem
                          key={option.key}
                          startContent={
                            <Icon
                              icon={option.icon ?? ""}
                              className="text-lg"
                            />
                          }
                          onPress={() => setAspect(option.key as AspectOption)}
                        >
                          {option.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-48">
              <div className="flex gap-2 w-full justify-end">
                <Button
                  isIconOnly
                  variant="bordered"
                  color="primary"
                  onPress={onOpen}
                  className="border-1"
                >
                  <FilterIcon />
                </Button>
                <DownloadOptions
                  chartRef={chartRef}
                  fileName={`Rotación por ${aspectOptions.find((opt) => opt.key === aspect)?.label || ""}`}
                  timeframe="monthly"
                  year="2025"
                />
              </div>
              <div className="mt-2">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      className="w-32 justify-between"
                      endContent={
                        <Icon icon="lucide:chevron-down" className="text-sm" />
                      }
                    >
                      {viewMode === "relative" ? "Relativo" : "Absoluto"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Modo de visualización"
                    onAction={(key) => setViewMode(key as ViewMode)}
                    selectedKeys={[viewMode]}
                  >
                    <DropdownItem key="relative">Relativo</DropdownItem>
                    <DropdownItem key="absolute">Absoluto</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
          <div className="mt-4">{renderChart()}</div>

          <FilterModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </CardBody>
      </Card>
    </section>
  );
};

export default RotationAspects;
