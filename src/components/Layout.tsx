'use client';

import { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import RouteGuard from './RouteGuard';

interface LayoutProps {
    children: ReactNode;
    requireAuth?: boolean;
}

export default function Layout({ children, requireAuth = false }: LayoutProps) {
    return (
        <RouteGuard requireAuth={requireAuth}>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                    {children}
                </Container>
                <Footer />
            </Box>
        </RouteGuard>
    );
} 