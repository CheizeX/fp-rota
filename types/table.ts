// Tipos relacionados con la tabla de empleados
import { STATUS_OPTIONS } from "@/data/tableData";
import type { Selection, SortDescriptor } from "@fichap-team/fichapui";

export type StatusOptionsType = (typeof STATUS_OPTIONS)[number]["name"];

export type ColumnType = {
  uid: string;
  name: string;
  sortDirection?: string;
  info?: string;
};

export type RiskLevel = "Alto" | "Medio" | "Bajo";
export type EmotionType =
  | "Felíz"
  | "Calmado"
  | "Sorprendido"
  | "Disgustado"
  | "Confundido"
  | "Triste"
  | "Enojado"
  | "Miedo";

export type UserType = {
  id: string;
  name: string;
  avatar?: string;
  riskPercentage: number;
  exitDate: string;
  emotion: EmotionType;
  eNPS: string;
  area: string;
};

export type ColumnsKeyType = keyof UserType | "actions";

export interface TableContentProps {
  headerColumns: any[];
  sortedItems: UserType[];
  renderCell: (user: UserType, columnKey: React.Key) => React.ReactNode;
  onSelectionChange: (keys: Selection) => void;
  filterSelectedKeys: Selection;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (descriptor: SortDescriptor) => void;
}

export interface TableFiltersProps {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  visibleColumns: Selection;
  setVisibleColumns: (columns: Selection) => void;
  filterSelectedKeys: Selection;
  headerColumns: any[];
  sortDescriptor: SortDescriptor;
  setSortDescriptor: (descriptor: SortDescriptor) => void;
  setPage: (page: number) => void;
  onOpenFilters: () => void;
  riskLevelFilter: string;
  setRiskLevelFilter: (value: string) => void;
}

export interface TableBottomContentProps {
  filterSelectedKeys: Selection;
  pages: number;
  page: number;
  filteredItemsLength: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}
