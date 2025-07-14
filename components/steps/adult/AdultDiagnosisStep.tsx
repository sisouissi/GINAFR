
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Stethoscope, CheckCircle2, XCircle, ChevronRight, Lightbulb } from 'lucide-react';

const AdultDiagnosisStep: React.FC = () => {
  const { patientData } = usePatientData();
  const { navigateTo } = useNavigation();

  const handleDiagnosisConfirmation = (confirmed: boolean) => {
    if (confirmed) {
      navigateTo('ADULT_SYMPTOM_FREQUENCY_STEP', { diagnosisConfirmed: true });
    } else {
      navigateTo('DIAGNOSIS_PENDING_STEP', { diagnosisConfirmed: false });
    }
  };

  return (
    <Card 
      title={`Évaluation Diagnostique - Adultes & Adolescents`} 
      icon={<Stethoscope className="text-sky-600" />}
      titleRightElement={<span className="text-sm font-normal text-slate-500">Âge: {patientData.age}</span>}
    >
      <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <div className="flex items-start">
          <Lightbulb size={24} className="mr-3 mt-1 text-sky-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-sky-800">Confirmation du Diagnostic de l'Asthme (GINA)</h3>
            <p className="text-sm text-slate-600 mt-1">
              Le diagnostic requiert les deux éléments suivants :
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 mt-2 space-y-1">
              <li>Une anamnèse de symptômes respiratoires variables (ex: sifflements, essoufflement, oppression thoracique, toux).</li>
              <li>Une preuve de limitation variable du débit d'air expiratoire (ex: test de réversibilité au bronchodilatateur positif).</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">Référez-vous aux Encadrés GINA 1-1 & 1-2 pour les détails complets.</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-6 text-center text-slate-700">Le diagnostic de l'asthme est-il confirmé sur la base de ces critères ?</h3>
      
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

export default AdultDiagnosisStep;
