import { useState, useCallback } from 'react';

export type SnackbarType = 'success' | 'danger' | 'warning' | 'info';

export interface SnackbarState {
    isOpen: boolean;
    message: string;
    type: SnackbarType;
}

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        isOpen: false,
        message: '',
        type: 'success',
    });

    const showSnackbar = useCallback((message: string, type: SnackbarType = 'success') => {
        setSnackbar({
            isOpen: true,
            message,
            type,
        });

        // Auto-hide after 3 seconds
        setTimeout(() => {
            setSnackbar(prev => ({ ...prev, isOpen: false }));
        }, 3000);
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar(prev => ({ ...prev, isOpen: false }));
    }, []);

    return {
        snackbar,
        showSnackbar,
        hideSnackbar,
    };
};
