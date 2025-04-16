import { FilterIcon } from "@/icons/icons";
import { TimeframeOption } from "@/types";
import {
  Button,
  Card,
  CardBody,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import { Dispatch, FC, ReactNode, SetStateAction, useRef } from "react";
import { DownloadOptions } from "./DownloadOptions";

export interface TimeframeOptionItem {
  key: string;
  label: string;
}

export interface YearOption {
  key: string;
  label: string;
}

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: string;
  timeframe: string;
  setTimeframe:
    | Dispatch<SetStateAction<TimeframeOption>>
    | ((value: string) => void);
  year: string;
  setYear: (value: string) => void;
  timeframeOptions: TimeframeOptionItem[];
  yearOptions: YearOption[];
  onFilter?: () => void;
  children?: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({
  title,
  description,
  icon = "lucide:chart-bar",
  timeframe,
  setTimeframe,
  year,
  setYear,
  timeframeOptions,
  yearOptions,
  onFilter,
  children,
}) => {
  const chartRef = useRef(null);

  const handleFilter = () => {
    if (onFilter) {
      onFilter();
    }
  };

  return (
    <Card className="mx-auto shadow-lg" disableRipple>
      <CardBody className="p-2 sm:p-6 gap-2 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon
              icon={icon}
              className={cn(
                "text-default-400 text-xl sm:text-2xl size-7 hidden sm:block"
              )}
            />
            <h2 className="text-lg font-bold leading-5 ">{title}</h2>
            {description && (
              <Tooltip content={description} placement="right">
                <Icon
                  icon="lucide:info"
                  className="hidden sm:block text-default-400 sm:text-2xl"
                />
              </Tooltip>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              isIconOnly
              variant="bordered"
              color="primary"
              onPress={handleFilter}
              className="border-1"
            >
              <FilterIcon />
            </Button>

            <DownloadOptions
              chartRef={chartRef}
              fileName={title}
              timeframe={timeframe}
              year={year}
            />
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="w-32 justify-between"
                endContent={
                  <Icon icon="lucide:chevron-down" className="text-sm" />
                }
              >
                {timeframeOptions.find((opt) => opt.key === timeframe)?.label ||
                  "Mensual"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Seleccionar período"
              onAction={(key) =>
                setTimeframe(key as SetStateAction<TimeframeOption> & string)
              }
            >
              {timeframeOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="w-24 justify-between"
                endContent={
                  <Icon icon="lucide:chevron-down" className="text-sm" />
                }
              >
                {yearOptions.find((opt) => opt.key === year)?.label || "2025"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Seleccionar año"
              onAction={(key) => setYear(key as string)}
            >
              {yearOptions.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {children}
      </CardBody>
    </Card>
  );
};
