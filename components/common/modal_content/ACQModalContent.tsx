
import React, { useState, useMemo, useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { TestResult } from '../../../types';
import Button from '../../ui/Button';
import TestHistory from '../TestHistory';
import { CheckCircle2, AlertTriangle, XCircle, Save, Lightbulb } from 'lucide-react';

const questions = [
    { id: 'q1', text: 'En moyenne, au cours de la semaine écoulée, combien de fois vous êtes-vous réveillé(e) la nuit à cause de votre asthme ?' },
    { id: 'q2', text: 'En moyenne, au cours de la semaine écoulée, quelle était la gravité de vos symptômes d\'asthme au réveil le matin ?' },
    { id: 'q3', text: 'En moyenne, au cours de la semaine écoulée, à quel point avez-vous été limité(e) dans vos activités quotidiennes à cause de votre asthme ?' },
    { id: 'q4', text: 'En moyenne, au cours de la semaine écoulée, quel a été votre degré d\'essoufflement à cause de votre asthme ?' },
    { id: 'q5', text: 'En moyenne, au cours de la semaine écoulée, combien de temps avez-vous eu des sifflements ?' },
];

const options = [
    { label: 'Pas du tout', value: 0 }, { label: 'Presque pas', value: 1 }, { label: 'Un peu', value: 2 },
    { label: 'Modérément', value: 3 }, { label: 'Assez', value: 4 }, { label: 'Beaucoup', value: 5 }, { label: 'Extrêmement', value: 6 }
];

const ACQModalContent: React.FC = () => {
    const { patientData, updatePatientData } = usePatientData();
    const [answers, setAnswers] = useState<Record<string, number | null>>({ q1: null, q2: null, q3: null, q4: null, q5: null });
    const [showResult, setShowResult] = useState(false);
    const [resultSaved, setResultSaved] = useState(false);

    const handleAnswerChange = (questionId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        setShowResult(false);
        setResultSaved(false);
    };

    const meanScore = useMemo(() => {
        const answeredValues = Object.values(answers).filter(v => v !== null) as number[];
        if (answeredValues.length === 0) return 0;
        const sum = answeredValues.reduce((acc, val) => acc + val, 0);
        return parseFloat((sum / answeredValues.length).toFixed(2));
    }, [answers]);

    const interpretation = useMemo(() => {
        if (meanScore <= 0.75) return { text: 'Bien Contrôlé', Icon: CheckCircle2, color: 'text-emerald-600' };
        if (meanScore < 1.5) return { text: 'Zone Grise', Icon: AlertTriangle, color: 'text-amber-600' };
        return { text: 'Mal Contrôlé', Icon: XCircle, color: 'text-red-600' };
    }, [meanScore]);

    const allAnswered = Object.values(answers).every(ans => ans !== null);

    const handleCalculate = () => {
        if (allAnswered) {
            setShowResult(true);
        }
    };
    
    const handleSaveResult = useCallback(() => {
        if (allAnswered) {
          const newResult: TestResult = { date: new Date().toISOString(), score: meanScore };
          updatePatientData({ acqHistory: [...patientData.acqHistory, newResult] });
          setResultSaved(true);
        }
    }, [meanScore, allAnswered, patientData.acqHistory, updatePatientData]);

    return (
        <div className="space-y-4">
            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2">
                {questions.map(q => (
                    <div key={q.id} className="p-3 bg-white rounded-lg border border-slate-200">
                        <p className="font-medium text-slate-700 mb-2 text-sm">{q.id.toUpperCase()}. {q.text}</p>
                        <div className="flex flex-wrap gap-2">
                            {options.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleAnswerChange(q.id, opt.value)}
                                    className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                                        answers[q.id] === opt.value
                                            ? 'bg-sky-600 text-white border-sky-600'
                                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                                    }`}
                                >
                                    {opt.label} ({opt.value})
                                </button>
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
                    <p className="text-sm text-slate-600">Score Moyen ACQ-5 :</p>
                    <p className="text-5xl font-bold my-2 text-sky-600">{meanScore}</p>
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

            <TestHistory history={patientData.acqHistory} testName="ACQ-5" />

             <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm">
                <Lightbulb className="inline-block mr-2" size={16}/>
                <strong>Interprétation :</strong> Un score &le;0.75 suggère un bon contrôle ; un score &ge;1.5 suggère un mauvais contrôle. Un changement de 0.5 est cliniquement significatif.
            </div>
        </div>
    );
};

export default ACQModalContent;