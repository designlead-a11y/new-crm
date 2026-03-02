
import { Edit, Trash2 } from 'lucide-react';

export interface CourseCategoryData {
    id: number;
    name: string;
    status: 'Active' | 'Inactive';
}

interface CourseCategoryTableProps {
    categories: CourseCategoryData[];
    onEditCategory: (item: CourseCategoryData) => void;
    onDeleteCategory: (id: number) => void;
}

export const CourseCategoryTable = ({ categories, onEditCategory, onDeleteCategory }: CourseCategoryTableProps) => {
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
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="lead-name font-medium">{category.name}</div>
                                </td>
                                <td>
                                    <span className={`badge ${category.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                        {category.status}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                        <button
                                            className="action-btn-icon"
                                            title="Edit"
                                            aria-label="Edit category"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                                            onClick={() => onEditCategory(category)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="action-btn-icon"
                                            title="Delete"
                                            aria-label="Delete category"
                                            style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                                            onClick={() => onDeleteCategory(category.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                    No course categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
