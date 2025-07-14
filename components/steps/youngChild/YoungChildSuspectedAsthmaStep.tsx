

import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { HelpCircle, ChevronRight, AlertTriangle } from 'lucide-react';

const YoungChildSuspectedAsthmaStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { patientData } = usePatientData();

  const metCriteriaCount = Object.values(patientData.youngChild_diagnosisCriteria || {}).filter(Boolean).length;

  return (
    <Card 
      title="Diagnostic Provisoire : Asthme Suspecté" 
      icon={<AlertTriangle className="text-amber-600" />}
      className="border-amber-300 bg-amber-50"
    >
      <p className="text-slate-700 leading-relaxed mb-4">
        L'enfant remplit <strong>{metCriteriaCount} des 3 critères requis</strong> pour un diagnostic confirmé de l'asthme.
      </p>
      
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-md">
        <div className="flex items-start">
            <HelpCircle size={22} className="mr-3 mt-0.5 text-slate-500 flex-shrink-0" />
            <div>
                <h3 className="font-semibold text-slate-800 mb-2">Recommandation GINA 2025 pour l'Asthme Suspecté</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                "Un diagnostic définitif n'est pas toujours possible chez les jeunes enfants. Si un ou plusieurs des critères ci-dessus ne sont pas encore remplis, un diagnostic provisoire d' 'asthme suspecté' doit être posé et un traitement envisagé, avec une réévaluation périodique pour documenter la réponse au traitement de l'asthme et/ou l'évolution des symptômes dans le temps."
                </p>
                 <p className="text-xs text-slate-500 mt-2">(GINA 2025, p. 180)</p>
            </div>
        </div>
      </div>
      
      <p className="text-center font-medium text-slate-700 mb-4">
        L'étape suivante consiste à évaluer le schéma des symptômes pour déterminer le traitement de fond initial approprié pour un essai diagnostique.
      </p>
      
      <div className="text-center">
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_SYMPTOM_PATTERN_STEP')} 
            variant="warning" 
            size="xl"
            rightIcon={<ChevronRight />}
        >
          Procéder à un Essai Thérapeutique
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildSuspectedAsthmaStep;
