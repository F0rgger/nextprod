export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    image?: string;
}

export interface Recipe {
    id: string;
    name: string;
    description: string;
    image?: string;
    ingredients?: string[];
    userId?: string;
    tags: string[];
}