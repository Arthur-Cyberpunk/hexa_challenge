import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const ScoreLocalStorage = (key, initialValue) => {
  const { setColors } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue;
  });

  useEffect(() => {
    if (value > 0) {
      localStorage.setItem("high_score", `${value}`);
    }
  }, [value]);

  const clearLocalStorage = () => {
    setColors([]);
    localStorage.clear();
    setValue(initialValue);
  };

  return [value, setValue, clearLocalStorage];
};

export default ScoreLocalStorage;
