import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Image {
  imageName: string;
  imageType: string;
  imageData: string; // Base64 encoded image
}

const AddPostPage = () => {
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState<Image[]>([]); // Change state to Image array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                // Check file type and size
                if (!file.type.startsWith('image/')) {
                    setError('Only image files are allowed');
                    return;
                }
                if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
                    setError('File size exceeds 5MB');
                    return;
                }
    
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        const image: Image = {
                            imageName: file.name,
                            imageType: file.type,
                            imageData: reader.result as string,
                        };
                        setImages((prevImages) => [...prevImages, image]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };
    

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const token = Cookies.get('token');
        const userId = Cookies.get('userId');

        if (!userId) {
            setError('User is not authenticated. Please log in.');
            setLoading(false);
            return;
        }

        const postData = {
            userId,
            caption,
            media: images.map((img) => ({
                imageName: img.imageName,
                imageType: img.imageType,
                imageData: img.imageData,
            })),
            createdAt: new Date().toISOString(),
            mediaType: 'IMAGE',
        };

        try {
            const response = await axios.post('http://localhost:8081/api/posts/create-post', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setSuccessMessage('Post created successfully!');
            setCaption('');
            setImages([]);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Failed to create post.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <Typography variant="h5" textAlign="center" marginBottom={3} fontWeight="bold">
                Add New Post
            </Typography>

            {error && (
                <Typography color="error" marginBottom={2}>
                    {error}
                </Typography>
            )}
            {successMessage && (
                <Typography color="primary" marginBottom={2}>
                    {successMessage}
                </Typography>
            )}

            <TextField
                label="Caption"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                sx={{ marginBottom: '20px' }}
            />

            <Box textAlign="center" marginBottom={3}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                >
                    Upload Images
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={handleImageUpload}
                    />
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center',
                    marginBottom: '20px',
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <img
                            src={image.imageData}
                            alt={`Uploaded ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                ))}
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit Post'}
            </Button>
        </Box>
    );
};

export default AddPostPage;
