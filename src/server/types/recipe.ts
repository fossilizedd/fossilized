export type RecipeCuisine =
  | "american"
  | "chinese"
  | "japanese"
  | "italian"
  | "mexican"
  | "french"
  | "thai"
  | "indian"
  | "mediterranean"
  | "korean"
  | "other";

export type RecipeRole = "main" | "side" | "both";

export type CookingTechnique =
  | "roast"
  | "braise"
  | "saute"
  | "steam"
  | "grill"
  | "fry"
  | "bake"
  | "boil"
  | "simmer"
  | "stir-fry"
  | "poach"
  | "smoke"
  | "raw"
  | "ferment"
  | "pressure-cook";

export interface Recipe {
  id: string;
  name: string;
  cuisine: RecipeCuisine;
  role: RecipeRole;
  techniques: CookingTechnique[];
  links: string[];
  notes?: string;
}
