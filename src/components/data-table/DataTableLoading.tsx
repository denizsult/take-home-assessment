interface DataTableLoadingProps {
  visibleColumnCount: number;
  hasRowActions: boolean;
}

export const DataTableLoading = ({
  visibleColumnCount,
  hasRowActions,
}: DataTableLoadingProps) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={`loading-${index}`}>
          {Array.from({ length: visibleColumnCount }).map((_, index) => (
            <td
              key={`loading-${index}-${index}`}
              className="px-6 py-4 whitespace-nowrap"
            >
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </td>
          ))}
          {hasRowActions && (
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
