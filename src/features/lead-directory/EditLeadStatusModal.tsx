import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { LeadStatusData } from './LeadStatusTable';

export interface EditLeadStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    statusData: LeadStatusData | null;
    onSave: (updated: LeadStatusData) => void;
}

export const EditLeadStatusModal = ({ isOpen, onClose, statusData, onSave }: EditLeadStatusModalProps) => {
    const [formData, setFormData] = useState<LeadStatusData | null>(null);

    useEffect(() => {
        if (isOpen && statusData) {
            setFormData({ ...statusData });
        }
    }, [isOpen, statusData]);

    if (!isOpen || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: name === 'orderLevel' ? Number(value) : value } : null);
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
                    <h2>Edit Lead Status</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editStatusName">Name</label>
                        <input
                            type="text"
                            id="editStatusName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Admission Complete"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editOrderLevel">Order Level</label>
                        <input
                            type="number"
                            id="editOrderLevel"
                            name="orderLevel"
                            value={formData.orderLevel}
                            onChange={handleChange}
                            min={1}
                            placeholder="e.g. 1"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editLeadStatus">Status</label>
                        <select
                            id="editLeadStatus"
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
                    <button
                        style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: 'var(--text-primary)', cursor: 'pointer' }}
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
