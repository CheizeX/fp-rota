import { EMOTIONS } from "@/data/emotions";
import { useViewport } from "@/hooks/use-viewport";
import { SearchIcon } from "@/icons/icons";
import { EmotionType } from "@/types/table";
import type { RangeValue } from "@fichap-team/fichapui";
import {
  Button,
  Checkbox,
  DateRangePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  ScrollShadow,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
import { FC, useState } from "react";

interface TableFilterModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  minENPS: number;
  maxENPS: number;
  setMinENPS: (value: number) => void;
  setMaxENPS: (value: number) => void;
  minRisk: number;
  maxRisk: number;
  setMinRisk: (value: number) => void;
  setMaxRisk: (value: number) => void;
  selectedEmotions: EmotionType[];
  setSelectedEmotions: (emotions: EmotionType[]) => void;
  orgUnits: string[];
  selectedOrgUnits: string[];
  setSelectedOrgUnits: (units: string[]) => void;
}

export const parseDateFilterStringToRangeValue = (
  filterString: string
): RangeValue<DateValue> | null => {
  if (!filterString || !filterString.includes(" to ")) {
    return null;
  }
  try {
    const [startStr, endStr] = filterString.split(" to ");
    const start = parseDate(startStr);
    const end = parseDate(endStr);
    return { start, end };
  } catch (error) {
    console.error("Error parsing date filter string:", filterString, error);
    return null;
  }
};

export const formatDateRangeValueToString = (
  range: RangeValue<DateValue> | null
): string => {
  if (!range) {
    return "";
  }
  const startStr = range.start.toString();
  const endStr = range.end.toString();
  return `${startStr} to ${endStr}`;
};

