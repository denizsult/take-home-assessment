import { useState } from "react";
import { Order } from "@/api/types";
import { Button } from "@/components/ui/Button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { RenderIf } from "@/components/ui/RenderIf";

interface OrderRowActionsProps {
  order: Order;
  onDelete: (id: string) => void;
}

export function OrderRowActions({ order, onDelete }: OrderRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    onDelete(order.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          // Stop event propagation to prevent row click
          e.stopPropagation();
          handleToggle();
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <RenderIf condition={isOpen}>
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </RenderIf>
    </div>
  );
}
