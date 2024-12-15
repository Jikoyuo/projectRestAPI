import { Box, TextField, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarCust from '../components/navbar/NavbarCust';
import SidebarCust from '../components/navbar/SidebarCust';
import CardContentCust from '../components/medium/CardContentCust';
import FriendListModal from '../components/medium/FriendlistModal';
import ChatModal from '../components/medium/ChatModal';
import WeatherWidget from '../components/weather/WeatherWidget';
import TrendingBox from '../components/small/TrendingBox'; // Import TrendingBox

export default function DashboardPage() {
    const [isFriendListOpen, setFriendListOpen] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<'user' | 'partner' | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [data, setData] = useState<any[]>([]); // State for storing data
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

    // Dummy data to simulate API
    useEffect(() => {
        const dummyData = [
            {
                id: 1,
                title: "Info mabar",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"] // Change to array
            },
            {
                id: 2,
                title: "Gabut nih",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"] // Change to array
            },
            {
                id: 3,
                title: "Ganyang FUFUFAFA",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"] // Change to array
            },
            {
                id: 4,
                title: "M6 ?",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"] // Change to array
            },
            {
                id: 5,
                title: "Douyin",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"] // Change to array
            },
            {
                id: 6,
                title: "Prankster",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"] // Change to array
            },
            {
                id: 7,
                title: "Mulyono penipu ?",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"] // Change to array
            },
            {
                id: 8,
                title: "Kim Jong Un menguasai korea selatan",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !", "HAH ??!", "SERIUS ?!"] // Change to array
            },
            {
                id: 9,
                title: "Malaydesh",
                date: "September 14, 2016",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests.",
                comment: ["tes"] // Change to array
            },
            {
                id: 10,
                title: "Manchester United Treble Winner !",
                date: "March 10, 2020",
                image: ["/src/assets/img/file.jpg"], // Change to array
                description: "A quick and easy stir fry recipe that's packed with fresh vegetables.",
                comment: ["tes", "LUCU !"] // Change to array
            },
        ];
        setData(dummyData);
    }, []);

    // Search function to filter tweets and users
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Filter data based on search query
    const filteredData = data.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.comment.some((comment: string) => comment.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    // Sort data by number of comments to find the "trending" posts
    const trendingData = [...data].sort((a, b) => b.comment.length - a.comment.length).slice(0, 3); // Top 3 trending posts

    const isMobile = useMediaQuery('(max-width:1500px)');

    return (
        <Box>
            <NavbarCust title='Search' />
            <SidebarCust handleOpenChat={() => setFriendListOpen(true)} />

            {/* Search Bar */}
            <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
                <TextField
                    label="Search Username or Tweet"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{ maxWidth: 600, bgcolor: 'white' }}
                />
            </Box>

            <Box display="flex" justifyContent="center" alignItems="center" mt="5%" flexDirection="column" gap={6}>
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

            {/* Trending Box */}
            {!isMobile && (
                <TrendingBox trendingData={trendingData} />
            )}

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
