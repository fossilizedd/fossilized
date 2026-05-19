export enum Month {
  January = 1,
  February = 2,
  March = 3,
  April = 4,
  May = 5,
  June = 6,
  July = 7,
  August = 8,
  September = 9,
  October = 10,
  November = 11,
  December = 12,
}

export enum AlmanacCategory {
  Fish = "fish",
  Fruit = "fruit",
  Vegetable = "vegetable",
  Mushroom = "mushroom",
}

export interface PickingSeason {
  start: Month;
  end: Month;
}

export interface AlmanacItem {
  id: string;
  name: string;
  category: AlmanacCategory;
  months: Month[];
  peakMonths: Month[];
  description: string;
  cookingMethods: string[];
  notes: string[];
  origin: string;
  iceFishing?: boolean;
  pickingSeason?: PickingSeason;
}
