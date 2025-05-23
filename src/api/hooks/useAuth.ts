'use client';

import { useMutation } from '@tanstack/react-query';
import apiClient from '../client';
import { LoginCredentials, LoginResponse } from '../../types/api';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            return data;
        },
    });
};

export const useLogout = () => {
    return {
        logout: () => {
            localStorage.removeItem('token');
        },
    };
};

export const useAuth = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    return {
        isAuthenticated: !!token,
        token,
    };
}; 