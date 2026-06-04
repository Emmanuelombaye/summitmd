import React, { useState } from 'react';

export default function LandingPage({ setPage }) {
  const careCards = [
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--10f50226-5f20-40d6-88e8-a3a9bc6fa491/image1.png?quality=85&preferwebp=true',
      title: '24/7 Care',
      desc: 'Talk to a medical provider anytime, day or night. Whether it\'s cold and flu symptoms, allergies or infections, get the care you need from anywhere.',
      cta: 'Learn more',
      page: 'urgent-care',
    },
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--44eeb530-3246-48c5-88d0-e63f9e931581/image2.png?quality=85&preferwebp=true',
      title: 'Primary Care',
      desc: 'Stay on top of your health with board-certified providers supporting your checkups, preventative care and prescriptions.',
      cta: 'Learn more',
      page: 'primary-care',
    },
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--cac2bb6b-c62e-43e0-8657-92b31ef70eb5/emp_mental.jpg.webp?quality=90&width=800&preferwebp=true',
      title: 'Mental Health',
      desc: 'Connect with a therapist or psychiatrist and get the support you need—however you prefer to engage.',
      cta: 'Learn more',
      page: 'mental-health',
    },
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--cccf04f6-a732-4fb8-9f9e-0357371cd144/card-obesity.png.webp?quality=90&width=800&preferwebp=true',
      title: 'Condition Management',
      desc: 'Get personalized support for diabetes, hypertension, weight management and more—right from your phone.',
      cta: 'Learn more',
      page: 'chronic-care',
    },
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--49d9fd7d-e78a-4b08-9474-13fe804249b8/emp_primary.jpg.webp?quality=90&width=800&preferwebp=true',
      title: 'Specialty Care',
      desc: 'Get expert medical opinions, dermatology visits and other specialty care—without the wait.',
      cta: 'Learn more',
      page: 'specialty-wellness',
    },
    {
      img: 'https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--3d3f9cf2-d3a9-42e8-825a-34fd72f88fbd/header-bettersleep.png.webp?quality=90&preferwebp=true&width=800',
      title: 'Everyday Habits',
      desc: 'Build lasting habits with support for better sleep, balanced nutrition and healthy lifestyle choices.',
      cta: 'Learn more',
      page: 'specialty-wellness',
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const cardsPerView = 3;
  const maxIndex = careCards.length - cardsPerView;

  const logos = ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare', 'Cigna', 'Humana', 'CVS Health', 'Anthem', 'Centene', 'Molina', 'WellCare'];

  return (
    <div className="tdh-page animate-fade-in" style={{ paddingTop: '0px' }}>
      
      {/* ===== HERO ===== */}
      <section className="tdh-hero" style={{
        backgroundImage: `url(https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--17277e00-0756-4dae-a420-fff308fbd934/Home_hero_2026-3.jpg.webp?quality=90&preferwebp=true&width=1600)`
      }}>
        <div className="tdh-hero-overlay"></div>
        <div className="tdh-hero-content">
          <div className="tdh-hero-inner tdh-hero-inner--center">
            <h1 className="tdh-hero-title">Connecting you to better health</h1>
            <div className="tdh-hero-desc">
              <p>SummitMD connects patients and care providers for medical care, mental health, chronic condition management and more.</p>
            </div>
            <div className="tdh-hero-ctas">
              <a href="#" className="tdh-btn tdh-btn-primary-inverted" onClick={e => { e.preventDefault(); setPage('register'); }}>
                Get care now
              </a>
              <a href="#" className="tdh-btn tdh-btn-secondary-inverted" onClick={e => { e.preventDefault(); setPage('no-insurance'); }}>
                No insurance needed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CARE CARDS ===== */}
      <section className="tdh-care-section">
        <div className="tdh-care-inner">
          <h2 className="tdh-care-heading">The care you need, all in one place</h2>
          <div className="tdh-care-carousel-wrap">
            <button
              className="tdh-carousel-btn tdh-carousel-btn--prev"
              disabled={currentCard === 0}
              onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
              aria-label="Previous"
            >‹</button>
            <div className="tdh-care-grid" style={{ transform: `translateX(-${currentCard * (100 / cardsPerView)}%)` }}>
              {careCards.map((card, i) => (
                <div className="tdh-care-card" key={i} onClick={() => setPage(card.page)}>
                  <div className="tdh-care-card-img-wrap">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="tdh-care-card-img"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80'; }}
                    />
                  </div>
                  <div className="tdh-care-card-body">
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                    <span className="tdh-care-card-link">{card.cta}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="tdh-carousel-btn tdh-carousel-btn--next"
              disabled={currentCard >= maxIndex}
              onClick={() => setCurrentCard(Math.min(maxIndex, currentCard + 1))}
              aria-label="Next"
            >›</button>
          </div>
          {/* Dots */}
          <div className="tdh-carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} className={`tdh-dot${currentCard === i ? ' active' : ''}`} onClick={() => setCurrentCard(i)} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
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
              src="https://www.SummitMD.com/adobe/dynamicmedia/deliver/dm-aid--d96568a7-d0b3-4001-b66d-2fc51fc50006/employers_hero.jpg.webp?quality=90&width=800&preferwebp=true"
              alt="Healthcare organization partner"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'; }}
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
            <a href="#" className="tdh-btn tdh-btn-primary-inverted" onClick={e => { e.preventDefault(); setPage('register'); }}>
              Get care now
            </a>
            <a href="#" className="tdh-btn tdh-btn-outline-inverted" onClick={e => { e.preventDefault(); setPage('contact'); }}>
              Contact us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
