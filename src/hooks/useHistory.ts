import { useLocalStorage } from "./useLocalStorage";
import type { HistoryItem } from "../types";

const MAX_HISTORY = 20;

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "ruletazo-history",
    []
  );

  const addResult = (option: string, rouletteId?: string,
    rouletteName?: string) => {
    const newResult: HistoryItem = {
      id: crypto.randomUUID(),
      option,
      date: new Date().toISOString(),
      rouletteId,
      rouletteName,
    };

    setHistory((currentHistory) => [
      newResult,
      ...currentHistory,
    ].slice(0, MAX_HISTORY));
  };

  const clearHistory = (
  rouletteId?: string,
  legacyRouletteId?: string
) => {
  if (!rouletteId) {
    setHistory([]);
    return;
  }

  setHistory((currentHistory) =>
    currentHistory.filter(
      (item) =>
        item.rouletteId !== rouletteId &&
        !(
          !item.rouletteId &&
          rouletteId === legacyRouletteId
        )
    )
  );
};

  return {
    history,
    addResult,
    clearHistory,
  };
}