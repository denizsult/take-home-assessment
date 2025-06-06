import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { OrderForm } from "./form";
import { Order, OrderStatus } from "@/api/types";
import { Plus } from "lucide-react";
import { OrderRowActions } from "./OrderRowActions";
import { orderApi } from "@/api/mock-api";
import { useFilterStoreState } from "@/store/filterStore";
import { columns, filterOptions } from "./partials/columns";
import { OrderFormValues } from "./form/schemas";

export function OrdersTable() {
  const { page, pageSize, sort, filters } = useFilterStoreState();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [data, setData] = useState<{ data: Order[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch orders data
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await orderApi.getAll(filters, sort, page, pageSize);
      setData(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, sort, page, pageSize]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCreateOrder = async (formData: OrderFormValues) => {
    setIsLoading(true);
    try {
      const orderWithDate = {
        ...formData,
        orderDate: new Date().toISOString(),
        status: formData.status as OrderStatus,
      };
      await orderApi.create(orderWithDate);
      fetchOrders();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    setIsLoading(true);
    try {
      await orderApi.delete(id);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Order
        </Button>
      </div>

      <DataTable
        data={data.data}
        columns={columns}
        total={data.total}
        isLoading={isLoading}
        renderRowActions={(row) => (
          <OrderRowActions order={row} onDelete={handleDeleteOrder} />
        )}
        filterOptions={filterOptions}
      />
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Order"
      >
        <OrderForm onSubmit={handleCreateOrder} isLoading={isLoading} />
      </Modal>
    </div>
  );
}
