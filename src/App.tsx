import words from "./wordList.json";

import { useCallback, useEffect, useState } from "react";

import "../global.css";

import { FcIdea } from "react-icons/fc";

import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  // Track the word to guess
  const [wordToGuess, setWordToGuess] = useState(getWord());

  // Track which letter we did guess
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [lettersRemoved, setLettersRemoved] = useState<string[]>([]);

  // Which letter we clicked was wrong (not in the word to guess)
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // add the letters into the state guessed letters
  // this function has to useCallback because if not it will run every time the app rerender and start over
  // since we just want this function to run if guessedletters change we have to useCallback
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  // handle the event keypress of letters in keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  // function to give a correct letter to the word
  function getALetter() {
    const notGuessedLetters: string[] = wordToGuess
      .split("")
      .filter((letter) => !guessedLetters.includes(letter));

    const letterGiven =
      notGuessedLetters[Math.floor(Math.random() * notGuessedLetters.length)];

    setGuessedLetters((prev) => [...prev, letterGiven]);
  }

  // function to start a new game

  function newGame() {
    setGuessedLetters([]);
    setWordToGuess(getWord());
  }

  const inactiveLetters = incorrectLetters.concat(lettersRemoved);

  return (
    <div className="flex flex-col items-center">
      {" "}
      <div className="header text-sm text-center m-2">
        {!isWinner && !isLoser && "Hangman"}
        {isWinner && "Winner"}
        {isLoser && "Nice try!"}
        <div className="settings">
          <button onClick={newGame}>New game</button>
        </div>
      </div>
      <div className="flex justify-around w-full">
        <div className="left max-w-[800px] flex flex-col gap-2 my-0 items-center justify-around h-screen">
          <HangmanWord
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
            reveal={isLoser}
          />
          <div className="">
            <Keyboard
              activeLetter={guessedLetters.filter((letter) =>
                wordToGuess.includes(letter)
              )}
              inactiveLetters={inactiveLetters}
              addGuessedLetter={addGuessedLetter}
              disabled={isWinner || isLoser}
            />
          </div>
        </div>
        <div className="middle flex flex-col items-center justify-center">
          <HangmanDrawing numOfIncorrectGuesses={incorrectLetters.length} />
        </div>
        <div className="right flex flex-col justify-center items-center">
          <h1 className="font-bold">Hints</h1>
          <FcIdea
            className={`button shadow-xl mt-5 h-8 w-8 font-bold text-blue-400 cursor-pointer ${
              isWinner || isLoser
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-400 cursor-pointer"
            }`}
            onClick={isWinner || isLoser ? undefined : getALetter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
