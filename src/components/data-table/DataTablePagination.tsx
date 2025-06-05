import { useFilterStore } from "@/store/filterStore";
import { Button } from "../ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps {
  total: number;
}

export function DataTablePagination({ total }: DataTablePaginationProps) {
  const { setPage, setPageSize, page, pageSize } = useFilterStore();
  const totalPages = Math.ceil(total / (pageSize || 10));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  return (
    <div className="px-4 py-3 flex items-center justify-end border-t border-gray-200 bg-gray-50">
      <div className="flex items-center gap-4">
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="block w-20 sm:text-sm text-gray-700"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </Button>

        <span className="text-sm text-gray-700">
          Page {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
