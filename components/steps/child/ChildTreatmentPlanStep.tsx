
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { childTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, ChildGINASteps, ChildPathway } from '../../../types';
import { Pill, ChevronRight, PlusCircle, MinusCircle, AlertTriangle, Activity, Zap } from 'lucide-react';

const ChildTreatmentPlanStep: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const { child_currentGinaStep, child_pathway } = patientData;

  if (!child_currentGinaStep || !child_pathway) {
    return (
      <Card title="Erreur : Données manquantes" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Les informations sur le palier GINA ou la voie thérapeutique de l'enfant sont manquantes. Veuillez retourner aux étapes précédentes.</p>
         <div className="mt-4">
            <Button onClick={() => navigateTo('CHILD_PATHWAY_SELECTION_STEP')} variant="secondary">
            Retourner à la sélection de voie
            </Button>
        </div>
      </Card>
    );
  }
  
  const pathwaySpecificTreatments = childTreatments[child_pathway as ChildPathway];
  const treatment: TreatmentDetail | undefined = pathwaySpecificTreatments ? pathwaySpecificTreatments[child_currentGinaStep as ChildGINASteps] : undefined;

  const currentStepName = `Palier GINA ${child_currentGinaStep}`;
  const pathwayNameDisplay = child_pathway === 'track1' ? 'Voie 1 (MART avec CSI-formotérol)' : 'Voie 2 (Soulageur BACA)';


  const canStepUp = child_currentGinaStep < 4;
  const canStepDown = child_currentGinaStep > 1;

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 4) {
      updatePatientData({ child_currentGinaStep: newStep as ChildGINASteps });
    }
  };

  const DetailSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={className}>
      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</h4>
      <div className="text-slate-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <Card title="Plan de Traitement de l'Asthme (Enfant 6-11 ans)" icon={<Activity className="text-emerald-600" />}>
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-md font-semibold text-emerald-700">{pathwayNameDisplay}</p>
        <p className="text-2xl font-bold text-emerald-800">{currentStepName}</p>
        <p className="text-xs text-slate-500 mt-1">Basé sur les recommandations GINA 2025 pour les enfants de 6-11 ans.</p>
      </div>

      {treatment ? (
        <div className="space-y-5">
          {treatment.controller && (
            <DetailSection title="Traitement de Fond (Contrôleur)">
              <p>{treatment.controller}</p>
            </DetailSection>
          )}
          {treatment.reliever && (
            <DetailSection title="Traitement de Secours (Soulageur)">
              <p>{treatment.reliever}</p>
            </DetailSection>
          )}
          {treatment.keyPoints && treatment.keyPoints.length > 0 && (
             <DetailSection title="Points Clés">
              <ul className="list-disc list-inside pl-1 space-y-1 text-sm">
                {treatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            </DetailSection>
          )}
          {treatment.additional && (
            <DetailSection title="Considérations / Options Supplémentaires">
               {typeof treatment.additional === 'string' ? (
                <p className="text-sm">{treatment.additional}</p>
              ) : (
                <ul className="list-disc list-inside pl-1 space-y-1 text-sm">
                  {treatment.additional.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              )}
            </DetailSection>
          )}
          {treatment.notes && (
             <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-md text-sm">
                <h4 className="font-semibold text-slate-600 mb-1">Remarques Importantes :</h4>
                 {typeof treatment.notes === 'string' ? (
                    <p className="text-slate-600 leading-relaxed">{treatment.notes}</p>
                ) : (
                    <ul className="list-disc list-inside pl-4 text-slate-600 space-y-1 leading-relaxed">
                    {treatment.notes.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                )}
            </div>
          )}
          {treatment.referral && (
            <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-md">
              <p className="font-semibold text-amber-700 text-sm">Référence Spécialisée Recommandée :</p>
              <p className="text-sm text-amber-600 leading-relaxed">{treatment.referral}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-slate-600">Aucun détail de traitement spécifique trouvé pour ce palier et cette voie.</p>
      )}

      <div className="mt-8 space-y-4">
         <div>
            <h3 className="text-base font-semibold mb-2 text-center text-slate-700">Ajuster le Palier de Traitement ({pathwayNameDisplay}) :</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(child_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Diminuer le palier de traitement"
                size="sm"
            >
                Diminuer
            </Button>
            <span className="text-lg font-bold text-emerald-600 w-24 text-center py-1.5 border border-slate-300 rounded-md bg-slate-50">Palier {child_currentGinaStep}</span>
            <Button 
                onClick={() => handleStepChange(child_currentGinaStep + 1)} 
                disabled={!canStepUp}
                variant="secondary"
                leftIcon={<PlusCircle />}
                aria-label="Augmenter le palier de traitement"
                size="sm"
            >
                Augmenter
            </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
            Augmenter si mal contrôlé. Diminuer si bien contrôlé pendant 3 mois. Technique d'inhalation et observance cruciales.
            </p>
        </div>
        <div className="pt-4 border-t border-slate-200 space-y-3">
            <Button 
            onClick={() => navigateTo('CHILD_FOLLOW_UP_STEP')} 
            fullWidth 
            variant="success" // Success variant for child pathway primary actions
            size="lg"
            rightIcon={<ChevronRight />}
            aria-label="Procéder au suivi"
            >
            Planifier Suivi
            </Button>
            <Button 
            onClick={() => navigateTo('CHILD_EXACERBATION_INTRO_STEP')} 
            fullWidth 
            variant="warning"
            size="lg"
            leftIcon={<Zap />}
            rightIcon={<ChevronRight />}
            aria-label="Voir le plan d'exacerbation"
            >
            Gérer une Exacerbation
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChildTreatmentPlanStep;