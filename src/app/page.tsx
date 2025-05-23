'use client';

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProductCard from '@/components/ProductCard';
import Layout from '@/components/Layout';
import { useGetProducts } from '../utils/apiImports';
import { useCart } from '@/contexts/CartContext';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { Product } from '@/types/api';
import Link from 'next/link';

export default function Home() {
  const { data: products, error, isLoading } = useGetProducts();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products) {
      // Get 4 random products as featured products
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    }
  }, [products]);

  return (
    <Layout requireAuth>
      {/* Hero Banner */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          py: 6,
          px: 4,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to FakeStore
        </Typography>
        <Typography variant="h6" gutterBottom>
          Shop the latest trends at unbeatable prices
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          href="/products"
          sx={{ mt: 2 }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Products */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h2">
            Featured Products
          </Typography>
          <Button component={Link} href="/products">
            View All
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error loading products. Please try again later.
          </Alert>
        ) : (
          <Grid container spacing={4}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
