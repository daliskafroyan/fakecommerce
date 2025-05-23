'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../client';
import { Product } from '../../types/api';

const PRODUCTS_KEY = 'products';

export const useGetProducts = () => {
    return useQuery({
        queryKey: [PRODUCTS_KEY],
        queryFn: async () => {
            const { data } = await apiClient.get<Product[]>('/products');
            return data;
        },
    });
};

export const useGetProduct = (id: number) => {
    return useQuery({
        queryKey: [PRODUCTS_KEY, id],
        queryFn: async () => {
            const { data } = await apiClient.get<Product>(`/products/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: Product) => {
            const { data } = await apiClient.post<Product>('/products', product);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, product }: { id: number; product: Product }) => {
            const { data } = await apiClient.put<Product>(`/products/${id}`, product);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY, variables.id] });
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await apiClient.delete<Product>(`/products/${id}`);
            return data;
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY, id] });
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
        },
    });
}; 