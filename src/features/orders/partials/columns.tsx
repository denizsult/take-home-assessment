import { Order } from "@/api/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Column } from "@/types/datatable.types";
import { FilterOption } from "@/types/filter.types";
import { statusOptions, statusColorMap, getStatusLabel } from "../form/schemas";
 
export const filterOptions: FilterOption[] = [
  {
    field: "status",
    label: "Status",
    type: "select",
    options: statusOptions,
  },
  {
    field: "createdAt",
    label: "Order Date",
    type: "dateRange",
  },
];

export const columns: Column<Order>[] = [
  {
    field: "orderNumber",
    header: "Order #",
    sortable: true,
    
  },
  {
    field: "customer",
    header: "Customer",
    sortable: true,
  },
  {
    field: "status",
    header: "Status",
    sortable: true,
    cell: (row: Order) => {
       const { bg, text } = statusColorMap[row.status];
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
        >
          {getStatusLabel(row.status)}
        </span>
      );
    },
  },
  {
    field: "createdAt",
    header: "Order Date",
    sortable: true,
    type: "date",
    cell: (row: Order) => formatDate(row.createdAt),
  },
  {
    field: "total",
    header: "Total",
    sortable: true,
    type: "currency",
    cell: (row: Order) => formatCurrency(row.total),
  },
];
