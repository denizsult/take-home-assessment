import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Select } from "../../ui/Select";
import { X } from "lucide-react";
import { useFilterStore } from "../../../store/filterStore";
import { FilterMenuProps } from "@/types/filter.types";

export function FilterMenu({ filterOptions }: FilterMenuProps) {
  const { filters, updateFilter, setDateFilter } = useFilterStore();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      
      
      {filterOptions.map((filterOption) => (
        <div key={filterOption.field} className="space-y-2 ">
          <label className="block text-sm font-medium text-gray-700">
            {filterOption.label}
          </label>

          {filterOption.type === "select" && filterOption.options && (
            <Select
              options={[
                { value: "", label: "All" },
                ...filterOption.options.map((option) => ({
                  ...option,
                  value: String(option.value),
                })),
              ]}
              value={(filters[filterOption.field] as string) || ""}
              onChange={(value) => updateFilter(filterOption.field, value)}
            />
          )}

          {filterOption.type === "boolean" && (
            <div className="flex gap-2 items-center">
              <Button
                type="button"
                variant={
                  filters[filterOption.field] === true ? "default" : "outline"
                }
                size="md"
                className="flex-1"
                onClick={() => updateFilter(filterOption.field, true)}
              >
                Active
              </Button>
              <Button
                type="button"
                variant={
                  filters[filterOption.field] === false ? "default" : "outline"
                }
                size="md"
                className="flex-1"
                onClick={() => updateFilter(filterOption.field, false)}
              >
                Inactive
              </Button>
              {(filters[filterOption.field] === true ||
                filters[filterOption.field] === false) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilter(filterOption.field, undefined)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {filterOption.type === "date" && (
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <Input
                  type="date"
                  value={
                    (filters[`${filterOption.field}`] as string) || ""
                  }
                  onChange={(e) =>
                    updateFilter(filterOption.field, e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>
          )}

          {filterOption.type === "dateRange" && (
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">From:</span>
                <Input
                  type="date"
                  value={
                    (filters[`${filterOption.field}_start`] as string) || ""
                  }
                  onChange={(e) =>
                    setDateFilter(filterOption.field, "start", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">To:</span>
                <Input
                  type="date"
                  value={(filters[`${filterOption.field}_end`] as string) || ""}
                  onChange={(e) =>
                    setDateFilter(filterOption.field, "end", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
