import { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/gameContext";

const HistoricColorLocalStorage = (key) => {
    const { active } = useContext(GameContext);

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    const meuArray = JSON.parse(storedValue)

    return meuArray;
  });

  useEffect(() => {
    if (active) {
      localStorage.setItem("colorAndTime", JSON.stringify(value));
    }
  }, [active, value]);

  console.log(value)

  return [value, setValue];


};

export default HistoricColorLocalStorage;
