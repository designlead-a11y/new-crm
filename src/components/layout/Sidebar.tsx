
import { LayoutDashboard, Target, Users as UsersIcon, User, BarChart3, Settings, Zap, X, ChevronLeft } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    isCollapsed: boolean;
    closeSidebar: () => void;
    toggleCollapse: () => void;
    activePage: string;
    setActivePage: (page: string) => void;
}

export const Sidebar = ({ isOpen, isCollapsed, closeSidebar, toggleCollapse, activePage, setActivePage }: SidebarProps) => (
    <>
        {/* Overlay for mobile */}
        <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={closeSidebar}></div>

        <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="brand" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="brand-icon">
                        <Zap size={20} />
                    </div>
                    <span className="brand-text text-gradient">NexusAI</span>
                </div>

                {/* Mobile close button inside sidebar */}
                <button className="menu-btn mobile-only" onClick={closeSidebar}>
                    <X size={24} className="md:hidden" style={{ '@media (minWidth: 768px)': { display: 'none' } } as any} />
                </button>
                {/* Desktop collapse button */}
                <button className="icon-btn desktop-only" onClick={toggleCollapse} style={{ display: 'none', width: '28px', height: '28px' }}>
                    <ChevronLeft size={18} style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform var(--transition-fast)' }} />
                </button>
            </div>

            <div className="nav-section">
                <span className="nav-label">Main Menu</span>
                <button className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><LayoutDashboard size={20} /><span className="nav-text">Dashboard</span></button>
                <button className={`nav-item ${activePage === 'campaign' ? 'active' : ''}`} onClick={() => setActivePage('campaign')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><Target size={20} /><span className="nav-text">Campaigns</span></button>
                <button className={`nav-item ${activePage === 'users' ? 'active' : ''}`} onClick={() => setActivePage('users')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><User size={20} /><span className="nav-text">Users</span></button>
                <button className={`nav-item ${activePage === 'lead' ? 'active' : ''}`} onClick={() => setActivePage('lead')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><UsersIcon size={20} /><span className="nav-text">Lead Directory</span></button>
                <button className={`nav-item ${activePage === 'analytics' ? 'active' : ''}`} onClick={() => setActivePage('analytics')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><BarChart3 size={20} /><span className="nav-text">Analytics</span></button>
            </div>

            <div className="nav-section" style={{ marginTop: 'auto' }}>
                <span className="nav-label">Preferences</span>
                <button className="nav-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}><Settings size={20} /><span className="nav-text">Settings</span></button>
            </div>
        </aside>
    </>
);
