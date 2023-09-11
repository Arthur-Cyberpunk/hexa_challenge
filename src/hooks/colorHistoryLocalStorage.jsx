import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const ColorHistoryLocalStorage = (key) => {
  const { active, secondsLeft } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    const colorHistory = JSON.parse(storedValue);

    return colorHistory;
  });

  useEffect(() => {
    if (active && secondsLeft === 0) {
      localStorage.setItem("colorAndTime", JSON.stringify(value));
    }
  }, [active, secondsLeft]);

  return [value, setValue];
};

export default ColorHistoryLocalStorage;
