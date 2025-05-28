
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import { ChildInitialAssessment } from '../../../types';
import { ClipboardList, ChevronRight, HelpCircle, Activity } from 'lucide-react';

const ChildInitialAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (assessment: ChildInitialAssessment, initialGinaStep: 1 | 2 | 3 | 4) => {
    navigateTo('CHILD_PATHWAY_SELECTION_STEP', { // Navigate to pathway selection
      child_initialAssessment: assessment,
      child_currentGinaStep: initialGinaStep,
    });
  };
  
  const options = [
    {
      label: "Symptômes peu fréquents, OU sibilances induites par l'effort uniquement",
      description: "Symptômes légers, épisodiques.",
      assessment: 'infrequentOrMild' as ChildInitialAssessment,
      ginaRef: "Correspond au Palier GINA 1",
      initialStep: 1
    },
    {
      label: "Symptômes ou besoin de BACA ≥ 2x/mois, mais pas la plupart des jours",
      description: "Symptômes plus constants mais pas quotidiens.",
      assessment: 'symptomsTwiceAMonth' as ChildInitialAssessment,
      ginaRef: "Correspond au Palier GINA 2",
      initialStep: 2
    },
    {
      label: "Symptômes d'asthme gênants la plupart des jours, OU réveil nocturne ≥ 1x/semaine",
      description: "Symptômes fréquents et gênants affectant la vie quotidienne.",
      assessment: 'troublesomeDailyOrWaking' as ChildInitialAssessment,
      ginaRef: "Correspond au Palier GINA 3",
      initialStep: 3
    },
    {
      label: "Asthme sévèrement non contrôlé, OU exacerbation actuelle",
      description: "Symptômes sévères, quotidiens, ou l'enfant présente une exacerbation.",
      assessment: 'uncontrolledOnStep3' as ChildInitialAssessment,
      ginaRef: "Correspond au Palier GINA 4 (ou avis spécialisé)",
      initialStep: 4
    },
  ];

  return (
    <Card title="Évaluation Initiale de l'Asthme (Enfant 6-11 ans)" icon={<Activity className="text-emerald-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Évaluez les symptômes d'asthme typiques de l'enfant au cours des <strong>4 dernières semaines</strong> pour guider la sélection du traitement initial (GINA 2025, Encarts 4-10 & 4-11).
      </p>
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.assessment}
            onClick={() => handleSelection(opt.assessment, opt.initialStep as 1 | 2 | 3 | 4)}
            className="w-full p-4 bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 rounded-lg text-left transition-all duration-200 shadow-sm group focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label={`${opt.label}. ${opt.description}. ${opt.ginaRef}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-emerald-700 group-hover:text-emerald-800 text-base">{opt.label}</h3>
                <p className="text-sm text-slate-600 mt-1">{opt.description}</p>
                <p className="text-xs text-emerald-500 group-hover:text-emerald-600 mt-1.5 font-medium">{opt.ginaRef}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>
       <div className="mt-6 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cette évaluation aide à déterminer le palier de traitement GINA initial. Assurez-vous de la bonne technique d'inhalation et de l'utilisation d'une chambre d'inhalation.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ChildInitialAssessmentStep;
