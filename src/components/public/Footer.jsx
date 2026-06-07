import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TDHFooter({ setPage }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const goto = (href) => {
    if (href && !href.startsWith('http')) setPage(href);
    else if (href) window.open(href, '_self');
  };

  const footerCols = [
    {
      id: 'individuals',
      heading: 'Patients',
      links: [
        { label: '24/7 Care', href: 'urgent-care' },
        { label: 'Mental Health', href: 'mental-health' },
        { label: 'Weight Management', href: 'weight-management' },
        { label: 'Diabetes Management', href: 'diabetes-management' },
        { label: 'Hypertension Management', href: 'hypertension' },
        { label: 'Specialty & Wellness', href: 'specialty-wellness' },
        { label: 'Primary Care', href: 'primary-care' },
      ]
    },
    {
      id: 'organizations',
      heading: 'Practices',
      links: [
        { label: 'Our Approach', href: 'how-it-works' },
        { label: 'Employers', href: 'employers' },
        { label: 'Health Plans', href: 'health-plans' },
        { label: 'Hospitals & Health Systems', href: 'hospitals' },
        { label: 'Resource Center', href: 'library' },
      ]
    },
    {
      id: 'clinicians',
      heading: 'Clinicians',
      links: [
        { label: 'Provider Resources', href: 'providers-signup' },
        { label: 'How It Works', href: 'how-it-works' },
        { label: 'Provider Careers', external: true, url: 'https://teladoc.wd1.myworkdayjobs.com/en-US/SummitMD_is_hiring' },
      ]
    },
    {
      id: 'who-we-are',
      heading: 'Who we are',
      links: [
        { label: 'Our Company', href: 'about' },
        { label: 'Our Impact', href: 'our-impact' },
        { label: 'Leadership', href: 'about' },
        { label: 'Careers', href: 'careers' },
        { label: 'Industry Events', href: 'newsroom' },
        { label: 'Newsroom', href: 'newsroom' },
        { label: 'Investors', external: true, url: 'https://ir.SummitMD.com' },
      ]
    },
    {
      id: 'helpful-links',
      heading: 'Helpful Links',
      links: [
        { label: 'Contact Us', href: 'contact' },
        { label: 'Health Library', href: 'library' },
        { label: 'Help Center', href: 'faq' },
        { label: 'Legal, Privacy & Compliance', href: 'legal' },
        { label: 'Your Privacy Choices', href: 'legal' },
        { label: 'Language Assistance Services', href: 'legal' },
        { label: 'Community Guidelines', href: 'about' },
      ]
    }
  ];

  return (
    <footer className="tdh-footer">
      <div className="tdh-footer-inner">
        <div className="tdh-footer-main">
          
          {/* Logo & Brand Info Column */}
          <div className="tdh-footer-company">
            <div className="tdh-footer-logo-wrap">
              <a href="#" onClick={e => { e.preventDefault(); setPage('landing'); }} aria-label="SummitMD Home">
                <img
                  src="/logo.png"
                  alt="SummitMD"
                  className="tdh-footer-logo-img"
                  style={{ filter: 'brightness(0) invert(1)', maxWidth: '160px' }}
                />
              </a>
            </div>
            <p className="tdh-footer-tagline">
              Empowering all people everywhere to live their healthiest lives.
            </p>
            <div className="tdh-footer-social">
              {[
                { icon: 'f', label: 'facebook', url: 'https://www.facebook.com/SummitMD' },
                { icon: '📷', label: 'instagram', url: 'https://instagram.com/SummitMD' },
                { icon: 'in', label: 'linkedin', url: 'https://www.linkedin.com/company/teladoc-health' },
                { icon: '▶', label: 'youtube', url: 'https://www.youtube.com/user/TeladocVideos' },
                { icon: '𝕏', label: 'x', url: 'https://www.twitter.com/SummitMD' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_self" rel="noopener noreferrer" aria-label={s.label} className="tdh-footer-social-icon">
                  {s.icon}
                </a>
              ))}
            </div>
            <address className="tdh-footer-address">
              <strong>Headquarters</strong><br />
              SummitMD, Inc.<br />
              155 East 44th Street, Suite 1700<br />
              New York, NY 10017
            </address>
          </div>

          {/* Navigation Columns */}
          <div className="tdh-footer-nav-grid">
            {footerCols.map(col => {
              const isOpen = !!openSections[col.id];
              return (
                <nav key={col.id} aria-label={col.heading} className={`tdh-footer-nav-col ${isOpen ? 'is-open' : ''}`}>
                  <div className="tdh-footer-col-heading" onClick={() => toggleSection(col.id)}>
                    <span>{col.heading}</span>
                    <ChevronDown size={14} className="tdh-footer-chevron" />
                  </div>
                  <ul className="tdh-footer-col-list">
                    {col.links.map(l => (
                      <li key={l.label}>
                        {l.external ? (
                          <a href={l.url} target="_self" rel="noopener noreferrer">{l.label} ↗</a>
                        ) : (
                          <a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

        </div>

        {/* Footer bottom */}
        <div className="tdh-footer-bottom">
          <div className="tdh-footer-copy">
            <p>© {new Date().getFullYear()} SummitMD, Inc. All rights reserved.</p>
            <p className="tdh-footer-propel">PL015954.A</p>
          </div>
          <div className="tdh-footer-badges">
            <a href="https://go.onelink.me/agxg/f6blsn9h" target="_self" rel="noopener noreferrer">
              <img src="https://www.SummitMD.com/content/dam/tdh-www/us/en/images/app-badge-apple.png" alt="Apple App Store" style={{ height: '36px', borderRadius: '6px' }} onError={e => { e.target.style.display='none'; }} />
            </a>
            <a href="https://go.onelink.me/agxg/ov06wfm5" target="_self" rel="noopener noreferrer">
              <img src="https://www.SummitMD.com/content/dam/tdh-www/us/en/images/app-badge-google.png" alt="Google Play Store" style={{ height: '36px', borderRadius: '6px' }} onError={e => { e.target.style.display='none'; }} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
