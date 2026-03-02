import { Edit, Trash2 } from 'lucide-react';

export interface CampaignPlatformData {
    id: number;
    platformName: string;
}

interface CampaignPlatformTableProps {
    platforms: CampaignPlatformData[];
    onEditPlatform: (item: CampaignPlatformData) => void;
    onDeletePlatform: (id: number) => void;
}

export const CampaignPlatformTable = ({ platforms, onEditPlatform, onDeletePlatform }: CampaignPlatformTableProps) => {
    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Platform Name</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platforms.map((platform, index) => (
                            <tr key={platform.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{platform.platformName}</div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit platform"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditPlatform(platform)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete platform"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeletePlatform(platform.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {platforms.length === 0 && (
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No campaign platforms found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
