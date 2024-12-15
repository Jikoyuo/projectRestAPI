import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material';
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
    const isMobile = useMediaQuery('(max-width:800px)');

    const iconSize = isMobile ? 'small' : 'large';

    return (
        <Box
            sx={{
                width: isMobile ? '100%' : 60,
                position: 'fixed',
                bottom: isMobile ? 0 : 'auto',
                left: isMobile ? 0 : 'auto',
                right: isMobile ? 0 : 20,
                top: isMobile ? 'auto' : '20%',
                bgcolor: '#2c2c2c',
                borderRadius: isMobile ? '0' : '10px',
                boxShadow: 3,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                justifyContent: isMobile ? 'space-evenly' : 'center',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                zIndex: 10,
            }}
        >
            <IconButton onClick={handleOpenChat} sx={{ color: 'white' }}>
                <ChatIcon fontSize={iconSize} />
            </IconButton>

            <Tooltip title="Home" placement="left">
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/dashboard')}>
                    <HomeIcon fontSize={iconSize} />
                </IconButton>
            </Tooltip>

            <Tooltip title="Search" placement="left">
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/search')}>
                    <SearchIcon fontSize={iconSize} />
                </IconButton>
            </Tooltip>

            <Tooltip title="Add Post" placement="left">
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/addPost')}>
                    <AddCircleIcon fontSize={iconSize} />
                </IconButton>
            </Tooltip>

            <Tooltip title="News" placement="left">
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/news')}>
                    <NewspaperRoundedIcon fontSize={iconSize} />
                </IconButton>
            </Tooltip>

            <IconButton sx={{ color: 'white' }}>
                <FavoriteIcon fontSize={iconSize} />
            </IconButton>

            <Tooltip title="Profile" placement="left">
                <IconButton sx={{ color: 'white' }} onClick={() => navigate('/profile')}>
                    <AccountCircleIcon fontSize={iconSize} />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
