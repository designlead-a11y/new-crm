import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { CourseCategoryData } from './CourseCategoryTable';

interface EditCourseCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryData: CourseCategoryData | null;
    onSave: (updated: CourseCategoryData) => void;
}

export const EditCourseCategoryModal = ({ isOpen, onClose, categoryData, onSave }: EditCourseCategoryModalProps) => {
    const [formData, setFormData] = useState<CourseCategoryData | null>(null);

    useEffect(() => {
        if (isOpen && categoryData) {
            setFormData({ ...categoryData });
        }
    }, [isOpen, categoryData]);

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
                    <h2>Edit Course Category</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editCategoryName">Name</label>
                        <input
                            type="text"
                            id="editCategoryName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Software Development"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editCategoryStatus">Status</label>
                        <select id="editCategoryStatus" name="status" value={formData.status} onChange={handleChange}>
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
