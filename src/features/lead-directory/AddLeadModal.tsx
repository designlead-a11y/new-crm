import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface AddLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddLead?: (newLead: { name: string; nickName: string; status: string }) => void;
}

export const AddLeadModal = ({ isOpen, onClose, onAddLead }: AddLeadModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        nickName: '',
        status: 'active' // Changed from 'Active' to 'active' to match option value
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (onAddLead) {
            onAddLead(formData);
        }
        // Form is cleared when reopened or handled in parent
        setFormData({ name: '', nickName: '', status: 'active' }); // Reset to 'active'
        onClose(); // Close the modal after submission
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Lead Source</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="leadName">Lead Name</label>
                        <input
                            type="text"
                            id="leadName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Google Ads Campaign"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickName">Nick Name</label>
                        <input
                            type="text"
                            id="nickName"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                            placeholder="e.g. GAds"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn" style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={onClose}>
                        Cancel
                    </button>
                    <button className="action-btn primary" onClick={handleSubmit}>
                        Save Lead Source
                    </button>
                </div>
            </div>
        </div>
    );
};
