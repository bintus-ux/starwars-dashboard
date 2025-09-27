import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const DashboardIcon: React.FC<IconProps> = ({
  size = 18,
  color = "currentColor",
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 0H7.2V7.2H0V0ZM0 10.8H7.2V18H0V10.8ZM10.8 0H18V7.2H10.8V0ZM10.8 10.8H18V18H10.8V10.8Z"
      fill={color}
    />
  </svg>
);

export default DashboardIcon;
