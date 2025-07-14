
import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Calendar, CheckCircle2, XCircle, AlertTriangle, ChevronRight, ListChecks, ArrowRight, TrendingDown, Square, CheckSquare, HelpCircle } from '../../../constants/icons';

interface ControlAnswers {
  [key: string]: boolean | null;
}

const questions = [
  { id: 'q1', text: 'Au cours des 4 dernières semaines, le patient a-t-il eu des symptômes diurnes plus de deux fois par semaine ?' },
  { id: 'q2', text: 'Au cours des 4 dernières semaines, le patient a-t-il eu des réveils nocturnes dus à l\'asthme ?' },
  { id: 'q3', text: 'Au cours des 4 dernières semaines, le patient a-t-il eu besoin de SABA ou de CSI-formotérol en secours plus de deux fois par semaine ?' },
  { id: 'q4', text: 'Au cours des 4 dernières semaines, le patient a-t-il eu une limitation d\'activité due à l\'asthme ?' },
];

const Stage4_ReviewResponse: React.FC = () => {
    const { navigateTo } = useNavigation();
    const [answers, setAnswers] = useState<ControlAnswers>({});
    const [controlResult, setControlResult] = useState<'controlled' | 'uncontrolled' | null>(null);
    const [stepDownResult, setStepDownResult] = useState<'yes' | 'no' | null>(null);

    const handleAnswer = (id: string, value: boolean) => {
        setAnswers(prev => ({...prev, [id]: value}));
        setControlResult(null); 
        setStepDownResult(null);
    };
    
    const handleStepDownAnswer = (value: 'yes' | 'no') => {
        setStepDownResult(value);
    };

    const allAnswered = questions.every(q => answers[q.id] !== undefined && answers[q.id] !== null);

    const assessControl = () => {
        const isUncontrolled = Object.values(answers).some(answer => answer === true);
        setControlResult(isUncontrolled ? 'uncontrolled' : 'controlled');
    };

    return (
        <AssessmentCard title="Réévaluer la Réponse (après 3-6 mois)" icon={<Calendar />}>
            {!controlResult && (
                <>
                    <p className="text-sm text-slate-600 mb-4">
                        Après avoir mis en œuvre les optimisations de l'Étape 3, évaluez si l'asthme du patient est maintenant contrôlé. Répondez aux questions suivantes en vous basant sur les 4 dernières semaines.
                    </p>

                    <div className="space-y-4">
                        {questions.map(q => (
                            <div key={q.id} className="p-3 bg-white border border-slate-200 rounded-lg">
                                <p className="font-medium text-slate-700 text-sm mb-2">{q.text}</p>
                                <div className="flex space-x-2">
                                <Button
                                    onClick={() => handleAnswer(q.id, true)}
                                    variant={answers[q.id] === true ? 'warning' : 'secondary'}
                                    size="sm"
                                    fullWidth
                                    leftIcon={answers[q.id] === true ? <CheckSquare size={16}/> : <Square size={16}/>}
                                >Oui</Button>
                                <Button
                                    onClick={() => handleAnswer(q.id, false)}
                                    variant={answers[q.id] === false ? 'success' : 'secondary'}
                                    size="sm"
                                    fullWidth
                                    leftIcon={answers[q.id] === false ? <CheckSquare size={16}/> : <Square size={16}/>}
                                >Non</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-5">
                        <Button onClick={assessControl} disabled={!allAnswered} fullWidth size="lg" leftIcon={<ListChecks/>}>
                            Évaluer le Niveau de Contrôle
                        </Button>
                    </div>
                </>
            )}

            {controlResult === 'uncontrolled' && (
                <div className="mt-2 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                    <h4 className="font-semibold text-red-800 flex items-center mb-2">
                        <XCircle size={20} className="mr-2"/>
                        Conclusion : Asthme Toujours Non Contrôlé
                    </h4>
                    <p className="text-sm text-red-700 pl-7 mb-4">
                        Le diagnostic d'asthme sévère est probable. Si cela n'a pas encore été fait, orientez le patient vers un spécialiste ou une clinique de l'asthme sévère si possible.
                    </p>
                    <div className="pl-7">
                        <Button 
                            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_5')}
                            variant="danger"
                            rightIcon={<ChevronRight/>}
                        >
                            Procéder à l'Évaluation Spécialisée
                        </Button>
                    </div>
                </div>
            )}
            
            {controlResult === 'controlled' && (
                <div className="mt-2 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
                    <h4 className="font-semibold text-green-800 flex items-center mb-2">
                        <CheckCircle2 size={20} className="mr-2"/>
                        Conclusion : Asthme maintenant bien contrôlé
                    </h4>
                    <p className="text-sm text-green-700 pl-7">
                        Envisager une diminution du traitement. Commencer par diminuer/arrêter les CSO en premier (si utilisés), en vérifiant l'insuffisance surrénalienne, puis envisager de retirer d'autres traitements d'appoint, puis diminuer la dose de CSI, mais ne pas arrêter les CSI.
                    </p>

                    <div className="mt-5 pt-4 border-t border-green-200">
                         <h4 className="font-semibold text-slate-800 flex items-center mb-3">
                            <HelpCircle size={20} className="mr-2"/>
                            Question Suivante :
                        </h4>
                        <p className="font-medium text-slate-700 text-sm mb-3 pl-7">
                           L'asthme devient-il non contrôlé lors de la diminution du traitement ?
                        </p>
                        {!stepDownResult && (
                           <div className="flex space-x-3 pl-7">
                               <Button onClick={() => handleStepDownAnswer('yes')} variant="warning" size="md">Oui</Button>
                               <Button onClick={() => handleStepDownAnswer('no')} variant="success" size="md">Non</Button>
                           </div>
                        )}
                    </div>
                </div>
            )}
            
            {stepDownResult === 'yes' && (
                <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-md">
                    <h4 className="font-semibold text-amber-800 flex items-center mb-2">
                        <AlertTriangle size={20} className="mr-2"/>
                        Conclusion : Perte de Contrôle à la Diminution
                    </h4>
                    <p className="text-sm text-amber-700 pl-7 mb-4">
                        Si les symptômes de l'asthme deviennent non contrôlés ou qu'une exacerbation survient lors de la diminution du traitement à haute dose, le diagnostic d'asthme sévère est probable. Rétablissez la dose précédente du patient pour retrouver un bon contrôle de l'asthme, et orientez vers un spécialiste ou une clinique de l'asthme sévère, si possible, si cela n'a pas déjà été fait.
                    </p>
                     <div className="pl-7">
                        <Button 
                            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_5')}
                            variant="warning"
                            rightIcon={<ChevronRight/>}
                        >
                            Procéder à l'Évaluation Spécialisée
                        </Button>
                    </div>
                </div>
            )}

            {stepDownResult === 'no' && (
                 <div className="mt-4 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-md">
                    <h4 className="font-semibold text-sky-800 flex items-center mb-2">
                        <CheckCircle2 size={20} className="mr-2"/>
                        Conclusion : Contrôle Maintenu à la Diminution
                    </h4>
                    <p className="text-sm text-sky-700 pl-7 mb-4">
                        Si les symptômes et les exacerbations restent bien contrôlés malgré la diminution du traitement, le patient n'a pas d'asthme sévère.
                    </p>
                     <div className="pl-7">
                        <Button 
                            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_3')}
                            variant="primary"
                            rightIcon={<ArrowRight/>}
                        >
                            Retourner à la Prise en Charge Continue
                        </Button>
                    </div>
                </div>
            )}

        </AssessmentCard>
    );
};

export default Stage4_ReviewResponse;