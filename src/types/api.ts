export interface Product {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

export interface CartItem {
    productId: number;
    quantity: number;
}

export interface Cart {
    id?: number;
    userId: number;
    products: CartItem[];
}

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    name?: {
        firstname: string;
        lastname: string;
    };
    address?: {
        city: string;
        street: string;
        zipcode: string;
    };
    phone?: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
} 