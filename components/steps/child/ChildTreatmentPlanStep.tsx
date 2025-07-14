
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { childTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, ChildGINASteps, ChildPathway, ControlLevel } from '../../../types';
import { Pill, ChevronRight, PlusCircle, MinusCircle, AlertTriangle, Activity, Zap, ShieldCheck, BookOpen, CheckCircle2, XCircle, Info, TrendingUp } from 'lucide-react';
import DetailSection from '../../common/DetailSection';
import ManagementCycleWidget from '../../common/ManagementCycleWidget';

const ChildTreatmentPlanStep: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const { child_currentGinaStep, child_pathway, child_controlLevel } = patientData;

  if (!child_currentGinaStep || !child_pathway) {
    return (
      <Card title="Erreur : Données manquantes" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Les informations sur le palier GINA ou la voie thérapeutique de l'enfant sont manquantes. Veuillez retourner aux étapes précédentes.</p>
         <div className="mt-4">
            <Button onClick={() => navigateTo('CHILD_PATHWAY_SELECTION_STEP')} variant="secondary">
            Retour à la Sélection de la Voie
            </Button>
        </div>
      </Card>
    );
  }
  
  const pathwaySpecificTreatments = childTreatments[child_pathway as ChildPathway];
  const treatment: TreatmentDetail | undefined = pathwaySpecificTreatments ? pathwaySpecificTreatments[child_currentGinaStep as ChildGINASteps] : undefined;

  const currentStepName = `Palier GINA ${child_currentGinaStep}`;
  const pathwayNameDisplay = child_pathway === 'track1' ? 'Voie 1 (MART avec CSI-formotérol)' : 'Voie 2 (Secours par SABA)';


  const canStepUp = child_currentGinaStep < 4;
  const canStepDown = child_currentGinaStep > 1;

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 4) {
      updatePatientData({ 
        child_currentGinaStep: newStep as ChildGINASteps,
        child_controlLevel: null, // Réinitialiser le niveau de contrôle
        child_reviewReminderDate: null,
      });
    }
  };
  
  const ControlResultDisplay: React.FC<{ level: ControlLevel | null }> = ({ level }) => {
    if (!level) return null;

    const styles = {
        wellControlled: { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-700', icon: <CheckCircle2 size={24} className="text-emerald-600 mr-3" /> },
        partlyControlled: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: <AlertTriangle size={24} className="text-amber-600 mr-3" /> },
        uncontrolled: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: <XCircle size={24} className="text-red-600 mr-3" /> },
    };

    const style = styles[level];
    const levelText = level === 'wellControlled' ? 'Bien Contrôlé' : level === 'partlyControlled' ? 'Partiellement Contrôlé' : 'Non Contrôlé';
    const advice = {
        wellControlled: "Maintenir le palier actuel. Envisager de diminuer après 3 mois de stabilité.",
        partlyControlled: "Envisager d'augmenter le traitement. Revoir l'observance, la technique d'inhalation et les facteurs de risque modifiables.",
        uncontrolled: "Augmenter le traitement. Revoir l'observance, la technique et les facteurs de risque. Envisager une courte cure de CSO pour les cas sévères."
    };
    
    return (
        <div className={`my-6 p-4 rounded-lg border-l-4 ${style.bg} ${style.border}`}>
            <div className="flex items-center">
                {style.icon}
                <h3 className={`text-lg font-semibold ${style.text}`}>
                L'asthme est {levelText}
                </h3>
            </div>
            <p className={`text-sm ${style.text} mt-2 pl-9`}>{advice[level]}</p>
            <div className="mt-3 pl-9">
                {(level === 'partlyControlled' || level === 'uncontrolled') && canStepUp && (
                     <Button onClick={() => handleStepChange(child_currentGinaStep + 1)} variant="warning" size="sm" leftIcon={<TrendingUp size={16} />}>
                        Augmenter le Traitement
                    </Button>
                )}
            </div>
        </div>
    );
  };

  return (
    <Card title="Plan de Traitement de l'Asthme (Enfant 6-11 ans)" icon={<Activity className="text-emerald-600" />}>
      <ManagementCycleWidget ageGroup="child" />

      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-md font-semibold text-emerald-700">{pathwayNameDisplay}</p>
        <p className="text-2xl font-bold text-emerald-800">{currentStepName}</p>
        <p className="text-xs text-slate-500 mt-1">Basé sur les recommandations GINA 2025 pour les enfants de 6 à 11 ans.</p>
      </div>

      <ControlResultDisplay level={child_controlLevel} />

      <div className="space-y-5 bg-white p-4 rounded-md border border-slate-200">
          {treatment ? (
            <>
              {treatment.controller && (
                <DetailSection title="Traitement de Fond" icon={<ShieldCheck className="text-emerald-500"/>}>
                  <p>{treatment.controller}</p>
                </DetailSection>
              )}
              {treatment.reliever && (
                <DetailSection title="Traitement de Secours" icon={<Zap className="text-blue-500"/>}>
                  <p>{treatment.reliever}</p>
                </DetailSection>
              )}
              {treatment.keyPoints && treatment.keyPoints.length > 0 && (
                <DetailSection title="Points Clés" icon={<Info className="text-sky-500"/>}>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {treatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                  </ul>
                </DetailSection>
              )}
              {treatment.additional && (
                <DetailSection title="Considérations / Options Supplémentaires" icon={<PlusCircle className="text-cyan-500"/>}>
                  {typeof treatment.additional === 'string' ? (
                    <p className="text-sm">{treatment.additional}</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {treatment.additional.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  )}
                </DetailSection>
              )}
              {treatment.notes && (
                <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-md text-sm">
                    <h4 className="font-semibold text-slate-600 mb-1 flex items-center"><Info size={16} className="mr-2"/>Remarques Importantes :</h4>
                    {typeof treatment.notes === 'string' ? (
                        <p className="text-slate-600 leading-relaxed pl-6">{treatment.notes}</p>
                    ) : (
                        <ul className="list-disc list-inside pl-6 text-slate-600 space-y-1 leading-relaxed">
                        {treatment.notes.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    )}
                </div>
              )}
              {treatment.referral && (
                <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-md">
                   <h4 className="font-semibold text-amber-700 text-sm flex items-center"><AlertTriangle size={16} className="mr-2"/>Orientation vers un Spécialiste Recommandée</h4>
                  <p className="text-sm text-amber-600 leading-relaxed pl-6">{treatment.referral}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-slate-600">Aucun détail de traitement spécifique trouvé pour ce palier et cette voie.</p>
          )}
      </div>

       <div className="mt-6 pt-4 border-t border-slate-200 bg-white p-4 rounded-md">
        <h3 className="text-base font-semibold text-slate-800 mb-2">Gestion Continue des Facteurs de Risque</h3>
        <ul className="list-none space-y-3">
            <li className="flex items-start text-sm"><BookOpen size={18} className="mr-3 mt-0.5 text-sky-600 flex-shrink-0" /><span>Fournir un <strong>Plan d'Action Écrit pour l'Asthme</strong> et s'assurer que les parents/l'enfant comprennent son utilisation.</span></li>
            <li className="flex items-start text-sm"><ShieldCheck size={18} className="mr-3 mt-0.5 text-emerald-600 flex-shrink-0" /><span>Vérifier la <strong>technique d'inhalation</strong> (avec chambre d'inhalation) et <strong>l'observance</strong> à chaque visite.</span></li>
            <li className="flex items-start text-sm"><AlertTriangle size={18} className="mr-3 mt-0.5 text-amber-600 flex-shrink-0" /><span>Discuter et gérer les <strong>déclencheurs environnementaux</strong> (ex: fumée de tabac, allergènes).</span></li>
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-200">
        <div>
            <h3 className="text-base font-semibold mb-2 text-center text-slate-700">Ajuster le Palier de Traitement ({pathwayNameDisplay}):</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(child_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Diminuer le palier de traitement"
                size="md"
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
                size="md"
            >
                Augmenter
            </Button>
            </div>
            <p className="text-xs text-slate-500 text-center">
            Augmenter si mal contrôlé. Diminuer si bien contrôlé pendant 3 mois. La technique d'inhalation et l'observance sont cruciales.
            </p>
        </div>
      </div>
    </Card>
  );
};

export default ChildTreatmentPlanStep;
