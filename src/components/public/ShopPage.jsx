import React, { useState, useEffect, useMemo } from 'react';
import { Check, Info, ShoppingCart, Calendar, Heart, ShieldCheck, ArrowRight, ArrowLeft, Loader2, Star, Plus, LogIn, ExternalLink } from 'lucide-react';
import { startPartnerEnrollment, getPatientPortalLoginUrl } from '../../api/partnerEnrollmentClient';
import {
  INTAKE_TOTAL_STEPS,
  INTAKE_STEP_LABELS,
  STEP_CONTACT,
  STEP_LOADING,
  STEP_PLAN,
  STEP_PORTAL,
  buildClinicalSteps,
  validateClinicalStep,
  validateContactStep,
  resolveVitalsStepQuestion,
  intakeProgressPercent,
} from '../../lib/shopIntakeSteps';

const PRODUCTS = [
  // Flagship Clinical Programs
  {
    id: 'weightloss_semaglutide',
    name: 'Compounded Semaglutide Program',
    category: 'subscriptions',
    desc: 'Medical weight loss program including asynchronous doctor evaluations, prescriptions, and monthly home delivery of compounded Semaglutide.',
    image: '/semaglutide_pen.png',
    subPrice: 146,
    oneTimePrice: null,
    tag: 'Clinical Weight Loss',
    badge: 'Doctor Approved'
  },
  {
    id: 'weightloss_tirzepatide',
    name: 'Compounded Tirzepatide Program',
    category: 'subscriptions',
    desc: 'Advanced dual-agonist medical weight loss program. Includes ongoing telehealth medical supervision, customized dosage titration, and compounded Tirzepatide delivery.',
    image: '/tirzepatide_pen.png',
    subPrice: 192,
    oneTimePrice: null,
    tag: 'Clinical Weight Loss',
    badge: 'Doctor Approved'
  },
  // Existing Nutrition Stacks
  {
    id: 'travel',
    name: 'SummitMd Foundational Powder',
    category: 'nutrition',
    desc: 'Daily nutrient insurance stack. 75 highly bioavailable vitamins, organic minerals, and whole-food adaptogens in one single scoop. Optimizes cell longevity, focus, and digestion.',
    image: '/travel.svg',
    subPrice: 89,
    oneTimePrice: 109,
    tag: 'Popular'
  },
  {
    id: 'sleep',
    name: 'AGZ Sleep Support',
    category: 'nutrition',
    desc: 'Nightly sleep and recovery support. Re-adjust cortisol levels, calm your mind, and support muscle recovery using adaptogens.',
    image: '/sleep_support.png',
    subPrice: 38,
    oneTimePrice: 48,
    badge: 'Melatonin Free'
  },
  {
    id: 'd3k2',
    name: 'AG Vitamin D3 + K2',
    category: 'nutrition',
    desc: 'Highly absorbable liquid drops designed for daily bone density, circulatory, and immune support. Ideal supplement to SummitMd.',
    image: '/d3k2.svg',
    subPrice: 16,
    oneTimePrice: 20
  },
  {
    id: 'omega3',
    name: 'AG Omega3',
    category: 'nutrition',
    desc: 'Pure molecularly distilled fish oil containing optimal EPA & DHA. Supports healthy cholesterol, brain focus, and joints.',
    image: '/omega3.svg',
    subPrice: 32,
    oneTimePrice: 40
  },
  {
    id: 'daynight',
    name: 'Day & Night Bundle',
    category: 'nutrition',
    desc: 'Complete daily foundations stack. Includes SummitMd Next Gen Pouch + AGZ Nightly Sleep Support for 24-hour biological balance.',
    image: '/daynight.svg',
    subPrice: 109,
    oneTimePrice: 139,
    tag: 'Best Value'
  },

  // Care Subscriptions
  {
    id: 'telePlan',
    name: 'Teleconsultation Subscription',
    category: 'subscriptions',
    desc: 'Unlimited 24/7 access to primary doctors, therapists, and certified nutritionists. Includes e-prescriptions and messaging.',
    image: '/telePlan.svg',
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
    image: '/medDelivery.svg',
    subPrice: 10,
    oneTimePrice: 15,
    tag: 'Home Delivery'
  },
  {
    id: 'labBooking',
    name: 'Lab Test Booking & Panel',
    category: 'subscriptions',
    desc: 'Comprehensive diagnostic blood panel (cholesterol, thyroid, metabolic). Includes professional home collection & online results review.',
    image: '/labBooking.svg',
    subPrice: null,
    oneTimePrice: 89,
    tag: 'Fastest Revenue'
  },
  {
    id: 'corporatePack',
    name: 'Corporate Wellness Package',
    category: 'subscriptions',
    desc: 'Complete health plan for corporate teams (5+ members). Includes customized virtual workshops, EAP syncing, and primary care credits.',
    image: '/corporatePack.svg',
    subPrice: 199,
    oneTimePrice: null,
    tag: 'Corporate B2B'
  },

  // Devices & Diagnostics
  {
    id: 'bpMonitor',
    name: 'Blood Pressure Monitor',
    category: 'devices',
    desc: 'FDA-cleared automatic upper-arm cuff. Features Bluetooth sync to the Teladoc app for live blood pressure logs.',
    image: '/bp_monitor.png',
    subPrice: 12,
    oneTimePrice: 59,
    badge: 'FDA Cleared'
  },
  {
    id: 'glucoseMeter',
    name: 'Smart Glucose Meter Kit',
    category: 'devices',
    desc: 'Pocket-sized smart blood glucose reader. Includes 50 test strips, 50 lancets, and automatic reading uploads to your health profile.',
    image: '/glucoseMeter.svg',
    subPrice: 15,
    oneTimePrice: 39,
    badge: 'Diabetes Care'
  },
  {
    id: 'nebulizer',
    name: 'Portable Mesh Nebulizer',
    category: 'devices',
    desc: 'Ultra-quiet pocket inhaler for targeted asthma & respiratory support. Features battery or USB power with medical-grade mesh.',
    image: '/nebulizer.png',
    subPrice: null,
    oneTimePrice: 35
  },
  {
    id: 'organizer',
    name: 'Smart Pill Organizer',
    category: 'devices',
    desc: '7-day lockable medication organizer. Features LED alarms, voice prompts, and Bluetooth app notifications to prevent missed doses.',
    image: '/organizer.svg',
    subPrice: null,
    oneTimePrice: 18
  },
  {
    id: 'socks',
    name: 'Graduated Compression Socks',
    category: 'devices',
    desc: 'Three pairs of premium 20-30 mmHg compression socks. Reduces foot swelling, improves circulation, and supports chronic vein health.',
    image: '/socks.svg',
    subPrice: null,
    oneTimePrice: 22
  },

  // Maternal & Child Health
  {
    id: 'pregnancyKit',
    name: 'Pregnancy Test Kits (5-Pack)',
    category: 'maternal',
    desc: 'Over 99% accurate early detection pregnancy sticks. Displays digital clear text results with a rapid 3-minute response time.',
    image: '/pregnancyKit.svg',
    subPrice: 10,
    oneTimePrice: 14,
    badge: '99% Accurate'
  },
  {
    id: 'ovulationKit',
    name: 'Ovulation Predictor (20-Pack)',
    category: 'maternal',
    desc: 'Digital hormone tracking tests to identify your 5 most fertile days. Includes premium tracking calendar and guide.',
    image: '/ovulationKit.svg',
    subPrice: null,
    oneTimePrice: 29
  },
  {
    id: 'babyThermometer',
    name: 'Baby Infrared Thermometer',
    category: 'maternal',
    desc: 'Non-contact forehead digital thermometer. Features color-coded fever alerts, silent night mode, and baby-safe soft scan sensors.',
    image: '/baby_thermometer.png',
    subPrice: null,
    oneTimePrice: 24,
    badge: 'Infrared'
  },
  {
    id: 'infantScale',
    name: 'Infant Precision Scale',
    category: 'maternal',
    desc: 'Digital weighing scale for newborns and toddlers. Features curved spill-safe design, weight lock tare function, and lb/oz display.',
    image: '/infant_scale.png',
    subPrice: null,
    oneTimePrice: 49
  },
  {
    id: 'prenatalVitamins',
    name: 'Maternal Prenatal Vitamins',
    category: 'maternal',
    desc: 'High-purity prenatal supplements featuring active L-methylfolate, plant-based DHA, and chelated iron. Gentle on empty stomachs.',
    image: '/prenatalVitamins.svg',
    subPrice: 27,
    oneTimePrice: 34,
    tag: 'Doctor Recommended'
  },

  // Wellness Products
  {
    id: 'multivitamins',
    name: 'Broad-Spectrum Multivitamins',
    category: 'wellness',
    desc: 'Whole-food multivitamin complex. Features targeted immune support, natural energy cofactors, and complete mineral bioavailability.',
    image: '/multivitamins.svg',
    subPrice: 19,
    oneTimePrice: 24
  },
  {
    id: 'vitaminc',
    name: 'Buffered Vitamin C (1000mg)',
    category: 'wellness',
    desc: 'Premium vitamin C with bioflavonoids to support antibody production, iron absorption, and capillary tissue elasticity.',
    image: '/vitamin_c.png',
    subPrice: 12,
    oneTimePrice: 15
  },
  {
    id: 'zinc',
    name: 'Chelated Zinc (50mg)',
    category: 'wellness',
    desc: 'High-bioavailability chelated zinc gluconate. Key micro-mineral supporting cellular repair, skin health, and natural defenses.',
    image: '/zinc.png',
    subPrice: 9,
    oneTimePrice: 12
  },
  {
    id: 'electrolytes',
    name: 'Hydration Electrolyte Packs',
    category: 'wellness',
    desc: '30 single-serve rapid hydration powder packets. Restores key sodium, potassium, and magnesium salts during recovery.',
    image: '/electrolytes.svg',
    subPrice: 20,
    oneTimePrice: 25,
    tag: 'Daily Drink'
  },
  {
    id: 'firstaid',
    name: 'Premium First-Aid Kit',
    category: 'wellness',
    desc: '150-piece hospital-grade medical kit. Packed with sterile gauze, wraps, emergency shears, sanitizers, and diagnostic guide.',
    image: '/firstaid.svg',
    subPrice: null,
    oneTimePrice: 29
  }
];

