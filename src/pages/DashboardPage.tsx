import { Box, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarCust from '../components/navbar/NavbarCust';
import SidebarCust from '../components/navbar/SidebarCust';
import CardContentCust from '../components/medium/CardContentCust';
import FriendListModal from '../components/medium/FriendlistModal';
import ChatModal from '../components/medium/ChatModal';
import WeatherWidget from '../components/weather/WeatherWidget';
import AlertSuccess from '../components/small/AlertSuccess';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardPage() {
    const [isFriendListOpen, setFriendListOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<'user' | 'partner' | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const showSuccessAlert = () => {
        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false);
        }, 2000);
    };

    useEffect(() => {
        axios.get('http://localhost:8081/api/posts/home-page')
            .then((response) => {
                if (response.data.code === "200") {
                    setData(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.error('Failed to fetch data');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredData = (data && Array.isArray(data)) ? data.filter((item) => {
        return (
            item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }) : [];

    useEffect(() => {
        if (location.state && location.state.loginSuccess) {
            showSuccessAlert()

            navigate(location.pathname, { replace: true, state: undefined }) //clear state
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state, navigate])

    return (
        <Box>
            <NavbarCust title='Home' />
            <SidebarCust handleOpenChat={() => setFriendListOpen(true)} />
            <AlertSuccess
                open={alertOpen}
                title="Success!"
                description="Your action was completed successfully."
                onClose={handleAlertClose}
            />

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={3}
                sx={{ width: '100%' }}

            >
                <TextField
                    label="Search Username or Tweet"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{
                        maxWidth: 600,
                        '& .MuiOutlinedInput-root': {
                            bgcolor: '#2c2c2c',
                            borderRadius: '16px',
                            '& fieldset': {
                                borderColor: '#ccc',
                            },
                            '&:hover fieldset': {
                                borderColor: '#888',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2c2c2c',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                    }}
                />

            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt="5%" flexDirection="column" gap={6}>
                <Box  >
                    {filteredData.map((item) => (
                        console.log(item.postId),
                        <CardContentCust
                            key={item.postId}
                            title={item.user.username}
                            date={item.createdAt}
                            images={item.mediaUrl.map((media: any) => media.imageName)}
                            description={item.caption}
                            comments={item.comments}
                            likes={item.likes}
                            postId={item.postId}
                        />
                    ))}
                </Box>
            </Box>

            <WeatherWidget />

            <FriendListModal
                open={isFriendListOpen}
                handleClose={() => setFriendListOpen(false)}
                handleSelectFriend={(friendName) => {
                    setSelectedFriend(friendName);
                    setFriendListOpen(false);
                    setOpenChat(true);
                }}
            />

            {selectedFriend && (
                <ChatModal
                    open={openChat}
                    handleClose={() => setOpenChat(false)}
                    friendName={selectedFriend === 'user' ? 'Partner' : 'User'}
                    socket={socket}
                    username={selectedFriend}
                />
            )}
        </Box>
    );
}
