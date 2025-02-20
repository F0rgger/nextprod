"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/useAuth";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <div className="bg-white p-6 shadow-md rounded-xl">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Вход в аккаунт</h2>
                    <AuthForm/>
                </div>
            </div>
        </div>
    );
}
