import React from 'react';
import { UserCheck, Stethoscope, FileText, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HowItWorksPage({ setPage }) {
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
      <section className="container" style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Step-by-step Guide</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Healthcare Made Simple.</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          From setting up your account to consulting with doctors and picking up your prescriptions—here is how Teladoc Health virtual care works.
        </p>
      </section>

      {/* Timeline steps */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', marginBottom: '24px' }} className="flex-center">
              <UserCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>1. Create Your Profile</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', flexGrow: 1 }}>
              Set up your Teladoc Health profile. Enter your health insurance details (or select Self-Pay) and connect your PeakHealth Patient ID to import medical history.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', marginBottom: '24px' }} className="flex-center">
              <Stethoscope size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>2. Request A Session</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', flexGrow: 1 }}>
              Choose 'Request Urgent Care' to see a physician immediately, or search our provider registry to schedule a future session with a specialist or therapist.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', marginBottom: '24px' }} className="flex-center">
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>3. Pickup Prescriptions</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', flexGrow: 1 }}>
              Conclude your video call. If your doctor determines a prescription is necessary, it is sent electronically to your nearest pharmacy for pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing and Insurance sync info */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', marginBottom: '60px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-primary)' }}>Insurance Verification & Copay Mapping</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '24px' }}>
              We sync eligibility data directly via PeakHealth API connectors. Once you enter your insurance carrier number, our system queries active copay matrices. Most virtual checkups are covered at a low cost or $0 copay depending on your specific insurance package.
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> Real-time Copay Estimates | Supports 100+ Insurers
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '12px' }} onClick={() => setPage('register')}>
              Set Up Account Now <ArrowRight size={16} />
            </button>
            <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }} onClick={(e) => { e.preventDefault(); setPage('login'); }}>
              Have an account? Log in here
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
