
import { Edit, Trash2 } from 'lucide-react';

export interface LeadData {
    id: number;
    name: string;
    nickName: string;
    status: string;
}

interface LeadSourceTableProps {
    sources: LeadData[];
    onEditLead: (lead: LeadData) => void;
    onDeleteLead: (id: number) => void;
}

export const LeadSourceTable = ({ sources, onEditLead, onDeleteLead }: LeadSourceTableProps) => {
    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Lead Name</th>
                            <th>Nick Name</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sources.map((source, index) => (
                            <tr key={source.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{source.name}</div>
                                </td>
                                <td>{source.nickName}</td>
                                <td>
                                    <span className={`badge ${source.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                        {source.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit lead source"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditLead(source)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete lead source"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeleteLead(source.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
