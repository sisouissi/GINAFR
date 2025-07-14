
import React, { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { useUIState } from '../../../contexts/UIStateContext';
import { Route, HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

type QuestionId = 'symptoms' | 'history' | 'tests';
type Answer = 'yes' | 'no' | null;

const InitialDiagnosisFlowchartStep: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openManagementPanel } = useUIState();
    const [answers, setAnswers] = useState<{ [key in QuestionId]: Answer }>({
        symptoms: null,
        history: null,
        tests: null,
    });

    const handleAnswer = (questionId: QuestionId, answer: 'yes' | 'no') => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleProceedToManagement = () => {
        // D'abord, retourner à l'écran d'accueil. Cela ferme également tous les panneaux ouverts.
        navigateTo('INITIAL_STEP');
        // Ensuite, ouvrir spécifiquement le panneau de prise en charge.
        openManagementPanel();
    };

    const renderResult = () => {
        if (answers.symptoms === 'no') {
            return (
                <ResultCard
                    title="Asthme Peu Probable"
                    icon={<XCircle className="text-red-600" />}
                    className="bg-red-50 border-red-200"
                >
                    <p>Le patient n'a pas de symptômes respiratoires typiques de l'asthme. Envisagez des diagnostics alternatifs. Vous pouvez retourner à l'écran précédent pour explorer les diagnostics différentiels.</p>
                </ResultCard>
            );
        }

        if (answers.symptoms === 'yes' && answers.history === 'yes' && answers.tests === 'yes') {
            return (
                 <ResultCard
                    title="Diagnostic d'Asthme Confirmé"
                    icon={<CheckCircle2 className="text-emerald-600" />}
                    className="bg-emerald-50 border-emerald-200"
                >
                    <p>Le patient présente des symptômes typiques, une anamnèse concordante et une limitation variable du débit aérien confirmée. Le diagnostic de l'asthme est confirmé.</p>
                    <Button onClick={handleProceedToManagement} className="mt-4" rightIcon={<ArrowRight />}>
                        Passer à la Prise en Charge
                    </Button>
                </ResultCard>
            );
        }

        if (answers.symptoms === 'yes' && (answers.history === 'no' || answers.tests === 'no')) {
            return (
                 <ResultCard
                    title="Investigation Supplémentaire Nécessaire"
                    icon={<HelpCircle className="text-amber-600" />}
                    className="bg-amber-50 border-amber-200"
                >
                   <p>Le tableau clinique est évocateur de l'asthme, mais n'est pas entièrement confirmé. La probabilité est plus faible si l'anamnèse et les tests sont tous deux non concluants.</p>
                   <ul className="list-disc list-inside mt-2 space-y-1">
                        {answers.history === 'no' && <li>L'anamnèse clinique n'est pas typique. Réévaluer pour d'autres conditions.</li>}
                        {answers.tests === 'no' && <li>Les tests de fonction pulmonaire initiaux sont négatifs. Envisager de répéter les tests, un essai thérapeutique ou une orientation.</li>}
                   </ul>
                </ResultCard>
            )
        }
        
        return null;
    };

    const ResultCard: React.FC<{ title: string; icon: React.ReactElement; className?: string; children: React.ReactNode; }> = ({ title, icon, children, className }) => (
        <div className={`mt-6 p-4 rounded-lg border ${className}`}>
            <h3 className="font-semibold text-lg flex items-center mb-2">
                {icon}
                <span className="ml-2">{title}</span>
            </h3>
            <div className="pl-8 text-sm">{children}</div>
        </div>
    );
    
    return (
        <Card title="Organigramme de Diagnostic Interactif (GINA Encadré 1-1)" icon={<Route className="text-sky-600" />}>
            <p className="text-sm text-slate-600 mb-6">
                Répondez aux questions suivantes pour suivre l'algorithme de diagnostic du GINA pour les patients présentant des symptômes respiratoires.
            </p>

            <div className="space-y-5">
                <QuestionBlock
                    question="Le patient a-t-il des symptômes respiratoires (sifflements, toux, essoufflement, oppression thoracique) ?"
                    questionId="symptoms"
                    onAnswer={handleAnswer}
                    currentAnswer={answers.symptoms}
                />

                {answers.symptoms === 'yes' && (
                     <QuestionBlock
                        question="L'anamnèse et l'examen physique sont-ils en faveur de l'asthme (ex: variables, déclencheurs, pire la nuit, anamnèse atopique) ?"
                        questionId="history"
                        onAnswer={handleAnswer}
                        currentAnswer={answers.history}
                    />
                )}
                 {answers.history === 'yes' && (
                     <QuestionBlock
                        question="La limitation variable du débit expiratoire est-elle confirmée par spirométrie ou d'autres tests ?"
                        questionId="tests"
                        onAnswer={handleAnswer}
                        currentAnswer={answers.tests}
                    />
                )}
            </div>

            {renderResult()}

        </Card>
    );
};

const QuestionBlock: React.FC<{
    question: string;
    questionId: QuestionId;
    onAnswer: (id: QuestionId, answer: 'yes' | 'no') => void;
    currentAnswer: Answer;
}> = ({ question, questionId, onAnswer, currentAnswer }) => (
    <div className="p-4 border border-slate-200 rounded-lg bg-white shadow-sm">
        <p className="font-medium text-slate-700 mb-3 text-sm">{question}</p>
        <div className="flex space-x-2">
            <Button
                onClick={() => onAnswer(questionId, 'yes')}
                variant={currentAnswer === 'yes' ? 'success' : 'secondary'}
                size="md"
                fullWidth
            >
                Oui
            </Button>
            <Button
                onClick={() => onAnswer(questionId, 'no')}
                variant={currentAnswer === 'no' ? 'warning' : 'secondary'}
                size="md"
                fullWidth
            >
                Non
            </Button>
        </div>
    </div>
);

export default InitialDiagnosisFlowchartStep;
