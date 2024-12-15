// src/pages/Profile.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';

interface User {
    id: string;
    username: string;
    email: string;
    bio: string;
    profilePicture: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get('token');
        


        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:8081/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Tambahkan token jika diperlukan oleh backend
                    },
                });

                setUser(response.data.data.user); // Atur data pengguna ke state

                console.log(response.data.data.user);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || 'Failed to fetch user profile.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false); // Atur loading selesai
            }
        };

        fetchUserProfile();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Sample profile data (you can replace this with dynamic data)
    // const user = {
    //     name: "John Doe",
    //     bio: "Web developer and tech enthusiast.",
    //     avatar: "", // Add a URL for the avatar if available
    // };

    const handleBackToHome = () => {
        navigate('/dashboard');
    };

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }}>
                    {user?.username.charAt(0)}
                </Avatar>
                <Typography variant="h4" sx={{ marginTop: 2, color: 'white' }}>
                    {user?.username}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1, color: 'white' }}>
                    {user?.bio}
                </Typography>
                <Card sx={{ marginTop: 3, bgcolor: '#181818' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Recent Posts
                        </Typography>
                        {/* Display recent posts here */}
                    </CardContent>
                </Card>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                <button onClick={handleBackToHome} style={{ color: 'white', backgroundColor: 'gray', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
                    Back to Home
                </button>
            </Box>
        </Container>
    );
};

export default Profile;
