import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
// Button component might not be directly used if options are custom styled buttons/cards
import { AdultSymptomFrequency } from '../../../types';
import { ClipboardList, ChevronRight, HelpCircle } from 'lucide-react';

const AdultSymptomFrequencyStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (frequency: AdultSymptomFrequency, initialGinaStep: 1 | 2 | 3 | 4) => {
    let stepForData: 1 | 2 | 3 | 4 = initialGinaStep;
    // GINA Paliers 1 et 2 sont regroupés pour l'initiation de la Voie 1 (CSI-formotérol PRN)
    // mais on les distingue ici pour la logique initiale avant le choix de la voie.
    // Le traitement sera basé sur le palier GINA exact.
    // La Voie 1, Paliers 1-2, utilise CSI-formotérol PRN. La Voie 2 distingue Palier 1 et Palier 2.
    // Pour simplifier la donnée stockée avant le choix de voie, nous utiliserons le palier tel que défini.
    // adult_currentGinaStep sera mis à jour plus précisément dans AdultTreatmentPlanStep si besoin.

    navigateTo('ADULT_PATHWAY_SELECTION_STEP', {
      adult_symptomFrequency: frequency,
      adult_currentGinaStep: initialGinaStep, 
    });
  };
  
  const options = [
    {
      label: "Symptômes moins de deux fois par mois",
      description: "Les symptômes d'asthme surviennent peu fréquemment.",
      frequency: 'lessThanTwiceAMonth' as AdultSymptomFrequency,
      ginaRef: "Palier GINA 1 (Voie 2) ou Palier 1-2 (Voie 1)",
      initialStep: 1
    },
    {
      label: "Symptômes deux fois par mois ou plus, mais pas quotidiennement",
      description: "Les symptômes sont plus fréquents mais ne constituent pas un fardeau quotidien.",
      frequency: 'twiceAMonthOrMore' as AdultSymptomFrequency,
      ginaRef: "Palier GINA 2 (Voie 2) ou Palier 1-2 (Voie 1)",
      initialStep: 2 
    },
    {
      label: "Symptômes la plupart des jours, OU réveil nocturne dû à l'asthme ≥ 1x/semaine",
      description: "Les symptômes d'asthme sont gênants et fréquents.",
      frequency: 'mostDaysOrWakingWeekly' as AdultSymptomFrequency,
      ginaRef: "Palier GINA 3",
      initialStep: 3
    },
    {
      label: "Asthme sévèrement non contrôlé, OU exacerbation actuelle",
      description: "Symptômes quotidiens importants, limitation marquée, ou exacerbation.",
      frequency: 'severeDailyOrExacerbation' as AdultSymptomFrequency,
      ginaRef: "Palier GINA 4",
      initialStep: 4
    },
  ];

  return (
    <Card title="Évaluation Initiale de l'Asthme chez l'Adulte" icon={<ClipboardList className="text-sky-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Évaluez les symptômes d'asthme typiques du patient au cours des <strong>4 dernières semaines</strong> pour guider la sélection du traitement initial, basé sur les recommandations GINA 2025 (Encart 3-5).
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.frequency}
            onClick={() => handleSelection(opt.frequency, opt.initialStep as 1 | 2 | 3 | 4)}
            className="w-full p-4 bg-white border border-slate-300 hover:border-sky-500 hover:bg-sky-50 rounded-lg text-left transition-all duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-label={`${opt.label}. ${opt.description}. ${opt.ginaRef}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sky-700 group-hover:text-sky-800 text-base">{opt.label}</h3>
                <p className="text-sm text-slate-600 mt-1">{opt.description}</p>
                <p className="text-xs text-sky-500 group-hover:text-sky-600 mt-1.5 font-medium">{opt.ginaRef}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-sky-500 transition-colors flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
       <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cette évaluation aide à déterminer le palier de traitement GINA initial. La voie thérapeutique (Voie 1 ou Voie 2) sera sélectionnée à la prochaine étape.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AdultSymptomFrequencyStep;