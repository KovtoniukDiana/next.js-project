'use server'
import prisma from "@/utils/prisma";


export async function getRecipes() {

    try {
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });

        return { success: true, recipes }
        
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return { success: false, error: "Failed to fetch recipes" };
        
    }
}

export async function createRecipe(formdata: FormData) {

    try {

        const name = formdata.get("name") as string;
        const description = formdata.get("description") as string;
        const imageURL = formdata.get("imageURL") as string || null;

        //ми не можемо просто взяти з формдати інгредієнти

        const ingredients = Array.from(formdata.entries())
        .filter(([key]) => key.startsWith("ingredient_"))
        .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: formdata.get(`quantity_${key.split("_")[1]}`) as string
        })); 
        //за допомогою ентріс ми отримуємо ітератор, який містить всі пари ключ-значення з об'єкта FormData.
        //за допомогою Array.from ми перетворюємо цей ітератор в масив 


        if(!name || ingredients.length === 0) {
            return { success: false, error: "Name and at least one ingredient are required" };
        }

        const recipe = await prisma.recipe.create({
            data: {
                name, 
                description,
                imageUrl: imageURL,
                ingredients: {
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        ingredient: { connect: { id: ingredientId } },
                        quantity:  parseFloat(quantity)
                    }))
                }
            },

            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        })

        return { success: true, recipe };

    } catch (error) {
        console.error("Error creating recipe:", error);
        return { success: false, error: "Failed to create recipe" };
    }
}


export async function updateRecipe(id: string, formdata: FormData) {
    try {

        const name = formdata.get("name") as string;
        const description = formdata.get("description") as string;
        const imageURL = formdata.get("imageURL") as string || null;

        const ingredients = Array.from(formdata.entries())
        .filter(([key]) => key.startsWith("ingredient_"))
        .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: formdata.get(`quantity_${key.split("_")[1]}`) as string
        })); 

        if(!name || ingredients.length === 0) {
            return { success: false, error: "Name and at least one ingredient are required" };
        } 

        const recipe = await prisma.recipe.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl: imageURL,
                ingredients: {
                    deleteMany: {}, //видаляємо всі існуючі інгредієнти
                    create: ingredients.map(({ ingredientId, quantity }) => ({
                        ingredient: { connect: { id: ingredientId } },
                        quantity: parseFloat(quantity)
                    }))
                }
            },

            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        })

        return{ success: true, recipe };
        
    } catch (error) {
        console.error("Error updating recipe:", error);
        return { success: false, error: "Failed to update recipe" };
    }
}

export async function deleteRecipe(id: string) {
    try {
        await prisma.recipeIngredient.deleteMany({
            where: { recipeId: id }
        })

        await prisma.recipe.deleteMany({
            where: { id }
        })

        return { success: true };
        
    } catch (error) {
        console.error("Error deleting recipe:", error);
        return { success: false, error: "Failed to delete recipe" };
    }
}