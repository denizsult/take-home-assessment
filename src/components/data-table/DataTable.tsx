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
  isLoading,
  renderRowActions,
  onRowClick,
  filterOptions,
  showFilters = true,
  stickyActions = true,
  defaultPageSize = 10,
}: DataTableProps<T>) {
  // Filter out hidden columns
  const visibleColumns = useMemo(() => {
    return columns.filter((column) => !column.hidden);
  }, [columns]);

  return (
    <div className="space-y-4">
      {showFilters && filterOptions && (
        <FilterBar filterOptions={filterOptions} />
      )}

      {/* Mevcut DataTable içeriği */}
      <div className="w-full overflow-hidden border border-gray-200 rounded-lg bg-white min-h-[400px]">
        {/* Table with horizontal scroll for all screen sizes */}
        <div className="overflow-x-auto  min-h-[400px]">
          <table className="min-w-full  divide-y divide-gray-200">
            <DataTableHeader<T>
              visibleColumns={visibleColumns}
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
                stickyActions={stickyActions}
              />
            </RenderIf>
          </table>
        </div>

        {/* Pagination */}
        <DataTablePagination 
        total={total}
        defaultPageSize={defaultPageSize}
        />
      </div>
    </div>
  );
}
