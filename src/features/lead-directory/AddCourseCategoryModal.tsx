import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddCourseCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (category: { name: string; status: 'Active' | 'Inactive' }) => void;
}

export const AddCourseCategoryModal = ({ isOpen, onClose, onAdd }: AddCourseCategoryModalProps) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, status });
            setName('');
            setStatus('Active');
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Course Category</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="categoryName">Name</label>
                            <input
                                type="text"
                                id="categoryName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Software Development"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryStatus">Status</label>
                            <select
                                id="categoryStatus"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'transparent',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '6px',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="action-btn primary">
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
