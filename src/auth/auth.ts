import prisma from "@/utils/prisma"
import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/schema/zod"
import { getUserFromDb } from "@/utils/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcryptjs from "bcryptjs"

 
export const { handlers, signIn, signOut, auth } =  NextAuth({
    adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      
      
      credentials: {
        email: { label: "Email", type: "email"},
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            throw new Error("Пошта та пароль є обов'язковими.")
          }

          const { email, password } = await signInSchema.parseAsync(credentials)
 
          const user = await getUserFromDb(email)
 
          if (!user || !user.password) {
            throw new Error("Невірний email або пароль.")
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          )
 
          if (!isPasswordValid) {
            throw new Error("Невірний email або пароль.")
          }


          return { id: user.id, email: user.email }

        } catch (error) {
          if (error instanceof ZodError) {
          
            return null
          }

          return null

        }
      },
    }),
  ],
})