"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserById, fetchUserRecipes } from "@/lib/api";
import Link from "next/link";
import type {Recipe, User} from "@/types/types";  // Убедись, что путь верный



export default function UserPage() {
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

    const router = useRouter();
    const [state, setState] = useState<{
        user: User | null;
        recipes: Recipe[];
        loading: boolean;
        error: string | null;
    }>({
        user: null,
        recipes: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!userId) {
            setState((prev) => ({ ...prev, loading: false, error: "Не указан ID пользователя" }));
            return;
        }

        async function loadData() {
            try {
                const userData = await fetchUserById(userId);
                console.log("User data:", userData); // Проверка API

                if (!userData.email || !userData.phone) {
                    console.warn("API не возвращает email или phone");
                }

                setState({
                    user: userData,
                    recipes: (await fetchUserRecipes(userId)) ?? [],
                    loading: false,
                    error: null,
                });
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setState({ user: null, recipes: [], loading: false, error: "Ошибка загрузки данных" });
            }
        }

        loadData();
    }, [userId]);

    if (state.loading) return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
    if (state.error) return <p className="text-red-500 text-center mt-10">{state.error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <button
                onClick={() => router.back()}
                className="mb-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md transition hover:bg-blue-700"
            >
                Назад
            </button>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md border flex flex-col items-center">
                <img
                    src={state.user?.image || "/placeholder-avatar.png"}
                    alt="Аватар пользователя"
                    className="w-32 h-32 rounded-full shadow-lg border"
                />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">
                    {state.user?.firstName} {state.user?.lastName}
                </h1>
                <p className="text-gray-600 mt-2"><span className="font-semibold">📧 Email:</span> {state.user?.email || "Не указан"}</p>
                <p className="text-gray-600 mt-1"><span className="font-semibold">📞 Телефон:</span> {state.user?.phone || "Не указан"}</p>
            </div>

            <h2 className="text-2xl font-semibold mt-8 text-black">Рецепты пользователя:</h2>

            {state.recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {state.recipes.map((recipe) => (
                        <Link
                            key={recipe.id}
                            href={`/recipes/${recipe.id}`}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transition hover:shadow-lg hover:bg-gray-50"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-4">У пользователя нет рецептов.</p>
            )}
        </div>
    );
}
