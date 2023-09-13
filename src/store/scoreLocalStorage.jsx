import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const ScoreLocalStorage = (key) => {
  const { secondsLeft } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue;
  });

  useEffect(() => {
    if (value > 0 && secondsLeft === 0) {
      localStorage.setItem("high_score", `${value}`);
    }
  }, [secondsLeft, value]);

  return [value, setValue];
};

export default ScoreLocalStorage;
