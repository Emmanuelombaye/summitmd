import React from 'react';
import { ArrowLeft, Check, Apple, Sparkles } from 'lucide-react';

export default function NutritionPage({ setPage }) {
  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ marginBottom: '24px' }}>
        <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => setPage('landing')}>
          <ArrowLeft size={16} /> Back to Homepage
        </button>
      </div>

      <section className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-accent)', fontWeight: 700 }}>Dietary Advising & Meal Planning</span>
          <h1 style={{ fontSize: '3rem', marginTop: '12px', marginBottom: '20px', color: 'var(--color-primary)' }}>Personalized Nutrition Counseling.</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '32px' }}>
            Work 1-on-1 with registered dietitians to improve gut health, manage food allergies, control gestational diabetes, or optimize sports recovery programs.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => setPage('register')}>Schedule Nutrition Consult</button>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=400" alt="Healthy Nutrition" style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }} />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-bg-white)', padding: '60px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Nutrition Support Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Chronic Condition Dieting</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Optimize nutrient loads to manage hypertension, high cholesterol, pre-diabetes, or digestive disorders (IBS/celiac).</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Weight Wellness Plans</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Build healthy habits with behavioral meal planners, macro targets, and positive caloric counseling.</p>
            </div>
            <div style={{ padding: '24px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
              <h4>Family Meal Counseling</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Ensure healthy nutrition for picky eaters, childhood wellness, or postpartum recovery meal configurations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
