import React from 'react';
import { ArrowLeft, Award, Stethoscope } from 'lucide-react';

export default function ProviderSignupPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container tdh-subpage-grid-2col">
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Clinician Recruitment</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Join the SummitMD Care Panel.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            We recruit board-certified doctors, clinical psychologists, and metabolic nutrition dietitians. Deliver virtual consults on a flexible schedule supported by smart PeakHealth records sync.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => alert("Clinician Application Form Loaded")}>Submit Clinician Application</button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400" alt="Clinical doctor smiling" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Practice with SummitMD</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Flexible Scheduling</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Log on and accept urgent consults or open future appointment slots at times that align with your lifestyle.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Administrative Relief</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>SummitMD handles all payor billing, claims paperwork, and technical verification setups behind the scenes.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>PeakHealth Smart Charts</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Direct access to remote patient monitoring logs and historical diagnostics, lowering review overhead before sessions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
