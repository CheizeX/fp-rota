import { useState, useMemo } from "react";
import { SortDescriptor } from "@fichap-team/fichapui";
import { UserType } from "@/types/table";

export function useTableSorting(itemsToSort: UserType[]) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...itemsToSort].sort((a: UserType, b: UserType) => {
      const col = sortDescriptor.column as keyof UserType;

      let first = a[col] ?? "";
      let second = b[col] ?? "";

      // Handle specific sorting logic (like ID)
      if (
        col === "id" &&
        typeof first === "string" &&
        typeof second === "string"
      ) {
        const firstNum = parseInt(first.split("-")[1]);
        const secondNum = parseInt(second.split("-")[1]);
        return sortDescriptor.direction === "descending"
          ? secondNum - firstNum
          : firstNum - secondNum;
      }

      // Handle risk percentage sorting
      if (col === "riskPercentage") {
        const firstNum = typeof first === "number" ? first : 0;
        const secondNum = typeof second === "number" ? second : 0;
        return sortDescriptor.direction === "descending"
          ? secondNum - firstNum
          : firstNum - secondNum;
      }

      // Handle eNPS percentage sorting
      if (col === "eNPS") {
        const firstNum = parseInt(
          typeof first === "string" ? first.replace("%", "") : "0"
        );
        const secondNum = parseInt(
          typeof second === "string" ? second.replace("%", "") : "0"
        );
        return sortDescriptor.direction === "descending"
          ? secondNum - firstNum
          : firstNum - secondNum;
      }

      // General string comparison
      if (typeof first === "string" && typeof second === "string") {
        return sortDescriptor.direction === "descending"
          ? second.localeCompare(first)
          : first.localeCompare(second);
      }

      // Handle null/undefined and general comparison
      if (first === second) return 0;
      if (first === null || first === undefined) return 1;
      if (second === null || second === undefined) return -1;

      return String(first).localeCompare(String(second));
    });
  }, [itemsToSort, sortDescriptor]);

  return {
    sortDescriptor,
    setSortDescriptor,
    sortedItems,
  };
}