// Helper function to return product specific questions dynamically
function getQuestionsForProduct(product) {
  if (!product) return [];
  
  const id = product.id;

  // Weight Loss
  if (id.includes('weightloss')) {
    return [
      {
        id: 'goals',
        type: 'multiselect',
        question: 'What are your primary weight loss goals?',
        sub: `Customize your intake parameters for ${product.name}.`,
        options: [
          { label: 'Lose 10-25 lbs', value: 'lose_moderate' },
          { label: 'Lose 25-50 lbs', value: 'lose_significant' },
          { label: 'Improve metabolic wellness & core energy', value: 'improve_metabolic' },
          { label: 'Manage stress/emotional eating habits', value: 'manage_eating' }
        ]
      },
      {
        id: 'vitals',
        type: 'vitals',
        question: 'Provide your basic physical parameters',
        sub: 'Height and weight parameters are required to calculate BMI for clinical evaluation.'
      },
      {
        id: 'contraindications',
        type: 'singleselect',
        question: 'Thyroid Cancer Risk Screening',
        sub: 'Do you or an immediate family member have a history of Medullary Thyroid Carcinoma (MTC) or MEN 2?',
        options: [
          { label: 'Yes, I or a family member have MTC/MEN2 history', value: 'yes', warning: 'Contraindicated: Due to safety guidelines, GLP-1 medications are not approved for individuals with an MTC or MEN2 history. We will suggest alternate treatments.' },
          { label: 'No history', value: 'no' }
        ]
      },
      {
        id: 'pregnancy',
        type: 'singleselect',
        question: 'Pregnancy & Breastfeeding Check',
        sub: 'Are you currently pregnant, lactating, or planning pregnancy within the next 12 months?',
        options: [
          { label: 'Yes', value: 'yes', warning: 'Contraindicated: GLP-1 programs are not safe during pregnancy or breastfeeding.' },
          { label: 'No', value: 'no' }
        ]
      },
      {
        id: 'history',
        type: 'multiselect',
        question: 'Do you have a clinical history of any of the following?',
        sub: 'Select all that apply to ensure safe prescribing.',
        options: [
          { label: 'Pancreatitis or active gallbladder stones', value: 'pancreatitis', warning: 'Precaution: Active pancreatic history requires additional medical clearance.' },
          { label: 'Kidney function issues / renal disease', value: 'kidney' },
          { label: 'Severe GI motility issues (e.g. gastroparesis)', value: 'gi' },
          { label: 'None of the above', value: 'none' }
        ]
      }
    ];
  }

  // Sleep supplement
  if (id === 'sleep') {
    return [
      {
        id: 'sleep_challenge',
        type: 'multiselect',
        question: 'What is your primary sleep challenge?',
        sub: `Help us customize your ${product.name} protocol.`,
        options: [
          { label: 'Difficulty falling asleep (mind racing)', value: 'falling' },
          { label: 'Waking up frequently during the night', value: 'waking' },
          { label: 'Waking up tired/groggier than expected', value: 'unrefreshed' },
          { label: 'High daytime stress blocking sleep cycles', value: 'stress' }
        ]
      },
      {
        id: 'stress_level',
        type: 'singleselect',
        question: 'How often do you feel tense, anxious, or highly stressed?',
        sub: 'High cortisol levels directly block natural melatonin pathways.',
        options: [
          { label: 'Almost daily', value: 'daily' },
          { label: 'A few times a week', value: 'weekly' },
          { label: 'Rarely', value: 'rarely' }
        ]
      },
      {
        id: 'melatonin_pref',
        type: 'singleselect',
        question: 'Do you prefer a melatonin-free formulation?',
        sub: 'AGZ Sleep Support uses organic adaptogens to calm the mind without synthetic hormones.',
        options: [
          { label: 'Yes, 100% Melatonin-Free adaptogens preferred', value: 'melatonin_free' },
          { label: 'No preference', value: 'melatonin_ok' }
        ]
      }
    ];
  }

  // Blood Pressure Monitor
  if (id === 'bpMonitor') {
    return [
      {
        id: 'bp_range',
        type: 'singleselect',
        question: 'What is your typical resting blood pressure range?',
        sub: `For calibrating notifications on the ${product.name}.`,
        options: [
          { label: 'Normal (Under 120/80 mmHg)', value: 'normal' },
          { label: 'Elevated (120-129 / under 80 mmHg)', value: 'elevated' },
          { label: 'Stage 1/2 Hypertension (130+ / 80+ mmHg)', value: 'hypertension' },
          { label: 'I do not monitor it currently', value: 'unknown' }
        ]
      },
      {
        id: 'bp_supervised',
        type: 'singleselect',
        question: 'Are you taking clinical medication for high blood pressure?',
        sub: 'Helps configure automated report sharing with your primary doctor.',
        options: [
          { label: 'Yes, currently taking hypertension medications', value: 'yes_meds' },
          { label: 'Yes, but managing through diet/lifestyle', value: 'yes_lifestyle' },
          { label: 'No, tracking solely for general wellness', value: 'no' }
        ]
      }
    ];
  }

  // Glucose Meter
  if (id === 'glucoseMeter') {
    return [
      {
        id: 'glucose_history',
        type: 'singleselect',
        question: 'What describes your diabetic status?',
        sub: `Matching strip quantities for the ${product.name}.`,
        options: [
          { label: 'Type 1 Diabetes', value: 'type1' },
          { label: 'Type 2 Diabetes', value: 'type2' },
          { label: 'Pre-diabetes / Insulin resistance', value: 'prediabetes' },
          { label: 'No diagnosis (tracking for keto/fasting)', value: 'keto' }
        ]
      },
      {
        id: 'glucose_refills',
        type: 'singleselect',
        question: 'How many times per day do you test your blood sugar?',
        sub: 'Helps determine test strip monthly delivery requirements.',
        options: [
          { label: '3+ times daily', value: 'high' },
          { label: '1 to 2 times daily', value: 'medium' },
          { label: 'A few times a week', value: 'low' }
        ]
      }
    ];
  }

  // Nebulizer
  if (id === 'nebulizer') {
    return [
      {
        id: 'neb_reason',
        type: 'singleselect',
        question: 'What respiratory condition requires aerosol therapy?',
        sub: `Tailoring components for the ${product.name}.`,
        options: [
          { label: 'Asthma or exercise bronchospasms', value: 'asthma' },
          { label: 'COPD, chronic bronchitis, or emphysema', value: 'copd' },
          { label: 'Seasonal allergies / congestive relief', value: 'allergies' },
          { label: 'Acute cough or cold recovery', value: 'acute' }
        ]
      },
      {
        id: 'neb_portability',
        type: 'singleselect',
        question: 'Will you use this device primarily while traveling or on-the-go?',
        sub: 'Portable mesh nebulizers are silent and run on batteries or USB power.',
        options: [
          { label: 'Yes, pocket portability is essential', value: 'yes' },
          { label: 'No, stationary home use is fine', value: 'no' }
        ]
      }
    ];
  }

  // Smart Organizer
  if (id === 'organizer') {
    return [
      {
        id: 'pill_count',
        type: 'singleselect',
        question: 'How many daily medications do you manage?',
        sub: `Determines slot layout for the ${product.name}.`,
        options: [
          { label: '1 to 3 pills daily', value: 'low' },
          { label: '4 to 8 pills daily', value: 'medium' },
          { label: '9+ pills daily', value: 'high' }
        ]
      },
      {
        id: 'pill_challenges',
        type: 'multiselect',
        question: 'What adherence challenges do you face?',
        sub: 'Select all that apply to set alerts.',
        options: [
          { label: 'Forgetting if I already took a dosage', value: 'double' },
          { label: 'Missing pill schedules when busy/traveling', value: 'missed' },
          { label: 'Difficulty reading tiny pill labels', value: 'reading' },
          { label: 'None, just want clean organization', value: 'none' }
        ]
      }
    ];
  }

  // Compression Socks
  if (id === 'socks') {
    return [
      {
        id: 'socks_need',
        type: 'multiselect',
        question: 'What symptoms do you experience in your legs?',
        sub: `Determines gradient rating for the ${product.name}.`,
        options: [
          { label: 'Ankle swelling or fluid accumulation (edema)', value: 'swelling' },
          { label: 'Visible spider or varicose veins', value: 'veins' },
          { label: 'Aching leg tiredness after a long shift', value: 'aching' },
          { label: 'Poor lower circulation/cold feet', value: 'cold' }
        ]
      },
      {
        id: 'socks_posture',
        type: 'singleselect',
        question: 'What is your typical posture during work hours?',
        sub: 'Helps determine compression pressure levels.',
        options: [
          { label: 'Prolonged standing (retail, nursing, teaching)', value: 'standing' },
          { label: 'Prolonged sitting (office work, driving)', value: 'sitting' },
          { label: 'Active running, travel, or flight commute', value: 'active' }
        ]
      }
    ];
  }

  // Pregnancy & Ovulation
  if (id === 'pregnancyKit' || id === 'ovulationKit') {
    return [
      {
        id: 'kit_goal',
        type: 'singleselect',
        question: 'What is your primary tracking goal?',
        sub: `Providing optimal diagnostic tools.`,
        options: [
          { label: 'Confirming early-stage pregnancy', value: 'pregnancy' },
          { label: 'Detecting peak fertile cycle days for conception', value: 'conception' },
          { label: 'Monitoring hormone regularity & cycles', value: 'cycles' }
        ]
      },
      {
        id: 'cycle_regularity',
        type: 'singleselect',
        question: 'How regular are your monthly cycle windows?',
        sub: 'Ovulation peak dates fluctuate based on cycle regularity.',
        options: [
          { label: 'Very regular (consistent 28-30 days)', value: 'regular' },
          { label: 'Irregular cycle lengths', value: 'irregular' },
          { label: 'Do not track/Not sure', value: 'unknown' }
        ]
      }
    ];
  }

  // Thermometer & Scale
  if (id === 'babyThermometer' || id === 'infantScale') {
    return [
      {
        id: 'pediatric_age',
        type: 'singleselect',
        question: 'What is the age of the infant or child?',
        sub: 'We adjust reference ranges based on clinical pediatric baselines.',
        options: [
          { label: 'Newborn (0 to 3 months)', value: 'newborn' },
          { label: 'Infant (3 to 12 months)', value: 'infant' },
          { label: 'Toddler (1 to 3 years)', value: 'toddler' },
          { label: 'Expecting a baby soon', value: 'pregnant' }
        ]
      },
      {
        id: 'device_primary',
        type: 'singleselect',
        question: 'What is your primary concern with pediatric checkups?',
        sub: 'Ensures correct scale/thermometer selection.',
        options: [
          { label: 'Tracking weight logs for feeding sufficiency', value: 'weight' },
          { label: 'Detecting fever temperatures safely without disturbance', value: 'fever' }
        ]
      }
    ];
  }

  // Prenatals
  if (id === 'prenatalVitamins') {
    return [
      {
        id: 'maternal_stage',
        type: 'singleselect',
        question: 'What maternal stage matches your current status?',
        sub: `Matching vitamin ingredients for ${product.name}.`,
        options: [
          { label: 'Pre-conception / planning to conceive', value: 'pre' },
          { label: 'First Trimester (weeks 1-12)', value: 'first' },
          { label: 'Second or Third Trimester', value: 'late' },
          { label: 'Postpartum / active breastfeeding lactation support', value: 'post' }
        ]
      },
      {
        id: 'stomach_sensitivity',
        type: 'singleselect',
        question: 'Do you experience morning sickness or stomach sensitivity?',
        sub: 'Our vitamins feature gentle chelated minerals to minimize digestive discomfort.',
        options: [
          { label: 'Yes, severe nausea', value: 'high' },
          { label: 'Occasionally', value: 'medium' },
          { label: 'No, typical tolerance', value: 'none' }
        ]
      }
    ];
  }

  // Wellness / Nutrition supplements general
  if (product.category === 'nutrition' || product.category === 'wellness') {
    return [
      {
        id: 'wellness_goal',
        type: 'multiselect',
        question: `What are your core objectives for taking ${product.name}?`,
        sub: 'Select all that apply to evaluate formulation compatibility.',
        options: [
          { label: 'Boost immune system resilience', value: 'immunity' },
          { label: 'Increase mental clarity and focus', value: 'focus' },
          { label: 'Enhance daily physical energy levels', value: 'energy' },
          { label: 'Sustain muscle, joint, or bone integrity', value: 'joints' }
        ]
      },
      {
        id: 'absorption_pref',
        type: 'singleselect',
        question: 'Which supplement absorption type do you prefer?',
        sub: 'Determines recommended stack ingredients.',
        options: [
          { label: 'Liquid drops (high absorption speed)', value: 'liquid' },
          { label: 'Powder mix (added hydration and taste)', value: 'powder' },
          { label: 'Capsules / Tablets (convenient for traveling)', value: 'capsules' }
        ]
      }
    ];
  }

  // Care Subscriptions
  if (product.category === 'subscriptions') {
    return [
      {
        id: 'telehealth_purpose',
        type: 'singleselect',
        question: 'What is your primary medical target for virtual consultations?',
        sub: 'Helps assign the correct provider registry.',
        options: [
          { label: '24/7 doctor consultations for acute issues', value: 'acute' },
          { label: 'Therapist sessions & mental wellness support', value: 'therapy' },
          { label: 'Prescription refills with home delivery coordination', value: 'delivery' },
          { label: 'Diagnostic blood lab checkups', value: 'labs' }
        ]
      },
      {
        id: 'hsa_reimbursement',
        type: 'singleselect',
        question: 'Do you plan to use HSA/FSA funds for this subscription?',
        sub: 'We support automated itemized receipt creation for easy reimbursement.',
        options: [
          { label: 'Yes, HSA/FSA reimbursement needed', value: 'hsa' },
          { label: 'No, normal payment', value: 'cc' }
        ]
      }
    ];
  }

  // General default fallback
  return [
    {
      id: 'general_intent',
      type: 'multiselect',
      question: `What is your primary intent for purchasing ${product.name}?`,
      sub: 'Helps us customize checkout documentation.',
      options: [
        { label: 'General preventative healthcare', value: 'prevention' },
        { label: 'Doctor recommended integration', value: 'doctor' },
        { label: 'Biohacking & physical optimizing', value: 'optimizing' }
      ]
    }
  ];
}

