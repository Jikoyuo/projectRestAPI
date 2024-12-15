import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetail = () => {
    const navigate = useNavigate();
    const { postId } = useParams(); // To get postId from the URL
    const [post, setPost] = useState<any>(null); // Store post data
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<{ id: string; content: string; createdAt: string }[]>([]);

    useEffect(() => {
        // Fetch post data from the API
        axios.get(`http://localhost:8081/api/posts/post/${postId}`)
            .then((response) => {
                const postData = response.data.data.post;
                setPost(postData);
                setComments(postData.comments || []); // Set comments array from API
            })
            .catch((error) => {
                console.error("Error fetching post:", error);
            });
    }, [postId]); // Fetch data when postId changes

    const handleAddComment = () => {
        if (commentText.trim()) {
            const payload = {
                postId,
                userId: "dummyUserId", // Replace with actual userId
                content: commentText,
            };

            axios.post('http://localhost:8081/api/comments', payload)
                .then((response) => {
                    const newComment = response.data.data.comment;
                    setComments([...comments, newComment]); // Add new comment to the list
                    setCommentText(''); // Clear the input
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                });
        }
    };

    const handleBackToHome = () => {
        navigate('/dashboard');
    };

    if (!post) {
        return <Typography variant="h6" sx={{ color: 'white' }}>Loading...</Typography>;
    }

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Box display="flex" justifyContent="center" flexDirection="column">
                <Typography variant="h4" sx={{ color: 'white' }}>
                    {post.caption}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1, color: 'white' }}>
                    {new Date(post.createdAt).toLocaleDateString()} {/* Format the date */}
                </Typography>

                <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                    {post.media.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={`data:image/png;base64,${image.imageData}`}
                            alt={`Post image ${index + 1}`}
                            style={{ width: '100%', maxHeight: '400px', marginBottom: '15px' }}
                        />
                    ))}
                </Box>

                <Card sx={{ bgcolor: '#181818', marginTop: 3 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: 'white' }}>
                            {post.likes.length} Likes
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
                        {comments.map((comment) => (
                            <Box key={comment.id} sx={{ marginBottom: 2 }}>
                                <Typography variant="body2" sx={{ color: 'white' }}>
                                    {comment.content}
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#888' }}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>

                <Box display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
                    <button
                        onClick={handleBackToHome}
                        style={{ color: 'white', backgroundColor: 'gray', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                    >
                        Back to Home
                    </button>
                </Box>
            </Box>
        </Container>
    );
};

export default PostDetail;
