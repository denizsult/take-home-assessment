import { SelectOption } from "@/components/ui/Select";

export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | boolean[]
  | undefined;

export type FilterType = "select" | "date" | "boolean";

export interface FilterOption {
  field: string;
  label: string;
  type: FilterType;
  options?: SelectOption[];
}

export interface FilterBarProps {
  filterOptions: FilterOption[];
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterMenuProps {
  filterOptions: FilterOption[];
}

export interface FilterStore {
  // State
  filters: FilterState;
  search: string;
  isFilterMenuOpen: boolean;

  // Actions
  setSearch: (search: string) => void;
  setFilters: (filters: FilterState) => void;
  updateFilter: (field: string, value: FilterValue) => void;
  clearFilters: () => void;
  toggleFilterMenu: () => void;
  setDateFilter: (
    field: string,
    startOrEnd: "start" | "end",
    value: string
  ) => void;
}

export type FilterState = {
  search?: string;
  [key: string]: FilterValue;
};
