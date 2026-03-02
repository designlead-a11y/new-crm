import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { AffiliateData } from './AffiliateTable';

interface EditAffiliateModalProps {
    isOpen: boolean;
    onClose: () => void;
    affiliateData: AffiliateData | null;
    onSave: (updated: AffiliateData) => void;
}

export const EditAffiliateModal = ({ isOpen, onClose, affiliateData, onSave }: EditAffiliateModalProps) => {
    const [formData, setFormData] = useState<AffiliateData | null>(null);

    useEffect(() => {
        if (isOpen && affiliateData) {
            setFormData({ ...affiliateData });
        }
    }, [isOpen, affiliateData]);

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
                    <h2>Edit Affiliate</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="editAffiliateName">Name</label>
                        <input
                            type="text"
                            id="editAffiliateName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Affiliate full name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAffiliateNick">Nick Name</label>
                        <input
                            type="text"
                            id="editAffiliateNick"
                            name="nickName"
                            value={formData.nickName}
                            onChange={handleChange}
                            placeholder="Optional nick name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAffiliateAdmission">Admission</label>
                        <input
                            type="text"
                            id="editAffiliateAdmission"
                            name="admission"
                            value={formData.admission}
                            onChange={handleChange}
                            placeholder="e.g. Allowed / Closed"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editAffiliateStatus">Status</label>
                        <select id="editAffiliateStatus" name="status" value={formData.status} onChange={handleChange}>
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
