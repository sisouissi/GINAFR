
import React, { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { useUIState } from '../../../contexts/UIStateContext';
import { ControlLevel } from '../../../types';
import { ChevronRight, ListChecks, Baby } from 'lucide-react';
import CACTModalContent from '../../common/modal_content/cACTModalContent';

interface ControlQuestion {
  id: keyof ControlAnswers;
  questionText: string;
  options: { label: string; value: number }[];
}

interface ControlAnswers {
  daytimeSymptoms: number | null;
  activityLimitation: number | null;
  nocturnalSymptoms: number | null;
  relieverNeed: number | null;
}

const questions: ControlQuestion[] = [
  {
    id: 'daytimeSymptoms',
    questionText: 'Au cours des 4 dernières semaines, l\'enfant a-t-il eu des symptômes d\'asthme diurnes plus de deux fois par semaine ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'activityLimitation',
    questionText: 'Au cours des 4 dernières semaines, l\'enfant a-t-il eu une limitation d\'activité (ex: court/joue moins, se fatigue facilement) ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'nocturnalSymptoms',
    questionText: 'Au cours des 4 dernières semaines, l\'enfant a-t-il eu des réveils nocturnes ou une toux dus à l\'asthme ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'relieverNeed',
    questionText: 'Au cours des 4 dernières semaines, l\'enfant a-t-il eu besoin de SABA de secours pour des symptômes plus de deux fois par semaine ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
];

const YoungChildControlAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { openInfoModal } = useUIState();
  const [answers, setAnswers] = useState<ControlAnswers>({
    daytimeSymptoms: null,
    activityLimitation: null,
    nocturnalSymptoms: null,
    relieverNeed: null,
  });

  const handleAnswerChange = (questionId: keyof ControlAnswers, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const assessAndNavigate = () => {
    const score = Object.values(answers).reduce((acc, val) => acc + (val || 0), 0);
    let level: ControlLevel;
    if (score === 0) {
      level = 'wellControlled';
    } else if (score >= 1 && score <= 2) {
      level = 'partlyControlled';
    } else {
      level = 'uncontrolled';
    }
    navigateTo('YOUNG_CHILD_TREATMENT_PLAN_STEP', { youngChild_controlLevel: level });
  };

  const allQuestionsAnswered = Object.values(answers).every(ans => ans !== null);

  return (
    <Card title="Évaluation du Contrôle de l'Asthme (Enfant ≤5 ans)" icon={<Baby className="text-violet-600" />}>
      <p className="mb-1 text-sm text-slate-600">
        Basé sur le rapport des parents/soignants pour les <strong>4 dernières semaines</strong>, évaluez le niveau de contrôle des symptômes (basé sur GINA 2025, Encadré 11-1).
      </p>
      
      <div className="space-y-6 mt-6">
        {questions.map(q => (
          <div key={q.id} className="p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
            <p className="font-medium text-slate-700 mb-3 text-sm">{q.questionText}</p>
            <div className="flex space-x-2">
              {q.options.map(opt => (
                <Button
                  key={opt.value}
                  onClick={() => handleAnswerChange(q.id, opt.value)}
                  variant={answers[q.id] === opt.value ? (opt.value === 1 ? 'warning' : 'success') : 'secondary'}
                  size="md"
                  fullWidth
                  aria-pressed={answers[q.id] === opt.value}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button 
            onClick={assessAndNavigate} 
            disabled={!allQuestionsAnswered} 
            fullWidth 
            rightIcon={<ChevronRight />} 
            variant="violet" 
            size="xl"
        >
          Terminer l'Évaluation & Revoir le Plan
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <h3 className="font-semibold text-center text-slate-700 mb-3">Ou utiliser un outil validé pour l'évaluation et le suivi :</h3>
        <div className="flex justify-center gap-4">
            <Button onClick={() => openInfoModal("Test de Contrôle de l'Asthme pour Enfant (cACT)", <CACTModalContent />)} variant="violet" size="lg">
                Faire le test c-ACT
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default YoungChildControlAssessmentStep;
