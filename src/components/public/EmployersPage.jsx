import React, { useState } from 'react';

export default function EmployersPage({ setPage }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [accordionImg, setAccordionImg] = useState('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800');

  const accordionItems = [
    {
      title: 'A strategic partner',
      text: 'Entrusted to serve more than 12,000 clients worldwide, with 80% saying they consider us a strategic partner.*',
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Commitment to clinical quality',
      text: 'Committed to clinical innovation and continuous quality improvement under the leadership of a vast clinical team and chief medical officer.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Strong satisfaction rates',
      text: '90%+ member satisfaction and 4x higher telehealth utilization than the industry average.*',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Addressing health disparities',
      text: 'Investments in more culturally aware care, such as hiring racially and ethnically diverse care providers and using data to address health disparities.',
      img: 'https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Accredited and certified',
      text: 'Our solutions ensure the highest quality care, informed by industry standards.',
      img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const solutionCards = [
    {
      title: 'Primary Care',
      desc: 'Achieve better outcomes through convenient, high-quality primary care',
      img: 'https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=600',
      page: 'primary-care'
    },
    {
      title: 'Mental Health',
      desc: 'Offer easy access to licensed therapists while removing the stigma and barriers to care',
      img: 'https://images.unsplash.com/photo-1527137341206-1a2ab818aa69?auto=format&fit=crop&q=80&w=600',
      page: 'mental-health'
    },
    {
      title: 'Integrated whole-person care',
      desc: 'Provide a unified employee experience across primary care, chronic care and mental healthcare',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      page: 'chronic-care'
    },
    {
      title: 'Weight and obesity management',
      desc: 'Deliver a clinically led, personalized approach to weight and obesity care',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
      page: 'weight-management'
    },
    {
      title: 'Diabetes care',
      desc: 'Discover how our evidence-based cardiometabolic program drives engagement and outcomes for people with diabetes',
      img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
      page: 'b2b-diabetes'
    },
    {
      title: 'Chronic care',
      desc: 'Address multicondition needs with solutions that offer cost savings and improved outcomes',
      img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600',
      page: 'chronic-care'
    },
    {
      title: 'Hypertension',
      desc: 'See how combining smart tech with a human touch helps improve heart health for your population.',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
      page: 'hypertension'
    },
    {
      title: '24/7 Care',
      desc: 'Offer members around-the-clock access to on-demand care for urgent medical needs',
      img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      page: 'urgent-care'
    },
    {
      title: 'Employee Assistance Program',
      desc: 'Provide confidential support for life\'s challenges with our comprehensive EAP',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
      page: 'eap'
    },
  ];

  return (
    <div className="tdh-page animate-fade-in" style={{ paddingTop: '80px' }}>

      {/* ===== HERO ===== */}
      <section
        className="tdh-hero emp-hero"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600')`
        }}
      >
        <div className="tdh-hero-overlay" style={{ background: 'linear-gradient(to right, rgba(10,30,60,0.8) 0%, rgba(10,30,60,0.4) 70%, transparent 100%)' }}></div>
        <div className="tdh-hero-content">
          <div className="tdh-hero-inner">
            <span className="emp-pretitle">Employers</span>
            <h1 className="tdh-hero-title">
              A health benefit your employees will actually use
            </h1>
            <div className="tdh-hero-desc">
              <p>SummitMD connects your workforce to the right care at the right time—boosting productivity, lowering costs and improving health outcomes.</p>
            </div>
            <div className="tdh-hero-ctas">
              <a href="#" className="tdh-btn tdh-btn-primary-inverted" onClick={e => { e.preventDefault(); setPage('contact'); }}>
                Request a demo
              </a>
              <a href="#" className="tdh-btn tdh-btn-secondary-inverted" onClick={e => { e.preventDefault(); setPage('library'); }}>
                See resources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3-BENEFIT ICONS ===== */}
      <section className="emp-benefits-strip">
        <div className="emp-benefits-inner">
          {[
            { icon: '✓', title: 'Improve outcomes', desc: 'Address top cost and quality-of-life drivers, including diabetes, hypertension, weight management and mental health' },
            { icon: '📋', title: 'Build a better benefits package', desc: "Serve a full range of your population's health and well-being needs with a portfolio of solutions" },
            { icon: '📈', title: 'Spark and sustain engagement', desc: 'Optimize engagement with data-driven programs and consumer best practices' },
          ].map((item, i) => (
            <div className="emp-benefit-card" key={i}>
              <div className="emp-benefit-icon">{item.icon}</div>
              <h3 className="emp-benefit-title">{item.title}</h3>
              <p className="emp-benefit-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATAPULT HEALTH CALLOUT ===== */}
      <section className="emp-catapult">
        <div className="emp-catapult-inner">
          <div className="emp-catapult-content">
            <h2>Improving access to preventive care with Catapult Health, now part of SummitMD.</h2>
            <p>Catapult Health VirtualCheckups® makes it easy to complete at-home wellness exams for early risk detection.</p>
            <a
              href="https://www.catapulthealth.com/"
              target="_self"
              rel="noopener noreferrer"
              className="tdh-btn tdh-btn-primary-inverted"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ===== 20+ YEARS ACCORDION ===== */}
      <section className="emp-accordion-section">
        <div className="emp-accordion-inner">
          <div className="emp-accordion-list">
            <h2 className="emp-accordion-title">Putting 20+ years of virtual care expertise to work for you</h2>
            {accordionItems.map((item, i) => (
              <div
                key={i}
                className={`emp-accordion-item${activeAccordion === i ? ' open' : ''}`}
              >
                <button
                  className="emp-accordion-header"
                  onClick={() => {
                    setActiveAccordion(activeAccordion === i ? null : i);
                    setAccordionImg(item.img);
                  }}
                >
                  <h3>{item.title}</h3>
                  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                    <path d={activeAccordion === i ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'} stroke="#6240e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {activeAccordion === i && (
                  <div className="emp-accordion-body">
                    <p>{item.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="emp-accordion-image">
            <img
              src={accordionImg}
              alt="Employer solutions"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80'; }}
            />
          </div>
        </div>
      </section>

      {/* ===== WHOLE-PERSON SOLUTIONS CAROUSEL ===== */}
      <section className="emp-solutions-section">
        <div className="emp-solutions-inner">
          <h2 className="emp-solutions-title">A whole-person approach to care</h2>
          <div className="emp-solutions-grid">
            {solutionCards.map((card, i) => (
              <div
                className="emp-solution-card"
                key={i}
                onClick={() => setPage(card.page)}
              >
                <div className="emp-solution-card-img-wrap">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="emp-solution-card-img"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80'; }}
                  />
                </div>
                <div className="emp-solution-card-body">
                  <h3 className="emp-solution-card-title">{card.title}</h3>
                  <p className="emp-solution-card-desc">{card.desc}</p>
                  <span className="emp-solution-card-link">Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="emp-stats-section">
        <div className="emp-stats-inner">
          <h2>Proven results for employers</h2>
          <div className="emp-stats-grid">
            {[
              { stat: '12,000+', label: 'Clients served worldwide' },
              { stat: '80%', label: 'Of clients consider us a strategic partner' },
              { stat: '90%+', label: 'Member satisfaction rate' },
              { stat: '4x', label: 'Higher telehealth utilization than industry average' },
            ].map((item, i) => (
              <div className="emp-stat-card" key={i}>
                <div className="emp-stat-number">{item.stat}</div>
                <div className="emp-stat-label">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="emp-stats-footnote">*SummitMD data, 2023</p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="tdh-cta-banner">
        <div className="tdh-cta-banner-inner">
          <h2>Ready to transform your employee health benefits?</h2>
          <p>Talk to one of our experts to learn how SummitMD can help your organization.</p>
          <div className="tdh-cta-banner-btns">
            <a href="#" className="tdh-btn tdh-btn-primary-inverted" onClick={e => { e.preventDefault(); setPage('contact'); }}>
              Request a demo
            </a>
            <a href="#" className="tdh-btn tdh-btn-outline-inverted" onClick={e => { e.preventDefault(); setPage('library'); }}>
              See resources
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
