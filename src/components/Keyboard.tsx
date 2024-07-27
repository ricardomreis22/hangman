import styles from "../global.css";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  activeLetter: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
  disabled?: boolean;
};

const Keyboard = ({
  activeLetter,
  inactiveLetters,
  disabled = false,
  addGuessedLetter,
}: KeyboardProps) => {
  return (
    <div className="keyboard-container">
      {KEYS.map((key) => {
        const isActive = activeLetter.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`btn ${isActive ? "active" : ""} ${
              isInactive ? "inactive" : ""
            }`}
            key={key}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
