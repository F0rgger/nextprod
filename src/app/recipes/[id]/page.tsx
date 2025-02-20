import {fetchRecipeById, fetchUserById} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
    id: string;
    name: string;
    description: string;
    image?: string;
    ingredients?: string[];
    userId?: string;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export default async function RecipePage({params}: { params: { id: string } }) {
    if (!params?.id) {
        return <p className="text-red-500 text-center mt-10">Ошибка: нет параметра ID</p>;
    }

    try {
        const recipe: Recipe | null = await fetchRecipeById(params.id);
        if (!recipe) {
            return <p className="text-red-500 text-center mt-10">Ошибка: рецепт не найден</p>;
        }

        let author: User | null = null;
        if (recipe.userId) {
            author = await fetchUserById(recipe.userId);
        }

        return (
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                {recipe.image && (
                    <div className="flex justify-center mb-4">
                        <Image
                            src={recipe.image}
                            alt={recipe.name}
                            width={250}
                            height={250}
                            className="rounded-lg"
                        />
                    </div>
                )}


                <h1 className="text-3xl font-bold text-black mb-4">{recipe.name}</h1>


                <p className="text-gray-700 mb-4">{recipe.description}</p>


                {recipe.ingredients?.length ? (
                    <>
                        <h2 className="text-xl font-semibold text-black mt-6">Ингредиенты:</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-gray-500 mt-2">Нет информации об ингредиентах</p>
                )}


                {author ? (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold text-black">Автор рецепта:</h2>
                        <Link href={`/users/${author.id}`}>
                            <p className="text-black font-medium hover:underline cursor-pointer">
                                {author.firstName} {author.lastName}
                            </p>
                        </Link>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-2">Автор неизвестен</p>
                )}


                <div className="mt-6 text-center">
                    <Link href="/recipes">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            Назад
                        </button>
                    </Link>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Ошибка при загрузке рецепта:", error instanceof Error ? error.message : String(error));
        return <p className="text-red-500 text-center mt-10">Ошибка загрузки рецепта</p>;
    }
}
