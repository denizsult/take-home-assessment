import { FilterStore } from '@/types/filter.types';
import { create } from 'zustand';


export const useFilterStore = create<FilterStore>((set) => ({
  // Initial state
  filters: {},
  search: '',
  isFilterMenuOpen: false,
  
  // Actions
  setSearch: (search) => 
    set((state) => ({ 
      filters: { ...state.filters, search },
      search 
    })),
  
  setFilters: (filters) => 
    set({ filters }),
    
  updateFilter: (field, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [field]: value
      }
    })),
  
  clearFilters: () => 
    set((state) => ({ 
      filters: { search: state.filters.search },
      search: state.filters.search || '' 
    })),
  
  toggleFilterMenu: () => 
    set((state) => ({ 
      isFilterMenuOpen: !state.isFilterMenuOpen 
    })),
    
  setDateFilter: (field, startOrEnd, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [`${field}_${startOrEnd}`]: value
      }
    })),
})); 