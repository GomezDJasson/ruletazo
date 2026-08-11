import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue
        ? JSON.parse(storedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch {
      console.error(
        "No se pudo guardar en LocalStorage"
      );
    }
  }, [key, value]);

  return [value, setValue] as const;
}