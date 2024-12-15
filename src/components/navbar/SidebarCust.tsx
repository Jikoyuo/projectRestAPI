import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { Box, IconButton, Tooltip } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

interface SidebarCustProps {
    handleOpenChat: () => void;
}

export default function SidebarCust({ handleOpenChat }: SidebarCustProps) {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                width: 60,
                position: 'fixed',
                right: 20,
                top: '20%',
                bgcolor: '#2c2c2c',
                borderRadius: '10px',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: 2,
            }}
        >
            <IconButton onClick={handleOpenChat} sx={{ color: 'white' }}>
                <ChatIcon />
            </IconButton>
            <Tooltip title="Home" placement='left' >
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/dashboard')} >
                    <HomeIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Search" placement='left' >
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/search')} >
                    <SearchIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Add Post" placement='left' >
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/addPost')} >
                    <AddCircleIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Tooltip title="News" placement='left' >
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/news')}>
                    <NewspaperRoundedIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <IconButton sx={{ color: 'white' }}>
                <FavoriteIcon fontSize="large" />
            </IconButton>

            <Tooltip title="Profile" placement='left' >
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/profile')} >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}