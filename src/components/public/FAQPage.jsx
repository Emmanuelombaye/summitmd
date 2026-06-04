import React, { useState } from 'react';
import { Search, HelpCircle, ArrowLeft, Plus, Minus } from 'lucide-react';

export default function FAQPage({ setPage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "What is SummitMD?",
      a: "SummitMD is a modern, virtual healthcare platform providing round-the-clock access to board-certified physicians, therapists, psychiatrists, and specialists. We allow you to consult from home via secure video calls."
    },
    {
      q: "How do I connect my PeakHealth records?",
      a: "During registration, enter your PeakHealth Patient ID (MRN). SummitMD's sync layer automatically queries the PeakHealth API to fetch your medication lists, baseline vitals, and condition history to populate your dashboard."
    },
    {
      q: "Can doctors prescribe medications?",
      a: "Yes. If clinically appropriate, SummitMD practitioners can submit prescriptions electronically to your local pharmacy. Note: We do not prescribe controlled substances (like narcotics or certain ADHD treatments) online."
    },
    {
      q: "How much does a virtual visit cost?",
      a: "If you have insurance verified via PeakHealth, your visit may be fully covered or require a standard copay ($15-$20). For self-pay members, urgent care is priced at a flat rate of $75 per session."
    },
    {
      q: "Is my medical data secure?",
      a: "Absolutely. SummitMD is fully HIPAA-compliant. All video streams and chat interactions are encrypted (AES-256) and stored on secure health servers under strict clinical security guidelines."
    },
    {
      q: "How long is the waiting room queue?",
      a: "For 24/7 Urgent Care visits, no scheduling is required. You will be placed in the virtual waiting room, and a doctor typically connects with you in under 10 minutes."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

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
      <section className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Support & Help Center</span>
        <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Frequently Asked Questions</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Have questions about billing, insurance sync, or scheduling? Browse our help articles or search below.
        </p>
      </section>

      {/* Search Input */}
      <section className="container" style={{ maxWidth: '680px', marginBottom: '48px' }}>
        <div className="search-bar-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search help articles..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem' }}
          />
        </div>
      </section>

      {/* FAQ list */}
      <section className="container" style={{ maxWidth: '680px', marginBottom: '80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '20px' }}>
              No matching help articles found.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <HelpCircle size={18} style={{ color: 'var(--color-accent)' }} /> {faq.q}
                  </h4>
                  {openIdx === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
                {openIdx === idx && (
                  <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '16px', lineHeight: 1.7 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
