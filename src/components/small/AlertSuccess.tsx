import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface AlertSuccessProps {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
}

const AlertSuccess: React.FC<AlertSuccessProps> = ({ open, title, description, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                <strong>{title}</strong>
                <div>{description}</div>
            </Alert>
        </Snackbar>
    );
};

export default AlertSuccess;
