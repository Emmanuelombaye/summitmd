import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, Clock, Check, X } from 'lucide-react';
import { peakHealthClient } from '../api/peakHealthClient';

export default function ProviderSearch({ user, reloadDashboardData }) {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  
  // Booking Modal State
  const [bookingProvider, setBookingProvider] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-06-10');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [bookingReason, setBookingReason] = useState('Annual health evaluation');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const list = peakHealthClient.getProviders();
    setProviders(list);
  }, []);

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.name[0].text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.qualification[0].code.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedSpecialty === 'All') return matchesSearch;
    return matchesSearch && p.qualification[0].code.text.includes(selectedSpecialty);
  });

  const handleBookAppointment = (e) => {
    e.preventDefault();
    if (!bookingProvider) return;

    const dateTimeStr = `${bookingDate}T${bookingTime}:00`;
    peakHealthClient.createAppointment(
      bookingProvider.id, 
      bookingProvider.qualification[0].code.text, 
      dateTimeStr, 
      bookingReason
    );
    
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingProvider(null);
      if (reloadDashboardData) reloadDashboardData();
    }, 1800);
  };

  return (
    <div className="provider-search-layout animate-fade-in" style={{ padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Find a Practitioner</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Search our network of board-certified practitioners synced with PeakHealth provider registry.</p>
      </div>

      {/* Filters Strip */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search provider name, specialty..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={selectedSpecialty} 
          onChange={e => setSelectedSpecialty(e.target.value)}
          style={{ padding: '12px', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.9rem', width: '200px' }}
        >
          <option value="All">All Specialties</option>
          <option value="Family Medicine">Family Medicine & Urgent Care</option>
          <option value="Psychiatry">Psychology & Psychiatry</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Nutrition">Nutrition</option>
        </select>
      </div>

      {/* Provider List */}
      <div className="provider-list">
        {filteredProviders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
            No matching practitioners found.
          </div>
        ) : (
          filteredProviders.map(p => (
            <div key={p.id} className="provider-row">
              <img src={p.photo[0].url} alt={p.name[0].text} className="provider-avatar" />
              <div className="provider-details">
                <h3>{p.name[0].text}</h3>
                <div className="provider-specialty">{p.qualification[0].code.text}</div>
                <div className="provider-stats">
                  <span className="provider-rating"><Star size={14} fill="currentColor" /> {p.rating}</span>
                  <span>({p.reviews} patient reviews)</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontWeight: 600 }}>
                    <Clock size={12} /> Next Available: {p.availability}
                  </span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setBookingProvider(p)}>
                Schedule Visit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Booking Form Modal Overlay */}
      {bookingProvider && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(15, 42, 74, 0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifycontent: 'center'
        }} className="flex-center">
          <div className="glass-card animate-fade-in" style={{
            width: '100%', maxWidth: '480px', backgroundColor: 'var(--color-bg-white)',
            boxShadow: 'var(--shadow-lg)', position: 'relative'
          }}>
            <button 
              style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}
              onClick={() => setBookingProvider(null)}
            >
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent)', margin: '0 auto 20px auto' }} className="flex-center">
                  <Check size={28} />
                </div>
                <h3>Appointment Booked!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>Your visit with {bookingProvider.name[0].text} is registered and synced with PeakHealth.</p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment}>
                <h3 style={{ marginBottom: '4px' }}>Schedule Virtual Visit</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>Booking a video consult with <strong>{bookingProvider.name[0].text}</strong></p>

                <div className="form-group">
                  <label>Select Date</label>
                  <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Select Time Slot</label>
                  <select value={bookingTime} onChange={e => setBookingTime(e.target.value)}>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:15">11:15 AM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Reason for Visit</label>
                  <input 
                    type="text" 
                    value={bookingReason} 
                    onChange={e => setBookingReason(e.target.value)} 
                    placeholder="Describe symptoms or purpose..."
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px', borderRadius: '8px' }}>
                  Confirm & Sync Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
