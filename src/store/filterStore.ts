import { SortState } from "@/api/types";
import { FilterStore } from "@/types/filter.types";
import { create } from "zustand";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect } from "react";

// URL state için varsayılan değerler
const defaultUrlState = {
  filters: {},
  page: 1,
  pageSize: 10,
  sort: undefined as SortState | undefined,
  search: "",
};

const store = create<FilterStore>((set) => ({
  // Initial state
  ...defaultUrlState,
  isFilterMenuOpen: false,

  // Actions
  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
      search,
    })),

  setPage: (page: number) => set({ page }),
  setPageSize: (pageSize: number) => set({ pageSize }),
  setSort: (sort: SortState) => set({ sort }),
  setFilters: (filters) => set({ filters }),

  updateFilter: (field, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [field]: value,
      },
    })),

  clearFilters: () =>
    set({
      filters: {},
      search: "",
    }),

  toggleFilterMenu: () =>
    set((state) => ({
      isFilterMenuOpen: !state.isFilterMenuOpen,
    })),

  setDateFilter: (field, startOrEnd, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [`${field}_${startOrEnd}`]: value,
      },
    })),
}));

// URL senkronizasyonu ile birleştirilmiş store hook'u
export const useFilterStore = () => {
  const [urlState, setUrlState] = useUrlState(defaultUrlState);
  const storeState = store();

  // URL'den store'a senkronizasyon (mount olduğunda)
  useEffect(() => {
    store.setState({
      filters: urlState.filters,
      page: urlState.page,
      pageSize: urlState.pageSize,
      sort: urlState.sort,
      search: urlState.search,
    });
  }, []);

  // Store'dan URL'e senkronizasyon
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isFilterMenuOpen, ...stateForUrl } = storeState;
    setUrlState(stateForUrl);
  }, [
    storeState.filters,
    storeState.page,
    storeState.pageSize,
    storeState.sort,
    storeState.search,
    storeState,
    setUrlState,
  ]);

  return storeState;
};
