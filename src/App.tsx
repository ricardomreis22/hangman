import { useState } from "react";

// Create a context with a default value (optional)

import "../global.css";

import Homepage from "./Homepage";
import Game from "./Game";

function App() {
  const [homePage, setHomePage] = useState(true);

  if (homePage) {
    return <Homepage setHomePage={setHomePage} />;
  } else {
    return <Game setHomePage={setHomePage} />;
  }
}

export default App;
