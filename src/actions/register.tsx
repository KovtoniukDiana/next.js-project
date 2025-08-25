'use server';

import { IFormData } from "@/types/form-data";
import prisma  from "@/utils/prisma";
import { saltAndHashPassword } from "@/utils/password";


export async function registerUser(formData: IFormData) {
    const { email, password, confirmPassword } = formData;


    if(password !== confirmPassword ) {
        return {error: 'Passwords do not match'};
    }
    if(password.length < 6 ) {
        return {error: 'Passwords has to have at least 6 characters'};
    }

    try {

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return {error: 'User with this email already exists'};
        }

        const pwHash = await saltAndHashPassword(password);

        const user = await prisma.user.create({
            data: {
                email: email,
                password: pwHash
            }
        })

        console.log('User created:', user);
        return user;

        
    } catch (error) {

        console.log('Error creating user:', error);
        return (() => { throw new Error('Error creating user') })(); 

    }

    

}