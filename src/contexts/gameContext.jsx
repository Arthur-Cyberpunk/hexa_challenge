import { createContext, useState } from "react";

export const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [active, setActive] = useState(false);
  const [secondsChoose, setSecondsChoose] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [chooseDifficult, setChooseDifficult] = useState('');

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
        setChooseDifficult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
