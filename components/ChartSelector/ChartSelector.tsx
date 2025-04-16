import { ChartOption } from "@/types";
import { Button } from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import { FC } from "react";

interface ChartSelectorProps {
  selected: string;
  setSelected: (value: string) => void;
  options: ChartOption[];
}

export const ChartSelector: FC<ChartSelectorProps> = ({
  selected,
  setSelected,
  options,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
      {options.map((option) => (
        <Button
          key={option.key}
          variant={selected === option.key ? "solid" : "bordered"}
          color={selected === option.key ? "primary" : "default"}
          className="min-w-[140px] justify-start"
          startContent={
            option.icon ? <Icon icon={option.icon} className="text-lg" /> : null
          }
          onPress={() => setSelected(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};
