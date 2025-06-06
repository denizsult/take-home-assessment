import { z } from "zod";
import { OrderStatus } from "../../api/types";

// Schema for order form validation
export const orderSchema = z.object({
  orderNumber: z
    .string()
    .min(3, { message: "Order number must be at least 3 characters" })
    .max(20, { message: "Order number must be at most 20 characters" }),
  customer: z
    .string()
    .min(2, { message: "Customer name must be at least 2 characters" })
    .max(100, { message: "Customer name must be at most 100 characters" }),
  status: z.enum(
    ["pending", "processing", "shipped", "delivered", "cancelled"] as const,
    {
      invalid_type_error: "Status must be valid",
    }
  ),
  total: z.number().min(0, { message: "Total must be a positive number" }),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

// Map of status values to display labels
export const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

// Get status display label
export function getStatusLabel(status: OrderStatus): string {
  const option = statusOptions.find((o) => o.value === status);
  return option ? option.label : status;
}

// Status color map
export const statusColorMap: Record<OrderStatus, { bg: string; text: string }> =
  {
    pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
    shipped: { bg: "bg-blue-100", text: "text-blue-800" },
    delivered: { bg: "bg-green-100", text: "text-green-800" },
    cancelled: { bg: "bg-red-100", text: "text-red-800" },
  };
