import { useState } from "react";

import { createContext, useContext } from "react";

// Create a context with a default value (optional)
const MyContext = createContext < React.Dispatch<SetStateAction<boolean>>;

import "../global.css";

import Homepage from "./Homepage";
import Game from "./Game";

function App() {
  const [homePage, setHomePage] = useState(true);

  if (homePage) {
    return <Homepage setHomePage={setHomePage} />;
  } else {
    return (
      <>
        <MyContext.Provider value={setHomePage}>
          <Game />
        </MyContext.Provider>
        <Game setHomePage={setHomePage} />
      </>
    );
  }
}

export default App;
