import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Stethoscope, CheckCircle2, XCircle, ChevronRight, Lightbulb, Baby } from 'lucide-react';

const YoungChildDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const handleDiagnosisConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      navigateTo('YOUNG_CHILD_SYMPTOM_PATTERN_STEP', { diagnosisConfirmed: true });
    } else {
      navigateTo('DIAGNOSIS_PENDING_STEP', { diagnosisConfirmed: false });
    }
  };

  return (
    <Card 
      title={`Évaluation Diagnostique - Jeunes Enfants`} 
      icon={<Baby className="text-violet-600" />} // Violet theme
      titleRightElement={<span className="text-sm font-normal text-slate-500">Âge : {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg"> {/* Violet theme */}
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-violet-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-violet-800">Confirmation de l'Asthme (Jeunes Enfants ≤5 ans)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Diagnostiquer l'asthme chez les enfants de ≤5 ans peut être difficile. Il est souvent basé sur :
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 mt-2 space-y-1">
              <li><strong>Profils symptomatiques :</strong> Sibilances fréquentes/persistantes, toux, difficultés respiratoires, surtout si pires la nuit ou avec déclencheurs.</li>
              <li><strong>Réponse au traitement :</strong> Amélioration avec un essai de traitement de fond (et aggravation à l'arrêt).</li>
              <li><strong>Exclusion de diagnostics alternatifs.</strong></li>
              <li>Antécédents familiaux d'asthme ou d'atopie.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Se référer aux recommandations GINA 2025, Encarts 10-1 & 10-2 pour les approches diagnostiques. Les EFR formelles ne sont généralement pas réalisables.</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center text-slate-700">Un diagnostic d'asthme a-t-il été posé (ou est-il hautement probable) ?</h3>
      
      <div className="space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(true)}
          variant="primary" // Using generic primary, can be themed violet if Button has violet variant
          className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
          fullWidth
          size="xl"
          leftIcon={<CheckCircle2 />}
          rightIcon={<ChevronRight />}
          aria-label="Oui, asthme diagnostiqué ou hautement probable."
        >
          Oui, asthme diagnostiqué/probable
        </Button>
        <p className="text-xs text-slate-500 text-center">Procéder à l'évaluation des profils symptomatiques.</p>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(false)}
          variant="warning"
          fullWidth
          size="xl"
          leftIcon={<XCircle />}
          rightIcon={<ChevronRight />}
           aria-label="Non ou diagnostic incertain."
        >
           Non / Diagnostic Incertain
        </Button>
         <p className="text-xs text-slate-500 text-center">Une évaluation plus approfondie ou une référence spécialisée peut être nécessaire.</p>
      </div>
    </Card>
  );
};

export default YoungChildDiagnosisStep;