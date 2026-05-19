import fishData from "../data/fish.json";

export interface FishItem {
  id: string;
  name: string;
  months: number[];
  peakMonths: number[];
  iceFishing: boolean;
  description: string;
  flavor: string;
  cookingMethods: string[];
  habitat: string;
}

export function getAllFish(): FishItem[] {
  return fishData as FishItem[];
}

export function getFishByMonth(month: number): FishItem[] {
  return getAllFish().filter((item) => item.months.includes(month));
}
