import { Box, Button, FormControl, TextField, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        setError(''); // Reset error message on each attempt

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            setLoading(false);
            return;
        }

        const payload = {
            username,
            password,
            email,
            profilePicture: '',
            bio: '',
        };

        console.log(payload);

        try {
            const response = await axios.post('http://localhost:8081/api/users/register', payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data.code === "200") {
                navigate('/login'); // Redirect to login page on success
            } else {
                setError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err: any) {
            console.error('Error during registration:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
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
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    Create an Account
                </Typography>

                {error && (
                    <Typography color="error" sx={{ mt: 1, fontWeight: 'bold' }}>
                        {error}
                    </Typography>
                )}
                <FormControl sx={{ width: '100%', mt: 3 }}>
                    <TextField
                        label="Username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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

                <FormControl sx={{ width: '100%', mt: 3 }}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: '#333',
                            '& .MuiInputBase-input': { color: '#fff' },
                            borderRadius: '12px',
                        }}
                    />
                </FormControl>

                <Button
                    onClick={handleRegister}
                    sx={{
                        mt: 3,
                        width: '100%',
                        padding: '10px 0',
                        bgcolor: '#6200ea',
                        '&:hover': {
                            bgcolor: '#3700b3',
                        },
                        transition: 'background-color 0.3s',
                    }}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>
            </Box>
        </Box>
    );
}
