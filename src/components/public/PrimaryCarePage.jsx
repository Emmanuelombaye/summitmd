import React, { useState } from 'react';
import { Stethoscope, Check, ArrowLeft, Plus, Minus, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export default function PrimaryCarePage({ setPage }) {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is Primary Care from SummitMD?",
      a: "Virtual primary care is ongoing, relationship-based care with a provider who helps you manage your health over time—all by phone or video. Choose a primary care provider who gets to know your health history and goals. Get help with preventive care, chronic conditions and new concerns. Receive a personalized care plan with next steps. Access a dedicated care team for ongoing support. Get referrals to in-person care when needed."
    },
    {
      q: "Why choose SummitMD virtual primary care over physical alternatives?",
      a: "We’re simplifying our language and processes to make it clearer and easier to understand the primary care experience we offer. While physical checkups can take weeks to schedule and hours of travel, SummitMD provides personalized care, trusted board-certified providers, and continuous support for both everyday and long-term health from home."
    },
    {
      q: "Who can use Primary Care?",
      a: "Virtual primary care is available to eligible adults and is a good fit for anyone looking for convenient, ongoing care. It is available for adults 18 and older. It is ideal if you don’t currently have a primary care provider, helpful if you want more consistent or convenient access to care, and a good option if it’s hard to get in-person appointments."
    },
    {
      q: "Who are the primary care providers at SummitMD?",
      a: "You’ll work with experienced, board-certified doctors and nurse practitioners trained to deliver high-quality care virtually. Providers specialize in family medicine, internal medicine, and related fields. They are experienced in building long-term relationships with patients, supported by a dedicated care team (nurses, medical assistants, care coordinators), and focused on whole-person care—both physical and mental health."
    },
    {
      q: "What should I expect during my first visit?",
      a: "Your first visit is focused on understanding your health and creating a plan that works for you. You will meet by video (recommended) or phone, review your medical history, concerns and goals, and discuss any lab results, images or documents you’ve uploaded. You will get a personalized care plan with clear next steps, receive follow-up support from your care team after the visit, and receive a blood pressure monitor at no cost to you."
    },
    {
      q: "How can I do this from home?",
      a: "Virtual primary care is designed to give you meaningful care from home, with tools and support to make it easy. Meet with your provider by phone or video, receive a Welcome Kit with a blood pressure monitor (yours to keep), share readings and updates directly with your care team, upload lab results, images or documents before your visit, and access your care plan anytime through your account."
    },
    {
      q: "How does virtual primary care work with in-person care?",
      a: "Your provider and care team help coordinate in-person care when it’s needed, so you’re never on your own. Get referrals for labs, imaging, specialists or vaccinations, connected to in-network providers and facilities. The care team helps coordinate appointments and next steps, and results are reviewed with you and added to your care plan."
    },
    {
      q: "What is my care team?",
      a: "Your care team supports you between visits, helping coordinate care and making it easier to stay on track. It includes nurses, medical assistants and care coordinators who help with vitals tracking, lab orders, and referrals. They answer questions, provide guidance between visits, and work alongside your primary care provider."
    },
    {
      q: "Can I get a prescription?",
      a: "Yes, your provider can prescribe medications and manage refills when appropriate. They prescribe medications for conditions like high blood pressure, diabetes, and more, provide refills for ongoing medications, and may prescribe up to a full year for maintenance medications. Clinical decisions are based on your needs and medical history."
    },
    {
      q: "Can you prescribe GLP-1 medications for weight loss?",
      a: "GLP-1 medications may be prescribed when clinically appropriate and allowed by state regulations. They are available for established members based on a full medical evaluation and your health goals, and may be part of a broader weight management approach. Costs depend on your insurance coverage."
    },
    {
      q: "How do you handle blood work, imaging and labs?",
      a: "Your provider can order tests and help coordinate everything you need to complete them. Lab work, imaging and screenings can be ordered during your visit, and the care team helps connect you to in-network labs or facilities. Results are reviewed with you by your provider, included in your care plan, and stored in your account."
    },
    {
      q: "What happens if I need to speak with a doctor right away?",
      a: "If you need immediate care for a non-emergency issue, you can connect with a provider 24/7. Use 24/7 Care for concerns like cold, flu, or infections. This is available anytime, day or night, is separate from your ongoing primary care relationship, and is best for urgent, one-time needs."
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

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
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Continuous Relationship-Based Care</span>
          <h1 style={{ fontSize: '2.75rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>
            Virtual primary care that helps you stay on top of your health.
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
            Get personalized primary care with SummitMD. Primary Care offers a suite of services to care for your physical and mental health. Connect with top providers from home or on the go.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Get Started</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage('login')}>Member Log In</button>
          </div>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=450" 
            alt="Ongoing virtual primary care consultation" 
            style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      </section>

      {/* Value Proposition */}
      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '16px' }}>Meet with a primary care provider to feel better every day.</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              Virtual primary care is ongoing, relationship-based care with a provider who helps you manage your health over time—all by phone or video. Your provider and care team coordinate in-person labs, specialists, and screenings so you have everything you need in one place.
            </p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--color-success)', fontWeight: 600, fontSize: '0.9rem' }}>
              <ShieldCheck size={18} /> Complete FHIR Record Integration & Sync Enabled
            </div>
          </div>
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Primary care that works for you:</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Choose a primary care provider who gets to know your health history and goals.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Get support for preventive care, chronic conditions, and new everyday concerns.</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Check size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>Access a dedicated care team for ongoing support, vital tracking, and lab coordination.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Database */}
      <section className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '12px' }}>What is Primary Care?</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '48px' }}>Still have questions? Expand any item below to read details.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-card" 
              style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => toggleFaq(idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Stethoscope size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /> {faq.q}
                </h4>
                {openIdx === idx ? <Minus size={18} /> : <Plus size={18} />}
              </div>
              {openIdx === idx && (
                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '16px', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer strip */}
      <section style={{ backgroundColor: 'var(--color-primary)', color: '#FFFFFF', padding: '60px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '12px' }}>Take control of your health on your own schedule.</h2>
          <p style={{ opacity: 0.8, fontSize: '0.95rem', marginBottom: '24px' }}>Verify your insurance coverage, match with a clinician, and configure your remote diagnostic vitals pack today.</p>
          <button className="btn btn-primary" onClick={() => setPage('register')}>Get Started Now</button>
        </div>
      </section>
    </div>
  );
}
