import { SortState } from "@/api/types";

export type FilterValue = unknown;
export type FilterType = "select" | "date" | "boolean" | "dateRange";

export interface FilterOption {
  field: string;
  label: string;
  type: FilterType;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
}

export interface FilterBarProps {
  filterOptions: FilterOption[];
}

export interface FilterMenuProps {
  filterOptions: FilterOption[];
}

export interface FilterState {
  [key: string]: unknown;
}

export interface FilterStore {
  filters: FilterState;
  search: string;
  page?: number;
  pageSize?: number;
  sort?: SortState;
 
  setSearch: (search: string) => void;
  setFilters: (filters: FilterState) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sort: SortState) => void;
  updateFilter: (field: string, value: FilterValue) => void;
  clearFilters: () => void;
 
  setDateFilter: (field: string, startOrEnd: string, value: string) => void;
}
