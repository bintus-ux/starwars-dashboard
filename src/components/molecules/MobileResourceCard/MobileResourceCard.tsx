interface MobileResourceCardProps {
  item: any;
  onClick: () => void;
  fields: {
    label: string;
    value: string | ((item: any) => string);
  }[];
  titleField: string;
}

export default function MobileResourceCard({
  item,
  onClick,
  fields,
  titleField,
}: MobileResourceCardProps) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg text-gray-900 mb-3">
        {item[titleField]}
      </h3>

      <div className="space-y-2 text-sm text-gray-600">
        {fields.map((field, index) => (
          <div key={index} className="flex justify-between">
            <span className="font-medium">{field.label}:</span>
            <span className="text-right">
              {typeof field.value === "function"
                ? field.value(item)
                : item[field.value]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
