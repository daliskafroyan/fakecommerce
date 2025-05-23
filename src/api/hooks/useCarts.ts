'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../client';
import { Cart } from '../../types/api';

const CARTS_KEY = 'carts';

export const useGetCarts = () => {
    return useQuery({
        queryKey: [CARTS_KEY],
        queryFn: async () => {
            const { data } = await apiClient.get<Cart[]>('/carts');
            return data;
        },
    });
};

export const useGetCart = (id: number) => {
    return useQuery({
        queryKey: [CARTS_KEY, id],
        queryFn: async () => {
            const { data } = await apiClient.get<Cart>(`/carts/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

// Get user's cart
export const useGetUserCarts = (userId: number) => {
    return useQuery({
        queryKey: [CARTS_KEY, 'user', userId],
        queryFn: async () => {
            const { data } = await apiClient.get<Cart[]>(`/carts/user/${userId}`);
            return data;
        },
        enabled: !!userId,
    });
};

// Add a new cart
export const useAddCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (cart: Cart) => {
            const { data } = await apiClient.post<Cart>('/carts', cart);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CARTS_KEY] });
        },
    });
};

// Update a cart
export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, cart }: { id: number; cart: Cart }) => {
            const { data } = await apiClient.put<Cart>(`/carts/${id}`, cart);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [CARTS_KEY, variables.id] });
            queryClient.invalidateQueries({ queryKey: [CARTS_KEY] });
        },
    });
};

// Delete a cart
export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await apiClient.delete<Cart>(`/carts/${id}`);
            return data;
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [CARTS_KEY, id] });
            queryClient.invalidateQueries({ queryKey: [CARTS_KEY] });
        },
    });
}; 