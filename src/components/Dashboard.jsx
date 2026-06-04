import React, { useState, useEffect } from 'react';
import { 
  Activity, Calendar, HeartPulse, UserCheck, MessageSquare, Plus, Bell, ShieldCheck, 
  Settings, LogOut, ChevronRight, Stethoscope, FileHeart
} from 'lucide-react';
import { peakHealthClient } from '../api/peakHealthClient';
import ProviderSearch from './ProviderSearch';
import HealthTracker from './HealthTracker';

export default function Dashboard({ user, setPage, activePortalTab, setActivePortalTab, handleLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [vitals, setVitals] = useState({ bp: '--/--', bg: '--', weight: '--' });
  const [isSyncing, setIsSyncing] = useState(false);

  const loadData = () => {
    // Get fresh appointments
    const apts = peakHealthClient.getAppointments();
    setAppointments(apts);

    // Get latest vitals
    const bpList = peakHealthClient.getObservations("Blood Pressure");
    const bgList = peakHealthClient.getObservations("Blood Glucose");
    const weightList = peakHealthClient.getObservations("Weight");

    const latestBp = bpList.length > 0 ? bpList[bpList.length - 1] : null;
    const latestBg = bgList.length > 0 ? bgList[bgList.length - 1] : null;
    const latestWeight = weightList.length > 0 ? weightList[weightList.length - 1] : null;

    setVitals({
      bp: latestBp ? `${latestBp.component[0].valueQuantity.value}/${latestBp.component[1].valueQuantity.value}` : '--/--',
      bg: latestBg ? latestBg.valueQuantity.value : '--',
      weight: latestWeight ? latestWeight.valueQuantity.value : '--'
    });
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const triggerPeakSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      loadData();
      setIsSyncing(false);
    }, 1200);
  };

  const getInsuranceName = () => {
    try {
      return user.extension[0].valueCodeableConcept.text;
    } catch {
      return 'Self-Pay';
    }
  };

  const formatAptTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + ' at ' + 
           d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="portal-layout animate-fade-in">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src="/logo.png"
              alt="Teladoc Health"
              style={{ filter: 'brightness(0) invert(1)', height: '18px' }}
            />
          </div>
          <nav>
            <ul className="sidebar-menu">
              <li className={`sidebar-item ${activePortalTab === 'overview' ? 'active' : ''}`} onClick={() => setActivePortalTab('overview')}>
                <Activity size={18} /> Dashboard
              </li>
              <li className={`sidebar-item ${activePortalTab === 'visits' ? 'active' : ''}`} onClick={() => setActivePortalTab('visits')}>
                <Calendar size={18} /> Appointments
              </li>
              <li className={`sidebar-item ${activePortalTab === 'tracker' ? 'active' : ''}`} onClick={() => setActivePortalTab('tracker')}>
                <FileHeart size={18} /> My Health Vitals
              </li>
              <li className={`sidebar-item ${activePortalTab === 'providers' ? 'active' : ''}`} onClick={() => setActivePortalTab('providers')}>
                <Stethoscope size={18} /> Search Providers
              </li>
            </ul>
          </nav>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="sidebar-profile">
            <div className="profile-avatar flex-center">
              {user.name[0].text.charAt(0)}
            </div>
            <div className="profile-info">
              <h4>{user.name[0].text}</h4>
              <p>{getInsuranceName()}</p>
            </div>
          </div>
          <div className="sidebar-item" style={{ cursor: 'pointer', padding: '8px' }} onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-content">
        <header className="portal-header">
          <div className="portal-title">
            <h1>Good Day, {user.name[0].text.split(' ')[0]}</h1>
            <p>Here is your telehealth dashboard. Keep your vitals updated for accurate monitoring.</p>
          </div>
          <div className="portal-actions">
            <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={triggerPeakSync}>
              {isSyncing ? 'Syncing...' : 'Sync PeakHealth API'}
            </button>
            <div style={{ padding: '8px', cursor: 'pointer', color: 'var(--color-text-muted)', position: 'relative' }}>
              <Bell size={20} />
              <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-danger)', borderRadius: '50%', position: 'absolute', top: '6px', right: '6px' }}></div>
            </div>
          </div>
        </header>

        {/* Sync status alert */}
        <div className="sync-banner">
          <div className="sync-info">
            <ShieldCheck size={18} style={{ color: 'var(--color-accent)' }} />
            <div>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>PeakHealth Link Synchronized:</span> Connected securely to Patient Record ID <code>{user.id}</code> (FHIR Resource).
            </div>
          </div>
          <div className="sync-status-indicator">
            <div className="pulsing-dot"></div> Active
          </div>
        </div>

        {/* Dynamic Tab Body rendering */}
        {activePortalTab === 'overview' && (
          <div className="dashboard-grid">
            <div>
              {/* Urgent Care Banner */}
              <div className="welcome-card animate-fade-in">
                <h2>Need Care Right Now?</h2>
                <p>Consult with a board-certified physician immediately for urgent conditions like cold, fever, cough, flu, or skin rashes. Average wait time is under 10 minutes.</p>
                <button className="btn btn-primary" onClick={() => setPage('waiting-room')}>
                  <HeartPulse size={16} /> Request Urgent Visit
                </button>
              </div>

              {/* Quick Actions Tiles */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>What would you like to do?</h3>
              <div className="quick-actions-panel" style={{ marginBottom: '32px' }}>
                <div className="action-tile" onClick={() => setPage('waiting-room')}>
                  <HeartPulse size={24} style={{ color: 'var(--color-accent)' }} />
                  <span>Start Urgent Visit</span>
                </div>
                <div className="action-tile" onClick={() => setActivePortalTab('providers')}>
                  <Stethoscope size={24} style={{ color: 'var(--color-accent)' }} />
                  <span>Schedule a Doctor</span>
                </div>
                <div className="action-tile" onClick={() => setActivePortalTab('tracker')}>
                  <FileHeart size={24} style={{ color: 'var(--color-accent)' }} />
                  <span>Log Vitals (BP, Glucose)</span>
                </div>
                <div className="action-tile" onClick={() => alert("FHIR medical record download started.")}>
                  <ShieldCheck size={24} style={{ color: 'var(--color-accent)' }} />
                  <span>Download Charts (FHIR)</span>
                </div>
              </div>
            </div>

            <div>
              {/* Vitals Summary Card */}
              <div className="glass-card" style={{ marginBottom: '24px', padding: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>My Vitals Sync</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Blood Pressure</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{vitals.bp} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>mmHg</span></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActivePortalTab('tracker')}>View Graph</span>
                  </div>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Blood Glucose</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{vitals.bg} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>mg/dL</span></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActivePortalTab('tracker')}>View Graph</span>
                  </div>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Body Weight</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{vitals.weight} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>lbs</span></div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActivePortalTab('tracker')}>View Graph</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="glass-card" style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Upcoming Care</h3>
                {appointments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    No upcoming virtual visits scheduled.
                  </div>
                ) : (
                  <div className="apt-card-list">
                    {appointments.map((apt) => (
                      <div key={apt.id} className="apt-widget-card" style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div className="apt-widget-details">
                          <h4 style={{ fontSize: '0.95rem' }}>{apt.description}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{formatAptTime(apt.start)}</p>
                          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-light)' }}>
                            {apt.participant[0].actor.display}
                          </p>
                        </div>
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '4px' }}
                          onClick={() => setPage('waiting-room')}
                        >
                          Enter Room
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activePortalTab === 'visits' && (
          <div className="glass-card animate-fade-in" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3>My Appointment Logs</h3>
              <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setActivePortalTab('providers')}>
                Schedule New Visit
              </button>
            </div>
            
            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                No active appointments scheduled. Click 'Schedule New Visit' to start.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {appointments.map(apt => (
                  <div key={apt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--color-border)', padding: '20px', borderRadius: '12px', backgroundColor: 'var(--color-bg-white)' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{apt.description}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>{formatAptTime(apt.start)}</p>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Practitioner: {apt.participant[0].actor.display}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => { peakHealthClient.cancelAppointment(apt.id); loadData(); }}>
                        Cancel
                      </button>
                      <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('waiting-room')}>
                        Enter Room
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activePortalTab === 'providers' && (
          <ProviderSearch user={user} reloadDashboardData={loadData} />
        )}

        {activePortalTab === 'tracker' && (
          <HealthTracker user={user} reloadDashboardData={loadData} />
        )}
      </main>
    </div>
  );
}
