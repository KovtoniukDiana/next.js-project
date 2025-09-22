'use server'
import { ingredientSchema } from "@/schema/zod"
import prisma from "@/utils/prisma"
import { success, ZodError } from "zod";

export async function createIngredient( formData: FormData) {
    try {
        const data = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            unit: formData.get("unit") as string,
            pricePerUnit: formData.get("pricePerUnit") ? parseFloat(formData.get("pricePerUnit")  as string) : null,
            description: formData.get("description") as string

        }

        const validated = ingredientSchema.parse(data);

        await prisma.ingredient.create({
            data: {
                name: validated.name,
                category: validated.category,
                unit: validated.unit,
                pricePerUnit: validated.pricePerUnit,
                description: validated.description
            }
        })

        return {success:true}

    } catch (error) {
        if(error instanceof ZodError) {

            return { error: error.issues.map((e) => e.message).join(', ') }
        }
        
    }
}


export async function getIngredient() {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return { success: true, ingredients }
        
    } catch (error) {
        console.error("Помилка під час отримання інгредієнтів", error);
        return { error: "Помилка під час отримання інгредієнтів"}
    }
}

export async function deleteIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: {id} 
        });

        return { success: true, ingredient }
          
    } catch (error) {
        console.error("Помилка під час видалення інгредієнта", error);
        return { error: "Помилка під час видалення інгредієнта"}
    }
}