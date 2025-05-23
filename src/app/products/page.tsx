'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import { useGetProducts } from '../../utils/apiImports';
import { useCart } from '@/contexts/CartContext';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Product } from '@/types/api';

export default function ProductsPage() {
    const { data: products, error, isLoading } = useGetProducts();
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    const filteredProducts = products
        ? products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.title.localeCompare(b.title);
            case 'name-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    return (
        <Layout requireAuth>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Products
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Browse our selection of high-quality products
                </Typography>
            </Box>

            {/* Filters and Search */}
            <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1, minWidth: 250 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">🔍</InputAdornment>
                        ),
                    }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        id="sort-by"
                        value={sortBy}
                        label="Sort By"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="price-asc">Price: Low to High</MenuItem>
                        <MenuItem value="price-desc">Price: High to Low</MenuItem>
                        <MenuItem value="name-asc">Name: A to Z</MenuItem>
                        <MenuItem value="name-desc">Name: Z to A</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Alert severity="error">
                    Error loading products. Please try again later.
                </Alert>
            ) : sortedProducts.length === 0 ? (
                <Alert severity="info">
                    No products found matching your search criteria.
                </Alert>
            ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {sortedProducts.map((product) => (
                        <Box
                            key={product.id}
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: 'calc(50% - 12px)',
                                    md: 'calc(33.333% - 16px)',
                                    lg: 'calc(25% - 18px)'
                                },
                                mb: 2
                            }}
                        >
                            <ProductCard product={product} onAddToCart={addToCart} />
                        </Box>
                    ))}
                </Box>
            )}
        </Layout>
    );
} 