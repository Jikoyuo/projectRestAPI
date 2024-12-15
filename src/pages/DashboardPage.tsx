import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarCust from '../components/navbar/NavbarCust';
import SidebarCust from '../components/navbar/SidebarCust';
import CardContentCust from '../components/medium/CardContentCust';
import FriendListModal from '../components/medium/FriendlistModal';
import ChatModal from '../components/medium/ChatModal';
import WeatherWidget from '../components/weather/WeatherWidget';
import AlertSuccess from '../components/small/AlertSuccess';
import { useLocation, useNavigate } from 'react-router-dom';

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
        const dummyData = [
            {
                id: 1,
                title: "Info mabar",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"],
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"]
            },
            {
                id: 2,
                title: "Gabut nih",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"],
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"]
            },
            {
                id: 3,
                title: "Ganyang FUFUFAFA",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"],
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"]
            },
            {
                id: 4,
                title: "M6 ?",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"],
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"]
            },
            {
                id: 5,
                title: "Douyin",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"],
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"]
            },
            {
                id: 6,
                title: "Prankster",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"],
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"]
            },
            {
                id: 7,
                title: "Mulyono penipu ?",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"],
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"]
            },
            {
                id: 8,
                title: "Kim Jong Un menguasai korea selatan",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"],
                description: "tes search, anjay",
                comment: ["tes", "LUCU !"]
            },
            {
                id: 9,
                title: "Malaydesh",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"],
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"]
            },
            {
                id: 10,
                title: "Manchester United Treble Winner !",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"],
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"]
            },
        ];
        setData(dummyData);
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredData = data.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.comment.some((comment: string) => comment.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    useEffect(() => {
        if (location.state && location.state.loginSuccess) {
            setAlertOpen(true);
            setTimeout(() => setAlertOpen(false), 2000);
            navigate(location.pathname, { replace: true, state: undefined });
        }
    }, [location.state, navigate]);

    return (
        <Box>
            <NavbarCust title="Home" />
            <SidebarCust handleOpenChat={() => setFriendListOpen(true)} />
            <AlertSuccess
                open={alertOpen}
                title="Success!"
                description="Your action was completed successfully."
                onClose={() => setAlertOpen(false)}
            />
            <Box display="flex" justifyContent="center" alignItems="center" mt={3} sx={{ width: '100%' }}>
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
                            '& fieldset': { borderColor: '#ccc' },
                            '&:hover fieldset': { borderColor: '#888' },
                            '&.Mui-focused fieldset': { borderColor: '#2c2c2c' },
                        },
                        '& .MuiInputLabel-root': { color: 'white' },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-input': { color: 'white' },
                    }}
                />
            </Box>

            <Box ml={'15%'} display="flex" justifyContent="center" alignItems="center" mt="5%" flexDirection="column" gap={6} sx={{
                '@media (max-width: 600px)': {
                    width: '70%',
                    gap: 3,
                    ml: '17%'
                },
                '@media (min-width: 600px) and (max-width: 960px)': {
                    width: '70%',
                },
                '@media (min-width: 960px)': {
                    width: '70%',
                },
            }}>
                <Box>
                    {filteredData.map((item) => (
                        <CardContentCust
                            key={item.id}
                            title={item.title}
                            date={item.date}
                            images={item.image}
                            description={item.description}
                            comments={item.comment}
                        />
                    ))}
                </Box>
            </Box>


            {/* <WeatherWidget /> */}

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
