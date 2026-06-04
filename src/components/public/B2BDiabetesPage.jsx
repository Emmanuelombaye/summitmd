import React from 'react';
import { ArrowLeft, Check, TrendingDown, Target, ShieldCheck, HeartPulse } from 'lucide-react';

export default function B2BDiabetesPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Navigation header */}
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
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>B2B Clinical Program</span>
          <h1 style={{ fontSize: '2.75rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>
            A results-based diabetes solution for employers and health plans.
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
            See how high-quality care and a personalized experience work together to deliver better outcomes. Lower claims expenses and optimize employee glycemic control.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => alert("Request Demo Form Loaded")}>Request Partner Demo</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('contact')}>Speak With Sales</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=450" 
            alt="Medical testing for blood sugar levels" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Clinical pillars */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>How We Deliver Better Outcomes</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>Combining smart data transmission with board-certified coaching teams.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Dedicated, Provider-Led Care Teams</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Our nurses, diabetes educators, and doctors establish continuous relationships with employees, ensuring consistent counseling protocols.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Data-Driven Content Drives Change</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Connected glucose meters upload observations instantly via PeakHealth. Predictive algorithms dispatch tips based on specific glycemic trends.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Support at the Right Time</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>By managing sub-optimal glucose trends proactively, we redline ER redirection and save insurers high emergency medical claim fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees section */}
      <section className="container" style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Our Diabetes Approach Delivers Results.</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '48px' }}>We back our clinical impact with contract guarantees.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-accent)', marginBottom: '12px' }}><TrendingDown size={28} /></div>
            <h4>100% Fees at Risk</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>We put our program costs on the line. If we do not hit agreed-upon employee health improvements, we return the administrative fees.</p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-accent)', marginBottom: '12px' }}><Target size={28} /></div>
            <h4>Sustainable Outcomes</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Demonstrated long-term drop in HbA1c averages. Our program users see sustained blood glucose stabilization month over month.</p>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ color: 'var(--color-accent)', marginBottom: '12px' }}><HeartPulse size={28} /></div>
            <h4>Integrated Mental Health</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Diabetes burnout is real. We provide direct access to mental health counseling sessions to support members in healthy habits.</p>
          </div>
        </div>
      </section>

      {/* GLP-1 and Closing */}
      <section className="container" style={{ marginBottom: '60px', borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <h3>Navigating the New Age of GLP-1s</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '12px', lineHeight: 1.7 }}>
              Anti-obesity and GLP-1 medications are highly effective but carry substantial costs for employers and plan sponsors. Teladoc Health provides rigorous clinical checks, prior-authorization workflows, and integrated metabolic behavior counseling to ensure medications are utilized by candidates who benefit most.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <ShieldCheck size={36} style={{ color: 'var(--color-accent)', margin: '0 auto 12px auto' }} />
            <h4>Connect Your Employees</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: '20px' }}>Learn about how our customized solutions map to your health plan designs.</p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => alert("Request Demo Form Loaded")}>Get Details</button>
          </div>
        </div>
      </section>
    </div>
  );
}
