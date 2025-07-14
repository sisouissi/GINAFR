




export type AgeGroup = 'adult' | 'child' | 'youngChild';

// Niveaux de contrôle
export type ControlLevel = 'wellControlled' | 'partlyControlled' | 'uncontrolled';

// Historique des résultats de test
export interface TestResult {
    date: string; // chaîne ISO
    score: number;
}


// Types spécifiques aux adultes
export type AdultSymptomFrequency =
  | 'lessThanTwiceAMonth'
  | 'twiceAMonthOrMore'
  | 'mostDaysOrWakingWeekly'
  | 'severeDailyOrExacerbation';

export type AdultPathway = 'pathway1' | 'pathway2'; // Voie 1 : ICS-formotérol MART, Voie 2 : SABA + autre contrôleur

// Types spécifiques aux enfants (6-11 ans)
export type ChildGINASteps = 1 | 2 | 3 | 4;
export type ChildPathway = 'track1' | 'track2'; // Voie 1 : MART, Voie 2 : Secours SABA classique


// Types spécifiques aux jeunes enfants (<=5 ans)
export type YoungChildSymptomPattern =
  | 'infrequentViralWheeze' 
  | 'persistentAsthmaOrFrequentWheeze'; 

export type YoungChildGinaSteps = 1 | 2 | 3 | 4;
// Identifie la stratégie de traitement choisie dans un palier GINA, 'preferred' ou l'ID d'une alternative.
export type YoungChildTreatmentStrategyKey = string; // ex: 'DAILY_LTRA', 'INTERMITTENT_ICS_STEP1' etc.

export interface YoungChildDiagnosisCriteria {
  criterion1: boolean; // Épisodes récurrents
  criterion2: boolean; // Aucune cause alternative
  criterion3: boolean; // Réponse au traitement
}

export type ExacerbationSeverity = 'mildModerate' | 'severe';

// --- Structure de données pour l'asthme sévère (Nouveau flux en 11 étapes) ---
export interface SevereAsthmaBasicInfo {
    age: string;
    diagnosis: 'unconfirmed' | 'confirmed';
    asthmaOnset: 'childhood' | 'adult';
    exacerbationsLastYear: string;
    hospitalizationsLastYear: string;
    sabaUse: string;
}

export interface SevereAsthmaSymptoms {
    poorControl: boolean;
    frequentExacerbations: boolean;
    nightWaking: boolean;
    activityLimitation: boolean;
    frequentSabaUse: boolean;
    allergenDriven: boolean;
}

export interface SevereAsthmaMedications {
    icsLaba: boolean;
    icsDose: 'low' | 'medium' | 'high';
    ocs: boolean;
    maintenanceOcs: boolean;
    ocsDose: string;
    adherence: 'good' | 'suboptimal' | 'poor' | 'unknown';
    inhalerTechnique: 'correct' | 'incorrect' | 'unknown';
    mart: boolean;
    lama: boolean;
    ltra: boolean;
    azithromycin: boolean;
    biologicsAvailable: 'yes' | 'no' | null;
}

export interface SevereAsthmaBiomarkers {
    bloodEosinophils: string;
    feNo: string;
    sputumEosinophils: string;
    totalIgE: string;
    specificIgE: boolean;
    skinPrickTest: boolean;
    fev1: string;
    fev1Predicted: string;
}

export interface SevereAsthmaInvestigations {
    chestXray: boolean;
    hrct: boolean;
    allergyTesting: boolean;
    boneDensity: boolean;
    parasiteScreen: boolean;
    cardiacAssessment: boolean;
}

export interface SevereAsthmaPatientData {
    basicInfo: SevereAsthmaBasicInfo;
    symptoms: SevereAsthmaSymptoms;
    medications: SevereAsthmaMedications;
    biomarkers: SevereAsthmaBiomarkers;
    comorbidities: string[];
    riskFactors: string[];
    investigations: SevereAsthmaInvestigations;
}

export interface SevereAsthmaAssessmentResults {
    difficultToTreat: boolean;
    severeAsthma: boolean;
    type2Inflammation: boolean;
    eligibleForBiologics: boolean;
}


