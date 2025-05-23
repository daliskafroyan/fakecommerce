'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/api';
import { useNotification } from './NotificationContext';

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    addToCartWithQuantity: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { showNotification } = useNotification();

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setItems(parsedCart);
            } catch (error) {
                console.error('Failed to parse cart from localStorage', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));

        const itemCount = items.reduce((count, item) => count + item.quantity, 0);
        const price = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

        setTotalItems(itemCount);
        setTotalPrice(price);
    }, [items]);

    const addToCart = (product: Product) => {
        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                showNotification(`Added another ${product.title} to your cart`, 'success');
                return updatedItems;
            } else {
                showNotification(`${product.title} added to your cart`, 'success');
                return [...prevItems, { product, quantity: 1 }];
            }
        });
    };

    const addToCartWithQuantity = (product: Product, quantity: number) => {
        if (quantity <= 0) return;

        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                showNotification(`Added ${quantity} ${product.title}${quantity > 1 ? 's' : ''} to your cart`, 'success');
                return updatedItems;
            } else {
                showNotification(`Added ${quantity} ${product.title}${quantity > 1 ? 's' : ''} to your cart`, 'success');
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const removeFromCart = (productId: number) => {
        const productToRemove = items.find(item => item.product.id === productId);

        setItems(prevItems =>
            prevItems.filter(item => item.product.id !== productId)
        );

        if (productToRemove) {
            showNotification(`${productToRemove.product.title} removed from cart`, 'info');
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(prevItems => {
            return prevItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            );
        });
    };

    const clearCart = () => {
        setItems([]);
        showNotification('Cart cleared', 'info');
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                addToCartWithQuantity,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 