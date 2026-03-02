import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { LeadSourceTable } from '../features/lead-directory/LeadSourceTable';
import type { LeadData } from '../features/lead-directory/LeadSourceTable';
import { LeadStatusTable } from '../features/lead-directory/LeadStatusTable';
import type { LeadStatusData } from '../features/lead-directory/LeadStatusTable';
import { EditLeadStatusModal } from '../features/lead-directory/EditLeadStatusModal';
import { CourseCategoryTable } from '../features/lead-directory/CourseCategoryTable';
import type { CourseCategoryData } from '../features/lead-directory/CourseCategoryTable';
import { EditCourseCategoryModal } from '../features/lead-directory/EditCourseCategoryModal';
import { ModuleCategoryTable } from '../features/lead-directory/ModuleCategoryTable';
import type { ModuleCategoryData } from '../features/lead-directory/ModuleCategoryTable';
import { AddModuleCategoryModal } from '../features/lead-directory/AddModuleCategoryModal';
import { EditModuleCategoryModal } from '../features/lead-directory/EditModuleCategoryModal';
import { AffiliateTable } from '../features/lead-directory/AffiliateTable';
import type { AffiliateData } from '../features/lead-directory/AffiliateTable';
import { AddAffiliateModal } from '../features/lead-directory/AddAffiliateModal';
import { EditAffiliateModal } from '../features/lead-directory/EditAffiliateModal';
import { AddLeadModal } from '../features/lead-directory/AddLeadModal';
import { AddCourseCategoryModal } from '../features/lead-directory/AddCourseCategoryModal';
import { EditLeadModal } from '../features/lead-directory/EditLeadModal';
import { DeleteConfirmationModal } from '../components/common/DeleteConfirmationModal';
import { Snackbar } from '../components/common/Snackbar';
import { useSnackbar } from '../hooks/useSnackbar';

interface LeadDirectoryProps {
    setActivePage: (page: string) => void;
}

