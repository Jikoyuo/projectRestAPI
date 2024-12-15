import React from 'react';
import { Box, Modal, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface FriendListModalProps {
    open: boolean;
    handleClose: () => void;
    handleSelectFriend: (friendName: 'user' | 'partner') => void;
}

const friends = ['user', 'partner']; 

export default function FriendListModal({ open, handleClose, handleSelectFriend }: FriendListModalProps) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: '#1f1f1f',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6">Daftar Teman</Typography>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {friends.map((friend) => (
                        <ListItem
                            button
                            key={friend}
                            onClick={() => handleSelectFriend(friend as 'user' | 'partner')} 
                            sx={{ cursor: 'pointer' }}
                        >
                            <ListItemText primary={friend.charAt(0).toUpperCase() + friend.slice(1)} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
}
