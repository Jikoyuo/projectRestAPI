import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NewsDetail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const article = location.state?.article;

    if (!article) {
        return (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    Article not found.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
                    sx={{ marginTop: '20px' }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                marginBottom={3}
                textAlign="center"
            >
                {article.title}
            </Typography>
            {article.urlToImage && (
                <Box
                    component="img"
                    src={article.urlToImage}
                    alt="News Image"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                        marginBottom: '20px',
                    }}
                />
            )}
            <Typography
                variant="body1"
                marginBottom={2}
                sx={{ lineHeight: 1.8, color: 'text.secondary' }}
            >
                {article.description || 'No description available.'}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: '10px' }}
            >
                Read Full Article
            </Button>
        </Box>
    );
};

export default NewsDetail;
