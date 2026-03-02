import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CampaignPlatformTable } from '../features/campaign/CampaignPlatformTable';
import type { CampaignPlatformData } from '../features/campaign/CampaignPlatformTable';
import { CampaignTypeTable } from '../features/campaign/CampaignTypeTable';
import type { CampaignTypeData } from '../features/campaign/CampaignTypeTable';
import { AddCampaignPlatformModal } from '../features/campaign/AddCampaignPlatformModal';
import { EditCampaignPlatformModal } from '../features/campaign/EditCampaignPlatformModal';
import { AddCampaignTypeModal } from '../features/campaign/AddCampaignTypeModal';
import { EditCampaignTypeModal } from '../features/campaign/EditCampaignTypeModal';
import { DeleteConfirmationModal } from '../components/common/DeleteConfirmationModal';
import { Snackbar } from '../components/common/Snackbar';
import { useSnackbar } from '../hooks/useSnackbar';

interface CampaignProps {
    setActivePage: (page: string) => void;
}

export const Campaign = ({ setActivePage }: CampaignProps) => {
    const tabs = ['Campaign Platform', 'Campaign Type'];
    const [activeTab, setActiveTab] = useState('Campaign Platform');
    const [isAddPlatformModalOpen, setIsAddPlatformModalOpen] = useState(false);
    const [isAddTypeModalOpen, setIsAddTypeModalOpen] = useState(false);

    const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

    // Campaign Platform state
    const [platforms, setPlatforms] = useState<CampaignPlatformData[]>([
        { id: 1, platformName: 'Google Ads' },
        { id: 2, platformName: 'Facebook Ads' },
        { id: 3, platformName: 'LinkedIn Ads' },
    ]);
    const [editingPlatform, setEditingPlatform] = useState<CampaignPlatformData | null>(null);
    const [deletingPlatform, setDeletingPlatform] = useState<CampaignPlatformData | null>(null);

    const handleAddPlatform = (newPlatform: { platformName: string }) => {
        setPlatforms(prev => [...prev, { ...newPlatform, id: Date.now() }]);
        setIsAddPlatformModalOpen(false);
        showSnackbar('Campaign platform added successfully', 'success');
    };

    const handleSavePlatform = (updated: CampaignPlatformData) => {
        setPlatforms(prev => prev.map(p => p.id === updated.id ? updated : p));
        setEditingPlatform(null);
        showSnackbar('Campaign platform updated successfully', 'success');
    };

    const handleDeletePlatformClick = (id: number) => {
        const platform = platforms.find(p => p.id === id);
        if (platform) setDeletingPlatform(platform);
    };

    const confirmDeletePlatform = () => {
        if (deletingPlatform) {
            setPlatforms(prev => prev.filter(p => p.id !== deletingPlatform.id));
            setDeletingPlatform(null);
            showSnackbar('Campaign platform deleted successfully', 'danger');
        }
    };

    // Campaign Type state
    const [campaignTypes, setCampaignTypes] = useState<CampaignTypeData[]>([
        { id: 1, name: 'Search Campaign', campaignPlatform: 'Google Ads', status: 'Active' },
        { id: 2, name: 'Display Campaign', campaignPlatform: 'Google Ads', status: 'Active' },
        { id: 3, name: 'Awareness Campaign', campaignPlatform: 'Facebook Ads', status: 'Inactive' },
    ]);
    const [editingType, setEditingType] = useState<CampaignTypeData | null>(null);
    const [deletingType, setDeletingType] = useState<CampaignTypeData | null>(null);

    const handleAddType = (newType: { name: string; campaignPlatform: string; status: 'Active' | 'Inactive' }) => {
        setCampaignTypes(prev => [...prev, { ...newType, id: Date.now() }]);
        setIsAddTypeModalOpen(false);
        showSnackbar('Campaign type added successfully', 'success');
    };

    const handleSaveType = (updated: CampaignTypeData) => {
        setCampaignTypes(prev => prev.map(t => t.id === updated.id ? updated : t));
        setEditingType(null);
        showSnackbar('Campaign type updated successfully', 'success');
    };

    const handleDeleteTypeClick = (id: number) => {
        const type = campaignTypes.find(t => t.id === id);
        if (type) setDeletingType(type);
    };

    const confirmDeleteType = () => {
        if (deletingType) {
            setCampaignTypes(prev => prev.filter(t => t.id !== deletingType.id));
            setDeletingType(null);
            showSnackbar('Campaign type deleted successfully', 'danger');
        }
    };

    return (
        <div className="content-scrollable">
            <Breadcrumb items={[{ label: 'NexusAI', onClick: () => setActivePage('dashboard') }, { label: 'Campaign' }]} />

            <div className="dashboard-header animate-fade-in" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 className="dashboard-title text-gradient">Campaign Management</h1>
                    <p className="dashboard-subtitle">Manage your campaign platforms and types.</p>
                </div>

                {activeTab === 'Campaign Platform' && (
                    <button className="action-btn primary" onClick={() => setIsAddPlatformModalOpen(true)}>
                        <Plus size={16} /> Add Campaign Platform
                    </button>
                )}

                {activeTab === 'Campaign Type' && (
                    <button className="action-btn primary" onClick={() => setIsAddTypeModalOpen(true)}>
                        <Plus size={16} /> Add Campaign Type
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

                {activeTab === 'Campaign Platform' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <CampaignPlatformTable
                            platforms={platforms}
                            onEditPlatform={setEditingPlatform}
                            onDeletePlatform={handleDeletePlatformClick}
                        />
                    </div>
                ) : activeTab === 'Campaign Type' ? (
                    <div style={{ paddingTop: '1.5rem' }}>
                        <CampaignTypeTable
                            campaignTypes={campaignTypes}
                            onEditType={setEditingType}
                            onDeleteType={handleDeleteTypeClick}
                        />
                    </div>
                ) : null}
            </div>

            <AddCampaignPlatformModal
                isOpen={isAddPlatformModalOpen}
                onClose={() => setIsAddPlatformModalOpen(false)}
                onAdd={handleAddPlatform}
            />

            <EditCampaignPlatformModal
                isOpen={!!editingPlatform}
                onClose={() => setEditingPlatform(null)}
                platformData={editingPlatform}
                onSave={handleSavePlatform}
            />

            <AddCampaignTypeModal
                isOpen={isAddTypeModalOpen}
                onClose={() => setIsAddTypeModalOpen(false)}
                onAdd={handleAddType}
                platforms={platforms}
            />

            <EditCampaignTypeModal
                isOpen={!!editingType}
                onClose={() => setEditingType(null)}
                typeData={editingType}
                onSave={handleSaveType}
                platforms={platforms}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingPlatform}
                onClose={() => setDeletingPlatform(null)}
                onConfirm={confirmDeletePlatform}
                itemName={deletingPlatform?.platformName}
            />

            <DeleteConfirmationModal
                isOpen={!!deletingType}
                onClose={() => setDeletingType(null)}
                onConfirm={confirmDeleteType}
                itemName={deletingType?.name}
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

export default Campaign;
