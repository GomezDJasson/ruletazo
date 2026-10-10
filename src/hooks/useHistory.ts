import { useLocalStorage } from "./useLocalStorage";
import type { HistoryItem } from "../types";

const MAX_HISTORY = 20;

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    "ruletazo-history",
    []
  );

  
  const addResult = (
    option: string,
    rouletteId?: string,
    rouletteName?: string,
    legacyRouletteId?: string
  ) => {
    const newResult: HistoryItem = {
      id: crypto.randomUUID(),
      option,
      date: new Date().toISOString(),
      rouletteId,
      rouletteName,
    };

    setHistory((currentHistory) => {
      let rouletteCount = 0;

      return [newResult, ...currentHistory].filter((item) => {
        const belongsToRoulette =
          item.rouletteId === rouletteId ||
          (!item.rouletteId && rouletteId === legacyRouletteId);

        if (!belongsToRoulette) {
          return true;
        }

        rouletteCount += 1;
        return rouletteCount <= MAX_HISTORY;
      });
    });
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