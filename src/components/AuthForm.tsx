"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signIn } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const success = await signIn(email, password);
        if (success) {
            router.push("/");
        } else {
            setError("Неверные учетные данные");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-black"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
