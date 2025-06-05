import { useState, useCallback, useEffect } from "react";
import { orderApi } from "../../api/mock-api";
import { DataTable } from "../../components/data-table/DataTable";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { OrderForm } from "./OrderForm";
import { Order, SortState, OrderStatus } from "../../api/types";
import {
  statusOptions,
  getStatusLabel,
  statusColorMap,
  OrderFormValues,
} from "./schemas";
import { useUrlState } from "../../hooks/useUrlState";
import { Plus } from "lucide-react";
import { formatDate, formatCurrency } from "../../lib/utils";
import { FilterOption, FilterState } from "@/types/filter.types";
import { OrderRowActions } from "./OrderRowActions";
import { Column } from "@/types/datatable.types";

export function OrdersTable() {
  const [urlState, setUrlState] = useUrlState<{
    page: number;
    pageSize: number;
    sort: SortState | undefined;
    filters: FilterState;
  }>({
    page: 1,
    pageSize: 10,
    sort: { field: "orderDate", direction: "desc" },
    filters: {},
  });

  // Extract state from URL
  const { page, pageSize, sort, filters } = urlState;

  // Local state
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
  const fetchOrders = useCallback(async () => {
    console.log("x");
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
  }, []);

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
        page={page}
        pageSize={pageSize}
        sort={sort}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        renderRowActions={(row) => (
          <OrderRowActions order={row} onDelete={handleDeleteOrder} />
        )}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
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
