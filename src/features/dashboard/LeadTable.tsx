import React from 'react';
import { UserPlus, CheckCircle2, Mail } from 'lucide-react';

const leadsData = [
    { id: 1, name: 'Eleanor Pena', role: 'VP Marketing @ TechFlow', initial: 'E', score: 98, status: 'Verified', tags: ['SaaS', 'B2B'] },
    { id: 2, name: 'Guy Hawkins', role: 'Founder @ DevSync', initial: 'G', score: 85, status: 'Hot Lead', tags: ['Startup', 'Fintech'] },
    { id: 3, name: 'Bessie Cooper', role: 'Director of RevOps @ Scale', initial: 'B', score: 72, status: 'In Sequence', tags: ['Enterprise'] },
    { id: 4, name: 'Cody Fisher', role: 'CEO @ GrowthHQ', initial: 'C', score: 94, status: 'Verified', tags: ['Agency', 'B2B'] },
    { id: 5, name: 'Jane Doe', role: 'CMO @ MarketFit', initial: 'J', score: 88, status: 'Hot Lead', tags: ['SaaS'] },
];

export const LeadTable = () => (
    <div className="glass-panel table-panel">
        <div className="table-header-panel">
            <h3 className="table-title">Recent High-Intent Leads</h3>
            <button className="action-btn">
                <UserPlus size={16} /> <span className="hidden-mobile">Export CSV</span>
            </button>
        </div>
        {/* Wrapper for horizontal scroll on mobile */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="lead-table">
                <thead>
                    <tr>
                        <th>Prospect</th>
                        <th>AI Match Score</th>
                        <th>Status</th>
                        <th>Tags</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leadsData.map(lead => (
                        <tr key={lead.id} className="animate-fade-in" style={{ animationDelay: `${lead.id * 0.1}s` }}>
                            <td>
                                <div className="lead-info">
                                    <div className="lead-avatar">{lead.initial}</div>
                                    <div>
                                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{lead.name}</div>
                                        <div className="lead-role">{lead.role}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="match-score">
                                    <div className="score-ring" style={{ '--score': `${lead.score}%` } as React.CSSProperties}>
                                        {lead.score}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`badge ${lead.status === 'Hot Lead' ? 'hot' : 'verified'}`}>
                                    {lead.status === 'Verified' && <CheckCircle2 size={12} style={{ marginRight: 4 }} />}
                                    {lead.status}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    {lead.tags.map(tag => (
                                        <span key={tag} className="badge">{tag}</span>
                                    ))}
                                </div>
                            </td>
                            <td>
                                <button className="action-btn" style={{ padding: '0.4rem 0.5rem' }}>
                                    <Mail size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
