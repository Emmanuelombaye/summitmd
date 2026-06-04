import React from 'react';
import { ArrowLeft, Check, LayoutGrid, HeartPulse } from 'lucide-react';

export default function HospitalsPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Inpatient & System Telehealth</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Virtual Solutions for Health Systems.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Empower hospital teams with clinical telehealth device integration, virtual sitting, inpatient tele-nursing networks, and 24/7 tele-stroke diagnostics.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => alert("Request Demo Form Loaded")}>Request System Demo</button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400" alt="Hospital ICU Telehealth monitor" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Clinical Platforms for Hospitals</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Virtual Nursing Support</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Allow remote RNs to handle patient intake questions, check documentation, and coordinate discharge checklists from central desks.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Tele-ICU & Critical Care</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Provide local clinical rooms with round-the-clock backup monitoring by remote intensive-care specialists via connected cameras and monitors.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Connected Clinical Devices</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Integrate mobile medical carts and wall-mounted ICU hardware configurations running unified FHIR record transmissions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
