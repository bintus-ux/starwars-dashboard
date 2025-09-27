interface TextProps {
  children: React.ReactNode;
  variant?: "title" | "subtitle" | "body" | "caption";
  className?: string;
}

export default function Text({
  children,
  variant = "body",
  className = "",
}: TextProps) {
  const baseClasses = {
    title: "text-2xl font-bold",
    subtitle: "text-lg font-semibold",
    body: "text-base",
    caption: "text-sm text-gray-600",
  };

  return (
    <span className={`${baseClasses[variant]} ${className}`}>{children}</span>
  );
}
