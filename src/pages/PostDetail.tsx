import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Avatar,
    IconButton,
    TextField,
    Button,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';
import Cookies from 'js-cookie';

const PostDetail = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState<any>(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<
        { id: string; content: string; createdAt: string; user: { username: string; } }[]
    >([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/posts/post/${postId}`)
            .then((response) => {
                const postData = response.data.data;
                setPost(postData);
                setComments(postData.comments || []);
            })
            .catch((error) => {
                console.error('Error fetching post:', error);
            });
    }, [postId]);

    const handleAddComment = () => {
        if (commentText.trim()) {
            const payload = {
                postId,
                userId: Cookies.get('userId'), // Replace with actual userId
                content: commentText,
            };

            axios
                .post('http://localhost:8081/api/comments', payload)
                .then((response) => {
                    const newComment = response.data.comment;
                    setComments([...comments, newComment]);
                    
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                });
        }
    };

    const handleDeletePost = () => {
        axios
            .delete(`http://localhost:8081/api/posts/delete-post/${postId}`)
            .then(() => {
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const handleDeleteComment = (commentId: string) => {
        console.log(commentId);
        axios
            .delete(`http://localhost:8081/api/comments/${commentId}`)
            .then(() => {
                window.location.reload(); 
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });
    };

    const handleAvatarClick = () => {
        navigate('/profile');
    };

    const handleBackToHome = () => {
        navigate('/dashboard');
    };

    if (!post) {
        return (
            <Typography variant="h6" sx={{ color: 'white' }}>
                Loading...
            </Typography>
        );
    }

    return (
        <Container sx={{ paddingTop: '20px' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                {/* Header */}
                <Box display="flex" alignItems="center" sx={{ marginBottom: 2, width: '100%' }}>
                    <Avatar
                        sx={{ bgcolor: red[500], cursor: 'pointer', marginRight: 2 }}
                        onClick={handleAvatarClick}
                    >
                        {post.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        {post.user?.username || 'Unknown User'}
                    </Typography>
                </Box>

                {/* Post Caption */}
                <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
                    {post.caption || 'No caption provided'}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1, color: 'white' }}>
                    {new Date(post.createdAt).toLocaleDateString()}
                </Typography>

                {/* Post Media */}
                <Box display="flex" flexDirection="column" sx={{ marginTop: 3, width: '100%' }}>
                    {post.mediaUrl?.map((image: any, index: number) => (
                        <img
                            key={index}
                            src={`data:image/png;base64,${image.imageData}`}
                            alt={`Post image ${index + 1}`}
                            style={{
                                width: '100%',
                                maxHeight: '400px',
                                marginBottom: '15px',
                                borderRadius: '8px',
                            }}
                        />
                    ))}
                </Box>

                {/* Post Actions */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ bgcolor: '#181818', padding: 2, borderRadius: 1, marginTop: 3, width: '100%' }}
                >
                    <Typography variant="h6" sx={{ color: 'white' }}>
                        {post.likes?.length || 0} Likes
                    </Typography>
                    <IconButton onClick={handleDeletePost} sx={{ color: 'blue' }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>

                {/* Add Comment */}
                <Box sx={{ marginTop: 3, width: '100%' }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Add a comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        variant="outlined"
                        sx={{ marginBottom: 2, bgcolor: '#fff', borderRadius: 1 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        sx={{ bgcolor: 'blue', color: 'white' }}
                    >
                        Add Comment
                    </Button>
                </Box>

                {/* Comments Section */}
                <Box sx={{ bgcolor: '#181818', padding: 2, borderRadius: 1, marginTop: 3, width: '100%' }}>
                    <Typography variant="h6" sx={{ color: 'white', marginBottom: 2 }}>
                        Comments
                    </Typography>
                    {comments.map((comment) => (
                        <Box
                            key={comment?.commentId || ''}
                            sx={{
                                marginBottom: 2,
                                padding: 1,
                                borderBottom: '1px solid #333',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        src={comment?.commentedBy?.username || ''}
                                        alt={comment?.commentedBy?.username || ''}
                                        sx={{ marginRight: 2 }}
                                    />
                                    <Typography variant="body2" sx={{ color: 'white' }}>
                                        {comment?.commentedBy?.username}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => handleDeleteComment(comment?.commentId)}
                                    sx={{ color: 'red' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'white', marginTop: 1 }}>
                                {comment?.content || commentText}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#888' }}>
                                {new Date(comment?.commentedAt || '').toLocaleString()}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Back to Home Button */}
                <Button
                    onClick={handleBackToHome}
                    variant="contained"
                    sx={{ bgcolor: 'gray', color: 'white', marginTop: 3 }}
                >
                    Back to Home
                </Button>
            </Box>
        </Container>
    );
};

export default PostDetail;
