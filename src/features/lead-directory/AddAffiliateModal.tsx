import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddAffiliateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (affiliate: { name: string; nickName: string; admission: string; status: 'Active' | 'Inactive' }) => void;
}

export const AddAffiliateModal = ({ isOpen, onClose, onAdd }: AddAffiliateModalProps) => {
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [admission, setAdmission] = useState('');
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd({ name, nickName, admission, status });
            setName('');
            setNickName('');
            setAdmission('');
            setStatus('Active');
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Add New Affiliate</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="affiliateName">Name</label>
                            <input
                                type="text"
                                id="affiliateName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Affiliate full name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="affiliateNick">Nick Name</label>
                            <input
                                type="text"
                                id="affiliateNick"
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)}
                                placeholder="Optional nick name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="affiliateAdmission">Admission</label>
                            <input
                                type="text"
                                id="affiliateAdmission"
                                value={admission}
                                onChange={(e) => setAdmission(e.target.value)}
                                placeholder="e.g. Allowed / Closed"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="affiliateStatus">Status</label>
                            <select
                                id="affiliateStatus"
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
                            Add Affiliate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
