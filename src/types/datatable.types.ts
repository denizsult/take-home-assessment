import { ReactNode } from "react";
import { FilterOption, FilterState } from "./filter.types";

export type CellType = "string" | "number" | "boolean" | "date" | "currency";

export interface Column<T> {
  field: keyof T;
  header: string;
  hidden?: boolean;
  sortable?: boolean;
  className?: string;
  type?: CellType;
  cell?: (row: T) => ReactNode;
}

export interface Sort {
  field: string;
  direction: "asc" | "desc";
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  total: number;
  isLoading: boolean;
  renderRowActions?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;
  filterOptions?: FilterOption[];
  showFilters?: boolean;
  onFilterChange?: (filters: FilterState) => void;
  stickyActions?: boolean;
  defaultPageSize?: number;
}
