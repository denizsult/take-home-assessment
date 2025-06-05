import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { OrderForm } from "./OrderForm";
import { Order, OrderStatus } from "@/api/types";
import {
  statusOptions,
  getStatusLabel,
  statusColorMap,
  OrderFormValues,
} from "./schemas";
import { Plus } from "lucide-react";
import { formatDate, formatCurrency } from "../../lib/utils";
import { FilterOption } from "@/types/filter.types";
import { OrderRowActions } from "./OrderRowActions";
import { Column } from "@/types/datatable.types";
import { orderApi } from "@/api/mock-api";
import { useFilterStore } from "@/store/filterStore";

export function OrdersTable() {
  const { filters, sort, page, pageSize } = useFilterStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [data, setData] = useState<{ data: Order[]; total: number }>({
    data: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Define filter options
  const filterOptions: FilterOption[] = [
    {
      field: "status",
      label: "Status",
      type: "select",
      options: statusOptions,
    },
    {
      field: "orderDate",
      label: "Order Date",
      type: "date",
    },
  ];

  // Fetch orders data
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const result = await orderApi.getAll(filters, sort, page, pageSize);
      setData(result);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa, filtre veya sıralama değiştiğinde verileri yeniden çek
  useEffect(() => {
    fetchOrders();
  }, [page, pageSize, sort, filters]);

  // Create order
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

  // Delete order
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

  // Table columns definition
  const columns: Column<Order>[] = [
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
      field: "orderDate",
      header: "Order Date",
      sortable: true,
      cell: (row: Order) => formatDate(row.orderDate),
    },
    {
      field: "total",
      header: "Total",
      sortable: true,
      cell: (row: Order) => formatCurrency(row.total),
    },
  ];

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
