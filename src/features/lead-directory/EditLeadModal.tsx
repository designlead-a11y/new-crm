import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface LeadData {
    id: number;
    name: string;
    nickName: string;
    status: string;
}

export interface EditLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadData: LeadData | null;
    onSave: (updatedLead: LeadData) => void;
}

export const EditLeadModal = ({ isOpen, onClose, leadData, onSave }: EditLeadModalProps) => {
    const [formData, setFormData] = useState<LeadData | null>(null);

    // Sync form data when a new lead is passed in or when modal opens
    useEffect(() => {
        if (isOpen && leadData) {
            setFormData(leadData);
        }
    }, [isOpen, leadData]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => prev ? { ...prev, [name]: value } : null);
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Lead Source</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editLeadName">Lead Name</label>
                        <input
                            type="text"
                            id="editLeadName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Google Ads Campaign"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editNickName">Nick Name</label>
                        <input
                            type="text"
                            id="editNickName"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                            placeholder="e.g. GAds"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editStatus">Status</label>
                        <select
                            id="editStatus"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn"
                        style={{
                            padding: '0.5rem 1rem',
                            background: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                        }}
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button className="action-btn primary" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};
