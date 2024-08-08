import hangman0 from "../images/hangman0.svg";
import hangman1 from "../images/hangman1.svg";
import hangman2 from "../images/hangman2.svg";
import hangman3 from "../images/hangman3.svg";
import hangman4 from "../images/hangman4.svg";
import hangman5 from "../images/hangman5.svg";
import hangman6 from "../images/hangman6.svg";

type HangmanDrawingProps = {
  numOfIncorrectGuesses: number;
};

const images = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];

const HangmanDrawing = ({ numOfIncorrectGuesses }: HangmanDrawingProps) => {
  const imageSrc = images[numOfIncorrectGuesses];

  return (
    <div className="flex flex-col items-center relative h-[500px] ml-10">
      <img
        src={imageSrc}
        alt={`Hangman stage ${numOfIncorrectGuesses}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default HangmanDrawing;
