export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const PRODUCE_EMOJI: Record<string, string> = {
  "asparagus": "🌿",
  "rhubarb": "🌿",
  "watercress": "🌿",
  "green-onions": "🧅",
  "spinach": "🥬",
  "radishes": "🥕",
  "garlic-scapes": "🧄",
  "shiso": "🌿",
  "peas": "🌱",
  "bok-choy": "🥬",
  "kohlrabi": "🥦",
  "strawberries": "🍓",
  "cherries-sweet": "🍒",
  "cherries-tart": "🍒",
  "blueberries": "🫐",
  "raspberries": "🍓",
  "plums": "🍑",
  "cantaloupe": "🍈",
  "watermelon": "🍉",
  "peaches": "🍑",
  "zucchini": "🥒",
  "thai-basil": "🌿",
  "cucumbers": "🥒",
  "cherry-tomatoes": "🍅",
  "heirloom-tomatoes": "🍅",
  "roma-tomatoes": "🍅",
  "eggplant": "🍆",
  "sweet-corn": "🌽",
  "green-beans": "🌿",
  "garlic": "🧄",
  "peppers": "🫑",
  "edamame": "🍃",
  "shishito": "🌶️",
  "beets": "🌿",
  "tomatillos": "🫑",
  "fennel": "🌿",
  "napa-cabbage": "🥬",
  "daikon": "🥕",
  "kabocha": "🎃",
  "butternut-squash": "🎃",
  "sweet-potatoes": "🍠",
  "leeks": "🧅",
  "asian-pears": "🍐",
  "european-pears": "🍐",
  "apple-early": "🍏",
  "apple-honeycrisp": "🍎",
  "apple-late": "🍎",
  "grapes": "🍇",
  "mushrooms": "🍄",
  "kale": "🥬",
  "gai-lan": "🥦",
  "yu-choy": "🥬",
  "bitter-melon": "🌿",
  "garlic-chives": "🌿",
  "water-spinach": "🌿",
  "chrysanthemum-greens": "🌸",
  "chinese-mustard-greens": "🥬",
  "luffa": "🥒",
};

export function isFirstMonth(months: number[], month: number): boolean {
  return months[0] === month;
}

export function sortItems<T extends { months: number[] }>(items: T[], month: number): T[] {
  return [...items].sort((a, b) => {
    const aFirst = isFirstMonth(a.months, month) ? 0 : 1;
    const bFirst = isFirstMonth(b.months, month) ? 0 : 1;
    return aFirst - bFirst;
  });
}

export function getSeasonRange(months: number[]): string {
  if (months.length === 0) return "";
  const first = MONTHS[months[0] - 1];
  const last = MONTHS[months[months.length - 1] - 1];
  return first === last ? first : `${first} – ${last}`;
}

export function getCardClasses(category: string, isNew: boolean): string {
  const base =
    "rounded-[10px] p-[1.1rem] bg-[rgba(255,255,255,0.52)] border backdrop-blur transition animate-[card-appear_0.25s_ease_both] cursor-pointer select-none";

  if (isNew) {
    return `${base} border-[rgba(190,140,20,0.45)] shadow-[0_0_0_1px_rgba(190,140,20,0.10),inset_0_0_20px_rgba(190,140,20,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.14),inset_0_0_20px_rgba(190,140,20,0.04)]`;
  }

  const borders: Record<string, string> = {
    fruit:     "border-[rgba(180,100,20,0.38)]  hover:border-[rgba(180,100,20,0.65)]",
    vegetable: "border-[rgba(38,100,60,0.38)]   hover:border-[rgba(38,100,60,0.65)]",
    mushroom:  "border-[rgba(140,80,30,0.38)]   hover:border-[rgba(140,80,30,0.65)]",
    fish:      "border-[rgba(24,88,152,0.38)]   hover:border-[rgba(24,88,152,0.65)]",
  };

  return `${base} hover:shadow-[0_4px_20px_rgba(0,0,0,0.14)] ${borders[category] ?? "border-[rgba(42,80,130,0.3)]"}`;
}
