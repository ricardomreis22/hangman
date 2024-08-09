import React, { ReactNode } from "react";

type IconButtonProps = {
  icon?: ReactNode;
  handleClick?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  handleClick,
  className,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`button font-bold rounded-full text-7xl ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
