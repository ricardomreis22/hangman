import React from "react";
import { CiSettings } from "react-icons/ci";

type HomepageProps = {
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Homepage: React.FC<HomepageProps> = ({ setHomePage }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <h1 className="text-7xl">HANGMAN</h1>
        <CiSettings className="text-7xl" />
      </div>

      <button onClick={() => setHomePage(false)}>Start</button>
    </div>
  );
};

export default Homepage;
