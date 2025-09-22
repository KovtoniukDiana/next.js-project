import { create } from 'zustand'; 
import { IIngredient } from '@/types/ingredient';
import { getIngredient, createIngredient, deleteIngredient } from '@/actions/ingredient';

interface IngredientState {
    ingredients: IIngredient[];
    isLoading: boolean;
    error: string | null;
    loadIngredients: () => Promise<void>;
    addIngredients: (formData: FormData) => Promise<void>;
    removedIngredients: (id: string) => Promise<void>;

}

export const useIngredientStore = create<IngredientState>((set) => ({
    ingredients: [],
    isLoading: false, 
    error: null,
    loadIngredients: async() => {
        try {
            const result = await getIngredient();

            if(result.success) {
                set({ingredients: result.ingredients, isLoading: false})
            } else {
                set({ error: result.error, isLoading: false })
            }
            
        } catch (error) {
            set({ error: "Помилка під час запуску", isLoading: false })
        }
    },

    addIngredients: async (formData: FormData) => {
        set({ isLoading: true, error: null })

        try {

            const result = await createIngredient(formData);

                if(result.success) {
                    set((state) => ({
                        ingredients: [...state.ingredients, result.ingredient],
                        isLoading: false
                    }))
                } else {
                    set({error: result.error, isLoading: false})
                }

        } catch (error) {
            set({ error: "Помилка при додаванні", isLoading: false })
        }
    },

    removedIngredients: async(id: string) => {

        set({isLoading: true, error: null});

        try {
            const result = await deleteIngredient(id);

            if(result.success) {
                set((state) => ({
                    ingredients: state.ingredients.filter(
                        (ingredient) => ingredient.id !== id
                    ),
                    isLoading: false
                }))
            } else {
                 set({ error: "Помилка при видаленні", isLoading: false })
            }       
        } catch (error) {
            set({ error: "Помилка при видаленні", isLoading: false })
        }
    }
}))