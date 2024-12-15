import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const AddPostPage = () => {
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        setImages((prevImages) => [...prevImages, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = () => {
        const postData = {
            caption,
            images,
        };

        console.log('Post Data:', postData);
        // Add your logic to send this data to the server or process it further
    };

    return (
        <Box
            sx={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <Typography
                variant="h5"
                textAlign="center"
                marginBottom={3}
                fontWeight="bold"
            >
                Add New Post
            </Typography>

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
                            src={image}
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
            >
                Submit Post
            </Button>
        </Box>
    );
};

export default AddPostPage;
