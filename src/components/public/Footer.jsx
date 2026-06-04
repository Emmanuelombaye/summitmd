import React from 'react';

export default function TDHFooter({ setPage }) {
  const goto = (href) => {
    if (href && !href.startsWith('http')) setPage(href);
    else if (href) window.open(href, '_blank');
  };

  return (
    <footer className="tdh-footer">
      <div className="tdh-footer-inner">
        <div className="tdh-footer-main">
          {/* Company */}
          <div className="tdh-footer-company">
            <div className="tdh-footer-logo-wrap">
              <a href="#" onClick={e => { e.preventDefault(); setPage('landing'); }}>
                <img
                  src="/logo.png"
                  alt="Teladoc Health"
                  style={{ filter: 'brightness(0) invert(1)', maxWidth: '180px' }}
                />
              </a>
            </div>
            <div className="tdh-footer-social">
              {[
                { icon: 'f', label: 'facebook', url: 'https://www.facebook.com/teladochealth' },
                { icon: '📷', label: 'instagram', url: 'https://instagram.com/teladochealth' },
                { icon: 'in', label: 'linkedin', url: 'https://www.linkedin.com/company/teladoc-health' },
                { icon: '▶', label: 'youtube', url: 'https://www.youtube.com/user/TeladocVideos' },
                { icon: '𝕏', label: 'x', url: 'https://www.twitter.com/teladochealth' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="tdh-footer-social-icon">
                  {s.icon}
                </a>
              ))}
            </div>
            <address className="tdh-footer-address">
              <strong>Headquarters</strong><br />
              Teladoc Health, Inc.<br />
              155 East 44th Street,<br />
              Suite 1700<br />
              New York, NY 10017
            </address>
            <p className="tdh-footer-tagline"><strong>Empowering all people everywhere to live their healthiest lives.</strong></p>
          </div>

          {/* Nav columns — exact from live HTML */}
          <nav aria-label="Individuals" className="tdh-footer-nav-col">
            <div className="tdh-footer-col-heading">Individuals</div>
            <ul>
              {[
                { label: '24/7 Care', href: 'urgent-care' },
                { label: 'Mental Health', href: 'mental-health' },
                { label: 'Weight Management', href: 'weight-management' },
                { label: 'Diabetes Management', href: 'diabetes-management' },
                { label: 'Hypertension Management', href: 'hypertension' },
                { label: 'Specialty & Wellness', href: 'specialty-wellness' },
                { label: 'Primary Care', href: 'primary-care' },
              ].map(l => (
                <li key={l.label}><a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Organizations" className="tdh-footer-nav-col">
            <div className="tdh-footer-col-heading">Organizations</div>
            <ul>
              {[
                { label: 'Our Approach', href: 'how-it-works' },
                { label: 'Employers', href: 'employers' },
                { label: 'Health Plans', href: 'health-plans' },
                { label: 'Hospitals & Health Systems', href: 'hospitals' },
                { label: 'Resource Center', href: 'library' },
              ].map(l => (
                <li key={l.label}><a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Clinicians" className="tdh-footer-nav-col">
            <div className="tdh-footer-col-heading">Clinicians</div>
            <ul>
              {[
                { label: 'Commitment to Quality', href: 'providers' },
                { label: 'Provider Careers', external: true, url: 'https://teladoc.wd1.myworkdayjobs.com/en-US/teladochealth_is_hiring' },
              ].map(l => (
                <li key={l.label}>
                  {l.external
                    ? <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                    : <a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a>
                  }
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Who we are" className="tdh-footer-nav-col">
            <div className="tdh-footer-col-heading">Who we are</div>
            <ul>
              {[
                { label: 'Our Company', href: 'about' },
                { label: 'Our Impact', href: 'our-impact' },
                { label: 'Leadership', href: 'about' },
                { label: 'Careers', href: 'careers' },
                { label: 'Industry Events', href: 'newsroom' },
                { label: 'Newsroom', href: 'newsroom' },
                { label: 'Investors', external: true, url: 'https://ir.teladochealth.com' },
              ].map(l => (
                <li key={l.label}>
                  {l.external
                    ? <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                    : <a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a>
                  }
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Helpful Links" className="tdh-footer-nav-col">
            <div className="tdh-footer-col-heading">Helpful Links</div>
            <ul>
              {[
                { label: 'Contact Us', href: 'contact' },
                { label: 'Health Library', href: 'library' },
                { label: 'Help Center', href: 'faq' },
                { label: 'Legal, Privacy & Compliance', href: 'legal' },
                { label: 'Your Privacy Choices', href: 'legal' },
                { label: 'Language Assistance Services', href: 'legal' },
                { label: 'Community Guidelines', href: 'about' },
              ].map(l => (
                <li key={l.label}><a href="#" onClick={e => { e.preventDefault(); goto(l.href); }}>{l.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Footer bottom */}
        <div className="tdh-footer-bottom">
          <div className="tdh-footer-copy">
            <p>© {new Date().getFullYear()} Teladoc Health, Inc.</p>
            <p className="tdh-footer-propel">PL015954.A</p>
          </div>
          <div className="tdh-footer-badges">
            <a href="https://go.onelink.me/agxg/f6blsn9h" target="_blank" rel="noopener noreferrer">
              <img src="https://www.teladochealth.com/content/dam/tdh-www/us/en/images/app-badge-apple.png" alt="Apple App Store" style={{ height: '40px', borderRadius: '8px' }} onError={e => { e.target.style.display='none'; }} />
            </a>
            <a href="https://go.onelink.me/agxg/ov06wfm5" target="_blank" rel="noopener noreferrer">
              <img src="https://www.teladochealth.com/content/dam/tdh-www/us/en/images/app-badge-google.png" alt="Google Play Store" style={{ height: '40px', borderRadius: '8px' }} onError={e => { e.target.style.display='none'; }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
