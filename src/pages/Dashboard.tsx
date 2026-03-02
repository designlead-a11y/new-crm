//
import { Zap } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CrmSummaryCards } from '../features/dashboard/CrmSummaryCards';
import { KpiCards } from '../features/dashboard/KpiCards';
import { LeadTable } from '../features/dashboard/LeadTable';

interface DashboardProps {
    setActivePage: (page: string) => void;
}

export const Dashboard = ({ setActivePage }: DashboardProps) => (
    <div className="content-scrollable">
        <Breadcrumb items={[{ label: 'NexusAI', onClick: () => setActivePage('dashboard') }, { label: 'Overview' }]} />
        <div className="dashboard-header animate-fade-in">
            <div>
                <h1 className="dashboard-title text-gradient">Overview</h1>
                <p className="dashboard-subtitle">Here's your AI lead generation performance at a glance.</p>
            </div>
            <button className="action-btn primary">
                <Zap size={16} /> New AI Search
            </button>
        </div>

        <CrmSummaryCards />
        <KpiCards />
        <LeadTable />
    </div>
);