export interface PatientData {
  age: string | null; // ex: "12+ ans", "6-11 ans", "<=5 ans"
  ageGroup: AgeGroup | null;
  diagnosisConfirmed: boolean | null;

  // Spécifique aux adultes
  adult_symptomFrequency: AdultSymptomFrequency | null;
  adult_controlLevel: ControlLevel | null;
  adult_pathway: AdultPathway | null;
  adult_currentGinaStep: 1 | 2 | 3 | 4 | 5 | null;
  adult_riskFactors: string[];
  adult_reviewReminderDate: string | null;

  // Spécifique aux enfants (6-11 ans)
  child_currentGinaStep: ChildGINASteps | null;
  child_pathway: ChildPathway | null;
  child_controlLevel: ControlLevel | null;
  child_riskFactors: string[];
  child_reviewReminderDate: string | null;


  // Spécifique aux jeunes enfants (<=5 ans)
  youngChild_symptomPattern: YoungChildSymptomPattern | null;
  youngChild_currentGinaStep: YoungChildGinaSteps | null;
  youngChild_currentTreatmentStrategy: YoungChildTreatmentStrategyKey | null; 
  youngChild_diagnosisCriteria: YoungChildDiagnosisCriteria | null;
  youngChild_controlLevel: ControlLevel | null;
  youngChild_reviewReminderDate: string | null;
  youngChild_riskFactors: string[];
  
  // Commun pour les exacerbations
  exacerbationSeverity: ExacerbationSeverity | null;

  // Asthme sévère
  severeAsthma: SevereAsthmaPatientData;
  severeAsthmaAssessment: SevereAsthmaAssessmentResults;

  // Historiques des tests pour le suivi longitudinal
  actHistory: TestResult[];
  acqHistory: TestResult[];
  cactHistory: TestResult[];
}

export const initialPatientData: PatientData = {
  age: null,
  ageGroup: null,
  diagnosisConfirmed: null,

  adult_symptomFrequency: null,
  adult_controlLevel: null,
  adult_pathway: null,
  adult_currentGinaStep: null,
  adult_riskFactors: [],
  adult_reviewReminderDate: null,

  child_currentGinaStep: null,
  child_pathway: null,
  child_controlLevel: null,
  child_riskFactors: [],
  child_reviewReminderDate: null,

  youngChild_symptomPattern: null,
  youngChild_currentGinaStep: null,
  youngChild_currentTreatmentStrategy: 'preferred',
  youngChild_diagnosisCriteria: { criterion1: false, criterion2: false, criterion3: false },
  youngChild_controlLevel: null,
  youngChild_reviewReminderDate: null,
  youngChild_riskFactors: [],

  exacerbationSeverity: null,

  severeAsthma: {
    basicInfo: { age: '', diagnosis: 'unconfirmed', asthmaOnset: 'adult', exacerbationsLastYear: '', hospitalizationsLastYear: '', sabaUse: '' },
    symptoms: { poorControl: false, frequentExacerbations: false, nightWaking: false, activityLimitation: false, frequentSabaUse: false, allergenDriven: false },
    medications: { icsLaba: true, icsDose: 'high', ocs: false, maintenanceOcs: false, ocsDose: '', adherence: 'good', inhalerTechnique: 'correct', mart: false, lama: false, ltra: false, azithromycin: false, biologicsAvailable: null },
    biomarkers: { bloodEosinophils: '', feNo: '', sputumEosinophils: '', totalIgE: '', specificIgE: false, skinPrickTest: false, fev1: '', fev1Predicted: '' },
    comorbidities: [],
    riskFactors: [],
    investigations: { chestXray: false, hrct: false, allergyTesting: false, boneDensity: false, parasiteScreen: false, cardiacAssessment: false }
  },
  severeAsthmaAssessment: {
    difficultToTreat: false,
    severeAsthma: false,
    type2Inflammation: false,
    eligibleForBiologics: false
  },

  actHistory: [],
  acqHistory: [],
  cactHistory: [],
};

