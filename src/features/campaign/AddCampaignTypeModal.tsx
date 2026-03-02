import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCampaignTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: { name: string; campaignPlatform: string; status: 'Active' | 'Inactive' }) => void;
    platforms: Array<{ id: number; platformName: string }>;
}

export const AddCampaignTypeModal = ({ isOpen, onClose, onAdd, platforms }: AddCampaignTypeModalProps) => {
    const [formData, setFormData] = useState({ name: '', campaignPlatform: '', status: 'Active' as 'Active' | 'Inactive' });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
    };

    const handleAdd = () => {
        if (formData.name.trim() && formData.campaignPlatform.trim()) {
            onAdd(formData);
            setFormData({ name: '', campaignPlatform: '', status: 'Active' });
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add Campaign Type</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="typeName">Name</label>
                        <input
                            type="text"
                            id="typeName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Search Campaign"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="campaignPlatform">Campaign Platform</label>
                        <select
                            id="campaignPlatform"
                            name="campaignPlatform"
                            value={formData.campaignPlatform}
                            onChange={handleChange}
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
                        <label htmlFor="typeStatus">Status</label>
                        <select id="typeStatus" name="status" value={formData.status} onChange={handleChange}>
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
                    <button className="action-btn primary" onClick={handleAdd}>Add Campaign Type</button>
                </div>
            </div>
        </div>
    );
};
