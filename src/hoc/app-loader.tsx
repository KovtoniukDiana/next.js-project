'use client';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useIngredientStore } from "@/store/ingredients.store";
import { useRecipeStore } from "@/store/recipe.store";

interface IPrors {
    children: React.ReactNode;
}

export const AppLoader = ({children} : IPrors) => {
    const { data: session, status } = useSession();

    const { loadIngredients } = useIngredientStore();

    const { isAuth, setAuthState } = useAuthStore();

    const { loadRecipes } = useRecipeStore();
    
    useEffect(() => {
        setAuthState(status, session);
    }, [status, session, setAuthState]);

    useEffect(() => {
        if(isAuth) {
            loadIngredients()
        }
    }, [isAuth, loadIngredients])

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes])

    return <>{children}</>;
}