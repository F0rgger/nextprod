"use client";

import { useState } from "react";
import { useRecipes } from "@/lib/api";
import Link from "next/link";
import { Recipe } from "@/types/types";
import {filterRecipes} from "@/lib/utils";

export default function RecipesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 5;

    const { data, isLoading, error } = useRecipes(page, limit);

    const recipes: Recipe[] = data?.recipes || [];
    const filteredRecipes = search ? filterRecipes(recipes, search) : recipes;

    const isSearchActive = search.length > 0;

    if (isLoading) return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Ошибка загрузки</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Список рецептов</h1>


            <div className="mb-4">
                <label htmlFor="search" className="block text-gray-700 font-semibold mb-2">
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Введите название или тег..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-lg text-black"
                />
            </div>


            <div className="flex flex-col gap-4">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <Link
                            key={recipe.id}
                            href={`/recipes/${recipe.id}`}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transition hover:shadow-lg hover:bg-gray-50 flex flex-col"
                        >
                            <img
                                src={recipe.image || "/placeholder-recipe.png"}
                                alt={recipe.name}
                                className="w-full h-48 object-cover rounded-lg shadow-md border"
                            />
                            <h3 className="text-lg font-semibold text-gray-800 mt-2">{recipe.name}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {recipe.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg cursor-pointer hover:bg-gray-300 transition">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Рецепты не найдены.</p>
                )}
            </div>

            {!isSearchActive && (
                <div className="flex justify-between items-center mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        ◀ Предыдущая
                    </button>

                    <span className="text-gray-700">Страница {page}</span>

                    <button
                        disabled={recipes.length < limit}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Следующая ▶
                    </button>
                </div>
            )}
        </div>
    );
}
