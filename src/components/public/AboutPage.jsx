import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Laptop, 
  MessageSquare, 
  LineChart, 
  Heart, 
  Link, 
  Lightbulb, 
  Target, 
  Play, 
  X, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Calendar 
} from 'lucide-react';

export default function AboutPage({ setPage }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(4); // Default to latest milestone
  const videoRef = useRef(null);

  const pillars = [
    {
      title: "Connections for better health",
      desc: "We bring together patients, providers, platforms, and partners to deliver seamless, whole-person care across needs, settings and time zones.",
      icon: <Laptop size={28} />
    },
    {
      title: "Fueling clinical excellence, together",
      desc: "We support clinicians with tools and insights that help them deliver high-quality care—from physical to mental, simple to complex.",
      icon: <MessageSquare size={28} />
    },
    {
      title: "Smarter care, better outcomes",
      desc: "We use data and technology to personalize care, spot trends early and guide targeted action so that every interaction has greater impact.",
      icon: <LineChart size={28} />
    },
    {
      title: "Partnership at scale",
      desc: "We work with organizations worldwide to improve outcomes, reduce costs and drive impact at scale across populations.",
      icon: <Users size={28} />
    },
    {
      title: "Great outcomes for greater value",
      desc: "We deliver measurable outcomes that benefit patients and organizations—proving the value of virtual care as a catalyst to better health.",
      icon: <Heart size={28} />
    }
  ];

  const communityPillars = [
    {
      title: "Building strong connections",
      desc: "We take the time to give back to our communities—and to connect with each other in person and virtually around the globe.",
      icon: <Link size={24} />
    },
    {
      title: "Sparking innovation",
      desc: "From tackling healthcare’s biggest challenges to making improvements to our everyday work, we challenge ourselves to find a better way forward.",
      icon: <Lightbulb size={24} />
    },
    {
      title: "Going all in, together",
      desc: "We give ourselves big, bold goals—like delivering more care to more people in more places—and align ourselves to a common purpose.",
      icon: <Target size={24} />
    }
  ];

  const carouselSlides = [
    {
      image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=600",
      caption: "Team Teladoc Health’s ride to cure diabetes",
      location: "San Francisco, CA"
    },
    {
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600",
      caption: "Chicago colleagues gathering at the Cubs game",
      location: "Chicago, IL"
    },
    {
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600",
      caption: "The Legal/Compliance/Privacy team cleaning beaches",
      location: "Lisbon, Portugal"
    },
    {
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=600",
      caption: "Bay Area neighborhood group volunteering at food pantries",
      location: "Fremont, CA"
    }
  ];

  const milestones = [
    {
      year: "2002",
      title: "Company Founded",
      desc: "Established with the pioneering vision of making high-quality healthcare accessible to everyone through virtual telephone consultations."
    },
    {
      year: "2015",
      title: "IPO & Market Growth",
      desc: "Listed on the NYSE, raising capital to broaden virtual medicine integrations across commercial and Medicare networks."
    },
    {
      year: "2020",
      title: "Whole-Person Care Model",
      desc: "Launched a unified digital health ecosystem combining primary care, chronic condition management, mental health, and wellness."
    },
    {
      year: "2023",
      title: "PeakHealth API Launch",
      desc: "Created direct FHIR interoperability hooks to sync cellular medical devices with our clinical portals for real-time monitoring."
    },
    {
      year: "2026",
      title: "Global Clinical Scale",
      desc: "Reached 12,000+ organizational clients worldwide, delivering over 15 million completed virtual patient visits."
    }
  ];

  const nextSlide = () => {
    setActiveCarouselIndex((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveCarouselIndex((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .about-video-hero {
          position: relative;
          height: 60vh;
          min-height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          color: #ffffff;
          background: #0b132b;
        }

        .about-video-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          opacity: 0.45;
        }

        .about-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to bottom, rgba(15, 42, 74, 0.4) 0%, rgba(15, 42, 74, 0.8) 100%);
          z-index: 2;
        }

        .about-hero-content {
          position: relative;
          z-index: 3;
          max-width: 850px;
          padding: 0 24px;
        }

        .about-pulse-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--color-accent);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin: 0 auto 30px auto;
          box-shadow: 0 0 0 0 rgba(0, 210, 196, 0.4);
          animation: about-pulse 2s infinite;
          border: none;
          outline: none;
        }

        @keyframes about-pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 210, 196, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(0, 210, 196, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 210, 196, 0); }
        }

        .about-intro-box {
          background: #ffffff;
          border-bottom: 1px solid var(--color-border);
          padding: 80px 0;
        }

        .about-intro-text {
          font-size: 1.65rem;
          color: var(--color-primary);
          font-family: var(--font-display);
          line-height: 1.5;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-pillar-card {
          background: var(--color-bg-light);
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 32px;
          transition: var(--transition-smooth);
        }

        .about-pillar-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-md);
          background: #ffffff;
        }

        .about-pillar-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(92, 36, 229, 0.1);
          color: #5c24e5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .about-community-section {
          background: #ece9fe;
          padding: 80px 0;
        }

        .about-community-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(92, 36, 229, 0.15);
          height: 100%;
        }

        .about-community-icon {
          color: #5c24e5;
          margin-bottom: 20px;
        }

        /* Carousel Styles */
        .about-carousel-frame {
          position: relative;
          width: 100%;
          max-width: 750px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          margin: 40px auto 0 auto;
        }

        .about-carousel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .about-carousel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(15, 42, 74, 0.95));
          padding: 40px 32px 32px 32px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .about-carousel-control {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          backdrop-filter: blur(4px);
        }

        .about-carousel-control:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.05);
        }

        /* Timeline Section */
        .about-timeline-section {
          background: #0F2A4A;
          color: #ffffff;
          padding: 90px 0;
          overflow-hidden: relative;
        }

        .about-timeline-track {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 60px;
          padding: 0 40px;
        }

        .about-timeline-track::before {
          content: '';
          position: absolute;
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          top: 18px;
          left: 60px;
          right: 60px;
          z-index: 1;
        }

        .about-timeline-node {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .about-timeline-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #0C1929;
          border: 4px solid rgba(255, 255, 255, 0.3);
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .about-timeline-node.active .about-timeline-dot {
          border-color: var(--color-accent);
          background: var(--color-accent);
          color: var(--color-primary);
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(0, 210, 196, 0.5);
        }

        .about-timeline-label {
          margin-top: 12px;
          font-weight: 800;
          font-family: var(--font-display);
          font-size: 1.1rem;
          opacity: 0.5;
          transition: var(--transition-fast);
        }

        .about-timeline-node.active .about-timeline-label {
          opacity: 1;
          color: var(--color-accent);
        }

        .about-timeline-details {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-left: 6px solid var(--color-accent);
          border-radius: 16px;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          animation: about-fade-slide 0.4s ease-out;
        }

        @keyframes about-fade-slide {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Leadership section */
        .about-lead-img-box {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          max-width: 440px;
          width: 100%;
          border: 6px solid var(--color-bg-white);
        }

        .about-lead-img-box img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Video Modal overlay */
        .about-video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 17, 40, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 12000;
          padding: 24px;
        }

        .about-video-box {
          position: relative;
          width: 100%;
          max-width: 800px;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .about-video-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          opacity: 0.8;
          transition: var(--transition-fast);
        }

        .about-video-close:hover {
          opacity: 1;
        }
      `}} />


      {/* Video Background Hero */}
      <section className="about-video-hero">
        <div className="about-hero-overlay"></div>
        <video 
          className="about-video-bg" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://s3.amazonaws.com/images.teladoc.com/aem_assets/about/about-hero-video.mp4" type="video/mp4"/>
        </video>
        
        <div className="about-hero-content">
          <button className="about-pulse-btn" onClick={() => setIsVideoModalOpen(true)}>
            <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
          </button>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 800 }}>
            OUR MISSION
          </span>
          <h1 style={{ 
            fontSize: '3.25rem', 
            color: '#ffffff', 
            marginTop: '16px', 
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: 'var(--font-display)' 
          }}>
            Empowering all people everywhere to live their healthiest lives
          </h1>
        </div>
      </section>

      {/* Intro Box */}
      <section className="about-intro-box">
        <div className="container">
          <div className="about-intro-text">
            “We’re orchestrating care across every touchpoint — using virtual care as a catalyst for how better health happens.”
          </div>
        </div>
      </section>

      {/* Transforming Health Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: 800 }}>
              We’re transforming how better health happens
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {pillars.map((pil, index) => (
              <div key={index} className="about-pillar-card">
                <div className="about-pillar-icon">
                  {pil.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: 800 }}>
                  {pil.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Difference Makers Section */}
      <section className="about-community-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
            <h2 style={{ fontSize: '2.25rem', color: 'var(--color-primary)', fontWeight: 800, marginBottom: '16px' }}>
              Making a difference around the world... and in our own backyards
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
              We take pride in connecting with communities and creating positive impacts where we live and work.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {communityPillars.map((cp, index) => (
              <div key={index} className="about-community-card">
                <div className="about-community-icon">
                  {cp.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: 800 }}>
                  {cp.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {cp.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sliding Changemakers Photo Carousel */}
          <div className="about-carousel-frame">
            <img 
              src={carouselSlides[activeCarouselIndex].image} 
              alt={carouselSlides[activeCarouselIndex].caption} 
              className="about-carousel-img"
            />
            <div className="about-carousel-overlay">
              <div style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)', maxWidth: '80%' }}>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-accent)', fontWeight: 800, marginBottom: '6px' }}>
                  Community Project — {carouselSlides[activeCarouselIndex].location}
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  {carouselSlides[activeCarouselIndex].caption}
                </h4>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="about-carousel-control" onClick={prevSlide}>
                  <ChevronLeft size={20} />
                </button>
                <button className="about-carousel-control" onClick={nextSlide}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Timeline Section */}
      <section className="about-timeline-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontWeight: 800, marginBottom: '16px' }}>
              A long history of helping people find their healthier ever after
            </h2>
            <button 
              className="btn btn-outline" 
              style={{ color: 'var(--color-accent)', borderColor: 'var(--color-accent)', padding: '8px 20px', fontSize: '0.85rem' }}
              onClick={() => alert("Redirecting to Our Impact portfolio details...")}
            >
              See how we're working toward our vision
            </button>
          </div>

          {/* Interactive Horizontal Track */}
          <div className="about-timeline-track">
            {milestones.map((node, index) => (
              <div 
                key={index} 
                className={`about-timeline-node ${activeTimelineIndex === index ? 'active' : ''}`}
                onClick={() => setActiveTimelineIndex(index)}
              >
                <div className="about-timeline-dot">
                  {node.year.slice(2)}
                </div>
                <div className="about-timeline-label">
                  {node.year}
                </div>
              </div>
            ))}
          </div>

          {/* Detail card */}
          <div className="about-timeline-details">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ 
                background: 'rgba(0, 210, 196, 0.1)', 
                color: 'var(--color-accent)', 
                padding: '8px 16px', 
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1.25rem',
                fontFamily: 'var(--font-display)'
              }}>
                {milestones[activeTimelineIndex].year}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#ffffff', fontWeight: 800 }}>
                {milestones[activeTimelineIndex].title}
              </h3>
            </div>
            <p style={{ color: '#E2E8F0', opacity: 0.85, fontSize: '1.05rem', lineHeight: 1.6 }}>
              {milestones[activeTimelineIndex].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section style={{ padding: '90px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#5c24e5', fontWeight: 700 }}>
              OUR TEAM
            </span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', fontWeight: 800, marginTop: '12px', marginBottom: '20px' }}>
              Our leadership
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '24px' }}>
              We’re doctors, data scientists, designers, influencers and more. Committed to driving quality clinical workflows.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
              Meet our Executive leadership team, our Clinical leadership panel, and our Board of directors directing global care standards.
            </p>
            <div>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: '#5c24e5', color: '#ffffff' }}
                onClick={() => alert("Leadership directory panel loading...")}
              >
                Meet our leaders
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="about-lead-img-box">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=500" 
                alt="Executive board meeting" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Set Up Account/Careers CTA Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#1A0B2E', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#ffffff', fontWeight: 800 }}>
            This is our story. What will yours be?
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button 
              className="btn btn-primary" 
              style={{ 
                backgroundColor: 'var(--color-accent)', 
                color: 'var(--color-primary)', 
                padding: '14px 32px', 
                fontSize: '0.95rem', 
                borderRadius: '30px', 
                fontWeight: 700 
              }}
              onClick={() => setPage('register')}
            >
              Set up my account
            </button>
            <button 
              className="btn btn-outline" 
              style={{ 
                color: '#ffffff', 
                borderColor: '#ffffff', 
                padding: '14px 32px', 
                fontSize: '0.95rem', 
                borderRadius: '30px', 
                fontWeight: 700 
              }}
              onClick={() => setPage('careers')}
            >
              Career Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div className="about-video-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="about-video-box" onClick={(e) => e.stopPropagation()}>
            <button className="about-video-close" onClick={() => setIsVideoModalOpen(false)}>
              <X size={18} /> Close Video
            </button>
            <iframe 
              src="https://player.vimeo.com/video/891943549?autoplay=1&badge=0&autopause=0" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title="Teladoc Health Story Presentation"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F2A4A', color: 'rgba(255,255,255,0.7)', padding: '30px 0', textAlign: 'center', fontSize: '0.85rem', marginTop: 'auto' }}>
        <div className="container">
          <p>&copy; 2026 Teladoc Health Health Systems, Inc. All rights reserved. Our services are fully audited and HIPAA-compliant.</p>
        </div>
      </footer>

    </div>
  );
}
