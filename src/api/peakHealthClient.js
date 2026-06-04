/**
 * PeakHealth FHIR v4 API Client
 * ─────────────────────────────
 * Connects this frontend to the PeakHealth backend via the API docs.
 * Base URL is set in .env as VITE_API_URL.
 *
 * Endpoints (from /public/api-docs.json):
 *   GET  /Patient
 *   GET  /Observation
 *   POST /Observation
 *   GET  /Appointment
 *
 * Auth token is stored in localStorage after login.
 * Every request sends: X-Tenant-ID, Authorization Bearer token.
 */

const BASE_URL  = import.meta.env.VITE_API_URL  || 'https://teladoc-peakhealth.vercel.app/fhir';
const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'peakhealth-default';
const IS_SANDBOX = import.meta.env.VITE_API_ENV !== 'production';

/* ── Auth token helpers ───────────────────────────────────────── */
const getToken  = ()      => localStorage.getItem('ph_token');
const saveToken = (token) => localStorage.setItem('ph_token', token);
const clearToken = ()     => localStorage.removeItem('ph_token');

/* ── Build request headers ────────────────────────────────────── */
const buildHeaders = (extra = {}) => ({
  'Content-Type': 'application/json',
  'X-Tenant-ID': TENANT_ID,
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  ...extra,
});

/* ── Generic fetch wrapper with error handling ────────────────── */
const apiFetch = async (path, options = {}) => {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: buildHeaders(options.headers || {}),
    });

    // If server returns 401 → token expired, clear it
    if (res.status === 401) {
      clearToken();
      throw new Error('Session expired. Please sign in again.');
    }

    // Parse JSON; fall back gracefully if empty body
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new Error(data.message || data.error || `API error ${res.status}`);
    }

    return data;
  } catch (err) {
    // Network error or CORS — fall back to local mock if sandbox
    if (IS_SANDBOX) {
      console.warn(`[PeakHealth API] Falling back to mock for ${path}:`, err.message);
      return null; // caller handles null → use mock
    }
    throw err;
  }
};

/* ══════════════════════════════════════════════════════════════
   MOCK / FALLBACK DATA  (used when backend is unreachable in sandbox)
   ══════════════════════════════════════════════════════════════ */
