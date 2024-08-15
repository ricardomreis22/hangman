import words from "./wordList.json";

import React from "react";
import { useCallback, useEffect, useState } from "react";

import "../global.css";

import { FcIdea } from "react-icons/fc";
import { CiSettings } from "react-icons/ci";

import SettingsModal from "./components/SettingsModal";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import IconButton from "./components/IconButton";

type HomepageProps = {
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
};

const Game: React.FC<HomepageProps> = ({ setHomePage }) => {
  function getWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Track the word to guess
  const [wordToGuess, setWordToGuess] = useState(getWord());

  // Track which letter we did guess
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const [lettersRemoved, setLettersRemoved] = useState<string[]>([]);

  const [isModalOpen, setisModalOpen] = useState<boolean>(false);

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

  function openModal() {
    setisModalOpen((prev) => !prev);
  }

  return (
    <div className="flex flex-col items-center w-[90%] m-auto h-screen">
      <div className="header flew-full justify-between text-sm text-center m-2">
        {!isWinner && !isLoser && "Hangman"}
        {isWinner && "Winner"}
        {isLoser && "Nice try!"}
      </div>
      <div className="fixed flex items-center justify-center h-screen">
        {isModalOpen ?? (
          <SettingsModal
            handleClick={openModal}
            newGame={newGame}
            setHomePage={setHomePage}
          />
        )}
      </div>

      <div className="flex justify-around h-[80%] w-full">
        <div className="left max-w-[800px] flex flex-col gap-2 my-0 items-center justify-end h-full">
          <HangmanWord
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
            reveal={isLoser}
          />
          <div className="mt-40">
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
        <div className="middle flex flex-col h-full justify-end">
          <HangmanDrawing numOfIncorrectGuesses={incorrectLetters.length} />
        </div>
        <div className=" right flex flex-col justify-between h-full">
          <IconButton handleClick={openModal} icon={<CiSettings />} />
          <IconButton
            icon={<FcIdea />}
            handleClick={isWinner || isLoser ? undefined : getALetter}
            className={
              isWinner || isLoser ? "cursor-not-allowed" : "cursor-pointer"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