export default function ShopPage({ setPage }) {
  const [summitMdPurchaseType, setSummitMdPurchaseType] = useState('single'); 
  const [cartSuccess, setCartSuccess] = useState(null); 
  const [activeTab, setActiveTab] = useState('all'); 

  // Intake State
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizProduct, setQuizProduct] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizHeightFeet, setQuizHeightFeet] = useState('5');
  const [quizHeightInches, setQuizHeightInches] = useState('8');
  const [quizWeight, setQuizWeight] = useState('170');
  const [quizDOB, setQuizDOB] = useState('1990-01-01');
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizLoadingIndex, setQuizLoadingIndex] = useState(0);
  const [quizRecommendation, setQuizRecommendation] = useState(null);
  const [selectedPlanDuration, setSelectedPlanDuration] = useState('3month'); // '1month' | '3month' | '6month'
  const [enrollmentSubmitting, setEnrollmentSubmitting] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [portalHandoff, setPortalHandoff] = useState({ enrollment_url: null, patient_login_url: null });

  const handleAddToCart = (productName) => {
    setCartSuccess(productName);
    setTimeout(() => {
      setCartSuccess(null);
    }, 3000);
  };

  // Launch Quiz from specific product card
  const handleProductSelection = (product) => {
    setQuizProduct(product);
    setQuizStep(0);
    setQuizAnswers({});
    setQuizRecommendation(null);
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactConsent(false);
    setPortalHandoff({ enrollment_url: null, patient_login_url: null });
    setQuizOpen(true);
  };

  const clinicalSteps = useMemo(
    () => (quizProduct ? buildClinicalSteps(getQuestionsForProduct(quizProduct)) : []),
    [quizProduct],
  );

  const handleQuizNext = () => {
    if (quizStep < STEP_CONTACT) {
      const question = resolveVitalsStepQuestion(quizProduct, clinicalSteps[quizStep]);
      const validation = validateClinicalStep(question, quizAnswers, {
        heightFeet: quizHeightFeet,
        heightInches: quizHeightInches,
        weight: quizWeight,
        dob: quizDOB,
      });
      if (!validation.ok) {
        alert(validation.message);
        return;
      }
      setQuizStep(quizStep + 1);
      return;
    }

    if (quizStep === STEP_CONTACT) {
      const validation = validateContactStep({
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        consent: contactConsent,
      });
      if (!validation.ok) {
        alert(validation.message);
        return;
      }
      setQuizStep(STEP_LOADING);
      startClinicalEvaluation();
    }
  };

  const handleQuizBack = () => {
    if (quizStep === STEP_PORTAL) {
      setQuizStep(STEP_PLAN);
      return;
    }
    if (quizStep === STEP_PLAN) {
      setQuizStep(STEP_CONTACT);
      return;
    }
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    } else {
      setQuizOpen(false);
      setQuizProduct(null);
    }
  };

  const startClinicalEvaluation = () => {
    setQuizLoading(true);
    setQuizLoadingIndex(0);
    const intervals = [
      'Checking safety contraindications & parameters...',
      'Evaluating product formulation match...',
      'Generating clinician assessment report...'
    ];

    const timer = setInterval(() => {
      setQuizLoadingIndex(prev => {
        if (prev < intervals.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          evaluateRecommendations();
          return prev;
        }
      });
    }, 1200);
  };

  const evaluateRecommendations = () => {
    setQuizLoading(false);
    
    // Choose appropriate product recommendation based on answers
    let finalRec = quizProduct; // Recommends the selected product by default

    // If it's weightloss, perform active BMI/contraindication validation
    if (quizProduct.id.includes('weightloss')) {
      const isContraindicated = quizAnswers.contraindications === 'yes' || quizAnswers.pregnancy === 'yes';
      if (isContraindicated) {
        // Red flag alternative recommendation
        finalRec = {
          id: 'wellness_alternative',
          name: 'SummitMD General Wellness Consultation Plan',
          category: 'subscriptions',
          desc: 'A comprehensive medical program focusing on nutrition, general health consults, and wellness coaching. Recommended because GLP-1 weight medications were contraindicated for you.',
          image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400',
          subPrice: 49,
          oneTimePrice: null,
          tag: 'Clinical Wellness',
          badge: 'Alternative Recommendation',
          isAlternative: true
        };
      } else {
        const heightInches = (parseInt(quizHeightFeet) * 12) + parseInt(quizHeightInches);
        const weightLbs = parseInt(quizWeight);
        const bmi = ((weightLbs * 703) / (heightInches * heightInches)).toFixed(1);
        finalRec = { ...quizProduct, calculatedBmi: bmi };
      }
    }

    setQuizRecommendation(finalRec);
    setQuizStep(STEP_PLAN);
  };

  const handleSelectOption = (questionId, value, isMulti = false) => {
    if (isMulti) {
      const currentList = quizAnswers[questionId] || [];
      if (currentList.includes(value)) {
        setQuizAnswers(prev => ({
          ...prev,
          [questionId]: currentList.filter(item => item !== value)
        }));
      } else {
        setQuizAnswers(prev => ({
          ...prev,
          [questionId]: [...currentList, value]
        }));
      }
    } else {
      setQuizAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const handleCheckoutRecommendation = async () => {
    if (!quizRecommendation) return;

    let finalPrice = quizRecommendation.subPrice || quizRecommendation.oneTimePrice;
    let durationText = '';

    if (quizRecommendation.subPrice) {
      if (selectedPlanDuration === '3month') {
        finalPrice = Math.round(quizRecommendation.subPrice * 0.85); // 15% off
        durationText = ' (3-Month Subscription)';
      } else if (selectedPlanDuration === '6month') {
        finalPrice = Math.round(quizRecommendation.subPrice * 0.70); // 30% off
        durationText = ' (6-Month Subscription)';
      } else {
        durationText = ' (Monthly Subscription)';
      }
    }

    const cartLabel = `${quizRecommendation.name}${durationText} - $${finalPrice}`;

    setEnrollmentSubmitting(true);
    try {
      const result = await startPartnerEnrollment({
        product: quizRecommendation,
        category: quizRecommendation.category,
      });
      setPortalHandoff({
        enrollment_url: result.enrollment_url,
        patient_login_url:
          result.patient_login_url ||
          result.portals?.patient_login_url ||
          getPatientPortalLoginUrl(),
      });
      setQuizStep(STEP_PORTAL);
      return;
    } catch (err) {
      console.warn('[Partner enrollment] Falling back to local cart flow:', err);
      handleAddToCart(cartLabel);
      setQuizOpen(false);
    } finally {
      setEnrollmentSubmitting(false);
    }
  };

  // Filter products based on selected tab
  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'wellness') return p.category === 'wellness' || p.category === 'nutrition';
    return p.category === activeTab;
  });

  const getProgressPercentage = () => intakeProgressPercent(quizStep);

  return (
    <div className="landing-layout animate-fade-in" style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        .summitmd-shop-title-section {
          text-align: center;
          margin-bottom: 48px;
          padding: 0 24px;
        }

        .summitmd-shop-title {
          font-family: var(--font-display);
          font-size: 2.75rem;
          color: #0f2e2f;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 12px;
        }

        .summitmd-shop-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Flagship card */
        .summitmd-flagship-card {
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
          .summitmd-flagship-card {
            grid-template-columns: 1fr;
          }
        }

        .summitmd-flagship-visual {
          background-color: #e6ecea;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          min-height: 400px;
        }

        .summitmd-flagship-img {
          width: 100%;
          max-width: 360px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(15, 46, 47, 0.15));
        }

        .summitmd-flagship-details {
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 576px) {
          .summitmd-flagship-details {
            padding: 24px;
          }
        }

        .summitmd-tag-green {
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

        .summitmd-flagship-title {
          font-family: var(--font-display);
          font-size: 2.25rem;
          color: #0f2e2f;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .summitmd-flagship-desc {
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        /* Tabs styling */
        .summitmd-tabs-container {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 40px;
          padding: 0 16px;
        }

        .summitmd-tab-btn {
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

        .summitmd-tab-btn:hover {
          border-color: #0f2e2f;
          background-color: rgba(15, 46, 47, 0.02);
        }

        .summitmd-tab-btn.active {
          background-color: #0f2e2f;
          color: #ffffff;
          border-color: #0f2e2f;
          box-shadow: 0 4px 12px rgba(15, 46, 47, 0.12);
        }

        /* Products Grid */
        .summitmd-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .summitmd-product-card {
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

        .summitmd-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(15, 46, 47, 0.08);
          border-color: rgba(15, 46, 47, 0.15);
        }

        .summitmd-product-visual {
          background-color: #f1f5f4;
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
        }

        .summitmd-product-img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08));
        }

        .summitmd-product-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .summitmd-product-title {
          font-size: 1.25rem;
          color: #0f2e2f;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .summitmd-product-desc {
          color: #64748b;
          font-size: 0.85rem;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        /* Features */
        .summitmd-features-strip {
          background-color: #0f2e2f;
          color: #ffffff;
          padding: 60px 0;
          border-radius: 24px;
          margin-bottom: 80px;
        }

        .summitmd-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .summitmd-features-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .summitmd-feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 0 24px;
        }

        .summitmd-feature-icon {
          color: #00d2c4;
          background-color: rgba(0, 210, 196, 0.1);
          padding: 12px;
          border-radius: 50%;
        }

        .summitmd-feature-item h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .summitmd-feature-item p {
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

        /* TryYucca-Style Quiz Layout */
        .yucca-quiz-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #F9F5F0;
          color: #0f2e2f;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          font-family: 'Inter', sans-serif;
        }

        .yucca-quiz-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background-color: #F9F5F0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .yucca-brand {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.5px;
          color: #0f2e2f;
        }

        .yucca-progress-container {
          width: 100%;
          height: 5px;
          background-color: #e2e8f0;
          position: sticky;
          top: 70px;
          z-index: 10;
        }

        .yucca-progress-bar {
          height: 100%;
          background-color: #00d2c4;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .yucca-step-indicator {
          text-align: center;
          padding: 12px 24px 0;
          font-size: 0.8rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .yucca-step-indicator strong {
          color: #0f2e2f;
        }

        .yucca-step-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          padding: 12px 24px 0;
          max-width: 640px;
          margin: 0 auto;
        }

        .yucca-step-pill {
          font-size: 0.62rem;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 999px;
          background: #e2e8f0;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .yucca-step-pill.active {
          background: #0f2e2f;
          color: #ffffff;
        }

        .yucca-step-pill.done {
          background: rgba(0, 210, 196, 0.2);
          color: #0f2e2f;
        }

        .yucca-portal-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(15,46,47,0.05);
        }

        .yucca-portal-logo {
          height: 48px;
          width: auto;
          margin: 0 auto 20px;
          display: block;
        }

        .yucca-quiz-content {
          flex-grow: 1;
          max-width: 640px;
          width: 100%;
          margin: 60px auto 140px auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
        }

        .yucca-question-title {
          font-family: var(--font-display);
          font-size: 1.85rem;
          font-weight: 800;
          color: #0f2e2f;
          line-height: 1.25;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .yucca-question-sub {
          font-size: 1rem;
          color: #64748b;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .yucca-option-card {
          background-color: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .yucca-option-card:hover {
          border-color: #0f2e2f;
          transform: translateY(-1px);
        }

        .yucca-option-card.active {
          border-color: #0f2e2f;
          box-shadow: 0 0 0 4px rgba(0, 210, 196, 0.12), 0 4px 10px rgba(15, 46, 47, 0.04);
          background-color: #ffffff;
        }

        .yucca-radio-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .yucca-option-card.active .yucca-radio-circle {
          border-color: #0f2e2f;
        }

        .yucca-option-card.active .yucca-radio-circle::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #0f2e2f;
        }

        .yucca-checkbox-square {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .yucca-option-card.active .yucca-checkbox-square {
          border-color: #0f2e2f;
          background-color: #0f2e2f;
          color: #ffffff;
        }

        .yucca-option-label {
          font-weight: 700;
          font-size: 0.95rem;
          color: #0f2e2f;
        }

        .yucca-warning-card {
          background-color: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
          padding: 16px;
          border-radius: 12px;
          margin-top: 16px;
          font-size: 0.85rem;
          line-height: 1.4;
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .yucca-quiz-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(249, 245, 240, 0.95);
          backdrop-filter: blur(8px);
          padding: 24px;
          border-top: 1px solid rgba(15, 46, 47, 0.05);
          display: flex;
          justify-content: center;
          z-index: 10;
        }

        .yucca-footer-inner {
          max-width: 640px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .yucca-back-btn {
          border: none;
          background: transparent;
          color: #64748b;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .yucca-next-btn {
          background-color: #0f2e2f;
          color: #ffffff;
          border: none;
          border-radius: 30px;
          padding: 14px 36px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s, background-color 0.2s;
        }

        .yucca-next-btn:hover {
          background-color: #07191a;
          transform: translateY(-1px);
        }

        /* Form elements */
        .yucca-input {
          width: 100%;
          padding: 16px;
          border: 1.5px solid #cbd5e1;
          border-radius: 12px;
          font-size: 1.05rem;
          color: #0f2e2f;
          font-weight: 700;
          background-color: #ffffff;
          outline: none;
          transition: border-color 0.2s;
          margin-bottom: 20px;
        }

        .yucca-input:focus {
          border-color: #0f2e2f;
        }

        .yucca-input-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0f2e2f;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          display: block;
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

      {/* Main Shop Header */}
      <div className="summitmd-shop-title-section container">
        <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#00d2c4', fontWeight: 800, backgroundColor: '#0f2e2f', padding: '4px 10px', borderRadius: '4px', display: 'inline-block', marginBottom: '16px' }}>
          OFFICIAL HEALTH & WELLNESS STORE
        </span>
        <h1 className="summitmd-shop-title">Set up your foundational health.</h1>
        <p className="summitmd-shop-subtitle">Complete a quick medical intake to purchase clinical products, prescription therapies, and smart diagnostic equipment.</p>
        
        {/* Dynamic explore treatment assessment CTA */}
        <button 
          onClick={() => {
            const defaultProd = PRODUCTS.find(p => p.id === 'weightloss_semaglutide');
            handleProductSelection(defaultProd);
          }}
          className="btn animate-pulse" 
          style={{ marginTop: '24px', backgroundColor: '#00d2c4', color: '#0f2e2f', padding: '12px 24px', borderRadius: '30px', fontWeight: '800', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          Start Clinical Intake Quiz <ArrowRight size={16} />
        </button>
      </div>

      <div className="container">
        
        {/* Flagship SummitMd Pouch Section */}
        <div className="summitmd-flagship-card">
          <div className="summitmd-flagship-visual">
            <span style={{ position: 'absolute', top: '24px', left: '24px', backgroundColor: '#ffffff', border: '1px solid #0f2e2f', color: '#0f2e2f', fontSize: '0.65rem', fontWeight: 800, padding: '4px 8px', borderRadius: '4px' }}>
              NSF CERTIFIED FOR SPORT
            </span>
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" 
              alt="SummitMd Daily Foundational Nutrition" 
              className="summitmd-flagship-img"
            />
          </div>

          <div className="summitmd-flagship-details">
            <div>
              <span className="summitmd-tag-green">Flagship Supplement</span>
              <h2 className="summitmd-flagship-title">SummitMd Foundational Powder</h2>
              <p className="summitmd-flagship-desc">
                Your daily nutrient insurance stack. 75 highly bioavailable vitamins, organic minerals, and whole-food adaptogens in one single scoop. Optimizes cell longevity, focus, and digestion.
              </p>
            </div>

            <div>
              <div style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '16px', marginBottom: '24px', fontSize: '0.8rem', color: '#475569' }}>
                <strong>🎁 FREE Welcome Kit Included:</strong> Premium Stainless Canister, Shaker Bottle, Metal Measuring Scoop, and 5 Free Travel Packs ($45 retail value).
              </div>

              {/* Complete intake selector - No direct Add to Cart */}
              <button 
                className="btn" 
                style={{ width: '100%', backgroundColor: '#0f2e2f', color: '#ffffff', padding: '16px', borderRadius: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => {
                  const product = PRODUCTS.find(p => p.id === 'travel');
                  handleProductSelection(product);
                }}
              >
                <Plus size={18} />
                Get Started with Intake Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Tab Filter buttons */}
        <div className="summitmd-tabs-container">
          <button className={`summitmd-tab-btn${activeTab === 'all' ? ' active' : ''}`} onClick={() => setActiveTab('all')}>All Products</button>
          <button className={`summitmd-tab-btn${activeTab === 'wellness' ? ' active' : ''}`} onClick={() => setActiveTab('wellness')}>Nutrition & Wellness</button>
          <button className={`summitmd-tab-btn${activeTab === 'devices' ? ' active' : ''}`} onClick={() => setActiveTab('devices')}>Devices & Diagnostics</button>
          <button className={`summitmd-tab-btn${activeTab === 'maternal' ? ' active' : ''}`} onClick={() => setActiveTab('maternal')}>Maternal & Child</button>
          <button className={`summitmd-tab-btn${activeTab === 'subscriptions' ? ' active' : ''}`} onClick={() => setActiveTab('subscriptions')}>Care Subscriptions</button>
        </div>

        {/* Products Grid */}
        <div className="summitmd-products-grid">
          {filteredProducts.map(p => {
            const hasSub = p.subPrice !== null && p.subPrice !== undefined;

            return (
              <div className="summitmd-product-card" key={p.id}>
                {/* Visual / Image */}
                <div className="summitmd-product-visual">
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
                  <img src={p.image} alt={p.name} className="summitmd-product-img" />
                </div>

                {/* Body Details */}
                <div className="summitmd-product-body">
                  <h3 className="summitmd-product-title">{p.name}</h3>
                  <p className="summitmd-product-desc">{p.desc}</p>
                  
                  <div style={{ marginBottom: '16px', fontSize: '0.95rem', color: '#0f2e2f', fontWeight: '800' }}>
                    {hasSub ? `From $${p.subPrice}/mo` : `One-time: $${p.oneTimePrice}`}
                  </div>

                  {/* Complete intake selector - No direct Add to Cart */}
                  <button 
                    className="btn" 
                    style={{ 
                      width: '100%', 
                      backgroundColor: '#0f2e2f',
                      color: '#ffffff',
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
                    onClick={() => handleProductSelection(p)}
                  >
                    <Plus size={16} /> 
                    {hasSub ? 'Check Eligibility & Subscribe' : 'Verify & Purchase'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subscription Benefits section */}
        <div className="summitmd-features-strip">
          <div className="summitmd-features-grid">
            
            <div className="summitmd-feature-item">
              <div className="summitmd-feature-icon">
                <Calendar size={24} />
              </div>
              <h3>Flexible Health Delivery</h3>
              <p>Easily edit, pause, delay, or cancel your supplements and prescriptions at any time via your dashboard.</p>
            </div>

            <div className="summitmd-feature-item">
              <div className="summitmd-feature-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>FDA Quality Standards</h3>
              <p>All clinical diagnostic cuffs, meters, scale devices, and supplement stacks meet rigid safety regulations.</p>
            </div>

            <div className="summitmd-feature-item">
              <div className="summitmd-feature-icon">
                <Heart size={24} />
              </div>
              <h3>Complete Family Support</h3>
              <p>Direct telehealth credits, priority consultations, and expert guidance for pregnancy, child, and senior health.</p>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* TRYYUCCA-STYLE INTENSE CLINICAL INTAKE WIZARD */}
      {/* ========================================== */}
      {quizOpen && quizProduct && (
        <div className="yucca-quiz-overlay animate-fade-in">
          
          {/* Header Strip */}
          <div className="yucca-quiz-nav">
            <button className="yucca-back-btn" onClick={handleQuizBack}>
              <ArrowLeft size={18} /> BACK
            </button>
            <img src="/logo.png" alt="SummitMD" className="yucca-portal-logo" style={{ height: 32, margin: 0 }} />
            <div style={{ width: '60px' }}></div>
          </div>

          {/* Top Progress Line */}
          <div className="yucca-progress-container">
            <div className="yucca-progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>

          <div className="yucca-step-indicator">
            Step <strong>{quizStep + 1}</strong> of {INTAKE_TOTAL_STEPS} · {INTAKE_STEP_LABELS[quizStep]}
          </div>

          <div className="yucca-step-pills">
            {INTAKE_STEP_LABELS.map((label, idx) => (
              <span
                key={label}
                className={`yucca-step-pill${idx === quizStep ? ' active' : idx < quizStep ? ' done' : ''}`}
              >
                {idx + 1}. {label.split(' ')[0]}
              </span>
            ))}
          </div>

          {/* Main Question Body */}
          <div className="yucca-quiz-content">

            {(quizLoading || quizStep === STEP_LOADING) ? (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <Loader2 size={60} className="animate-spin" style={{ color: '#00d2c4', margin: '0 auto 24px auto' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Step 7 — Analyzing Medical Eligibility</h3>
                <p style={{ color: '#64748b', marginTop: '8px', minHeight: '24px' }}>
                  {quizLoadingIndex === 0 && 'Checking clinical safety profile & contraindications...'}
                  {quizLoadingIndex === 1 && 'Calculating Body Mass Index (BMI) & metabolic rate...'}
                  {quizLoadingIndex === 2 && 'Assigning medical recommendations and plan choices...'}
                </p>
              </div>
            ) : quizStep < STEP_CONTACT ? (
              <div>
                {(() => {
                  const q = resolveVitalsStepQuestion(quizProduct, clinicalSteps[quizStep]);
                  if (q.type === 'singleselect' || q.type === 'multiselect') {
                    const isMulti = q.type === 'multiselect';
                    return (
                      <div>
                        <h2 className="yucca-question-title">{q.question}</h2>
                        <p className="yucca-question-sub">{q.sub}</p>
                        <div className="options-stack">
                          {q.options.map(opt => {
                            const isSelected = isMulti
                              ? (quizAnswers[q.id] || []).includes(opt.value)
                              : quizAnswers[q.id] === opt.value;
                            return (
                              <div key={opt.value}>
                                <div
                                  className={`yucca-option-card${isSelected ? ' active' : ''}`}
                                  onClick={() => handleSelectOption(q.id, opt.value, isMulti)}
                                >
                                  {isMulti ? (
                                    <div className="yucca-checkbox-square">
                                      {isSelected && <Check size={14} />}
                                    </div>
                                  ) : (
                                    <div className="yucca-radio-circle"></div>
                                  )}
                                  <span className="yucca-option-label">{opt.label}</span>
                                </div>
                                {isSelected && opt.warning && (
                                  <div className="yucca-warning-card animate-fade-in">
                                    <Info size={16} style={{ flexShrink: 0 }} />
                                    <span>{opt.warning}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  if (q.type === 'vitals') {
                    return (
                      <div>
                        <h2 className="yucca-question-title">{q.question}</h2>
                        <p className="yucca-question-sub">{q.sub}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div>
                            <label className="yucca-input-label">Height (Feet)</label>
                            <select className="yucca-input" value={quizHeightFeet} onChange={e => setQuizHeightFeet(e.target.value)}>
                              <option value="4">4 ft</option>
                              <option value="5">5 ft</option>
                              <option value="6">6 ft</option>
                              <option value="7">7 ft</option>
                            </select>
                          </div>
                          <div>
                            <label className="yucca-input-label">Height (Inches)</label>
                            <select className="yucca-input" value={quizHeightInches} onChange={e => setQuizHeightInches(e.target.value)}>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>{i} in</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <label className="yucca-input-label">Weight (lbs)</label>
                        <input type="number" className="yucca-input" value={quizWeight} onChange={e => setQuizWeight(e.target.value)} placeholder="e.g. 165" />
                        <label className="yucca-input-label">Date of Birth</label>
                        <input type="date" className="yucca-input" value={quizDOB} onChange={e => setQuizDOB(e.target.value)} />
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            ) : quizStep === STEP_CONTACT ? (
              <div>
                <h2 className="yucca-question-title">Create your health profile</h2>
                <p className="yucca-question-sub">Submit your contact details to review your clinical prescription assessment.</p>
                <label className="yucca-input-label">Full Name</label>
                <input type="text" className="yucca-input" placeholder="e.g. Alex Harrison" value={contactName} onChange={e => setContactName(e.target.value)} required />
                <label className="yucca-input-label">Email Address</label>
                <input type="email" className="yucca-input" placeholder="alex@example.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
                <label className="yucca-input-label">Phone Number</label>
                <input type="tel" className="yucca-input" placeholder="(555) 000-0000" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '16px' }}>
                  <input type="checkbox" id="consent" style={{ marginTop: '4px', transform: 'scale(1.2)' }} checked={contactConsent} onChange={e => setContactConsent(e.target.checked)} />
                  <label htmlFor="consent" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>
                    I confirm that the health answers provided are accurate and complete, and I consent to telehealth evaluation by SummitMD clinical practitioners.
                  </label>
                </div>
              </div>
            ) : quizStep === STEP_PLAN ? (
              <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#00d2c4', fontWeight: 800, backgroundColor: '#0f2e2f', padding: '6px 16px', borderRadius: '30px', display: 'inline-block' }}>
                    Step 8 — Recommended Clinical Plan
                  </span>
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(15,46,47,0.05)' }}>
                  <div style={{ padding: '24px', backgroundColor: '#e6ecea', borderBottom: '1px solid rgba(15,46,47,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f2e2f' }}>{quizRecommendation?.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>{quizRecommendation?.badge || 'Clinical Assessment Completed'}</p>
                    </div>
                    <ShieldCheck size={32} style={{ color: '#00d2c4' }} />
                  </div>
                  <div style={{ padding: '32px 24px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '24px' }}>{quizRecommendation?.desc}</p>
                    {quizProduct.id.includes('weightloss') && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Calculated BMI</span>
                          <strong style={{ fontSize: '1.5rem', color: '#0f2e2f' }}>{quizRecommendation?.calculatedBmi || 'N/A'}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Safety Assessment</span>
                          <strong style={{ fontSize: '1rem', color: quizRecommendation?.isAlternative ? '#991b1b' : '#00d2c4' }}>
                            {quizRecommendation?.isAlternative ? 'Contraindicated (Alternative Plan)' : 'Eligible for Prescription'}
                          </strong>
                        </div>
                      </div>
                    )}
                    {quizRecommendation?.subPrice && (
                      <div style={{ marginBottom: '24px' }}>
                        <label className="yucca-input-label" style={{ marginBottom: '12px' }}>Select Subscription Length</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                          <div onClick={() => setSelectedPlanDuration('1month')} style={{ border: '1.5px solid', borderColor: selectedPlanDuration === '1month' ? '#0f2e2f' : '#cbd5e1', backgroundColor: selectedPlanDuration === '1month' ? 'rgba(0, 210, 196, 0.05)' : '#ffffff', padding: '16px 8px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>Monthly</span>
                            <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f2e2f', marginTop: '4px' }}>${quizRecommendation.subPrice}</strong>
                          </div>
                          <div onClick={() => setSelectedPlanDuration('3month')} style={{ border: '1.5px solid', borderColor: selectedPlanDuration === '3month' ? '#0f2e2f' : '#cbd5e1', backgroundColor: selectedPlanDuration === '3month' ? 'rgba(0, 210, 196, 0.05)' : '#ffffff', padding: '16px 8px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0f2e2f', color: '#ffffff', fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>Save 15%</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginTop: '2px' }}>3 Months</span>
                            <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f2e2f', marginTop: '4px' }}>${Math.round(quizRecommendation.subPrice * 0.85)}</strong>
                          </div>
                          <div onClick={() => setSelectedPlanDuration('6month')} style={{ border: '1.5px solid', borderColor: selectedPlanDuration === '6month' ? '#0f2e2f' : '#cbd5e1', backgroundColor: selectedPlanDuration === '6month' ? 'rgba(0, 210, 196, 0.05)' : '#ffffff', padding: '16px 8px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                            <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#00d2c4', color: '#0f2e2f', fontSize: '0.55rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>Save 30%</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginTop: '2px' }}>6 Months</span>
                            <strong style={{ display: 'block', fontSize: '1.15rem', color: '#0f2e2f', marginTop: '4px' }}>${Math.round(quizRecommendation.subPrice * 0.70)}</strong>
                          </div>
                        </div>
                      </div>
                    )}
                    <button onClick={handleCheckoutRecommendation} disabled={enrollmentSubmitting} className="btn" style={{ width: '100%', backgroundColor: '#0f2e2f', color: '#ffffff', padding: '16px', borderRadius: '30px', fontWeight: '800', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: enrollmentSubmitting ? 'wait' : 'pointer', opacity: enrollmentSubmitting ? 0.8 : 1, fontSize: '1.05rem' }}>
                      {enrollmentSubmitting ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
                      {enrollmentSubmitting ? 'Preparing secure enrollment...' : 'Secure Treatment Plan & Checkout'}
                    </button>
                  </div>
                </div>
              </div>
            ) : quizStep === STEP_PORTAL ? (
              <div className="yucca-portal-card animate-fade-in">
                <img src="/logo.png" alt="SummitMD" className="yucca-portal-logo" />
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#00d2c4', fontWeight: 800, backgroundColor: '#0f2e2f', padding: '6px 16px', borderRadius: '30px', display: 'inline-block', marginBottom: '16px' }}>
                  Step 9 — Patient Portal
                </span>
                <h2 className="yucca-question-title" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                  Your SummitMD portal is ready
                </h2>
                <p className="yucca-question-sub" style={{ marginBottom: '28px' }}>
                  {quizRecommendation?.isAlternative
                    ? 'Complete checkout for your alternative wellness plan, then log in to manage care with SummitMD branding.'
                    : 'Complete secure checkout on Peak Health, then access your branded SummitMD patient portal for messaging, prescriptions, and follow-up care.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {portalHandoff.enrollment_url && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() => window.location.assign(portalHandoff.enrollment_url)}
                      style={{ width: '100%', backgroundColor: '#0f2e2f', color: '#ffffff', padding: '16px', borderRadius: '30px', fontWeight: '800', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.05rem' }}
                    >
                      Complete Secure Checkout <ExternalLink size={18} />
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn"
                    onClick={() => window.location.assign(portalHandoff.patient_login_url || getPatientPortalLoginUrl())}
                    style={{ width: '100%', backgroundColor: '#ffffff', color: '#0f2e2f', padding: '16px', borderRadius: '30px', fontWeight: '800', border: '1.5px solid #0f2e2f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.05rem' }}
                  >
                    <LogIn size={18} /> Log In to SummitMD Patient Portal
                  </button>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '20px', lineHeight: 1.5 }}>
                  Portal URL: {portalHandoff.patient_login_url || getPatientPortalLoginUrl()}
                </p>
              </div>
            ) : null}

          </div>

          {/* Quiz Action Navigation Footer */}
          {!quizLoading && quizStep !== STEP_LOADING && (
            <div className="yucca-quiz-footer">
              <div className="yucca-footer-inner">
                {quizStep <= STEP_CONTACT ? (
                  <>
                    <button className="yucca-back-btn" onClick={handleQuizBack}>
                      <ArrowLeft size={16} /> Previous Step
                    </button>
                    <button className="yucca-next-btn" onClick={handleQuizNext}>
                      Continue <ArrowRight size={16} />
                    </button>
                  </>
                ) : quizStep === STEP_PLAN ? (
                  <>
                    <button className="yucca-back-btn" onClick={handleQuizBack}>
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      className="yucca-back-btn"
                      onClick={() => {
                        setQuizStep(0);
                        setQuizRecommendation(null);
                        setPortalHandoff({ enrollment_url: null, patient_login_url: null });
                      }}
                    >
                      Restart Assessment
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <button className="yucca-back-btn" onClick={handleQuizBack}>
                      <ArrowLeft size={16} /> Back to Plan
                    </button>
                    <button
                      className="yucca-back-btn"
                      onClick={() => {
                        setQuizStep(0);
                        setQuizRecommendation(null);
                        setPortalHandoff({ enrollment_url: null, patient_login_url: null });
                      }}
                    >
                      Restart Assessment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
