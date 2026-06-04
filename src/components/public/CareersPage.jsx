import React from 'react';
import { ArrowLeft, Users, Briefcase } from 'lucide-react';

export default function CareersPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Careers at SummitMD</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Build the Future of Digital Care.</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Join our global team of software architects, data scientists, clinical coaches, and medical leaders mapping out modern, accessible patient records.
        </p>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Our Work Culture</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Remote-First Flow</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Work securely from anywhere. Our tools are fully cloud-integrated to coordinate product designs and engineering blocks easily.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Full Medical Coverage</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Comprehensive health plans, dental/vision coverages, health savings match accounts, and free SummitMD access for family.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Open Job Roles</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Explore active openings in Healthcare API Engineering (FHIR Specialist), Mobile product designs, and remote nursing managers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
