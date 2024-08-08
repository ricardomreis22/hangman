import React, { ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  getALetter?: () => void;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  getALetter,
  className,
}) => {
  return (
    <button
      onClick={getALetter}
      className={`button font-bold rounded-full text-7xl ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
