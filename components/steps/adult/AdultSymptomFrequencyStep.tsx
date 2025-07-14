
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AdultSymptomFrequency } from '../../../types';
import { ClipboardList, ChevronRight, HelpCircle } from 'lucide-react';

const AdultSymptomFrequencyStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (frequency: AdultSymptomFrequency, initialGinaStep: 1 | 2 | 3 | 4) => {
    navigateTo('ADULT_PATHWAY_SELECTION_STEP', {
      adult_symptomFrequency: frequency,
      adult_currentGinaStep: initialGinaStep,
    });
  };

  const FlowchartSection: React.FC<{
    title: string;
    description: React.ReactNode;
    startStep: string;
    track1Treatment: string;
    track2Treatment: string;
    children: React.ReactNode;
  }> = ({ title, description, startStep, track1Treatment, track2Treatment, children }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <div className="text-sm text-slate-600 my-2">{description}</div>
      <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-100">
        <p className="text-sm font-semibold text-slate-700">Début Recommandé : <span className="text-sky-600 font-bold">{startStep}</span></p>
        <div className="mt-2 text-xs space-y-1">
          <p><strong className="text-emerald-600">Voie 1 (Préférée) :</strong> {track1Treatment}</p>
          <p><strong className="text-sky-600">Voie 2 (Alternative) :</strong> {track2Treatment}</p>
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );

  return (
    <Card title="Organigramme pour la Sélection du Traitement Initial (Adultes)" icon={<ClipboardList className="text-sky-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        En fonction des symptômes et du profil de risque du patient, sélectionnez le point de départ le plus approprié pour le traitement initial de l'asthme selon GINA 2025, Encadré 4-5.
      </p>
      <div className="space-y-6">
        
        <FlowchartSection
          title="Symptômes Très Mal Contrôlés & Risque Élevé"
          description={
            <p>{'Le patient a '}<strong>à la fois</strong>{' une charge de symptômes élevée (symptômes quotidiens ou réveils nocturnes une fois par semaine ou plus) '}<strong>ET</strong>{' une fonction pulmonaire basse ou a eu une exacerbation récente.'}</p>
          }
          startStep="Palier 4"
          track1Treatment="CSI-formotérol à dose moyenne en MART"
          track2Treatment="CSI-BALA à dose moyenne + SABA à la demande"
        >
          <Button 
            onClick={() => handleSelection('severeDailyOrExacerbation', 4)}
            variant="danger"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner cette présentation (Début au Palier 4)
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Symptômes d'Asthme Gênants"
          description={
            <p>Le patient a des symptômes <strong>la plupart des jours</strong> OU se <strong>réveille la nuit</strong> au moins une fois par semaine, OU a une fonction pulmonaire réduite.</p>
          }
          startStep="Palier 3"
          track1Treatment="CSI-formotérol à faible dose en MART"
          track2Treatment="CSI-BALA à faible dose + SABA à la demande"
        >
          <Button
            onClick={() => handleSelection('mostDaysOrWakingWeekly', 3)}
            variant="primary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner cette présentation (Début au Palier 3)
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Symptômes Plus Fréquents"
          description={
             <p>Le patient a des symptômes <strong>deux fois par mois ou plus</strong>, mais pas la plupart des jours. Inclut les réveils dus à l'asthme moins d'une fois par semaine.</p>
          }
          startStep="Palier 2"
          track1Treatment="CSI-formotérol à faible dose à la demande"
          track2Treatment="CSI à faible dose quotidien + SABA à la demande"
        >
          <Button
            onClick={() => handleSelection('twiceAMonthOrMore', 2)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner cette présentation (Début au Palier 2)
          </Button>
        </FlowchartSection>

         <FlowchartSection
          title="Symptômes Peu Fréquents"
          description={
             <p>Le patient a des symptômes <strong>moins de deux fois par mois</strong> et aucun réveil dû à l'asthme.</p>
          }
          startStep="Palier 1"
          track1Treatment="CSI-formotérol à faible dose à la demande"
          track2Treatment="CSI pris à chaque utilisation de SABA"
        >
          <Button
            onClick={() => handleSelection('lessThanTwiceAMonth', 1)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner cette présentation (Début au Palier 1)
          </Button>
        </FlowchartSection>
      </div>

       <div className="mt-8 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cet organigramme guide le choix du palier GINA initial. L'étape suivante sera la sélection de la voie thérapeutique.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AdultSymptomFrequencyStep;
