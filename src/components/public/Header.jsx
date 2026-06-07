import React, { useState, useEffect, useRef } from 'react';

const NAV_SHOPS = {
  label: 'Shops',
  products: [
    {
      category: 'Nutrition & Wellness',
      items: [
        {
          label: 'SummitMd Foundational Powder',
          desc: '75 vitamins, minerals, and whole-food sourced ingredients in one scoop.',
          href: 'shop',
          tag: 'Flagship'
        },
        {
          label: 'Targeted Supplements',
          desc: 'AGZ Sleep Support, high-purity Omega3, and liquid D3+K2 drops.',
          href: 'shop'
        },
        {
          label: 'Wellness Daily Essentials',
          desc: 'Zinc, Vitamin C, Prenatal multivitamins, and hydration electrolyte drinks.',
          href: 'shop'
        }
      ]
    },
    {
      category: 'Devices & Diagnostics',
      items: [
        {
          label: 'Chronic Disease Monitoring',
          desc: 'FDA-cleared blood pressure cuffs and smart glucose testing systems.',
          href: 'shop',
          tag: 'Essential'
        },
        {
          label: 'Maternal & Baby Care',
          desc: 'Pregnancy/ovulation kits, baby thermometers, and weighing scales.',
          href: 'shop'
        },
        {
          label: 'Clinical Devices',
          desc: 'Personal nebulizers, medication organizers, and compression socks.',
          href: 'shop'
        }
      ]
    },
    {
      category: 'Care Subscriptions',
      items: [
        {
          label: 'Teleconsultation Plans',
          desc: 'Unlimited virtual access to doctors, therapists, and nutritionists.',
          href: 'shop',
          tag: 'Popular'
        },
        {
          label: 'Home Medicine Delivery',
          desc: 'Automatic monthly prescription refills delivered straight to your door.',
          href: 'shop'
        },
        {
          label: 'Lab Bookings & B2B Packages',
          desc: 'Diagnostic panels, home test collections, and corporate wellness bundles.',
          href: 'shop'
        }
      ]
    }
  ],
  promo: {
    bg: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
    title: 'Foundational Nutrition, Simplified',
    cta: 'Shop the SummitMd Collection',
    href: 'shop'
  }
};

const NAV_INDIVIDUALS = {
  label: 'Patients',
  ways: [
    {
      label: '24/7 Care',
      href: 'urgent-care',
      desc: 'Skip the trip and get same-day care for common conditions.',
      sub: [
        { label: 'Overview', href: 'urgent-care' },
        { label: 'Get Care Now', href: 'register' },
      ],
    },
    {
      label: 'Mental Health',
      href: 'mental-health',
      desc: 'Find therapy that works best for you.',
      sub: [
        { label: 'SummitMD Mental Health', href: 'mental-health' },
        { label: 'BetterHelp', href: 'mental-health' },
      ],
    },
    {
      label: 'Weight Management',
      href: 'weight-management',
      desc: 'Weight loss and healthy living tailored to you.',
      sub: [
        { label: 'Overview', href: 'weight-management' },
        { label: 'Diabetes Prevention', href: 'diabetes-prevention' },
        { label: 'GLP‑1 Prescription & Support', href: 'glp1' },
        { label: 'Nutrition', href: 'nutrition' },
      ],
    },
    {
      label: 'Diabetes Management',
      href: 'diabetes-management',
      desc: 'A personalized way to manage and prevent diabetes.',
      sub: [
        { label: 'Overview', href: 'diabetes-management' },
        { label: 'Diabetes Prevention', href: 'diabetes-prevention' },
      ],
    },
    {
      label: 'Hypertension Management',
      href: 'hypertension',
      desc: 'Lowering your blood pressure just got easier.',
      sub: [{ label: 'Overview', href: 'hypertension' }],
    },
    {
      label: 'Specialty & Wellness',
      href: 'specialty-wellness',
      desc: "Skin issues? Meal planning? Or need a second opinion? We've got you covered.",
      sub: [
        { label: 'Overview', href: 'specialty-wellness' },
        { label: 'Dermatology', href: 'dermatology' },
        { label: 'Expert Medical Opinion', href: 'specialty-wellness' },
        { label: 'BetterSleep—Try for $0', href: 'specialty-wellness' },
      ],
    },
    {
      label: 'Primary Care',
      href: 'primary-care',
      desc: 'Looking for convenient, high-quality primary care? Welcome.',
      sub: [{ label: 'Overview', href: 'primary-care' }],
    },
  ],
  explore: [
    { label: 'Care Without Insurance', href: 'no-insurance' },
    { label: 'How It Works', href: 'how-it-works' },
    { label: 'Medicare', href: 'medicare' },
    { label: 'Medicaid', href: 'medicaid' },
    { label: 'FAQs', href: 'faq' },
    { label: 'About Us', href: 'about' },
    { label: 'Our Impact', href: 'our-impact' },
    { label: 'SummitMD Library', href: 'library' },
    { label: 'Contact Us', href: 'contact' },
  ],
  promo: {
    bg: '/better_sleep_promo.png',
    title: 'Stop racing thoughts and start sleeping better',
    cta: 'Explore sleep support',
    href: 'specialty-wellness',
  },
};