export const TableFilterModal: FC<TableFilterModalProps> = ({
  isOpen,
  onOpenChange,
  dateFilter,
  setDateFilter,
  minENPS,
  maxENPS,
  setMinENPS,
  setMaxENPS,
  minRisk,
  maxRisk,
  setMinRisk,
  setMaxRisk,
  selectedEmotions,
  setSelectedEmotions,
  orgUnits,
  selectedOrgUnits,
  setSelectedOrgUnits,
}) => {
  const { isMobile } = useViewport();
  const [orgUnitSearch, setOrgUnitSearch] = useState("");

  const filteredOrgUnits = orgUnits.filter((unit) =>
    unit.toLowerCase().includes(orgUnitSearch.toLowerCase())
  );

  const handleEmotionChange = (emotion: EmotionType, checked: boolean) => {
    if (checked) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    } else {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
    }
  };

  const handleOrgUnitChange = (unit: string, checked: boolean) => {
    if (checked) {
      setSelectedOrgUnits([...selectedOrgUnits, unit]);
    } else {
      setSelectedOrgUnits(selectedOrgUnits.filter((u) => u !== unit));
    }
  };

  const handleClearFilters = () => {
    setDateFilter("");
    setMinENPS(0);
    setMaxENPS(100);
    setMinRisk(0);
    setMaxRisk(100);
    setSelectedEmotions([]);
    setSelectedOrgUnits([]);
  };

  const datePickerValue = parseDateFilterStringToRangeValue(dateFilter);

  const handleDateChange = (range: RangeValue<DateValue> | null) => {
    const newFilterString = formatDateRangeValueToString(range);
    setDateFilter(newFilterString);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={isMobile ? "bottom" : "center"}
      scrollBehavior="inside"
      size={isMobile ? "2xl" : "md"}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>
            <ModalBody>
              <ScrollShadow className="flex w-full flex-col gap-6 px-2 py-4">
                <div>
                  {/* Rango de fecha */}
                  <div className="mb-4">
                    <h4 className="text-md mb-2">Rango de fecha</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center">
                        <DateRangePicker
                          className="max-w-full"
                          label="Fecha"
                          size="sm"
                          variant="bordered"
                          color="default"
                          value={datePickerValue as any}
                          onChange={handleDateChange}
                          selectorIcon={
                            <Icon
                              icon="lucide:calendar-days"
                              className="text-2xl"
                            />
                          }
                          classNames={{
                            input: "text-sm text-foreground",
                            label: "text-tiny",
                            selectorIcon: "text-foreground",
                            selectorButton: "mb-4",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rango de eNPS */}
                  <div className="mb-4">
                    <h4 className="text-md mb-2">Rango de eNPS</h4>
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <span className="text-xs block mb-1">Mínimo</span>
                        <NumberInput
                          size="sm"
                          variant="bordered"
                          className="max-w-xs"
                          value={minENPS / 100}
                          onValueChange={(value) =>
                            setMinENPS(Math.max(0, Math.min(100, value * 100)))
                          }
                          min={0}
                          max={1}
                          step={0.01}
                          formatOptions={{
                            style: "percent",
                          }}
                          label="Mínimo"
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-xs block mb-1">Máximo</span>
                        <NumberInput
                          size="sm"
                          variant="bordered"
                          className="max-w-xs"
                          value={maxENPS / 100}
                          onValueChange={(value) =>
                            // Multiply by 100 and clamp before setting state
                            setMaxENPS(Math.max(0, Math.min(100, value * 100)))
                          }
                          min={0}
                          max={1}
                          step={0.01}
                          formatOptions={{
                            style: "percent",
                          }}
                          label="Máximo"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rango de rotación */}
                  <div className="mb-4">
                    <h4 className="text-md mb-2">Rango de rotación</h4>
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <span className="text-xs block mb-1">Mínimo</span>
                        <NumberInput
                          size="sm"
                          className="max-w-xs"
                          variant="bordered"
                          value={minRisk / 100}
                          onValueChange={(value) =>
                            setMinRisk(Math.max(0, Math.min(100, value * 100)))
                          }
                          min={0}
                          max={1}
                          step={0.01}
                          formatOptions={{
                            style: "percent",
                          }}
                          label="Mínimo"
                        />
                      </div>
                      <div className="w-1/2">
                        <span className="text-xs block mb-1">Máximo</span>
                        <NumberInput
                          size="sm"
                          variant="bordered"
                          className="max-w-xs"
                          value={maxRisk / 100}
                          onValueChange={(value) =>
                            setMaxRisk(Math.max(0, Math.min(100, value * 100)))
                          }
                          min={0}
                          max={1}
                          step={0.01}
                          formatOptions={{
                            style: "percent",
                          }}
                          label="Máximo"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Emociones */}
                  <div className="mb-4">
                    <h4 className="text-md mb-2">Emociones</h4>
                    <div className="flex flex-col gap-3">
                      {EMOTIONS.map((emotion) => (
                        <Checkbox
                          key={emotion.label}
                          size="lg"
                          isSelected={selectedEmotions.includes(emotion.label)}
                          onValueChange={(checked) =>
                            handleEmotionChange(emotion.label, checked)
                          }
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-2xl">{emotion.emoji} </span>
                            <span className="text-md">{emotion.label}</span>
                          </span>
                        </Checkbox>
                      ))}
                    </div>
                  </div>

                  {/* Por unidad organizativa */}
                  <div className="mb-2">
                    <h4 className="text-md mb-1">Por unidad organizativa</h4>
                    <Input
                      radius="sm"
                      variant="bordered"
                      placeholder="Buscar"
                      className="mb-2"
                      value={orgUnitSearch}
                      onValueChange={setOrgUnitSearch}
                      endContent={<SearchIcon className="" size={18} />}
                    />
                    <div className="flex flex-col gap-3 max-h-40 overflow-y-auto">
                      {filteredOrgUnits.map((unit) => (
                        <Checkbox
                          key={unit}
                          size="lg"
                          isSelected={selectedOrgUnits.includes(unit)}
                          onValueChange={(checked) =>
                            handleOrgUnitChange(unit, checked)
                          }
                        >
                          <span className="text-mds">{unit}</span>
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollShadow>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="bordered" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" onPress={handleClearFilters}>
                Limpiar Filtros
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
