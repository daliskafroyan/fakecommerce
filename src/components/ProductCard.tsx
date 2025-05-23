'use client';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '@/types/api';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const { id, title, price, description, image } = product;

    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={image}
                alt={title}
                sx={{ objectFit: 'contain', padding: 2, backgroundColor: '#f5f5f5' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mb: 2,
                    height: '4.5em'
                }}>
                    {description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
                    ${price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    component={Link}
                    href={`/products/${id}`}
                >
                    Details
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
} 