const NAV_ORGANIZATIONS = {
  label: 'Practices',
  partners: [
    {
      label: 'Employers',
      desc: 'Comprehensive care for better employee health',
      solutions: [
        { label: 'Overview', href: 'employers' },
        { label: 'Integrated Care', href: 'employers-integrated' },
        { label: '24/7 Care', href: 'urgent-care' },
        { label: 'Chronic Care', href: 'chronic-care', sub: [
          { label: 'Diabetes', href: 'b2b-diabetes' },
          { label: 'Hypertension', href: 'hypertension' },
          { label: 'Obesity & Weight Care', href: 'weight-management' },
        ]},
        { label: 'Mental Health', href: 'mental-health', sub: [
          { label: 'Wellbound: Employee Assistance Program', href: 'eap' },
        ]},
        { label: 'Primary Care', href: 'primary-care' },
      ],
    },
    {
      label: 'Health Plans',
      desc: 'Integrated care solutions for commercial and government populations',
      solutions: [
        { label: 'Overview', href: 'health-plans' },
        { label: 'Integrated Care', href: 'health-plans' },
        { label: '24/7 Care', href: 'urgent-care' },
        { label: 'Chronic Care', href: 'chronic-care', sub: [
          { label: 'Diabetes', href: 'b2b-diabetes' },
          { label: 'Hypertension', href: 'hypertension' },
          { label: 'Obesity & Weight Care', href: 'weight-management' },
        ]},
        { label: 'Mental Health', href: 'mental-health', sub: [
          { label: 'Wellbound: Employee Assistance Program', href: 'eap' },
        ]},
        { label: 'Primary Care', href: 'primary-care' },
      ],
    },
    {
      label: 'Hospitals & Health Systems',
      desc: 'Enabling virtual care at scale from hospital to home',
      solutions: [
        { label: 'Overview', href: 'hospitals' },
        { label: 'Virtual Care Platform', href: 'hospitals' },
        { label: 'Emergency Services', href: 'hospitals', sub: [
          { label: 'Telestroke', href: 'hospitals' },
        ]},
        { label: 'Inpatient Services', href: 'hospitals', sub: [
          { label: 'Virtual Nursing', href: 'hospitals' },
          { label: 'Virtual Sitting', href: 'hospitals' },
        ]},
        { label: 'Outpatient Services', href: 'hospitals' },
        { label: 'Devices', href: 'hospitals' },
      ],
    },
  ],
  explore: [
    { label: 'Our Approach', href: 'how-it-works' },
    { label: 'Connected Care Partners', href: 'contact' },
    { label: 'Resource Center', href: 'library' },
    { label: 'Events', href: 'newsroom' },
    { label: 'About Us', href: 'about' },
    { label: 'Our Impact', href: 'our-impact' },
    { label: 'Contact Us', href: 'contact' },
  ],
  promo: {
    bg: '/rural_health_promo.png',
    title: 'Why States Are Turning To Virtual Care To Transform Rural Health',
    cta: 'Read more',
    href: 'library',
  },
};

const NAV_CLINICIANS = {
  label: 'Clinicians',
  team: [
    {
      label: 'Our Providers',
      href: 'providers',
      desc: 'Explore career opportunities and resources for providers.',
      sub: [{ label: 'Explore provider resources', href: 'providers' }],
    },
    {
      label: 'Clinical Leadership',
      href: 'providers',
      desc: 'Meet our leadership team and explore their roles.',
      sub: [{ label: 'Meet our leadership team', href: 'providers' }],
    },
    {
      label: 'Provider Careers',
      href: 'careers',
      desc: 'Interested in joining our world-class team? View our openings.',
      sub: [{ label: 'View openings', href: 'careers' }],
    },
  ],
  explore: [
    { label: 'Join Our Team', href: 'careers' },
    { label: 'About Us', href: 'about' },
    { label: 'Our Impact', href: 'our-impact' },
    { label: 'Contact us', href: 'contact' },
  ],
  promo: {
    bg: '/clinician_promo.png',
    title: 'Simplify your work. Amplify your impact.',
    cta: 'See open roles',
    href: 'careers',
  },
};

