import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const ScoreLocalStorage = (key) => {
  const { secondsLeft } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    const highScore = JSON.parse(storedValue);

    return highScore;
  });

  console.log(value)

  useEffect(() => {
    if (value && secondsLeft === 0) {
      localStorage.setItem("high_score", JSON.stringify(value));
    }
  }, [secondsLeft, value]);

  return [value, setValue];
};

export default ScoreLocalStorage;
