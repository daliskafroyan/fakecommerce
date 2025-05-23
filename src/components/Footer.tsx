'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

export default function Footer() {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={4}
                    justifyContent="space-between"
                >
                    <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            FakeStore is a demo e-commerce site built with Next.js, React Query and Material UI.
                            It uses the FakeStore API for product data.
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            123 FakeStore St.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: info@fakestore.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: +1 234 567 8901
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/" color="inherit" display="block">
                            Home
                        </Link>
                        <Link href="/products" color="inherit" display="block">
                            Products
                        </Link>
                        <Link href="/categories" color="inherit" display="block">
                            Categories
                        </Link>
                    </Box>
                </Stack>
                <Box mt={5}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'© '}
                        <Link color="inherit" href="/">
                            FakeStore
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
} 