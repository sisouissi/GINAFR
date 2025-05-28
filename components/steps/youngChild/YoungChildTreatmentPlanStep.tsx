import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { youngChildTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, YoungChildGinaSteps, YoungChildTreatmentStrategyKey, YoungChildStepTreatment, YoungChildAlternativeTreatment } from '../../../types';
import { Pill, ChevronRight, PlusCircle, MinusCircle, AlertTriangle, Baby, Zap, HelpCircle } from 'lucide-react';

const YoungChildTreatmentPlanStep: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const { youngChild_currentGinaStep, youngChild_currentTreatmentStrategy } = patientData;

  if (!youngChild_currentGinaStep || !youngChild_currentTreatmentStrategy) {
    return (
      <Card title="Erreur : Données manquantes" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Les informations sur le palier GINA ou la stratégie thérapeutique sont manquantes. Veuillez retourner aux étapes précédentes.</p>
        <div className="mt-4">
            <Button onClick={() => navigateTo('YOUNG_CHILD_SYMPTOM_PATTERN_STEP')} variant="secondary">
            Retourner à la sélection du profil
            </Button>
        </div>
      </Card>
    );
  }

  const currentStepDetails: YoungChildStepTreatment | undefined = youngChildTreatments[youngChild_currentGinaStep as YoungChildGinaSteps];
  
  let activeTreatment: TreatmentDetail | YoungChildAlternativeTreatment | undefined = currentStepDetails?.preferred;
  let activeStrategyName = currentStepDetails?.preferred.name || "Traitement Préféré";

  if (youngChild_currentTreatmentStrategy !== 'preferred' && currentStepDetails?.alternatives) {
    const alternative = currentStepDetails.alternatives.find(alt => alt.id === youngChild_currentTreatmentStrategy);
    if (alternative) {
      activeTreatment = alternative;
      activeStrategyName = alternative.name;
    }
  }
  
  const currentStepDisplay = currentStepDetails?.stepDescription || `Palier GINA ${youngChild_currentGinaStep}`;

  const canStepUp = youngChild_currentGinaStep < 4;
  const canStepDown = youngChild_currentGinaStep > 1;

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 4) {
      updatePatientData({ 
        youngChild_currentGinaStep: newStep as YoungChildGinaSteps,
        youngChild_currentTreatmentStrategy: 'preferred' // Reset to preferred strategy when changing step
      });
    }
  };

  const handleStrategyChange = (strategyId: YoungChildTreatmentStrategyKey) => {
    updatePatientData({ youngChild_currentTreatmentStrategy: strategyId });
  };

  const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`py-2 ${className}`}>
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</h4>
      <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
    </div>
  );

  return (
    <Card title="Plan de Traitement (Jeune Enfant ≤5 ans)" icon={<Baby className="text-violet-600" />}>
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg">
        <p className="text-md font-semibold text-violet-700">{currentStepDisplay}</p>
        <p className="text-2xl font-bold text-violet-800">{activeStrategyName}</p>
        <p className="text-xs text-slate-500 mt-1">Basé sur GINA 2025, Encart 11-2.</p>
      </div>

      {activeTreatment ? (
        <div className="space-y-3 bg-white p-4 rounded-md border border-slate-200">
          {activeTreatment.controller && (
            <DetailSection title="Traitement de Fond (Contrôleur)">
              <p>{activeTreatment.controller}</p>
            </DetailSection>
          )}
          {activeTreatment.reliever && (
            <DetailSection title="Traitement de Secours (Soulageur)">
              <p>{activeTreatment.reliever}</p>
            </DetailSection>
          )}
          {activeTreatment.keyPoints && activeTreatment.keyPoints.length > 0 && (
             <DetailSection title="Points Clés">
              <ul className="list-disc list-inside pl-1 space-y-0.5">
                {activeTreatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            </DetailSection>
          )}
          {activeTreatment.additional && (
            <DetailSection title="Considérations Supplémentaires">
              {typeof activeTreatment.additional === 'string' ? <p>{activeTreatment.additional}</p> : 
                <ul className="list-disc list-inside pl-1 space-y-0.5">{activeTreatment.additional.map((item, i) => <li key={i}>{item}</li>)}</ul>}
            </DetailSection>
          )}
          {activeTreatment.notes && (
            <div className="mt-2 p-2.5 bg-slate-50 border border-slate-100 rounded-md text-xs">
                <h4 className="font-semibold text-slate-500 mb-0.5">Remarques :</h4>
                {typeof activeTreatment.notes === 'string' ? <p className="text-slate-600">{activeTreatment.notes}</p> : 
                 <ul className="list-disc list-inside pl-3 text-slate-600 space-y-0.5">{activeTreatment.notes.map((item, i) => <li key={i}>{item}</li>)}</ul>}
            </div>
          )}
          {activeTreatment.referral && (
            <div className="mt-3 p-2.5 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
              <p className="font-semibold text-amber-700 text-sm">Référence Spécialisée :</p>
              <p className="text-sm text-amber-600">{activeTreatment.referral}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-600">Aucun détail de traitement spécifique trouvé pour cette sélection.</p>
      )}

      {currentStepDetails?.alternatives && currentStepDetails.alternatives.length > 0 && youngChild_currentGinaStep === 2 && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Choisir une autre option pour le Palier {youngChild_currentGinaStep} :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
                onClick={() => handleStrategyChange('preferred')}
                variant={youngChild_currentTreatmentStrategy === 'preferred' ? 'primary' : 'secondary'}
                className={youngChild_currentTreatmentStrategy === 'preferred' ? 'bg-violet-500 hover:bg-violet-600 focus:ring-violet-400' : ''}
              >
                {currentStepDetails.preferred.name || "Préférée"}
            </Button>
            {currentStepDetails.alternatives.map((alt) => (
              <Button
                key={alt.id}
                onClick={() => handleStrategyChange(alt.id)}
                variant={youngChild_currentTreatmentStrategy === alt.id ? 'primary' : 'secondary'}
                 className={youngChild_currentTreatmentStrategy === alt.id ? 'bg-violet-500 hover:bg-violet-600 focus:ring-violet-400' : ''}
              >
                {alt.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {youngChild_currentGinaStep !== 4 && ( 
          <div className="mt-8 pt-4 border-t border-slate-200">
            <h3 className="text-base font-semibold mb-3 text-center text-slate-700">Ajuster le Palier de Traitement :</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(youngChild_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Diminuer le palier de traitement"
                size="md"
            >
                Diminuer Palier
            </Button>
            <Button 
                onClick={() => handleStepChange(youngChild_currentGinaStep + 1)} 
                disabled={!canStepUp}
                variant="secondary"
                leftIcon={<PlusCircle />}
                aria-label="Augmenter le palier de traitement"
                size="md"
            >
                Augmenter Palier
            </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
            Augmenter si mal contrôlé après vérification. Diminuer si bien contrôlé pendant 3 mois. Référence aux Paliers 3 et 4.
            </p>
        </div>
      )}
      {(youngChild_currentGinaStep === 3 || youngChild_currentGinaStep === 4) && (
        <div className="mt-6 p-3 bg-amber-100 border-l-4 border-amber-500 rounded-lg">
            <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0"/>
                <p className="text-sm text-amber-700">
                    Une référence à un spécialiste est <strong className="font-semibold">fortement recommandée</strong> au Palier 3 et <strong className="font-semibold">indispensable</strong> au Palier 4.
                </p>
            </div>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
        <Button 
          onClick={() => navigateTo('YOUNG_CHILD_FOLLOW_UP_STEP')}
          fullWidth 
          variant="primary"
          className="bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
          size="lg"
          rightIcon={<ChevronRight />}
          aria-label="Procéder à la planification du suivi"
        >
          Planifier Suivi
        </Button>
         <Button 
          onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_INTRO_STEP')} 
          fullWidth 
          variant="warning"
          size="lg"
          leftIcon={<Zap />}
          rightIcon={<ChevronRight />}
          aria-label="Voir le plan de gestion d'épisode de sibilances"
        >
          Gérer Épisode de Sibilances
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildTreatmentPlanStep;