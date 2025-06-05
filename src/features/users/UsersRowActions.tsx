import { Button } from "@/components/ui/Button";
import { RenderIf } from "@/components/ui/RenderIf";
import { User } from "@/api/types";
import { MoreHorizontal, Trash } from "lucide-react";

interface UsersRowActionsProps {
  row: User;
  rowActionsId?: string;
  toggleRowActions: (id: string) => void;
  handleDeleteUser: (id: string) => void;
}

export const UsersRowActions = ({
  row,
  rowActionsId,
  toggleRowActions,
  handleDeleteUser,
}: UsersRowActionsProps) => {
  return (
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

      <RenderIf condition={rowActionsId === row.id}>
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
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
      </RenderIf>
    </div>
  );
};
