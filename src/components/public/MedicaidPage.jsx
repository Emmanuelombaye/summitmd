import React from 'react';
import { ArrowLeft, Check, ShieldCheck, Heart } from 'lucide-react';

export default function MedicaidPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>State Sponsored Health Coverage</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Virtual Care for Medicaid Members.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            SummitMD partners with state Medicaid programs to offer 24/7 doctor consults, mental health sessions, and chronic disease tracking at little to no cost for eligible individuals and families.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Check Medicaid Eligibility</button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400" alt="Medicaid Patient Care" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Medicaid Covered Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>24/7 Doctor Consultations</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Immediate consultations for pediatric fevers, ear infections, coughs, and skin rashes, fully covered by Medicaid plans.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Behavioral Therapy</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Counseling services for anxiety, depression, and family transitions, with no copays under qualifying state plans.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Prescription Dispatch</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Physicians coordinate with local pharmacies accepting Medicaid drug coverage to ensure low copay collections.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
