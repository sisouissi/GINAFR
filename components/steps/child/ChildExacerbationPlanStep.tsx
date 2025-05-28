
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { exacerbationPlanDetails } from '../../../constants/treatmentData';
import { AlertTriangle, CheckCircle, ChevronRight, FileText, RotateCcw, Activity, ShieldAlert } from 'lucide-react'; // Activity for child icon

const ChildExacerbationPlanStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { exacerbationSeverity } = patientData;

  if (!exacerbationSeverity) {
    return (
      <Card title="Erreur : Sévérité non évaluée" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>La sévérité de l'exacerbation n'a pas été sélectionnée. Veuillez retourner en arrière.</p>
        <div className="mt-4">
            <Button onClick={() => navigateTo('CHILD_EXACERBATION_SEVERITY_STEP')} variant="secondary">
            Évaluer la Sévérité
            </Button>
        </div>
      </Card>
    );
  }

  const isMildModerate = exacerbationSeverity === 'mildModerate';
  const plan = isMildModerate
    ? exacerbationPlanDetails.child.mildModerateAtHome 
    : exacerbationPlanDetails.child.severeInER;

  const cardIcon = isMildModerate ? <Activity className="text-amber-600" /> : <ShieldAlert className="text-red-600" />;
  const cardBorderClass = isMildModerate ? "border-amber-400" : "border-red-400";
  const cardBgClass = isMildModerate ? "bg-amber-50" : "bg-red-50";
  
  const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`mb-4 ${className}`}>
      <h4 className="text-md font-semibold text-slate-700 mb-2">{title}</h4>
      <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <Card 
        title={plan.title} 
        icon={cardIcon}
        className={`${cardBgClass} ${cardBorderClass}`}
    >
      {('steps' in plan) && plan.steps && (
        <DetailSection title="Étapes Clés de Prise en Charge :">
          <ul className="list-decimal list-inside space-y-2 pl-2">
            {plan.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </DetailSection>
      )}

      {('keyTreatments' in plan) && plan.keyTreatments && (
         <DetailSection title="Traitements d'Urgence Clés :">
          <ul className="list-disc list-inside space-y-1 pl-2">
            {plan.keyTreatments.map((treatment, index) => <li key={index}>{treatment}</li>)}
          </ul>
        </DetailSection>
      )}
      
      {('whenToSeekUrgentHelp' in plan) && plan.whenToSeekUrgentHelp && (
        <div className={`mt-4 p-3 rounded-md border-l-4 ${isMildModerate ? 'bg-red-100 border-red-500' : 'bg-red-100 border-red-600'}`}>
          <h4 className={`font-semibold mb-1 ${isMildModerate ? 'text-red-700' : 'text-red-800'}`}>Quand Consulter un Médecin en Urgence :</h4>
          <ul className={`list-disc list-inside space-y-1 pl-4 text-sm ${isMildModerate ? 'text-red-600' : 'text-red-700'}`}>
            {plan.whenToSeekUrgentHelp.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      )}

      {('monitoring' in plan) && plan.monitoring && (
         <DetailSection title="Surveillance :" className="mt-4">
          <ul className="list-disc list-inside space-y-1 pl-2">
            {plan.monitoring.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </DetailSection>
      )}
       <p className="text-xs text-slate-500 mt-4 font-semibold">
            RAPPEL : Toujours utiliser une chambre d'inhalation avec le pMDI pour les enfants de cette tranche d'âge.
        </p>

      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
        <p className="text-xs text-slate-500 text-center">
            S'assurer que les parents disposent d'un plan d'action écrit pour l'asthme de leur enfant à jour et comprennent quand et comment agir.
        </p>
        <Button 
            onClick={() => navigateTo('CHILD_FOLLOW_UP_STEP')}
            variant="success" // Child path primary
            fullWidth
            size="lg"
            leftIcon={<FileText />}
        >
            Aller au Suivi & Plan d'Action
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

export default ChildExacerbationPlanStep;