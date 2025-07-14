

import React from 'react';
import { ArrowRight, TrendingDown, TrendingUp } from '../../../constants/icons';

const FlowStep: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start">
        <ArrowRight size={16} className="text-slate-500 mr-3 mt-1 flex-shrink-0" />
        <div className="text-sm text-slate-700">{children}</div>
    </div>
);

const Box14Content: React.FC = () => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600">
                Pour un patient déjà sous traitement contenant des CSI, la confirmation du diagnostic d'asthme peut être difficile. L'approche suivante est recommandée.
            </p>

            <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3">
                <FlowStep>
                    <strong>Évaluer les schémas de symptômes et la fonction pulmonaire.</strong> Si les caractéristiques sont compatibles avec l'asthme et que la fonction pulmonaire est variable, le diagnostic est étayé.
                </FlowStep>
                <FlowStep>
                    Si les preuves ne sont toujours pas concluantes, envisager de <strong>diminuer le traitement de fond.</strong> Trouver la plus faible dose efficace qui maintient le contrôle.
                </FlowStep>
                <FlowStep>
                    Si le patient est sous traitement de fond à faible dose, envisager d'<strong>arrêter complètement le traitement de fond.</strong> Cela doit être fait avec prudence et une surveillance étroite.
                </FlowStep>
                <FlowStep>
                    <strong>Mesurer le VEMS avant et après l'arrêt du traitement.</strong>{' Une diminution significative après l\'arrêt ('}<TrendingDown size={14} className="text-red-600"/>{') et une amélioration à la reprise ('}<TrendingUp size={14} className="text-emerald-600"/>{') confirment le diagnostic.'}
                </FlowStep>
                <FlowStep>
                    Si les symptômes ne réapparaissent pas et que la fonction pulmonaire reste stable après 2 à 4 semaines d'arrêt du traitement de fond, le diagnostic d'asthme est peu probable.
                </FlowStep>
            </div>

            <div className="p-3 bg-amber-50 border-l-4 border-amber-400 text-amber-800 text-sm">
                <strong>Attention :</strong> Ce processus nécessite un jugement clinique attentif et une bonne communication avec le patient. Assurez-vous que le patient dispose d'un plan d'action clair en cas d'aggravation des symptômes après la réduction ou l'arrêt du traitement.
            </div>
        </div>
    );
};

export default Box14Content;
