import React from 'react';
import { ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';

export default function LibraryPage({ setPage }) {
  const articles = [
    { cat: "Hypertension", title: "Understanding Blood Pressure Readings", desc: "A guide on what systolic and diastolic pressure levels indicate for cardiovascular health." },
    { cat: "Diabetes", title: "Managing Glucose Spikes After Meals", desc: "Key dietary modifications and active glucose metrics monitoring strategies." },
    { cat: "Mental Health", title: "Developing Stress Management Routines", desc: "Simple mental breathing exercises and cognitive strategies recommended by clinical psychologists." }
  ];

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Patient Health Library</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Health & Wellness Resources</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Browse medical articles, diet instructions, and clinical tips vetted by board-certified physicians.
        </p>
      </section>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '60px' }}>
        {articles.map((art, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '12px' }}>{art.cat}</span>
            <h4 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>{art.title}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', flexGrow: 1, marginBottom: '20px' }}>{art.desc}</p>
            <a href="#" className="service-learn-more" onClick={e => { e.preventDefault(); alert("Educational resource opened."); }}>
              Read Article <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
