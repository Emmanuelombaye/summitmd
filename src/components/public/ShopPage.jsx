import React, { useState } from 'react';
import { Check, Info, ShoppingCart, Calendar, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  // Existing Nutrition Stacks
  {
    id: 'travel',
    name: 'AG1 Travel Packs',
    category: 'nutrition',
    desc: 'Individual packets of the foundational AG1 formula. Ideal for traveling, office, or active habits on-the-go.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
    subPrice: 89,
    oneTimePrice: 109,
    tag: 'Popular'
  },
  {
    id: 'sleep',
    name: 'AGZ Sleep Support',
    category: 'nutrition',
    desc: 'Nightly sleep and recovery support. Re-adjust cortisol levels, calm your mind, and support muscle recovery using adaptogens.',
    image: 'https://images.unsplash.com/photo-1611079830514-f72f43c0c13e?w=400',
    subPrice: 38,
    oneTimePrice: 48,
    badge: 'Melatonin Free'
  },
  {
    id: 'd3k2',
    name: 'AG Vitamin D3 + K2',
    category: 'nutrition',
    desc: 'Highly absorbable liquid drops designed for daily bone density, circulatory, and immune support. Ideal supplement to AG1.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    subPrice: 16,
    oneTimePrice: 20
  },
  {
    id: 'omega3',
    name: 'AG Omega3',
    category: 'nutrition',
    desc: 'Pure molecularly distilled fish oil containing optimal EPA & DHA. Supports healthy cholesterol, brain focus, and joints.',
    image: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=400',
    subPrice: 32,
    oneTimePrice: 40
  },
  {
    id: 'daynight',
    name: 'Day & Night Bundle',
    category: 'nutrition',
    desc: 'Complete daily foundations stack. Includes AG1 Next Gen Pouch + AGZ Nightly Sleep Support for 24-hour biological balance.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
    subPrice: 109,
    oneTimePrice: 139,
    tag: 'Best Value'
  },

  // 1. Fastest Revenue Opportunities / Care Subscriptions
  {
    id: 'telePlan',
    name: 'Teleconsultation Subscription',
    category: 'subscriptions',
    desc: 'Unlimited 24/7 access to primary doctors, therapists, and certified nutritionists. Includes e-prescriptions and messaging.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    subPrice: 29,
    oneTimePrice: 45,
    tag: 'Fastest Revenue',
    badge: 'Unlimited Access'
  },
  {
    id: 'medDelivery',
    name: 'Home Medicine Delivery',
    category: 'subscriptions',
    desc: 'Automatic monthly prescription refills delivered to your door. Includes real-time packaging updates and pharmacist advice.',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=400',
    subPrice: 10,
    oneTimePrice: 15,
    tag: 'Home Delivery'
  },
  {
    id: 'labBooking',
    name: 'Lab Test Booking & Panel',
    category: 'subscriptions',
    desc: 'Comprehensive diagnostic blood panel (cholesterol, thyroid, metabolic). Includes professional home collection & online results review.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400',
    subPrice: null,
    oneTimePrice: 89,
    tag: 'Fastest Revenue'
  },
  {
    id: 'corporatePack',
    name: 'Corporate Wellness Package',
    category: 'subscriptions',
    desc: 'Complete health plan for corporate teams (5+ members). Includes customized virtual workshops, EAP syncing, and primary care credits.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    subPrice: 199,
    oneTimePrice: null,
    tag: 'Corporate B2B'
  },

  // 2. Devices & Diagnostics
  {
    id: 'bpMonitor',
    name: 'Blood Pressure Monitor',
    category: 'devices',
    desc: 'FDA-cleared automatic upper-arm cuff. Features Bluetooth sync to the Teladoc app for live blood pressure logs.',
    image: 'https://images.unsplash.com/photo-1628595308585-f37754946764?w=400',
    subPrice: 12,
    oneTimePrice: 59,
    badge: 'FDA Cleared'
  },
  {
    id: 'glucoseMeter',
    name: 'Smart Glucose Meter Kit',
    category: 'devices',
    desc: 'Pocket-sized smart blood glucose reader. Includes 50 test strips, 50 lancets, and automatic reading uploads to your health profile.',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400',
    subPrice: 15,
    oneTimePrice: 39,
    badge: 'Diabetes Care'
  },
  {
    id: 'nebulizer',
    name: 'Portable Mesh Nebulizer',
    category: 'devices',
    desc: 'Ultra-quiet pocket inhaler for targeted asthma & respiratory support. Features battery or USB power with medical-grade mesh.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    subPrice: null,
    oneTimePrice: 35
  },
  {
    id: 'organizer',
    name: 'Smart Pill Organizer',
    category: 'devices',
    desc: '7-day lockable medication organizer. Features LED alarms, voice prompts, and Bluetooth app notifications to prevent missed doses.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400',
    subPrice: null,
    oneTimePrice: 18
  },
  {
    id: 'socks',
    name: 'Graduated Compression Socks',
    category: 'devices',
    desc: 'Three pairs of premium 20-30 mmHg compression socks. Reduces foot swelling, improves circulation, and supports chronic vein health.',
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?w=400',
    subPrice: null,
    oneTimePrice: 22
  },

  // 3. Maternal & Child Health
  {
    id: 'pregnancyKit',
    name: 'Pregnancy Test Kits (5-Pack)',
    category: 'maternal',
    desc: 'Over 99% accurate early detection pregnancy sticks. Displays digital clear text results with a rapid 3-minute response time.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400',
    subPrice: 10,
    oneTimePrice: 14,
    badge: '99% Accurate'
  },
  {
    id: 'ovulationKit',
    name: 'Ovulation Predictor (20-Pack)',
    category: 'maternal',
    desc: 'Digital hormone tracking tests to identify your 5 most fertile days. Includes premium tracking calendar and guide.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400',
    subPrice: null,
    oneTimePrice: 29
  },
  {
    id: 'babyThermometer',
    name: 'Baby Infrared Thermometer',
    category: 'maternal',
    desc: 'Non-contact forehead digital thermometer. Features color-coded fever alerts, silent night mode, and baby-safe soft scan sensors.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    subPrice: null,
    oneTimePrice: 24,
    badge: 'Infrared'
  },
  {
    id: 'infantScale',
    name: 'Infant Precision Scale',
    category: 'maternal',
    desc: 'Digital weighing scale for newborns and toddlers. Features curved spill-safe design, weight lock tare function, and lb/oz display.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=400',
    subPrice: null,
    oneTimePrice: 49
  },
  {
    id: 'prenatalVitamins',
    name: 'Maternal Prenatal Vitamins',
    category: 'maternal',
    desc: 'High-purity prenatal supplements featuring active L-methylfolate, plant-based DHA, and chelated iron. Gentle on empty stomachs.',
    image: 'https://images.unsplash.com/photo-1611079830514-f72f43c0c13e?w=400',
    subPrice: 27,
    oneTimePrice: 34,
    tag: 'Doctor Recommended'
  },

  // 4. Wellness Products
  {
    id: 'multivitamins',
    name: 'Broad-Spectrum Multivitamins',
    category: 'wellness',
    desc: 'Whole-food multivitamin complex. Features targeted immune support, natural energy cofactors, and complete mineral bioavailability.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
    subPrice: 19,
    oneTimePrice: 24
  },
  {
    id: 'vitaminc',
    name: 'Buffered Vitamin C (1000mg)',
    category: 'wellness',
    desc: 'Premium vitamin C with bioflavonoids to support antibody production, iron absorption, and capillary tissue elasticity.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
    subPrice: 12,
    oneTimePrice: 15
  },
  {
    id: 'zinc',
    name: 'Chelated Zinc (50mg)',
    category: 'wellness',
    desc: 'High-bioavailability chelated zinc gluconate. Key micro-mineral supporting cellular repair, skin health, and natural defenses.',
    image: 'https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?w=400',
    subPrice: 9,
    oneTimePrice: 12
  },
  {
    id: 'electrolytes',
    name: 'Hydration Electrolyte Packs',
    category: 'wellness',
    desc: '30 single-serve rapid hydration powder packets. Restores key sodium, potassium, and magnesium salts during recovery.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
    subPrice: 20,
    oneTimePrice: 25,
    tag: 'Daily Drink'
  },
  {
    id: 'firstaid',
    name: 'Premium First-Aid Kit',
    category: 'wellness',
    desc: '150-piece hospital-grade medical kit. Packed with sterile gauze, wraps, emergency shears, sanitizers, and diagnostic guide.',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
    subPrice: null,
    oneTimePrice: 29
  }
];

