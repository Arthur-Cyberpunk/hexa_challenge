import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const DifficultyLocalStorage = (key) => {
  const { difficultyStorage, chooseDifficulty } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue;
  });

  useEffect(() => {
    if (difficultyStorage !== "") {
      localStorage.setItem("difficulty", `${value}`);
    }
  }, [chooseDifficulty, difficultyStorage, value]);

  return [value, setValue];
};

export default DifficultyLocalStorage;
