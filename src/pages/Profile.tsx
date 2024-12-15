import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Avatar, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CardContentCust from '../components/medium/CardContentCust';

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
    const [data, setData] = useState<any[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch user profile
    useEffect(() => {
        const token = Cookies.get('token');

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<User>(`http://localhost:8081/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.data.user);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || 'Failed to fetch user profile.');
                } else {
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    // Fetch user posts
    useEffect(() => {
        if (!userId) return;

        axios.get(`http://localhost:8081/api/posts/user/${userId}/posts`)
            .then((response) => {
                if (response.data.code === "200") {
                    setData(response.data.data.posts);
                    console.log("print data",response.data.data.posts);
                } else {
                    console.error('Failed to fetch posts');
                }
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, [userId]);

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
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        Recent Posts
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" mt="5%" flexDirection="column" gap={6}>
                        <Box>
                            {data.map((item) => {
                                const imageData = Array.isArray(item.media) && item.media.length > 0
                                    ? item.media[0].imageData // Access media instead of mediaUrl
                                    : null;

                                return (
                                    <CardContentCust
                                        key={item.id} // Use unique post id
                                        title={user.username}
                                        date={item.createdAt}
                                        images={imageData ? [imageData] : []}
                                        description={item.caption}
                                        comments={item.comments}
                                        likes={item.likes}
                                        userid={user.id}
                                        postId={item.id} // Use post id instead of postId
                                    />
                                );
                            })}
                        </Box>
                    </Box>
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
