import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, OrderFormValues, statusOptions } from "./schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface OrderFormProps {
  onSubmit: (data: OrderFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Partial<OrderFormValues>;
}

export function OrderForm({
  onSubmit,
  isLoading,
  defaultValues,
}: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderNumber: "",
      customer: "",
      status: "pending",
      total: 0,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="orderNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Order Number
        </label>
        <Input
          id="orderNumber"
          type="text"
          placeholder="ORD-1234"
          error={errors.orderNumber?.message}
          {...register("orderNumber")}
        />
      </div>

      <div>
        <label
          htmlFor="customer"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Customer
        </label>
        <Input
          id="customer"
          type="text"
          placeholder="Customer name"
          error={errors.customer?.message}
          {...register("customer")}
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Status
        </label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              id="status"
              options={statusOptions}
              error={errors.status?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <label
          htmlFor="total"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Total Amount ($)
        </label>
        <Input
          id="total"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          error={errors.total?.message}
          {...register("total", { valueAsNumber: true })}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full" isLoading={isLoading}>
          Save Order
        </Button>
      </div>
    </form>
  );
}
