
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { adultTreatments } from '../../../constants/treatmentData';
import { TreatmentDetail, ControlLevel } from '../../../types';
import { Pill, PlusCircle, MinusCircle, AlertTriangle, Wind, ShieldCheck, Route, FileText, Info, CheckCircle2, XCircle, TrendingDown, TrendingUp } from 'lucide-react';
import DetailSection from '../../common/DetailSection';
import ManagementCycleWidget from '../../common/ManagementCycleWidget';

const AdultTreatmentPlanStep: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const { navigateTo } = useNavigation();
  const { adult_pathway, adult_currentGinaStep, adult_controlLevel } = patientData;

  if (!adult_pathway || !adult_currentGinaStep) {
    return (
      <Card title="Erreur : Données manquantes" icon={<AlertTriangle className="text-red-500" />} className="border-red-300 bg-red-50">
        <p>Les informations sur la voie thérapeutique ou le palier GINA sont manquantes. Veuillez retourner aux étapes précédentes.</p>
        <div className="mt-4">
            <Button onClick={() => navigateTo('ADULT_PATHWAY_SELECTION_STEP')} variant="secondary">
            Retour à la sélection de la voie
            </Button>
        </div>
      </Card>
    );
  }

  const pathwayTreatments = adult_pathway === 'pathway1' ? adultTreatments.pathway1 : adultTreatments.pathway2;
  const treatment: TreatmentDetail | undefined = pathwayTreatments[adult_currentGinaStep as keyof typeof pathwayTreatments];

  const currentStepName = `Palier GINA ${adult_currentGinaStep}`;
  const pathwayName = adult_pathway === 'pathway1' ? 'Voie 1 (Secours par CSI-formotérol)' : 'Voie 2 (Secours par SABA)';

  const canStepUp = adult_currentGinaStep < 5;
  const canStepDown = adult_currentGinaStep > 1;

  const handleStepChange = (newStep: number) => {
    if (newStep >= 1 && newStep <= 5) {
      updatePatientData({ 
        adult_currentGinaStep: newStep as 1 | 2 | 3 | 4 | 5,
        adult_controlLevel: null, // Réinitialiser le niveau de contrôle lors du changement de palier
        adult_reviewReminderDate: null,
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
        uncontrolled: "Augmenter le traitement. Revoir l'observance, la technique et les facteurs de risque. Envisager une courte cure de CSO si sévère."
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
                {level === 'wellControlled' && canStepDown && (
                    <Button onClick={() => navigateTo('STEP_DOWN_ASSESS_STEP')} variant="secondary" size="sm" leftIcon={<TrendingDown size={16}/>}>
                        Voir le Guide de Diminution
                    </Button>
                )}
                {(level === 'partlyControlled' || level === 'uncontrolled') && canStepUp && (
                    <Button onClick={() => handleStepChange(adult_currentGinaStep + 1)} variant="warning" size="sm" leftIcon={<TrendingUp size={16}/>}>
                        Augmenter le Traitement
                    </Button>
                )}
            </div>
        </div>
    );
  };


  return (
    <Card title="Plan de Traitement de l'Asthme Adulte" icon={<Pill className="text-sky-600" />}>
      <ManagementCycleWidget ageGroup="adult" />

      <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <p className="text-md font-semibold text-sky-700">{pathwayName}</p>
        <p className="text-2xl font-bold text-sky-800">{currentStepName}</p>
        <p className="text-sm font-semibold text-slate-600 mt-1">{treatment?.name}</p>
      </div>

      <ControlResultDisplay level={adult_controlLevel} />

      <div className="space-y-1 divide-y divide-slate-100">
        {treatment ? (
          <div className="space-y-1 bg-white p-4 rounded-md border border-slate-200">
            {treatment.controller && (
              <DetailSection title="Traitement de Fond" icon={<ShieldCheck className="text-emerald-500"/>}>
                <p>{treatment.controller}</p>
              </DetailSection>
            )}
            {treatment.reliever && (
              <DetailSection title="Traitement de Secours" icon={<Wind className="text-blue-500"/>}>
                <p>{treatment.reliever}</p>
              </DetailSection>
            )}
            {treatment.additional && (
              <DetailSection title="Options de Traitement de Fond Additionnelles / Alternatives" icon={<PlusCircle className="text-cyan-500"/>}>
                 {typeof treatment.additional === 'string' ? <p>{treatment.additional}</p> : <ul className="list-disc list-inside space-y-1">{treatment.additional.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              </DetailSection>
            )}
            {treatment.keyPoints && treatment.keyPoints.length > 0 && (
               <DetailSection title="Points Clés" icon={<Info className="text-sky-500"/>}>
                <ul className="list-disc list-inside space-y-1">
                  {treatment.keyPoints.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
              </DetailSection>
            )}
             {treatment.notes && (
               <DetailSection title="Remarques" icon={<FileText className="text-slate-500"/>}>
                {typeof treatment.notes === 'string' ? <p>{treatment.notes}</p> : <ul className="list-disc list-inside space-y-1">{treatment.notes.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              </DetailSection>
            )}
            {treatment.referral && (
                <div className="mt-3 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-md">
                    <h4 className="font-semibold text-amber-800 flex items-center text-sm"><AlertTriangle size={16} className="mr-2"/>Orientation vers un spécialiste</h4>
                    <p className="text-sm text-amber-700 mt-1 pl-6">{treatment.referral}</p>
                </div>
            )}
          </div>
        ) : (
          <p className="text-slate-600">Aucun détail de traitement spécifique trouvé pour cette combinaison de palier/voie.</p>
        )}

        <div className="space-y-2 bg-white p-4 rounded-md border border-slate-200 mt-4">
          <DetailSection title="Stratégies Non Pharmacologiques" icon={<Route className="text-indigo-500"/>}>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong>Arrêt du tabac/vapotage :</strong> Conseiller vivement d'arrêter et fournir un soutien. Éviter l'exposition au tabagisme passif.</li>
              <li><strong>Activité physique :</strong> Encourager une activité physique régulière. Conseiller sur la prévention des symptômes induits par l'exercice.</li>
              <li><strong>Gestion des déclencheurs :</strong> Identifier et éviter les déclencheurs confirmés (ex: allergènes, expositions professionnelles, médicaments comme les AINS).</li>
              <li><strong>Plan d'action :</strong> Fournir et expliquer un plan d'action écrit pour l'asthme.</li>
            </ul>
          </DetailSection>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-slate-200">
         <div>
            <h3 className="text-base font-semibold mb-2 text-center text-slate-700">Ajuster le Palier de Traitement :</h3>
            <div className="flex justify-center items-center space-x-3 mb-2">
            <Button 
                onClick={() => handleStepChange(adult_currentGinaStep - 1)} 
                disabled={!canStepDown}
                variant="secondary"
                leftIcon={<MinusCircle />}
                aria-label="Diminuer le palier de traitement"
                size="sm"
            >
                Diminuer
            </Button>
            <span className="text-lg font-bold text-sky-600 w-24 text-center py-1.5 border border-slate-300 rounded-md bg-slate-50">Palier {adult_currentGinaStep}</span>
            <Button 
                onClick={() => handleStepChange(adult_currentGinaStep + 1)} 
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
            Augmenter si mal contrôlé. Diminuer si bien contrôlé pendant 3 mois. Revoir les facteurs avant d'augmenter.
            </p>
        </div>
      </div>
    </Card>
  );
};

export default AdultTreatmentPlanStep;
