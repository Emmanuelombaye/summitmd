import React from 'react';
import { ArrowLeft, Shield, Scale } from 'lucide-react';

export default function LegalPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Legal & Compliance Center</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Privacy Policy & Terms</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
          Review SummitMD's clinical terms of service, patient security disclosures, and HIPAA compliance policies.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}><Shield size={20} style={{ color: 'var(--color-accent)' }} /> 1. HIPAA Disclosure Notice</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px', lineHeight: 1.7 }}>
              Your protected health records (PHI) are strictly secure under federal Health Insurance Portability and Accountability Act guidelines. No data is transferred to PeakHealth interfaces without patient authentication and consent.
            </p>
          </div>

          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}><Scale size={20} style={{ color: 'var(--color-accent)' }} /> 2. Clinical Terms of Use</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px', lineHeight: 1.7 }}>
              SummitMD virtual consultations are designed for non-emergency healthcare requirements. All clinical decisions are executed by board-certified physicians acting under individual state licensure credentials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
