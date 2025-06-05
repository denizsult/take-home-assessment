interface DataTableEmptyProps {
  visibleColumnCount: number;
  hasRowActions: boolean;
}

export const DataTableEmpty = ({
  visibleColumnCount,
  hasRowActions,
}: DataTableEmptyProps) => {
  return (
    <tbody>
      <tr>
        <td
          colSpan={visibleColumnCount + (hasRowActions ? 1 : 0)}
          className="px-6 py-10 text-center text-sm text-gray-500"
        >
          No data found
        </td>
      </tr>
    </tbody>
  );
};
