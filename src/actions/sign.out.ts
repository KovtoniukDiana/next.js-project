
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/auth.store";

export async function SignOutFunc() {

  try {
    await signOut({ redirect: false });
    useAuthStore.getState().setAuthState("unauthenticated", null);
    
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
}