
import { Users, Target, Zap, TrendingUp, TrendingDown } from 'lucide-react';

export const KpiCards = () => (
    <div className="kpi-grid">
        <div className="glass-panel kpi-card">
            <div className="kpi-header">
                <span>Total Leads Sourced</span>
                <div className="kpi-icon"><Users size={20} color="var(--accent-primary)" /></div>
            </div>
            <div className="kpi-value">24,592</div>
            <div className="kpi-status positive">
                <TrendingUp size={16} /> <span>+12.5% this week</span>
            </div>
        </div>
        <div className="glass-panel kpi-card">
            <div className="kpi-header">
                <span>Avg AI Match Score</span>
                <div className="kpi-icon"><Target size={20} color="var(--accent-secondary)" /></div>
            </div>
            <div className="kpi-value">92%</div>
            <div className="kpi-status positive">
                <TrendingUp size={16} /> <span>+4.1% pipeline quality</span>
            </div>
        </div>
        <div className="glass-panel kpi-card">
            <div className="kpi-header">
                <span>Active Campaigns</span>
                <div className="kpi-icon"><Zap size={20} color="var(--accent-warning)" /></div>
            </div>
            <div className="kpi-value">8</div>
            <div className="kpi-status negative">
                <TrendingDown size={16} /> <span>2 campaigns paused</span>
            </div>
        </div>
    </div>
);
