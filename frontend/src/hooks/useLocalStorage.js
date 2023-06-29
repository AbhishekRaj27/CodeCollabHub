import { useState, useEffect } from "react";

const getStoredValue = (key, value) => {
  const storedValue = JSON.parse(localStorage.getItem(key));

  if (storedValue) return storedValue;

  return value;
};

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getStoredValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedValue]);

  return [storedValue, setStoredValue];
}
