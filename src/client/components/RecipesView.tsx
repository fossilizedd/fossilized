"use client";

import { useState } from "react";
import type { Recipe, RecipeCuisine, RecipeRole } from "@/server/types/recipe";
import { RecipeCard } from "./recipes/RecipeCard";

const CUISINE_LABEL: Record<RecipeCuisine, string> = {
  american:      "American",
  chinese:       "Chinese",
  japanese:      "Japanese",
  italian:       "Italian",
  mexican:       "Mexican",
  french:        "French",
  thai:          "Thai",
  indian:        "Indian",
  mediterranean: "Mediterranean",
  korean:        "Korean",
  other:         "Other",
};

const ROLE_LABEL: Record<RecipeRole, string> = {
  main: "Main",
  side: "Side",
  both: "Both",
};

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide transition-all border ${
        active
          ? "bg-sky-mid text-white border-sky-mid shadow-sm"
          : "bg-white/40 text-mist/50 border-mist/15 hover:text-mist/75 hover:border-mist/30"
      }`}
    >
      {label}
    </button>
  );
}

export function RecipesView({
  recipes,
  cuisines,
}: {
  recipes: Recipe[];
  cuisines: RecipeCuisine[];
}) {
  const [activeCuisine, setActiveCuisine] = useState<RecipeCuisine | null>(null);
  const [activeRole, setActiveRole] = useState<RecipeRole | null>(null);

  const filtered = recipes.filter((r) => {
    if (activeCuisine && r.cuisine !== activeCuisine) return false;
    if (activeRole) {
      if (activeRole === "main" && r.role !== "main" && r.role !== "both") return false;
      if (activeRole === "side" && r.role !== "side" && r.role !== "both") return false;
      if (activeRole === "both" && r.role !== "both") return false;
    }
    return true;
  });

  const roles: RecipeRole[] = ["main", "side", "both"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-mist/35 mr-1 w-14">Cuisine</span>
          <Chip label="All" active={activeCuisine === null} onClick={() => setActiveCuisine(null)} />
          {cuisines.map((c) => (
            <Chip
              key={c}
              label={CUISINE_LABEL[c]}
              active={activeCuisine === c}
              onClick={() => setActiveCuisine(activeCuisine === c ? null : c)}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-mist/35 mr-1 w-14">Role</span>
          <Chip label="All" active={activeRole === null} onClick={() => setActiveRole(null)} />
          {roles.map((r) => (
            <Chip
              key={r}
              label={ROLE_LABEL[r]}
              active={activeRole === r}
              onClick={() => setActiveRole(activeRole === r ? null : r)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-mist/40">
          <span className="text-sm">No recipes match — try adjusting the filters.</span>
          <button
            onClick={() => { setActiveCuisine(null); setActiveRole(null); }}
            className="text-[11px] font-semibold text-ocean hover:text-ocean/70 transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      <p className="mt-8 text-[10px] text-mist/30 text-right">
        {filtered.length} of {recipes.length} recipes
      </p>
    </div>
  );
}
