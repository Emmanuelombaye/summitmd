import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import VirtualVisit from './components/VirtualVisit';
import { peakHealthClient } from './api/peakHealthClient';

// Layout Elements
import TDHHeader from './components/public/Header';
import TDHFooter from './components/public/Footer';

// Public Marketing Sub-pages (Group 1)
import UrgentCarePage from './components/public/UrgentCarePage';
import PrimaryCarePage from './components/public/PrimaryCarePage';
import MentalHealthPage from './components/public/MentalHealthPage';
import DermatologyPage from './components/public/DermatologyPage';
import ChronicCarePage from './components/public/ChronicCarePage';
import HowItWorksPage from './components/public/HowItWorksPage';
import FAQPage from './components/public/FAQPage';

// Public Marketing Sub-pages (Group 2)
import MedicaidPage from './components/public/MedicaidPage';
import MedicarePage from './components/public/MedicarePage';
import WeightManagementPage from './components/public/WeightManagementPage';
import NutritionPage from './components/public/NutritionPage';
import SpecialtyWellnessPage from './components/public/SpecialtyWellnessPage';
import EmployersPage from './components/public/EmployersPage';
import HealthPlansPage from './components/public/HealthPlansPage';
import HospitalsPage from './components/public/HospitalsPage';
import AboutPage from './components/public/AboutPage';
import CareersPage from './components/public/CareersPage';
import ContactPage from './components/public/ContactPage';
import NewsroomPage from './components/public/NewsroomPage';
import LibraryPage from './components/public/LibraryPage';
import LegalPage from './components/public/LegalPage';
import ProviderSignupPage from './components/public/ProviderSignupPage';
import B2BDiabetesPage from './components/public/B2BDiabetesPage';
import HypertensionPage from './components/public/HypertensionPage';
import EmployeeAssistanceProgramPage from './components/public/EmployeeAssistanceProgramPage';
import ShopPage from './components/public/ShopPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [activePortalTab, setActivePortalTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    peakHealthClient.init();
  }, []);

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // ── Route alias resolver ──────────────────────────────
  // Maps real Teladoc URL slugs to our page keys
  const resolveAlias = (p) => {
    const aliases = {
      // Individuals nav
      'no-insurance':         'how-it-works',
      'our-impact':           'about',
      'providers':            'providers-signup',
      'diabetes-management':  'b2b-diabetes',
      'diabetes-prevention':  'b2b-diabetes',
      'glp1':                 'weight-management',
      'employers-integrated': 'employers',
      'health-plans-integrated': 'health-plans',
      // Organizations sub-nav duplicates
      'urgent-care-emp':      'urgent-care',
      'urgent-care-hp':       'urgent-care',
      // Clinicians
      'provider-careers':     'careers',
      // Footer extras
      'helpcenter':           'faq',
      'help-center':          'faq',
      'leadership':           'about',
      'community-guidelines': 'about',
      'language-assistance':  'legal',
      'events':               'newsroom',
      'resources':            'library',
      'organizations-resources': 'library',
      'connected-care-partners': 'contact',
      'defining-care':        'how-it-works',
    };
    return aliases[p] || p;
  };

  const setPageResolved = (p) => {
    const resolved = resolveAlias(p);
    setPage(resolved);
    // Scroll to top of window on page changes to simulate real page transitions
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Public marketing pages list (should render with the global Header & Footer)
  const publicPages = [
    'landing',
    'urgent-care',
    'primary-care',
    'mental-health',
    'dermatology',
    'chronic-care',
    'how-it-works',
    'faq',
    'medicaid',
    'medicare',
    'weight-management',
    'nutrition',
    'specialty-wellness',
    'b2b-diabetes',
    'hypertension',
    'employers',
    'health-plans',
    'hospitals',
    'eap',
    'about',
    'careers',
    'contact',
    'newsroom',
    'library',
    'legal',
    'providers-signup',
    'shop'
  ];

  const isPublicPage = publicPages.includes(page);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Marketing Navigation */}
      {isPublicPage && <TDHHeader setPage={setPageResolved} />}

      {/* Main Page Layout Wrapper */}
      <div style={{ flex: '1 0 auto' }}>
        
        {/* ── PUBLIC PAGES ROUTER ─────────────────────────── */}
        {page === 'landing' && <LandingPage setPage={setPageResolved} />}

        {/* Individuals */}
        {page === 'urgent-care' && <UrgentCarePage setPage={setPageResolved} />}
        {page === 'primary-care' && <PrimaryCarePage setPage={setPageResolved} />}
        {page === 'mental-health' && <MentalHealthPage setPage={setPageResolved} />}
        {page === 'dermatology' && <DermatologyPage setPage={setPageResolved} />}
        {page === 'chronic-care' && <ChronicCarePage setPage={setPageResolved} />}
        {page === 'how-it-works' && <HowItWorksPage setPage={setPageResolved} />}
        {page === 'faq' && <FAQPage setPage={setPageResolved} />}
        {page === 'medicaid' && <MedicaidPage setPage={setPageResolved} />}
        {page === 'medicare' && <MedicarePage setPage={setPageResolved} />}
        {page === 'weight-management' && <WeightManagementPage setPage={setPageResolved} />}
        {page === 'nutrition' && <NutritionPage setPage={setPageResolved} />}
        {page === 'specialty-wellness' && <SpecialtyWellnessPage setPage={setPageResolved} />}
        {page === 'b2b-diabetes' && <B2BDiabetesPage setPage={setPageResolved} />}
        {page === 'hypertension' && <HypertensionPage setPage={setPageResolved} />}

        {/* Organizations */}
        {page === 'employers' && <EmployersPage setPage={setPageResolved} />}
        {page === 'health-plans' && <HealthPlansPage setPage={setPageResolved} />}
        {page === 'hospitals' && <HospitalsPage setPage={setPageResolved} />}

        {/* EAP */}
        {page === 'eap' && <EmployeeAssistanceProgramPage setPage={setPageResolved} />}

        {/* Company */}
        {page === 'about' && <AboutPage setPage={setPageResolved} />}
        {page === 'careers' && <CareersPage setPage={setPageResolved} />}
        {page === 'contact' && <ContactPage setPage={setPageResolved} />}
        {page === 'newsroom' && <NewsroomPage setPage={setPageResolved} />}
        {page === 'library' && <LibraryPage setPage={setPageResolved} />}
        {page === 'legal' && <LegalPage setPage={setPageResolved} />}
        {page === 'providers-signup' && <ProviderSignupPage setPage={setPageResolved} />}

        {/* Shop Page (drinkag1.com replication) */}
        {page === 'shop' && <ShopPage setPage={setPageResolved} />}

      </div>

      {/* Global Marketing Footer */}
      {isPublicPage && <TDHFooter setPage={setPageResolved} />}

      {/* ── AUTH (Non-marketing, simplified layouts) ────── */}
      {(page === 'login' || page === 'register') && (
        <AuthPage
          mode={page}
          setPage={setPageResolved}
          setUser={setUser}
        />
      )}

      {/* ── SECURE PORTAL (Dashboard & Virtual Visit) ───── */}
      {page === 'dashboard' && user && (
        <Dashboard
          user={user}
          setPage={setPageResolved}
          activePortalTab={activePortalTab}
          setActivePortalTab={setActivePortalTab}
          handleLogout={handleLogout}
        />
      )}

      {page === 'waiting-room' && user && (
        <VirtualVisit
          user={user}
          setPage={setPageResolved}
        />
      )}
    </div>
  );
}
