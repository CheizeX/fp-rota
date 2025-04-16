import React, { useState, useCallback, useMemo } from "react";
import {
  UserType,
  RiskLevel as RiskLevelType,
  EmotionType,
} from "@/types/table";
import { POSSIBLE_AREAS } from "@/data/tableData";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
// Importamos la función desde el modal
import { parseDateFilterStringToRangeValue } from "@/sections/table/modals/TableFilterModal";

export function useTableFiltering(initialUsers: UserType[]) {
  // Basic search
  const [filterValue, setFilterValue] = useState("");
  // Simple dropdown filter
  const [riskLevelFilter, setRiskLevelFilter] = useState("all");

  // Modal filters
  const [dateFilter, setDateFilter] = useState(""); // String format: "YYYY-MM-DD to YYYY-MM-DD"
  const [minENPS, setMinENPS] = useState(0);
  const [maxENPS, setMaxENPS] = useState(100);
  const [minRisk, setMinRisk] = useState(0);
  const [maxRisk, setMaxRisk] = useState(100);
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>([]);
  const [orgUnits] = useState<string[]>(POSSIBLE_AREAS); // Assuming orgUnits don't change
  const [selectedOrgUnits, setSelectedOrgUnits] = useState<string[]>([]);

  const itemFilter = useCallback(
    (user: UserType) => {
      // Search
      if (
        filterValue &&
        !user.name.toLowerCase().includes(filterValue.toLowerCase())
      ) {
        return false;
      }

      // Risk level filter
      if (riskLevelFilter !== "all") {
        const risk = user.riskPercentage;
        if (
          (riskLevelFilter === "low" && risk >= 40) ||
          (riskLevelFilter === "medium" && (risk < 40 || risk >= 70)) ||
          (riskLevelFilter === "high" && risk < 70)
        ) {
          return false;
        }
      }

      // Date range filter
      if (dateFilter) {
        try {
          const dateRange = parseDateFilterStringToRangeValue(dateFilter);
          if (dateRange) {
            const userDate = parseDate(
              user.exitDate.replace(/(\d+)\s\w+\.\s(\d+)/, "$2-$1-01")
            );

            if (
              userDate.compare(dateRange.start) < 0 ||
              userDate.compare(dateRange.end) > 0
            ) {
              return false;
            }
          }
        } catch (error) {
          console.error("Error filtering by date:", error);
        }
      }

      // eNPS filter
      const userENPS = parseInt(user.eNPS.replace("%", ""));
      if (userENPS < minENPS || userENPS > maxENPS) {
        return false;
      }

      // Risk filter
      const userRisk = user.riskPercentage;
      if (userRisk < minRisk || userRisk > maxRisk) {
        return false;
      }

      // Emotions filter
      if (
        selectedEmotions.length > 0 &&
        !selectedEmotions.includes(user.emotion)
      ) {
        return false;
      }

      // Org units filter
      if (
        selectedOrgUnits.length > 0 &&
        user.area &&
        !selectedOrgUnits.includes(user.area)
      ) {
        return false;
      }

      return true;
    },
    [
      filterValue,
      riskLevelFilter,
      dateFilter,
      minENPS,
      maxENPS,
      minRisk,
      maxRisk,
      selectedEmotions,
      selectedOrgUnits,
    ]
  );

  const filteredItems = useMemo(() => {
    return initialUsers.filter(itemFilter);
  }, [initialUsers, itemFilter]);

  return {
    filterValue,
    setFilterValue,
    filteredItems,
    riskLevelFilter,
    setRiskLevelFilter,
    dateFilter,
    setDateFilter,
    minENPS,
    setMinENPS,
    maxENPS,
    setMaxENPS,
    minRisk,
    setMinRisk,
    maxRisk,
    setMaxRisk,
    selectedEmotions,
    setSelectedEmotions,
    orgUnits,
    selectedOrgUnits,
    setSelectedOrgUnits,
  };
}
