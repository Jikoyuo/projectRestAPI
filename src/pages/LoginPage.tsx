import { Box, Button, FormControl, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from "js-cookie";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // const response = await Login(email, password);
            const response = {
                code: '200',
                token: 'abcde-2139'
            };

            if (response.code === '200') {
                Cookies.set('accessToken', response.token);
                navigate('/dashboard', { state: { loginSuccess: true } });
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err: any) {
            console.error('Error during login:', err);
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#121212',
                color: '#fff',
            }}
        >
            <Box
                sx={{
                    bgcolor: '#1e1e1e',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 4,
                    width: '100%',
                    maxWidth: 400,
                    textAlign: 'center',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        transition: 'transform 0.3s ease-in-out',
                    },
                }}
            >
                <Typography variant="h4" color="white" gutterBottom>
                    Welcome Back!
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {error}
                    </Typography>
                )}

                <FormControl sx={{ width: '100%', mt: 3 }}>
                    <TextField
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: '#333',
                            '& .MuiInputBase-input': { color: '#fff' },
                            borderRadius: '12px',
                        }}
                    />
                </FormControl>

                <FormControl sx={{ width: '100%', mt: 3 }}>
                    <TextField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: '#333',
                            '& .MuiInputBase-input': { color: '#fff' },
                            borderRadius: '12px',
                        }}
                    />
                </FormControl>

                <Button
                    onClick={handleLogin}
                    sx={{
                        mt: 3,
                        width: '100%',
                        padding: '10px 0',
                        bgcolor: 'white',
                        color: '#1e1e1e',
                        border: '1px solid white',
                        '&:hover': {
                            bgcolor: 'inherit',
                            color: 'white',
                        },
                        transition: 'background-color 0.3s',
                    }}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>

                <Button
                    onClick={handleRegisterRedirect}
                    sx={{
                        mt: 2,
                        width: '100%',
                        padding: '10px 0',
                        bgcolor: 'inherit',
                        border: '1px solid white',
                        '&:hover': {
                            bgcolor: 'white',
                            color: '#1e1e1e',

                        },
                        transition: 'background-color 0.3s',
                    }}
                    variant="contained"
                    color="secondary"
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
}
