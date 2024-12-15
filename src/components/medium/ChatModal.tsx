import React, { useEffect, useState } from 'react';
import { Box, Modal, Avatar, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ChatModalProps {
    open: boolean;
    handleClose: () => void;
    friendName: string;
    socket: WebSocket | null;
    username: 'user' | 'partner';
}

export default function ChatModal({ open, handleClose, friendName, socket, username }: ChatModalProps) {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'partner'; text: string }[]>([]);

    useEffect(() => {
        if (open) {
            const storedChat = localStorage.getItem(`chatHistory_${username}`);
            if (storedChat) {
                const { messages, timestamp } = JSON.parse(storedChat);
                const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; 
                const now = Date.now();

                if (now - timestamp < threeDaysInMillis) {
                    setChatMessages(messages);
                } else {
                    localStorage.removeItem(`chatHistory_${username}`);
                    setChatMessages([]);
                }
            }
        }
    }, [open, username]);

    useEffect(() => {
        if (socket) {
            const handleIncomingMessage = (event: MessageEvent) => {
                let messageData: string;

                if (event.data instanceof Blob) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        messageData = reader.result as string;
                        processMessage(messageData);
                    };
                    reader.readAsText(event.data);
                } else {
                    messageData = event.data;
                    processMessage(messageData);
                }
            };

            const processMessage = (data: string) => {
                try {
                    const reply = JSON.parse(data);
                    console.log('Incoming message:', reply); 
                    if (reply.sender === "user" || reply.sender === "partner") {
                        
                        setChatMessages((prevMessages) => [
                            ...prevMessages,
                            { sender: reply.sender, text: reply.text },
                        ]);

                        
                        const chatHistory = {
                            messages: [
                                ...chatMessages,
                                { sender: reply.sender, text: reply.text },
                            ],
                            timestamp: Date.now(),
                        };
                        localStorage.setItem(`chatHistory_${username}`, JSON.stringify(chatHistory));
                    }
                } catch (error) {
                    console.error('Failed to parse message:', error);
                }
            };

            socket.onmessage = handleIncomingMessage;

            return () => {
                socket.onmessage = null;
            };
        }
    }, [socket, chatMessages]); 

    const handleSendMessage = () => {
        if (message.trim() && socket) {
            const newMessage = { sender: username, text: message };
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);

            const chatHistory = {
                messages: [...chatMessages, newMessage],
                timestamp: Date.now(),
            };
            localStorage.setItem(`chatHistory_${username}`, JSON.stringify(chatHistory));

            socket.send(JSON.stringify(newMessage));
            setMessage('');
        }
    };

    const handleDeleteChatHistory = () => {
        localStorage.removeItem(`chatHistory_${username}`);
        setChatMessages([]);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#1f1f1f',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center">
                        <Avatar alt={friendName} src="/static/images/avatar/1.jpg" />
                        <Typography variant="h6" ml={2}>
                            {friendName}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        bgcolor: '#2c2c2c',
                        borderRadius: '10px',
                        height: '300px',
                        overflowY: 'auto',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    {chatMessages.map((msg, index) => {
                        const isUser = username === 'user';
                        const isSenderUser = msg.sender === 'user';

                        return (
                            <Box
                                key={index}
                                sx={{
                                    alignSelf: isSenderUser ? (isUser ? 'flex-end' : 'flex-start') : (isUser ? 'flex-start' : 'flex-end'), // Posisi bubble chat
                                    bgcolor: isSenderUser ? (isUser ? '#B0BEC5' : '#1e88e5') : (isUser ? '#1e88e5' : '#B0BEC5'), // Warna bubble chat
                                    color: 'white',
                                    p: 1,
                                    borderRadius: '15px',
                                    maxWidth: '70%',
                                }}
                            >
                                {msg.text}
                            </Box>
                        );
                    })}
                </Box>

                <Box display="flex" alignItems="center" mt={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Ketik pesan Anda"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{
                            input: { color: 'white' },
                            bgcolor: '#2c2c2c',
                            borderRadius: '5px',
                        }}
                    />
                    <Button onClick={handleSendMessage} sx={{ ml: 2, bgcolor: '#3b3b3b' }}>
                        Kirim
                    </Button>
                </Box>

             
                <Button
                    onClick={handleDeleteChatHistory}
                    sx={{ mt: 2, bgcolor: '#d32f2f', color: 'white' }}
                >
                    Hapus Riwayat
                </Button>
            </Box>
        </Modal>
    );
}
