export interface Roulette {
  id: string;
  name: string;
  options: string[];
}

export interface HistoryItem {
  id: string;
  option: string;
  date: string;
  rouletteId?: string;
  rouletteName?: string;
}