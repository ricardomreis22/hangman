import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { IoMdPlay } from "react-icons/io";

import IconButton from "./components/IconButton";
import Options from "./components/Options";

type HomepageProps = {
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Homepage: React.FC<HomepageProps> = ({ setHomePage }) => {
  const [options, setOptions] = useState(false);
  function startGame() {
    setHomePage(false);
  }

  function openOptions() {
    console.log(options);
    setOptions((prev) => !prev);
  }

  return (
    <div className="flex h-screen flex-col justify-around items-center">
      {options ?? <Options handleClick={openOptions} />}
      <div className="flex items-center justify-center ">
        <h1 className="text-6xl">HANGMAN</h1>
        <IconButton
          icon={<CiSettings />}
          className="items-end text-6xl ml-20"
          handleClick={openOptions}
        />
      </div>
      <IconButton icon={<IoMdPlay />} handleClick={() => startGame()} />
    </div>
  );
};

export default Homepage;
