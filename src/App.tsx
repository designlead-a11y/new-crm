import { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Campaign } from './pages/Campaign';
import { Users } from './pages/Users';
import { LeadDirectory } from './pages/LeadDirectory';
import './styles/main.scss';

function App() {
  const [activePage, setActivePage] = useState('lead');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('nexus-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to light as per requirements
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const savedCollapse = localStorage.getItem('nexus-sidebar-collapsed');
    if (savedCollapse === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('nexus-theme', newTheme);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('nexus-sidebar-collapsed', newCollapsed.toString());
  };

  return (
    <div className="layout">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        closeSidebar={closeSidebar}
        toggleCollapse={toggleCollapse}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-area">
        <TopBar toggleSidebar={toggleSidebar} theme={theme} toggleTheme={toggleTheme} />

        {activePage === 'dashboard' ? (
          <Dashboard setActivePage={setActivePage} />
        ) : activePage === 'campaign' ? (
          <Campaign setActivePage={setActivePage} />
        ) : activePage === 'users' ? (
          <Users setActivePage={setActivePage} />
        ) : activePage === 'analytics' ? (
          <Analytics setActivePage={setActivePage} />
        ) : (
          <LeadDirectory setActivePage={setActivePage} />
        )}
      </main>
    </div>
  );
}

export default App;
