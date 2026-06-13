import recipesJson from "../data/recipes.json";
import type { Recipe, RecipeCuisine } from "../types/recipe";

const recipes: Recipe[] = recipesJson as Recipe[];

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getUniqueCuisines(): RecipeCuisine[] {
  const seen = new Set<RecipeCuisine>();
  for (const r of recipes) seen.add(r.cuisine);
  return Array.from(seen).sort();
}
