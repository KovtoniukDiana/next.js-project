"use server";

import prisma from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/password";

export async function registerUser(data: { email: string; password: string }) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { error: "Користувач з таким email вже існує" };
    }

    const hashedPassword = await saltAndHashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    return { success: true, user };
  } catch (err) {
    console.error("Помилка при реєстрації:", err);
    return { error: "Не вдалося створити користувача" };
  }
}
