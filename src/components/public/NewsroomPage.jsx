import React from 'react';
import { ArrowLeft, Rss, Calendar } from 'lucide-react';

export default function NewsroomPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Press & Media Announcements</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Teladoc Health Newsroom</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Explore the latest announcements, research statistics, partner integrations, and corporate expansions from Teladoc Health.
        </p>
      </section>

      <section className="container" style={{ maxWidth: '800px', marginBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              <Calendar size={14} /> June 3, 2026
            </div>
            <h4>Teladoc Health Integrates PeakHealth FHIR v4 API standards</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Teladoc Health today finalized a data integration agreement with PeakHealth networks, allowing subscribers to securely sync clinical history profiles and vital observations.</p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
              <Calendar size={14} /> May 12, 2026
            </div>
            <h4>Expanding Virtual Primary Care to Medicare seniors in WA</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Beneficiaries of Washington state Medicare Advantage programs now qualify for free remote blood-pressure monitor sync packs and wellness exam schedulers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
