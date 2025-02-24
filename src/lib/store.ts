import { create } from "zustand";
import {User} from "@/types/types";


interface AuthState {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken || null,

        login: (user, token) => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            set({ user, token });
        },

        logout: () => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            set({ user: null, token: null });
        },
    };
});
