import React from "react";

import IconButton from "./IconButton";

import { FaHome } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  handleClick: () => void;
  newGame: () => void;
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal: React.FC<ModalProps> = ({
  handleClick,
  newGame,
  setHomePage,
}) => {
  // Styles for the modal (basic inline styling for simplicity)

  function restartWord() {
    handleClick();
    newGame();
  }

  return (
    <div className="fixed flex flex-col items-center justify-around z-50 w-[40%] h-[80%] overflow-auto bg-gray-500">
      <IconButton
        handleClick={handleClick}
        className="z-10 absolute top-0 right-0"
        icon={<IoMdClose />}
      />
      <h1 className="text-6xl">Options</h1>
      <div className="flex w-full gap-32 justify-center">
        <IconButton
          handleClick={setHomePage}
          className="z-10"
          icon={<FaHome />}
        />
        <IconButton
          handleClick={restartWord}
          className="z-10"
          icon={<VscDebugRestart />}
        />
      </div>
    </div>
  );
};

export default SettingsModal;
