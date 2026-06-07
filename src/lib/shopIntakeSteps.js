/** Fixed 9-step clinical intake wizard (SummitMD shop). */

export const INTAKE_TOTAL_STEPS = 9;

export const INTAKE_STEP_LABELS = [
  "Treatment Goals",
  "Health Background",
  "Vitals & Demographics",
  "Safety Screening",
  "Clinical History",
  "Contact & Consent",
  "Clinical Review",
  "Your Plan",
  "Patient Login",
];

export const STEP_CONTACT = 5;
export const STEP_LOADING = 6;
export const STEP_PLAN = 7;
export const STEP_PORTAL = 8;

const GENERIC_PADDING_QUESTIONS = [
  {
    id: "age_confirm",
    type: "singleselect",
    question: "Confirm your eligibility age",
    sub: "Telehealth clinical programs require patients to be 18 years or older.",
    options: [
      { label: "Yes, I am 18 years or older", value: "yes" },
      {
        label: "No, I am under 18",
        value: "no",
        warning:
          "Patients under 18 require guardian consent. Contact SummitMD support for pediatric programs.",
      },
    ],
  },
  {
    id: "state_residence",
    type: "singleselect",
    question: "Which state do you currently reside in?",
    sub: "Licensed providers must verify your state for telehealth prescribing.",
    options: [
      { label: "California", value: "CA" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "New York", value: "NY" },
      { label: "Other U.S. state", value: "other" },
    ],
  },
  {
    id: "medications",
    type: "singleselect",
    question: "Are you currently taking prescription medications?",
    sub: "Helps our clinicians review potential interactions before approval.",
    options: [
      { label: "Yes, I take one or more prescriptions", value: "yes" },
      { label: "No active prescription medications", value: "no" },
      { label: "Prefer not to say", value: "unspecified" },
    ],
  },
];

/** Pad product-specific questions to exactly 5 clinical steps (0–4). */
export function buildClinicalSteps(productQuestions = []) {
  const steps = [...productQuestions];
  let padIndex = 0;
  while (steps.length < 5 && padIndex < GENERIC_PADDING_QUESTIONS.length) {
    const filler = GENERIC_PADDING_QUESTIONS[padIndex];
    if (!steps.some((q) => q.id === filler.id)) {
      steps.push(filler);
    }
    padIndex += 1;
  }
  return steps.slice(0, 5);
}

export function validateClinicalStep(question, answers, vitals = {}) {
  if (!question) return { ok: true };

  if (question.type === "vitals") {
    const { heightFeet, heightInches, weight, dob } = vitals;
    if (!heightFeet || !heightInches || !weight || !dob) {
      return { ok: false, message: "Please fill out all vitals values." };
    }
    return { ok: true };
  }

  if (question.type === "multiselect") {
    const selected = answers[question.id];
    if (!selected || selected.length === 0) {
      return { ok: false, message: "Please select at least one option." };
    }
    return { ok: true };
  }

  if (question.type === "singleselect") {
    if (!answers[question.id]) {
      return { ok: false, message: "Please select an option." };
    }
    return { ok: true };
  }

  return { ok: true };
}

export function validateContactStep({ name, email, phone, consent }) {
  if (!name?.trim()) {
    return { ok: false, message: "Please enter your full name." };
  }
  if (!email?.trim() || !email.includes("@")) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!phone?.trim()) {
    return { ok: false, message: "Please enter your phone number." };
  }
  if (!consent) {
    return { ok: false, message: "Please confirm the telehealth consent to continue." };
  }
  return { ok: true };
}

/** Skip vitals UI for non–weight-loss products — show age confirm instead. */
export function isVitalsStepActive(product, question) {
  if (question?.type !== "vitals") return true;
  return product?.id?.includes("weightloss");
}

export function resolveVitalsStepQuestion(product, question) {
  if (isVitalsStepActive(product, question)) return question;
  return GENERIC_PADDING_QUESTIONS[0];
}

export function intakeProgressPercent(stepIndex) {
  return Math.min(Math.round((stepIndex / (INTAKE_TOTAL_STEPS - 1)) * 100), 100);
}
