'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useRouter } from 'next/navigation';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const { items, totalPrice, clearCart } = useCart();
    const { showNotification } = useNotification();
    const router = useRouter();

    const handleNext = () => {
        setActiveStep(activeStep + 1);

        // On the last step, process the order
        if (activeStep === steps.length - 1) {
            // This would normally submit to your backend
            setTimeout(() => {
                clearCart();
                showNotification('Order placed successfully!', 'success');
                router.push('/');
            }, 1500);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <OrderSummary />;
            default:
                throw new Error('Unknown step');
        }
    }

    function AddressForm() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id="firstName" name="firstName" label="First name" fullWidth autoComplete="given-name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastName" name="lastName" label="Last name" fullWidth autoComplete="family-name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="address1" name="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="address2" name="address2" label="Address line 2" fullWidth autoComplete="shipping address-line2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="city" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="zip" name="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="country" name="country" label="Country" fullWidth autoComplete="shipping country" />
                </Grid>
            </Grid>
        );
    }

    function PaymentForm() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardNumber" label="Card number" fullWidth autoComplete="cc-number" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth autoComplete="cc-csc" />
                </Grid>
            </Grid>
        );
    }

    function OrderSummary() {
        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                {items.map((item) => (
                    <Box key={item.product.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">
                            {item.product.title} x {item.quantity}
                        </Typography>
                        <Typography variant="body1">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Layout requireAuth>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>

            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <Paper sx={{ p: 3, my: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                    </Typography>
                </Paper>
            ) : (
                <Paper sx={{ p: 3, my: 3 }}>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                        </Button>
                    </Box>
                </Paper>
            )}
        </Layout>
    );
} 