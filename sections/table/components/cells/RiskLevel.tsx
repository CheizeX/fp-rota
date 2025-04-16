import { Chip } from "@fichap-team/fichapui";
import React, { useCallback } from "react";

interface RiskLevelProps {
  percentage: number;
}

export const RiskLevel: React.FC<RiskLevelProps> = ({ percentage }) => {
  const handleColorByRiskLevel = useCallback(() => {
    if (percentage >= 70) {
      return "danger";
    } else if (percentage >= 40) {
      return "warning";
    } else {
      return "success";
    }
  }, [percentage]);

  return (
    <Chip variant="flat" color={handleColorByRiskLevel()}>
      {percentage}%
    </Chip>
  );
};
