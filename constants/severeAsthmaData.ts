
import { PatientData } from "../types";

export const comorbidityOptions = [
    "Rhinosinusite chronique avec polypes nasaux (RSCaPN)",
    "Rhinosinusite chronique sans polypes nasaux (RSCaSP)",
    "Rhinite allergique",
    "RGO (Reflux gastro-œsophagien)",
    "SAOS (Syndrome d'apnées obstructives du sommeil)",
    "Obésité",
    "Anxiété/Dépression",
    "BPCO",
    "Bronchectasie",
    "Dysfonction des cordes vocales (DCV)",
    "Obstruction laryngée inductible (OLI)",
    "Dermatite atopique",
    "ABPA (Aspergillose bronchopulmonaire allergique)",
    "MREH (Maladie respiratoire exacerbée par l'aspirine)",
    "Maladie cardiaque",
    "Ostéoporose/Cyphose",
    "Allergies alimentaires/Antécédents d'anaphylaxie"
];

export const riskFactorOptions = [
    "Tabagisme/Vapotage",
    "Exposition au tabagisme passif",
    "Exposition à des allergènes professionnels",
    "Pollution de l'air intérieur",
    "Pollution de l'air extérieur",
    "Bêta-bloquants (y compris collyres)",
    "AINS",
    "Technique d'inhalation incorrecte (jusqu'à 80% des patients)",
    "Mauvaise observance (jusqu'à 75% des patients)",
    "Surutilisation de SABA (3 cartouches/an augmente le risque, 12 ou plus/an augmente le risque de mortalité)",
    "Exposition aux allergènes environnementaux",
    "Moisissures et produits chimiques nocifs",
    "Exposition aux virus respiratoires",
    "Inhibiteurs du P450 (ex: itraconazole)"
];

export const biologicOptions = [
    {
      name: "Omalizumab (Anti-IgE)",
      indication: "Asthme allergique sévère",
      criteria: "Sensibilisation aux allergènes inhalés, IgE totales dans la plage de dosage, Exacerbations l'année dernière",
      predictors: "Asthme d'apparition dans l'enfance, Symptômes d'origine allergique",
      mechanism: "Lie les IgE libres, empêche la liaison au FcεR1",
      administration: "SC toutes les 2-4 semaines, dosage basé sur le poids/IgE",
      efficacy: "↓ 44% exacerbations sévères, ↑ Qualité de vie",
      benefits: "Polypes nasaux, urticaire chronique",
      safety: "Réactions au site d'injection, anaphylaxie 0.2%"
    },
    {
      name: "Mépolizumab (Anti-IL5)",
      indication: "Asthme éosinophilique sévère",
      criteria: "Éosinophiles sanguins >= 150-300/μL, Exacerbations l'année dernière",
      predictors: "Taux d'éosinophiles sanguins plus élevé, Asthme d'apparition à l'âge adulte, Polypes nasaux",
      mechanism: "Lie l'IL-5 circulante",
      administration: "100mg SC toutes les 4 semaines (>=12 ans), 40mg (6-11 ans)",
      efficacy: "↓ 47-54% exacerbations sévères, ↓ 50% CSO",
      benefits: "Polypes nasaux, GEPA, hyperéosinophilie",
      safety: "Généralement bien toléré, rare anaphylaxie"
    },
    {
      name: "Benralizumab (Anti-IL5Rα)",
      indication: "Asthme éosinophilique sévère",
      criteria: "Éosinophiles sanguins >= 150-300/μL, Exacerbations l'année dernière",
      predictors: "Taux d'éosinophiles sanguins plus élevé, Asthme d'apparition à l'âge adulte, Polypes nasaux",
      mechanism: "Lie l'IL-5Rα, provoque l'apoptose des éosinophiles",
      administration: "30mg SC toutes les 4 sem. x3, puis toutes les 8 sem.",
      efficacy: "↓ 47-54% exacerbations sévères, ↓ 50% CSO",
      benefits: "Polypes nasaux, GEPA, hyperéosinophilie",
      safety: "Généralement bien toléré, rare anaphylaxie"
    },
    {
      name: "Dupilumab (Anti-IL4Rα)",
      indication: "Asthme éosinophilique/Type 2 sévère",
      criteria: "Éosinophiles sanguins >= 150/μL OU FeNO >= 25 ppb OU CSO de fond",
      predictors: "Taux d'éosinophiles sanguins plus élevé, FeNO plus élevé",
      mechanism: "Bloque la signalisation de l'IL-4 et de l'IL-13",
      administration: "200-300mg SC toutes les 2 semaines",
      efficacy: "↓ 56% exacerbations sévères, ↓ 50% CSO",
      benefits: "Dermatite atopique, polypes nasaux, BPCO",
      safety: "Réactions au site d'injection, éosinophilie transitoire 4-13%"
    },
    {
      name: "Tézéplumab (Anti-TSLP)",
      indication: "Asthme sévère",
      criteria: "Exacerbations sévères l'année dernière",
      predictors: "Taux d'éosinophiles sanguins plus élevé, FeNO plus élevé",
      mechanism: "Lie la TSLP circulante (alarmine)",
      administration: "210mg SC toutes les 4 semaines",
      efficacy: "↓ 30-70% exacerbations sévères",
      benefits: "Efficace quel que soit le statut allergique",
      safety: "Généralement bien toléré, similaire au placebo"
    }
];

