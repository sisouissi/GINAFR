import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { youngChildTreatments } from '../../../constants/treatmentData';
import { Calendar, ShieldCheck, Baby, MessageSquare, BookOpen, Edit3, RotateCcw, Zap } from 'lucide-react';

export const YoungChildFollowUpStep: React.FC = () => { // Changed to named export
  const { navigateTo, resetNavigation } = useNavigation();
  const { patientData } = usePatientData();
  const { youngChild_currentGinaStep, youngChild_currentTreatmentStrategy } = patientData;

  let advice = "Un suivi régulier est essentiel pour les jeunes enfants avec des symptômes respiratoires récurrents. Adapter la fréquence des visites au niveau de contrôle et à la stratégie thérapeutique.";
  let reviewTiming = "Réévaluer dans 1-3 mois, ou plus tôt si les symptômes ne sont pas bien contrôlés, après une exacerbation, ou après avoir commencé/modifié un traitement.";
  
  let currentStepDescription = "Non défini";
  let currentStrategyName = "Non définie";

  if (youngChild_currentGinaStep && youngChildTreatments[youngChild_currentGinaStep]) {
    const stepDetails = youngChildTreatments[youngChild_currentGinaStep];
    currentStepDescription = stepDetails?.stepDescription || `Palier ${youngChild_currentGinaStep}`;
    
    if (youngChild_currentTreatmentStrategy === 'preferred') {
      currentStrategyName = stepDetails?.preferred.name || "Stratégie préférée";
    } else if (stepDetails?.alternatives) {
      const altStrategy = stepDetails.alternatives.find(alt => alt.id === youngChild_currentTreatmentStrategy);
      currentStrategyName = altStrategy?.name || "Stratégie alternative";
    }
  }

  if (youngChild_currentGinaStep === 1) {
    advice = "Si l'enfant est bien contrôlé (symptômes rares, pas de limitation) avec le traitement du Palier 1, continuer et réévaluer régulièrement. S'assurer que les parents/soignants comprennent l'utilisation du soulageur et les signes d'aggravation.";
    reviewTiming = "Réévaluer tous les 3-6 mois si stable, ou plus tôt si besoin.";
  } else if (youngChild_currentGinaStep === 2) {
    advice = "Si l'enfant est bien contrôlé avec le traitement de fond du Palier 2, maintenir pendant au moins 3 mois. Ensuite, envisager une diminution progressive si l'enfant reste asymptomatique et sans exacerbation.";
    reviewTiming = "Réévaluer dans 1-3 mois après initiation/ajustement. Si stable, puis tous les 3-6 mois.";
  } else if (youngChild_currentGinaStep === 3) {
    advice = "L'enfant est au Palier 3. Une référence à un spécialiste devrait avoir été envisagée. Évaluer la réponse à la dose augmentée de CSI. S'assurer que les facteurs modifiables (observance, technique, environnement) sont optimisés.";
    reviewTiming = "Réévaluer dans 4-6 semaines, ou selon l'avis du spécialiste.";
  } else if (youngChild_currentGinaStep === 4) {
    advice = "L'enfant est au Palier 4 et devrait être sous suivi spécialisé. Le rôle du médecin traitant est de collaborer avec le spécialiste, de renforcer les messages clés et de gérer les comorbidités.";
    reviewTiming = "Selon les recommandations du spécialiste. Contact régulier avec le médecin traitant pour les aspects de soins primaires.";
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
    <Card title="Suivi de l'Asthme (Jeune Enfant ≤5 ans)" icon={<Calendar className="text-violet-600" />}>
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
        <h3 className="text-base font-semibold text-violet-800 mb-1">Résumé du Statut Actuel :</h3>
         <p className="text-sm text-slate-600">Palier GINA : <span className="font-medium text-violet-700">{currentStepDescription}</span></p>
        <p className="text-sm text-slate-600">Stratégie : <span className="font-medium text-violet-700">{currentStrategyName}</span></p>
      </div>

      <div className="mb-6">
        <h4 className="text-md font-semibold text-slate-700 mb-1">Recommandations de Suivi :</h4>
        <p className="text-sm text-slate-600 mb-2 leading-relaxed">{advice}</p>
        <p className="text-sm text-slate-600 font-medium">Prochaine consultation indicative : <span className="text-violet-700">{reviewTiming}</span></p>
      </div>

      <div className="mb-6 space-y-1 divide-y divide-slate-100">
        <h4 className="text-md font-semibold text-slate-700 mb-2 pt-3">Actions Clés pour le Suivi :</h4>
        <ActionItem icon={<Baby className="text-violet-500"/>} text="Évaluer le contrôle des symptômes (fréquence, sévérité, impact sur l'activité/sommeil) et la fréquence des exacerbations/épisodes de sibilances." />
        <ActionItem icon={<ShieldCheck className="text-emerald-500"/>} text="Revoir et renforcer la technique d'inhalation (pMDI + chambre d'inhalation + masque facial/embout buccal adapté) et l'observance du traitement de fond si prescrit." />
        <ActionItem icon={<BookOpen className="text-sky-500"/>} text="Vérifier et mettre à jour le plan d'action écrit pour asthme/sibilances. S'assurer que les parents/soignants comprennent quand et comment agir, et quand consulter en urgence." />
        <ActionItem icon={<MessageSquare className="text-amber-500"/>} text="Aborder les préoccupations parentales, la compréhension de la maladie, et l'évitement des déclencheurs connus (ex: fumée de tabac, irritants, allergènes si pertinent)." />
        <ActionItem icon={<Calendar className="text-slate-500"/>} text="Planifier le prochain rendez-vous et s'assurer que les prescriptions sont suffisantes jusqu'à cette date." />
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
         <Button 
            onClick={() => navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP')}
            variant="secondary"
            fullWidth
            leftIcon={<Edit3/>}
            size="lg"
        >
            Revoir/Ajuster le Plan de Traitement
        </Button>
        <Button 
            onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_INTRO_STEP')}
            variant="warning"
            fullWidth
            leftIcon={<Zap/>}
            size="lg"
        >
            Gérer un Épisode de Sibilances
        </Button>
        <Button 
            onClick={() => resetNavigation()}
            variant="primary"
            className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
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

// export default YoungChildFollowUpStep; // Keep as named export
