import { useState, useMemo } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Plus, Search, Phone, MessageCircle, Mail, Edit, Trash2 } from 'lucide-react';
import AddUserModal from '../features/users/AddUserModal';
import EditUserModal from '../features/users/EditUserModal';
import { DeleteConfirmationModal } from '../components/common/DeleteConfirmationModal';
import { useSnackbar } from '../hooks/useSnackbar';
import { Snackbar } from '../components/common/Snackbar';
import type { User } from '../types/User';
import './Users.scss';


const sampleUsers: User[] = [
  {
    id: 1,
    name: '1231236',
    phone: '1232134567',
    chat: '1232134567',
    email: '1233@ggg.kk',
    center: 'SaltLakeSectorOne',
    role: 'TPO',
    lastLogin: '10-02-2026 • 5:44 PM',
    lastLogout: '10-02-2026 • 5:52 PM',
    status: 'active',
  },
  {
    id: 2,
    name: '1234',
    phone: '1234567890',
    chat: '1234567890',
    email: '1234@gmail.com',
    center: 'Test Center',
    role: 'Seo Analyst',
    lastLogin: '22-12-2025 • 2:24 PM',
    lastLogout: '26-11-2025 • 2:50 PM',
    status: 'active',
  },
  {
    id: 3,
    name: '2345',
    phone: '2345678901',
    chat: '2345678901',
    email: '2345@gmail.com',
    center: 'Test Center',
    role: 'TPO',
    status: 'inactive',
  },
];

export const Users = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const [filters, setFilters] = useState({ name: '', email: '', phone: '' });

  const filtered = useMemo(() => {
    return users.filter(u => {
      if (filters.name && !u.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.email && !(u.email || '').toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.phone && !(u.phone || '').includes(filters.phone)) return false;
      return true;
    });
  }, [users, filters]);

  return (
    <div className="content-scrollable">
      <Breadcrumb
        items={[
          { label: 'NexusAI', onClick: () => setActivePage('dashboard') },
          { label: 'User List' },
        ]}
      />

      <div
        className="dashboard-header animate-fade-in"
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className="dashboard-title">User List</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="action-btn" onClick={() => setIsSearchOpen(true)}>
            <Search size={16} />
          </button>
          <button className="action-btn primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="total-count">
              Total number of Users: <strong>{filtered.length}</strong>
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SL No</th>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Center</th>
                  <th>User Role</th>
                  <th>Last Login/Logout</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, idx) => (
                  <tr key={u.id}>
                    <td>{idx + 1}</td>
                    <td>{u.name}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {u.phone && (
                          <span className="contact-item">
                            <Phone size={14} /> {u.phone}
                          </span>
                        )}
                        {u.chat && (
                          <span className="contact-item">
                            <MessageCircle size={14} /> {u.chat}
                          </span>
                        )}
                        {u.email && (
                          <span className="contact-item">
                            <Mail size={14} /> {u.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{u.center}</td>
                    <td>{u.role}</td>
                    <td>
                      {(u.lastLogin || u.lastLogout) ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {u.lastLogin && <div>Last Login: {u.lastLogin}</div>}
                          {u.lastLogout && <div>Last Logout: {u.lastLogout}</div>}
                        </div>
                      ) : <span>-</span>}
                    </td>
                    <td>
                      <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{u.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          className="action-btn-icon"
                          title="Edit"
                          aria-label="Edit user"
                          style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                          onClick={() => setEditingUser(u)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-btn-icon"
                          title="Delete"
                          aria-label="Delete user"
                          style={{ padding: '0.35rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--status-danger, #ef4444)' }}
                          onClick={() => setDeletingUser(u)}
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
      </div>

      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Advanced Search</h3>
              <button className="modal-close" onClick={() => setIsSearchOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className='col-12 mb-2'>
                  <label>Name</label>
                  <input className='form-control' type="text" value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} placeholder="Enter name" />
                </div>
                <div className='col-12 mb-2'>
                  <label>Email</label>
                  <input className='form-control' type="text" value={filters.email} onChange={e => setFilters(f => ({ ...f, email: e.target.value }))} placeholder="Enter email" />
                </div>
                <div className='col-12 mb-2'>
                  <label>Primary Phone Number</label>
                  <input className='form-control' type="text" value={filters.phone} onChange={e => setFilters(f => ({ ...f, phone: e.target.value }))} placeholder="Enter phone" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="action-btn" onClick={() => setFilters({ name: '', email: '', phone: '' })}>Reset</button>
              <button className="action-btn primary" onClick={() => setIsSearchOpen(false)}>Search</button>
            </div>
          </div>
        </div>
      )}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(newUser) => {
          setUsers(prev => [...prev, newUser]);
          showSnackbar('User added successfully', 'success');
        }}
      />

      <EditUserModal
        isOpen={!!editingUser}
        userData={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={(updated: User) => {
          setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
          setEditingUser(null);
          showSnackbar('User updated successfully', 'success');
        }}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={() => {
          if (deletingUser) {
            setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
            showSnackbar('User deleted', 'danger');
            setDeletingUser(null);
          }
        }}
        itemName={deletingUser?.name}
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

export default Users;
