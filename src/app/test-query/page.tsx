'use client';

import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

// Create a client
const queryClient = new QueryClient();

function TestComponent() {
    const { data, isLoading } = useQuery({
        queryKey: ['test-query'],
        queryFn: () => Promise.resolve('Query is working!'),
    });

    if (isLoading) return <div>Loading...</div>;

    return <div>{data}</div>;
}

export default function TestQueryPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <div style={{ padding: '2rem' }}>
                <h1>Testing React Query</h1>
                <TestComponent />
            </div>
        </QueryClientProvider>
    );
} 