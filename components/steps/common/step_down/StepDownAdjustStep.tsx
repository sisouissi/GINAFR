
import React from 'react';
import { useNavigation } from '../../../../contexts/NavigationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { TrendingDown, ArrowRight, ArrowLeft } from '../../../../constants/icons';

const StepDownAdjustStep: React.FC = () => {
    const { navigateTo, goBack } = useNavigation();
    
    const StrategyItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <h4 className="font-semibold text-sky-700">{title}</h4>
            <p className="text-sm text-slate-600 mt-1">{children}</p>
        </div>
    );

    return (
        <Card
            title="Guide de Diminution : 2. Ajuster"
            icon={<TrendingDown className="text-sky-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                Une fois l'évaluation terminée, choisissez une stratégie de diminution basée sur le traitement actuel du patient. Documentez clairement le changement.
            </p>

            <div className="p-5 bg-white border border-slate-200 rounded-lg space-y-3">
                <h3 className="font-semibold text-slate-800 mb-2">Stratégies Communes de Diminution :</h3>
                 <StrategyItem title="Depuis une dose élevée ou moyenne de CSI-BALA">
                    Réduire la dose de CSI de 25-50%. Ne pas arrêter le composant BALA à ce stade si l'asthme est sévère.
                </StrategyItem>
                 <StrategyItem title="Depuis une faible dose de CSI-BALA (dose fixe)">
                    Passer à un schéma une fois par jour si disponible, ou réduire la dose du composant CSI. Alternativement, passer à un CSI à faible dose seul.
                </StrategyItem>
                <StrategyItem title="Depuis une faible dose de CSI-formotérol en MART">
                    Réduire la dose de fond à une fois par jour, puis conseiller au patient de continuer à l'utiliser uniquement en cas de besoin (cela devient la thérapie AIR).
                </StrategyItem>
                <StrategyItem title="Depuis une faible dose de CSI seul">
                    Passer à la prise de CSI uniquement lors de l'utilisation de SABA, ou pour les enfants de ≤5 ans, envisager d'arrêter le traitement de fond si asymptomatique pendant 6-12 mois.
                </StrategyItem>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Button
                    onClick={goBack}
                    variant="secondary"
                    leftIcon={<ArrowLeft />}
                >
                    Retour à l'Évaluation
                </Button>
                <Button
                    onClick={() => navigateTo('STEP_DOWN_REVIEW_STEP')}
                    rightIcon={<ArrowRight />}
                >
                    Suivant : Réviser la Réponse
                </Button>
            </div>
        </Card>
    );
};

export default StepDownAdjustStep;