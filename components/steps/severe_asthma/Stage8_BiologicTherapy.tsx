
import React, { useState } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Heart, HelpCircle, CheckCircle2, XCircle, AlertTriangle, ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';

type EvaluationStep = 'initial' | 'unclear_followup' | 'good_response' | 'no_response';
type ResponseType = 'good' | 'unclear' | 'no' | null;

const Stage8_BiologicTherapy: React.FC = () => {
    const { navigateTo } = useNavigation();
    const [evaluationStep, setEvaluationStep] = useState<EvaluationStep>('initial');
    const [response, setResponse] = useState<ResponseType>(null);
    const [extendedResponse, setExtendedResponse] = useState<ResponseType>(null);

    const handleInitialResponse = (res: ResponseType) => {
        setResponse(res);
        if (res === 'good') setEvaluationStep('good_response');
        if (res === 'no') setEvaluationStep('no_response');
        if (res === 'unclear') setEvaluationStep('unclear_followup');
    };

    const handleExtendedResponse = (res: ResponseType) => {
        setExtendedResponse(res);
    };

    const handleSwitchBiologic = () => {
        setResponse(null);
        setExtendedResponse(null);
        setEvaluationStep('initial');
    };
    
    const GoodResponseContent = () => (
         <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-md">
            <h4 className="font-semibold text-green-800 flex items-center mb-2">
                <CheckCircle2 size={20} className="mr-2"/>
                Bonne Réponse à la Thérapie Biologique
            </h4>
            <div className="text-sm text-green-700 pl-7 space-y-2">
                <p><strong>Poursuivre le traitement biologique</strong> et continuer le suivi régulier tous les 3 à 6 mois pour évaluer le contrôle de l’asthme, les exacerbations, la fonction pulmonaire, les comorbidités et la satisfaction du patient.</p>
                <p><strong>Réduire progressivement les traitements d’appoint,</strong> en particulier les corticostéroïdes oraux (CSO) si le patient en prend, afin de limiter les effets secondaires. Cette réduction doit être prudente et individualisée.</p>
                <p>Pour les corticostéroïdes inhalés (CSI), il est conseillé de maintenir au moins une <strong>dose modérée,</strong> avec possibilité de diminution après 3 à 6 mois de bonne réponse.</p>
            </div>
            <div className="pl-7 mt-4">
                <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_9')} rightIcon={<ChevronRight/>}>
                    Aller au Suivi (Étape 9)
                </Button>
            </div>
        </div>
    );
    
     const NoResponseContent = () => (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md">
            <h4 className="font-semibold text-red-800 flex items-center mb-2">
                <XCircle size={20} className="mr-2"/>
                Pas de Bonne Réponse à la Thérapie Biologique
            </h4>
            <p className="text-sm text-red-700 pl-7 mb-4">
                Conformément aux directives du GINA, en l'absence de bonne réponse, arrêtez la thérapie biologique actuelle et réévaluez le patient. Choisissez l'une des options suivantes :
            </p>
            <div className="pl-7 flex flex-col sm:flex-row gap-4">
                <Button onClick={handleSwitchBiologic} variant="warning" leftIcon={<RotateCcw/>}>
                    Passer à un Autre Biologique
                </Button>
                <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_10')} variant="danger" rightIcon={<ArrowRight/>}>
                    Arrêter les Biologiques & Continuer les Autres Soins
                </Button>
            </div>
        </div>
    );


    return (
        <div>
            <AssessmentCard title="Essai et Évaluation de la Thérapie Biologique" icon={<Heart />}>
                <p className="text-sm text-slate-600 mb-4">
                    Le patient est éligible et a accès à la thérapie biologique. Commencez un essai thérapeutique d'au moins 4 mois, puis évaluez la réponse.
                </p>

                {/* Initial 4-Month Evaluation */}
                <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-slate-700 mb-3">Après 4 mois, quelle est la réponse à la thérapie ?</h4>
                     <div className="flex flex-wrap gap-3">
                        <Button onClick={() => handleInitialResponse('good')} variant={response === 'good' ? 'success' : 'secondary'}>Bonne Réponse</Button>
                        <Button onClick={() => handleInitialResponse('unclear')} variant={response === 'unclear' ? 'warning' : 'secondary'}>Incertaine / Partielle</Button>
                        <Button onClick={() => handleInitialResponse('no')} variant={response === 'no' ? 'danger' : 'secondary'}>Pas de Bonne Réponse</Button>
                    </div>
                </div>

                {/* Conditional Content based on response */}
                <div className="mt-4">
                    {response === 'good' && <GoodResponseContent />}
                    {response === 'no' && <NoResponseContent />}

                    {response === 'unclear' && (
                        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-md">
                            <h4 className="font-semibold text-amber-800 flex items-center mb-2">
                                <HelpCircle size={20} className="mr-2"/>
                                Réponse Incertaine / Partielle
                            </h4>
                            <p className="text-sm text-amber-700 pl-7 mb-4">
                                Prolongez l'essai de traitement pour un total de 6 à 12 mois, puis réévaluez la réponse.
                            </p>
                            <div className="mt-4 pt-4 border-t border-amber-200 pl-7">
                                <h5 className="font-medium text-slate-700 mb-3">Après 6-12 mois, la réponse est-elle maintenant bonne ?</h5>
                                <div className="flex flex-wrap gap-3">
                                    <Button onClick={() => handleExtendedResponse('good')} variant={extendedResponse === 'good' ? 'success' : 'secondary'}>Oui, la réponse est maintenant bonne</Button>
                                    <Button onClick={() => handleExtendedResponse('no')} variant={extendedResponse === 'no' ? 'danger' : 'secondary'}>Non, toujours pas de bonne réponse</Button>
                                </div>

                                <div className="mt-4">
                                    {extendedResponse === 'good' && <GoodResponseContent/>}
                                    {extendedResponse === 'no' && <NoResponseContent/>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AssessmentCard>
        </div>
    );
};

export default Stage8_BiologicTherapy;