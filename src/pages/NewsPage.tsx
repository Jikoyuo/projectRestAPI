import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
    Link,
} from '@mui/material';
import { styled } from '@mui/material/styles'; // Gunakan ini untuk memastikan penggunaan theme

type Article = {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
};

const GlassCard = styled(Card)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');

    const apiKey = '646a9395459048808fbfcc427636781f';

    const fetchNews = async (searchQuery: string) => {
        setLoading(true);
        setError(null);

        try {
            const url = searchQuery
                ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`
                : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
            const response = await axios.get(url);
            setArticles(response.data.articles);
        } catch (err) {
            setError('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews('');
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        fetchNews(value); // Fetch news berdasarkan input secara langsung
    };

    return (
        <Box
            sx={{
                fontFamily: 'Arial, sans-serif',
                maxWidth: '800px',
                margin: '0 auto',
                padding: '20px',
            }}
        >
            <Typography
                variant="h4"
                textAlign="center"
                marginBottom={3}
                fontWeight="bold"
                color="primary"
            >
                News
            </Typography>
            <Box textAlign="center" marginBottom={3}>
                <TextField
                    variant="outlined"
                    placeholder="Search for news"
                    value={query}
                    onChange={handleInputChange}
                    sx={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '5px',
                    }}
                />
            </Box>
            {loading && (
                <Box textAlign="center" marginBottom={3}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Typography
                    textAlign="center"
                    color="error"
                    fontSize="16px"
                    marginBottom={3}
                >
                    {error}
                </Typography>
            )}
            <Box>
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <GlassCard key={index}>
                            {article.urlToImage && (
                                <CardMedia
                                    component="img"
                                    image={article.urlToImage}
                                    alt="news"
                                    sx={{
                                        width: '200px',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        '@media (max-width:600px)': {
                                            width: '100%',
                                            height: '150px',
                                        },
                                    }}
                                />
                            )}
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    marginBottom={1}
                                >
                                    {article.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    marginBottom={2}
                                >
                                    {article.description || 'No description available.'}
                                </Typography>
                                <Link
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Read more
                                </Link>
                            </CardContent>
                        </GlassCard>
                    ))
                ) : (
                    <Typography textAlign="center" color="text.secondary">
                        No articles found.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default NewsPage;
