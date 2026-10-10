
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  isValid?: (value: unknown) => value is T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);

      if (storedValue === null) {
        return initialValue;
      }

      const parsed: unknown = JSON.parse(storedValue);

      if (isValid && !isValid(parsed)) {
        return initialValue;
      }

      return parsed as T;
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