import { Edit } from 'lucide-react';

export interface LeadStatusData {
    id: number;
    slNo: number;
    name: string;
    orderLevel: number;
    status: 'active' | 'inactive';
}

interface LeadStatusTableProps {
    statuses: LeadStatusData[];
    onEditStatus: (item: LeadStatusData) => void;
}

export const LeadStatusTable = ({ statuses, onEditStatus }: LeadStatusTableProps) => {

    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Order Level</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statuses.map((status) => (
                            <tr key={status.id}>
                                <td>{status.slNo}</td>
                                <td>
                                    <div className="lead-name font-medium">{status.name}</div>
                                </td>
                                <td>{status.orderLevel}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <span className={`badge ${status.status === 'inactive' ? 'badge-danger' : 'badge-success'}`}>
                                            {status.status}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit lead status"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditStatus(status)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {statuses.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No lead statuses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
