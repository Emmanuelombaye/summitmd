import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';

export default function SpecialtyWellnessPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Back navigation header */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--color-border)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
            Teladoc Health Specialty & Wellness
          </div>
        </div>
      </div>

      {/* Hero Section (Plum/Dark Purple Background) */}
      <section style={{ 
        backgroundColor: '#251c50', 
        color: '#ffffff', 
        padding: '60px 0 80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#00d2c4', 
              fontWeight: 700 
            }}>
              SPECIALTY CARE & WELLNESS
            </span>
            <h1 style={{ 
              fontSize: '3.25rem', 
              color: '#ffffff', 
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: 'var(--font-display)'
            }}>
              Boost your health with ease
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem', lineHeight: 1.6 }}>
              Our specialty and wellness services provide you with high-quality connected care for the whole you — by phone, video or app.
            </p>
            <div>
              <button 
                className="btn" 
                style={{ 
                  backgroundColor: '#00d2c4', 
                  color: '#0F2A4A', 
                  padding: '14px 32px', 
                  fontSize: '1rem',
                  borderRadius: '30px',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(0, 210, 196, 0.3)'
                }} 
                onClick={() => setPage('register')}
              >
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/specialty_wellness_hero.png" 
              alt="Specialty Wellness illustration" 
              style={{ 
                width: '100%', 
                maxWidth: '480px', 
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)' 
              }} 
            />
          </div>
        </div>
      </section>

      {/* Main Title Header */}
      <section className="container" style={{ padding: '60px 0 20px 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 800 }}>
          Some ways Teladoc Health can help
        </h2>
      </section>

      {/* Specialty Care Block (Dermatology, EMO, Local Care) */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', color: 'var(--color-primary)' }}>
              Online Specialty & Wellness Care
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Dermatology</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Upload photos to get a treatment plan for skin conditions like acne, eczema and more.{' '}
                    <a href="#" style={{ color: '#5c24e5', fontWeight: 600, textDecoration: 'underline' }} onClick={(e) => { e.preventDefault(); setPage('dermatology'); }}>
                      Read more about Dermatology
                    </a>
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Expert Medical Opinion</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Get an expert opinion on a diagnosis or complex treatment plan from leading US medical experts.{' '}
                    <a href="#" style={{ color: '#5c24e5', fontWeight: 600, textDecoration: 'underline' }} onClick={(e) => { e.preventDefault(); setPage('about'); }}>
                      Read more about EMO
                    </a>
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Local In-Person Care</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Get specialized help mapping and finding local medical providers to see in person if diagnostic testing or physical surgery is required.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500" 
              alt="Medical specialist online review" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
        </div>
      </section>

      {/* Wellness Care Block (Nutrition, Tobacco, Sexual Health, Sleep) */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500" 
              alt="Healthy lifestyle nutrition and fitness" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
          <div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '24px', color: 'var(--color-primary)' }}>
              Wellness care
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Nutrition</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Work with a registered dietitian to eat healthier, build meal plans, or manage your weight.{' '}
                    <a href="#" style={{ color: '#5c24e5', fontWeight: 600, textDecoration: 'underline' }} onClick={(e) => { e.preventDefault(); setPage('nutrition'); }}>
                      Read more about Nutrition
                    </a>
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Tobacco Cessation</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Get the help you need to quit with doctor-prescribed medications (if right for you) and ongoing support from a registered nurse.
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Sexual Health</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Get a lab order for sexually transmitted diseases (STDs) without going to a doctor's office, and review results securely online.
                  </p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '16px' }}>
                <div style={{ color: '#5c24e5', marginTop: '4px' }}><CheckCircle size={20} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>Improve Sleep</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Improve your quality of sleep and develop better sleep habits with the integrated{' '}
                    <a href="#" style={{ color: '#5c24e5', fontWeight: 600, textDecoration: 'underline' }} onClick={(e) => { e.preventDefault(); setPage('mental-health'); }}>
                      BetterSleep module
                    </a>.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* No Insurance Banner Section */}
      <section style={{ 
        backgroundColor: '#251c50', 
        color: '#ffffff', 
        padding: '50px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontSize: '2rem', color: '#ffffff', fontWeight: 800 }}>
            No insurance? No problem.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', maxWidth: '600px' }}>
            Get the care you need when you need it at a cost you can afford —{' '}
            <a href="#" style={{ color: '#00d2c4', fontWeight: 600, textDecoration: 'underline' }} onClick={(e) => { e.preventDefault(); setPage('how-it-works'); }}>
              learn more about our options
            </a>.
          </p>
          <div style={{ marginTop: '12px' }}>
            <button 
              className="btn btn-primary"
              style={{ backgroundColor: '#00d2c4', color: '#0F2A4A', padding: '12px 28px', fontSize: '0.95rem' }}
              onClick={() => setPage('register')}
            >
              Register for free
            </button>
          </div>
        </div>
      </section>

      {/* Simplified subpage footer */}
      <footer style={{ backgroundColor: '#0F2A4A', color: 'rgba(255,255,255,0.7)', padding: '30px 0', textAlign: 'center', fontSize: '0.85rem' }}>
        <div className="container">
          <p>&copy; 2026 Teladoc Health Health Systems, Inc. All rights reserved. Vitals synchronized via PeakHealth API.</p>
        </div>
      </footer>

    </div>
  );
}
