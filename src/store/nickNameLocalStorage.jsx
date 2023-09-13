import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const ScoreLocalStorage = (key) => {
  const { secondsLeft } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue;
  });

  useEffect(() => {
    if (secondsLeft === 0 && value !== null) {
      localStorage.setItem("nick_name", `${value}`);

    }
  }, [secondsLeft, value]);

  return [value, setValue];
};

export default ScoreLocalStorage;
