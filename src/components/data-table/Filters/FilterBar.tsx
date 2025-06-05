import { Button } from "@/components/ui/Button";
import { Filter, X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { SearchInput } from "./SearchInput";
import { FilterMenu } from "./FilterMenu";
import { FilterBarProps } from "@/types/filter.types";
import { RenderIf } from "@/components/ui/RenderIf";
import { useMemo } from "react";

export function FilterBar({ filterOptions }: FilterBarProps) {
  const { filters, isFilterMenuOpen, toggleFilterMenu, clearFilters } =
    useFilterStore();

  const usedFilterCount = useMemo(() => {
    return Object.keys(filters).filter(
      (key) =>
        key !== "search" && filters[key] !== undefined && filters[key] !== ""
    ).length;
  }, [filters]);

  const hasActiveFilters = usedFilterCount > 0;
  

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput />

        <Button
          type="button"
          variant={isFilterMenuOpen || hasActiveFilters ? "default" : "outline"}
          className="sm:w-auto flex items-center gap-1"
          onClick={toggleFilterMenu}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtreler
          <RenderIf condition={hasActiveFilters}>
            <span className="text-sm">({usedFilterCount})</span>
          </RenderIf>
        </Button>

        <RenderIf condition={hasActiveFilters}>
          <Button
            type="button"
            variant="outline"
            className="sm:w-auto"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Filtreleri Temizle
          </Button>
        </RenderIf>
      </div>

      <RenderIf condition={isFilterMenuOpen}>
        <FilterMenu filterOptions={filterOptions} />
      </RenderIf>
    </div>
  );
}