export const LeadDirectory = ({ setActivePage }: LeadDirectoryProps) => {
    const tabs = [
        'Lead Source', 'Lead Status', 'Course Category', 'Module Category',
        'Affiliate', 'Course Plan', 'Payment Method', 'Deduction Reason',
        'Settlement Status', 'Zone', 'Royalty Rule', 'Billing Plan', 'Currency'
    ];
    const [activeTab, setActiveTab] = useState('Lead Source');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [sources, setSources] = useState<LeadData[]>([]);
    const [editingLead, setEditingLead] = useState<LeadData | null>(null);
    const [deletingLead, setDeletingLead] = useState<LeadData | null>(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

    const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

    // Lead Status state
    const [leadStatuses, setLeadStatuses] = useState<LeadStatusData[]>([
        { id: 1, slNo: 1, name: 'Admission Complete', orderLevel: 1, status: 'inactive' },
    ]);
    const [editingStatus, setEditingStatus] = useState<LeadStatusData | null>(null);

    const handleSaveStatus = (updated: LeadStatusData) => {
        setLeadStatuses(prev => prev.map(s => s.id === updated.id ? updated : s));
        setEditingStatus(null);
        showSnackbar('Lead status updated successfully', 'success');
    };

    // Course Category state
    const [categories, setCategories] = useState<CourseCategoryData[]>([
        { id: 1, name: 'Software Development', status: 'Active' },
        { id: 2, name: 'Digital Marketing', status: 'Active' },
        { id: 3, name: 'Data Science', status: 'Inactive' },
    ]);
    const [editingCategory, setEditingCategory] = useState<CourseCategoryData | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<CourseCategoryData | null>(null);

    const handleSaveCategory = (updated: CourseCategoryData) => {
        setCategories(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEditingCategory(null);
        showSnackbar('Course category updated successfully', 'success');
    };

    const handleDeleteCategoryClick = (id: number) => {
        const cat = categories.find(c => c.id === id);
        if (cat) setDeletingCategory(cat);
    };

    const confirmDeleteCategory = () => {
        if (deletingCategory) {
            setCategories(prev => prev.filter(c => c.id !== deletingCategory.id));
            setDeletingCategory(null);
            showSnackbar('Course category deleted successfully', 'danger');
        }
    };

    const handleAddCategory = (newCat: { name: string; status: 'Active' | 'Inactive' }) => {
        setCategories(prev => [...prev, { ...newCat, id: Date.now() }]);
        setIsAddCategoryModalOpen(false);
        showSnackbar('Course category added successfully', 'success');
    };

    // Module Category state
    const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
    const [modules, setModules] = useState<ModuleCategoryData[]>([
        { id: 1, name: 'React Basics', status: 'Active' },
        { id: 2, name: 'Node.js Advanced', status: 'Active' },
        { id: 3, name: 'Database Design', status: 'Inactive' },
    ]);
    const [editingModule, setEditingModule] = useState<ModuleCategoryData | null>(null);
    const [deletingModule, setDeletingModule] = useState<ModuleCategoryData | null>(null);

    const handleSaveModule = (updated: ModuleCategoryData) => {
        setModules(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingModule(null);
        showSnackbar('Module category updated successfully', 'success');
    };

    const handleDeleteModuleClick = (id: number) => {
        const module = modules.find(m => m.id === id);
        if (module) setDeletingModule(module);
    };

    const confirmDeleteModule = () => {
        if (deletingModule) {
            setModules(prev => prev.filter(m => m.id !== deletingModule.id));
            setDeletingModule(null);
            showSnackbar('Module category deleted successfully', 'danger');
        }
    };

    const handleAddModule = (newModule: { name: string; status: 'Active' | 'Inactive' }) => {
        setModules(prev => [...prev, { ...newModule, id: Date.now() }]);
        setIsAddModuleModalOpen(false);
        showSnackbar('Module category added successfully', 'success');
    };

    // Affiliate state
    const [isAddAffiliateModalOpen, setIsAddAffiliateModalOpen] = useState(false);
    const [affiliates, setAffiliates] = useState<AffiliateData[]>([
        { id: 1, name: 'John Doe', nickName: 'JD', admission: 'Allowed', status: 'Active' },
        { id: 2, name: 'Jane Smith', nickName: 'JS', admission: 'Closed', status: 'Inactive' },
    ]);
    const [editingAffiliate, setEditingAffiliate] = useState<AffiliateData | null>(null);
    const [deletingAffiliate, setDeletingAffiliate] = useState<AffiliateData | null>(null);

    const handleSaveAffiliate = (updated: AffiliateData) => {
        setAffiliates(prev => prev.map(a => a.id === updated.id ? updated : a));
        setEditingAffiliate(null);
        showSnackbar('Affiliate updated successfully', 'success');
    };

    const handleDeleteAffiliateClick = (id: number) => {
        const aff = affiliates.find(a => a.id === id);
        if (aff) setDeletingAffiliate(aff);
    };

    const confirmDeleteAffiliate = () => {
        if (deletingAffiliate) {
            setAffiliates(prev => prev.filter(a => a.id !== deletingAffiliate.id));
            setDeletingAffiliate(null);
            showSnackbar('Affiliate deleted successfully', 'danger');
        }
    };

    const handleAddAffiliate = (newAff: { name: string; nickName: string; admission: string; status: 'Active' | 'Inactive' }) => {
        setAffiliates(prev => [...prev, { ...newAff, id: Date.now() }]);
        setIsAddAffiliateModalOpen(false);
        showSnackbar('Affiliate added successfully', 'success');
    };

    // Dummy data for demonstration
    useEffect(() => {
        setSources([
            { id: 1, name: 'Google Ads Search', nickName: 'GAds Search', status: 'Active' },
            { id: 2, name: 'Facebook Lead Gen', nickName: 'FB Leads', status: 'Active' },
            { id: 3, name: 'Organic SEO', nickName: 'SEO', status: 'Inactive' },
            { id: 4, name: 'Referral Program', nickName: 'Referral', status: 'Active' },
        ]);
    }, []);

    const handleAddLead = (newLead: Omit<LeadData, 'id'>) => {
        setSources(prev => [...prev, { ...newLead, id: Date.now() }]);
        setIsAddModalOpen(false);
        showSnackbar('Lead source added successfully', 'success');
    };

    const handleSaveEdit = (updatedLead: LeadData) => {
        setSources(prev => prev.map(lead => (lead.id === updatedLead.id ? updatedLead : lead)));
        setEditingLead(null);
        showSnackbar('Lead source updated successfully', 'success');
    };

    const handleDeleteClick = (leadId: number) => {
        const leadToDelete = sources.find(lead => lead.id === leadId);
        if (leadToDelete) {
            setDeletingLead(leadToDelete);
        }
    };

    const confirmDelete = () => {
        if (deletingLead) {
            setSources(prev => prev.filter(lead => lead.id !== deletingLead.id));
            setDeletingLead(null);
            showSnackbar('Lead source deleted successfully', 'danger');
        }
    };

    return (
        <div className="content-scrollable">
            <Breadcrumb items={[{ label: 'NexusAI', onClick: () => setActivePage('dashboard') }, { label: 'Lead Directory' }]} />
            <div className="dashboard-header animate-fade-in" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="dashboard-title text-gradient">Lead Directory</h1>
                    <p className="dashboard-subtitle">Manage all your lead sources and configurations.</p>
                </div>

                {activeTab === 'Lead Source' && (
                    <button className="action-btn primary" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={16} /> Add New Lead
                    </button>
                )}

                {activeTab === 'Course Category' && (
                    <button className="action-btn primary" onClick={() => setIsAddCategoryModalOpen(true)}>
                        <Plus size={16} /> Add Course Category
                    </button>
                )}

                {activeTab === 'Module Category' && (
                    <button className="action-btn primary" onClick={() => setIsAddModuleModalOpen(true)}>
                        <Plus size={16} /> Add Module Category
                    </button>
                )}

                {activeTab === 'Affiliate' && (
                    <button className="action-btn primary" onClick={() => setIsAddAffiliateModalOpen(true)}>
                        <Plus size={16} /> Add Affiliate
                    </button>
                )}
            </div>

            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="tabs-container">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === 'Lead Source' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <LeadSourceTable
                            sources={sources}
                            onEditLead={setEditingLead}
                            onDeleteLead={handleDeleteClick}
                        />
                    </div>
                ) : activeTab === 'Lead Status' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <LeadStatusTable
                            statuses={leadStatuses}
                            onEditStatus={setEditingStatus}
                        />
                    </div>
                ) : activeTab === 'Course Category' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <CourseCategoryTable
                            categories={categories}
                            onEditCategory={setEditingCategory}
                            onDeleteCategory={handleDeleteCategoryClick}
                        />
                    </div>
                ) : activeTab === 'Module Category' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <ModuleCategoryTable
                            modules={modules}
                            onEditModule={setEditingModule}
                            onDeleteModule={handleDeleteModuleClick}
                        />
                    </div>
                ) : activeTab === 'Affiliate' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <AffiliateTable
                            affiliates={affiliates}
                            onEditAffiliate={setEditingAffiliate}
                            onDeleteAffiliate={handleDeleteAffiliateClick}
                        />
                    </div>
                ) : (
                    <div className="p-6" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>Content for {activeTab} will go here.</p>
                    </div>
                )}
            </div>

            <AddLeadModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddLead={handleAddLead} />

            <AddCourseCategoryModal
                isOpen={isAddCategoryModalOpen}
                onClose={() => setIsAddCategoryModalOpen(false)}
                onAdd={handleAddCategory}
            />

            <AddModuleCategoryModal
                isOpen={isAddModuleModalOpen}
                onClose={() => setIsAddModuleModalOpen(false)}
                onAdd={handleAddModule}
            />

            <AddAffiliateModal
                isOpen={isAddAffiliateModalOpen}
                onClose={() => setIsAddAffiliateModalOpen(false)}
                onAdd={handleAddAffiliate}
            />


            <EditAffiliateModal
                isOpen={!!editingAffiliate}
                onClose={() => setEditingAffiliate(null)}
                affiliateData={editingAffiliate}
                onSave={handleSaveAffiliate}
            />

            <EditLeadModal
                isOpen={!!editingLead}
                onClose={() => setEditingLead(null)}
                leadData={editingLead}
                onSave={handleSaveEdit}
            />

            <EditLeadStatusModal
                isOpen={!!editingStatus}
                onClose={() => setEditingStatus(null)}
                statusData={editingStatus}
                onSave={handleSaveStatus}
            />

            <EditCourseCategoryModal
                isOpen={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                categoryData={editingCategory}
                onSave={handleSaveCategory}
            />

            <EditModuleCategoryModal
                isOpen={!!editingModule}
                onClose={() => setEditingModule(null)}
                moduleData={editingModule}
                onSave={handleSaveModule}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingCategory}
                onClose={() => setDeletingCategory(null)}
                onConfirm={confirmDeleteCategory}
                itemName={deletingCategory?.name}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingModule}
                onClose={() => setDeletingModule(null)}
                onConfirm={confirmDeleteModule}
                itemName={deletingModule?.name}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingAffiliate}
                onClose={() => setDeletingAffiliate(null)}
                onConfirm={confirmDeleteAffiliate}
                itemName={deletingAffiliate?.name}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingLead}
                onClose={() => setDeletingLead(null)}
                onConfirm={confirmDelete}
                itemName={deletingLead?.name}
            />

            <Snackbar
                isOpen={snackbar.isOpen}
                message={snackbar.message}
                type={snackbar.type}
                onClose={hideSnackbar}
            />
        </div>
    );
};
