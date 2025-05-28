export type AgeGroup = 'adult' | 'child' | 'youngChild';

// Adult specific types
export type AdultSymptomFrequency =
  | 'lessThanTwiceAMonth'
  | 'twiceAMonthOrMore'
  | 'mostDaysOrWakingWeekly'
  | 'severeDailyOrExacerbation';

export type AdultControlLevel = 'wellControlled' | 'partlyControlled' | 'uncontrolled';
export type AdultPathway = 'pathway1' | 'pathway2'; // Pathway 1: ICS-formoterol MART, Pathway 2: SABA + other controller

// Child (6-11) specific types
export type ChildInitialAssessment =
  | 'infrequentOrMild' // Step 1
  | 'symptomsTwiceAMonth' // Step 2
  | 'troublesomeDailyOrWaking' // Step 3
  | 'uncontrolledOnStep3'; // Step 4
export type ChildPathway = 'track1' | 'track2'; // Track 1: MART, Track 2: Classic SABA reliever


// Young Child (<=5) specific types
export type YoungChildSymptomPattern =
  | 'infrequentViralWheeze' 
  | 'persistentAsthmaOrFrequentWheeze'; 

export type YoungChildGinaSteps = 1 | 2 | 3 | 4;
// Identifies the chosen treatment strategy within a GINA step, 'preferred' or an alternative's ID.
export type YoungChildTreatmentStrategyKey = string; // e.g., 'preferred', 'DAILY_LTRA', 'INTERMITTENT_ICS_STEP1' etc.


export type ExacerbationSeverity = 'mildModerate' | 'severe';

export interface PatientData {
  age: string | null; // e.g., "12+", "6-11", "≤5"
  ageGroup: AgeGroup | null;
  diagnosisConfirmed: boolean | null;

  // Adult specific
  adult_symptomFrequency: AdultSymptomFrequency | null;
  adult_controlLevel: AdultControlLevel | null;
  adult_pathway: AdultPathway | null;
  adult_currentGinaStep: 1 | 2 | 3 | 4 | 5 | null;

  // Child (6-11) specific
  child_initialAssessment: ChildInitialAssessment | null;
  child_pathway: ChildPathway | null;
  child_currentGinaStep: 1 | 2 | 3 | 4 | null;

  // Young Child (<=5) specific
  youngChild_symptomPattern: YoungChildSymptomPattern | null;
  youngChild_currentGinaStep: YoungChildGinaSteps | null;
  youngChild_currentTreatmentStrategy: YoungChildTreatmentStrategyKey | null; 
  
  // Common for exacerbations
  exacerbationSeverity: ExacerbationSeverity | null;
}

export const initialPatientData: PatientData = {
  age: null,
  ageGroup: null,
  diagnosisConfirmed: null,

  adult_symptomFrequency: null,
  adult_controlLevel: null,
  adult_pathway: null,
  adult_currentGinaStep: null,

  child_initialAssessment: null,
  child_pathway: null,
  child_currentGinaStep: null,

  youngChild_symptomPattern: null,
  youngChild_currentGinaStep: null,
  youngChild_currentTreatmentStrategy: 'preferred', // Default to preferred strategy

  exacerbationSeverity: null,
};

export type StepId =
  | 'INITIAL_STEP'
  // Common
  | 'DIAGNOSIS_PENDING_STEP'
  | 'ABBREVIATIONS_STEP' // Ajout de la nouvelle étape
  // Adult
  | 'ADULT_DIAGNOSIS_STEP'
  | 'ADULT_SYMPTOM_FREQUENCY_STEP'
  | 'ADULT_PATHWAY_SELECTION_STEP'
  | 'ADULT_TREATMENT_PLAN_STEP'
  | 'ADULT_CONTROL_ASSESSMENT_STEP'
  | 'ADULT_FOLLOW_UP_STEP'
  | 'ADULT_EXACERBATION_INTRO_STEP'
  | 'ADULT_EXACERBATION_SEVERITY_STEP'
  | 'ADULT_EXACERBATION_PLAN_STEP'
  // Child (6-11)
  | 'CHILD_DIAGNOSIS_STEP'
  | 'CHILD_INITIAL_ASSESSMENT_STEP'
  | 'CHILD_PATHWAY_SELECTION_STEP'
  | 'CHILD_TREATMENT_PLAN_STEP'
  | 'CHILD_FOLLOW_UP_STEP'
  | 'CHILD_EXACERBATION_INTRO_STEP'
  | 'CHILD_EXACERBATION_SEVERITY_STEP'
  | 'CHILD_EXACERBATION_PLAN_STEP'
  // Young Child (<=5)
  | 'YOUNG_CHILD_DIAGNOSIS_STEP'
  | 'YOUNG_CHILD_SYMPTOM_PATTERN_STEP'
  | 'YOUNG_CHILD_TREATMENT_PLAN_STEP'
  // | 'YOUNG_CHILD_REASSESS_STEP' // This step is removed
  | 'YOUNG_CHILD_FOLLOW_UP_STEP'
  | 'YOUNG_CHILD_EXACERBATION_INTRO_STEP'
  | 'YOUNG_CHILD_EXACERBATION_SEVERITY_STEP'
  | 'YOUNG_CHILD_EXACERBATION_PLAN_STEP';


// Treatment data structures
export interface TreatmentDetail {
  name?: string; 
  reliever?: string;
  controller?: string;
  additional?: string | string[];
  notes?: string | string[];
  keyPoints?: string[];
  referral?: string;
}

export interface AdultTreatmentOptions {
  pathway1: { [key in 1 | 2 | 3 | 4 | 5]?: TreatmentDetail };
  pathway2: { [key in 1 | 2 | 3 | 4 | 5]?: TreatmentDetail };
}

export type ChildGINASteps = 1 | 2 | 3 | 4; 
export interface ChildTreatmentOptions {
  track1: { [key in ChildGINASteps]?: TreatmentDetail };
  track2: { [key in ChildGINASteps]?: TreatmentDetail };
}

export interface YoungChildAlternativeTreatment extends TreatmentDetail {
  id: YoungChildTreatmentStrategyKey; // e.g., 'DAILY_LTRA', 'INTERMITTENT_ICS'
  name: string; // User-friendly name for the button/option
}

export interface YoungChildStepTreatment {
  stepDescription?: string; // e.g., "Palier 1: Soulageur BACA PRN. Option contrôleur intermittent si indiqué."
  preferred: TreatmentDetail; // The main/preferred treatment for this GINA step
  alternatives?: YoungChildAlternativeTreatment[];
}

export type YoungChildTreatmentOptions = {
  [key in YoungChildGinaSteps]?: YoungChildStepTreatment;
};

// Type for the young child reassess options (if needed, though it's being removed)
// export type YoungChildReassessOption = 'continue' | 'stepUp' | 'considerStopping' | null; // This type is no longer needed