"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [isDark, setIsDark] = useState(false);
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") === "dark";
            setIsDark(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme);
            setIsThemeLoaded(true);
        }
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newTheme = !prev ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle("dark", !prev);
            return !prev;
        });
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    App
                </Link>

                <div className="space-x-4 flex items-center">
                    {user && (
                        <>
                            <Link href="/users" className="hover:underline">Пользователи</Link>
                            <Link href="/recipes" className="hover:underline">Рецепты</Link>
                        </>
                    )}

                    {user ? (
                        <>
                            <span className="text-yellow-400">Привет, {user.username}!</span>
                            <button
                                onClick={() => { logout(); router.push("/auth/login"); }}
                                className="bg-red-500 px-4 py-1 rounded"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <Link href="/auth/login" className="bg-blue-500 px-4 py-1 rounded">
                            Войти
                        </Link>
                    )}

                    {isThemeLoaded && (
                        <button
                            onClick={toggleTheme}
                            className="bg-gray-600 px-3 py-1 rounded"
                        >
                            {isDark ? "🌞" : "🌙"}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
