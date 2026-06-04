import React from 'react';
import { Sparkles, Check, ArrowLeft, Camera, ShieldCheck, HeartPulse } from 'lucide-react';

export default function DermatologyPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
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
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Customized Skin Science</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Expert Dermatology, Without the Wait.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Connect with a board-certified dermatologist online. Simply upload photos of your skin condition, and receive a customized diagnosis and prescription treatment plan within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Get Skin Review</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('login')}>Sign In</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" 
            alt="Applying skincare cream" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Conditions treated */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>Skin Conditions We Evaluate</h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>Get custom prescription creams, gels, or oral medication for chronic skin issues.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Acne & Rosacea</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Get prescription formulas containing Tretinoin, Clindamycin, Azelaic Acid, or oral antibiotics to clear redness and breakout cycles.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Eczema & Psoriasis</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Soothe chronic itching, dry scaling, and inflammation with tailored topical steroids, non-steroidal creams, or systemic advice.</p>
            </div>

            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>Moles & Rash Checks</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Upload close-up photos of new spots, rashes, insect bites, or changing moles for a professional evaluation by a skin specialist.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works steps */}
      <section className="container" style={{ padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>How Online Dermatology Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">
              <Camera size={20} />
            </div>
            <h4>Upload Photos</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Upload 3 clear photos of your skin concern from different angles and complete a short skin health survey.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">
              <HeartPulse size={20} />
            </div>
            <h4>Doctor Analysis</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>A dermatologist reviews your photos and diagnostic responses and builds your custom treatment report.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', fontWeight: 700, fontSize: '1.25rem', margin: '0 auto 16px auto' }} className="flex-center">
              <Sparkles size={20} />
            </div>
            <h4>Clear Skin Delivery</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Retrieve your prescription from your local pharmacy. You have 30 days of free follow-up messaging with your provider.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
