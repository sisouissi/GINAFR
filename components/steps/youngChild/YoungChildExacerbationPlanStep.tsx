
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { exacerbationPlanDetails } from '../../../constants/treatmentData';
import { AlertTriangle, CheckCircle, ChevronRight, FileText, Baby } from 'lucide-react';

const YoungChildExacerbationPlanStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { exacerbationSeverity } = patientData;

  if (!exacerbationSeverity) {
    return (
      <Card title="Erreur : Sévérité non évaluée" icon={<AlertTriangle className="text-red-500" />}>
        <p>La sévérité de l'épisode n'a pas été sélectionnée. Veuillez retourner en arrière.</p>
        <Button onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_SEVERITY_STEP')} className="mt-4">
          Évaluer la Sévérité
        </Button>
      </Card>
    );
  }

  const plan = exacerbationSeverity === 'mildModerate' 
    ? exacerbationPlanDetails.youngChild.mildModerateAtHome 
    : exacerbationPlanDetails.youngChild.severeInER;

  return (
    <Card 
        title={plan.title} 
        icon={exacerbationSeverity === 'mildModerate' ? <Baby className="text-yellow-600" /> : <AlertTriangle className="text-red-600" />}
        className={exacerbationSeverity === 'mildModerate' ? "bg-yellow-50 border-yellow-400" : "bg-red-50 border-red-400"}
    >
      {('steps' in plan) && plan.steps && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Étapes Clés de Prise en Charge :</h4>
          <ul className="list-decimal list-inside space-y-2 pl-4 text-gray-600">
            {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </div>
      )}

      {('keyTreatments' in plan) && plan.keyTreatments && (
         <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Traitements d'Urgence Clés :</h4>
          <ul className="list-disc list-inside space-y-1 pl-4 text-gray-600">
            {plan.keyTreatments.map((treatment, index) => <li key={index}>{treatment}</li>)}
          </ul>
        </div>
      )}
      
      {('whenToSeekUrgentHelp' in plan) && plan.whenToSeekUrgentHelp && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 rounded-md">
          <h4 className="font-semibold text-red-700 mb-2">Quand Consulter un Médecin en Urgence :</h4>
          <ul className="list-disc list-inside space-y-1 pl-4 text-red-600 text-sm">
            {plan.whenToSeekUrgentHelp.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}

      {('monitoring' in plan) && plan.monitoring && (
         <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Surveillance :</h4>
          <ul className="list-disc list-inside space-y-1 pl-4 text-gray-600 text-sm">
            {plan.monitoring.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}
       <p className="text-sm text-gray-500 mt-4">
            <strong>Crucial :</strong> Toujours utiliser un pMDI avec une chambre d'inhalation et un masque facial de taille appropriée pour les enfants ≤5 ans. S'assurer que les parents maîtrisent son utilisation.
        </p>

      <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
        <p className="text-sm text-gray-500 text-center">
            S'assurer que les parents disposent d'un plan d'action écrit à jour pour l'asthme/sibilances de leur enfant et comprennent quand intensifier les soins.
        </p>
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_FOLLOW_UP_STEP')}
            variant="primary"
            className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
            fullWidth
            rightIcon={<FileText />}
        >
            Aller au Suivi & Plan d'Action
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="secondary"
            fullWidth
        >
            Commencer une Nouvelle Évaluation Patient
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationPlanStep;
