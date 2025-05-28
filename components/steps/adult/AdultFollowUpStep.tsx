
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { Calendar, ShieldCheck, Activity, Pill, MessageSquare, Zap, Edit3, RotateCcw } from 'lucide-react';

const AdultFollowUpStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { adult_controlLevel, adult_currentGinaStep, adult_pathway } = patientData;

  let advice = "Un suivi régulier est crucial pour la prise en charge de l'asthme.";
  let reviewTiming = "Réévaluer dans 1-3 mois.";
  let controlLevelDisplay = 'Non évalué';

  if (adult_controlLevel === 'wellControlled') {
    advice = "L'asthme est bien contrôlé. Maintenir le traitement actuel. Envisager de diminuer le palier si stable pendant 3 mois.";
    reviewTiming = "Réévaluer dans 3-6 mois, ou plus tôt si besoin.";
    controlLevelDisplay = 'Bien contrôlé';
  } else if (adult_controlLevel === 'partlyControlled') {
    advice = "L'asthme est partiellement contrôlé. Envisager d'augmenter le palier de traitement. Aborder les facteurs de risque modifiables, l'observance et la technique d'inhalation.";
    reviewTiming = "Réévaluer dans 2-6 semaines après ajustement du traitement.";
    controlLevelDisplay = 'Partiellement contrôlé';
  } else if (adult_controlLevel === 'uncontrolled') {
    advice = "L'asthme est non contrôlé. Augmenter le palier de traitement en urgence. Aborder les facteurs de risque modifiables, l'observance et la technique d'inhalation. Envisager une courte cure de CSO si symptômes sévères ou exacerbation.";
    reviewTiming = "Réévaluer dans 1-2 semaines après ajustement du traitement.";
    controlLevelDisplay = 'Non contrôlé';
  }
  
  const ActionItem: React.FC<{icon: React.ReactElement, text: string}> = ({icon, text}) => (
    <div className="flex items-start text-slate-700 py-2">
      {React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, {
        size: 20, 
        className: `mr-3 mt-0.5 flex-shrink-0 ${(icon.props as any)?.className || ''}`.trim()
      })}
      <span className="text-sm leading-relaxed">{text}</span>
    </div>
  );

  return (
    <Card title="Plan de Suivi de l'Asthme Adulte" icon={<Calendar className="text-sky-600" />}>
      <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <h3 className="text-base font-semibold text-sky-800 mb-1">Résumé du Statut Actuel :</h3>
        <p className="text-sm text-slate-600">Niveau de Contrôle : <span className="font-medium text-sky-700">{controlLevelDisplay}</span></p>
        <p className="text-sm text-slate-600">Palier GINA Actuel : <span className="font-medium text-sky-700">{adult_currentGinaStep || 'N/A'}</span> sur {adult_pathway ? (adult_pathway === 'pathway1' ? 'Voie 1' : 'Voie 2') : 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold text-slate-700 mb-1">Recommandations de Suivi :</h4>
        <p className="text-sm text-slate-600 mb-2 leading-relaxed">{advice}</p>
        <p className="text-sm text-slate-600 font-medium">Prochaine consultation indicative : <span className="text-sky-700">{reviewTiming}</span></p>
      </div>

      <div className="mb-6 space-y-1 divide-y divide-slate-100">
        <h4 className="text-md font-semibold text-slate-700 mb-2 pt-3">Actions Clés pour le Suivi :</h4>
        <ActionItem icon={<ShieldCheck className="text-emerald-500"/>} text="Évaluer et renforcer la technique d'inhalation et l'observance du traitement." />
        <ActionItem icon={<Activity className="text-amber-500"/>} text="Revoir les facteurs de risque modifiables (tabagisme, allergènes) et les comorbidités." />
        <ActionItem icon={<Pill className="text-sky-500"/>} text="Mettre à jour le plan d'action écrit pour l'asthme, incluant les signes d'aggravation et quand consulter." />
        <ActionItem icon={<MessageSquare className="text-violet-500"/>} text="Aborder les objectifs, préoccupations et préférences du patient concernant sa prise en charge." />
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
        <Button 
            onClick={() => navigateTo('ADULT_TREATMENT_PLAN_STEP')}
            variant="secondary"
            fullWidth
            leftIcon={<Edit3/>}
            size="lg"
        >
            Revoir/Ajuster le Plan de Traitement
        </Button>
        <Button 
            onClick={() => navigateTo('ADULT_EXACERBATION_INTRO_STEP')}
            variant="warning"
            fullWidth
            leftIcon={<Zap/>}
            size="lg"
        >
            Gérer une Exacerbation
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="primary"
            fullWidth
            leftIcon={<RotateCcw/>}
            size="lg"
        >
            Commencer une Nouvelle Évaluation
        </Button>
      </div>
    </Card>
  );
};

export default AdultFollowUpStep;
