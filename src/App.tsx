import words from "./wordList.json";

import { useCallback, useEffect, useState } from "react";

import "../global.css";

import Homepage from "./Homepage";
import Game from "./Game";

function App() {
  const [homePage, setHomePage] = useState(true);

  if (homePage) {
    return <Homepage setHomePage={setHomePage} />;
  } else {
    return <Game />;
  }
}

export default App;
