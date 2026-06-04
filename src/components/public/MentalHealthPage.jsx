import React from 'react';
import { Brain, Check, ArrowLeft, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function MentalHealthPage({ setPage }) {
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
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Therapy & Medication Management</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Mental Health Care. Confidentially.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Find peace of mind with continuous support from licensed psychologists, clinical therapists, and board-certified psychiatrists. Select your provider and book appointments at your convenience.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Get Started</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('login')}>Schedule Session</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1527137341206-1a2ab818aa69?auto=format&fit=crop&q=80&w=400" 
            alt="Therapeutic session via video call" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Specialty Care Programs */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Personalized Therapy & Psychiatry</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>Programs customized for your specific psychological objectives.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Therapy (Talk Session)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Work 1-on-1 with a licensed counselor on anxiety, trauma, grief, relationship hurdles, stress management, or self-esteem.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Psychiatry (Medication)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Consultations with a psychiatrist for evaluation, diagnostic reviews, and ongoing medication management (excluding controlled substances).</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Youth Support (Ages 13-17)</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Specialized pediatric counselors supporting teenagers with academic stress, bullying, self-identity, or family adjustments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Safe environment details */}
      <section className="container" style={{ padding: '60px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>A Secure, Judgment-Free Space</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '20px' }}>
              We understand that talking about mental wellness requires absolute safety. SummitMD provides encrypted virtual environments, and all therapeutic charts are securely isolated under federal guidelines. PeakHealth connectivity allows you to sync reports with your main provider only if you grant explicit permission.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> HIPAA Compliant | AES-256 Encrypted Session Logs
            </div>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <Heart size={36} style={{ color: 'var(--color-accent)', margin: '0 auto 12px auto' }} />
            <h4>Match With A Therapist</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '20px' }}>Create an account to complete our therapist matching questionnaire.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setPage('register')}>Get Started</button>
          </div>
        </div>
      </section>
    </div>
  );
}
