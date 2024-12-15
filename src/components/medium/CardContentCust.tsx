import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Slider from 'react-slick'; // Import react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface CardContentCustProps {
    title: string;
    date: string;
    images: { imageData: string }[];  // Assuming images is an array of objects with imageData
    description: string;
    comments: string[];
    likes: string;
    postId: string;
}

interface ExpandMoreProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps & React.ComponentProps<typeof IconButton>) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardContentCust({
    title, date, images, description, comments, likes, postId
}: CardContentCustProps) {
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [commentText, setCommentText] = React.useState("");
    const [likeCount, setLikeCount] = React.useState(0);
    const [commentCount, setCommentCount] = React.useState(comments.length);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [userId, setUserId] = useState<string>(Cookies.get('userId') || '');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('images', images);
        if (Array.isArray(likes)) {
            const userLiked = likes.some((like: any) => like?.likedBy?.id === userId);
            setLiked(userLiked);
            setLikeCount(likes.length);
        }
    }, [likes, userId]);

    const handleExpandClick = () => setExpanded(!expanded);
    const handleLikeClick = async (userId: string, postId: string) => {
        const newLikeStatus = !liked;
        setLiked(newLikeStatus);
        const newLikeCount = newLikeStatus ? likeCount + 1 : likeCount - 1;
        setLikeCount(newLikeCount);
    
        try {
            if (newLikeStatus) {
                // Send POST request if the post is liked
                await axios.post(`http://localhost:8081/api/likes/${userId}/${postId}`);
            } else {
                // Send DELETE request if the post is unliked
                await axios.delete(`http://localhost:8081/api/likes/${userId}/${postId}`);
            }
        } catch (error) {
            // If the API call fails, revert the like status and count
            setLiked(!newLikeStatus);
            setLikeCount(likeCount);
        }
    };
    

    const handleCommentClick = () => {
        setCommentCount(commentCount + 1);
        setCommentText("");
    };

    const handleAvatarClick = () => {
        navigate(`/profile/${userId}`);
    };

    const handleCardClick = () => {
        navigate(`/post-detail/${postId}`);
    };

    const isMultipleImages = images.length > 1;

    const sliderRef = React.useRef<Slider | null>(null);

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNextClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handleSlideChange = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Box sx={{ bgcolor: '#2c2c2c', paddingY: '12px', paddingX: '32px', borderRadius: '18px', mb: '12px' }} >
            <Card sx={{
                width: '100%',
                maxWidth: 505,
                height: 'fit-content',
                bgcolor: '#181818',
                color: 'white',
                mb: '10px',
                '@media (max-width: 600px)': {
                    maxWidth: '100%',
                }
            }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500], cursor: 'grab' }} aria-label="recipe" onClick={handleAvatarClick}>
                            {title.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon sx={{ color: 'white' }} />
                        </IconButton>
                    }
                    title={title}
                    subheader={date}
                    sx={{
                        '& .MuiCardHeader-subheader': {
                            color: 'white',
                            fontSize: '14px',
                        },
                    }}
                />

                {isMultipleImages ? (
                    <div style={{ position: 'relative' }}>
                        <Slider
                            ref={sliderRef}
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            afterChange={handleSlideChange}
                        >
                            {images.map((image, index) => (
                                console.log('image', image),
                                <div key={index}>
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={`data:image/png;base64,${image}`}
                                        alt={`image-${index + 1}`}
                                        onClick={handleCardClick}
                                    />
                                </div>
                            ))}
                        </Slider>
                        <Typography
                            sx={{
                                position: 'absolute',
                                top: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                fontSize: '14px',
                                zIndex: 10,
                            }}
                        >
                            {currentIndex + 1}/{images.length}
                        </Typography>
                        <IconButton
                            onClick={handlePrevClick}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                color: 'white',
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNextClick}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                color: 'white',
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                ) : (
                    <CardMedia component="img" height="194" image={`data:image/png;base64,${images}`} alt="image-1" onClick={handleCardClick} />
                )}

                <CardContent onClick={handleCardClick}>
                    <Typography variant="body2" sx={{ color: 'white', fontSize: '14px' }}>
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleLikeClick(userId, postId)}
                        sx={{
                            transition: 'transform 0.2s ease-in-out',
                            transform: liked ? 'scale(1.2)' : 'scale(1)',
                        }}
                    >
                        <FavoriteIcon sx={{ color: liked ? red[500] : 'white' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: 'white', marginLeft: '8px', fontSize: '12px' }}>
                        {likeCount} Likes
                    </Typography>

                    <IconButton
                        aria-label="add comment"
                        onClick={handleCommentClick}
                        sx={{
                            marginLeft: '16px',
                        }}
                    >
                        <CommentIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: 'white', marginLeft: '8px', fontSize: '12px' }}>
                        {commentCount} Comments
                    </Typography>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon sx={{ color: 'white' }} />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>Additional details can go here...</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Box>
    );
}
