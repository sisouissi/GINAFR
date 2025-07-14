
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { YoungChildSymptomPattern, YoungChildGinaSteps } from '../../../types';
import { ChevronRight, HelpCircle, Baby, AlertTriangle } from 'lucide-react';

const YoungChildSymptomPatternStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { patientData } = usePatientData();

  const handleSelection = (
    pattern: YoungChildSymptomPattern, 
    initialGinaStep: YoungChildGinaSteps
  ) => {
    navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP', {
      youngChild_symptomPattern: pattern,
      youngChild_currentGinaStep: initialGinaStep,
      youngChild_currentTreatmentStrategy: 'preferred', 
    });
  };
  
  const options = [
    {
      label: "Sifflements viraux peu fréquents ET peu de symptômes entre les épisodes",
      description: "Moins de 3 épisodes/an, asymptomatique entre les épisodes. Palier 1 du GINA envisagé.",
      pattern: 'infrequentViralWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 1 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Encadré 11-2, Palier 1"
    },
    {
      label: "Diagnostic d'asthme OU épisodes de sifflements 3 fois ou plus par an OU symptômes entre les épisodes",
      description: "Sifflements plus fréquents ou symptômes intercurrents. Palier 2 du GINA envisagé.",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 2 as YoungChildGinaSteps,
      ginaRef: "GINA 2025 Encadré 11-2, Palier 2" 
    },
     {
      label: "Symptômes sévères ou diagnostic incertain, OU échec des thérapies initiales",
      description: "Nécessite une évaluation par un spécialiste. Palier 4 du GINA (Orientation).",
      pattern: 'persistentAsthmaOrFrequentWheeze' as YoungChildSymptomPattern,
      initialGinaStep: 4 as YoungChildGinaSteps, 
      ginaRef: "GINA 2025 Encadré 11-2, Palier 4 (Orientation)"
    }
  ];

  return (
    <Card title="Schéma des Symptômes chez le Jeune Enfant (<=5 ans)" icon={<Baby className="text-violet-600" />}>
       {patientData.diagnosisConfirmed === false && (
         <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-md">
            <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0"/>
                <div>
                    <h3 className="font-semibold text-amber-800">Diagnostic Provisoire : Essai Thérapeutique</h3>
                    <p className="text-sm text-amber-700 mt-1">
                        Le diagnostic d'asthme n'est pas entièrement confirmé. La sélection suivante initiera un essai thérapeutique pour aider à confirmer le diagnostic.
                    </p>
                </div>
            </div>
        </div>
      )}
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Déterminez le schéma des symptômes respiratoires de l'enfant pour guider la stratégie thérapeutique initiale (GINA 2025, Encadré 11-2).
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <Button
            key={opt.label} 
            onClick={() => handleSelection(opt.pattern, opt.initialGinaStep)}
            variant="secondary"
            fullWidth
            justify="between"
            size="lg"
            className="!py-4 text-left h-auto"
            aria-label={`${opt.label}. ${opt.description}. ${opt.ginaRef}`}
          >
            <div className="flex-grow">
              <h3 className="font-semibold text-violet-700 text-base whitespace-normal">{opt.label}</h3>
              <p className="text-sm text-slate-600 mt-1 font-normal whitespace-normal">{opt.description}</p>
              <p className="text-xs text-violet-500 mt-1.5 font-medium whitespace-normal">{opt.ginaRef}</p>
            </div>
            <ChevronRight size={20} className="text-slate-400 flex-shrink-0 ml-2" />
          </Button>
        ))}
      </div>
       <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cette évaluation aide à choisir une approche de prise en charge initiale. Assurez-vous de la technique correcte de l'inhalateur (aérosol-doseur avec chambre d'inhalation et masque facial adapté à l'âge).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default YoungChildSymptomPatternStep;
