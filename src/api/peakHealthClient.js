// PeakHealth FHIR API Client Mock
// This layer mimics FHIR JSON structures (v4) for easy replacement with a live server.

const DEFAULT_PROVIDERS = [
  {
    id: "pract-1",
    resourceType: "Practitioner",
    active: true,
    name: [{ text: "Dr. Sarah Jenkins, MD", family: "Jenkins", given: ["Sarah"] }],
    telecom: [{ system: "phone", value: "555-019-2831" }],
    qualification: [{ code: { text: "Family Medicine & Urgent Care" } }],
    photo: [{ url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" }],
    rating: 4.9,
    reviews: 142,
    availability: "Today, 2:30 PM"
  },
  {
    id: "pract-2",
    resourceType: "Practitioner",
    active: true,
    name: [{ text: "Dr. Marcus Vance, PhD", family: "Vance", given: ["Marcus"] }],
    telecom: [{ system: "phone", value: "555-019-2832" }],
    qualification: [{ code: { text: "Clinical Psychology & Psychiatry" } }],
    photo: [{ url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" }],
    rating: 4.8,
    reviews: 98,
    availability: "Tomorrow, 9:00 AM"
  },
  {
    id: "pract-3",
    resourceType: "Practitioner",
    active: true,
    name: [{ text: "Dr. Emily Zhang, MD", family: "Zhang", given: ["Emily"] }],
    telecom: [{ system: "phone", value: "555-019-2833" }],
    qualification: [{ code: { text: "Dermatology & Skin Science" } }],
    photo: [{ url: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300" }],
    rating: 4.9,
    reviews: 215,
    availability: "Friday, 11:15 AM"
  },
  {
    id: "pract-4",
    resourceType: "Practitioner",
    active: true,
    name: [{ text: "Dr. David Kincaid, RD", family: "Kincaid", given: ["David"] }],
    telecom: [{ system: "phone", value: "555-019-2834" }],
    qualification: [{ code: { text: "Metabolic Health & Nutrition" } }],
    photo: [{ url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300" }],
    rating: 4.7,
    reviews: 64,
    availability: "Today, 4:00 PM"
  }
];

const DEFAULT_PATIENT = {
  id: "pat-901",
  resourceType: "Patient",
  active: true,
  name: [{ text: "Alex Harrison", family: "Harrison", given: ["Alex"] }],
  telecom: [
    { system: "phone", value: "(555) 382-9012", use: "mobile" },
    { system: "email", value: "alex.harrison@summithealth.com", use: "home" }
  ],
  gender: "male",
  birthDate: "1988-11-14",
  address: [{ text: "482 Pinehurst Dr, Seattle, WA 98101", city: "Seattle", state: "WA", postalCode: "98101" }],
  managingOrganization: { display: "SummitMD Northwest Group" },
  extension: [
    {
      url: "http://summitmd.com/fhir/StructureDefinition/insurance-info",
      valueCodeableConcept: {
        text: "Blue Shield PPO - Gold Plan",
        coding: [{ code: "BS-PPO-G", display: "Blue Shield Premium Plan" }]
      }
    }
  ]
};

// Initial historic observations (vitals)
const DEFAULT_OBSERVATIONS = [
  // Blood Pressure (systolic/diastolic in mmHg)
  { id: "obs-1", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Pressure" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-15T08:30:00Z", valueQuantity: { value: 120, unit: "mmHg", code: "systolic" }, component: [{ code: { text: "Systolic" }, valueQuantity: { value: 120, unit: "mmHg" } }, { code: { text: "Diastolic" }, valueQuantity: { value: 80, unit: "mmHg" } }] },
  { id: "obs-2", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Pressure" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-20T08:15:00Z", valueQuantity: { value: 122, unit: "mmHg", code: "systolic" }, component: [{ code: { text: "Systolic" }, valueQuantity: { value: 122, unit: "mmHg" } }, { code: { text: "Diastolic" }, valueQuantity: { value: 82, unit: "mmHg" } }] },
  { id: "obs-3", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Pressure" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-25T08:45:00Z", valueQuantity: { value: 118, unit: "mmHg", code: "systolic" }, component: [{ code: { text: "Systolic" }, valueQuantity: { value: 118, unit: "mmHg" } }, { code: { text: "Diastolic" }, valueQuantity: { value: 78, unit: "mmHg" } }] },
  { id: "obs-4", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Pressure" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-06-01T09:00:00Z", valueQuantity: { value: 116, unit: "mmHg", code: "systolic" }, component: [{ code: { text: "Systolic" }, valueQuantity: { value: 116, unit: "mmHg" } }, { code: { text: "Diastolic" }, valueQuantity: { value: 75, unit: "mmHg" } }] },

  // Blood Glucose (mg/dL)
  { id: "obs-5", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Glucose" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-15T08:35:00Z", valueQuantity: { value: 98, unit: "mg/dL" } },
  { id: "obs-6", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Glucose" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-20T08:20:00Z", valueQuantity: { value: 104, unit: "mg/dL" } },
  { id: "obs-7", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Glucose" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-25T08:50:00Z", valueQuantity: { value: 92, unit: "mg/dL" } },
  { id: "obs-8", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Blood Glucose" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-06-01T09:05:00Z", valueQuantity: { value: 89, unit: "mg/dL" } },

  // Weight (lbs)
  { id: "obs-9", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Weight" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-15T08:30:00Z", valueQuantity: { value: 182, unit: "lbs" } },
  { id: "obs-10", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Weight" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-20T08:15:00Z", valueQuantity: { value: 181, unit: "lbs" } },
  { id: "obs-11", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Weight" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-05-25T08:45:00Z", valueQuantity: { value: 179, unit: "lbs" } },
  { id: "obs-12", resourceType: "Observation", status: "final", category: [{ coding: [{ code: "vital-signs" }] }], code: { text: "Weight" }, subject: { reference: "Patient/pat-901" }, effectiveDateTime: "2026-06-01T09:00:00Z", valueQuantity: { value: 178, unit: "lbs" } }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "apt-1",
    resourceType: "Appointment",
    status: "booked",
    description: "Annual Wellness Checkup",
    start: "2026-06-15T10:00:00Z",
    end: "2026-06-15T10:30:00Z",
    participant: [
      { actor: { reference: "Practitioner/pract-1", display: "Dr. Sarah Jenkins, MD" }, status: "accepted" },
      { actor: { reference: "Patient/pat-901", display: "Alex Harrison" }, status: "accepted" }
    ],
    serviceType: [{ text: "Primary Care" }]
  }
];

// LocalStorage Helper to maintain state
const initializeStorage = () => {
  if (!localStorage.getItem("summit_patient")) {
    localStorage.setItem("summit_patient", JSON.stringify(DEFAULT_PATIENT));
  }
  if (!localStorage.getItem("summit_observations")) {
    localStorage.setItem("summit_observations", JSON.stringify(DEFAULT_OBSERVATIONS));
  }
  if (!localStorage.getItem("summit_appointments")) {
    localStorage.setItem("summit_appointments", JSON.stringify(DEFAULT_APPOINTMENTS));
  }
};

export const peakHealthClient = {
  // Setup data store
  init: () => {
    initializeStorage();
  },

  // Patient Info
  getPatient: () => {
    initializeStorage();
    return JSON.parse(localStorage.getItem("summit_patient"));
  },

  updatePatient: (updatedFields) => {
    initializeStorage();
    const patient = JSON.parse(localStorage.getItem("summit_patient"));
    const newPatient = { ...patient, ...updatedFields };
    localStorage.setItem("summit_patient", JSON.stringify(newPatient));
    return newPatient;
  },

  // Practitioner Directory
  getProviders: (specialty = "") => {
    if (!specialty) return DEFAULT_PROVIDERS;
    return DEFAULT_PROVIDERS.filter(p => 
      p.qualification[0].code.text.toLowerCase().includes(specialty.toLowerCase())
    );
  },

  getProviderById: (id) => {
    return DEFAULT_PROVIDERS.find(p => p.id === id) || null;
  },

  // Appointments / Visits
  getAppointments: () => {
    initializeStorage();
    return JSON.parse(localStorage.getItem("summit_appointments"));
  },

  createAppointment: (practitionerId, serviceType, dateTimeStr, description = "") => {
    initializeStorage();
    const list = JSON.parse(localStorage.getItem("summit_appointments"));
    const provider = DEFAULT_PROVIDERS.find(p => p.id === practitionerId);
    
    const newApt = {
      id: `apt-${Date.now()}`,
      resourceType: "Appointment",
      status: "booked",
      description: description || `${serviceType} Consultation`,
      start: new Date(dateTimeStr).toISOString(),
      end: new Date(new Date(dateTimeStr).getTime() + 30 * 60 * 1000).toISOString(), // +30m
      participant: [
        { actor: { reference: `Practitioner/${practitionerId}`, display: provider ? provider.name[0].text : "Unknown Provider" }, status: "accepted" },
        { actor: { reference: "Patient/pat-901", display: "Alex Harrison" }, status: "accepted" }
      ],
      serviceType: [{ text: serviceType }]
    };

    list.push(newApt);
    localStorage.setItem("summit_appointments", JSON.stringify(list));
    return newApt;
  },

  cancelAppointment: (id) => {
    initializeStorage();
    let list = JSON.parse(localStorage.getItem("summit_appointments"));
    list = list.filter(apt => apt.id !== id);
    localStorage.setItem("summit_appointments", JSON.stringify(list));
    return true;
  },

  // Vitals (Observations)
  getObservations: (codeText = "") => {
    initializeStorage();
    const list = JSON.parse(localStorage.getItem("summit_observations"));
    if (!codeText) return list;
    return list.filter(obs => obs.code.text.toLowerCase() === codeText.toLowerCase());
  },

  addObservation: (codeText, primaryValue, secondaryValue = null) => {
    initializeStorage();
    const list = JSON.parse(localStorage.getItem("summit_observations"));
    
    let obs = {
      id: `obs-${Date.now()}`,
      resourceType: "Observation",
      status: "final",
      category: [{ coding: [{ code: "vital-signs" }] }],
      code: { text: codeText },
      subject: { reference: "Patient/pat-901" },
      effectiveDateTime: new Date().toISOString(),
    };

    if (codeText.toLowerCase() === "blood pressure") {
      obs.valueQuantity = { value: Number(primaryValue), unit: "mmHg", code: "systolic" };
      obs.component = [
        { code: { text: "Systolic" }, valueQuantity: { value: Number(primaryValue), unit: "mmHg" } },
        { code: { text: "Diastolic" }, valueQuantity: { value: Number(secondaryValue), unit: "mmHg" } }
      ];
    } else {
      const unit = codeText.toLowerCase() === "weight" ? "lbs" : "mg/dL";
      obs.valueQuantity = { value: Number(primaryValue), unit };
    }

    list.push(obs);
    localStorage.setItem("summit_observations", JSON.stringify(list));
    return obs;
  }
};
