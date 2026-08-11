import { useLocalStorage } from "./useLocalStorage";
import type { HistoryItem } from "../types";

const MAX_HISTORY = 20;

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "ruletazo-history",
    []
  );

  const addResult = (option: string) => {
    const newResult: HistoryItem = {
      id: crypto.randomUUID(),
      option,
      date: new Date().toISOString(),
    };

    setHistory((currentHistory) => [
      newResult,
      ...currentHistory,
    ].slice(0, MAX_HISTORY));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addResult,
    clearHistory,
  };
}