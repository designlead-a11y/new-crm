import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { CampaignPlatformData } from './CampaignPlatformTable';

interface EditCampaignPlatformModalProps {
    isOpen: boolean;
    onClose: () => void;
    platformData: CampaignPlatformData | null;
    onSave: (updated: CampaignPlatformData) => void;
}

export const EditCampaignPlatformModal = ({ isOpen, onClose, platformData, onSave }: EditCampaignPlatformModalProps) => {
    const [formData, setFormData] = useState<CampaignPlatformData | null>(null);

    useEffect(() => {
        if (isOpen && platformData) {
            setFormData({ ...platformData });
        }
    }, [isOpen, platformData]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSave = () => {
        if (formData) onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Campaign Platform</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editPlatformName">Platform Name</label>
                        <input
                            type="text"
                            id="editPlatformName"
                            name="platformName"
                            value={formData.platformName}
                            onChange={handleChange}
                            placeholder="e.g. Google Ads"
                            className='form-control'
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
                    <button className="action-btn primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};
