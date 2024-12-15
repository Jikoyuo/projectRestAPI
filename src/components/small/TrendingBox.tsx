import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

type TrendingBoxProps = {
    trendingData: any[];
};

const TrendingBox: React.FC<TrendingBoxProps> = ({ trendingData }) => {
    return (
        <Box
            sx={{
                position: 'fixed',  // Membuat box tetap berada di tempat meskipun halaman digulir
                top: 250,             // Jarak dari atas
                width: '100%',
                maxWidth: 400,
                bgcolor: 'white',
                boxShadow: 3,
                padding: 2,
                zIndex: 10,          // Menjaga box tetap di atas konten lain jika ada overlap
            }}
        >
            <Typography variant="h6" gutterBottom>
                Trending Posts
            </Typography>
            {trendingData.map((item) => (
                <Card key={item.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle1">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default TrendingBox;
