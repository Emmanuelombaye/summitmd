import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Scale, Brain, HeartPulse, Activity, FileText, X, ChevronRight, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';

export default function WeightManagementPage({ setPage }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false);
  const [webinarRegistered, setWebinarRegistered] = useState(false);
  const [isPlayingWebinar, setIsPlayingWebinar] = useState(true);
  const [webinarProgress, setWebinarProgress] = useState(15); // Simulated progress bar percentage
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Articles viewer modal state
  const [activeArticle, setActiveArticle] = useState(null);

  // Form states
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    employees: '< 100',
    message: ''
  });
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const [webinarForm, setWebinarForm] = useState({
    name: '',
    email: '',
    org: ''
  });

  // Simulated progress timer for the webinar video player
  useEffect(() => {
    let timer;
    if (webinarRegistered && isPlayingWebinar) {
      timer = setInterval(() => {
        setWebinarProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [webinarRegistered, isPlayingWebinar]);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const handleWebinarSubmit = (e) => {
    e.preventDefault();
    setWebinarRegistered(true);
    setIsPlayingWebinar(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    // Reset form after a brief delay
    setTimeout(() => {
      setDemoForm({ name: '', email: '', company: '', title: '', employees: '< 100', message: '' });
      setDemoSubmitted(false);
    }, 300);
  };

  const closeWebinarModal = () => {
    setIsWebinarModalOpen(false);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "What is the SummitMD Weight Management Program?",
      a: "The Weight Management Program helps members build healthier habits with connected tools, personal insights and expert coaching. Members receive a connected scale that automatically uploads weight readings to the app. Coaching and guidance help with nutrition, activity and daily routines. All program features are provided at no cost for eligible members."
    },
    {
      q: "Who can join the Weight Management Program?",
      a: "You can join if you are eligible through your employer, health plan or healthcare provider and meet the program criteria. Members who are pregnant or have a BMI that is too low may not qualify. Spouses and dependents may be eligible based on your benefit. Services are based on your individual coverage."
    },
    {
      q: "Is there a cost to join the Weight Management program?",
      a: "No. The program is no cost for eligible members. Your employer, health plan or healthcare provider covers the full cost. Shipping and program materials are included. You will not receive a bill for participating. Sometimes insurance may send an explanation of benefits, but it is not a bill."
    },
    {
      q: "How does GLP-1 medication support fit into the Weight Management Program?",
      a: "GLP-1 medications for weight loss may be available only to members who have access to an eligible program and receive clinical approval from a licensed SummitMD provider. Providers determine appropriateness based on guidelines and direct patients to pharmacies matching benefit rules. The companion program supplies behavioral and dietetic training specifically calibrated for patients on GLP-1 therapies."
    }
  ];

  const articles = [
    {
      id: 'first-place',
      title: "Becoming the first place people go for care",
      desc: "An in-depth report showing how SummitMD integrates weight management, virtual primary care, and mental health services to simplify the member care experience and deliver sustained clinical results.",
      content: "As organizations face rising healthcare complexity, virtual-first solutions are becoming the primary entry point for care. A comprehensive weight management solution cannot operate in a vacuum. By integrating mental health services, virtual nutrition clinics, and cellular devices directly with primary care coordinators, members bypass traditional clinical friction. Data shows that starting care in a connected virtual setting leads to 30% faster engagement and higher satisfaction scorecards across employer programs.",
      date: "May 2026",
      readTime: "6 min read"
    },
    {
      id: 'more-than-glp1s',
      title: "More than GLP-1s: Here’s what an obesity care benefits strategy needs",
      desc: "Why medication alone isn't a silver bullet. Discover the essential companion programs, behavioral modifications, and lifestyle coaching required to lock in long-term health improvements.",
      content: "While GLP-1 medications have transformed obesity treatment, clinical evidence underscores that pharmaceutical intervention without structured behavior change is unsustainable. Sustained weight management requires addressing nutrition habits, sleep patterns, muscle loss, and psychiatric components of eating. Employers should seek programs offering registered dietitians and behavior trackers to wrap around the medication benefit, ensuring that should patients transition off GLP-1s, the weight loss is maintained.",
      date: "April 2026",
      readTime: "8 min read"
    },
    {
      id: 'beyond-weight-loss',
      title: "Beyond weight loss: the critical role of long-term maintenance",
      desc: "Clinical outcomes from weight loss are only valuable if they last. Learn about our structured clinical transition and maintenance pathways that support members after the initial weight reduction.",
      content: "Long-term tracking of weight loss programs reveals a common challenge: weight regain after the first year. SummitMD addresses this with a dedicated 'Maintenance Phase'. When members achieve their weight loss target or stabilize their dosage, their coaching adjustments transition from strict caloric restriction to metabolic conditioning and strength retention. Cellular scale compliance and metabolic reviews maintain metabolic health and lock in improvements in blood pressure and cholesterol.",
      date: "March 2026",
      readTime: "5 min read"
    },
    {
      id: 'hidden-health-risks',
      title: "A smarter way to surface hidden health risks in your population",
      desc: "How integrated screening and biometric sync automatically flags patients at risk of chronic conditions like type-2 diabetes and hypertension before they progress.",
      content: "Cardiometabolic risks often stay hidden until a major clinical event occurs. By utilizing cellular-connected devices (scales, cuffs, sensors) that sync measurements directly through the PeakHealth API, SummitMD's clinical system runs automated audits. If a member's weight spikes alongside elevated blood pressure readings, the platform alerts their care team automatically. Early intervention prevents minor weight gains from developing into severe chronic conditions.",
      date: "February 2026",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Dynamic CSS Styling Injection */}
      <style>{`
        /* Overhaul CSS variables & styling matching B2B */
        .weight-hero {
          background-size: cover;
          background-position: center;
          position: relative;
          padding: 80px 0 100px 0;
          color: #ffffff;
          overflow: hidden;
        }

        .weight-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(15, 42, 74, 0.95) 0%, rgba(30, 58, 138, 0.85) 50%, rgba(92, 36, 229, 0.4) 100%);
          z-index: 1;
        }

        .weight-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .weight-title-banner {
          text-align: center;
          padding: 60px 0 20px 0;
        }

        .weight-title-banner h2 {
          font-size: 2.25rem;
          color: var(--color-primary);
          font-weight: 800;
          line-height: 1.25;
          max-width: 800px;
          margin: 0 auto;
        }

        /* Two-Column Blocks style */
        .pillar-section {
          padding: 50px 0;
        }

        .pillar-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .pillar-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .pillar-grid.reverse > div:first-child {
            order: 2;
          }
          .pillar-grid.reverse > div:last-child {
            order: 1;
          }
        }

        .pillar-content h3 {
          font-size: 1.85rem;
          color: var(--color-primary);
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .pillar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pillar-list-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .pillar-list-bullet {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(92, 36, 229, 0.1);
          color: #5c24e5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .pillar-list-text {
          font-size: 1.05rem;
          color: var(--color-text-dark);
          line-height: 1.5;
        }

        .pillar-image {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 10px 25px -5px rgba(15, 42, 74, 0.1), 0 8px 10px -6px rgba(15, 42, 74, 0.1);
          object-fit: cover;
          height: 380px;
        }

        /* Purple Cards Section */
        .results-section {
          background: linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%);
          padding: 80px 0;
          color: #ffffff;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
          margin-bottom: 40px;
        }

        @media (max-width: 992px) {
          .results-grid {
            grid-template-columns: 1fr;
          }
        }

        .result-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }

        .result-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.3);
        }

        .result-card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: #a78bfa;
        }

        .result-card-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #ffffff;
        }

        .result-card-desc {
          font-size: 0.95rem;
          color: #e2e8f0;
          line-height: 1.6;
          opacity: 0.95;
        }

        /* Webinar Banner */
        .webinar-banner {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          padding: 48px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          margin: 60px 0;
        }

        @media (max-width: 992px) {
          .webinar-banner {
            grid-template-columns: 1fr;
            padding: 32px;
            gap: 32px;
          }
        }

        /* Resource Grid */
        .resources-section {
          background-color: #ededff;
          padding: 80px 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        @media (max-width: 1200px) {
          .resources-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .resources-grid {
            grid-template-columns: 1fr;
          }
        }

        .resource-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(15, 42, 74, 0.05);
          cursor: pointer;
        }

        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px -5px rgba(15, 42, 74, 0.1);
        }

        .resource-image {
          height: 160px;
          width: 100%;
          object-fit: cover;
        }

        .resource-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .resource-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #5c24e5;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .resource-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1.4;
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .resource-card-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .resource-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          border-top: 1px solid var(--color-border);
          padding-top: 12px;
        }

        /* Testimonials Section */
        .testimonials-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .testimonial-card {
          max-width: 750px;
          margin: 0 auto;
          text-align: center;
          padding: 24px;
        }

        .testimonial-text {
          font-size: 1.4rem;
          line-height: 1.6;
          color: var(--color-primary);
          font-style: italic;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .testimonial-author {
          font-weight: 700;
          color: var(--color-text-dark);
          font-size: 1rem;
        }

        .testimonial-role {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }

        /* Disclosures bottom Section */
        .disclosures-section {
          background-color: #f1f5f9;
          border-top: 1px solid var(--color-border);
          padding: 40px 0;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .disclosure-item {
          margin-bottom: 12px;
        }

        /* Modals style overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 42, 74, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          padding: 20px;
        }

        .modal-box {
          background: #ffffff;
          width: 100%;
          max-width: 600px;
          border-radius: 24px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          position: relative;
          animation: modal-slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .modal-large-box {
          max-width: 850px;
        }

        @keyframes modal-slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 {
          font-size: 1.35rem;
          color: var(--color-primary);
          font-weight: 800;
          margin: 0;
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--color-bg-light);
          border: none;
          color: var(--color-text-dark);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: var(--color-border);
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 32px;
          max-height: 75vh;
          overflow-y: auto;
        }

        /* Form styling inside modal */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-text-dark);
          margin-bottom: 6px;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid var(--color-border);
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .form-input:focus {
          border-color: #5c24e5;
          box-shadow: 0 0 0 3px rgba(92, 36, 229, 0.15);
        }

        /* Mock Video Player styling */
        .mock-video-container {
          background: #000000;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16/9;
          box-shadow: var(--shadow-md);
        }

        .mock-video-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 10;
        }

        .mock-video-timeline-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          position: relative;
          cursor: pointer;
        }

        .mock-video-timeline-fill {
          height: 100%;
          background: #5c24e5;
          border-radius: 3px;
          position: absolute;
          top: 0;
          left: 0;
        }

        .mock-video-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ffffff;
        }

        .mock-video-title {
          position: absolute;
          top: 20px;
          left: 20px;
          color: #ffffff;
          font-weight: 700;
          font-size: 1rem;
          z-index: 10;
          background: rgba(0, 0, 0, 0.6);
          padding: 6px 12px;
          border-radius: 8px;
        }
      `}</style>

      {/* Navigation header back button */}
      <div className="container" style={{ marginBottom: '24px' }}>
        <button 
          className="btn btn-outline" 
          style={{ padding: '8px 20px', fontSize: '0.85rem', borderRadius: '30px', border: '1px solid var(--color-border)' }} 
          onClick={() => setPage('landing')}
        >
          <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to Homepage
        </button>
      </div>

      {/* Hero Section */}
      <section className="weight-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200')` }}>
        <div className="container">
          <div className="weight-hero-content animate-fade-in">
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#a78bfa', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
              SummitMD B2B Solutions
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              A weight and obesity care solution that delivers results
            </h1>
            <p style={{ color: '#f1f5f9', fontSize: '1.2rem', marginBottom: '36px', lineHeight: 1.6, opacity: 0.95 }}>
              Explore how our comprehensive program addresses weight loss and cardiometabolic health, helping organizations control rising costs and demand for GLP-1 medications.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: '#5c24e5', borderColor: '#5c24e5', padding: '14px 28px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 700 }}
                onClick={() => setIsDemoModalOpen(true)}
              >
                Get in touch
              </button>
              <button 
                className="btn btn-outline" 
                style={{ color: '#ffffff', borderColor: '#ffffff', padding: '14px 28px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 700 }}
                onClick={() => setIsWebinarModalOpen(true)}
              >
                Watch Webinar
              </button>
            </div>
            <div style={{ marginTop: '28px', fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic' }}>
              Important notice on devices*
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Title Banner */}
      <section className="weight-title-banner container animate-fade-in">
        <h2>Discover how high-quality, whole-person care creates better health outcomes</h2>
      </section>

      {/* Pillar 1: Multidisciplinary Care Teams */}
      <section className="pillar-section container animate-fade-in">
        <div className="pillar-grid" id="multidisciplinary">
          <div className="pillar-content">
            <h3>Multidisciplinary care teams help people reach their health goals</h3>
            <ul className="pillar-list">
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">1</span>
                <div className="pillar-list-text">
                  <strong>Expert health coaches:</strong> Help members set personalized goals, review biological metrics, and maintain strict accountability.
                </div>
              </li>
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">2</span>
                <div className="pillar-list-text">
                  <strong>Registered dietitians:</strong> Individually tailored medical nutrition therapy plans designed to adapt to custom metabolism rates.
                </div>
              </li>
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">3</span>
                <div className="pillar-list-text">
                  <strong>Integrated care plans:</strong> Coordinates continuous checks with physicians to ensure sustainable outcomes and safe physiological benchmarks.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img 
              className="pillar-image" 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
              alt="Healthcare professional discussing weight care guidelines on tablet" 
            />
          </div>
        </div>
      </section>

      {/* Pillar 2: Evidence-Based Care / GLP-1 */}
      <section className="pillar-section container animate-fade-in" style={{ backgroundColor: '#ffffff', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="pillar-grid reverse" id="evidence-based">
          <div>
            <img 
              className="pillar-image" 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800" 
              alt="Clinical advisor talking to patient in office about medical pathways" 
            />
          </div>
          <div className="pillar-content" style={{ paddingLeft: '20px' }}>
            <h3>Evidence-based care and support for people on GLP-1s</h3>
            <ul className="pillar-list">
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">1</span>
                <div className="pillar-list-text">
                  <strong>Clinical prescription authority:</strong> Licensed care providers experienced in obesity management can prescribe and adjust medications where medically appropriate¹.
                </div>
              </li>
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">2</span>
                <div className="pillar-list-text">
                  <strong>Companion modules:</strong> Mobile companion program includes custom educational modules and nutrition lessons specific to GLP-1 therapies.
                </div>
              </li>
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">3</span>
                <div className="pillar-list-text">
                  <strong>Prior authorization & billing coordination:</strong> Direct integration with institutional prior authorization channels and self-pay pharmacy alternatives.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pillar 3: Data-Driven Personalization */}
      <section className="pillar-section container animate-fade-in">
        <div className="pillar-grid" id="data-driven">
          <div className="pillar-content">
            <h3>Data-driven personalization drives engagement</h3>
            <ul className="pillar-list">
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">1</span>
                <div className="pillar-list-text">
                  <strong>Cellular connected scale:</strong> Real-time uploads with cellular scales. No Wi-Fi or complex Bluetooth pairings required; readings sync automatically to the app tracker.
                </div>
              </li>
              <li className="pillar-list-item">
                <span className="pillar-list-bullet">2</span>
                <div className="pillar-list-text">
                  <strong>Habit recommendation engines:</strong> Smart algorithms customize targets for physical activity, sleep cycles, hydration and stress mitigation based on daily logging patterns.
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img 
              className="pillar-image" 
              src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800" 
              alt="Connected health tracking accessories and smart scale on bathroom floor" 
            />
          </div>
        </div>
      </section>

      {/* Purple Card Row Section: Integrated Solutions */}
      <section className="results-section animate-fade-in">
        <div className="container">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, textAlign: 'center', marginBottom: '48px', color: '#ffffff' }}>
            Create better results with an integrated solution
          </h2>
          
          <div className="results-grid" id="card-container-purple">
            <div className="result-card">
              <div className="result-card-icon">
                <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>$</span>
              </div>
              <h4 className="result-card-title">Guaranteed results</h4>
              <p className="result-card-desc">
                We’re so confident in our ability to help people achieve better health outcomes, we place our program fees at risk² for qualifying employer groups.
              </p>
            </div>
            
            <div className="result-card">
              <div className="result-card-icon">
                <HeartPulse size={24} />
              </div>
              <h4 className="result-card-title">Sustainable health outcomes</h4>
              <p className="result-card-desc">
                65% of participants lost weight at 1 year³—modest weight loss of 5-10% can mean significant long-term improvements to blood pressure, cholesterol and blood sugar⁴.
              </p>
            </div>

            <div className="result-card">
              <div className="result-card-icon">
                <Brain size={24} />
              </div>
              <h4 className="result-card-title">Integrated mental health</h4>
              <p className="result-card-desc">
                Program participants who also engaged with our digital mental health program saw 13% greater weight loss⁵, addressing the psychological foundations of chronic behavior.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button 
              className="btn btn-primary btn-lg" 
              style={{ backgroundColor: '#ffffff', color: '#5c24e5', borderColor: '#ffffff', fontWeight: 700, padding: '14px 32px', borderRadius: '30px' }}
              onClick={() => setIsDemoModalOpen(true)}
            >
              Get in touch
            </button>
          </div>
        </div>
      </section>

      {/* Webinar Promo Section */}
      <section className="container animate-fade-in">
        <div className="webinar-banner">
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c24e5', fontWeight: 700, display: 'inline-block', marginBottom: '8px' }}>
              Special Clinical Session
            </span>
            <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
              Navigating the new age of GLP-1s
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
              The mounting popularity of GLP-1 medications is changing how organizations address obesity. In this webinar, the American Diabetes Association and SummitMD discuss the opportunities and costs of medication therapies for the long-term management of chronic conditions.
            </p>
            <button 
              className="btn btn-primary" 
              style={{ backgroundColor: '#5c24e5', borderColor: '#5c24e5', padding: '12px 24px', borderRadius: '30px', fontWeight: 700 }}
              onClick={() => setIsWebinarModalOpen(true)}
            >
              Watch the webinar
            </button>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=600" 
              alt="Discussion about weight care clinical webinars" 
              style={{ width: '100%', borderRadius: '16px', cursor: 'pointer' }}
              onClick={() => setIsWebinarModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Resource Center Section */}
      <section className="resources-section animate-fade-in">
        <div className="container">
          <div style={{ textAlign: 'center' }} id="carousel-block-title">
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
              Explore the benefits of comprehensive weight care
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
              Gain insights, meet our members and learn more about our solutions in this curated collection of resources.
            </p>
          </div>

          <div className="resources-grid" id="carousel-block">
            {articles.map((art, idx) => (
              <div key={art.id} className="resource-card" onClick={() => setActiveArticle(art)}>
                <img 
                  className="resource-image" 
                  src={
                    idx === 0 ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400" :
                    idx === 1 ? "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=400" :
                    idx === 2 ? "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400" :
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400"
                  } 
                  alt={art.title} 
                />
                <div className="resource-content">
                  <span className="resource-tag">Insights</span>
                  <h4 className="resource-card-title">{art.title}</h4>
                  <p className="resource-card-desc">{art.desc.substring(0, 85)}...</p>
                  <div className="resource-meta">
                    <span>{art.date}</span>
                    <span style={{ color: '#5c24e5', fontWeight: 700 }}>Read Article</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials Slider/Section */}
      <section className="testimonials-section container animate-fade-in">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.85rem', fontWeight: 800, textAlign: 'center', marginBottom: '48px', color: 'var(--color-primary)' }}>
            Real Members. Sustainable Results.
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div className="glass-card" style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '16px', background: '#f8fafc' }}>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-primary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "Since starting the program, I definitely have more energy. I’m able to do more as far as moving around. I don’t feel so worn out all the time, so that’s been fantastic."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#5c24e5', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 700 }}>M</div>
                <div>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>Melissa</h5>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>SummitMD Member</span>
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '16px', background: '#f8fafc' }}>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--color-primary)', lineHeight: 1.6, marginBottom: '20px' }}>
                "SummitMD helps me maintain my glucose numbers and my weight, because in the long run, it helps with my overall health. It just makes my life easier."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#5c24e5', color: '#ffffff', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 700 }}>B</div>
                <div>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>Beverly</h5>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>SummitMD Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Interactive FAQ Accordion */}
      <section className="container" style={{ paddingBottom: '80px', maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.85rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '12px' }}>GLP-1 & Weight FAQs</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>Frequently asked questions from our partners and members.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              style={{ 
                border: '1px solid var(--color-border)', 
                borderRadius: '16px', 
                overflow: 'hidden',
                background: '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              <button 
                onClick={() => toggleFaq(idx)}
                style={{ 
                  width: '100%', 
                  padding: '20px 24px', 
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
                <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Scale size={18} style={{ color: '#5c24e5', flexShrink: 0 }} /> {faq.q}
                </span>
                {activeFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {activeFaq === idx && (
                <div style={{ 
                  padding: '0 24px 24px 24px', 
                  fontSize: '0.95rem', 
                  lineHeight: 1.6, 
                  color: 'var(--color-text-muted)',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '16px',
                  backgroundColor: '#ffffff'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>



      {/* Footer */}
      <footer style={{ backgroundColor: '#0F2A4A', color: 'rgba(255,255,255,0.7)', padding: '30px 0', textAlign: 'center', fontSize: '0.85rem' }}>
        <div className="container">
          <p>&copy; 2026 SummitMD, Inc. All rights reserved. Vitals synchronized via PeakHealth API.</p>
        </div>
      </footer>

      {/* --- MODALS --- */}
      
      {/* 1. Request Demo/Get In Touch B2B Modal */}
      {isDemoModalOpen && (
        <div className="modal-overlay" onClick={closeDemoModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Coordinate B2B Assessment</h3>
              <button className="modal-close-btn" aria-label="Close form" onClick={closeDemoModal}>
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-body">
              {!demoSubmitted ? (
                <form onSubmit={handleDemoSubmit}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                    Provide your contact info to coordinate a walkthrough of our whole-person plans, API sync, and employee benefit packages.
                  </p>
                  
                  <div className="form-group">
                    <label htmlFor="demo-name">Full Name</label>
                    <input 
                      type="text" 
                      id="demo-name"
                      className="form-input" 
                      required 
                      value={demoForm.name}
                      onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                      placeholder="e.g. Sarah Jenkins"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-email">Work Email</label>
                    <input 
                      type="email" 
                      id="demo-email"
                      className="form-input" 
                      required 
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                      placeholder="e.g. sjenkins@company.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-company">Company / Organization</label>
                    <input 
                      type="text" 
                      id="demo-company"
                      className="form-input" 
                      required 
                      value={demoForm.company}
                      onChange={(e) => setDemoForm({...demoForm, company: e.target.value})}
                      placeholder="e.g. Acme Corporation"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-title">Job Title</label>
                    <input 
                      type="text" 
                      id="demo-title"
                      className="form-input" 
                      required 
                      value={demoForm.title}
                      onChange={(e) => setDemoForm({...demoForm, title: e.target.value})}
                      placeholder="e.g. VP of Employee Benefits"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-employees">Employee Count</label>
                    <select 
                      id="demo-employees"
                      className="form-input"
                      value={demoForm.employees}
                      onChange={(e) => setDemoForm({...demoForm, employees: e.target.value})}
                    >
                      <option value="< 100">Fewer than 100</option>
                      <option value="100-500">100 - 499</option>
                      <option value="500-1000">500 - 999</option>
                      <option value="1000-5000">1,000 - 4,999</option>
                      <option value="5000+">5,000 or more</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-message">Message (Optional)</label>
                    <textarea 
                      id="demo-message"
                      className="form-input" 
                      style={{ minHeight: '80px', resize: 'vertical' }}
                      value={demoForm.message}
                      onChange={(e) => setDemoForm({...demoForm, message: e.target.value})}
                      placeholder="Describe your cardiometabolic care objectives..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', backgroundColor: '#5c24e5', borderColor: '#5c24e5', padding: '12px', borderRadius: '12px', fontWeight: 700, marginTop: '10px' }}
                  >
                    Submit Assessment Request
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'inline-flex', alignItems: 'center', justify: 'center', marginBottom: '24px' }}>
                    <Scale size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '12px' }}>Request Received</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Thank you, <strong>{demoForm.name}</strong>. Our B2B partnership coordinator will contact you at <strong>{demoForm.email}</strong> to schedule a clinical assessment walkthrough for <strong>{demoForm.company}</strong>.
                  </p>
                  <button 
                    className="btn btn-outline" 
                    style={{ minWidth: '120px', borderRadius: '30px' }} 
                    onClick={closeDemoModal}
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Watch Webinar / Register Modal & Simulated Video Player */}
      {isWebinarModalOpen && (
        <div className="modal-overlay" onClick={closeWebinarModal}>
          <div className="modal-box modal-large-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{webinarRegistered ? "B2B Webinar Briefing" : "Webinar Registration Required"}</h3>
              <button className="modal-close-btn" aria-label="Close webinar" onClick={closeWebinarModal}>
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-body">
              {!webinarRegistered ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
                  <div style={{ paddingRight: '12px', borderRight: '1px solid var(--color-border)' }}>
                    <img 
                      src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&q=80&w=350" 
                      alt="GLP-1 clinical webinar slide" 
                      style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                    />
                    <h5 style={{ fontWeight: 800, margin: '0 0 8px 0', fontSize: '0.95rem' }}>Navigating the New Age of GLP-1s</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                      Join the ADA and SummitMD clinical leadership to analyze weight management algorithms, cellular reporting, and benefits cost models.
                    </p>
                  </div>
                  <div>
                    <form onSubmit={handleWebinarSubmit}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                        Register to unlock instant streaming of this B2B webinar panel session.
                      </p>
                      
                      <div className="form-group">
                        <label htmlFor="webinar-name">Full Name</label>
                        <input 
                          type="text" 
                          id="webinar-name"
                          className="form-input" 
                          required 
                          value={webinarForm.name}
                          onChange={(e) => setWebinarForm({...webinarForm, name: e.target.value})}
                          placeholder="e.g. Mark Robinson"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="webinar-email">Business Email</label>
                        <input 
                          type="email" 
                          id="webinar-email"
                          className="form-input" 
                          required 
                          value={webinarForm.email}
                          onChange={(e) => setWebinarForm({...webinarForm, email: e.target.value})}
                          placeholder="e.g. mrobinson@org.org"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="webinar-org">Organization</label>
                        <input 
                          type="text" 
                          id="webinar-org"
                          className="form-input" 
                          required 
                          value={webinarForm.org}
                          onChange={(e) => setWebinarForm({...webinarForm, org: e.target.value})}
                          placeholder="e.g. Alliance Benefits Fund"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%', backgroundColor: '#5c24e5', borderColor: '#5c24e5', padding: '12px', borderRadius: '12px', fontWeight: 700 }}
                      >
                        Register & View Briefing
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Simulated Video Player */}
                  <div className="mock-video-container">
                    <div className="mock-video-title">
                      Webinar Session: Navigating the New Age of GLP-1s (ADA & SummitMD Partnership)
                    </div>
                    
                    {/* Simulated Slide Content Display */}
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'radial-gradient(circle, #1e1b4b 0%, #030712 100%)', 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center', 
                      justifyContent: 'center',
                      padding: '40px',
                      boxSizing: 'border-box',
                      color: '#ffffff',
                      textAlign: 'center'
                    }}>
                      {isPlayingWebinar ? (
                        <div className="animate-fade-in" style={{ maxWidth: '500px' }}>
                          <span style={{ fontSize: '0.8rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
                            Simulated Streaming • Slide {Math.floor(webinarProgress / 25) + 1}
                          </span>
                          
                          {webinarProgress < 25 && (
                            <div>
                              <h4 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>The GLP-1 Cost Dilemma</h4>
                              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                "GLP-1 medications account for over 50% of weight-related prescription expenditures in B2B benefits plans today. Sustainable outcomes require lifestyle companion tools."
                              </p>
                              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '6px', fontSize: '0.8rem', marginTop: '16px', fontWeight: 700 }}>
                                Expenditure Curve: +300% YoY
                              </div>
                            </div>
                          )}

                          {webinarProgress >= 25 && webinarProgress < 50 && (
                            <div>
                              <h4 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Behavioral Companion Results</h4>
                              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                "Members combining GLP-1 with dietary counseling and cellular scale synchronization show a 65% weight reduction retention rate at 12 months."
                              </p>
                              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid #22c55e', color: '#86efac', borderRadius: '6px', fontSize: '0.8rem', marginTop: '16px', fontWeight: 700 }}>
                                12-Month Weight Retention: 65%
                              </div>
                            </div>
                          )}

                          {webinarProgress >= 50 && webinarProgress < 75 && (
                            <div>
                              <h4 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Cardiometabolic Sync Logic</h4>
                              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                "By using cellular sensors to sync blood pressure and glucose metrics directly to the PeakHealth API, we alert primary care networks before complications occur."
                              </p>
                              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', color: '#93c5fd', borderRadius: '6px', fontSize: '0.8rem', marginTop: '16px', fontWeight: 700 }}>
                                PeakHealth FHIR integration active
                              </div>
                            </div>
                          )}

                          {webinarProgress >= 75 && (
                            <div>
                              <h4 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px' }}>Integrating Mental Health Metrics</h4>
                              <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                "Addressing psychological triggers yields 13% greater weight reduction. Co-morbidities decrease as mental health scorecards improve."
                              </p>
                              <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(167, 139, 250, 0.2)', border: '1px solid #a78bfa', color: '#ddd6fe', borderRadius: '6px', fontSize: '0.8rem', marginTop: '16px', fontWeight: 700 }}>
                                Weight Reduction Lift: +13%
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <Play size={48} style={{ color: '#5c24e5', cursor: 'pointer', marginBottom: '16px' }} onClick={() => setIsPlayingWebinar(true)} />
                          <h4 style={{ fontSize: '1.3rem' }}>Stream Paused</h4>
                          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Click play to resume webinar briefing.</p>
                        </div>
                      )}
                    </div>

                    <div className="mock-video-controls">
                      {/* Timeline progress */}
                      <div 
                        className="mock-video-timeline-bg"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const pct = ((e.clientX - rect.left) / rect.width) * 100;
                          setWebinarProgress(Math.floor(pct));
                        }}
                      >
                        <div className="mock-video-timeline-fill" style={{ width: `${webinarProgress}%` }}></div>
                      </div>

                      <div className="mock-video-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <button 
                            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                            onClick={() => setIsPlayingWebinar(!isPlayingWebinar)}
                          >
                            {isPlayingWebinar ? <Pause size={20} /> : <Play size={20} />}
                          </button>
                          <span style={{ fontSize: '0.8rem', color: '#d1d5db' }}>
                            {`0${Math.floor(webinarProgress * 0.45)}:${String(Math.floor((webinarProgress * 27) % 60)).padStart(2, '0')} / 45:00`}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>
                          Live B2B Audience: 238 Benefits Leaders
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '20px', marginTop: '24px', alignItems: 'center' }}>
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ fontWeight: 700, margin: '0 0 4px 0' }}>Streaming unlocked for {webinarForm.name}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Registered through {webinarForm.org} ({webinarForm.email})</span>
                    </div>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '8px 16px', borderRadius: '30px', fontSize: '0.85rem' }} 
                      onClick={() => setWebinarRegistered(false)}
                    >
                      Reset Registration
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Resource Article Pop-Up Modal */}
      {activeArticle && (
        <div className="modal-overlay" onClick={() => setActiveArticle(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5c24e5', fontWeight: 700 }}>Clinical & Strategy Insights</span>
                <h3 style={{ marginTop: '4px' }}>{activeArticle.title}</h3>
              </div>
              <button className="modal-close-btn" aria-label="Close article" onClick={() => setActiveArticle(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-text-dark)' }}>
              <p style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '20px' }}>
                {activeArticle.desc}
              </p>
              <div style={{ borderLeft: '3px solid #5c24e5', paddingLeft: '16px', margin: '24px 0', color: 'var(--color-text-muted)' }}>
                {activeArticle.content}
              </div>
              <p>
                To explore how SummitMD can deploy these specific structural models and customize a whole-person care campaign for your workforce population, click the B2B Consultation request form.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '24px', marginTop: '32px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Published: {activeArticle.date} | {activeArticle.readTime}</span>
                <button 
                  className="btn btn-primary" 
                  style={{ backgroundColor: '#5c24e5', borderColor: '#5c24e5', borderRadius: '30px' }}
                  onClick={() => {
                    setActiveArticle(null);
                    setIsDemoModalOpen(true);
                  }}
                >
                  Request Program Walkthrough
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
