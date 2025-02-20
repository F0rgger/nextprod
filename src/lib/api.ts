import { useQuery } from "@tanstack/react-query";

const API_URL = "https://dummyjson.com";

// Получение списка пользователей
export const fetchUsers = async (page = 1, limit = 10, fetchAll = false) => {
    try {
        const skip = fetchAll ? 0 : (page - 1) * limit;
        const actualLimit = fetchAll ? 200 : limit;
        const res = await fetch(`${API_URL}/users?limit=${actualLimit}&skip=${skip}`);

        if (!res.ok) throw new Error("Ошибка загрузки пользователей");

        const data = await res.json();
        return { users: data.users, total: data.total };
    } catch (error) {
        console.error("Ошибка fetchUsers:", error);
        throw error;
    }
};
// Хук для списка пользователей
export function useUsers(page: number, limit: number = 10, fetchAll: boolean = false) {
    return useQuery({
        queryKey: ["users", page, limit, fetchAll],
        queryFn: () => fetchUsers(page, limit, fetchAll),
        keepPreviousData: true,
    });
}

// Получение пользователя по ID
export async function fetchUserById(userId: string) {
    try {
        if (!userId) throw new Error("ID пользователя не передан");

        const res = await fetch(`${API_URL}/users/${userId}`);
        if (!res.ok) throw new Error(`Ошибка загрузки пользователя: ${res.status} ${res.statusText}`);

        return await res.json();
    } catch (error) {
        console.error("Ошибка fetchUserById:", error);
        throw error;
    }
}

// Получение списка рецептов
export const fetchRecipes = async (page = 1, limit = 10) => {
    try {
        const res = await fetch(`${API_URL}/recipes?limit=${limit}&skip=${(page - 1) * limit}`);
        if (!res.ok) throw new Error("Ошибка загрузки рецептов");

        const data = await res.json();
        return { recipes: data.recipes, total: data.total };
    } catch (error) {
        console.error("Ошибка fetchRecipes:", error);
        throw error;
    }
};

// Хук для получения списка рецептов
export function useRecipes(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ["recipes", page, limit],
        queryFn: () => fetchRecipes(page, limit),
        keepPreviousData: true,
    });
}

// Получение рецепта по ID
export const fetchRecipeById = async (id: string) => {
    try {
        if (!id) throw new Error("ID рецепта не передан");

        const res = await fetch(`${API_URL}/recipes/${id}`);
        if (!res.ok) throw new Error("Ошибка загрузки рецепта");

        return await res.json();
    } catch (error) {
        console.error("Ошибка fetchRecipeById:", error);
        throw error;
    }
};


// Получение рецептов пользователя
export const fetchUserRecipes = async (userId: string) => {
    try {
        if (!userId) throw new Error("Нет userId");

        const res = await fetch(`${API_URL}/recipes`);
        if (!res.ok) throw new Error("Ошибка загрузки рецептов");

        const data = await res.json();

        // Фильтруем рецепты по userId
        const userRecipes = data.recipes.filter((recipe: any) => recipe.userId === Number(userId));

        return userRecipes;
    } catch (error) {
        console.error("Ошибка fetchUserRecipes:", error);
        throw error;
    }
};

