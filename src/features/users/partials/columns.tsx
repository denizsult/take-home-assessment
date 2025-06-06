import { User } from "@/api/types";
import { Column } from "@/types/datatable.types";
import { roleOptions, getRoleLabel } from "../form/schemas";
import { formatDate } from "@/lib/utils";

export const filterOptions = [
  {
    field: "role",
    label: "Role",
    type: "select",
    options: roleOptions,
  },
  {
    field: "isActive",
    label: "Status",
    type: "boolean",
  },
  {
    field: "createdAt",
    label: "Created At",
    type: "date",
  },
];

// Table columns definition
export const columns: Column<User>[] = [
  {
    field: "name",
    header: "Name",
    sortable: true,
  },
  {
    field: "email",
    header: "Email",
    sortable: true,
  },
  {
    field: "role",
    header: "Role",
    sortable: true,
    cell: (row: User) => getRoleLabel(row.role),
  },
  {
    field: "isActive",
    header: "Status",
    sortable: true,
    cell: (row: User) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.isActive
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {row.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    field: "createdAt",
    header: "Created At",
    sortable: true,
    cell: (row: User) => formatDate(row.createdAt),
  },
];
