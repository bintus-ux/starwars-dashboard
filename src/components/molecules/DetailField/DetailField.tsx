import Label from "../../atoms/Label/Label";
import Text from "../../atoms/Text/Text";

interface DetailFieldProps {
  label: string;
  value: string;
  className?: string;
}

export default function DetailField({
  label,
  value,
  className = "",
}: DetailFieldProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <Label>{label}</Label>
      <Text variant="body" className="mt-1 block">
        {value}
      </Text>
    </div>
  );
}
