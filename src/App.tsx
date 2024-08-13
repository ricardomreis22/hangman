import { useState } from "react";

// Create a context with a default value (optional)

import "../global.css";

import Homepage from "./Homepage";
import Game from "./Game";

function App() {
  const [homePage, setHomePage] = useState(true);

  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  if (homePage) {
    return (
      <Homepage
        setisModalOpen={setisModalOpen}
        setHomePage={setHomePage}
        isModalOpen={isModalOpen}
      />
    );
  } else {
    return (
      <Game
        isModalOpen={isModalOpen}
        setisModalOpen={setisModalOpen}
        setHomePage={setHomePage}
      />
    );
  }
}

export default App;
