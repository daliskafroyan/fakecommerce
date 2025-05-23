import { useGetProducts, useGetProduct, useAddProduct, useUpdateProduct, useDeleteProduct } from '../api/hooks/useProducts';
import { useGetCarts, useGetCart, useGetUserCarts, useAddCart, useUpdateCart, useDeleteCart } from '../api/hooks/useCarts';
import { useGetUsers, useGetUser, useAddUser, useUpdateUser, useDeleteUser } from '../api/hooks/useUsers';
import { useLogin, useLogout, useAuth } from '../api/hooks/useAuth';
import apiClient from '../api/client';

export {
    useGetProducts,
    useGetProduct,
    useAddProduct,
    useUpdateProduct,
    useDeleteProduct,

    useGetCarts,
    useGetCart,
    useGetUserCarts,
    useAddCart,
    useUpdateCart,
    useDeleteCart,

    useGetUsers,
    useGetUser,
    useAddUser,
    useUpdateUser,
    useDeleteUser,

    useLogin,
    useLogout,
    useAuth,

    apiClient
}; 