"use client";

import { useState } from "react";
import { useUsers } from "@/lib/api";
import Link from "next/link";
import { User } from "@/types/types";
import {filterUsers} from "@/lib/utils";

export default function UsersPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;

    const fetchAll = Boolean(search && !isNaN(Number(search)));
    const { data, isLoading, error } = useUsers(page, limit, fetchAll);

    const users: User[] = data?.users || [];
    const filteredUsers = filterUsers(users, search);

    if (isLoading) return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;
    if (error) return <p className="text-red-500 text-center mt-10">Ошибка загрузки</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">Список пользователей</h1>

            <div className="mb-4">
                <label htmlFor="search" className="block text-gray-700 font-semibold mb-2">
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder="Введите ID, имя или фамилию..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-lg text-black"
                />
            </div>

            <div className="flex flex-col gap-4">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Link
                            key={user.id}
                            href={`/users/${user.id}`}
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md transition hover:shadow-lg hover:bg-gray-50 flex items-center gap-4"
                        >
                            <img
                                src={user.image || "/placeholder-avatar.png"}
                                alt={user.firstName}
                                className="w-16 h-16 rounded-full object-cover shadow-md border"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {user.firstName} {user.lastName}
                                </h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">Пользователи не найдены.</p>
                )}
            </div>

            {!fetchAll ? (
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
                        disabled={users.length < limit}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md transition hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Следующая ▶
                    </button>
                </div>
            ) : null}
        </div>
    );
}
