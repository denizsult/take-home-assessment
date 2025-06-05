import { Column } from "@/types/datatable.types";
import { cn, formatDate, isDate, formatCurrency } from "../../lib/utils";

interface DataTableBodyProps<T> {
  data: T[];
  visibleColumns: Column<T>[];
  isLoading: boolean;
  renderRowActions?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
}

const formatCellValue = (value: unknown) => {
  if (value === null || value === undefined) return "-";
  if (isDate(value)) return formatDate(value as string);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    return String(value).includes(".") ? formatCurrency(value) : value;
  }
  return value as string;
};

export function DataTableBody<T>({
  data,
  visibleColumns,
  renderRowActions,
  onRowClick,
}: DataTableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, i) => (
        <tr
          key={i}
          className={cn(
            "hover:bg-gray-50 transition-colors",
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
                : formatCellValue(row[column.field])}
            </td>
          ))}
          {renderRowActions && (
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              {renderRowActions(row)}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
