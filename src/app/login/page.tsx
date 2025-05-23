'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Layout from '@/components/Layout';
import { useLogin } from '../../utils/apiImports';
import { useNotification } from '@/contexts/NotificationContext';

export default function LoginPage() {
    const router = useRouter();
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: '',
    });
    const { mutate: login, isPending, isError, error } = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user types
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors({
                ...formErrors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = { username: '', password: '' };

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 4) {
            errors.password = 'Password must be at least 4 characters';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            login(formData, {
                onSuccess: () => {
                    showNotification('Successfully logged in', 'success');
                    router.push('/');
                }
            });
        }
    };

    return (
        <Layout>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 400,
                        width: '100%',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Login
                    </Typography>

                    {isError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Invalid username or password. Please try again.
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            error={!!formErrors.username}
                            helperText={formErrors.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isPending}
                        >
                            {isPending ? <CircularProgress size={24} /> : 'Sign In'}
                        </Button>
                    </Box>

                    {/* Test credentials info */}
                    <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            For testing, use:
                        </Typography>
                        <Typography variant="body2">
                            Username: <strong>johnd</strong><br />
                            Password: <strong>m38rmF$</strong>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Layout>
    );
} 