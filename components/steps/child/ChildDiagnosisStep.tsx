
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Stethoscope, CheckCircle2, XCircle, ChevronRight, Lightbulb, Activity } from 'lucide-react';

const ChildDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const handleDiagnosisConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      navigateTo('CHILD_INITIAL_ASSESSMENT_STEP', { diagnosisConfirmed: true });
    } else {
      navigateTo('DIAGNOSIS_PENDING_STEP', { diagnosisConfirmed: false });
    }
  };

  return (
    <Card 
      title={`Évaluation Diagnostique - Enfants`} 
      icon={<Activity className="text-emerald-600" />} 
      titleRightElement={<span className="text-sm font-normal text-slate-500">Âge: {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-emerald-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-emerald-800">Confirmation du Diagnostic de l'Asthme (Enfants 6-11 ans)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Le diagnostic chez les enfants de 6 à 11 ans implique généralement :
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 mt-2 space-y-1">
              <li>Un schéma de symptômes respiratoires épisodiques (sifflements, toux, difficulté à respirer, oppression thoracique), surtout s'ils sont fréquents, pires la nuit ou avec l'exercice/déclencheurs.</li>
              <li>Une preuve de limitation variable du débit aérien par spirométrie (si possible et si l'enfant coopère) montrant une réversibilité au bronchodilatateur.</li>
              <li>L'exclusion de diagnostics alternatifs.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Référez-vous aux recommandations GINA (ex: Encadrés 1-1 & 1-2) pour les critères détaillés.</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center text-slate-700">Le diagnostic de l'asthme est-il confirmé pour cet enfant ?</h3>
      
      <div className="space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(true)}
          variant="success"
          fullWidth
          size="xl"
          leftIcon={<CheckCircle2 />}
          rightIcon={<ChevronRight />}
          aria-label="Oui, diagnostic confirmé. Poursuivre avec la prise en charge de l'asthme."
        >
          Oui, le diagnostic est confirmé
        </Button>
        <p className="text-xs text-slate-500 text-center">Poursuivre avec la prise en charge de l'asthme.</p>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          onClick={() => handleDiagnosisConfirmation(false)}
          variant="warning"
          fullWidth
          size="xl"
          leftIcon={<XCircle />}
          rightIcon={<ChevronRight />}
           aria-label="Non ou incertain. Des étapes de diagnostic supplémentaires sont nécessaires."
        >
           Non / Incertain
        </Button>
         <p className="text-xs text-slate-500 text-center">Des étapes de diagnostic supplémentaires ou une orientation sont nécessaires.</p>
      </div>
    </Card>
  );
};

export default ChildDiagnosisStep;
