"use client";

import { Box, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // Changed to blue
        },
        secondary: {
            main: '#f44336',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

export default function Home() {
    const handleGetStarted = () => {
        window.location.href = '/chatbot';
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                bgcolor="#f7f7f7"
                p={3}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            >
                <Typography variant="h3" color="primary" mb={2}>
                    Welcome to NewbieAI
                </Typography>
                <Typography variant="h5" color="textSecondary" mb={4} textAlign="center">
                    Your friendly assistant for learning coding, technology, and related topics.
                </Typography>
                <Typography variant="h6" color="textSecondary" mb={4} textAlign="center">
                    Get started by clicking the button below.
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleGetStarted}
                    sx={{
                        backgroundColor: '#2196f3',
                        '&:hover': { backgroundColor: '#1976d2' },
                        width: '100%',
                        maxWidth: 300,
                        mt: 2,
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </Button>
            </Box>
        </ThemeProvider>
    );
}
