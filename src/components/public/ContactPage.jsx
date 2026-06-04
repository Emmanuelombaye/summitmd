import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Contact Teladoc Health</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Get In Touch With Us.</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
          Have general inquiries, technical billing issues, or wish to connect PeakHealth interfaces? Reach our patient coordinator teams directly.
        </p>
      </section>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '60px' }}>
        <div className="glass-card" style={{ padding: '32px' }}>
          <h3>Reach Support</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>Patient support lines are active 24 hours a day, 7 days a week.</p>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Phone size={20} style={{ color: 'var(--color-accent)' }} /> <span>General Patient Care: 1-800-TELADOC (835-2362)</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Mail size={20} style={{ color: 'var(--color-accent)' }} /> <span>Email Support: support@teladochealth.com</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <MapPin size={20} style={{ color: 'var(--color-accent)' }} /> <span>HQ: 482 Pinehurst Dr, Seattle, WA 98101</span>
            </li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '32px' }}>
          <h3>Submit a Message</h3>
          <form onSubmit={e => { e.preventDefault(); alert("Feedback message sent successfully."); }}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="e.g. Alex" required />
            </div>
            <div className="form-group">
              <label>Message Content</label>
              <input type="text" placeholder="Describe your inquiry..." required />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}
