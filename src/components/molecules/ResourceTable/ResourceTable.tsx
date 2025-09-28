import { TableRowSkeleton } from "../../atoms/SkeletonLoader/SkeletonLoader";

interface ResourceTableProps {
  columns: string[];
  data: any[];
  loading: boolean;
  onRowClick: (item: any) => void;
  renderRow: (item: any, index: number) => React.ReactNode;
}

export default function ResourceTable({
  columns,
  data,
  loading,
  onRowClick,
  renderRow,
}: ResourceTableProps) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {/* Add an empty header cell for checkbox column */}
          <th className="w-10 p-4">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#C4C4C4] text-blue-600 focus:ring-blue-500"
            />
          </th>
          {columns.map((column, index) => (
            <th
              key={index}
              className="p-4 text-left text-sm font-medium text-[#A4A7B7]"
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {loading ? (
          <>
            <TableRowSkeleton columnCount={columns.length + 1} />
            <TableRowSkeleton columnCount={columns.length + 1} />
            <TableRowSkeleton columnCount={columns.length + 1} />
            <TableRowSkeleton columnCount={columns.length + 1} />
            <TableRowSkeleton columnCount={columns.length + 1} />
            <TableRowSkeleton columnCount={columns.length + 1} />
          </>
        ) : (
          data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onRowClick(item)}
            >
              {/* Checkbox cell */}
              <td className="p-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#C4C4C4] text-blue-600 focus:ring-blue-500"
                />
              </td>

              {/* Your dynamic row renderer */}
              {renderRow(item, index)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
