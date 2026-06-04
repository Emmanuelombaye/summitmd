import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Plus, ShieldCheck, HeartPulse } from 'lucide-react';
import { peakHealthClient } from '../api/peakHealthClient';

export default function HealthTracker({ user, reloadDashboardData }) {
  const [activeTab, setActiveTab] = useState('Blood Pressure');
  const [history, setHistory] = useState([]);
  
  // Input form states
  const [bpSystolic, setBpSystolic] = useState('120');
  const [bpDiastolic, setBpDiastolic] = useState('80');
  const [glucoseVal, setGlucoseVal] = useState('95');
  const [weightVal, setWeightVal] = useState('180');
  
  const [showLogModal, setShowLogModal] = useState(false);

  const fetchHistory = async () => {
    const list = await peakHealthClient.getObservations(activeTab);
    const formatted = list.map(item => {
      const date = new Date(item.effectiveDateTime);
      const timeLabel = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      if (item.code.text === 'Blood Pressure') {
        return { name: timeLabel, systolic: item.component[0].valueQuantity.value, diastolic: item.component[1].valueQuantity.value, timestamp: item.effectiveDateTime };
      }
      return { name: timeLabel, value: item.valueQuantity.value, timestamp: item.effectiveDateTime };
    });
    setHistory(formatted);
  };

  useEffect(() => { fetchHistory(); }, [activeTab, user]);

  const handleLogVital = async (e) => {
    e.preventDefault();
    if (activeTab === 'Blood Pressure') {
      await peakHealthClient.addObservation('Blood Pressure', bpSystolic, bpDiastolic);
    } else if (activeTab === 'Blood Glucose') {
      await peakHealthClient.addObservation('Blood Glucose', glucoseVal);
    } else {
      await peakHealthClient.addObservation('Weight', weightVal);
    }
    await fetchHistory();
    setShowLogModal(false);
    if (reloadDashboardData) reloadDashboardData();
  };

  return (
    <div className="tracker-layout animate-fade-in" style={{ padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Health Vitals Tracker</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Review chronological physiological statistics compiled from your PeakHealth sync profile.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowLogModal(true)}>
          <Plus size={16} /> Log Metric
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px', marginBottom: '24px' }}>
        {['Blood Pressure', 'Blood Glucose', 'Weight'].map(tab => (
          <button 
            key={tab} 
            className={`btn ${activeTab === tab ? 'btn-secondary' : 'btn-outline'}`}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Recharts Chart */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '20px' }}>{activeTab} Trend Chart</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            {activeTab === 'Blood Pressure' ? (
              <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[40, 180]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="systolic" stroke="#00D2C4" activeDot={{ r: 8 }} strokeWidth={3} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#3B82F6" strokeWidth={3} name="Diastolic" />
              </LineChart>
            ) : (
              <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={activeTab === 'Weight' ? [140, 220] : [60, 160]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#00D2C4" activeDot={{ r: 8 }} strokeWidth={3} name={activeTab} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Audit Table */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Vitals Logs History (FHIR Observations)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              <th style={{ padding: '12px' }}>Effective Date</th>
              <th style={{ padding: '12px' }}>Resource Type</th>
              <th style={{ padding: '12px' }}>Metric</th>
              <th style={{ padding: '12px' }}>Recorded Value</th>
              <th style={{ padding: '12px' }}>Source Link</th>
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '12px' }}>{new Date(item.timestamp).toLocaleString()}</td>
                <td style={{ padding: '12px' }}><code style={{ backgroundColor: 'var(--color-bg-light)', padding: '2px 6px', borderRadius: '4px' }}>Observation</code></td>
                <td style={{ padding: '12px' }}>{activeTab}</td>
                <td style={{ padding: '12px', fontWeight: 700 }}>
                  {activeTab === 'Blood Pressure' ? `${item.systolic}/${item.diastolic} mmHg` : `${item.value} ${activeTab === 'Weight' ? 'lbs' : 'mg/dL'}`}
                </td>
                <td style={{ padding: '12px', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                  <ShieldCheck size={14} /> Synchronized
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Vital Modal Popup */}
      {showLogModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(15, 42, 74, 0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} className="flex-center">
          <div className="glass-card animate-fade-in" style={{
            width: '100%', maxWidth: '400px', backgroundColor: 'var(--color-bg-white)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <form onSubmit={handleLogVital}>
              <h3 style={{ marginBottom: '16px' }}>Log New {activeTab}</h3>

              {activeTab === 'Blood Pressure' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Systolic (mmHg)</label>
                    <input type="number" value={bpSystolic} onChange={e => setBpSystolic(e.target.value)} min="80" max="200" required />
                  </div>
                  <div className="form-group">
                    <label>Diastolic (mmHg)</label>
                    <input type="number" value={bpDiastolic} onChange={e => setBpDiastolic(e.target.value)} min="40" max="130" required />
                  </div>
                </div>
              )}

              {activeTab === 'Blood Glucose' && (
                <div className="form-group">
                  <label>Fasting Glucose Value (mg/dL)</label>
                  <input type="number" value={glucoseVal} onChange={e => setGlucoseVal(e.target.value)} min="50" max="300" required />
                </div>
              )}

              {activeTab === 'Weight' && (
                <div className="form-group">
                  <label>Current Weight (lbs)</label>
                  <input type="number" value={weightVal} onChange={e => setWeightVal(e.target.value)} min="80" max="400" required />
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowLogModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Log & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