// Mobile accordion nav section
function MobileNavSection({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mob-nav-section">
      <button
        className="mob-nav-section-btn"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <svg
          className={`mob-nav-chevron${open ? ' open' : ''}`}
          viewBox="0 0 16 16" width="14" height="14"
        >
          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" fill="currentColor"/>
        </svg>
      </button>
      {open && <div className="mob-nav-section-body">{children}</div>}
    </div>
  );
}

export default function TDHHeader({ setPage }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activePartner, setActivePartner] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const goto = (pageKey) => {
    setPage(pageKey);
    setActiveMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`tdh-header-wrapper${scrolled ? ' scrolled' : ''}`} ref={navRef}>
        <div className="tdh-header-inner">
          {/* Logo */}
          <a className="tdh-logo" href="#" onClick={e => { e.preventDefault(); goto('landing'); }}>
            <img
              src="/logo.png"
              alt="SummitMD"
              className="tdh-logo-img"
            />
          </a>

          {/* Desktop Primary Nav */}
          <nav className="tdh-primary-nav" aria-label="Primary navigation">
            {/* SHOPS */}
            <div
              className={`tdh-nav-item${activeMenu === 'shops' ? ' active' : ''}`}
              onMouseEnter={() => setActiveMenu('shops')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="tdh-nav-btn" aria-expanded={activeMenu === 'shops'} onClick={e => { e.preventDefault(); goto('shop'); }}>
                Shops
                <svg className="tdh-chevron" viewBox="0 0 16 16" width="14" height="14"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" fill="currentColor"/></svg>
              </button>
              {activeMenu === 'shops' && (
                <div className="tdh-mega-menu tdh-mega-menu--4col summitmd-shop-dropdown">
                  <div className="tdh-mega-inner">
                    {NAV_SHOPS.products.map((cat, i) => (
                      <div className="tdh-mega-col tdh-mega-col--dynamic" key={i}>
                        <div className="tdh-mega-col-header" style={{ color: '#0f2e2f', fontWeight: '800', borderBottom: '2px solid #0f2e2f', paddingBottom: '8px', marginBottom: '16px' }}>{cat.category}</div>
                        <ul className="tdh-mega-ways-list">
                          {cat.items.map((item, j) => (
                            <li key={j} style={{ marginBottom: '16px' }}>
                              <a
                                href="#"
                                className="tdh-mega-way-link"
                                onClick={e => { e.preventDefault(); goto(item.href); }}
                                style={{ display: 'block' }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <strong style={{ color: '#0f2e2f' }}>{item.label}</strong>
                                  {item.tag && (
                                    <span style={{ fontSize: '0.65rem', backgroundColor: '#e2ece9', color: '#0f2e2f', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal', lineHeight: '1.4' }}>{item.desc}</p>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="tdh-mega-col tdh-mega-col--promo tdh-mega-col--promo-pine" style={{ backgroundColor: '#0f2e2f', color: '#ffffff', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '220px', backgroundImage: `linear-gradient(rgba(15,46,47,0.4), rgba(15,46,47,0.9)), url(${NAV_SHOPS.promo.bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="tdh-mega-promo-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: 0 }}>{NAV_SHOPS.promo.title}</h3>
                        <a href="#" className="tdh-mega-promo-cta" onClick={e => { e.preventDefault(); goto(NAV_SHOPS.promo.href); }} style={{ color: '#00d2c4', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                          {NAV_SHOPS.promo.cta} <span>→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* INDIVIDUALS */}
            <div
              className={`tdh-nav-item${activeMenu === 'individuals' ? ' active' : ''}`}
              onMouseEnter={() => setActiveMenu('individuals')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="tdh-nav-btn" aria-expanded={activeMenu === 'individuals'}>
                Patients
                <svg className="tdh-chevron" viewBox="0 0 16 16" width="14" height="14"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" fill="currentColor"/></svg>
              </button>
              {activeMenu === 'individuals' && (
                <div className="tdh-mega-menu tdh-mega-menu--3col tdh-mega-menu--individuals">
                  <div className="tdh-mega-inner">
                    <div className="tdh-mega-col tdh-mega-col--dynamic">
                      <div className="tdh-mega-col-header">Ways we help</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {NAV_INDIVIDUALS.ways.map((w, i) => (
                          <div
                            key={i}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              background: '#f4f6ff',
                              border: '1px solid #e2e8f8',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              cursor: 'default',
                              transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#eaf0ff'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f4f6ff'}
                          >
                            {w.href ? (
                              <a
                                href="#"
                                className="tdh-mega-way-link-title"
                                onClick={ev => { ev.preventDefault(); goto(w.href); }}
                                style={{ fontWeight: '700', fontSize: '0.84rem', color: 'var(--tdh-navy)', textDecoration: 'none', lineHeight: '1.25' }}
                              >
                                {w.label}
                              </a>
                            ) : (
                              <span style={{ fontWeight: '700', fontSize: '0.84rem', color: 'var(--tdh-navy)', lineHeight: '1.25' }}>{w.label}</span>
                            )}
                            <p style={{ margin: 0, fontSize: '0.71rem', color: '#64748b', lineHeight: '1.35', fontWeight: 'normal' }}>{w.desc}</p>
                            {w.sub && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', marginTop: '2px' }}>
                                {w.sub.map((subItem, sIdx) => {
                                  const isGetCare = subItem.label === 'Get Care Now';
                                  return (
                                    <a
                                      key={sIdx}
                                      href={subItem.external ? subItem.url : '#'}
                                      target={subItem.external ? '_self' : undefined}
                                      rel={subItem.external ? 'noopener noreferrer' : undefined}
                                      onClick={ev => {
                                        if (!subItem.external) {
                                          ev.preventDefault();
                                          goto(subItem.href);
                                        }
                                      }}
                                      style={{
                                        fontSize: '0.69rem',
                                        color: isGetCare ? '#fff' : 'var(--tdh-purple)',
                                        backgroundColor: isGetCare ? 'var(--tdh-purple)' : 'transparent',
                                        padding: isGetCare ? '2px 8px' : '0',
                                        borderRadius: isGetCare ? '12px' : '0',
                                        fontWeight: '700',
                                        textDecoration: isGetCare ? 'none' : 'underline',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {subItem.label}{subItem.external && !isGetCare ? ' ↗' : ''}
                                    </a>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="tdh-mega-col tdh-mega-col--static">
                      <div className="tdh-mega-col-header">Explore</div>
                      <ul className="tdh-mega-explore-list">
                        {NAV_INDIVIDUALS.explore.map((e2, i) => (
                          <li key={i}>
                            <a href="#" className="tdh-mega-explore-link" onClick={e => { e.preventDefault(); goto(e2.href); }}>{e2.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="tdh-mega-col tdh-mega-col--promo tdh-mega-col--promo-plum">
                      <div className="tdh-mega-promo" style={{ backgroundImage: `url(${NAV_INDIVIDUALS.promo.bg})` }}>
                        <div className="tdh-mega-promo-body">
                          <h3>{NAV_INDIVIDUALS.promo.title}</h3>
                          <a href="#" onClick={e => { e.preventDefault(); goto(NAV_INDIVIDUALS.promo.href); }} className="tdh-mega-promo-cta">
                            {NAV_INDIVIDUALS.promo.cta} →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ORGANIZATIONS */}
            <div
              className={`tdh-nav-item${activeMenu === 'organizations' ? ' active' : ''}`}
              onMouseEnter={() => { setActiveMenu('organizations'); setActivePartner(0); }}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="tdh-nav-btn" aria-expanded={activeMenu === 'organizations'}>
                Practices
                <svg className="tdh-chevron" viewBox="0 0 16 16" width="14" height="14"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" fill="currentColor"/></svg>
              </button>
              {activeMenu === 'organizations' && (
                <div className="tdh-mega-menu tdh-mega-menu--4col">
                  <div className="tdh-mega-inner">
                    <div className="tdh-mega-col tdh-mega-col--dynamic">
                      <div className="tdh-mega-col-header">Partners</div>
                      <ul className="tdh-mega-partner-list">
                        {NAV_ORGANIZATIONS.partners.map((p, i) => (
                          <li
                            key={i}
                            className={`tdh-mega-partner-item${activePartner === i ? ' active' : ''}`}
                            onMouseEnter={() => setActivePartner(i)}
                          >
                            <button className="tdh-mega-partner-btn">
                              <strong>{p.label}</strong>
                              <p>{p.desc}</p>
                              <svg viewBox="0 0 16 16" width="12" height="12"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" fill="#6240e8"/></svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tdh-mega-col tdh-mega-col--solutions">
                      <div className="tdh-mega-col-header">Solutions</div>
                      <ul className="tdh-mega-solutions-list">
                        {NAV_ORGANIZATIONS.partners[activePartner].solutions.map((s, i) => (
                          <li key={i}>
                            <a href="#" className="tdh-mega-solution-link" onClick={e => { e.preventDefault(); goto(s.href); }}>{s.label}</a>
                            {s.sub && (
                              <ul className="tdh-mega-solution-sub">
                                {s.sub.map((ss, j) => (
                                  <li key={j}>
                                    <a href="#" onClick={e => { e.preventDefault(); goto(ss.href); }}>{ss.label}</a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tdh-mega-col tdh-mega-col--static">
                      <div className="tdh-mega-col-header">Explore</div>
                      <ul className="tdh-mega-explore-list">
                        {NAV_ORGANIZATIONS.explore.map((e2, i) => (
                          <li key={i}>
                            <a href="#" className="tdh-mega-explore-link" onClick={e => { e.preventDefault(); goto(e2.href); }}>{e2.label}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tdh-mega-col tdh-mega-col--promo">
                      <div className="tdh-mega-promo" style={{ backgroundImage: `url(${NAV_ORGANIZATIONS.promo.bg})` }}>
                        <div className="tdh-mega-promo-body">
                          <h3>{NAV_ORGANIZATIONS.promo.title}</h3>
                          <a href="#" className="tdh-mega-promo-cta" onClick={e => { e.preventDefault(); goto('library'); }}>
                            {NAV_ORGANIZATIONS.promo.cta} →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CLINICIANS */}
            <div
              className={`tdh-nav-item${activeMenu === 'clinicians' ? ' active' : ''}`}
              onMouseEnter={() => setActiveMenu('clinicians')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button className="tdh-nav-btn" aria-expanded={activeMenu === 'clinicians'}>
                Clinicians
                <svg className="tdh-chevron" viewBox="0 0 16 16" width="14" height="14"><path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" fill="currentColor"/></svg>
              </button>
              {activeMenu === 'clinicians' && (
                <div className="tdh-mega-menu tdh-mega-menu--3col">
                  <div className="tdh-mega-inner">
                    <div className="tdh-mega-col tdh-mega-col--dynamic">
                      <div className="tdh-mega-col-header">Our team</div>
                      <ul className="tdh-mega-ways-list" style={{ gap: '12px' }}>
                        {NAV_CLINICIANS.team.map((t, i) => (
                          <li key={i} style={{ padding: '6px 10px', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {t.external ? (
                                <a
                                  href={t.url}
                                  target="_self"
                                  rel="noopener noreferrer"
                                  className="tdh-mega-way-link-title"
                                  style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--tdh-navy)', textDecoration: 'none' }}
                                >
                                  {t.label} ↗
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  className="tdh-mega-way-link-title"
                                  onClick={e => { e.preventDefault(); goto(t.href); }}
                                  style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--tdh-navy)', textDecoration: 'none' }}
                                >
                                  {t.label}
                                </a>
                              )}
                              <p style={{ margin: '3px 0 6px 0', fontSize: '0.78rem', color: '#64748b', fontWeight: 'normal', lineHeight: '1.4' }}>{t.desc}</p>
                              {t.sub && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', alignItems: 'center' }}>
                                  {t.sub.map((subItem, sIdx) => (
                                    <a
                                      key={sIdx}
                                      href={subItem.external ? subItem.url : "#"}
                                      target={subItem.external ? "_self" : undefined}
                                      rel={subItem.external ? "noopener noreferrer" : undefined}
                                      onClick={e => {
                                        if (!subItem.external) {
                                          e.preventDefault();
                                          goto(subItem.href);
                                        }
                                      }}
                                      style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--tdh-purple)',
                                        fontWeight: '700',
                                        textDecoration: 'underline',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {subItem.label} {subItem.external ? '↗' : ''}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tdh-mega-col tdh-mega-col--static">
                      <div className="tdh-mega-col-header">Explore</div>
                      <ul className="tdh-mega-explore-list">
                        {NAV_CLINICIANS.explore.map((e2, i) => (
                          <li key={i}>
                            {e2.external
                              ? <a href={e2.url} target="_self" rel="noopener noreferrer" className="tdh-mega-explore-link">{e2.label} ↗</a>
                              : <a href="#" className="tdh-mega-explore-link" onClick={e => { e.preventDefault(); goto(e2.href); }}>{e2.label}</a>
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tdh-mega-col tdh-mega-col--promo tdh-mega-col--promo-plum">
                      <div className="tdh-mega-promo" style={{ backgroundImage: `url(${NAV_CLINICIANS.promo.bg})` }}>
                        <div className="tdh-mega-promo-body">
                          <h3>{NAV_CLINICIANS.promo.title}</h3>
                          <a href="#" onClick={e => { e.preventDefault(); goto(NAV_CLINICIANS.promo.href); }} className="tdh-mega-promo-cta">
                            {NAV_CLINICIANS.promo.cta} →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Header Actions (desktop) */}
          <div className="tdh-header-actions">
            <button type="button" className="tdh-signin-btn" onClick={() => goto('login')}>
              Sign in
            </button>
            <button type="button" className="tdh-register-btn" onClick={() => goto('register')}>
              Register
            </button>
            <button type="button" className="tdh-getcare-btn" onClick={() => goto('register')}>
              Get care now
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`tdh-mobile-toggle${mobileOpen ? ' is-open' : ''}`}
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="mob-drawer-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`mob-drawer${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mob-drawer-header">
          <a className="tdh-logo" href="#" onClick={e => { e.preventDefault(); goto('landing'); }}>
            <img src="/logo.png" alt="SummitMD" className="tdh-logo-img" />
          </a>
          <button className="mob-drawer-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="mob-drawer-body">
          {/* Shops */}
          <MobileNavSection title="Shops">
            {NAV_SHOPS.products.map((cat, i) => (
              <div key={i} className="mob-nav-group">
                <div className="mob-nav-group-label">{cat.category}</div>
                {cat.items.map((item, j) => (
                  <button key={j} className="mob-nav-link" onClick={() => goto(item.href)}>
                    {item.label}
                    {item.tag && <span className="mob-nav-tag">{item.tag}</span>}
                  </button>
                ))}
              </div>
            ))}
          </MobileNavSection>

          {/* Patients */}
          <MobileNavSection title="Patients">
            <div className="mob-nav-group">
              <div className="mob-nav-group-label">Ways we help</div>
              {NAV_INDIVIDUALS.ways.map((w, i) => (
                <button key={i} className="mob-nav-link" onClick={() => goto(w.href)}>
                  {w.label}
                </button>
              ))}
            </div>
            <div className="mob-nav-group">
              <div className="mob-nav-group-label">Explore</div>
              {NAV_INDIVIDUALS.explore.map((e2, i) => (
                <button key={i} className="mob-nav-link" onClick={() => goto(e2.href)}>
                  {e2.label}
                </button>
              ))}
            </div>
          </MobileNavSection>

          {/* Practices */}
          <MobileNavSection title="Practices">
            {NAV_ORGANIZATIONS.partners.map((partner, i) => (
              <div key={i} className="mob-nav-group">
                <div className="mob-nav-group-label">{partner.label}</div>
                {partner.solutions.slice(0, 4).map((s, j) => (
                  <button key={j} className="mob-nav-link" onClick={() => goto(s.href)}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </MobileNavSection>

          {/* Clinicians */}
          <MobileNavSection title="Clinicians">
            {NAV_CLINICIANS.team.map((t, i) => (
              <button
                key={i}
                className="mob-nav-link"
                onClick={() => {
                  if (t.external) window.open(t.url, '_self');
                  else goto(t.href);
                }}
              >
                {t.label} {t.external ? '↗' : ''}
              </button>
            ))}
          </MobileNavSection>

          {/* Direct links */}
          <div className="mob-nav-direct">
            <button className="mob-nav-link" onClick={() => goto('how-it-works')}>How It Works</button>
            <button className="mob-nav-link" onClick={() => goto('faq')}>FAQs</button>
            <button className="mob-nav-link" onClick={() => goto('about')}>About Us</button>
            <button className="mob-nav-link" onClick={() => goto('contact')}>Contact</button>
          </div>
        </div>

        <div className="mob-drawer-footer">
          <button className="mob-btn-signin" onClick={() => goto('login')}>Sign in</button>
          <button className="mob-btn-register" onClick={() => goto('register')}>Register</button>
          <button className="mob-btn-getcare" onClick={() => goto('register')}>Get care now</button>
        </div>
      </div>
    </>
  );
}