export const getBiologicRecommendation = (patientData: PatientData) => {
    const { severeAsthma: data, severeAsthmaAssessment: assessmentResults } = patientData;
    
    if (!assessmentResults.eligibleForBiologics) {
      return null;
    }

    const eosinophils = parseInt(data.biomarkers.bloodEosinophils) || 0;
    const feNo = parseInt(data.biomarkers.feNo) || 0;
    const totalIgE = parseInt(data.biomarkers.totalIgE) || 0;
    const fev1 = parseInt(data.biomarkers.fev1Predicted) || 100;
    const exacerbations = parseInt(data.basicInfo.exacerbationsLastYear) || 0;
    const hasNasalPolyps = data.comorbidities.includes("Rhinosinusite chronique avec polypes nasaux (RSCaPN)");
    const hasAtopicDermatitis = data.comorbidities.includes("Dermatite atopique");
    const hasAERD = data.comorbidities.includes("MREH (Maladie respiratoire exacerbée par l'aspirine)");
    const isOnOCS = data.medications.ocs || data.medications.maintenanceOcs;
    const hasAllergenSensitization = data.biomarkers.specificIgE || data.biomarkers.skinPrickTest;
    const isChildhoodOnset = data.basicInfo.asthmaOnset === 'childhood';
    const isAdultOnset = data.basicInfo.asthmaOnset === 'adult';

    let recommendations = [];

    // Omalizumab (Anti-IgE) - Severe Allergic Phenotype
    if (totalIgE >= 30 && totalIgE <= 1500 && hasAllergenSensitization && exacerbations >= 1) {
      let score = 80;
      if (isChildhoodOnset) score += 10;
      if (data.symptoms.allergenDriven) score += 10;
      if (hasNasalPolyps) score += 5;
      if (eosinophils >= 260) score += 5;
      if (feNo >= 19.5) score += 5;
      
      recommendations.push({
        drug: "Omalizumab (Anti-IgE)",
        score: Math.min(score, 100),
        reason: `Asthme allergique sévère avec IgE ${totalIgE} IU/mL (plage 30-1500)${isChildhoodOnset ? ', apparition dans l\'enfance' : ''}${data.symptoms.allergenDriven ? ', symptômes allergéniques' : ''}`,
        strength: score >= 90 ? "Fortement Recommandé" : "Recommandé",
        eligibility: "✓ Sensibilisation aux allergènes, ✓ IgE dans la plage de dosage, ✓ Exacerbations récentes",
        trialDuration: "Au moins 4 mois",
        monitoring: "Surveiller les réactions d'hypersensibilité (0.2% d'anaphylaxie)"
      });
    }

    // Mepolizumab (Anti-IL5) - Eosinophilic Phenotype
    if (eosinophils >= 150 && exacerbations >= 1) {
      let score = 75;
      if (eosinophils >= 300) score += 15; // Fortement prédictif
      if (hasNasalPolyps) score += 10;
      if (isAdultOnset) score += 8;
      if (isOnOCS) score += 10;
      if (exacerbations >= 3) score += 8; // Fortement prédictif
      if (fev1 < 65) score += 5;
      
      recommendations.push({
        drug: "Mépolizumab (Anti-IL5)",
        score: Math.min(score, 100),
        reason: `Asthme éosinophilique avec ${eosinophils}/μL éosinophiles${hasNasalPolyps ? ', polypes nasaux' : ''}${isAdultOnset ? ', apparition à l\'âge adulte' : ''}${isOnOCS ? ', dépendant des CSO' : ''}`,
        strength: score >= 90 ? "Fortement Recommandé" : "Recommandé",
        eligibility: `✓ Eos ${eosinophils}/μL (>= 150/μL), ✓ 1+ exacerbation/an`,
        trialDuration: "Au moins 4 mois",
        monitoring: "Réduction des CSO d'~50% si applicable, surveiller la fonction pulmonaire"
      });
    }

    // Benralizumab (Anti-IL5Rα) - Eosinophilic Phenotype (complete depletion)
    if (eosinophils >= 150 && exacerbations >= 1) {
      let score = 78; // Légèrement plus élevé que le mépolizumab pour la déplétion complète
      if (eosinophils >= 300) score += 15;
      if (hasNasalPolyps) score += 10;
      if (isAdultOnset) score += 8;
      if (isOnOCS) score += 10;
      if (exacerbations >= 3) score += 8;
      if (fev1 < 65) score += 5;
      
      recommendations.push({
        drug: "Benralizumab (Anti-IL5Rα)",
        score: Math.min(score, 100),
        reason: `Asthme éosinophilique avec ${eosinophils}/μL, déplétion complète des éosinophiles${hasNasalPolyps ? ', polypes nasaux' : ''}`,
        strength: score >= 90 ? "Fortement Recommandé" : "Recommandé",
        eligibility: `✓ Eos ${eosinophils}/μL (>= 150/μL), ✓ 1+ exacerbation/an`,
        trialDuration: "Au moins 4 mois",
        monitoring: "Déplétion quasi complète des éosinophiles, réduction des CSO d'~50%"
      });
    }

    // Dupilumab (Anti-IL4Rα) - Type 2 or OCS-dependent
    if ((eosinophils >= 150 && eosinophils <= 1500) || feNo >= 25 || isOnOCS) {
      let score = 82;
      if (eosinophils >= 300) score += 12; // Fortement prédictif
      if (feNo >= 50) score += 12; // Fortement prédictif
      if (hasNasalPolyps) score += 15; // Excellent pour les polypes
      if (hasAtopicDermatitis) score += 10;
      if (isOnOCS) score += 20; // Excellent effet d'épargne en CSO
      if (hasAERD) score += 8;
      
      recommendations.push({
        drug: "Dupilumab (Anti-IL4Rα)",
        score: Math.min(score, 100),
        reason: `Inflammation de type 2${isOnOCS ? ', dépendant des CSO' : ''}${hasNasalPolyps ? ', polypes nasaux' : ''}${hasAtopicDermatitis ? ', dermatite atopique' : ''}`,
        strength: (isOnOCS || hasNasalPolyps || hasAtopicDermatitis) ? "Fortement Recommandé" : "Recommandé",
        eligibility: `✓ Eos >= 150/μL OU FeNO >= 25 ppb OU dépendant des CSO`,
        trialDuration: "Au moins 4 mois",
        monitoring: "Réduction des CSO de 50%, surveiller l'éosinophilie transitoire (4-13%)"
      });
    }

    // Tezepelumab (Anti-TSLP) - All severe asthma phenotypes
    if (assessmentResults.severeAsthma && exacerbations >= 1) {
      let score = 70;
      if (eosinophils >= 300) score += 12; // Fortement prédictif
      if (feNo >= 50) score += 12; // Fortement prédictif
      if (eosinophils < 150 && feNo < 25) score += 25; // Excellent pour le phénotype Non-Type 2
      if (exacerbations >= 3) score += 8;
      
      recommendations.push({
        drug: "Tézéplumab (Anti-TSLP)",
        score: Math.min(score, 100),
        reason: `Asthme sévère${(eosinophils < 150 && feNo < 25) ? ', phénotype Non-Type 2' : ', tous phénotypes'}, ${exacerbations} exacerbations/an`,
        strength: (eosinophils < 150 && feNo < 25) ? "Fortement Recommandé (Non-Type 2)" : "Recommandé",
        eligibility: `✓ Asthme sévère, ✓ 1 ou plusieurs exacerbations/an`,
        trialDuration: "Au moins 4 mois",
        monitoring: "Efficace quel que soit le statut allergique, surveiller les infections"
      });
    }

    return recommendations.sort((a, b) => b.score - a.score);
};