import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Column } from "@/types/datatable.types";
import { useFilterStore } from "@/store/filterStore";
import { RenderIf } from "../ui/RenderIf";

interface DataTableHeaderProps<T> {
  visibleColumns: Column<T>[];
  renderRowActions?: boolean;
}

export function DataTableHeader<T>({
  visibleColumns,

  renderRowActions,
}: DataTableHeaderProps<T>) {
  const { setSort, sort } = useFilterStore();
  const getSortIcon = (field: keyof T) => {
    if (!sort || sort.field !== field) return null;
    return sort.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
  };

  const handleSort = (field: keyof T) => {
    setSort({
      field: field as string,
      direction: sort?.direction === "asc" ? "desc" : "asc",
    });
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {visibleColumns.map((column) => (
          <th
            key={column.field as string}
            scope="col"
            className={cn(
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              column.sortable && "cursor-pointer hover:bg-gray-100",
              column.className
            )}
            onClick={() => column.sortable && handleSort(column.field)}
          >
            <div className="flex items-center whitespace-nowrap">
              {column.header}
              {column.sortable && getSortIcon(column.field)}
            </div>
          </th>
        ))}
        <RenderIf condition={renderRowActions}>
          <th scope="col" className="relative px-6 py-3 sticky right-0 bg-white shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.1)]">
            <span className="sr-only">Actions</span>
          </th>
        </RenderIf>
      </tr>
    </thead>
  );
}
