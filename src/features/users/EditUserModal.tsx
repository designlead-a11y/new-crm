import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { User } from '../../types/User';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: User | null;
    onSave: (user: User) => void;
}

export const EditUserModal = ({ isOpen, onClose, userData, onSave }: EditUserModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        if (isOpen && userData) {
            setFormData({ ...userData });
        }
    }, [isOpen, userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSave = () => {
        if (formRef.current) {
            if (!formRef.current.checkValidity()) {
                formRef.current.reportValidity();
                return;
            }
        }
        if (formData && userData) {
            onSave({ ...userData, ...(formData as User) });
            onClose();
        }
    };

    if (!isOpen || !userData) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
                <div className="modal-header">
                    <h2>Edit User</h2>
                    <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
                </div>
                <form ref={formRef} className="modal-body">
                    <div className="row">
                        <div className="col-12 col-md-4 mb-2">
                            <label>Name <span style={{ color: 'red' }}>*</span></label>
                            <input required type="text" name="name" className="form-control" value={formData.name || ''} onChange={handleChange} placeholder="Enter name" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>User Type <span style={{ color: 'red' }}>*</span></label>
                            <select required name="userType" className="form-control" value={formData.userType || ''} onChange={handleChange}>
                                <option>Super Admin</option>
                                <option>Admin</option>
                                <option>User</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>User Code <span style={{ color: 'red' }}>*</span></label>
                            <input required type="text" name="userCode" className="form-control" value={formData.userCode || ''} onChange={handleChange} placeholder="Enter usercode" />
                        </div>
                        <div className="col-12 mb-2">
                            <label>Address <span style={{ color: 'red' }}>*</span></label>
                            <textarea required name="address" className="form-control" value={formData.address || ''} onChange={handleChange} placeholder="Enter Address" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>Email <span style={{ color: 'red' }}>*</span></label>
                            <input required type="email" name="email" className="form-control" value={formData.email || ''} onChange={handleChange} placeholder="Enter email" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>Contact Number <span style={{ color: 'red' }}>*</span></label>
                            <input required type="text" name="phone" className="form-control" value={formData.phone || ''} onChange={handleChange} placeholder="Enter number" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>WhatsApp Number</label>
                            <input type="text" name="whatsapp" className="form-control" value={formData.whatsapp || ''} onChange={handleChange} placeholder="Enter number" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>Additional Phone Number</label>
                            <input type="text" name="additionalPhone" className="form-control" value={formData.additionalPhone || ''} onChange={handleChange} placeholder="Enter number" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>Gender <span style={{ color: 'red' }}>*</span></label>
                            <select required name="gender" className="form-control" value={formData.gender || ''} onChange={handleChange}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>Aadhar Number</label>
                            <input type="text" name="aadhar" className="form-control" value={formData.aadhar || ''} onChange={handleChange} placeholder="Enter number" />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <label>PAN Number</label>
                            <input type="text" name="pan" className="form-control" value={formData.pan || ''} onChange={handleChange} placeholder="Enter number" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-12 mb-2">
                            <label>Password</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input type="checkbox" name="manuallySetPassword" checked={formData.manuallySetPassword || false} onChange={handleChange} /> Set Password Manually
                            </div>
                            {formData.manuallySetPassword && (
                                <input type="password" name="password" className="form-control" value={formData.password || ''} onChange={handleChange} placeholder="Enter password" style={{ marginTop: '0.5rem' }} />
                            )}
                        </div>
                        <div className="col-12 mb-2">
                            <label>Status</label>
                            <select name="status" className="form-control" value={formData.status || ''} onChange={handleChange}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div className="modal-footer">
                    <button className="action-btn" onClick={onClose}>Cancel</button>
                    <button className="action-btn primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;