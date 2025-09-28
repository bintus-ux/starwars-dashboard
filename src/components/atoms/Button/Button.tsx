import { ButtonProps } from "../../../types/types";

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) {
  const baseClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${baseClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
