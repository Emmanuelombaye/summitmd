import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Heart } from 'lucide-react';
import { peakHealthClient } from '../api/peakHealthClient';

export default function AuthPage({ mode, setPage, setUser }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');

  useEffect(() => {
    setIsLogin(mode === 'login');
  }, [mode]);
  
  // Registration States
  const [name, setName] = useState('Alex Harrison');
  const [email, setEmail] = useState('alex.harrison@SummitMD.com');
  const [password, setPassword] = useState('password123');
  const [gender, setGender] = useState('male');
  const [birthDate, setBirthDate] = useState('1988-11-14');
  const [phone, setPhone] = useState('(555) 382-9012');
  const [insurance, setInsurance] = useState('Blue Shield PPO - Gold Plan');
  const [mrn, setMrn] = useState('pat-901'); // FHIR Patient ID

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    try {
      if (isLogin) {
        const patientData = await peakHealthClient.login(email, password);
        setUser(patientData);
        setPage('dashboard');
      } else {
        const newPatient = {
          id: mrn || `pat-${Date.now()}`,
          name: [{ text: name }],
          telecom: [
            { system: 'phone', value: phone, use: 'mobile' },
            { system: 'email', value: email, use: 'home' },
          ],
          gender,
          birthDate,
          extension: [{
            url: 'http://summitmd.com/fhir/StructureDefinition/insurance-info',
            valueCodeableConcept: { text: insurance },
          }],
        };
        const registered = await peakHealthClient.register({ ...newPatient, email, password });
        setUser(registered);
        setPage('dashboard');
      }
    } catch (err) {
      setAuthError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="auth-sidebar">
        <div className="nav-brand" style={{ color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => setPage('landing')}>
          <img
            src="/logo.png"
            alt="SummitMD"
            style={{ filter: 'brightness(0) invert(1)', height: '24px' }}
          />
        </div>
        
        <div className="auth-sidebar-mid">
          <h2>Virtual Healthcare<br />at your service.</h2>
          <p>SummitMD works together with the PeakHealth network to provide real-time insurance verification and unified medical history synchronization.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', opacity: 0.8, fontSize: '0.8rem' }}>
          <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} /> HIPAA Secure | PeakHealth FHIR v4 Integration
        </div>
      </div>

      <div className="auth-main">
        {/* ← Back to site escape link */}
        <div style={{ padding: '20px 0 0 0', maxWidth: '440px', margin: '0 auto', width: '100%' }}>
          <button
            type="button"
            className="auth-back-link"
            onClick={() => setPage('landing')}
          >
            ← Back to SummitMD
          </button>
        </div>

        <div className="auth-card">
          <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p>{isLogin ? "Sign in to access your dashboard and message practitioners." : "Fill in your details to check insurance eligibility instantly."}</p>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label>Gender</label>
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Insurance Carrier Plan</label>
                  <select value={insurance} onChange={e => setInsurance(e.target.value)}>
                    <option value="Blue Shield PPO - Gold Plan">Blue Shield PPO - Gold Plan</option>
                    <option value="Aetna Copay Select">Aetna Copay Select</option>
                    <option value="UnitedHealthcare Choice">UnitedHealthcare Choice</option>
                    <option value="No Insurance - Self Pay ($75/visit)">No Insurance - Self Pay ($75/visit)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>PeakHealth Patient ID / Record Number</label>
                  <input type="text" value={mrn} onChange={e => setMrn(e.target.value)} placeholder="e.g. pat-901" />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            {authError && (
              <div style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginBottom: '12px', padding: '10px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>
                ⚠ {authError}
              </div>
            )}
            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={loading}>
              {loading ? 'Connecting to PeakHealth...' : (isLogin ? 'Sign In' : 'Register and Connect')}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              {isLogin ? "Don't have an account?" : "Already registered?"}
            </span>{' '}
            <button
              type="button"
              className="auth-toggle-link"
              onClick={() => setPage(isLogin ? 'register' : 'login')}
            >
              {isLogin ? "Register here" : "Sign in here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
