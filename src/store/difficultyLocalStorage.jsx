import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const DifficultyLocalStorage = (key) => {
  const { difficultyStorage, chooseDifficulty, meuDado } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    console.log(storedValue)

    return storedValue;
  });

  useEffect(() => {
    if (difficultyStorage !== '') {
      localStorage.setItem("difficulty", `${value}`);

      console.log(value)
      
    }
  }, [chooseDifficulty, difficultyStorage, value]);

  return [value, setValue];
  
};

export default DifficultyLocalStorage;
