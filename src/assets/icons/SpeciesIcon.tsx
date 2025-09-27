import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const SpeciesIcon: React.FC<IconProps> = ({
  size = 18,
  color = "currentColor",
  className,
}) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="17" height="16" rx="5" fill="#A9C1FF" />
  </svg>
);

export default SpeciesIcon;
