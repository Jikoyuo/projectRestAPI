import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

type TrendingBoxProps = {
    trendingData: any[];
};

const TrendingBox: React.FC<TrendingBoxProps> = ({ trendingData }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 230,
                width: '100%',
                maxWidth: 400,
                bgcolor: '#2c2c2c',
                boxShadow: 3,
                padding: 2,
                zIndex: 10,
                borderRadius: '16px'
            }}
        >
            <Typography color='white' variant="h6" gutterBottom>
                Trending Posts
            </Typography>
            {trendingData.map((item) => (
                <Card key={item.id} sx={{ marginBottom: 2, bgcolor: '#181818', color: 'white' }}>
                    <CardContent>
                        <Typography color='white' variant="subtitle1">{item.title}</Typography>
                        <Typography color='white' variant="body2">
                            {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default TrendingBox;
