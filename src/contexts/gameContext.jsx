import { createContext, useState } from "react";

export const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [active, setActive] = useState(false);
  const [secondsChoose, setSecondsChoose] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(4);

  const colorTime = (selectedColor, currentColor) => {
    if (selectedColor !== undefined && selectedColor === currentColor) {
      const novarCor = {
        selectedColor,
        secondsChoose,
      };
      setColors((prevDados) => [novarCor, ...prevDados]);
    } else if (selectedColor !== undefined && selectedColor !== currentColor) {
      const novarCor = {
        selectedColor,
        currentColor,
        secondsChoose,
      };
      setColors((prevDados) => [novarCor, ...prevDados]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        colorTime,
        colors,
        active,
        setActive,
        setSecondsChoose,
        setColors,
        secondsLeft,
        setSecondsLeft,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
