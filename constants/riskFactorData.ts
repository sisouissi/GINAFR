
export interface RiskFactor {
  id: string;
  label: string;
  weight: number;
}

export const adultRiskFactorsList: RiskFactor[] = [
  { id: 'intubation_history', label: 'Antécédent d\'intubation ou de séjour en USI pour asthme', weight: 3 },
  { id: 'exacerbation_history', label: '1 ou plusieurs exacerbations sévères au cours de la dernière année', weight: 3 },
  { id: 'saba_overuse', label: 'Surutilisation de SABA (>1 inhalateur/mois)', weight: 3 },
  { id: 'poor_adherence', label: 'Mauvaise observance du traitement de fond par CSI', weight: 2 },
  { id: 'inhaler_technique', label: 'Technique d\'inhalation incorrecte', weight: 2 },
  { id: 'low_fev1', label: 'VEMS bas (<60% de la valeur prédite)', weight: 2 },
  { id: 'psychosocial', label: 'Problèmes psychologiques ou socio-économiques majeurs', weight: 2 },
  { id: 'smoking', label: 'Fumeur actuel ou exposition au tabagisme passif', weight: 1 },
  { id: 'exposures', label: 'Exposition significative aux allergènes ou polluants', weight: 1 },
  { id: 'comorbidities', label: 'Comorbidités (obésité, rhinosinusite, allergie alimentaire)', weight: 1 },
];

export const childRiskFactorsList: RiskFactor[] = [
  { id: 'uncontrolled_asthma', label: 'Symptômes d\'asthme non contrôlés actuellement', weight: 3 },
  { id: 'exacerbation_history', label: '1 ou plusieurs exacerbations sévères au cours de la dernière année', weight: 3 },
  { id: 'food_allergy', label: 'Allergie alimentaire confirmée', weight: 2 },
  { id: 'low_fev1', label: 'VEMS bas (<60% de la valeur prédite) ou forte réversibilité', weight: 2 },
  { id: 'poor_adherence', label: 'Mauvaise observance du traitement de fond', weight: 2 },
  { id: 'inhaler_technique', label: 'Technique d\'inhalation incorrecte', weight: 2 },
  { id: 'psychosocial', label: 'Problèmes psychologiques ou socio-économiques majeurs', weight: 2 },
  { id: 'smoking_exposure', label: 'Exposition au tabagisme passif', weight: 1 },
  { id: 'allergen_exposure', label: 'Forte exposition aux allergènes (si sensibilisé)', weight: 1 },
  { id: 'obesity', label: 'Obésité', weight: 1 },
];