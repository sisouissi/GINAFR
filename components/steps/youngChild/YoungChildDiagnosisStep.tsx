
import React, { useState } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Baby, ChevronRight, Lightbulb, CheckSquare, Square, AlertTriangle } from 'lucide-react';
import { YoungChildDiagnosisCriteria } from '../../../types';

const diagnosisCriteriaList = [
    { 
        id: 'criterion1' as keyof YoungChildDiagnosisCriteria, 
        label: 'Épisode(s) de Sifflement Aigu Récurrent(s)',
        details: "Anamnèse de 2 épisodes de sifflement ou plus au cours de l'année écoulée, OU 1 épisode avec des symptômes de type asthmatique entre les épisodes."
    },
    { 
        id: 'criterion2' as keyof YoungChildDiagnosisCriteria, 
        label: 'Aucune Cause Alternative Probable',
        details: "Une anamnèse et un examen médical approfondis suggèrent qu'aucune autre pathologie ne cause les symptômes (sauf une infection virale concomitante)."
    },
    { 
        id: 'criterion3' as keyof YoungChildDiagnosisCriteria, 
        label: 'Réponse Clinique Rapide au Traitement',
        details: "Amélioration confirmée après SABA, ou après un essai de 2-3 mois de CSI à faible dose quotidien."
    },
];

const YoungChildDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const [criteria, setCriteria] = useState<YoungChildDiagnosisCriteria>({
    criterion1: false,
    criterion2: false,
    criterion3: false,
  });

  const handleToggleCriterion = (criterionId: keyof YoungChildDiagnosisCriteria) => {
    setCriteria(prev => ({ ...prev, [criterionId]: !prev[criterionId] }));
  };

  const handleDetermineDiagnosis = () => {
    const metCriteriaCount = Object.values(criteria).filter(Boolean).length;
    if (metCriteriaCount === 3) {
      // Asthme confirmé
      navigateTo('YOUNG_CHILD_RISK_ASSESSMENT_STEP', { 
        diagnosisConfirmed: true, 
        youngChild_diagnosisCriteria: criteria 
      });
    } else if (metCriteriaCount >= 1) {
      // Asthme suspecté
      navigateTo('YOUNG_CHILD_RISK_ASSESSMENT_STEP', { 
        diagnosisConfirmed: false, // C'est provisoire
        youngChild_diagnosisCriteria: criteria 
      });
    } else {
      // Asthme peu probable
      navigateTo('DIAGNOSIS_PENDING_STEP', { 
        diagnosisConfirmed: false,
        youngChild_diagnosisCriteria: criteria 
      });
    }
  };

  return (
    <Card 
      title="Diagnostic Clinique de l'Asthme (Enfant <=5 ans)" 
      icon={<Baby className="text-violet-600" />} 
      titleRightElement={<span className="text-sm font-normal text-slate-500">Âge: {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-violet-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-violet-800">Approche à Trois Critères du GINA 2025</h3>
            <p className="text-sm text-slate-600 mt-1">
              Le diagnostic est principalement clinique. Selon GINA 2025, <strong>les trois critères ci-dessous</strong> doivent être remplis pour un diagnostic confirmé de l'asthme.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4 text-center text-slate-700">Lesquels des critères suivants sont remplis pour cet enfant ?</h3>
      
      <div className="space-y-3 mb-8">
        {diagnosisCriteriaList.map((item) => {
            const isSelected = criteria[item.id];
            return (
                <div
                key={item.id}
                onClick={() => handleToggleCriterion(item.id)}
                role="checkbox"
                aria-checked={isSelected}
                className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                    isSelected 
                    ? 'bg-violet-50 border-violet-400' 
                    : 'bg-white border-slate-300 hover:bg-slate-50'
                }`}
                >
                {isSelected ? (
                    <CheckSquare size={20} className="text-violet-600 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                    <Square size={20} className="text-slate-400 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-grow">
                    <span className={`text-sm ${isSelected ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                    {item.label}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{item.details}</p>
                </div>
                </div>
            )
        })}
      </div>

      <Button
          onClick={handleDetermineDiagnosis}
          variant="violet"
          fullWidth
          size="xl"
          rightIcon={<ChevronRight />}
          aria-label="Déterminer le diagnostic en fonction des critères sélectionnés"
        >
          Déterminer le Diagnostic
        </Button>
    </Card>
  );
};

export default YoungChildDiagnosisStep;