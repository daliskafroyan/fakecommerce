'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../client';
import { User } from '../../types/api';

const USERS_KEY = 'users';

export const useGetUsers = () => {
    return useQuery({
        queryKey: [USERS_KEY],
        queryFn: async () => {
            const { data } = await apiClient.get<User[]>('/users');
            return data;
        },
    });
};

export const useGetUser = (id: number) => {
    return useQuery({
        queryKey: [USERS_KEY, id],
        queryFn: async () => {
            const { data } = await apiClient.get<User>(`/users/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: User) => {
            const { data } = await apiClient.post<User>('/users', user);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, user }: { id: number; user: User }) => {
            const { data } = await apiClient.put<User>(`/users/${id}`, user);
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY, variables.id] });
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
        },
    });
};

// Delete a user
export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await apiClient.delete<User>(`/users/${id}`);
            return data;
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: [USERS_KEY, id] });
            queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
        },
    });
}; 