import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

interface SearchResult {
    id: number;
    content: string;
    type: 'post' | 'user';
}

interface SearchResultsProps {
    results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (results.length === 0) {
        return (
            <Typography variant="h6" color="textSecondary" align="center">
                No results found.
            </Typography>
        );
    }

    return (
        <Box mt={3}>
            <Typography variant="h6" color="textSecondary" mb={2}>
                Search Results
            </Typography>
            <Grid container spacing={2}>
                {results.map((result) => (
                    <Grid item xs={12} sm={6} md={4} key={result.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="body1">
                                    {result.type === 'post' ? 'Post: ' : 'User: '}
                                    {result.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchResults;
