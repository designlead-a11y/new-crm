import { useState, useMemo } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import './Analytics.scss';

interface Row {
  id: number;
  transactionDate: string;
  studentName: string;
  studentPhone?: string;
  studentEmail?: string;
  centerName: string;
  commissionTitle: string;
  courseFee?: string;
  royaltyAmount: string;
}

const sample: Row[] = [
  { id: 1, transactionDate: '24-02-2026', studentName: 'Jayita', studentPhone: '8569569856', studentEmail: 'jayita@yopmail.com', centerName: 'SaltLakeSectorOne', commissionTitle: 'Advanced Certification in Full Stack Development (MERN Stack)', courseFee: '₹54,000.00', royaltyAmount: '₹17,820.00' },
  { id: 2, transactionDate: '23-02-2026', studentName: 'Md Jabir', studentPhone: '8240629737', studentEmail: 'nawabahmead844@gmail.com', centerName: 'SaltLakeSectorOne', commissionTitle: 'gg Subha Chowdhury', courseFee: '₹500.00', royaltyAmount: '₹165.00' },
  { id: 3, transactionDate: '23-02-2026', studentName: 'TTuhin', studentPhone: '7905698785', studentEmail: 'mohit1234@yopmail.com', centerName: 'SaltLakeSectorOne', commissionTitle: 'Advanced Certification in Digital Marketing', courseFee: '₹20,000.00', royaltyAmount: '₹6,600.00' },
];

export const Analytics = ({ setActivePage }: { setActivePage: (p: string) => void }) => {
  const [rows] = useState<Row[]>(sample);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [filters, setFilters] = useState({ studentName: '', studentEmail: '', phone: '', course: '', startDate: '', endDate: '' });

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (filters.studentName && !r.studentName.toLowerCase().includes(filters.studentName.toLowerCase())) return false;
      if (filters.studentEmail && !(r.studentEmail || '').toLowerCase().includes(filters.studentEmail.toLowerCase())) return false;
      if (filters.phone && !(r.studentPhone || '').includes(filters.phone)) return false;
      if (filters.course && !r.commissionTitle.toLowerCase().includes(filters.course.toLowerCase())) return false;
      // date filters (simple DD-MM-YYYY compare)
      if (filters.startDate) {
        const [d,m,y] = r.transactionDate.split('-').map(s=>parseInt(s,10));
        const rowDate = new Date(y,m-1,d);
        const sParts = filters.startDate.split('-').map(s=>parseInt(s,10));
        const sDate = new Date(sParts[2]||0,(sParts[1]||1)-1,sParts[0]||1);
        if (rowDate < sDate) return false;
      }
      if (filters.endDate) {
        const [d,m,y] = r.transactionDate.split('-').map(s=>parseInt(s,10));
        const rowDate = new Date(y,m-1,d);
        const eParts = filters.endDate.split('-').map(s=>parseInt(s,10));
        const eDate = new Date(eParts[2]||0,(eParts[1]||1)-1,eParts[0]||1);
        if (rowDate > eDate) return false;
      }
      return true;
    });
  }, [rows, filters]);

  const downloadCSV = (data: Row[]) => {
    const header = ['SL No','Transaction Date','Student Name','Phone','Email','Center Name','Commision Title','Course Fee','Royalty Amount'];
    const csv = [header.join(',')].concat(data.map((r, i) => [
      i+1,
      `"${r.transactionDate}"`,
      `"${r.studentName}"`,
      `"${r.studentPhone || ''}"`,
      `"${r.studentEmail || ''}"`,
      `"${r.centerName}"`,
      `"${r.commissionTitle}"`,
      `"${r.courseFee || ''}"`,
      `"${r.royaltyAmount}"`
    ].join(',')) ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'royalty-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="content-scrollable">
      <Breadcrumb items={[{ label: 'NexusAI', onClick: () => setActivePage('dashboard') }, { label: 'Analytics' }]} />

      <div className="dashboard-header animate-fade-in" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="dashboard-title">Royalty Report</h1>
          <p className="dashboard-subtitle">Overview of recent royalty transactions</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="total-count">Total number of records: <strong>{filtered.length}</strong></span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="action-btn" onClick={() => setIsSearchOpen(true)}>Advanced Search</button>
              <button className="action-btn primary" onClick={() => downloadCSV(filtered)}>Export CSV</button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SL. No.</th>
                  <th>Transaction Date</th>
                  <th>Student Details</th>
                  <th>Center Name</th>
                  <th>Commision Details</th>
                  <th>Royalty Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={row.id}>
                    <td>{idx + 1}</td>
                    <td>{row.transactionDate}</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <a className="student-name">{row.studentName}</a>
                        <div className="student-meta">{row.studentPhone}</div>
                        <div className="student-meta">{row.studentEmail}</div>
                      </div>
                    </td>
                    <td><strong>{row.centerName}</strong></td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 600 }}>{row.commissionTitle}<br/> <span className="badge-new" style={{display: 'inline-flex', margin:'4px 0'}}>NEW COURSE ADMISSION</span></div>
                        {row.courseFee && <div className="muted">Course Fee: {row.courseFee}</div>}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <div className="royalty-amount">{row.royaltyAmount}</div>
                        <span className="pill">Percentage</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advanced Search modal moved outside of .glass-panel to avoid clipping */}
        </div>
      </div>
      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
          {/* use size util - md/lg/xl as needed */}
          <div className="modal-content modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Advanced Search - Royalty Payments</h3>
              <button className="modal-close" onClick={() => setIsSearchOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className='col-12 col-md-3 mb-2'>
                    <label>Student Name</label>
                    <input className='form-control' type="text" value={filters.studentName} onChange={e => setFilters(f => ({ ...f, studentName: e.target.value }))} placeholder="Enter student name" />
                </div>
                <div className='col-12 col-md-3 mb-2'>
                    <label>Student Email</label>
                    <input className='form-control' type="text" value={filters.studentEmail} onChange={e => setFilters(f => ({ ...f, studentEmail: e.target.value }))} placeholder="Enter student email" />
                </div>
                <div className='col-12 col-md-3 mb-2'>
                    <label>Phone Number</label>
                    <input className='form-control' type="text" value={filters.phone} onChange={e => setFilters(f => ({ ...f, phone: e.target.value }))} placeholder="Enter phone number" />
                </div>
                
                
                
              </div>
              <div className="row">
                <div className='col-12 col-md-3 mb-2'>
                    <label>Course</label>
                    <select className='form-control' name="" id="" value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))}>
                        <option value="">Select</option>
                    </select>

                </div>
                
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div className="muted" style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '700', }}>Filter by Transaction Date</div>
                <div className="row">
                  <div className='col-12 col-md-3 mb-2'>
                    <label>Transaction Start Date</label>
                    <input className='form-control' type="date" value={filters.startDate} onChange={e => setFilters(f => ({ ...f, startDate: e.target.value }))} placeholder="DD-MM-YYYY" />
                  </div>
                  <div className='col-12 col-md-3 mb-2'>
                    <label>Transaction End Date</label>
                    <input className='form-control' type="date" value={filters.endDate} onChange={e => setFilters(f => ({ ...f, endDate: e.target.value }))} placeholder="DD-MM-YYYY" />
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="action-btn" onClick={() => { setFilters({ studentName: '', studentEmail: '', phone: '', course: '', startDate: '', endDate: '' }); }}>Reset</button>
              <button className="action-btn primary" onClick={() => setIsSearchOpen(false)}>Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
