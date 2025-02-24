import { useQuery } from "@tanstack/react-query";
import {Recipe, User} from "@/types/types";

const API_URL = "https://dummyjson.com";

export const fetchUsers = async (
    page: number = 1,
    limit: number = 10,
    fetchAll: boolean = false
): Promise<{ users: User[]; total: number }> => {
    try {
        const skip = fetchAll ? 0 : (page - 1) * limit;
        const actualLimit = fetchAll ? 200 : limit;
        const res = await fetch(`${API_URL}/users?limit=${actualLimit}&skip=${skip}`);

        if (!res.ok) throw new Error("Ошибка загрузки пользователей");

        const data = await res.json();

        if (!data || !Array.isArray(data.users)) {
            throw new Error("Некорректный формат данных");
        }

        return { users: data.users, total: data.total };
    } catch (error) {
        console.error("Ошибка fetchUsers:", error);
        throw error;
    }
};


export function useUsers(page: number, limit: number = 10, fetchAll: boolean = false) {
    return useQuery<{ users: User[]; total: number }, Error>({
        queryKey: ["users", page, limit, fetchAll],
        queryFn: () => fetchUsers(page, limit, fetchAll),
        placeholderData: (prev) => prev ?? { users: [], total: 0 },
    });
}

export async function fetchUserById(userId: string): Promise<User> {
    if (!userId) throw new Error("ID пользователя не передан");

    const res = await fetch(`${API_URL}/users/${userId}`);
    if (!res.ok) throw new Error(`Ошибка загрузки пользователя: ${res.status} ${res.statusText}`);

    return res.json();
}


export const fetchRecipes = async (page: number = 1, limit: number = 10): Promise<{ recipes: Recipe[]; total: number }> => {
    console.log(`Загружаем рецепты: page=${page}, limit=${limit}`);

    const res = await fetch(`${API_URL}/recipes?limit=${limit}&skip=${(page - 1) * limit}`);
    if (!res.ok) throw new Error("Ошибка загрузки рецептов");

    return res.json();
};


export function useRecipes(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["recipes", page, limit],
        queryFn: () => fetchRecipes(page, limit),
        placeholderData: (prev) => prev ?? { recipes: [], total: 0 },
    });
}

// Получение рецепта по ID
export const fetchRecipeById = async (id: string): Promise<Recipe> => {
    if (!id) throw new Error("ID рецепта не передан");

    const res = await fetch(`${API_URL}/recipes/${id}`);
    if (!res.ok) throw new Error("Ошибка загрузки рецепта");

    return res.json();
};

export const fetchUserRecipes = async (userId: string): Promise<Recipe[]> => {
    if (!userId) throw new Error("ID пользователя не передан");

    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) throw new Error("Некорректный формат ID пользователя");

    const res = await fetch(`${API_URL}/recipes?limit=100`)
    if (!res.ok) throw new Error("Ошибка загрузки рецептов");

    const data = await res.json();

    // @ts-ignore
    return data.recipes.filter((recipe: Recipe) => recipe.userId === userIdNum);
};