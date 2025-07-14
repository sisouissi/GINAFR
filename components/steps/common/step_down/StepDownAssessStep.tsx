
import React from 'react';
import { useNavigation } from '../../../../contexts/NavigationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { TrendingDown, ShieldCheck, AlertTriangle, Users, ArrowRight } from '../../../../constants/icons';

const StepDownAssessStep: React.FC = () => {
    const { navigateTo } = useNavigation();

    const ListItem: React.FC<{ icon: React.ReactElement; children: React.ReactNode; }> = ({ icon, children }) => {
        let clonedIcon = null;
        if (icon) {
            const existingClassName = (icon.props as any).className || '';
            let newClassName = 'mr-3 mt-1 text-sky-600 flex-shrink-0';
            if (existingClassName) newClassName += ' ' + existingClassName;

            const iconProps = {
                size: 20,
                className: newClassName,
            };
            clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
        }
        
        return (
            <li className="flex items-start">
                {clonedIcon}
                <span className="text-slate-700">{children}</span>
            </li>
        );
    };

    return (
        <Card
            title="Guide de Diminution : 1. Évaluer"
            icon={<TrendingDown className="text-sky-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                Avant de réduire le traitement de fond, assurez-vous qu'il est sûr et approprié de le faire. Cette évaluation est la première étape cruciale.
            </p>

            <div className="p-5 bg-white border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-3">Critères d'Évaluation Clés :</h3>
                <ul className="space-y-3 text-sm">
                    <ListItem icon={<ShieldCheck />}>
                        <strong>Bon Contrôle de l'Asthme :</strong> Les symptômes et les exacerbations sont bien contrôlés depuis au moins 3 mois.
                    </ListItem>
                    <ListItem icon={<AlertTriangle />}>
                        <strong>Faible Risque d'Exacerbation :</strong> Le patient n'a pas de facteurs de risque actuels d'exacerbation (ex: crise sévère récente, VEMS bas, surutilisation de SABA).
                    </ListItem>
                    <ListItem icon={<Users />}>
                        <strong>Circonstances de Vie Stables :</strong> Le patient n'est pas enceinte, ne voyage pas, ou ne prépare pas d'examens importants.
                    </ListItem>
                     <ListItem icon={<Users />}>
                        <strong>Décision Partagée :</strong> La décision de diminuer est prise en partenariat avec le patient, qui comprend le plan.
                    </ListItem>
                </ul>
            </div>

            <div className="mt-8">
                <Button
                    onClick={() => navigateTo('STEP_DOWN_ADJUST_STEP')}
                    fullWidth
                    size="xl"
                    rightIcon={<ArrowRight />}
                >
                    Suivant : Ajuster le Traitement
                </Button>
            </div>
        </Card>
    );
};

export default StepDownAssessStep;