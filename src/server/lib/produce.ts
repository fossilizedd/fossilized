import produceData from "../data/produce.json";

export type ProduceCategory = "fruit" | "vegetable" | "mushroom";

export interface PickingSeason {
  start: number;
  end: number;
}

export interface ProduceItem {
  id: string;
  name: string;
  category: ProduceCategory;
  months: number[];
  peakMonths: number[];
  pickingSeason?: PickingSeason;
  timing: string;
  description: string;
  asianCuisines: string[];
  asianUses: string[];
  nutritionHighlights: string[];
}

export function getAllProduce(): ProduceItem[] {
  return produceData as ProduceItem[];
}

export function getProduceByMonth(month: number): ProduceItem[] {
  return getAllProduce().filter((item) => item.months.includes(month));
}
