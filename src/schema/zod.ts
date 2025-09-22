import { z } from "zod"

export const signInSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string()
    .min(6, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be less than 32 characters" }),
})

export const ingredientSchema = z.object({
  name: z.string().min(1, "Назва обов'язкова"),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "SEASONING",
    "OTHER"

  ]),

  unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILILITERS", "PIECES" ]),

  pricePerUnit: z.coerce.number()
    .min(0, "Ціна має бути додатною")
    .nullable(),

  description: z.string().optional()  

})
