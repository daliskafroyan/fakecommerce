'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Layout from '@/components/Layout';
import { useGetProduct } from '../../../utils/apiImports';
import { useCart } from '@/contexts/CartContext';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = Number(params.id);
    const { data: product, error, isLoading } = useGetProduct(productId);
    const { addToCartWithQuantity } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCartWithQuantity(product, quantity);
        }
    };

    if (isLoading) {
        return (
            <Layout requireAuth>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                    <CircularProgress />
                </Box>
            </Layout>
        );
    }

    if (error || !product) {
        return (
            <Layout requireAuth>
                <Alert severity="error" sx={{ my: 4 }}>
                    Error loading product. Please try again later.
                </Alert>
            </Layout>
        );
    }

    return (
        <Layout requireAuth>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {/* Product Image */}
                <Box sx={{ flex: '1 1 40%', minWidth: '300px' }}>
                    <Card elevation={2}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            sx={{
                                height: 400,
                                objectFit: 'contain',
                                bgcolor: '#f5f5f5',
                                p: 2
                            }}
                        />
                    </Card>
                </Box>

                {/* Product Details */}
                <Box sx={{ flex: '1 1 50%', minWidth: '300px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.title}
                    </Typography>

                    <Chip
                        label={product.category}
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 2 }}>
                        ${product.price.toFixed(2)}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" paragraph sx={{ my: 3 }}>
                        {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
                        <TextField
                            label="Quantity"
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            InputProps={{ inputProps: { min: 1 } }}
                            sx={{ width: 100, mr: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleAddToCart}
                            sx={{ py: 1.5 }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
} 