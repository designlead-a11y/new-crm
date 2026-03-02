import { Edit, Trash2 } from 'lucide-react';

export interface CampaignTypeData {
    id: number;
    name: string;
    campaignPlatform: string;
    status: 'Active' | 'Inactive';
}

interface CampaignTypeTableProps {
    campaignTypes: CampaignTypeData[];
    onEditType: (item: CampaignTypeData) => void;
    onDeleteType: (id: number) => void;
}

export const CampaignTypeTable = ({ campaignTypes, onEditType, onDeleteType }: CampaignTypeTableProps) => {
    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Campaign Platform</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignTypes.map((type, index) => (
                            <tr key={type.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{type.name}</div>
                                </td>
                                <td>
                                    <div className="lead-name">{type.campaignPlatform}</div>
                                </td>
                                <td>
                                    <span className={`badge ${type.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                        {type.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit campaign type"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditType(type)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete campaign type"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeleteType(type.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {campaignTypes.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No campaign types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
