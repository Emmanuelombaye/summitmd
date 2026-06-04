import React, { useState, useEffect } from 'react';
import { 
  Activity, Calendar, HeartPulse, UserCheck, MessageSquare, Plus, Bell, ShieldCheck, 
  Settings, LogOut, ChevronRight, Stethoscope, FileHeart, Check
} from 'lucide-react';
import { peakHealthClient } from '../api/peakHealthClient';
import ProviderSearch from './ProviderSearch';
import HealthTracker from './HealthTracker';

export default function Dashboard({ user, setPage, activePortalTab, setActivePortalTab, handleLogout }) {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [vitals, setVitals] = useState({ bp: '--/--', bg: '--', weight: '--' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    programName: 'Compounded Semaglutide Weight Loss Program',
    currentStep: 4, // 0: Submitted, 1: Account, 2: ID, 3: Intake, 4: Provider Review, 5: Processing, 6: Shipment
    requiresVideoCall: true,
    doctorName: 'Dr. Sarah Mercer, MD',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const apts = await peakHealthClient.getAppointments();
      setAppointments(apts);

      const [bpList, bgList, weightList] = await Promise.all([
        peakHealthClient.getObservations('Blood Pressure'),
        peakHealthClient.getObservations('Blood Glucose'),
        peakHealthClient.getObservations('Weight'),
      ]);

      const latestBp     = bpList.length     > 0 ? bpList[bpList.length - 1]         : null;
      const latestBg     = bgList.length     > 0 ? bgList[bgList.length - 1]         : null;
      const latestWeight = weightList.length > 0 ? weightList[weightList.length - 1] : null;

      setVitals({
        bp:     latestBp     ? `${latestBp.component[0].valueQuantity.value}/${latestBp.component[1].valueQuantity.value}` : '--/--',
        bg:     latestBg     ? latestBg.valueQuantity.value     : '--',
        weight: latestWeight ? latestWeight.valueQuantity.value : '--',
      });
    } catch (err) {
      console.error('[Dashboard] loadData error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [user]);

  const triggerPeakSync = async () => {
    setIsSyncing(true);
    await loadData();
    setIsSyncing(false);
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
              alt="SummitMD"
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Active Order Status Tracker (Step 9 of Client Patient Flow) */}
            <div className="order-tracker-card glass-card animate-fade-in" style={{ backgroundColor: 'var(--color-bg-white)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-accent)' }}>Active Care Program</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '4px 0 0 0', color: 'var(--color-primary)' }}>{orderStatus.programName}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Status:</span>
                  <span className={`status-badge ${orderStatus.requiresVideoCall ? 'status-badge-warning' : 'status-badge-active'}`} style={{
                    padding: '4px 10px',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: orderStatus.requiresVideoCall ? '#ffedd5' : '#dcfce7',
                    color: orderStatus.requiresVideoCall ? '#c2410c' : '#15803d'
                  }}>
                    {orderStatus.requiresVideoCall ? 'Action Required: Doctor Video Consultation' : 'Provider Review'}
                  </span>
                </div>
              </div>

              {/* Progress Steps Timeline */}
              <div className="order-progress-timeline" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '24px 0 32px 0', padding: '0 10px' }}>
                {/* Background connector line */}
                <div style={{ position: 'absolute', top: '14px', left: '20px', right: '20px', height: '4px', backgroundColor: '#e2e8f0', zIndex: 1 }}></div>
                {/* Active fill line */}
                <div style={{ 
                  position: 'absolute', 
                  top: '14px', 
                  left: '20px', 
                  width: `${(orderStatus.currentStep / 6) * 100}%`, 
                  height: '4px', 
                  backgroundColor: orderStatus.requiresVideoCall ? '#ea580c' : 'var(--color-accent)', 
                  zIndex: 2,
                  transition: 'width 0.4s ease'
                }}></div>

                {[
                  { label: 'Order Submitted', short: 'Submitted' },
                  { label: 'Account Verified', short: 'Account' },
                  { label: 'ID Verified', short: 'ID Verified' },
                  { label: 'Intake Completed', short: 'Intake' },
                  { label: 'Provider Review', short: 'Provider' },
                  { label: 'Prescription Processing', short: 'Processing' },
                  { label: 'Shipment', short: 'Shipment' }
                ].map((s, idx) => {
                  const isCompleted = idx < orderStatus.currentStep;
                  const isActive = idx === orderStatus.currentStep;
                  const isWarning = isActive && orderStatus.requiresVideoCall;
                  
                  let dotColor = '#e2e8f0';
                  let textColor = 'var(--color-text-muted)';
                  let borderStyle = '1px solid #cbd5e1';

                  if (isCompleted) {
                    dotColor = 'var(--color-accent)';
                    textColor = 'var(--color-primary)';
                  } else if (isActive) {
                    dotColor = isWarning ? '#ea580c' : 'var(--color-accent)';
                    textColor = isWarning ? '#c2410c' : 'var(--color-accent)';
                    borderStyle = isWarning ? '2px solid #ea580c' : '2px solid var(--color-accent)';
                  }

                  return (
                    <div key={idx} className="timeline-step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 3, flex: 1 }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? 'var(--color-accent)' : '#fff',
                        border: isCompleted ? 'none' : borderStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        color: isCompleted ? '#fff' : textColor,
                        boxShadow: isActive ? '0 0 10px rgba(0,210,196,0.3)' : 'none'
                      }}>
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : idx + 1}
                      </div>
                      <span className="timeline-label-desktop" style={{ fontSize: '0.7rem', fontWeight: isActive ? 600 : 500, marginTop: '8px', color: textColor, textAlign: 'center' }}>
                        {s.short}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Forced Video Consultation Callout banner */}
              {orderStatus.requiresVideoCall && (
                <div className="forced-video-alert animate-fade-in" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  marginTop: '16px',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                      backgroundColor: '#ffedd5',
                      color: '#ea580c',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <HeartPulse size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: '#c2410c', fontSize: '0.95rem', fontWeight: 700 }}>Physician Video Call Required</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#9a3412', lineHeight: '1.4' }}>
                        Your reviewing clinician, <strong>{orderStatus.doctorName}</strong>, has requested a brief live video consultation to confirm eligibility for your compounded Semaglutide prescription.
                      </p>
                    </div>
                  </div>
                  <button 
                    className="btn btn-warning" 
                    style={{
                      padding: '10px 20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      backgroundColor: '#ea580c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)'
                    }}
                    onClick={() => setPage('waiting-room')}
                  >
                    Enter Live Video Consultation
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Toggle for Verification/Demo purposes */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem', gap: '8px', color: 'var(--color-text-muted)', marginTop: '-12px', paddingRight: '4px' }}>
              <span>Demo Controls:</span>
              <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input 
                  type="checkbox" 
                  checked={orderStatus.requiresVideoCall}
                  onChange={(e) => setOrderStatus(prev => ({ 
                    ...prev, 
                    requiresVideoCall: e.target.checked,
                    currentStep: e.target.checked ? 4 : 5 // Toggle between Provider Review and Prescription Processing
                  }))} 
                />
                Simulate Doctor Forced Video Call Required
              </label>
            </div>

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
                      <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={async () => { await peakHealthClient.cancelAppointment(apt.id); loadData(); }}>
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
