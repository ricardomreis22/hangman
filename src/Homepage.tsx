import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdPlay } from "react-icons/io";

import IconButton from "./components/IconButton";
import SettingsModal from "./components/SettingsModal";

type HomepageProps = {
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
};

const Homepage: React.FC<HomepageProps> = ({
  setHomePage,
  setisModalOpen,
  isModalOpen,
}) => {
  function startGame() {
    setisModalOpen(false);
    setHomePage(false);
  }

  function openModal() {
    setisModalOpen(true);
  }

  return (
    <div className="flex h-screen flex-col justify-around items-center">
      <div className="flex items-center justify-center ">
        <h1 className="text-6xl">HANGMAN</h1>
        <IconButton
          icon={<CiSettings />}
          className="items-end text-6xl ml-20"
          handleClick={() => openModal()}
        />
      </div>
      <IconButton icon={<IoMdPlay />} handleClick={() => startGame()} />
    </div>
  );
};

export default Homepage;
