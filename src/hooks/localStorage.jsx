import { useEffect, useState } from "react";

const LocalStorage = (key, initialValue) => {
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
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setValue, clearLocalStorage];
};

export default LocalStorage;
