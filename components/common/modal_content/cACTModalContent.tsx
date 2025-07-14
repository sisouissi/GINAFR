
import React, { useState, useMemo, useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { TestResult } from '../../../types';
import Button from '../../ui/Button';
import TestHistory from '../TestHistory';
import { CheckCircle2, AlertTriangle, Save, Lightbulb, User, Users } from 'lucide-react';

const childQuestions = [
  { id: 'cq1', text: 'Comment va ton asthme aujourd\'hui ?', options: [{ label: 'Très bien', value: 3 }, { label: 'Bien', value: 2 }, { label: 'Pas très bien', value: 1 }, { label: 'Mal', value: 0 }] },
  { id: 'cq2', text: 'À quel point ton asthme te gêne quand tu cours, fais de l\'exercice ou du sport ?', options: [{ label: 'Pas du tout', value: 3 }, { label: 'Un petit peu', value: 2 }, { label: 'Assez', value: 1 }, { label: 'Beaucoup', value: 0 }] },
  { id: 'cq3', text: 'Est-ce que tu tousses à cause de ton asthme ?', options: [{ label: 'Pas du tout', value: 3 }, { label: 'Un petit peu', value: 2 }, { label: 'Assez', value: 1 }, { label: 'Beaucoup', value: 0 }] },
  { id: 'cq4', text: 'Est-ce que tu te réveilles la nuit à cause de ton asthme ?', options: [{ label: 'Jamais', value: 3 }, { label: 'Une ou deux fois', value: 2 }, { label: 'Quelques fois', value: 1 }, { label: 'Très souvent', value: 0 }] },
];

const parentQuestions = [
  { id: 'pq1', text: 'Au cours des 4 dernières semaines, à quelle fréquence votre enfant a-t-il eu des symptômes d\'asthme pendant la journée ?', options: [{ label: 'Pas du tout', value: 5 }, { label: '1 à 3 jours', value: 4 }, { label: '4 à 10 jours', value: 3 }, { label: '11 à 20 jours', value: 2 }, { label: '21 jours à tous les jours', value: 1 }, { label: 'Tous les jours', value: 0 }] },
  { id: 'pq2', text: 'Au cours des 4 dernières semaines, à quelle fréquence votre enfant a-t-il sifflé pendant la journée à cause de l\'asthme ?', options: [{ label: 'Pas du tout', value: 3 }, { label: 'Une ou deux fois', value: 2 }, { label: 'Quelques fois', value: 1 }, { label: 'Très souvent', value: 0 }] },
  { id: 'pq3', text: 'Au cours des 4 dernières semaines, à quelle fréquence votre enfant s\'est-il réveillé la nuit à cause de l\'asthme ?', options: [{ label: 'Pas du tout', value: 3 }, { label: 'Une ou deux fois', value: 2 }, { label: 'Une fois par semaine', value: 1 }, { label: 'Plus d\'une fois par semaine', value: 0 }] },
];

const cACTModalContent: React.FC = () => {
    const { patientData, updatePatientData } = usePatientData();
    const [answers, setAnswers] = useState<Record<string, number | null>>({});
    const [showResult, setShowResult] = useState(false);
    const [resultSaved, setResultSaved] = useState(false);

    const allQuestions = [...childQuestions, ...parentQuestions];

    const handleAnswerChange = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        setShowResult(false);
        setResultSaved(false);
    };

    const totalScore = useMemo(() => {
        return Object.values(answers).reduce((sum, val) => sum + (val || 0), 0);
    }, [answers]);

    const interpretation = useMemo(() => {
        if (totalScore <= 19) return { text: 'Non Contrôlé', Icon: AlertTriangle, color: 'text-red-600' };
        return { text: 'Bien Contrôlé', Icon: CheckCircle2, color: 'text-emerald-600' };
    }, [totalScore]);

    const allAnswered = allQuestions.every(q => answers[q.id] !== null && answers[q.id] !== undefined);

    const handleCalculate = () => {
        if (allAnswered) {
            setShowResult(true);
        }
    };
    
    const handleSaveResult = useCallback(() => {
        if (allAnswered) {
          const newResult: TestResult = { date: new Date().toISOString(), score: totalScore };
          updatePatientData({ cactHistory: [...patientData.cactHistory, newResult] });
          setResultSaved(true);
        }
    }, [totalScore, allAnswered, patientData.cactHistory, updatePatientData]);

    const QuestionSection: React.FC<{title: string; icon: React.ReactElement; questions: any[];}> = ({ title, icon, questions }) => (
        <div className="mb-4">
            <h4 className="font-semibold text-slate-700 mb-2 flex items-center">{icon}{title}</h4>
            {questions.map(q => (
                 <div key={q.id} className="p-3 bg-white rounded-lg border border-slate-200 mb-2">
                    <p className="font-medium text-slate-700 mb-2 text-sm">{q.id.toUpperCase()}. {q.text}</p>
                    <div className="flex flex-wrap gap-2">
                        {q.options.map((opt: any) => (
                            <Button
                                key={opt.value}
                                onClick={() => handleAnswerChange(q.id, opt.value)}
                                variant={answers[q.id] === opt.value ? 'primary' : 'secondary'}
                                size="sm" className="!text-xs !py-1"
                            >
                                {opt.label}
                            </Button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    
    return (
        <div className="space-y-4">
             <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
                <QuestionSection title="Questions pour l'Enfant" icon={<User size={18} className="mr-2"/>} questions={childQuestions} />
                <QuestionSection title="Questions pour le Parent" icon={<Users size={18} className="mr-2"/>} questions={parentQuestions} />
             </div>

            {!showResult && (
                <div className="mt-4 text-center">
                    <Button onClick={handleCalculate} disabled={!allAnswered} size="lg">Calculer le Score</Button>
                </div>
            )}

            {showResult && (
                <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-200 text-center">
                    <p className="text-sm text-slate-600">Score c-ACT Total :</p>
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

            <TestHistory history={patientData.cactHistory} testName="c-ACT" />

            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm">
                <Lightbulb className="inline-block mr-2" size={16}/>
                <strong>Interprétation :</strong> Un score de 19 ou moins suggère que l'asthme pourrait être insuffisamment contrôlé et qu'un changement de traitement pourrait être nécessaire.
            </div>
        </div>
    );
};

export default cACTModalContent;