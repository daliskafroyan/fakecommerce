'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from '@/components/Layout';
import { useAuth } from '@/utils/apiImports';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-tabpanel-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ProfilePage() {
    const [tabValue, setTabValue] = useState(0);
    const { isAuthenticated } = useAuth();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Layout requireAuth>
            <Typography variant="h4" component="h1" gutterBottom>
                My Profile
            </Typography>

            <Paper sx={{ mt: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                        <Tab label="Account Information" />
                        <Tab label="Order History" />
                        <Tab label="Settings" />
                    </Tabs>
                </Box>

                <TabPanel value={tabValue} index={0}>
                    <Typography variant="h6" gutterBottom>Account Information</Typography>
                    <Typography variant="body1">
                        Username: johnd
                    </Typography>
                    <Typography variant="body1">
                        Email: john@example.com
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Note: This is a demo account. In a real application, this would show your actual account details.
                    </Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" gutterBottom>Order History</Typography>
                    <Typography variant="body2" color="text.secondary">
                        You haven't placed any orders yet.
                    </Typography>
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                    <Typography variant="h6" gutterBottom>Settings</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Account settings would be displayed here.
                    </Typography>
                </TabPanel>
            </Paper>
        </Layout>
    );
} 