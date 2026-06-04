import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, Volume2, ShieldCheck, HeartPulse, Send, PhoneOff, Video, VideoOff, MicOff } from 'lucide-react';

export default function VirtualVisit({ user, setPage }) {
  const [inCall, setInCall] = useState(false);
  const [micCheck, setMicCheck] = useState(true);
  const [camCheck, setCamCheck] = useState(true);
  const [audioCheck, setAudioCheck] = useState(true);
  
  // Call States
  const [micMuted, setMicMuted] = useState(false);
  const [camMuted, setCamMuted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: 'Connecting with Dr. Jenkins, MD...' }
  ]);
  
  const chatEndRef = useRef(null);

  // Trigger automated doctor greeting when call connects
  useEffect(() => {
    if (inCall) {
      const t1 = setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'doctor',
          text: `Hello ${user.name[0].text.split(' ')[0]}. I'm Dr. Sarah Jenkins. I noticed you requested an urgent care checkup. How are you feeling today?`
        }]);
      }, 2500);

      return () => clearTimeout(t1);
    }
  }, [inCall]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'patient',
      text: chatInput
    };
    
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');

    // Simulated doctor response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'doctor',
        text: "Understood. Let me check your synced PeakHealth vital observation history from the past few days to examine your baseline readings. Please stay on the line."
      }]);
    }, 2000);
  };

  return (
    <div className="virtual-visit-layout animate-fade-in" style={{ padding: '0 20px', minHeight: 'calc(100vh - 80px)' }}>
      {!inCall ? (
        // Waiting Room / Pre-flight Tech Check
        <div className="waiting-room-container" style={{ paddingTop: '40px' }}>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '24px' }}>
            <HeartPulse size={48} style={{ color: 'var(--color-accent)', margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>SummitMD Virtual Waiting Room</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '32px' }}>Your medical consultant is ready to begin. Please complete your hardware configuration verification.</p>

            <div className="device-check-grid">
              <div className="device-check-box" style={{ borderColor: camCheck ? 'var(--color-success)' : 'var(--color-border)' }}>
                <Camera size={24} style={{ color: camCheck ? 'var(--color-success)' : 'var(--color-text-muted)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Camera Check</span>
                <button 
                  className="btn" 
                  style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: camCheck ? 'var(--color-accent-soft)' : 'var(--color-border)', border: 'none', color: 'var(--color-primary)' }}
                  onClick={() => setCamCheck(!camCheck)}
                >
                  {camCheck ? 'System OK' : 'Enable'}
                </button>
              </div>

              <div className="device-check-box" style={{ borderColor: micCheck ? 'var(--color-success)' : 'var(--color-border)' }}>
                <Mic size={24} style={{ color: micCheck ? 'var(--color-success)' : 'var(--color-text-muted)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Microphone Check</span>
                <button 
                  className="btn" 
                  style={{ padding: '4px 10px', fontSize: '0.75rem', backgroundColor: micCheck ? 'var(--color-accent-soft)' : 'var(--color-border)', border: 'none', color: 'var(--color-primary)' }}
                  onClick={() => setMicCheck(!micCheck)}
                >
                  {micCheck ? 'System OK' : 'Enable'}
                </button>
              </div>
            </div>

            <div style={{ padding: '16px', border: '1px solid var(--color-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--color-bg-light)', marginBottom: '32px', fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'left' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
              <div>
                <strong>PeakHealth Copay Synced:</strong> Blue Shield insurance verified. Copay is estimated at $15. No immediate checkout required.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setPage('dashboard')}>
                Return to Dashboard
              </button>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={!micCheck || !camCheck}
                onClick={() => setInCall(true)}
              >
                Join Video Call
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Active Telehealth Video Consultation Screen
        <div className="video-call-console animate-fade-in" style={{ paddingTop: '20px' }}>
          {/* Main Video feed */}
          <div className="video-player-container">
            {/* Mock Doctor Camera Feed */}
            {camMuted ? (
              <div style={{ color: '#fff', fontSize: '1.25rem' }}>My Camera Off</div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                alt="Doctor Camera Stream" 
                className="doctor-video-feed" 
              />
            )}
            
            {/* Mock Patient Picture-in-Picture */}
            {!camMuted && (
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
                alt="Patient Camera Stream" 
                className="patient-video-feed"
              />
            )}

            {/* Video Controls Bar */}
            <div className="video-controls">
              <button 
                className="control-btn"
                style={{ backgroundColor: micMuted ? 'var(--color-danger)' : 'rgba(255,255,255,0.1)' }}
                onClick={() => setMicMuted(!micMuted)}
              >
                {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button 
                className="control-btn"
                style={{ backgroundColor: camMuted ? 'var(--color-danger)' : 'rgba(255,255,255,0.1)' }}
                onClick={() => setCamMuted(!camMuted)}
              >
                {camMuted ? <VideoOff size={18} /> : <Video size={18} />}
              </button>
              <button className="control-btn btn-hangup" onClick={() => setPage('dashboard')}>
                <PhoneOff size={18} />
              </button>
            </div>

            <div style={{ position: 'absolute', top: '16px', left: '16px', color: '#fff', backgroundColor: 'rgba(15, 25, 41, 0.6)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }} className="flex-center">
              Dr. Sarah Jenkins, MD &bull; Live Consultation
            </div>
          </div>

          {/* Consultation Chat Feed */}
          <div className="visit-sidebar-chat">
            <div className="chat-header">Consultation Chat</div>
            <div className="chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input">
              <input 
                type="text" 
                placeholder="Send message to provider..." 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
              />
              <button type="submit" style={{ border: 'none', background: 'transparent', color: 'var(--color-accent)', cursor: 'pointer', padding: '0 8px' }}>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
