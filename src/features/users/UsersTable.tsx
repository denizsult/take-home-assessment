import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { User } from "@/api/types";
import { Plus } from "lucide-react";
import { FilterOption } from "@/types/filter.types";
import { useFilterStoreState } from "@/store/filterStore";
import { UsersRowActions } from "./UsersRowActions";
import { userApi } from "@/api/mock-api";
import { UserFormValues } from "./form/schemas";
import { UserForm } from "./form";
import { columns, filterOptions } from "./partials/columns";

export function UsersTable() {
  const { page, pageSize, sort, filters } = useFilterStoreState();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [data, setData] = useState<{ data: User[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

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
  }, [fetchUsers]);

  const handleCreateUser = async (formData: UserFormValues) => {
    setIsLoading(true);
    try {
      await userApi.create(formData);
      await fetchUsers();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;
    setIsLoading(true);
    try {
      await userApi.delete(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false);
    }
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
          <UsersRowActions row={row} handleDeleteUser={handleDeleteUser} />
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
