

import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { exacerbationPlanDetails } from '../../../constants/treatmentData';
import { AlertTriangle, ChevronRight, FileText, Baby, RotateCcw, ShieldAlert, Info, ClipboardList, HeartPulse, Monitor } from 'lucide-react';
import DetailSection from '../../common/DetailSection';

const YoungChildExacerbationPlanStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { exacerbationSeverity } = patientData;

  if (!exacerbationSeverity) {
    return (
      <Card title="Erreur : Gravité non évaluée" icon={<AlertTriangle className="text-red-500" />}>
        <p>La gravité de l'épisode n'a pas été sélectionnée. Veuillez revenir en arrière.</p>
        <Button onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_SEVERITY_STEP')} variant="secondary" className="mt-4">
          Évaluer la Gravité
        </Button>
      </Card>
    );
  }

  const isMildModerate = exacerbationSeverity === 'mildModerate';
  const plan = isMildModerate 
    ? exacerbationPlanDetails.youngChild.mildModerateAtHome 
    : exacerbationPlanDetails.youngChild.severeInER;

  const cardIcon = isMildModerate ? <Baby className="text-amber-600" /> : <ShieldAlert className="text-red-600" />;
  const cardBorderClass = isMildModerate ? "border-amber-400" : "border-red-400";
  const cardBgClass = isMildModerate ? "bg-amber-50" : "bg-red-50";
  

  return (
    <Card 
        title={plan.title} 
        icon={cardIcon}
        className={`${cardBgClass} ${cardBorderClass}`}
    >
      {('steps' in plan) && plan.steps && (
        <DetailSection title="Étapes Clés de la Prise en Charge" icon={<ClipboardList className="text-slate-600" />}>
          <ul className="list-decimal list-inside space-y-2">
            {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </DetailSection>
      )}

      {('keyTreatments' in plan) && plan.keyTreatments && (
         <DetailSection title="Traitements Clés d'Urgence" icon={<HeartPulse className="text-slate-600"/>}>
          <ul className="list-disc list-inside space-y-1">
            {plan.keyTreatments.map((treatment, index) => <li key={index}>{treatment}</li>)}
          </ul>
        </DetailSection>
      )}
      
      {('whenToSeekUrgentHelp' in plan) && plan.whenToSeekUrgentHelp && (
        <div className={`mt-4 p-4 rounded-md border-l-4 ${isMildModerate ? 'bg-red-100 border-red-500' : 'bg-red-100 border-red-600'}`}>
          <h4 className={`font-semibold mb-2 flex items-center ${isMildModerate ? 'text-red-700' : 'text-red-800'}`}>
            <AlertTriangle size={18} className="mr-2"/>
            Quand Consulter un Médecin d'Urgence
          </h4>
          <ul className={`list-disc list-inside space-y-1 pl-4 text-sm ${isMildModerate ? 'text-red-600' : 'text-red-700'}`}>
            {plan.whenToSeekUrgentHelp.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}

      {('monitoring' in plan) && plan.monitoring && (
         <DetailSection title="Surveillance" icon={<Monitor className="text-slate-600"/>} className="mt-4">
          <ul className="list-disc list-inside space-y-1">
            {plan.monitoring.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </DetailSection>
      )}

      {('notes' in plan) && plan.notes && (
        <div className="mt-4 p-3 bg-sky-100 border-l-4 border-sky-400 text-sky-800 text-sm rounded-r-md">
            <h4 className="font-semibold mb-1 flex items-center"><Info size={16} className="mr-2"/>Référence</h4>
            <p className="pl-6">{plan.notes}</p>
        </div>
      )}
       <p className="text-xs text-slate-500 mt-4 font-semibold">
            <strong>Crucial :</strong> Toujours utiliser un aérosol-doseur avec une chambre d'inhalation à valve et un masque facial appropriés pour les enfants de ≤5 ans. S'assurer que les parents maîtrisent son utilisation.
        </p>

      <div className="mt-8 pt-6 border-t border-slate-300">
        <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <ClipboardList size={20} className="mr-2.5 text-slate-600" />
                Suivi Post-Épisode
            </h3>
            <p className="text-sm text-slate-600 mb-3">
                Tout épisode de sifflement nécessitant des soins urgents est un événement significatif. Une consultation de suivi avec l'enfant et ses soignants est essentielle.
            </p>
            <p className="text-sm font-semibold text-slate-700">Les objectifs de cette consultation sont :</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 mt-2 pl-4">
                <li>Examiner les déclencheurs potentiels et les facteurs environnementaux.</li>
                <li>Confirmer la technique correcte de l'inhalateur et de la chambre d'inhalation/masque facial.</li>
                <li>Revoir le plan de traitement de fond et évaluer la nécessité d'une initiation ou d'une augmentation.</li>
                <li>S'assurer que les parents ont et comprennent un plan d'action écrit.</li>
            </ul>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP')}
            variant="violet"
            fullWidth
            size="lg"
            leftIcon={<FileText />}
        >
            Retourner au Plan de Traitement
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="secondary"
            fullWidth
            size="lg"
            leftIcon={<RotateCcw />}
        >
            Commencer une Nouvelle Évaluation
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationPlanStep;
