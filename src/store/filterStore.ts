import { SortState } from "@/api/types";
import { create } from "zustand";
import { useUrlState } from "@/hooks/useUrlState";
import { useEffect, useRef } from "react";

interface FilterState {
  filters: Record<string, unknown>;
  page: number;
  pageSize?: number;
  sort?: SortState;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sort: SortState) => void;
  setFilters: (filters: Record<string, unknown>) => void;
  updateFilter: (field: string, value: unknown) => void;
  clearFilters: () => void;
  setDateFilter: (field: string, startOrEnd: string, value: string) => void;
}

// URL state için varsayılan değerler
const defaultUrlState = {
  filters: {},
  page: 1,
  pageSize: undefined,
  sort: undefined as SortState | undefined,
  search: "",
};




export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  ...defaultUrlState,

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

  setDateFilter: (field, startOrEnd, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [`${field}_${startOrEnd}`]: value,
      },
    })),
}));





// URL senkronizasyonu için selector hook
export const useFilterStoreState = () => {
  const [urlState, setUrlState] = useUrlState(defaultUrlState);
  const isInitialMount = useRef(true);
  
  // Store'dan state'i al
  const state = useFilterStore(state => ({
    filters: state.filters,
    page: state.page,
    pageSize: state.pageSize,
    sort: state.sort,
    search: state.search
  }));

  // İlk mount'ta URL'den state'e
  useEffect(() => {
    if (isInitialMount.current) {
      useFilterStore.setState({
        filters: urlState.filters,
        page: urlState.page,
        pageSize: urlState.pageSize,
        sort: urlState.sort,
        search: urlState.search,
      });
      isInitialMount.current = false;
    }
  }, [urlState]);

  // State'den URL'e (sadece değişikliklerde)
  useEffect(() => {
    if (!isInitialMount.current) {
      setUrlState({
        filters: state.filters,
        page: state.page,
        pageSize: state.pageSize,
        sort: state.sort,
        search: state.search,
      });
    }
  }, [
    state.filters,
    state.page,
    state.pageSize,
    state.sort,
    state.search,
    setUrlState
  ]);

  return state;
};
