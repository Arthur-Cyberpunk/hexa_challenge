import { useEffect, useState } from "react";

const LocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue;
  });

  useEffect(() => {
    if (value > 0) {
      localStorage.setItem("high_score", `${value}`);
    }
  }, [value]);

  return [value, setValue];
};

export default LocalStorage;
