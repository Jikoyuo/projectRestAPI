// src/pages/Profile.tsx
import React from 'react';
import { Container, Typography, Card, CardContent, Avatar, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Sample profile data (you can replace this with dynamic data)
    const user = {
        name: "John Doe",
        bio: "Web developer and tech enthusiast.",
        avatar: "", // Add a URL for the avatar if available
    };

    const handleBackToHome = () => {
        navigate('/dashboard');
    };

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }}>
                    {user.name.charAt(0)}
                </Avatar>
                <Typography variant="h4" sx={{ marginTop: 2, color: 'white' }}>
                    {user.name}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1, color: 'white' }}>
                    {user.bio}
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
