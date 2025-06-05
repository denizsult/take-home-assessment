import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { Column } from "@/types/datatable.types";

interface DataTableHeaderProps<T> {
  visibleColumns: Column<T>[];
  sort?: { field: string; direction: "asc" | "desc" };
  onSort: (field: keyof T) => void;
  renderRowActions?: boolean;
}


export function DataTableHeader<T>({
  visibleColumns,
  sort,
  onSort,
  renderRowActions,
}: DataTableHeaderProps<T>) {
 
 
  const getSortIcon = (field: keyof T) => {
    if (!sort || sort.field !== field) return null;
    return sort.direction === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-1" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-1" />
    );
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
            onClick={() => column.sortable && onSort(column.field)}
          >
            <div className="flex items-center">
              {column.header}
              {column.sortable && getSortIcon(column.field)}
            </div>
          </th>
        ))}
        {renderRowActions && (
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        )}
      </tr>
    </thead>
  );
} 