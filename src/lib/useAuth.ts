import { useAuthStore } from "./store";
import { login as apiLogin } from "./auth";

export const useAuth = () => {
    const { user, token, login, logout } = useAuthStore();

    const signIn = async (email: string, password: string) => {
        try {
            const userData = await apiLogin(email, password);
            login(userData);
            return true;
        } catch (error) {
            console.error("Ошибка входа:", error);
            return false;
        }
    };

    return { user, token, signIn, logout };
};
