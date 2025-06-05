import { useMemo } from "react";
import { DataTableProps } from "@/types/datatable.types";
import { FilterBar } from "./Filters/FilterBar";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";
import { RenderIf } from "../ui/RenderIf";
import { DataTableLoading } from "./DataTableLoading";
import { DataTableEmpty } from "./DataTableEmpty";

export function DataTable<T>({
  data,
  columns,
  total,
  page,
  pageSize,
  sort,
  isLoading,
  onPageChange,
  onSortChange,
  onPageSizeChange,
  renderRowActions,
  onRowClick,
  filterOptions,
  showFilters = true,
  onFilterChange,
}: DataTableProps<T>) {
  // Filter out hidden columns
  const visibleColumns = useMemo(() => {
    return columns.filter((column) => !column.hidden);
  }, [columns]);

  // Handle column sort
  const handleSort = (field: keyof T) => {
    if (!sort || sort.field !== field) {
      onSortChange({ field: field as string, direction: "asc" });
    } else {
      onSortChange({
        field: field as string,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    }
  };

  return (
    <div className="space-y-4">
      {showFilters && filterOptions && (
        <FilterBar
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
        />
      )}

      {/* Mevcut DataTable içeriği */}
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg bg-white">
        {/* Table with horizontal scroll for all screen sizes */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <DataTableHeader<T>
              visibleColumns={visibleColumns}
              sort={sort}
              onSort={handleSort}
              renderRowActions={!!renderRowActions}
            />

            {/* Loading */}
            <RenderIf condition={isLoading}>
              <DataTableLoading
                visibleColumnCount={visibleColumns.length}
                hasRowActions={!!renderRowActions}
              />
            </RenderIf>

            {/* Empty */}
            <RenderIf condition={!isLoading && data.length === 0}>
              <DataTableEmpty
                visibleColumnCount={visibleColumns.length}
                hasRowActions={!!renderRowActions}
              />
            </RenderIf>

            {/* Body */}
            <RenderIf condition={!isLoading && data.length > 0}>
              <DataTableBody<T>
                data={data}
                visibleColumns={visibleColumns}
                isLoading={isLoading}
                renderRowActions={renderRowActions}
                onRowClick={onRowClick}
              />
            </RenderIf>
          </table>
        </div>

        {/* Pagination */}
        <DataTablePagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
