import { createContext, useState } from "react";

export const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [active, setActive] = useState(false);
  const [secondsChoose, setSecondsChoose] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [currentColor, setCurrentColor] = useState("");
  const [options, setOptions] = useState([]);
  const [chooseDifficulty, setChooseDifficulty] = useState("");
  const [nickName, setNickName] = useState("");

  const difficulty = localStorage.getItem("difficulty");

  const colorTime = (selectedColor, currentColor) => {
    if (selectedColor !== undefined && selectedColor === currentColor) {
      const newColor = {
        selectedColor,
        secondsChoose,
      };
      setColors((prevDados) => [newColor, ...prevDados]);
    } else if (selectedColor !== undefined && selectedColor !== currentColor) {
      const newColor = {
        selectedColor,
        currentColor,
        secondsChoose,
      };
      setColors((prevDados) => [newColor, ...prevDados]);
    }
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const startGame = () => {
    if (secondsLeft === 0) {
      setColors([]);
      setSecondsLeft(30);
    }

    if (difficulty === "easy" || chooseDifficulty === "easy") {
      const correctColor = generateRandomColor();
      const randomColor1 = generateRandomColor();
      const randomColor2 = generateRandomColor();

      const randomOptions = [correctColor, randomColor1, randomColor2];
      randomOptions.sort(() => Math.random() - 0.5);

      setCurrentColor(correctColor);
      setOptions(randomOptions);
    } else if (difficulty === "medium" || chooseDifficulty === "medium") {
      const correctColor = generateRandomColor();
      const randomColor1 = generateRandomColor();
      const randomColor2 = generateRandomColor();
      const randomColor3 = generateRandomColor();

      const randomOptions = [
        correctColor,
        randomColor1,
        randomColor2,
        randomColor3,
      ];
      randomOptions.sort(() => Math.random() - 0.5);

      setCurrentColor(correctColor);
      setOptions(randomOptions);
    } else if (difficulty === "hard" || chooseDifficulty === "hard") {
      const correctColor = generateRandomColor();
      const randomColor1 = generateRandomColor();
      const randomColor2 = generateRandomColor();
      const randomColor3 = generateRandomColor();
      const randomColor4 = generateRandomColor();

      const randomOptions = [
        correctColor,
        randomColor1,
        randomColor2,
        randomColor3,
        randomColor4,
      ];
      randomOptions.sort(() => Math.random() - 0.5);

      setCurrentColor(correctColor);
      setOptions(randomOptions);
    }

    setActive(true);
  };

  return (
    <GameContext.Provider
      value={{
        colorTime,
        colors,
        setColors,
        active,
        setActive,
        setSecondsChoose,
        secondsLeft,
        setSecondsLeft,
        chooseDifficulty,
        setChooseDifficulty,
        currentColor,
        setCurrentColor,
        options,
        setOptions,
        startGame,
        nickName,
        setNickName,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
