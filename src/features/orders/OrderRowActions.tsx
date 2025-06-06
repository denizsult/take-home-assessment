import { Order } from "@/api/types";
import { Button } from "@/components/ui/Button";
import { Trash } from "lucide-react";

interface OrderRowActionsProps {
  order: Order;
  onDelete: (id: string) => void;
}

export function OrderRowActions({ order, onDelete }: OrderRowActionsProps) {
  const handleDelete = () => {
    onDelete(order.id);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-red-700 hover:text-red-800"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}
