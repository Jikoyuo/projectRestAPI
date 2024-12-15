// src/pages/PostDetail.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar, TextField, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
    const navigate = useNavigate();

    // Sample post data (you can replace this with dynamic data)
    const post = {
        title: "Post Title",
        date: "December 15, 2024",
        images: [
            "https://via.placeholder.com/400",
            "https://via.placeholder.com/400",
        ],
        description: "This is the description of the post. It contains information about the post.",
        likes: 100,
        comments: [
            "Great post!",
            "Very informative.",
            "I love this!",
        ],
    };

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(post.comments);

    const handleAddComment = () => {
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText('');
        }
    };

    const handleBackToHome = () => {
        navigate('/dashboard');
    };

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Box display="flex" justifyContent="center" flexDirection="column">
                <Typography variant="h4" sx={{ color: 'white' }}>
                    {post.title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1, color: 'white' }}>
                    {post.date}
                </Typography>

                <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                    {post.images.map((image, index) => (
                        <img key={index} src={image} alt={`Post image ${index + 1}`} style={{ width: '100%', maxHeight: '400px', marginBottom: '15px' }} />
                    ))}
                </Box>

                <Card sx={{ bgcolor: '#181818', marginTop: 3 }}>
                    <CardContent>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            {post.description}
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: 2, color: 'white' }}>
                            {post.likes} Likes
                        </Typography>
                        <Typography variant="h6" sx={{ marginTop: 2, color: 'white' }}>
                            {comments.length} Comments
                        </Typography>
                    </CardContent>
                </Card>

                <Box sx={{ marginTop: 3 }}>
                    <TextField
                        fullWidth
                        label="Add a comment"
                        variant="outlined"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        sx={{ bgcolor: 'white', marginBottom: 2 }}
                    />
                    <Button onClick={handleAddComment} variant="contained" sx={{ marginBottom: 3 }}>
                        Add Comment
                    </Button>
                </Box>

                <Card sx={{ bgcolor: '#181818' }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            Comments
                        </Typography>
                        {comments.map((comment, index) => (
                            <Typography key={index} variant="body2" sx={{ color: 'white', marginTop: 1 }}>
                                {comment}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>

                <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                    <button onClick={handleBackToHome} style={{ color: 'white', backgroundColor: 'gray', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
                        Back to Home
                    </button>
                </Box>
            </Box>
        </Container>
    );
};

export default PostDetail;
