

interface SummaryStatProps {
    label: string;
    value: number | string;
}

const SummaryStat = ({ label, value }: SummaryStatProps) => (
    <div className="crm-stat">
        <span className="crm-stat-value">{value}</span>
        <span className="crm-stat-label">{label}</span>
    </div>
);

export const CrmSummaryCards = () => (
    <div className="crm-cards-grid">
        {/* Unattended */}
        <div className="crm-card crm-card--blue">
            <div className="crm-card-top">
                <div className="crm-card-left">
                    <div className="crm-total-value">1000144</div>
                    <div className="crm-total-label">Total Unattended</div>
                </div>
                <div className="crm-card-right crm-card-right--blue">
                    <SummaryStat label="This Week" value={0} />
                    <SummaryStat label="This Month" value={4} />
                    <SummaryStat label="This Year" value={1000054} />
                </div>
            </div>
            <div className="crm-card-title">Unattended</div>
        </div>

        {/* Followup */}
        <div className="crm-card crm-card--green">
            <div className="crm-card-top">
                <div className="crm-card-left">
                    <div className="crm-total-value">11</div>
                    <div className="crm-total-label">Total Followup</div>
                </div>
                <div className="crm-card-right crm-card-right--green">
                    <SummaryStat label="This Week" value={0} />
                    <SummaryStat label="This Month" value={0} />
                    <SummaryStat label="This Year" value={2} />
                </div>
            </div>
            <div className="crm-card-title">Followup</div>
        </div>

        {/* Admission */}
        <div className="crm-card crm-card--orange">
            <div className="crm-card-top">
                <div className="crm-card-left">
                    <div className="crm-total-value">114</div>
                    <div className="crm-total-label">Total Admission</div>
                    <div className="crm-admission-row">
                        <span className="crm-sub-value">66</span>
                        <span className="crm-sub-label">Total Students</span>
                    </div>
                    <div className="crm-admission-row">
                        <span className="crm-sub-value">2</span>
                        <span className="crm-sub-label">Ready for admission</span>
                    </div>
                </div>
                <div className="crm-card-right crm-card-right--orange">
                    <SummaryStat label="This Week" value={6} />
                    <SummaryStat label="This Month" value={18} />
                    <SummaryStat label="This Year" value={26} />
                </div>
            </div>
            <div className="crm-card-title">Admission</div>
        </div>

        {/* Payment */}
        <div className="crm-card crm-card--payment">
            <div className="crm-card-title crm-payment-main-title">Payment</div>
            <div className="crm-payment-inner">
                <div className="crm-payment-sub crm-payment-sub--collection">
                    <div className="crm-payment-icon crm-payment-icon--collection">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div className="crm-payment-type">Collection</div>
                    <div className="crm-payment-period">This year: 2026</div>
                    <div className="crm-payment-amount">₹71,11,601.00</div>
                    <div className="crm-payment-meta">Today: ₹0.00</div>
                    <div className="crm-payment-meta">WTD: ₹89,600.00</div>
                </div>
                <div className="crm-payment-sub crm-payment-sub--due">
                    <div className="crm-payment-icon crm-payment-icon--due">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div className="crm-payment-type">Due</div>
                    <div className="crm-payment-period">This year: 2026</div>
                    <div className="crm-payment-amount">₹10,65,375.00</div>
                    <div className="crm-payment-meta">Today: ₹10,000.00</div>
                    <div className="crm-payment-meta">WTD: ₹82,688.00</div>
                </div>
            </div>
        </div>

        {/* New Visit */}
        <div className="crm-card crm-card--blue">
            <div className="crm-card-top">
                <div className="crm-card-left">
                    <div className="crm-total-value">4</div>
                    <div className="crm-total-label">Total New Visit</div>
                </div>
                <div className="crm-card-right crm-card-right--blue">
                    <SummaryStat label="This Week" value={0} />
                    <SummaryStat label="This Month" value={0} />
                    <SummaryStat label="This Year" value={4} />
                </div>
            </div>
            <div className="crm-card-title">New Visit</div>
        </div>

        {/* Followup Visit */}
        <div className="crm-card crm-card--blue">
            <div className="crm-card-top">
                <div className="crm-card-left">
                    <div className="crm-total-value">25</div>
                    <div className="crm-total-label">Total Followup Visit</div>
                </div>
                <div className="crm-card-right crm-card-right--blue">
                    <SummaryStat label="This Week" value={0} />
                    <SummaryStat label="This Month" value={1} />
                    <SummaryStat label="This Year" value={25} />
                </div>
            </div>
            <div className="crm-card-title">Followup Visit</div>
        </div>
    </div>
);
