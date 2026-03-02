import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { CampaignTypeData } from './CampaignTypeTable';

interface EditCampaignTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    typeData: CampaignTypeData | null;
    onSave: (updated: CampaignTypeData) => void;
    platforms: Array<{ id: number; platformName: string }>;
}

export const EditCampaignTypeModal = ({ isOpen, onClose, typeData, onSave, platforms }: EditCampaignTypeModalProps) => {
    const [formData, setFormData] = useState<CampaignTypeData | null>(null);

    useEffect(() => {
        if (isOpen && typeData) {
            setFormData({ ...typeData });
        }
    }, [isOpen, typeData]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    <h2>Edit Campaign Type</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editTypeName">Name</label>
                        <input
                            type="text"
                            id="editTypeName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Search Campaign" className='form-control'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editCampaignPlatform">Campaign Platform</label>
                        <select
                            id="editCampaignPlatform"
                            name="campaignPlatform"
                            value={formData.campaignPlatform}
                            onChange={handleChange} className='form-control'
                        >
                            <option value="">Select Platform</option>
                            {platforms.map(platform => (
                                <option key={platform.id} value={platform.platformName}>
                                    {platform.platformName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="editTypeStatus">Status</label>
                        <select id="editTypeStatus" name="status" value={formData.status} onChange={handleChange} className='form-control'>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
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
