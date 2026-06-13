import { AlmanacHeader } from "@/client/components/AlmanacHeader";
import { RecipesView } from "@/client/components/RecipesView";
import { getAllRecipes, getUniqueCuisines } from "@/server/lib/recipes";

export default function RecipesPage() {
  return (
    <>
      <AlmanacHeader />
      <RecipesView recipes={getAllRecipes()} cuisines={getUniqueCuisines()} />
    </>
  );
}
