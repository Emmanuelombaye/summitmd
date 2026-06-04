import React from 'react';
import { ArrowLeft, Check, Landmark, ShieldAlert } from 'lucide-react';

export default function HealthPlansPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container tdh-subpage-grid-2col">
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Insurers & Payor Partnerships</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Coordinating Care for Health Plans.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Integrate virtual clinical care lines with existing benefit schedules. SummitMD utilizes FHIR interoperability to verify insurance eligibility instantly and report outcomes safely.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => alert("Contact Sales Form Loaded")}>Partner With Us</button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400" alt="Insurance coordination desk" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Payor Program Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>API Eligibility Verification</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Direct PeakHealth hooks query subscriber catalogs instantly during user onboarding to compute correct copay metrics.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Clinical Quality Metrics</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Outcome statistics aligning with NCQA HEDIS guidelines, tracking improvements in chronic condition management populations.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Claims Redirection</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Divert non-emergent complaints from high-cost emergency departments or physical clinics into telehealth consulting blocks.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