const MOCK = {
  patient: {
    id: 'pat-901', resourceType: 'Patient', active: true,
    name: [{ text: 'Alex Harrison', family: 'Harrison', given: ['Alex'] }],
    telecom: [
      { system: 'phone', value: '(555) 382-9012', use: 'mobile' },
      { system: 'email', value: 'alex.harrison@summitmd.com', use: 'home' },
    ],
    gender: 'male', birthDate: '1988-11-14',
    address: [{ text: '482 Pinehurst Dr, Seattle, WA 98101' }],
    managingOrganization: { display: 'SummitMD Northwest Group' },
    extension: [{
      url: 'http://summitmd.com/fhir/StructureDefinition/insurance-info',
      valueCodeableConcept: { text: 'Blue Shield PPO - Gold Plan' },
    }],
  },

  observations: [
    { id: 'obs-1', resourceType: 'Observation', status: 'final', code: { text: 'Blood Pressure' }, effectiveDateTime: '2026-05-15T08:30:00Z', component: [{ code: { text: 'Systolic' }, valueQuantity: { value: 120, unit: 'mmHg' } }, { code: { text: 'Diastolic' }, valueQuantity: { value: 80, unit: 'mmHg' } }] },
    { id: 'obs-2', resourceType: 'Observation', status: 'final', code: { text: 'Blood Pressure' }, effectiveDateTime: '2026-05-20T08:15:00Z', component: [{ code: { text: 'Systolic' }, valueQuantity: { value: 122, unit: 'mmHg' } }, { code: { text: 'Diastolic' }, valueQuantity: { value: 82, unit: 'mmHg' } }] },
    { id: 'obs-3', resourceType: 'Observation', status: 'final', code: { text: 'Blood Pressure' }, effectiveDateTime: '2026-05-25T08:45:00Z', component: [{ code: { text: 'Systolic' }, valueQuantity: { value: 118, unit: 'mmHg' } }, { code: { text: 'Diastolic' }, valueQuantity: { value: 78, unit: 'mmHg' } }] },
    { id: 'obs-4', resourceType: 'Observation', status: 'final', code: { text: 'Blood Pressure' }, effectiveDateTime: '2026-06-01T09:00:00Z', component: [{ code: { text: 'Systolic' }, valueQuantity: { value: 116, unit: 'mmHg' } }, { code: { text: 'Diastolic' }, valueQuantity: { value: 75, unit: 'mmHg' } }] },
    { id: 'obs-5', resourceType: 'Observation', status: 'final', code: { text: 'Blood Glucose' }, effectiveDateTime: '2026-05-15T08:35:00Z', valueQuantity: { value: 98, unit: 'mg/dL' } },
    { id: 'obs-6', resourceType: 'Observation', status: 'final', code: { text: 'Blood Glucose' }, effectiveDateTime: '2026-05-20T08:20:00Z', valueQuantity: { value: 104, unit: 'mg/dL' } },
    { id: 'obs-7', resourceType: 'Observation', status: 'final', code: { text: 'Blood Glucose' }, effectiveDateTime: '2026-05-25T08:50:00Z', valueQuantity: { value: 92, unit: 'mg/dL' } },
    { id: 'obs-8', resourceType: 'Observation', status: 'final', code: { text: 'Blood Glucose' }, effectiveDateTime: '2026-06-01T09:05:00Z', valueQuantity: { value: 89, unit: 'mg/dL' } },
    { id: 'obs-9', resourceType: 'Observation', status: 'final', code: { text: 'Weight' }, effectiveDateTime: '2026-05-15T08:30:00Z', valueQuantity: { value: 182, unit: 'lbs' } },
    { id: 'obs-10', resourceType: 'Observation', status: 'final', code: { text: 'Weight' }, effectiveDateTime: '2026-05-20T08:15:00Z', valueQuantity: { value: 181, unit: 'lbs' } },
    { id: 'obs-11', resourceType: 'Observation', status: 'final', code: { text: 'Weight' }, effectiveDateTime: '2026-05-25T08:45:00Z', valueQuantity: { value: 179, unit: 'lbs' } },
    { id: 'obs-12', resourceType: 'Observation', status: 'final', code: { text: 'Weight' }, effectiveDateTime: '2026-06-01T09:00:00Z', valueQuantity: { value: 178, unit: 'lbs' } },
  ],

  appointments: [{
    id: 'apt-1', resourceType: 'Appointment', status: 'booked',
    description: 'Annual Wellness Checkup',
    start: '2026-06-15T10:00:00Z', end: '2026-06-15T10:30:00Z',
    participant: [
      { actor: { reference: 'Practitioner/pract-1', display: 'Dr. Sarah Jenkins, MD' }, status: 'accepted' },
      { actor: { reference: 'Patient/pat-901', display: 'Alex Harrison' }, status: 'accepted' },
    ],
    serviceType: [{ text: 'Primary Care' }],
  }],

  providers: [
    { id: 'pract-1', resourceType: 'Practitioner', active: true, name: [{ text: 'Dr. Sarah Jenkins, MD' }], qualification: [{ code: { text: 'Family Medicine & Urgent Care' } }], photo: [{ url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300' }], rating: 4.9, reviews: 142, availability: 'Today, 2:30 PM' },
    { id: 'pract-2', resourceType: 'Practitioner', active: true, name: [{ text: 'Dr. Marcus Vance, PhD' }], qualification: [{ code: { text: 'Clinical Psychology & Psychiatry' } }], photo: [{ url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300' }], rating: 4.8, reviews: 98, availability: 'Tomorrow, 9:00 AM' },
    { id: 'pract-3', resourceType: 'Practitioner', active: true, name: [{ text: 'Dr. Emily Zhang, MD' }], qualification: [{ code: { text: 'Dermatology & Skin Science' } }], photo: [{ url: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300' }], rating: 4.9, reviews: 215, availability: 'Friday, 11:15 AM' },
    { id: 'pract-4', resourceType: 'Practitioner', active: true, name: [{ text: 'Dr. David Kincaid, RD' }], qualification: [{ code: { text: 'Metabolic Health & Nutrition' } }], photo: [{ url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300' }], rating: 4.7, reviews: 64, availability: 'Today, 4:00 PM' },
  ],
};

/* local runtime store for mock writes (session-only) */
let _mockObs  = [...MOCK.observations];
let _mockApts = [...MOCK.appointments];

/* ══════════════════════════════════════════════════════════════
   PUBLIC API CLIENT
   ══════════════════════════════════════════════════════════════ */
export const peakHealthClient = {

  /** Called once on app boot */
  init: () => {
    console.log(`[PeakHealth] Client ready → ${IS_SANDBOX ? 'SANDBOX' : 'PRODUCTION'} | ${BASE_URL}`);
  },

  /* ── Auth ──────────────────────────────────────────────────── */
  login: async (email, password) => {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data?.token) saveToken(data.token);
    return data || { ...MOCK.patient, _mock: true };
  },

  register: async (patientFields) => {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(patientFields),
    });
    if (data?.token) saveToken(data.token);
    return data || { ...MOCK.patient, ...patientFields, _mock: true };
  },

  logout: () => {
    clearToken();
  },

  isAuthenticated: () => !!getToken(),

  /* ── Patient ───────────────────────────────────────────────── */
  getPatient: async () => {
    const data = await apiFetch('/Patient');
    return data || MOCK.patient;
  },

  updatePatient: async (fields) => {
    const data = await apiFetch('/Patient', {
      method: 'PUT',
      body: JSON.stringify(fields),
    });
    return data || { ...MOCK.patient, ...fields };
  },

  /* ── Providers ─────────────────────────────────────────────── */
  getProviders: async (specialty = '') => {
    const qs = specialty ? `?specialty=${encodeURIComponent(specialty)}` : '';
    const data = await apiFetch(`/Practitioner${qs}`);
    if (data) return Array.isArray(data) ? data : (data.entry || []);
    return specialty
      ? MOCK.providers.filter(p => p.qualification[0].code.text.toLowerCase().includes(specialty.toLowerCase()))
      : MOCK.providers;
  },

  getProviderById: async (id) => {
    const data = await apiFetch(`/Practitioner/${id}`);
    return data || MOCK.providers.find(p => p.id === id) || null;
  },

  /* ── Appointments ──────────────────────────────────────────── */
  getAppointments: async () => {
    const data = await apiFetch('/Appointment');
    if (data) return Array.isArray(data) ? data : (data.entry || []);
    return _mockApts;
  },

  createAppointment: async (practitionerId, serviceType, dateTimeStr, description = '') => {
    const body = { practitionerId, serviceType, dateTimeStr, description };
    const data = await apiFetch('/Appointment', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (data) return data;
    // Mock fallback
    const provider = MOCK.providers.find(p => p.id === practitionerId);
    const newApt = {
      id: `apt-${Date.now()}`, resourceType: 'Appointment', status: 'booked',
      description: description || `${serviceType} Consultation`,
      start: new Date(dateTimeStr).toISOString(),
      end: new Date(new Date(dateTimeStr).getTime() + 30 * 60 * 1000).toISOString(),
      participant: [
        { actor: { reference: `Practitioner/${practitionerId}`, display: provider?.name[0].text || 'Unknown Provider' }, status: 'accepted' },
        { actor: { reference: 'Patient/pat-901', display: 'Alex Harrison' }, status: 'accepted' },
      ],
      serviceType: [{ text: serviceType }],
    };
    _mockApts.push(newApt);
    return newApt;
  },

  cancelAppointment: async (id) => {
    const data = await apiFetch(`/Appointment/${id}`, { method: 'DELETE' });
    if (data !== null) return true;
    _mockApts = _mockApts.filter(a => a.id !== id);
    return true;
  },

  /* ── Observations (Vitals) ─────────────────────────────────── */
  getObservations: async (codeText = '') => {
    const qs = codeText ? `?code=${encodeURIComponent(codeText)}` : '';
    const data = await apiFetch(`/Observation${qs}`);
    if (data) return Array.isArray(data) ? data : (data.entry || []);
    return codeText
      ? _mockObs.filter(o => o.code.text.toLowerCase() === codeText.toLowerCase())
      : _mockObs;
  },

  addObservation: async (codeText, primaryValue, secondaryValue = null) => {
    const body = { code: codeText, value: Number(primaryValue), secondary: secondaryValue ? Number(secondaryValue) : null };
    const data = await apiFetch('/Observation', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (data) return data;
    // Mock fallback — build FHIR-shaped object
    const obs = {
      id: `obs-${Date.now()}`, resourceType: 'Observation', status: 'final',
      category: [{ coding: [{ code: 'vital-signs' }] }],
      code: { text: codeText },
      subject: { reference: 'Patient/pat-901' },
      effectiveDateTime: new Date().toISOString(),
    };
    if (codeText.toLowerCase() === 'blood pressure') {
      obs.component = [
        { code: { text: 'Systolic' }, valueQuantity: { value: Number(primaryValue), unit: 'mmHg' } },
        { code: { text: 'Diastolic' }, valueQuantity: { value: Number(secondaryValue), unit: 'mmHg' } },
      ];
    } else {
      obs.valueQuantity = { value: Number(primaryValue), unit: codeText === 'Weight' ? 'lbs' : 'mg/dL' };
    }
    _mockObs.push(obs);
    return obs;
  },

  /* ── Utilities ─────────────────────────────────────────────── */
  getApiInfo: () => ({
    baseUrl: BASE_URL,
    tenantId: TENANT_ID,
    environment: IS_SANDBOX ? 'sandbox' : 'production',
    authenticated: !!getToken(),
  }),
};
