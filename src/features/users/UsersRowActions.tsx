import { Button } from "@/components/ui/Button";
import { User } from "@/api/types";
import { Edit, Trash } from "lucide-react";

interface UsersRowActionsProps {
  row: User;
  handleDeleteUser: (id: string) => void;
}

export const UsersRowActions = ({
  row,
  handleDeleteUser,
}: UsersRowActionsProps) => {
  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    handleDeleteUser(row.id);
  };

  return (
    <div className="flex items-center gap-2 w-[10px]">
      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit();
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
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
};
