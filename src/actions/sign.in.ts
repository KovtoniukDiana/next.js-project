import { signIn } from "next-auth/react";

export async function SignInWithCredentials(email: string, password: string) {

    try {

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
            });
        
        return result;


    }catch (error) {

        console.log('Error during sign-in:', error);
        throw error;
    }
}