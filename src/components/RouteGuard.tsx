'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/utils/apiImports';
import { useNotification } from '@/contexts/NotificationContext';

interface RouteGuardProps {
    children: ReactNode;
    requireAuth?: boolean;
}

const protectedRoutes = [
    '/',
    '/cart',
    '/profile',
    '/checkout',
    '/orders',
    '/products'
];

const authRoutes = [
    '/login'
];

export default function RouteGuard({
    children,
    requireAuth = false
}: RouteGuardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const { showNotification } = useNotification();

    useEffect(() => {
        const isProtectedRoute = protectedRoutes.some(route =>
            pathname === route || pathname.startsWith(`${route}/`)
        ) || requireAuth;

        if (isProtectedRoute && !isAuthenticated) {
            showNotification('Please login to access this page', 'info');
            router.push('/login');
        }

        if (authRoutes.includes(pathname) && isAuthenticated) {
            router.push('/');
        }
    }, [pathname, isAuthenticated, router, showNotification]);

    return <>{children}</>;
} 