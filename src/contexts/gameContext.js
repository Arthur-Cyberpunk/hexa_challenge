import { createContext, useState } from "react";

export const GameContext = createContext({});

const GameProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [active, setActive] = useState(false);
  const [secondsChoose, setSecondsChoose] = useState(0);

  const colorTime = (selectedColor, currentColor) => {
    if (selectedColor !== undefined) {
      const novarCor = { selectedColor, secondsChoose };
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
        secondsChoose,
        setSecondsChoose,
        setColors,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
