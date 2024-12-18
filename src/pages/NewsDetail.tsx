import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import NavbarCust from '../components/navbar/NavbarCust';
import SidebarCust from '../components/navbar/SidebarCust';

const NewsDetail: React.FC = () => {
    const [isFriendListOpen, setFriendListOpen] = useState(false);
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
            <NavbarCust title="News" />
            <SidebarCust handleOpenChat={() => setFriendListOpen(true)} />
            <Typography
                variant="h4"
                fontWeight="bold"
                marginBottom={3}
                textAlign="center"
                color='white'
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
                sx={{ lineHeight: 1.8, color: '#888' }}
            >
                {article.description || 'No description available.'}
            </Typography>
            <Button
                variant="contained"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: '10px', backgroundColor: 'white', color: '#888', fontSize: '14px', fontWeight: 'bold' }}
            >
                Read Full Article
            </Button>
        </Box>
    );
};

export default NewsDetail;
