import React from "react";
import IconButton from "./IconButton";
import { IoMdClose } from "react-icons/io";

interface OptionsProps {
  handleClick: () => void;
}
const Options: React.FC<OptionsProps> = ({ handleClick }) => {
  return (
    <div className="fixed flex flex-col items-center justify-around z-50 w-[40%] h-[80%] overflow-auto bg-gray-500">
      <IconButton
        handleClick={handleClick}
        className="z-10 absolute top-0 right-0"
        icon={<IoMdClose />}
      />
      <h1 className="text-6xl">Options</h1>
      <div className="flex w-full gap-32 justify-center"></div>
    </div>
  );
};

export default Options;
