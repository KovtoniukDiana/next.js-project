'use client';
import RecipeCard from "@/components/common/recipe.card";
import { useRecipeStore } from "@/store/recipe.store";
import { Button } from "@heroui/react";
import Link from "next/link";


export default function Home() {

  const { isLoading, recipes, error} = useRecipeStore();

  return (
    <>
      <div className="flex w-full justify-center mb-4 items-center">
        <Link href="/recipes/new">
          <Button color="primary">
            Додати рецепт
          </Button>
        </Link>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {isLoading && <p>Завантаження...</p> }

      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
