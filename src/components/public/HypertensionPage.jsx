import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Smartphone, Heart, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function HypertensionPage({ setPage }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the Teladoc Health Hypertension Management program?",
      a: "The Hypertension Management program helps people with high blood pressure understand and improve their readings using a connected blood pressure monitor, personal insights and expert coaching. Members receive a connected blood pressure monitor that uploads readings automatically to the app. Coaching and health guidance are part of the program, and everything is included at no cost for eligible members."
    },
    {
      q: "Who can join the Hypertension Management program?",
      a: "You can join if you have high blood pressure and your employer, health plan or healthcare provider offers the program. Spouses and dependents may also qualify. Covered by many of the largest in-network health plans. Learn more about your eligibility by completing the registration process."
    },
    {
      q: "Is there a cost to join the Hypertension Management program?",
      a: "No. The program is covered for eligible members. Your employer, health plan or healthcare provider pays for the program. Shipping is included, and you will not receive a bill for participating."
    },
    {
      q: "What do I get with the Hypertension Management program?",
      a: "Members receive a connected blood pressure monitor and ongoing guidance. The monitor uploads readings automatically to your app and does not require Wi-Fi. The Teladoc Health app offers tools for tracking weight, activity, and food, and coaches provide support on lifestyle habits linked to blood pressure."
    },
    {
      q: "How does the Hypertension Management program help me manage my blood pressure?",
      a: "The program provides real-time readings and expert support to help you understand and improve your numbers. If you opt in, coaches can offer guidance on nutrition, activity, and stress management, helping you track progress over time."
    }
  ];

  return (
    <div className="landing-layout animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--color-border)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>
            Teladoc Health Hypertension Management
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#ffffff', 
        padding: '60px 0 80px 0',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#5c24e5', fontWeight: 700 }}>
              CHRONIC CONDITION SUPPORT
            </span>
            <h1 style={{ 
              fontSize: '3.25rem', 
              color: 'var(--color-primary)', 
              lineHeight: 1.15,
              fontWeight: 800,
              fontFamily: 'var(--font-display)'
            }}>
              Managing your blood pressure just got easier
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: 1.6 }}>
              Discover support for chronic conditions with smart devices, expert coaches and easy-to-follow, personalized plans.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button 
                className="btn btn-primary" 
                style={{ 
                  backgroundColor: '#5c24e5', 
                  color: '#ffffff', 
                  padding: '14px 32px', 
                  fontSize: '1rem',
                  borderRadius: '30px',
                  fontWeight: 700
                }} 
                onClick={() => setPage('register')}
              >
                Check My Eligibility <ArrowRight size={18} />
              </button>
              <div style={{ 
                display: 'inline-flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                backgroundColor: 'rgba(92, 36, 229, 0.1)', 
                color: '#5c24e5',
                padding: '8px 16px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>$0</span>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700 }}>Cost to you</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src="/hypertension_hero.png" 
              alt="Blood Pressure monitor and kit illustration" 
              style={{ 
                width: '100%', 
                maxWidth: '440px', 
                borderRadius: '16px',
                boxShadow: 'var(--shadow-md)'
              }} 
            />
          </div>
        </div>
      </section>

      {/* Really, it is $0 cost to you Banner */}
      <section style={{ padding: '45px 0', backgroundColor: '#F0FDF4' }}>
        <div className="container" style={{ 
          maxWidth: '800px', 
          backgroundColor: '#ffffff', 
          border: '1px solid #BBF7D0', 
          borderRadius: '16px', 
          padding: '32px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ 
            backgroundColor: '#DCFCE7', 
            color: '#16A34A', 
            width: '54px', 
            height: '54px', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: '#14532D', fontWeight: 800, marginBottom: '8px' }}>
              Really. It’s $0 cost to you.
            </h3>
            <p style={{ color: '#166534', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Your employer, health plan or healthcare provider has your back. They’ve already covered the entire cost of the program for you.
            </p>
          </div>
        </div>
      </section>

      {/* Program Deliverables Column */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#5c24e5', fontWeight: 700 }}>
              HYPERTENSION MANAGEMENT PROGRAM
            </span>
            <h3 style={{ fontSize: '2rem', marginTop: '8px', marginBottom: '24px', color: 'var(--color-primary)' }}>
              Get started today to receive:
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} style={{ color: '#5c24e5', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: 'var(--color-text-dark)', fontSize: '1.05rem' }}>
                  A connected blood pressure monitor shipped to your door at no cost to you
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} style={{ color: '#5c24e5', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: 'var(--color-text-dark)', fontSize: '1.05rem' }}>
                  Easy access to your readings and progress right from the app
                </span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={20} style={{ color: '#5c24e5', marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: 'var(--color-text-dark)', fontSize: '1.05rem' }}>
                  Personalized support for managing medications, stress, sleep and fitness
                </span>
              </li>
            </ul>
            <div style={{ marginTop: '32px' }}>
              <button className="btn btn-primary" style={{ backgroundColor: '#5c24e5', color: '#fff' }} onClick={() => setPage('register')}>
                Check My Eligibility
              </button>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500" 
              alt="Vitals monitoring kit setup" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
        </div>
      </section>

      {/* 3 Step Roadmap */}
      <section style={{ padding: '60px 0', backgroundColor: '#f8fafc', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h3 style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '40px' }}>
            Don't miss out — you’re only 3 steps away
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#5c24e5', marginBottom: '16px' }}>1</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>See if you qualify</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Select the “Check my eligibility” button to complete our brief registration quiz.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#5c24e5', marginBottom: '16px' }}>2</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Claim your kit</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Once approved, your smart cellular blood pressure cuff will be shipped directly to your door.
              </p>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '32px 24px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#5c24e5', marginBottom: '16px' }}>3</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>Activate your device</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Power on and take your first reading. Readings sync automatically to the app tracker.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tailored support block */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500" 
              alt="Yoga session representing wellness support" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-primary)', fontWeight: 800 }}>
              Tools and support, tailored to you
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Your health goals and challenges are unique, so your Teladoc Health program should be too. You'll get personalized insights on your readings and one-on-one support from expert coaches, all to help you take charge of your health.
            </p>
          </div>
        </div>
      </section>

      {/* Palm of your hand block */}
      <section style={{ padding: '60px 0', backgroundColor: '#e0f2fe' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: 'var(--color-primary)', fontWeight: 800 }}>
              Blood pressure management in the palm of your hand
            </h3>
            <p style={{ color: 'var(--color-text-dark)', opacity: 0.8, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Enjoy easier tracking, set up reminders, message a coach, and review trends from anywhere.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" style={{ backgroundColor: '#5c24e5', color: '#fff' }} onClick={() => setPage('register')}>
                Check My Eligibility
              </button>
              <button className="btn btn-outline" style={{ borderColor: '#5c24e5', color: '#5c24e5' }} onClick={() => setPage('how-it-works')}>
                Get the App
              </button>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=500" 
              alt="Woman smiling looking at smartphone app" 
              style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} 
            />
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.25rem', textAlign: 'center', marginBottom: '48px', color: 'var(--color-primary)' }}>
            Frequently Asked Questions
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                style={{ 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  style={{ 
                    width: '100%', 
                    padding: '24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                    {faq.q}
                  </span>
                  {activeFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                {activeFaq === index && (
                  <div style={{ 
                    padding: '0 24px 24px 24px', 
                    fontSize: '0.95rem', 
                    lineHeight: 1.6, 
                    color: 'var(--color-text-muted)',
                    backgroundColor: '#ffffff'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F2A4A', color: 'rgba(255,255,255,0.7)', padding: '30px 0', textAlign: 'center', fontSize: '0.85rem', marginTop: 'auto' }}>
        <div className="container">
          <p>&copy; 2026 Teladoc Health Health Systems, Inc. All rights reserved. Vitals synchronized via PeakHealth API.</p>
        </div>
      </footer>

    </div>
  );
}
