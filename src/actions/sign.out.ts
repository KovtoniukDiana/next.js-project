
 
export async function SignOutFunc() {

    try {

        const result = await fetch("/api/auth/signOut", {
            method: "POST",
            });
        return result


    }catch (error) {

        console.log('Error during sign-out:', error);
        throw error;
    }
}