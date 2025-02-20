"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";

export default function RecipesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;
    const router = useRouter();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        }
    }, [user, router]);

    const { data, isLoading, error } = useRecipes(page, limit);

    if (!user) return <p className="text-center mt-10">Проверка доступа...</p>;
    if (isLoading) return <p className="text-center mt-10">Загрузка...</p>;
    if (error) return <p className="text-red-500 text-center">Ошибка: {error.message}</p>;

    const totalPages = Math.ceil(data.total / limit);


    const filteredRecipes = data.recipes.filter((recipe: any) => {
        const searchLower = search.toLowerCase();
        return (
            recipe.name.toLowerCase().includes(searchLower) ||
            (recipe.tags && recipe.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
        );
    });


    const handleTagClick = (tag: string) => {
        setSearch(tag);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">📜 Список рецептов</h1>


            <input
                type="text"
                placeholder="🔍 Поиск по названию или тегу..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 mb-4 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ul className="space-y-4">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe: any) => (
                        <li key={recipe.id} className="p-4 bg-gray-100 shadow-md rounded-lg flex items-center space-x-4">
                            {recipe.image && (
                                <img src={recipe.image} alt={recipe.name} className="w-16 h-16 rounded-lg shadow-md" />
                            )}
                            <div>
                                <Link href={`/recipes/${recipe.id}`} className="text-blue-600 hover:underline text-lg font-semibold">
                                    {recipe.name}
                                </Link>
                                {recipe.tags && (
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {recipe.tags.map((tag: string) => (
                                            <button
                                                key={tag}
                                                onClick={() => handleTagClick(tag)}
                                                className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-200 transition"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Рецепты не найдены</p>
                )}
            </ul>


            <div className="flex justify-center items-center mt-6 gap-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg transition-all ${
                        page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
                    }`}
                >
                    Назад
                </button>

                <span className="text-lg font-semibold text-black">
                    {page} / {totalPages}
                </span>

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                    className={`px-4 py-2 rounded-lg transition-all ${
                        page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-700"
                    }`}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
}
