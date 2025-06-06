/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellType, Column } from "@/types/datatable.types";
import { cn, formatDate, formatCurrency } from "../../lib/utils";

interface DataTableBodyProps<T> {
  data: T[];
  visibleColumns: Column<T>[];
  isLoading: boolean;
  renderRowActions?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
  stickyActions?: boolean;
}

const formatCellValue = (value: unknown, type: CellType = "string") => {
  if (value === null || value === undefined) return "-";
  if (type === "boolean") return value ? "Yes" : "No";
  if (type === "number") {
    return String(value).includes(".")
      ? formatCurrency(value as number)
      : value;
  }
  if (type === "date") return formatDate(value as string);
  return value as string;
};

export function DataTableBody<T>({
  data,
  visibleColumns,
  renderRowActions,
  onRowClick,
  stickyActions = false,
}: DataTableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, i) => (
        <tr
          key={i}
          className={cn(
            "hover:bg-gray-50 transition-colors group",
            onRowClick && "cursor-pointer"
          )}
          onClick={() => onRowClick && onRowClick(row)}
        >
          {visibleColumns.map((column) => (
            <td
              key={`${i}-${column.field as string}`}
              className={cn(
                "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                column.className
              )}
            >
              {column.cell
                ? column.cell(row)
                : (formatCellValue(
                    row[column.field] as any,
                    column.type
                  ) as React.ReactNode)}
            </td>
          ))}
          {renderRowActions && (
            <td
              className={cn(
                "px-6 py-4 whitespace-nowrap text-right text-sm font-medium",
                stickyActions &&
                  "sticky right-0  bg-white shadow-[-4px_0_8px_-6px_rgba(0,0,0,0.1)] group-hover:bg-gray-50"
              )}
            >
              {renderRowActions(row)}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