export type StepId =
  | 'INITIAL_STEP'
  // Commun
  | 'DIAGNOSIS_PENDING_STEP'
  | 'ABBREVIATIONS_STEP' 
  | 'INITIAL_DIAGNOSIS_FLOWCHART_STEP'
  | 'STEP_DOWN_ASSESS_STEP'
  | 'STEP_DOWN_ADJUST_STEP'
  | 'STEP_DOWN_REVIEW_STEP'
  // Adulte
  | 'ADULT_DIAGNOSIS_STEP'
  | 'ADULT_SYMPTOM_FREQUENCY_STEP'
  | 'ADULT_RISK_ASSESSMENT_STEP'
  | 'ADULT_PATHWAY_SELECTION_STEP'
  | 'ADULT_TREATMENT_PLAN_STEP'
  | 'ADULT_CONTROL_ASSESSMENT_STEP'
  | 'ADULT_EXACERBATION_INTRO_STEP'
  | 'ADULT_EXACERBATION_SEVERITY_STEP'
  | 'ADULT_EXACERBATION_PLAN_STEP'
  | 'ADULT_PRINT_REPORT'
  // Enfant (6-11)
  | 'CHILD_DIAGNOSIS_STEP'
  | 'CHILD_INITIAL_ASSESSMENT_STEP'
  | 'CHILD_RISK_ASSESSMENT_STEP'
  | 'CHILD_PATHWAY_SELECTION_STEP'
  | 'CHILD_TREATMENT_PLAN_STEP'
  | 'CHILD_CONTROL_ASSESSMENT_STEP'
  | 'CHILD_EXACERBATION_INTRO_STEP'
  | 'CHILD_EXACERBATION_SEVERITY_STEP'
  | 'CHILD_EXACERBATION_PLAN_STEP'
  | 'CHILD_PRINT_REPORT'
  // Jeune enfant (<=5)
  | 'YOUNG_CHILD_DIAGNOSIS_STEP'
  | 'YOUNG_CHILD_RISK_ASSESSMENT_STEP'
  | 'YOUNG_CHILD_SUSPECTED_ASTHMA_STEP'
  | 'YOUNG_CHILD_SYMPTOM_PATTERN_STEP'
  | 'YOUNG_CHILD_TREATMENT_PLAN_STEP'
  | 'YOUNG_CHILD_CONTROL_ASSESSMENT_STEP'
  | 'YOUNG_CHILD_EXACERBATION_INTRO_STEP'
  | 'YOUNG_CHILD_EXACERBATION_SEVERITY_STEP'
  | 'YOUNG_CHILD_EXACERBATION_PLAN_STEP'
  | 'YOUNG_CHILD_PRINT_REPORT'
  // Asthme sévère (flux en 11 étapes)
  | 'SEVERE_ASTHMA_STAGE_1'
  | 'SEVERE_ASTHMA_STAGE_2'
  | 'SEVERE_ASTHMA_STAGE_3'
  | 'SEVERE_ASTHMA_STAGE_4'
  | 'SEVERE_ASTHMA_STAGE_5'
  | 'SEVERE_ASTHMA_STAGE_6'
  | 'SEVERE_ASTHMA_STAGE_7'
  | 'SEVERE_ASTHMA_STAGE_8'
  | 'SEVERE_ASTHMA_STAGE_9'
  | 'SEVERE_ASTHMA_STAGE_10'
  | 'SEVERE_ASTHMA_STAGE_11';


// Structures de données de traitement
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

export interface ChildTreatmentOptions {
  track1: { [key in ChildGINASteps]?: TreatmentDetail };
  track2: { [key in ChildGINASteps]?: TreatmentDetail };
}

export interface YoungChildAlternativeTreatment extends TreatmentDetail {
  id: YoungChildTreatmentStrategyKey; // ex: 'DAILY_LTRA', 'INTERMITTENT_ICS'
  name: string; // Nom convivial pour le bouton/option
}

export interface YoungChildStepTreatment {
  stepDescription?: string; // ex: "Palier 1 : SABA de secours à la demande. Option de CSI intermittent si indiqué."
  preferred: TreatmentDetail; // Le traitement principal/préféré pour ce palier GINA
  alternatives?: YoungChildAlternativeTreatment[];
}

export type YoungChildTreatmentOptions = {
  [key in YoungChildGinaSteps]?: YoungChildStepTreatment;
};

// Types pour l'Assistant IA
export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}