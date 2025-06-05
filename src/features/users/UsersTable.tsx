import { useState, useEffect } from "react";
import { userApi } from "../../api/mock-api";
import { DataTable } from "../../components/data-table/DataTable";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { UserForm } from "./UserForm";
import { User, FilterState, SortState } from "../../api/types";
import { roleOptions, getRoleLabel, UserFormValues } from "./schemas";
import { useUrlState } from "../../hooks/useUrlState";
import { Plus, MoreHorizontal, Edit, Trash } from "lucide-react";
import { formatDate } from "../../lib/utils";
import { FilterOption } from "@/types/filter.types";

export function UsersTable() {
  // URL synced state
  const [urlState, setUrlState] = useUrlState<{
    page: number;
    pageSize: number;
    sort: SortState | undefined;
    filters: FilterState;
  }>({
    page: 1,
    pageSize: 10,
    sort: { field: "createdAt", direction: "desc" },
    filters: {},
  });

  // Extract state from URL
  const { page, pageSize, sort, filters } = urlState;

  // Local state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [rowActionsId, setRowActionsId] = useState<string | null>(null);
  const [data, setData] = useState<{ data: User[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch users data
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await userApi.getAll(filters, sort, page, pageSize);
      setData(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      setRowActionsId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setUrlState({
      ...urlState,
      filters: newFilters,
      page: 1, // Reset to first page when filters change
    });
  };

  // Handle sort changes
  const handleSortChange = (newSort: SortState) => {
    setUrlState({ ...urlState, sort: newSort });
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setUrlState({ ...urlState, page: newPage });
  };

  // Handle page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setUrlState({ ...urlState, pageSize: newPageSize });
  };

  // Toggle row actions menu
  const toggleRowActions = (id: string) => {
    setRowActionsId(rowActionsId === id ? null : id);
  };

  // Table columns definition
  const columns = [
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

  // Row actions render function
  const renderRowActions = (row: User) => (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          toggleRowActions(row.id);
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {rowActionsId === row.id && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                // Handle edit action
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteUser(row.id);
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
        page={page}
        pageSize={pageSize}
        sort={sort}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        onPageSizeChange={handlePageSizeChange}
        renderRowActions={renderRowActions}
        filterOptions={filterOptions as FilterOption[]}
        onFilterChange={handleFilterChange}
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
