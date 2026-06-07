import React, { useState, useEffect, useRef } from 'react';
import { Search, X, CheckCircle2, ArrowRight } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage({ setPage }) {
  const careCards = [
    {
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
      title: '24/7 Care',
      desc: 'Talk to a medical provider anytime, day or night. Get fast help for urgent needs from the comfort of your home.',
      cta: 'Get Care Now',
      page: 'urgent-care',
      badge: '24/7 Online',
      price: '$0 with insurance',
      theme: 'teal',
      symptoms: ['Cold & Flu', 'Allergies & Sinus', 'UTIs & Infections', 'Sore Throat & Cough'],
      keywords: ['cold', 'flu', 'cough', 'fever', 'sore throat', 'sinus', 'allergy', 'allergies', 'infection', 'uti', 'urgent', 'instant', 'night', 'now', 'refill']
    },
    {
      img: 'https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=400',
      title: 'Primary Care',
      desc: 'Stay on top of your health with board-certified providers supporting your routine checkups, wellness, and prescriptions.',
      cta: 'Book Appointment',
      page: 'primary-care',
      badge: 'Dedicated Doctor',
      price: 'Low Copay',
      theme: 'indigo',
      symptoms: ['Routine Checkups', 'Prescription Refills', 'Preventative Care', 'Chronic Disease Support'],
      keywords: ['doctor', 'checkup', 'preventative', 'refill', 'prescription', 'appointment', 'routine', 'wellness', 'health', 'exam']
    },
    {
      img: 'https://images.unsplash.com/photo-1527137341206-1a2ab818aa69?auto=format&fit=crop&q=80&w=400',
      title: 'Mental Health',
      desc: 'Connect with a licensed therapist or psychiatrist for personalized, ongoing support—on your terms.',
      cta: 'Find a Therapist',
      page: 'mental-health',
      badge: '100% Confidential',
      price: 'Copay Match',
      theme: 'rose',
      symptoms: ['Anxiety & Depression', 'Stress Management', 'Therapy & Psychiatry', 'Grief & Relationships'],
      keywords: ['mental', 'therapy', 'therapist', 'anxiety', 'depression', 'stress', 'grief', 'psychiatrist', 'psychiatry', 'counseling', 'mind', 'relationship']
    },
    {
      img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400',
      title: 'Condition Management',
      desc: 'Get personalized, device-connected support for diabetes, hypertension, and weight management.',
      cta: 'Explore Plans',
      page: 'chronic-care',
      badge: 'Devices Included',
      price: 'Free Program Option',
      theme: 'blue',
      symptoms: ['Diabetes Support', 'Hypertension Tracking', 'Weight Management', 'Continuous Monitoring'],
      keywords: ['diabetes', 'hypertension', 'blood pressure', 'glucose', 'weight', 'obesity', 'monitoring', 'chronic', 'device', 'scale', 'glp1', 'semaglutide']
    },
    {
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
      title: 'Specialty Care',
      desc: 'Get expert medical opinions, dermatologist visits, and other specialized clinical support without the long wait.',
      cta: 'Request Opinion',
      page: 'specialty-wellness',
      badge: 'Expert Clinical Team',
      price: 'Specialist Copay',
      theme: 'purple',
      symptoms: ['Dermatology & Rashes', 'Second Medical Opinions', 'Specialist Referrals', 'Complex Care Coordination'],
      keywords: ['specialist', 'opinion', 'dermatology', 'skin', 'rash', 'moles', 'acne', 'expert', 'second opinion', 'referral']
    },
    {
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
      title: 'Everyday Habits',
      desc: 'Build healthy, lasting lifestyle habits with professional support for sleep, nutrition, and exercise.',
      cta: 'Start Lifestyle Coaching',
      page: 'specialty-wellness',
      badge: 'Coaching Support',
      price: 'Wellness Plan',
      theme: 'gold',
      symptoms: ['Sleep Improvement', 'Nutrition & Meal Plans', 'Weight Management Support', 'Healthy Lifestyle Habits'],
      keywords: ['sleep', 'nutrition', 'habit', 'diet', 'meal', 'coach', 'exercise', 'lifestyle', 'fitness', 'weight loss']
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCurrentCard(0); // reset position on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsPerView = isMobile ? 1 : 3;
  const maxIndex = careCards.length - cardsPerView;

  const handleScroll = (e) => {
    if (!isMobile) return;
    const container = e.target;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth * 0.82 + 16;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < careCards.length && currentCard !== index) {
      setCurrentCard(index);
    }
  };

  const scrollToCard = (index) => {
    setCurrentCard(index);
    if (scrollContainerRef.current) {
      if (isMobile) {
        const cardWidth = scrollContainerRef.current.clientWidth * 0.82 + 16;
        scrollContainerRef.current.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  };

  const logos = ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Cigna', 'Humana', 'CVS Health', 'Anthem', 'Centene', 'Molina', 'WellCare'];

  return (
    <div className="tdh-page animate-fade-in" style={{ paddingTop: '0px' }}>
      
      {/* ===== HERO ===== */}
      <section className="tdh-hero" style={{
        backgroundImage: `url('/hero banner.png')`
      }}>
        {/* Transparent overlay buttons for desktop view (aligned with baked-in buttons in image) */}
        <div className="tdh-hero-desktop-overlays">
          <button 
            type="button" 
            id="hero-get-care-desktop"
            className="tdh-hero-overlay-btn tdh-hero-overlay-btn-left" 
            onClick={() => setPage('register')}
            aria-label="Get care now"
          />
          <button 
            type="button" 
            id="hero-no-insurance-desktop"
            className="tdh-hero-overlay-btn tdh-hero-overlay-btn-right" 
            onClick={() => setPage('no-insurance')}
            aria-label="No insurance needed"
          />
        </div>

        <div className="tdh-hero-overlay"></div>
        <div className="tdh-hero-content">
          <div className="tdh-hero-inner tdh-hero-inner--center">
            <h1 className="tdh-hero-title">Connecting you to better health</h1>
            <div className="tdh-hero-desc">
              <p>SummitMD connects patients and care providers for medical care, mental health, chronic condition management and more.</p>
            </div>
            <div className="tdh-hero-ctas">
              <button 
                type="button" 
                id="hero-get-care-mobile"
                className="tdh-btn tdh-btn-primary-inverted" 
                onClick={() => setPage('register')}
              >
                Get care now
              </button>
              <button 
                type="button" 
                id="hero-no-insurance-mobile"
                className="tdh-btn tdh-btn-secondary-inverted" 
                onClick={() => setPage('no-insurance')}
              >
                No insurance needed
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARE CARDS ===== */}
      <section className="tdh-care-section">
        <div className="tdh-care-inner">
          <h2 className="tdh-care-heading">The care you need, all in one place</h2>
          
          {/* Interactive Symptom Search */}
          <div className="tdh-symptom-search-container">
            <div className="tdh-symptom-search-wrapper">
              <Search className="tdh-symptom-search-icon" size={18} />
              <input
                type="text"
                className="tdh-symptom-search-input"
                placeholder="Search symptoms (e.g. flu, therapy, refill, rashes)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="tdh-symptom-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="tdh-care-carousel-wrap">
            <button
              className="tdh-carousel-btn tdh-carousel-btn--prev"
              disabled={currentCard === 0}
              onClick={() => scrollToCard(Math.max(0, currentCard - 1))}
              aria-label="Previous"
            >‹</button>
            
            <div 
              className="tdh-care-grid" 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              style={{ transform: isMobile ? 'none' : `translateX(-${currentCard * (100 / cardsPerView)}%)` }}
            >
              {careCards.map((card, i) => {
                const isSearchActive = searchQuery.trim() !== '';
                const lowercaseQuery = searchQuery.toLowerCase().trim();
                const isMatched = isSearchActive && (
                  card.title.toLowerCase().includes(lowercaseQuery) ||
                  card.desc.toLowerCase().includes(lowercaseQuery) ||
                  card.symptoms.some(s => s.toLowerCase().includes(lowercaseQuery)) ||
                  card.keywords.some(k => k.toLowerCase().includes(lowercaseQuery))
                );
                
                const cardClass = `tdh-care-card tdh-card-theme-${card.theme}${
                  isSearchActive ? (isMatched ? ' highlighted' : ' dimmed') : ''
                }`;

                return (
                  <div className={cardClass} key={i} onClick={() => setPage(card.page)}>
                    <div className="tdh-care-card-img-wrap">
                      <div className="tdh-card-badge">
                        <span className="tdh-card-badge-dot pulsing"></span>
                        {card.badge}
                      </div>
                      <img
                        src={card.img}
                        alt={card.title}
                        className="tdh-care-card-img"
                        loading={i < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        width="400"
                        height="240"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=60'; }}
                      />
                    </div>
                    <div className="tdh-care-card-body">
                      <div className="tdh-card-top-info">
                        <span className="tdh-card-price">{card.price}</span>
                      </div>
                      <h3>{card.title}</h3>
                      <p>{card.desc}</p>
                      
                      <div className="tdh-care-symptoms-list">
                        {card.symptoms.map((symptom, idx) => (
                          <div className="tdh-symptom-item" key={idx}>
                            <CheckCircle2 size={13} strokeWidth={2.5} />
                            <span>{symptom}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="tdh-care-card-link-wrapper" style={{ marginTop: '20px' }}>
                        <span>{card.cta}</span>
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button
              className="tdh-carousel-btn tdh-carousel-btn--next"
              disabled={currentCard >= maxIndex}
              onClick={() => scrollToCard(Math.min(maxIndex, currentCard + 1))}
              aria-label="Next"
            >›</button>
          </div>
          
          {/* Desktop Dots Indicator */}
          {!isMobile && (
            <div className="tdh-carousel-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button 
                  key={i} 
                  className={`tdh-dot${currentCard === i ? ' active' : ''}`} 
                  onClick={() => scrollToCard(i)} 
                  aria-label={`Go to slide ${i + 1}`} 
                />
              ))}
            </div>
          )}

          {/* Mobile Scroll Progress Indicator */}
          {isMobile && (
            <div className="tdh-care-scroll-indicator">
              {careCards.map((_, i) => (
                <button
                  key={i}
                  className={`tdh-scroll-dot ${currentCard === i ? 'active' : 'inactive'}`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== LOGO STRIP ===== */}
      <section className="tdh-logo-strip">
        <div className="tdh-logo-strip-inner">
          <p className="tdh-logo-strip-label">Trusted by leading health plans and employers</p>
          <div className="tdh-logo-strip-track">
            <div className="tdh-logo-strip-scroller">
              {[...logos, ...logos].map((l, i) => (
                <div className="tdh-logo-strip-item" key={i}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ORGANIZATIONS SECTION ===== */}
      <section className="tdh-org-section">
        <div className="tdh-org-inner">
          <div className="tdh-org-content">
            <span className="tdh-org-pretitle">Organizations</span>
            <h2>A trusted partner for better outcomes</h2>
            <p>SummitMD helps employers, health plans, hospitals and health systems deliver high-quality, cost-effective virtual care to the populations they serve.</p>
            <div className="tdh-org-ctas">
              <a href="#" className="tdh-btn tdh-btn-primary" onClick={e => { e.preventDefault(); setPage('employers'); }}>
                For employers
              </a>
              <a href="#" className="tdh-btn tdh-btn-outline" onClick={e => { e.preventDefault(); setPage('health-plans'); }}>
                For health plans
              </a>
              <a href="#" className="tdh-btn tdh-btn-outline" onClick={e => { e.preventDefault(); setPage('hospitals'); }}>
                For hospitals
              </a>
            </div>
          </div>
          <div className="tdh-org-image">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
              alt="Healthcare organization partner"
            />
          </div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="tdh-stats-section">
        <div className="tdh-stats-inner">
          {[
            { stat: '100+', label: 'Countries served' },
            { stat: '90M+', label: 'Virtual visits completed' },
            { stat: '#1', label: 'Most trusted telehealth brand' },
            { stat: '12,000+', label: 'Clients worldwide' },
          ].map((item, i) => (
            <div className="tdh-stat-item" key={i}>
              <div className="tdh-stat-number">{item.stat}</div>
              <div className="tdh-stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="tdh-cta-banner">
        <div className="tdh-cta-banner-inner">
          <h2>Start your journey to better health today</h2>
          <p>Join millions of people who trust SummitMD for their virtual care needs.</p>
          <div className="tdh-cta-banner-btns">
            <button type="button" className="tdh-btn tdh-btn-primary-inverted" onClick={() => setPage('register')}>
              Get care now
            </button>
            <button type="button" className="tdh-btn tdh-btn-outline-inverted" onClick={() => setPage('contact')}>
              Contact us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
