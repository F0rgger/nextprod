import { User, Recipe } from "@/types/types";

export function filterUsers(users: User[], search: string): User[] {
    if (!users.length) return [];

    const searchLower = search.toLowerCase();
    const idSearch = parseInt(search, 10);

    if (!isNaN(idSearch)) {
        return users.filter((user) => user.id === idSearch);
    }

    return users.filter(
        (user) =>
            user.firstName.toLowerCase().includes(searchLower) ||
            user.lastName.toLowerCase().includes(searchLower)
    );
}

export function filterRecipes(recipes: Recipe[], search: string): Recipe[] {
    if (!recipes.length) return [];

    const searchLower = search.toLowerCase();

    return recipes.filter(
        (recipe) =>
            recipe.name.toLowerCase().includes(searchLower) ||
            recipe.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
}
