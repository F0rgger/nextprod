"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserById, fetchUserRecipes } from "@/lib/api";
import Link from "next/link";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image?: string;
}

interface Recipe {
    id: number;
    name: string;
}

export default function UserPage() {
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            if (!userId) return;
            try {
                const userData: User = await fetchUserById(userId);
                const recipesData: Recipe[] = await fetchUserRecipes(userId);

                setUser(userData);
                setRecipes(recipesData || []);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err);
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [userId]);

    if (loading) return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

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
                    src={user?.image || "/placeholder-avatar.png"}
                    alt="Аватар пользователя"
                    className="w-32 h-32 rounded-full shadow-lg border"
                />

                <h1 className="text-3xl font-bold text-gray-800 mt-4">
                    {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600 mt-2"><span className="font-semibold">📧 Email:</span> {user?.email}</p>
                <p className="text-gray-600 mt-1"><span className="font-semibold">📞 Телефон:</span> {user?.phone}</p>
            </div>


            <h2 className="text-2xl font-semibold mt-8 text-black">Рецепты пользователя:</h2>

            {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {recipes.map((recipe) => (
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
