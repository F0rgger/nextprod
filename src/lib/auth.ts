export interface AuthResponse {
    token: string;
    id: number;
    username: string;
    email: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
    });

    if (!res.ok) {
        throw new Error("Ошибка авторизации");
    }

    return res.json();
}
