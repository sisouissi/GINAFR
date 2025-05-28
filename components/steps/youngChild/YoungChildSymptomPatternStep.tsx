import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import { YoungChildSymptomPattern, YoungChildGinaSteps, YoungChildTreatmentStrategyKey } from '../../../types';
import { ChevronRight, HelpCircle, Baby } from 'lucide-react';

const YoungChildSymptomPatternStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (
    pattern: YoungChildSymptomPattern, 
    initialGinaStep: YoungChildGinaSteps
  ) => {
    navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP', {
      youngChild_symptomPattern: pattern,
      youngChild_currentGinaStep: initialGinaStep,
      youngChild_currentTreatmentStrategy: 'preferred', // Default to preferred strategy of the target step
    });
  };
  
  const options = [
    {
      label: "Sibilances virales peu fréquentes ET peu de symptômes entre les épisodes",
      description: "Moins de 3 épisodes/an, asymptomatique entre. Palier GINA 1 envisagé.",
      pattern: 'infrequentViralWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 1 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Encart 11-2, Palier 1"
    },
    {
      label: "Diagnostic d'asthme OU sibilances ≥3x/an OU symptômes entre épisodes",
      description: "Sibilances plus fréquentes ou symptômes intercurrents. Palier GINA 2 envisagé.",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 2 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Encart 11-2, Palier 2" 
    },
     {
      label: "Symptômes sévères ou diagnostic incertain, OU échec des thérapies initiales",
      description: "Nécessite une évaluation spécialisée. Palier GINA 4 (référence).",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern, // Pattern might be less relevant here as it's about severity/uncertainty
      initialGinaStep: 4 as YoungChildGinaSteps, // Direct to referral step
      ginaRef: "GINA 2025 Encart 11-2, Palier 4 (Référence)"
    }
  ];

  return (
    <Card title="Profil Symptomatique du Jeune Enfant (≤5 ans)" icon={<Baby className="text-violet-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Déterminez le profil des symptômes respiratoires de l'enfant pour guider la stratégie thérapeutique initiale (GINA 2025, Encart 11-2).
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.label} 
            onClick={() => handleSelection(opt.pattern, opt.initialGinaStep)}
            className="w-full p-4 bg-white border border-slate-300 hover:border-violet-500 hover:bg-violet-50 rounded-lg text-left transition-all duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label={`${opt.label}. ${opt.description}. ${opt.ginaRef}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-violet-700 group-hover:text-violet-800 text-base">{opt.label}</h3>
                <p className="text-sm text-slate-600 mt-1">{opt.description}</p>
                <p className="text-xs text-violet-500 group-hover:text-violet-600 mt-1.5 font-medium">{opt.ginaRef}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-violet-500 transition-colors flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
       <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cette évaluation aide à sélectionner une approche de prise en charge initiale. Assurez une technique d'inhalation correcte (pMDI avec chambre d'inhalation et masque facial adapté à l'âge).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default YoungChildSymptomPatternStep;