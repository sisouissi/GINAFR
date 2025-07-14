
import React, { useState, useMemo, useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { TestResult } from '../../../types';
import Button from '../../ui/Button';
import TestHistory from '../TestHistory';
import { CheckCircle2, AlertTriangle, XCircle, Save, Lightbulb } from 'lucide-react';

const questions = [
  { id: 'q1', text: 'Au cours des 4 dernières semaines, à quelle fréquence votre asthme vous a-t-il empêché de faire tout ce que vous vouliez au travail, à l\'école ou à la maison ?', options: [{ label: 'Tout le temps', value: 1 }, { label: 'La plupart du temps', value: 2 }, { label: 'Parfois', value: 3 }, { label: 'Rarement', value: 4 }, { label: 'Jamais', value: 5 }] },
  { id: 'q2', text: 'Au cours des 4 dernières semaines, à quelle fréquence avez-vous été essoufflé(e) ?', options: [{ label: 'Plus d\'une fois par jour', value: 1 }, { label: 'Une fois par jour', value: 2 }, { label: '3 à 6 fois par semaine', value: 3 }, { label: 'Une ou deux fois par semaine', value: 4 }, { label: 'Pas du tout', value: 5 }] },
  { id: 'q3', text: 'Au cours des 4 dernières semaines, à quelle fréquence vos symptômes d\'asthme (sifflements, toux, essoufflement, oppression thoracique) vous ont-ils réveillé(e) la nuit ou plus tôt que d\'habitude le matin ?', options: [{ label: '4 nuits ou plus par semaine', value: 1 }, { label: '2 ou 3 nuits par semaine', value: 2 }, { label: 'Une fois par semaine', value: 3 }, { label: 'Une ou deux fois', value: 4 }, { label: 'Pas du tout', value: 5 }] },
  { id: 'q4', text: 'Au cours des 4 dernières semaines, à quelle fréquence avez-vous utilisé votre inhalateur de secours (comme le salbutamol) ?', options: [{ label: '3 fois ou plus par jour', value: 1 }, { label: '1 ou 2 fois par jour', value: 2 }, { label: '2 ou 3 fois par semaine', value: 3 }, { label: 'Une fois par semaine ou moins', value: 4 }, { label: 'Pas du tout', value: 5 }] },
  { id: 'q5', text: 'Comment évalueriez-vous le contrôle de votre asthme au cours des 4 dernières semaines ?', options: [{ label: 'Pas du tout contrôlé', value: 1 }, { label: 'Mal contrôlé', value: 2 }, { label: 'Assez bien contrôlé', value: 3 }, { label: 'Bien contrôlé', value: 4 }, { label: 'Totalement contrôlé', value: 5 }] },
];

const ACTModalContent: React.FC = () => {
  const { patientData, updatePatientData } = usePatientData();
  const [answers, setAnswers] = useState<Record<string, number | null>>({ q1: null, q2: null, q3: null, q4: null, q5: null });
  const [showResult, setShowResult] = useState(false);
  const [resultSaved, setResultSaved] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setShowResult(false);
    setResultSaved(false);
  };

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);
  }, [answers]);

  const interpretation = useMemo(() => {
    if (totalScore >= 20) return { text: 'Bien Contrôlé', Icon: CheckCircle2, color: 'text-emerald-600' };
    if (totalScore >= 16) return { text: 'Mal Contrôlé', Icon: AlertTriangle, color: 'text-amber-600' };
    return { text: 'Très Mal Contrôlé', Icon: XCircle, color: 'text-red-600' };
  }, [totalScore]);

  const allAnswered = Object.values(answers).every(ans => ans !== null);

  const handleCalculate = () => {
    if (allAnswered) {
      setShowResult(true);
    }
  };

  const handleSaveResult = useCallback(() => {
    if (totalScore > 0) {
      const newResult: TestResult = { date: new Date().toISOString(), score: totalScore };
      updatePatientData({ actHistory: [...patientData.actHistory, newResult] });
      setResultSaved(true);
    }
  }, [totalScore, patientData.actHistory, updatePatientData]);

  return (
    <div className="space-y-4">
      <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
        {questions.map(q => (
          <div key={q.id} className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="font-medium text-slate-700 mb-2 text-sm">{q.id.toUpperCase()}. {q.text}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {q.options.map(opt => (
                <Button
                  key={opt.value}
                  onClick={() => handleAnswerChange(q.id, opt.value)}
                  variant={answers[q.id] === opt.value ? 'primary' : 'secondary'}
                  size="sm"
                  className="!text-xs !py-1.5"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {!showResult && (
        <div className="mt-4 text-center">
          <Button onClick={handleCalculate} disabled={!allAnswered} size="lg">Calculer le Score</Button>
        </div>
      )}

      {showResult && (
        <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
          <p className="text-sm text-slate-600">Score ACT Total :</p>
          <p className="text-5xl font-bold my-2 text-sky-600">{totalScore}</p>
          <div className={`flex items-center justify-center font-semibold text-lg ${interpretation.color}`}>
            <interpretation.Icon className="mr-2" size={24} />
            {interpretation.text}
          </div>
          {!resultSaved && (
              <Button onClick={handleSaveResult} leftIcon={<Save size={16}/>} variant="success" className="mt-4">
                  Sauvegarder le Résultat
              </Button>
          )}
           {resultSaved && (
                <div className="mt-4 text-sm text-green-600 font-medium flex items-center justify-center">
                    <CheckCircle2 size={16} className="mr-2"/> Résultat Sauvegardé
                </div>
           )}
        </div>
      )}

      <TestHistory history={patientData.actHistory} testName="ACT" />

      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm">
        <Lightbulb className="inline-block mr-2" size={16}/>
        <strong>Interprétation :</strong> 25 = Contrôle total, &lt;20 = Non contrôlé. Un changement de score de 3 points est cliniquement significatif.
      </div>
    </div>
  );
};

export default ACTModalContent;