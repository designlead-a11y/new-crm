
import { Edit, Trash2 } from 'lucide-react';

export interface ModuleCategoryData {
    id: number;
    name: string;
    status: 'Active' | 'Inactive';
}

interface ModuleCategoryTableProps {
    modules: ModuleCategoryData[];
    onEditModule: (item: ModuleCategoryData) => void;
    onDeleteModule: (id: number) => void;
}

export const ModuleCategoryTable = ({ modules, onEditModule, onDeleteModule }: ModuleCategoryTableProps) => {
    return (
        <div style={{ padding: '0 1.5rem 1.5rem', width: '100%' }}>
            <div className="table-container" style={{ width: '100%' }}>
                <table className="data-table" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SL No</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((module, index) => (
                            <tr key={module.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{module.name}</div>
                                </td>
                                <td>
                                    <span className={`badge ${module.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                        {module.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit module"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditModule(module)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete module"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeleteModule(module.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {modules.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No module categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
