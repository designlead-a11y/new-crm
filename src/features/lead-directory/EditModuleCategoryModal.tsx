import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { ModuleCategoryData } from './ModuleCategoryTable';

interface EditModuleCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    moduleData: ModuleCategoryData | null;
    onSave: (updated: ModuleCategoryData) => void;
}

export const EditModuleCategoryModal = ({ isOpen, onClose, moduleData, onSave }: EditModuleCategoryModalProps) => {
    const [formData, setFormData] = useState<ModuleCategoryData | null>(null);

    useEffect(() => {
        if (isOpen && moduleData) {
            setFormData({ ...moduleData });
        }
    }, [isOpen, moduleData]);

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
                    <h2>Edit Module Category</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editModuleName">Name</label>
                        <input
                            type="text"
                            id="editModuleName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Frontend Development"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editModuleStatus">Status</label>
                        <select id="editModuleStatus" name="status" value={formData.status} onChange={handleChange}>
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
