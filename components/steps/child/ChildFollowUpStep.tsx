
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { Calendar, ShieldCheck, Activity, MessageSquare, BookOpen, Edit3, RotateCcw, Zap } from 'lucide-react';

const ChildFollowUpStep: React.FC = () => {
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { child_currentGinaStep } = patientData; // Add child_controlLevel when implemented

  let advice = "Un suivi régulier est crucial pour la prise en charge de l'asthme chez l'enfant. Se concentrer sur le contrôle, la technique et le plan d'action.";
  let reviewTiming = "Réévaluer dans 1-3 mois, ou plus tôt si l'asthme n'est pas bien contrôlé ou après une exacerbation.";
  // Add logic for advice/reviewTiming based on child_controlLevel once available

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
    <Card title="Plan de Suivi de l'Asthme (Enfant 6-11 ans)" icon={<Calendar className="text-emerald-600" />}>
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <h3 className="text-base font-semibold text-emerald-800 mb-1">Résumé du Statut Actuel :</h3>
        <p className="text-sm text-slate-600">Palier GINA Actuel : <span className="font-medium text-emerald-700">{child_currentGinaStep || 'N/A'}</span></p>
        {/* <p className="text-sm text-slate-600">Niveau de Contrôle : <span className="font-medium text-emerald-700">{child_controlLevelDisplay || 'Non évalué'}</span></p> */}
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold text-slate-700 mb-1">Recommandations de Suivi :</h4>
        <p className="text-sm text-slate-600 mb-2 leading-relaxed">{advice}</p>
        <p className="text-sm text-slate-600 font-medium">Prochaine consultation indicative : <span className="text-emerald-700">{reviewTiming}</span></p>
      </div>

      <div className="mb-6 space-y-1 divide-y divide-slate-100">
        <h4 className="text-md font-semibold text-slate-700 mb-2 pt-3">Actions Clés pour le Suivi :</h4>
        <ActionItem icon={<ShieldCheck className="text-emerald-500"/>} text="Évaluer et renforcer la technique d'inhalation correcte (avec chambre d'inhalation) et l'observance." />
        <ActionItem icon={<Activity className="text-amber-500"/>} text="Revoir le contrôle de l'asthme, les symptômes et toute exacerbation depuis la dernière visite." />
        <ActionItem icon={<BookOpen className="text-sky-500"/>} text="Mettre à jour le plan d'action écrit pour l'asthme. S'assurer que les parents et l'enfant le comprennent." />
        <ActionItem icon={<MessageSquare className="text-violet-500"/>} text="Discuter des préoccupations avec les parents et l'enfant. Aborder la croissance et le développement." />
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
        <Button 
            onClick={() => navigateTo('CHILD_TREATMENT_PLAN_STEP')}
            variant="secondary"
            fullWidth
            leftIcon={<Edit3/>}
            size="lg"
        >
            Revoir/Ajuster le Plan de Traitement
        </Button>
         <Button 
            onClick={() => navigateTo('CHILD_EXACERBATION_INTRO_STEP')}
            variant="warning"
            fullWidth
            leftIcon={<Zap/>}
            size="lg"
        >
            Gérer une Exacerbation
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="success" // Child pathway primary action
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

export default ChildFollowUpStep;
