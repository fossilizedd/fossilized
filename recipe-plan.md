# Recipe Feature Plan

## Goal

Add a Recipes section to Fossilized — a personal collection of known recipes, browsable by cuisine and role (main / side), with links and technique tags.

---

## 1. Data Structure

File: `src/server/data/recipes.json`
Types: `src/server/types/recipe.ts`

```ts
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
  id: string;                         // kebab-case slug, e.g. "miso-glazed-salmon"
  name: string;
  cuisine: RecipeCuisine;
  role: RecipeRole;
  techniques: CookingTechnique[];     // one or more, ordered by prominence
  links: string[];                    // zero or more URLs (video, blog post, etc.)
  notes?: string;                     // optional freeform notes
}
```

Enums are string unions (not TypeScript `enum`) to keep JSON readable and extensible.

---

## 2. Initial Seed Data

Source: the `orrI1Vqt - cooking.json` file the user provided.

Parsing steps:
1. Read each entry from the JSON.
2. Map it to the `Recipe` shape using the recipe-input guide (section 5).
3. Save to `src/server/data/recipes.json`.

---

## 3. Server Lib

File: `src/server/lib/recipes.ts`

```ts
import recipesJson from "../data/recipes.json";
import type { Recipe } from "../types/recipe";

const recipes: Recipe[] = recipesJson as Recipe[];

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipesByCuisine(cuisine: string): Recipe[] {
  return recipes.filter((r) => r.cuisine === cuisine);
}

export function getRecipesByRole(role: string): Recipe[] {
  return recipes.filter((r) => r.role === role || r.role === "both");
}
```

---

## 4. Page and Route

```
src/app/recipes/page.tsx        ← server component, passes data down
src/client/components/RecipesView.tsx   ← client component, filter + display
src/client/components/recipes/RecipeCard.tsx
```

---

## 5. UX Design

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  RECIPES                                [filter bar]    │
├─────────────────────────────────────────────────────────┤
│  [Cuisine chips: All · American · Chinese · Italian …]  │
│  [Role chips:    All · Main · Side]                     │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Card         │  │ Card         │  │ Card         │  │
│  │ Name         │  │               │  │               │  │
│  │ cuisine · role│  │               │  │               │  │
│  │ [technique]  │  │               │  │               │  │
│  │ [technique]  │  │               │  │               │  │
│  │ [↗ Link]     │  │               │  │               │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Filter bar behavior

- Cuisine and Role filters are independent; both apply at once (AND logic).
- Active chip uses `bg-sky-mid text-white`; inactive uses the existing mist ghost style.
- Default: all chips at "All" — shows the full collection.
- Filter state lives in component state (not URL) since the collection is personal and small.

### RecipeCard

- Title (16px semibold).
- Cuisine + role on one line, subdued (12px, mist/50).
- Technique pills — small rounded chips, same style as the AlmanacCard category badge, using `jade` accent.
- Links section at the bottom: each link renders as a compact `↗ source` anchor that opens in a new tab. If the URL is a YouTube/video URL render as "↗ video"; otherwise "↗ recipe".
- Notes (if present) rendered as a single italic line below techniques.
- No hover-expand modal needed — cards are the terminal interaction unit.

### Responsive grid

```
≥1024px  → 3 columns
768–1023 → 2 columns
<768     → 1 column
```

Use `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`.

### Empty state

When filters produce zero results: centered message "No recipes match — try adjusting the filters." with a reset button.

---

## 6. Navigation

Add "Recipes" to `NavBar.tsx`:

```ts
{ href: "/recipes", label: "Recipes" },
```

Inserted after "Calendar" in the link array.

---

## 7. File Checklist

| File | Action |
|---|---|
| `src/server/types/recipe.ts` | Create — types |
| `src/server/data/recipes.json` | Create — seed data from input |
| `src/server/lib/recipes.ts` | Create — data accessors |
| `src/app/recipes/page.tsx` | Create — server component |
| `src/client/components/RecipesView.tsx` | Create — filter state + grid |
| `src/client/components/recipes/RecipeCard.tsx` | Create — card display |
| `src/client/components/NavBar.tsx` | Edit — add Recipes tab |

---

## 8. Recipe Input Guide

See `recipe-input-guide.md` (created alongside this plan). It describes how to convert a recipe you know into the data structure, and includes prompts to fill in any missing fields.

---

## Sequence

1. Parse seed data → `recipes.json` (requires reading `orrI1Vqt - cooking.json`)
2. Create types + lib
3. Build `RecipeCard` and `RecipesView` with filter chips
4. Wire up `src/app/recipes/page.tsx`
5. Add NavBar tab
6. Smoke-test in browser; verify filter combinations and empty state
