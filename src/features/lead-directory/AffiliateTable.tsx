
import { Edit, Trash2 } from 'lucide-react';

export interface AffiliateData {
    id: number;
    name: string;
    nickName: string;
    admission: string;
    status: 'Active' | 'Inactive';
}

interface AffiliateTableProps {
    affiliates: AffiliateData[];
    onEditAffiliate: (item: AffiliateData) => void;
    onDeleteAffiliate: (id: number) => void;
}

export const AffiliateTable = ({ affiliates, onEditAffiliate, onDeleteAffiliate }: AffiliateTableProps) => {
    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Nick Name</th>
                            <th>Admission</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {affiliates.map((aff, index) => (
                            <tr key={aff.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{aff.name}</div>
                                </td>
                                <td>{aff.nickName}</td>
                                <td>
                                    <span className={`
                                        ${aff.admission === 'Allowed' ? 'text-success' : ''} \
                                        ${aff.admission === 'Closed' ? 'text-danger' : ''}`.trim()}
                                    >
                                        <span style={{ marginRight: '0.25rem', opacity: 0.4 }}>●</span>
                                        {aff.admission}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge ${aff.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                        {aff.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit affiliate"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditAffiliate(aff)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete affiliate"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeleteAffiliate(aff.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {affiliates.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No affiliates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
