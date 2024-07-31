import words from "./wordList.json";

import { useCallback, useEffect, useState } from "react";

import "../global.css";

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
    <div className="max-w-[800px] flex flex-col gap-2 my-0 mx-auto items-center">
      <div className="text-sm text-center m-2">
        {!isWinner && !isLoser && "Hangman"}
        {isWinner && "Winner"}
        {isLoser && "Nice try!"}
      </div>
      <div>
        {" "}
        <button onClick={newGame}>New game</button>
      </div>
      <div>
        <button
          className="button"
          disabled={isWinner || isLoser}
          onClick={getALetter}
          style={{}}
        >
          A correct letter
        </button>
      </div>

      <HangmanDrawing numOfIncorrectGuesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        reveal={isLoser}
      />
      <div className="flex">
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
  );
}

export default App;
