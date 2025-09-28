import { SummaryCardProps } from "../../../types/types";

export default function SummaryCard({
  title,
  count,
  change,
  onClick,
}: SummaryCardProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{count.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change} More than this yesterday
        </span>
      </div>
    </div>
  );
}
