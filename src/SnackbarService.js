import React, { useContext, useState, createContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext();

export function SnackbarService({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showSnackbar = (message, severity) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const closeSnackbar = () => {
        setOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
            <div>
                {children}
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={closeSnackbar}
            >
                <Alert onClose={closeSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );

}

export function useSnackbar() {
    return useContext(SnackbarContext);
}
