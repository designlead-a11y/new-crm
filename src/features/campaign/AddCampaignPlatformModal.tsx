import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCampaignPlatformModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: { platformName: string }) => void;
}

export const AddCampaignPlatformModal = ({ isOpen, onClose, onAdd }: AddCampaignPlatformModalProps) => {
    const [formData, setFormData] = useState({ platformName: '' });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (formData.platformName.trim()) {
            onAdd(formData);
            setFormData({ platformName: '' });
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Campaign Platform</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="platformName">Platform Name</label>
                        <input
                            type="text"
                            id="platformName"
                            name="platformName"
                            value={formData.platformName}
                            onChange={handleChange}
                            placeholder="e.g. Google Ads"
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer' }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="action-btn primary" onClick={handleAdd}>Add Platform</button>
                </div>
            </div>
        </div>
    );
};
