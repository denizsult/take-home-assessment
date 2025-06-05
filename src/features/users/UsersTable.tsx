import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { UserForm } from "./UserForm";
import { User } from "@/api/types";
import { roleOptions, getRoleLabel, UserFormValues } from "./schemas";
import { Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { FilterOption } from "@/types/filter.types";
import { useFilterStore } from "@/store/filterStore";
import { UsersRowActions } from "./UsersRowActions";
import { Column } from "@/types/datatable.types";
import { userApi } from "@/api/mock-api";

// Define filter options
const filterOptions = [
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
const columns: Column<User>[] = [
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

export function UsersTable() {
  const { page, pageSize, sort, filters } = useFilterStore();

  // Local state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rowActionsId, setRowActionsId] = useState<string>();
  const [data, setData] = useState<{ data: User[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users data
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await userApi.getAll(filters, sort, page, pageSize);
      setData(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, sort, page, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [page, pageSize, sort, filters,fetchUsers]);

  // Create user
  const handleCreateUser = async (formData: UserFormValues) => {
    setIsLoading(true);
    try {
      await userApi.create(formData);
      fetchUsers();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (id: string) => {
    setIsLoading(true);
    try {
      await userApi.delete(id);
      fetchUsers();
      setRowActionsId(undefined);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle row actions menu
  const toggleRowActions = (id: string) => {
    setRowActionsId(rowActionsId === id ? undefined : id);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <DataTable
        data={data.data}
        columns={columns}
        total={data.total}
        isLoading={isLoading}
        renderRowActions={(row) => (
          <UsersRowActions
            row={row}
            rowActionsId={rowActionsId}
            toggleRowActions={toggleRowActions}
            handleDeleteUser={handleDeleteUser}
          />
        )}
        filterOptions={filterOptions as FilterOption[]}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New User"
      >
        <UserForm onSubmit={handleCreateUser} isLoading={isLoading} />
      </Modal>
    </div>
  );
}
