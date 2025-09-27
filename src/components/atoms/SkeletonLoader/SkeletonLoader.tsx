// components/atoms/SkeletonLoader/SkeletonLoader.tsx
export function SummaryCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="w-full">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mt-3"></div>
        </div>
      </div>
      <div className="mt-4">
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}

// Updated TableRowSkeleton to accept columnCount prop
export function TableRowSkeleton({ columnCount }: { columnCount: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columnCount }).map((_, index) => (
        <td key={index} className="p-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
}

export function MobileCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 animate-pulse mb-4">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
      </div>
    </div>
  );
}
