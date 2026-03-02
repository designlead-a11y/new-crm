import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { SnackbarType } from '../../hooks/useSnackbar';

interface SnackbarProps {
    isOpen: boolean;
    message: string;
    type?: SnackbarType;
    onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
    isOpen,
    message,
    type = 'success',
    onClose
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} className="snackbar-icon" />;
            case 'danger':
                return <XCircle size={20} className="snackbar-icon" />;
            case 'warning':
                return <AlertTriangle size={20} className="snackbar-icon" />;
            case 'info':
            default:
                return <Info size={20} className="snackbar-icon" />;
        }
    };

    return (
        <div className="snackbar-container">
            <div className={`snackbar ${type}`}>
                <div className="snackbar-content">
                    {getIcon()}
                    <span className="snackbar-message">{message}</span>
                </div>
                <button className="snackbar-close" onClick={onClose} aria-label="Close notification">
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};
