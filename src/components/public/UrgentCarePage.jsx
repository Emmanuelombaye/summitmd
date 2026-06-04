import React from 'react';
import { HeartPulse, Check, ArrowLeft, Stethoscope, Clock, ShieldAlert } from 'lucide-react';

export default function UrgentCarePage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Back to Home Header navigation */}
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
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>24/7 Virtual Consultations</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Urgent Care, Whenever You Need It.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Get diagnosed and treated for common illnesses by board-certified physicians from the comfort of your home. No scheduling needed—average wait time is under 10 minutes.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Get Care Now</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('login')}>Member Log In</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400" 
            alt="Physician examining virtual patient" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Symptoms list */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>What We Treat</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>Skip the trip to the ER or clinic for these non-emergency conditions.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} style={{ color: 'var(--color-accent)' }} /> Cold, Flu & Cough
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Get prescription cough medication, nasal sprays, or flu remedies sent straight to your local pharmacy.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} style={{ color: 'var(--color-accent)' }} /> Allergies & Sinus
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Consultation on respiratory blockages, seasonal allergies, sinus pressure, and matching antihistamine options.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} style={{ color: 'var(--color-accent)' }} /> Infections & Rashes
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Urgent support for UTIs, minor skin rashes, pink eye, ear aches, and prescription antibiotics/ointments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="container" style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>How Online Urgent Care Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">1</div>
            <h4>Request Visit</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Log in to your SummitMD portal, select Urgent Care, and answer a brief symptom intake checklist.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">2</div>
            <h4>Consult Physician</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Enter the waiting room and connect via a secure, high-definition video call to a board-certified physician.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">3</div>
            <h4>Pickup Prescriptions</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>If needed, your physician sends the prescription directly to your chosen local pharmacy for convenient pickup.</p>
          </div>
        </div>
      </section>

      {/* Safety Alert Banner */}
      <section className="container" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', gap: '16px', padding: '24px', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--color-danger)', borderRadius: '12px', alignItems: 'center' }}>
          <ShieldAlert size={36} style={{ color: 'var(--color-danger)', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: 'var(--color-danger)' }}>Is this an emergency?</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              If you are experiencing severe chest pain, trouble breathing, sudden weakness/numbness, major bleeding, or other life-threatening medical events, please call 911 immediately or go to the nearest emergency room.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
