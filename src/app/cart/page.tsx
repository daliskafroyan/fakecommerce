'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import CloseIcon from '@mui/icons-material/Close';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Product } from '@/types/api';

const ITEMS_PER_PAGE = 5;

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
    const [couponCode, setCouponCode] = useState('');
    const [page, setPage] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCouponCode(e.target.value);
    };

    const applyCoupon = () => {
        alert(`Coupon ${couponCode} applied!`);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleOpenProductDialog = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    };

    const handleCloseProductDialog = () => {
        setDialogOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(0);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const filteredItems = items.filter(item =>
        item.product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedItems = filteredItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    if (items.length === 0) {
        return (
            <Layout requireAuth>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Cart
                </Typography>
                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Alert severity="info" sx={{ my: 2 }}>
                        Your cart is empty
                    </Alert>
                    <Button
                        variant="contained"
                        component={Link}
                        href="/products"
                        sx={{ mt: 2 }}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout requireAuth>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Cart
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box sx={{ flex: '1 1 60%', minWidth: '300px' }}>
                    {/* Search Bar */}
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            width: '100%'
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Filter cart items by name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            inputProps={{ 'aria-label': 'filter cart items' }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            }
                        />
                        {searchTerm && (
                            <IconButton
                                size="small"
                                aria-label="clear"
                                onClick={clearSearch}
                            >
                                <ClearIcon />
                            </IconButton>
                        )}
                    </Paper>

                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedItems.length > 0 ? (
                                    paginatedItems.map((item) => (
                                        <TableRow key={item.product.id}>
                                            <TableCell component="th" scope="row">
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box
                                                        component="img"
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        sx={{ width: 50, mr: 2, objectFit: 'contain' }}
                                                    />
                                                    <Typography variant="body2" sx={{ maxWidth: 250, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.product.title}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleOpenProductDialog(item.product)}
                                                        sx={{ ml: 1 }}
                                                        color="primary"
                                                    >
                                                        <InfoIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                ${item.product.price.toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.product.id!, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.product.id!, item.quantity + 1)}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => removeFromCart(item.product.id!)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography variant="body1" sx={{ py: 2 }}>
                                                No items match your search
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredItems.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={ITEMS_PER_PAGE}
                        rowsPerPageOptions={[ITEMS_PER_PAGE]}
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} of ${count} items`
                        }
                    />
                </Box>

                <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Box sx={{ my: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Items ({totalItems}):</Typography>
                                    <Typography variant="body2">${totalPrice.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Shipping:</Typography>
                                    <Typography variant="body2">$0.00</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Coupon Code"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={couponCode}
                                    onChange={handleCouponChange}
                                    sx={{ mb: 1 }}
                                />
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onClick={applyCoupon}
                                    disabled={!couponCode}
                                >
                                    Apply Coupon
                                </Button>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                component={Link}
                                href="/checkout"
                            >
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseProductDialog}
                maxWidth="md"
                fullWidth
            >
                {selectedProduct && (
                    <>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ pr: 4 }}>
                                {selectedProduct.title}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseProductDialog}
                                sx={{ position: 'absolute', right: 8, top: 8 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                <Box sx={{ flex: '1 1 35%', minWidth: '250px' }}>
                                    <Box
                                        component="img"
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        sx={{
                                            width: '100%',
                                            height: 300,
                                            objectFit: 'contain',
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 1,
                                            p: 2
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: '1 1 55%', minWidth: '250px' }}>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        ${selectedProduct.price.toFixed(2)}
                                    </Typography>
                                    <Box sx={{ mt: 1, mb: 2 }}>
                                        <Chip
                                            label={selectedProduct.category}
                                            variant="outlined"
                                            size="small"
                                            sx={{ mr: 1 }}
                                        />
                                        {selectedProduct.rating && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                <Rating
                                                    value={selectedProduct.rating.rate || 0}
                                                    precision={0.1}
                                                    readOnly
                                                    size="small"
                                                />
                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                    ({selectedProduct.rating.count} reviews)
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Typography variant="body1" sx={{ my: 2 }}>
                                        {selectedProduct.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="outlined"
                                onClick={handleCloseProductDialog}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Layout>
    );
} 