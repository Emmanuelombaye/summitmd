import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Brain, HeartPulse, FileText, X, ChevronRight, ChevronDown, ChevronUp, Play, Pause, CheckCircle } from 'lucide-react';

export default function EmployeeAssistanceProgramPage({ setPage }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
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

  // Scheduler Widget State
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [schedulerForm, setSchedulerForm] = useState({
    name: '',
    email: '',
    org: '',
    phone: ''
  });
  const [schedulerBooked, setSchedulerBooked] = useState(false);

  // Simulated Video Player State inside modal
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (isVideoModalOpen && isPlayingVideo) {
      timer = setInterval(() => {
        setVideoProgress(prev => (prev >= 100 ? 0 : prev + 1.5));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isVideoModalOpen, isPlayingVideo]);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
  };

  const handleSchedulerSubmit = (e) => {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return;
    setSchedulerBooked(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    setTimeout(() => {
      setDemoForm({ name: '', email: '', company: '', title: '', employees: '< 100', message: '' });
      setDemoSubmitted(false);
    }, 300);
  };

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Next 5 working days for the calendar widget
  const getNextWorkingDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let current = new Date();
    
    // Add 2026 local time padding or keep current system date
    while (days.length < 5) {
      current.setDate(current.getDate() + 1);
      // Skip weekends
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        days.push({
          dayOfWeek: weekdays[current.getDay()],
          dateNum: current.getDate(),
          month: months[current.getMonth()],
          fullString: `${weekdays[current.getDay()]}, ${months[current.getMonth()]} ${current.getDate()}`
        });
      }
    }
    return days;
  };

  const calendarDays = getNextWorkingDays();
  const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  const faqs = [
    {
      q: "How is Wellbound different from other EAPs?",
      a: "Unlike other EAPs, Wellbound goes beyond traditional work-life resources, connecting employees to highly recognized, trusted mental and physical health support through seamless navigation that makes it easier to find, access and engage with what’s needed to maintain lasting health and wellness."
    },
    {
      q: "How do employees access these resources?",
      a: "Employees can log in to the SummitMD or BetterHelp app or call our dedicated support line. The multi-front door approach helps boost utilization, and single sign-on enables seamless transitions between medical and EAP platforms."
    },
    {
      q: "How does Wellbound support personalized navigation?",
      a: "Employees are guided by always-available Care Advocates. These clinicians conduct a comprehensive intake assessment to determine the patient’s presenting issue(s) and severity before directing them to the appropriate therapist, coach, or medical resource."
    },
    {
      q: "Can employees continue to access therapy after their session limit?",
      a: "Once the EAP session limit has been reached, employees can continue receiving therapy from the same provider through their medical benefits if the provider is in-network. This prevents care disruption, which is a major drawback of legacy EAP systems."
    },
    {
      q: "Is Wellbound a SummitMD or BetterHelp service?",
      a: "Wellbound is an integrated service offered and contracted through SummitMD that leverages the diverse and extensive network of BetterHelp providers to offer therapy within days."
    },
    {
      q: "Are any professional development and organizational support services included?",
      a: "Yes! We offer services to empower business leaders and their organizations. These include management consultation, leadership training, in-the-moment referral support and critical incident and trauma response."
    }
  ];

  const articles = [
    {
      id: 'shape-corp',
      title: "Shape Corp Case Study: Driving High Utilization",
      desc: "Learn how creative engagement strategies and multi-channel marketing campaigns empowered Shape Corp employees to take control of their health, yielding a 3x increase in EAP engagement.",
      content: "Shape Corp sought a modernization of their employee mental health package due to low engagement (less than 4% under their legacy EAP provider). By launching Wellbound, with a unified app registration drive and on-site clinical advocates, Shape Corp increased EAP enrollment to 14.5% within the first 6 months. Care continuity improved significantly, with 88% of users completing their therapy schedules.",
      date: "May 2026",
      readTime: "5 min read"
    },
    {
      id: 'metrics-matter',
      title: "Metrics That Matter: A New Approach to Mental Health Data",
      desc: "An analytical deep dive into EAP clinical outcomes. Explore the differences between legacy reporting metrics and data-backed clinical recovery indicators.",
      content: "Traditional EAPs report success based on clicks or brochures distributed. Wellbound measures outcome metrics using standard clinical indicators (PHQ-9 for depression and GAD-7 for anxiety). By analyzing anonymous aggregated data, benefit leaders can trace specific wellness improvements over time. Our reporting demonstrates a direct correlation between EAP coaching sessions and a 15% reduction in employee absenteeism.",
      date: "April 2026",
      readTime: "7 min read"
    },
    {
      id: 'state-stigma',
      title: "The State of Stigma: Breaking Barriers to Care Access",
      desc: "A review of cultural and structural stigma standing between employees and the clinical help they deserve, and how digital-first entry points help bridge the gap.",
      content: "Stigma remains the single largest deterrent preventing workers from seeking psychiatric help. Our research shows that digital-first, private access (text-based coaching and virtual scheduling through BetterHelp) reduces clinical anxiety in patients by 40% compared to telephonic EAP intakes. Providing a frictionless 'digital front door' enables employees to seek support early before burnout develops into severe medical leave events.",
      date: "March 2026",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Dynamic CSS Styling Injection */}
      <style>{`
        .eap-hero {
          background-size: cover;
          background-position: center;
          position: relative;
          padding: 90px 0 110px 0;
          color: #ffffff;
          overflow: hidden;
        }

        .eap-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(15, 42, 74, 0.95) 0%, rgba(30, 58, 138, 0.85) 60%, rgba(92, 36, 229, 0.35) 100%);
          z-index: 1;
        }

        .eap-hero-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
        }

        .stats-strip {
          background: #ffffff;
          padding: 40px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          text-align: left;
        }

        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }

        .stat-num {
          font-size: 2.25rem;
          font-weight: 800;
          color: #5c24e5;
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .stat-lbl {
          font-size: 0.9rem;
          color: var(--color-text-dark);
          line-height: 1.4;
          font-weight: 600;
        }

        /* Pillars of EAP section */
        .eap-feature-section {
          padding: 80px 0;
        }

        .eap-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 992px) {
          .eap-feature-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .eap-feature-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .eap-feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(15, 42, 74, 0.08);
          border-color: rgba(92, 36, 229, 0.2);
        }

        .eap-feature-card-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .eap-feature-card h4 {
          font-size: 1.25rem;
          color: var(--color-primary);
          font-weight: 800;
          margin-bottom: 12px;
        }

        .eap-feature-card p {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* Services Grid Section */
        .services-section {
          background: #ededff;
          padding: 80px 0;
        }

        .services-columns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 40px;
        }

        @media (max-width: 992px) {
          .services-columns {
            grid-template-columns: 1fr;
          }
        }

        .service-column-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 36px;
          border: 1px solid rgba(15, 42, 74, 0.05);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }

        .service-column-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-primary);
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #ededff;
        }

        .service-items-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.95rem;
          color: var(--color-text-dark);
          line-height: 1.4;
        }

        .service-item-bullet {
          color: #5c24e5;
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* Outcomes Section */
        .outcomes-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .outcomes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .outcomes-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .outcome-metric-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .outcome-metric-card {
          background: #f8fafc;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
        }

        .outcome-metric-val {
          font-size: 2.25rem;
          font-weight: 800;
          color: #5c24e5;
          margin-bottom: 8px;
        }

        .outcome-metric-lbl {
          font-size: 0.85rem;
          color: var(--color-text-dark);
          font-weight: 700;
          line-height: 1.3;
        }

        /* Case Studies section */
        .cases-section {
          padding: 80px 0;
          background: #f1f5f9;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        @media (max-width: 992px) {
          .cases-grid {
            grid-template-columns: 1fr;
          }
        }

        .case-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid var(--color-border);
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .case-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px -8px rgba(15, 42, 74, 0.1);
          border-color: rgba(92, 36, 229, 0.2);
        }

        .case-img {
          height: 160px;
          width: 100%;
          object-fit: cover;
        }

        .case-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .case-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #5c24e5;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
        }

        .case-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-primary);
          line-height: 1.4;
          margin-bottom: 12px;
          flex-grow: 1;
        }

        .case-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 20px;
        }

        .case-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          border-top: 1px solid var(--color-border);
          padding-top: 14px;
        }

        /* Calendar Scheduler Widget styling */
        .scheduler-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          overflow: hidden;
          max-width: 650px;
          margin: 0 auto;
        }

        .scheduler-header {
          background: linear-gradient(135deg, #0f2a4a 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 24px 32px;
        }

        .scheduler-body {
          padding: 32px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .calendar-day-btn {
          background: #f8fafc;
          border: 1.5px solid var(--color-border);
          border-radius: 12px;
          padding: 12px 6px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          outline: none;
        }

        .calendar-day-btn:hover {
          border-color: #5c24e5;
          background: rgba(92, 36, 229, 0.05);
        }

        .calendar-day-btn.selected {
          background: #5c24e5;
          border-color: #5c24e5;
          color: #ffffff;
        }

        .calendar-day-btn .day-week {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          opacity: 0.8;
        }

        .calendar-day-btn .day-num {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .calendar-day-btn .day-month {
          font-size: 0.7rem;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 24px;
        }

        @media (max-width: 576px) {
          .slots-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .slot-btn {
          background: #ffffff;
          border: 1.5px solid var(--color-border);
          border-radius: 10px;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          font-size: 0.88rem;
          font-weight: 600;
          outline: none;
          transition: all 0.2s ease;
        }

        .slot-btn:hover {
          border-color: #5c24e5;
          background: rgba(92, 36, 229, 0.02);
        }

        .slot-btn.selected {
          background: #5c24e5;
          color: #ffffff;
          border-color: #5c24e5;
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

        /* Video player frame */
        .eap-video-panel {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          aspect-ratio: 16/9;
          cursor: pointer;
        }

        .eap-video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 42, 74, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: background 0.3s ease;
        }

        .eap-video-panel:hover .eap-video-overlay {
          background: rgba(15, 42, 74, 0.3);
        }

        .eap-play-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #ffffff;
          color: #5c24e5;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }

        .eap-video-panel:hover .eap-play-icon {
          transform: scale(1.1);
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
      <section className="eap-hero" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200')` }}>
        <div className="container">
          <div className="eap-hero-content animate-fade-in">
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#a78bfa', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
              EMPLOYEE ASSISTANCE PROGRAM
            </span>
            <h1 style={{ fontSize: '3.25rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', color: '#ffffff', fontFamily: 'var(--font-display)' }}>
              Meet Wellbound: a smarter EAP for today’s workforce
            </h1>
            <p style={{ color: '#f1f5f9', fontSize: '1.2rem', marginBottom: '36px', lineHeight: 1.6, opacity: 0.95 }}>
              Wellbound is a new type of employee assistance program from SummitMD designed to boost utilization, improve care continuity and provide seamless, personalized support. Learn how we’re transforming EAPs from an underused resource into a powerful on-ramp for long-term employee wellness.
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
                onClick={() => {
                  const target = document.getElementById('why-wellbound');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Why Wellbound is different
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Stats Strip */}
      <section className="stats-strip animate-fade-in">
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-num">#1</div>
              <div className="stat-lbl">Most recognized virtual care brand¹</div>
            </div>
            <div>
              <div className="stat-num">20+ Years</div>
              <div className="stat-lbl">Of clinical expertise serving patients virtually</div>
            </div>
            <div>
              <div className="stat-num">40K+</div>
              <div className="stat-lbl">Medical & mental health providers²</div>
            </div>
            <div>
              <div className="stat-num">500M+</div>
              <div className="stat-lbl">Annual health interactions³</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Built for Use */}
      <section className="eap-feature-section container animate-fade-in" id="why-wellbound">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c24e5', fontWeight: 700 }}>
            BUILT FOR USE. DESIGNED FOR IMPACT.
          </span>
          <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', fontWeight: 800, marginTop: '8px', marginBottom: '16px' }}>
            A new approach to better mental health
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.5 }}>
            Proven engagement strategies that simplify the user journey across mental health, work-life and virtual care services.
          </p>
        </div>

        <div className="eap-feature-grid">
          <div className="eap-feature-card">
            <img 
              className="eap-feature-card-img" 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=500" 
              alt="Team discussing EAP engagement plans" 
            />
            <h4>Improved awareness</h4>
            <p>
              Proactive B2B communication toolkits and creative engagement strategies empower employees to take control of their health early, bypassing workplace stigma.
            </p>
          </div>

          <div className="eap-feature-card">
            <img 
              className="eap-feature-card-img" 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=500" 
              alt="User having a telemedicine video visit" 
            />
            <h4>Everyday support</h4>
            <p>
              Wellbound connects employees to high-quality support in seconds and matches them with a BetterHelp therapist within days—offering personalized guidance and the option to continue care with the same provider.
            </p>
          </div>

          <div className="eap-feature-card">
            <img 
              className="eap-feature-card-img" 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=500" 
              alt="Manager looking at analytical statistics dashboard" 
            />
            <h4>Measurable value</h4>
            <p>
              Tailored support results in improved well-being, a more productive workforce and higher employee satisfaction—captured by robust dashboard reporting with data-backed clinical insights.
            </p>
          </div>
        </div>
      </section>

      {/* Section: One-Stop Shop Services */}
      <section className="services-section animate-fade-in">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
              A one-stop shop for mind, body and work-life well-being
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Our multi-front door structure ensures employees have a frictionless pathway to support whatever their needs.
            </p>
          </div>

          <div className="services-columns">
            <div className="service-column-card">
              <h4 className="service-column-title" style={{ borderBottomColor: '#dbeafe' }}>Mental Health & Wellness</h4>
              <ul className="service-items-list">
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Virtual therapy via integration with BetterHelp</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>In-person therapy sessions*</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Dedicated teens' and couples' therapy</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>24/7 in-the-moment crisis hotlines</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>One-on-one lifestyle and wellness coaching</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Psychiatry assessment and medication management</span>
                </li>
              </ul>
            </div>

            <div className="service-column-card">
              <h4 className="service-column-title" style={{ borderBottomColor: '#fef08a' }}>Work-Life Resources*</h4>
              <ul className="service-items-list">
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Onsite critical incident response & trauma support</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Professional job transition and career coaching</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Financial consulting and budgeting guides</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Legal consultations and document coordination</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Care coordinators for children and aging parents</span>
                </li>
              </ul>
            </div>

            <div className="service-column-card">
              <h4 className="service-column-title" style={{ borderBottomColor: '#bbf7d0' }}>SummitMD Services**</h4>
              <ul className="service-items-list">
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>24/7 virtual urgent care consultations</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Primary care annual physicals & health assessments</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Cardiometabolic health (Weight, Diabetes, Hypertension)</span>
                </li>
                <li className="service-item">
                  <CheckCircle size={18} className="service-item-bullet" />
                  <span>Secondary medical opinion panels with world-class specialists</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes & Video Panel section */}
      <section className="outcomes-section container animate-fade-in">
        <div className="outcomes-grid">
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#5c24e5', fontWeight: 700 }}>
              CLINICAL VALIDATION & OUTCOMES
            </span>
            <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', fontWeight: 800, marginTop: '8px', marginBottom: '20px' }}>
              Better care for employees, better results for you
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Using insights from millions of mental health visits, Wellbound is purpose-built to drive utilization of resources that empower employees to live healthier lives—and boosts overall satisfaction.
            </p>
            <div className="outcome-metric-box">
              <div className="outcome-metric-card">
                <div className="outcome-metric-val">2-3x</div>
                <div className="outcome-metric-lbl">Higher enrollment than legacy EAPs⁴</div>
              </div>
              <div className="outcome-metric-card">
                <div className="outcome-metric-val">70%+</div>
                <div className="outcome-metric-lbl">Report symptom decrease in 12 weeks⁵</div>
              </div>
              <div className="outcome-metric-card">
                <div className="outcome-metric-val">4.9</div>
                <div className="outcome-metric-lbl">Average satisfaction rating out of 5⁶</div>
              </div>
              <div className="outcome-metric-card">
                <div className="outcome-metric-val">+78</div>
                <div className="outcome-metric-lbl">Net Promoter Score Rating⁷</div>
              </div>
            </div>
          </div>
          <div>
            {/* Playable Video banner panel */}
            <div className="eap-video-panel" onClick={() => { setIsVideoModalOpen(true); setIsPlayingVideo(true); }}>
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800" 
                alt="Wellbound briefing video preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="eap-video-overlay">
                <div className="eap-play-icon">
                  <Play size={28} style={{ fill: '#5c24e5', marginLeft: '4px' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#ffffff', fontWeight: 700, zIndex: 10, background: 'rgba(15, 42, 74, 0.8)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}>
                Briefing: The Smarter EAP (4:12)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="cases-section animate-fade-in">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
              Discover how we can help you support your people
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Read case reports, metrics sheets, and stigma surveys outlining modern corporate benefits.
            </p>
          </div>

          <div className="cases-grid">
            {articles.map((art) => (
              <div key={art.id} className="case-card" onClick={() => setActiveArticle(art)}>
                <img 
                  className="case-img" 
                  src={
                    art.id === 'shape-corp' ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" :
                    art.id === 'metrics-matter' ? "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400" :
                    "https://images.unsplash.com/photo-1516302796627-d23d88dec7c7?auto=format&fit=crop&q=80&w=400"
                  } 
                  alt={art.title} 
                />
                <div className="case-content">
                  <span className="case-tag">Resource</span>
                  <h4 className="case-title">{art.title}</h4>
                  <p className="case-desc">{art.desc.substring(0, 110)}...</p>
                  <div className="case-footer">
                    <span>{art.date}</span>
                    <span style={{ color: '#5c24e5', fontWeight: 700 }}>Learn more</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.85rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '12px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '40px' }}>
          Still have questions? Expand any item below to read details.
        </p>

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
                  <Brain size={18} style={{ color: '#5c24e5', flexShrink: 0 }} /> {faq.q}
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

      {/* Interactive Scheduler B2B Widget */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>Learn how we can help you</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Schedule a consultation call directly with our partnership team.</p>
        </div>

        <div className="scheduler-card">
          <div className="scheduler-header">
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Schedule a call with our team</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', opacity: 0.9 }}>Select your preferred callback date & time slot below.</p>
          </div>
          
          <div className="scheduler-body">
            {!schedulerBooked ? (
              <form onSubmit={handleSchedulerSubmit}>
                {/* 1. Day Picker */}
                <div className="form-group">
                  <label>1. Select Date</label>
                  <div className="calendar-grid">
                    {calendarDays.map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`calendar-day-btn ${selectedDay && selectedDay.dateNum === day.dateNum ? 'selected' : ''}`}
                        onClick={() => setSelectedDay(day)}
                      >
                        <span className="day-week">{day.dayOfWeek}</span>
                        <span className="day-num">{day.dateNum}</span>
                        <span className="day-month">{day.month}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Slot Picker */}
                {selectedDay && (
                  <div className="form-group">
                    <label>2. Select Time Slot ({selectedDay.fullString})</label>
                    <div className="slots-grid">
                      {timeSlots.map((time, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`slot-btn ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Callback info form */}
                {selectedDay && selectedTime && (
                  <div className="animate-fade-in" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="sched-name">Full Name</label>
                      <input 
                        type="text" 
                        id="sched-name"
                        className="form-input" 
                        required 
                        value={schedulerForm.name}
                        onChange={(e) => setSchedulerForm({...schedulerForm, name: e.target.value})}
                        placeholder="e.g. Robert Vance"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="sched-email">Work Email</label>
                      <input 
                        type="email" 
                        id="sched-email"
                        className="form-input" 
                        required 
                        value={schedulerForm.email}
                        onChange={(e) => setSchedulerForm({...schedulerForm, email: e.target.value})}
                        placeholder="e.g. rvance@vancecool.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="sched-org">Company / Organization</label>
                      <input 
                        type="text" 
                        id="sched-org"
                        className="form-input" 
                        required 
                        value={schedulerForm.org}
                        onChange={(e) => setSchedulerForm({...schedulerForm, org: e.target.value})}
                        placeholder="e.g. Vance Refrigeration"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="sched-phone">Callback Phone Number</label>
                      <input 
                        type="tel" 
                        id="sched-phone"
                        className="form-input" 
                        required 
                        value={schedulerForm.phone}
                        onChange={(e) => setSchedulerForm({...schedulerForm, phone: e.target.value})}
                        placeholder="e.g. 555-019-2834"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ width: '100%', backgroundColor: '#5c24e5', borderColor: '#5c24e5', padding: '12px', borderRadius: '12px', fontWeight: 700 }}
                    >
                      Book Callback - {selectedDay.dayOfWeek} at {selectedTime}
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'inline-flex', alignItems: 'center', justify: 'center', marginBottom: '20px' }}>
                  <CheckCircle size={32} />
                </div>
                <h4 style={{ fontSize: '1.3rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '8px' }}>Consultation Booked!</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px' }}>
                  Thank you, <strong>{schedulerForm.name}</strong>. A benefits specialist from our Wellbound EAP team will call you at <strong>{schedulerForm.phone}</strong> on <strong>{selectedDay.fullString} at {selectedTime}</strong>. A calendar invite has been sent to <strong>{schedulerForm.email}</strong>.
                </p>
                <button 
                  className="btn btn-outline" 
                  style={{ borderRadius: '30px', padding: '8px 24px' }}
                  onClick={() => {
                    setSchedulerBooked(false);
                    setSelectedDay(null);
                    setSelectedTime(null);
                    setSchedulerForm({ name: '', email: '', org: '', phone: '' });
                  }}
                >
                  Schedule Another Call
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Styled Footnotes & Disclosures Section */}
      <section className="disclosures-section">
        <div className="container">
          <div className="disclosure-item">
            *Services provided by SummitMD affiliates and partners.
          </div>
          <div className="disclosure-item">
            **Seamless connection to SummitMD programs is available to organizations that offer these services to their employees. Contracting for these services is separate from Wellbound.
          </div>
          <div className="disclosure-item">
            <sup>1</sup> SummitMD B2B Brand Tracker. Sept. 2024.
          </div>
          <div className="disclosure-item">
            <sup>2</sup> Includes 1.) SummitMD Medical Group Providers, plus all BetterHelp network providers who provided services from Jan. 1, 2023-Nov. 3, 2023.
          </div>
          <div className="disclosure-item">
            <sup>3</sup> Includes health interactions across Integrated Care and BetterHelp segments.
          </div>
          <div className="disclosure-item">
            <sup>4</sup> BetterHelp Business BoB user data of all covered lives, Jan. 2023-May 2025.
          </div>
          <div className="disclosure-item">
            <sup>5</sup> BetterHelp clinical quality metrics are based on client data in 2024. BetterHelp currently assigns clients PHQ9 and/or GAD7 assessments upon starting therapy and every 45 days thereafter. Our inclusion criteria for measurement of clinical outcomes requires clients to complete a minimum of two assessments; not every client will complete two assessments. A client is considered ‘in treatmentʼ once they complete a live session or exchange messages with their therapist (whichever is earlier). We survey the clients two weeks after they are ‘in treatmentʼ and every four weeks thereafter.
          </div>
          <div className="disclosure-item">
            <sup>6</sup> Based on 1.7M+ user ratings; BetterHelp Platform Quality & Outcomes Report. Published 2024.
          </div>
          <div className="disclosure-item">
            <sup>7</sup> BetterHelp Platform Quality & Outcomes Report. Published in 2024.
          </div>
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
                    Provide your contact info to coordinate a walkthrough of our Wellbound EAP whole-person plan, coaching tiers, and app sync tools.
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
                      placeholder="Describe your mental health benefit objectives..."
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
                    <CheckCircle size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '12px' }}>Request Received</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Thank you, <strong>{demoForm.name}</strong>. Our B2B partnership coordinator will contact you at <strong>{demoForm.email}</strong> to discuss modernizing EAP plans for <strong>{demoForm.company}</strong>.
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

      {/* 2. Play Briefing Video Modal */}
      {isVideoModalOpen && (
        <div className="modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="modal-box modal-large-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Briefing: Transforming Corporate Wellness with Wellbound</h3>
              <button className="modal-close-btn" aria-label="Close video" onClick={() => setIsVideoModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="modal-body" style={{ padding: '24px' }}>
              <div className="mock-video-container">
                <div className="mock-video-title">
                  SummitMD Presentation: Overcoming Low Legacy EAP Engagement
                </div>
                
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'radial-gradient(circle, #0f172a 0%, #020617 100%)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '40px',
                  boxSizing: 'border-box',
                  color: '#ffffff',
                  textAlign: 'center'
                }}>
                  {isPlayingVideo ? (
                    <div className="animate-fade-in" style={{ maxWidth: '550px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
                        Simulated Playback • {videoProgress < 30 ? 'Introduction' : videoProgress < 60 ? 'BetterHelp Network Integration' : videoProgress < 90 ? 'Outcomes & Data Reporting' : 'Interactive Features'}
                      </span>
                      
                      {videoProgress < 30 && (
                        <div>
                          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Reimagining the Employee Care Path</h4>
                          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            "Legacy EAPs suffer from an average utilization rate of less than 4%. Wellbound uses active outreach tools, digital self-guided training, and frictionless clinician-guided assessments to drive engagement up to 3x."
                          </p>
                        </div>
                      )}

                      {videoProgress >= 30 && videoProgress < 60 && (
                        <div>
                          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Unified BetterHelp Integration</h4>
                          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            "Frictionless single sign-on connects employees directly to BetterHelp's licensed network of 40,000+ therapists. Sessions match in days, and patients can continue care using medical benefits."
                          </p>
                        </div>
                      )}

                      {videoProgress >= 60 && videoProgress < 90 && (
                        <div>
                          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Meaningful Outcomes Tracking</h4>
                          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            "We report aggregate, HIPAA-compliant recovery trends. Over 70% of enrolled employees report clinical reductions in anxiety and depression scores in just 12 weeks of treatment."
                          </p>
                        </div>
                      )}

                      {videoProgress >= 90 && (
                        <div>
                          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Whole-Person Medical Integration</h4>
                          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            "When physical issues like chronic sleep loss or metabolic spikes complicate mental wellness, Care Advocates route members directly into SummitMD's clinical care pipelines."
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <Play size={48} style={{ color: '#5c24e5', cursor: 'pointer', marginBottom: '16px' }} onClick={() => setIsPlayingVideo(true)} />
                      <h4 style={{ fontSize: '1.3rem' }}>Presentation Paused</h4>
                      <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>Click play to resume briefing.</p>
                    </div>
                  )}
                </div>

                <div className="mock-video-controls">
                  <div 
                    className="mock-video-timeline-bg"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = ((e.clientX - rect.left) / rect.width) * 100;
                      setVideoProgress(pct);
                    }}
                  >
                    <div className="mock-video-timeline-fill" style={{ width: `${videoProgress}%` }}></div>
                  </div>

                  <div className="mock-video-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <button 
                        style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      >
                        {isPlayingVideo ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <span style={{ fontSize: '0.8rem', color: '#d1d5db' }}>
                        {`0${Math.floor(videoProgress * 0.0412)}:${String(Math.floor((videoProgress * 2.472) % 60)).padStart(2, '0')} / 04:12`}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>
                      Presenter: Dr. Alicia Vance, Chief Clinical Officer
                    </div>
                  </div>
                </div>
              </div>
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
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#5c24e5', fontWeight: 700 }}>B2B EAP Briefing Report</span>
                <h3 style={{ marginTop: '4px' }}>{activeArticle.title}</h3>
              </div>
              <button className="modal-close-btn" aria-label="Close resource report" onClick={() => setActiveArticle(null)}>
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
                To learn more about how Wellbound's outcome-based employee assistance program can modernize your wellness benefits, improve talent retention, and decrease healthcare cost curves, select the callback widget on this page or initiate a B2B Consultation.
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
                  Request Partnership Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
