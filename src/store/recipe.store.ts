import z from "zod"
import { create } from "zustand"
import { IRecipe } from "@/types/recipe"
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "@/actions/recipe"
import { get } from "http";

interface IActionResult {
    success: boolean;
    recipe?: IRecipe;
    error?: string;
}

interface IRecipeState {
    recipes: IRecipe[];
    isLoading: boolean;
    error: string | null;
    loadRecipes: () => Promise<void>;
    addRecipe: (formData: FormData) => Promise<IActionResult>;
    updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
    removeRecipe: (id: string) => Promise<void>;
}
// <> типізація для валідації даних рецепту


export const useRecipeStore = create<IRecipeState>((set) => ({

    recipes: [],
    isLoading: false,
    error: null,
    loadRecipes: async () => {
        set({ isLoading: true, error: null });

        try {

            const result = await getRecipes();

            if(result.success) {
                set({ recipes: result.recipes, isLoading: false });
            } else {
                set({ error: result.error, isLoading: false });
            }
            
        } catch (error) {
            console.error("Failed to load recipes:", error);
            set({ error: "Failed to load recipes", isLoading: false });
        }
    },
    addRecipe: async (formData: FormData) => {
        set({error: null});
        try {
            const result = await createRecipe(formData);
            if(result.success) {
                set((state) => ({
                    recipes: [...state.recipes, result.recipe!],
                    isLoading: false
                }))

                return {success: true, recipe: result.recipe!};

            } else {
                set({error: result.error, isLoading: false});
                return {success: false, error: result.error};
            }
            
        } catch (error) {
            console.error("Failed to add recipes:", error);
            set({ error: "Failed to add recipes", isLoading: false });
            return { success: false, error: "Failed to add recipe" };
        }
    },

    updateRecipe: async (id: string, formData: FormData) => {
        set({error: null});

        try {

            const result = await updateRecipe(id, formData);
            if(result.success) {
                set((state) => ({
                    recipes: state.recipes.map(r => r.id === id ? result.recipe! : r),
                    isLoading: false
                }));
                return {success: true, recipe: result.recipe!};
            }else {
                set({error: result.error, isLoading: false});
                return {success: false, error: result.error};
            }
            
        } catch (error) {
            console.error("Failed to update recipes:", error);
            set({ error: "Failed to update recipes", isLoading: false });
            return { success: false, error: "Failed to update recipe" };
        }
    },

    removeRecipe: async (id: string) => {

        set({error: null});

        try {
            const result = await deleteRecipe(id);
            if(result.success) {
                set((state) => ({
                    recipes: state.recipes.filter(r => r.id !== id),
                    isLoading: false
                }))
            }else {
                set({error: result.error, isLoading: false});
            }
            
        } catch (error) {
            console.error("Error:", error);
            set({ error: "Error", isLoading: false });
        }
    }

    
}))
    