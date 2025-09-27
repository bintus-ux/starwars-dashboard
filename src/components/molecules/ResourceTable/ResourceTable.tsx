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
            <TableRowSkeleton columnCount={columns.length} />
            <TableRowSkeleton columnCount={columns.length} />
            <TableRowSkeleton columnCount={columns.length} />
            <TableRowSkeleton columnCount={columns.length} />
            <TableRowSkeleton columnCount={columns.length} />
            <TableRowSkeleton columnCount={columns.length} />
          </>
        ) : (
          data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onRowClick(item)}
            >
              {renderRow(item, index)}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
