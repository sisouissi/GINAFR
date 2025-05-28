import React, { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { AdultControlLevel } from '../../../types';
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight, ListChecks } from 'lucide-react';

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
    questionText: 'Au cours des 4 dernières semaines, avez-vous eu des symptômes d\'asthme diurnes plus de deux fois par semaine ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'activityLimitation',
    questionText: 'Au cours des 4 dernières semaines, avez-vous eu une limitation d\'activité due à l\'asthme ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'nocturnalSymptoms',
    questionText: 'Au cours des 4 dernières semaines, avez-vous eu des réveils nocturnes ou des symptômes matinaux dus à l\'asthme ?',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
  {
    id: 'relieverNeed',
    questionText: 'Au cours des 4 dernières semaines, avez-vous eu besoin d\'utiliser votre médicament de secours pour des symptômes plus de deux fois par semaine ? (Sans compter l\'utilisation préventive avant l\'exercice)',
    options: [{ label: 'Oui', value: 1 }, { label: 'Non', value: 0 }],
  },
];

const AdultControlAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { updatePatientData } = usePatientData();
  const [answers, setAnswers] = useState<ControlAnswers>({
    daytimeSymptoms: null,
    activityLimitation: null,
    nocturnalSymptoms: null,
    relieverNeed: null,
  });
  const [controlLevel, setControlLevel] = useState<AdultControlLevel | null>(null);

  const handleAnswerChange = (questionId: keyof ControlAnswers, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setControlLevel(null); 
  };

  const assessControl = () => {
    const score = Object.values(answers).reduce((acc, val) => acc + (val || 0), 0);
    let level: AdultControlLevel;
    if (score === 0) {
      level = 'wellControlled';
    } else if (score >= 1 && score <= 2) {
      level = 'partlyControlled';
    } else {
      level = 'uncontrolled';
    }
    setControlLevel(level);
    updatePatientData({ adult_controlLevel: level });
  };

  const allQuestionsAnswered = Object.values(answers).every(ans => ans !== null);

  const getResultStyling = (level: AdultControlLevel | null) => {
    if (level === 'wellControlled') return { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-700', icon: <CheckCircle2 size={28} className="text-emerald-600 mr-3" /> };
    if (level === 'partlyControlled') return { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: <AlertTriangle size={28} className="text-amber-600 mr-3" /> };
    if (level === 'uncontrolled') return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: <XCircle size={28} className="text-red-600 mr-3" /> };
    return { bg: '', border: '', text: '', icon: null };
  };
  
  const resultStyle = getResultStyling(controlLevel);

  return (
    <Card title="Évaluation du Contrôle de l'Asthme (Adulte)" icon={<ListChecks className="text-sky-600" />}>
      <p className="mb-1 text-sm text-slate-600">
        Répondez aux questions suivantes concernant les <strong>4 dernières semaines</strong> du patient.
      </p>
      <p className="mb-6 text-xs text-slate-500">Ceci aide à déterminer le niveau de contrôle de l'asthme selon les critères GINA.</p>

      <div className="space-y-6">
        {questions.map(q => (
          <div key={q.id} className="p-4 border border-slate-200 rounded-lg bg-white">
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
                  aria-label={`${q.questionText} - Réponse : ${opt.label}`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allQuestionsAnswered && !controlLevel && (
        <div className="mt-8 text-center">
          <Button onClick={assessControl} variant="primary" size="lg" aria-label="Évaluer le niveau de contrôle">
            Évaluer le Niveau de Contrôle
          </Button>
        </div>
      )}

      {controlLevel && (
        <div className={`mt-8 p-5 rounded-lg border-l-4 ${resultStyle.bg} ${resultStyle.border}`}>
          <div className="flex items-center mb-3">
            {resultStyle.icon}
            <h3 className={`text-xl font-semibold ${resultStyle.text}`}>
              L'asthme est : <span className="font-bold">
                {controlLevel === 'wellControlled' ? 'Bien Contrôlé' :
                 controlLevel === 'partlyControlled' ? 'Partiellement Contrôlé' :
                 'Non Contrôlé'}
              </span>
            </h3>
          </div>
          <p className={`text-sm ${resultStyle.text} mb-4 leading-relaxed`}>
            {controlLevel === 'wellControlled' && "Maintenir le traitement actuel. Réévaluer dans 1-3 mois. Envisager de diminuer le traitement si bien contrôlé pendant 3 mois."}
            {controlLevel === 'partlyControlled' && "Envisager d'augmenter le palier de traitement. Revoir les facteurs de risque modifiables et les comorbidités. Réévaluer la réponse dans 2-6 semaines."}
            {controlLevel === 'uncontrolled' && "Augmenter le palier de traitement en urgence. Revoir les facteurs de risque modifiables et les comorbidités. Envisager une courte cure de CSO pour les cas sévères. Réévaluer la réponse dans 2 semaines."}
          </p>
          <Button onClick={() => navigateTo('ADULT_FOLLOW_UP_STEP')} fullWidth rightIcon={<ChevronRight />} variant="primary" size="lg">
            Procéder à la Planification du Suivi
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AdultControlAssessmentStep;