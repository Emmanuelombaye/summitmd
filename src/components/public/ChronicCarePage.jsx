import React from 'react';
import { Droplets, Check, ArrowLeft, Heart, ShieldCheck, Activity } from 'lucide-react';

export default function ChronicCarePage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button 
          className="btn btn-outline" 
          style={{ padding: '8px 16px', fontSize: '0.85rem' }} 
          onClick={() => setPage('landing')}
        >
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      {/* Hero Section */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Continuous Vitals Tracking & Coaching</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Take Control of Chronic Conditions.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Coordinate care for diabetes, hypertension, and metabolic weight goals. Get smart connected meters (glucose monitors & blood pressure cuffs) that automatically sync reading values via PeakHealth.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Start Program</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('login')}>Sync Device</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400" 
            alt="Connected glucose monitor on desk" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Chronic Care Sections */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Integrated Management Modules</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>A team of clinicians, coaches, and smart devices working together.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}><Droplets size={32} /></div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Diabetes Care</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Includes a cellular glucose monitor and unlimited test strips. Your readings sync automatically, alerting your care team if glucose spikes or drops dangerously.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}><Activity size={32} /></div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Hypertension Control</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Receive an automatic blood pressure cuff. Review pressure averages weekly, track sodium/exercise logs, and optimize cardiorespiratory wellness.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--color-accent)', marginBottom: '16px' }}><Heart size={32} /></div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Metabolic Weight Care</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Integrated health guidance for obesity and weight management, including physician-reviewed GLP-1 prescription coverage where clinically eligible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Device synchronization details */}
      <section className="container" style={{ padding: '60px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Seamless Device Syncing via FHIR</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '20px' }}>
              You don't need to manually write down blood pressure levels or glucose values. SummitMD's platform links with active wireless health gadgets and writes `Observation` records directly to PeakHealth. During your consult, your doctor can immediately plot your vitals history in real-time graphs.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> Direct Bluetooth & Cellular Sync | Real-time Doctor Alerts
            </div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <h4>Enroll in Chronic Care</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '20px' }}>Start managing your health proactively. Sign up to request your connected medical device pack.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setPage('register')}>Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}
