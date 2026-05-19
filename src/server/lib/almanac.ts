import almanacData from "../data/almanac.json";
import { type AlmanacItem, AlmanacCategory, Month } from "../types/almanac";

export type { AlmanacItem, PickingSeason } from "../types/almanac";
export { AlmanacCategory, Month } from "../types/almanac";

const items = almanacData as AlmanacItem[];

export function getAllItems(): AlmanacItem[] {
  return items;
}

export function getItemsByMonth(month: Month): AlmanacItem[] {
  return items.filter((item) => item.months.includes(month));
}

export function getItemsByCategory(category: AlmanacCategory): AlmanacItem[] {
  return items.filter((item) => item.category === category);
}

export function getItemsByMonthAndCategory(
  month: Month,
  category: AlmanacCategory
): AlmanacItem[] {
  return items.filter(
    (item) => item.months.includes(month) && item.category === category
  );
}
