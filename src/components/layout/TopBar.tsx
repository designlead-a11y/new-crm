
import { Menu, Sparkles, Sun, Moon, Bell } from 'lucide-react';

interface TopBarProps {
    toggleSidebar: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const TopBar = ({ toggleSidebar, theme, toggleTheme }: TopBarProps) => (
    <header className="topbar">
        <div className="topbar-left">
            <button className="menu-btn mobile-only" onClick={toggleSidebar}>
                <Menu size={24} />
            </button>
            <div className="search-container">
                <Sparkles size={18} className="text-primary-gradient" />
                <input type="text" className="search-input" placeholder="Ask AI: Find SaaS founders in London..." />
            </div>
        </div>

        <div className="user-profile">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="icon-btn" style={{ position: 'relative' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, backgroundColor: 'var(--accent-danger)', borderRadius: '50%' }} />
            </button>

            <div className="avatar">JD</div>
        </div>
    </header>
);