export default function ShopPage({ setPage }) {
  const [ag1PurchaseType, setAg1PurchaseType] = useState('single'); // 'single' | 'double' | 'onetime'
  const [cartSuccess, setCartSuccess] = useState(null); // name of added product
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'wellness' | 'devices' | 'maternal' | 'subscriptions'

  // Custom states for other products (initialized dynamically)
  const [purchaseTypes, setPurchaseTypes] = useState(() => {
    const initial = {};
    PRODUCTS.forEach(p => {
      if (p.subPrice && p.oneTimePrice) {
        initial[p.id] = 'subscription';
      } else if (p.subPrice) {
        initial[p.id] = 'subscription';
      } else {
        initial[p.id] = 'onetime';
      }
    });
    return initial;
  });

  const handlePurchaseTypeChange = (prodId, type) => {
    setPurchaseTypes(prev => ({ ...prev, [prodId]: type }));
  };

  const handleAddToCart = (productName) => {
    setCartSuccess(productName);
    setTimeout(() => {
      setCartSuccess(null);
    }, 3000);
  };

  // Filtering products based on selected tab
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'wellness') return p.category === 'wellness' || p.category === 'nutrition';
    return p.category === activeTab;
  });

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .ag1-shop-title-section {
          text-align: center;
          margin-bottom: 48px;
          padding: 0 24px;
        }

        .ag1-shop-title {
          font-family: var(--font-display);
          font-size: 2.75rem;
          color: #0f2e2f;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 12px;
        }

        .ag1-shop-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Flagship card */
        .ag1-flagship-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid rgba(15, 46, 47, 0.1);
          box-shadow: 0 4px 20px -2px rgba(15, 46, 47, 0.05);
          overflow: hidden;
          margin-bottom: 60px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
        }

        @media (max-width: 992px) {
          .ag1-flagship-card {
            grid-template-columns: 1fr;
          }
        }

        .ag1-flagship-visual {
          background-color: #e6ecea;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          min-height: 400px;
        }

        .ag1-flagship-img {
          width: 100%;
          max-width: 360px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(15, 46, 47, 0.15));
        }

        .ag1-flagship-details {
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 576px) {
          .ag1-flagship-details {
            padding: 24px;
          }
        }

        .ag1-tag-green {
          background-color: #0f2e2f;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 6px 12px;
          border-radius: 20px;
          align-self: flex-start;
          margin-bottom: 16px;
        }

        .ag1-flagship-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          color: #0f2e2f;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .ag1-flagship-desc {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        /* Option selector */
        .ag1-option-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .ag1-option-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ag1-option-row:hover {
          border-color: #0f2e2f;
          background-color: rgba(15, 46, 47, 0.01);
        }

        .ag1-option-row.active {
          border-color: #0f2e2f;
          background-color: rgba(15, 46, 47, 0.03);
          box-shadow: 0 0 0 1px #0f2e2f;
        }

        .ag1-option-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ag1-radio-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ag1-option-row.active .ag1-radio-dot {
          border-color: #0f2e2f;
        }

        .ag1-option-row.active .ag1-radio-dot::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #0f2e2f;
        }

        .ag1-option-info h4 {
          margin: 0;
          font-size: 0.95rem;
          color: #0f2e2f;
          font-weight: 700;
        }

        .ag1-option-info p {
          margin: 4px 0 0 0;
          font-size: 0.8rem;
          color: #64748b;
        }

        .ag1-option-price {
          text-align: right;
        }

        .ag1-price-current {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f2e2f;
        }

        .ag1-price-strike {
          font-size: 0.85rem;
          color: #94a3b8;
          text-decoration: line-through;
          margin-right: 4px;
        }

        /* Tabs styling */
        .ag1-tabs-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          padding: 0 16px;
        }

        .ag1-tab-btn {
          background-color: #ffffff;
          border: 1.5px solid rgba(15, 46, 47, 0.1);
          color: #0f2e2f;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .ag1-tab-btn:hover {
          border-color: #0f2e2f;
          background-color: rgba(15, 46, 47, 0.02);
        }

        .ag1-tab-btn.active {
          background-color: #0f2e2f;
          color: #ffffff;
          border-color: #0f2e2f;
          box-shadow: 0 4px 12px rgba(15, 46, 47, 0.12);
        }

        /* Products Grid */
        .ag1-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .ag1-product-card {
          background: #ffffff;
          border-radius: 20px;
          border: 1.5px solid rgba(15, 46, 47, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 10px -2px rgba(15, 46, 47, 0.02);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        .ag1-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(15, 46, 47, 0.08);
          border-color: rgba(15, 46, 47, 0.15);
        }

        .ag1-product-visual {
          background-color: #f1f5f4;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
        }

        .ag1-product-img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08));
        }

        .ag1-product-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .ag1-product-title {
          font-size: 1.25rem;
          color: #0f2e2f;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .ag1-product-desc {
          color: #64748b;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        /* Features */
        .ag1-features-strip {
          background-color: #0f2e2f;
          color: #ffffff;
          padding: 60px 0;
          border-radius: 24px;
          margin-bottom: 80px;
        }

        .ag1-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .ag1-features-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .ag1-feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
        }

        .ag1-feature-icon {
          color: #00d2c4;
          background-color: rgba(0, 210, 196, 0.1);
          padding: 12px;
          border-radius: 50%;
        }

        .ag1-feature-item h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .ag1-feature-item p {
          font-size: 0.85rem;
          color: #cbd5e1;
          margin: 0;
          line-height: 1.5;
        }

        .cart-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background-color: #0f2e2f;
          color: #ffffff;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10000;
          border: 1px solid rgba(255,255,255,0.1);
          animation: slide-up 0.3s ease-out;
        }

        @keyframes slide-up {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />

      {/* Success Toast */}
      {cartSuccess && (
        <div className="cart-toast">
          <ShieldCheck size={20} style={{ color: '#00d2c4' }} />
          <div>
            <strong>Added to Cart!</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{cartSuccess} has been added successfully.</p>
          </div>
        </div>
      )}

      {/* Title Section */}
      <div className="ag1-shop-title-section container">
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#00d2c4', fontWeight: 800, backgroundColor: '#0f2e2f', padding: '4px 10px', borderRadius: '4px', display: 'inline-block', marginBottom: '16px' }}>
          OFFICIAL HEALTH & WELLNESS STORE
        </span>
        <h1 className="ag1-shop-title">Set up your foundational health.</h1>
        <p className="ag1-shop-subtitle">Discover nutrition, clinical monitoring devices, maternal diagnostics, and home care subscription bundles tailored to your daily habits.</p>
      </div>

      <div className="container">
        
        {/* Flagship AG1 Pouch Section */}
        <div className="ag1-flagship-card">
          <div className="ag1-flagship-visual">
            <span style={{ position: 'absolute', top: '24px', left: '24px', backgroundColor: '#ffffff', border: '1px solid #0f2e2f', color: '#0f2e2f', fontSize: '0.65rem', fontWeight: 800, padding: '4px 8px', borderRadius: '4px' }}>
              NSF CERTIFIED FOR SPORT
            </span>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" 
              alt="AG1 Daily Foundational Nutrition" 
              className="ag1-flagship-img"
            />
          </div>

          <div className="ag1-flagship-details">
            <div>
              <span className="ag1-tag-green">Best Seller</span>
              <h2 className="ag1-flagship-title">AG1 Foundational Powder</h2>
              <p className="ag1-flagship-desc">
                Your daily health foundation. 75 vitamins, minerals, and whole-food sourced ingredients in one daily scoop. Supports gut health, immunity, energy, and mental focus.
              </p>

              <div className="ag1-option-list">
                
                {/* Double Subscription */}
                <div 
                  className={`ag1-option-row${ag1PurchaseType === 'double' ? ' active' : ''}`}
                  onClick={() => setAg1PurchaseType('double')}
                >
                  <div className="ag1-option-left">
                    <div className="ag1-radio-dot"></div>
                    <div className="ag1-option-info">
                      <h4>Double Subscription</h4>
                      <p>60 Servings (2 Pouches) • Save $30 • Free Welcome Kit</p>
                    </div>
                  </div>
                  <div className="ag1-option-price">
                    <span className="ag1-price-strike">$198</span>
                    <span className="ag1-price-current">$149/mo</span>
                  </div>
                </div>

                {/* Single Subscription */}
                <div 
                  className={`ag1-option-row${ag1PurchaseType === 'single' ? ' active' : ''}`}
                  onClick={() => setAg1PurchaseType('single')}
                >
                  <div className="ag1-option-left">
                    <div className="ag1-radio-dot"></div>
                    <div className="ag1-option-info">
                      <h4>Single Subscription</h4>
                      <p>30 Servings (1 Pouch) • Save $20 • Free Welcome Kit</p>
                    </div>
                  </div>
                  <div className="ag1-option-price">
                    <span className="ag1-price-strike">$99</span>
                    <span className="ag1-price-current">$79/mo</span>
                  </div>
                </div>

                {/* One Time Purchase */}
                <div 
                  className={`ag1-option-row${ag1PurchaseType === 'onetime' ? ' active' : ''}`}
                  onClick={() => setAg1PurchaseType('onetime')}
                >
                  <div className="ag1-option-left">
                    <div className="ag1-radio-dot"></div>
                    <div className="ag1-option-info">
                      <h4>One-Time Purchase</h4>
                      <p>30 Servings (1 Pouch) • Standard pack</p>
                    </div>
                  </div>
                  <div className="ag1-option-price">
                    <span className="ag1-price-current">$99</span>
                  </div>
                </div>

              </div>
            </div>

            <div>
              {/* Welcome Kit highlights */}
              {ag1PurchaseType !== 'onetime' && (
                <div style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '16px', marginBottom: '24px', fontSize: '0.8rem', color: '#475569' }}>
                  <strong>🎁 FREE Welcome Kit Included:</strong> Premium Stainless Steel Canister, Shaker, Metal Scoop, and 5 Free Travel Packs ($45 value).
                </div>
              )}

              <button 
                className="btn" 
                style={{ width: '100%', backgroundColor: '#0f2e2f', color: '#ffffff', padding: '16px', borderRadius: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => handleAddToCart(ag1PurchaseType === 'double' ? 'AG1 Double Subscription' : ag1PurchaseType === 'single' ? 'AG1 Single Subscription' : 'AG1 One-Time Pouch')}
              >
                <ShoppingCart size={18} />
                {ag1PurchaseType !== 'onetime' ? 'Subscribe Now' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Filter buttons */}
        <div className="ag1-tabs-container">
          <button className={`ag1-tab-btn${activeTab === 'all' ? ' active' : ''}`} onClick={() => setActiveTab('all')}>All Products</button>
          <button className={`ag1-tab-btn${activeTab === 'wellness' ? ' active' : ''}`} onClick={() => setActiveTab('wellness')}>Nutrition & Wellness</button>
          <button className={`ag1-tab-btn${activeTab === 'devices' ? ' active' : ''}`} onClick={() => setActiveTab('devices')}>Devices & Diagnostics</button>
          <button className={`ag1-tab-btn${activeTab === 'maternal' ? ' active' : ''}`} onClick={() => setActiveTab('maternal')}>Maternal & Child</button>
          <button className={`ag1-tab-btn${activeTab === 'subscriptions' ? ' active' : ''}`} onClick={() => setActiveTab('subscriptions')}>Care Subscriptions</button>
        </div>

        {/* Products Grid */}
        <div className="ag1-products-grid">
          {filteredProducts.map(p => {
            const hasSub = p.subPrice !== null && p.subPrice !== undefined;
            const hasOneTime = p.oneTimePrice !== null && p.oneTimePrice !== undefined;

            return (
              <div className="ag1-product-card" key={p.id}>
                {/* Visual / Image */}
                <div className="ag1-product-visual">
                  {p.tag && (
                    <span style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      right: '12px', 
                      backgroundColor: '#0f2e2f', 
                      color: '#ffffff', 
                      fontSize: '0.65rem', 
                      fontWeight: '800', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      zIndex: 10
                    }}>
                      {p.tag}
                    </span>
                  )}
                  {p.badge && (
                    <span style={{ 
                      position: 'absolute', 
                      top: '12px', 
                      left: '12px', 
                      backgroundColor: '#00d2c4', 
                      color: '#0f2e2f', 
                      fontSize: '0.65rem', 
                      fontWeight: '800', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      zIndex: 10
                    }}>
                      {p.badge}
                    </span>
                  )}
                  <img src={p.image} alt={p.name} className="ag1-product-img" />
                </div>

                {/* Body Details */}
                <div className="ag1-product-body">
                  <h3 className="ag1-product-title">{p.name}</h3>
                  <p className="ag1-product-desc">{p.desc}</p>
                  
                  {/* Selectors or static pricing details */}
                  {hasSub && hasOneTime && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                      <button 
                        onClick={() => handlePurchaseTypeChange(p.id, 'subscription')}
                        style={{ 
                          flex: 1, 
                          padding: '8px', 
                          borderRadius: '8px', 
                          border: '1.5px solid', 
                          borderColor: purchaseTypes[p.id] === 'subscription' ? '#0f2e2f' : '#cbd5e1', 
                          backgroundColor: purchaseTypes[p.id] === 'subscription' ? 'rgba(15,46,47,0.03)' : '#ffffff', 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          color: '#0f2e2f', 
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Sub: ${p.subPrice}/mo
                      </button>
                      <button 
                        onClick={() => handlePurchaseTypeChange(p.id, 'onetime')}
                        style={{ 
                          flex: 1, 
                          padding: '8px', 
                          borderRadius: '8px', 
                          border: '1.5px solid', 
                          borderColor: purchaseTypes[p.id] === 'onetime' ? '#0f2e2f' : '#cbd5e1', 
                          backgroundColor: purchaseTypes[p.id] === 'onetime' ? 'rgba(15,46,47,0.03)' : '#ffffff', 
                          fontSize: '0.75rem', 
                          fontWeight: '700', 
                          color: '#0f2e2f', 
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        One-time: ${p.oneTimePrice}
                      </button>
                    </div>
                  )}

                  {hasSub && !hasOneTime && (
                    <div style={{ marginBottom: '16px', fontSize: '0.95rem', color: '#0f2e2f', fontWeight: '800' }}>
                      Subscription: ${p.subPrice}/mo
                    </div>
                  )}

                  {!hasSub && hasOneTime && (
                    <div style={{ marginBottom: '16px', fontSize: '0.95rem', color: '#0f2e2f', fontWeight: '800' }}>
                      One-time Price: ${p.oneTimePrice}
                    </div>
                  )}

                  {/* Add to Cart button */}
                  <button 
                    className="btn" 
                    style={{ 
                      width: '100%', 
                      backgroundColor: (hasSub && purchaseTypes[p.id] === 'subscription') ? '#0f2e2f' : 'transparent',
                      color: (hasSub && purchaseTypes[p.id] === 'subscription') ? '#ffffff' : '#0f2e2f',
                      border: '1.5px solid #0f2e2f',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '800',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      const isSub = hasSub && purchaseTypes[p.id] === 'subscription';
                      const choiceText = isSub ? 'Subscription' : 'One-Time';
                      handleAddToCart(`${p.name} (${choiceText})`);
                    }}
                  >
                    <ShoppingCart size={16} /> 
                    {hasSub && purchaseTypes[p.id] === 'subscription' ? 'Subscribe Now' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Benefits section */}
        <div className="ag1-features-strip">
          <div className="ag1-features-grid">
            
            <div className="ag1-feature-item">
              <div className="ag1-feature-icon">
                <Calendar size={24} />
              </div>
              <h3>Flexible Health Delivery</h3>
              <p>Easily edit, pause, delay, or cancel your supplements and prescriptions at any time via your dashboard.</p>
            </div>

            <div className="ag1-feature-item">
              <div className="ag1-feature-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>FDA Quality Standards</h3>
              <p>All clinical diagnostic cuffs, meters, scale devices, and supplement stacks meet rigid safety regulations.</p>
            </div>

            <div className="ag1-feature-item">
              <div className="ag1-feature-icon">
                <Heart size={24} />
              </div>
              <h3>Complete Family Support</h3>
              <p>Direct telehealth credits, priority consultations, and expert guidance for pregnancy, child, and senior health.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
