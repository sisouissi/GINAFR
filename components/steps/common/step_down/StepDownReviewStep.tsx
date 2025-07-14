
import React from 'react';
import { useNavigation } from '../../../../contexts/NavigationContext';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { TrendingDown, Calendar, CheckCircle2, XCircle, ArrowLeft, RotateCcw, HelpCircle } from '../../../../constants/icons';

const StepDownReviewStep: React.FC = () => {
    const { goBack, resetNavigation } = useNavigation();

    return (
        <Card
            title="Guide de Diminution : 3. Réviser la Réponse"
            icon={<TrendingDown className="text-sky-600" />}
        >
            <p className="mb-6 text-sm text-slate-600">
                Une révision approfondie après la diminution du traitement est cruciale pour confirmer que le contrôle de l'asthme a été maintenu et pour planifier les prochaines étapes.
            </p>

            {/* Initial Actions */}
            <div className="p-4 bg-white border border-slate-200 rounded-lg mb-6">
                 <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                    <Calendar size={20} className="mr-2 text-sky-600" />
                    Actions au Moment de la Diminution
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-700 pl-4">
                    <li><strong>Planifier le Suivi :</strong> Prenez un rendez-vous de révision dans 1 à 3 mois pour évaluer le résultat.</li>
                    <li><strong>Fournir un Plan d'Action :</strong> Donnez au patient un plan d'action écrit et mis à jour pour l'asthme. Il doit indiquer clairement quoi faire si les symptômes s'aggravent et comment reprendre sa dose efficace précédente.</li>
                    <li><strong>Documenter le Changement :</strong> Enregistrez clairement le nouveau schéma thérapeutique réduit dans le dossier médical du patient.</li>
                </ul>
            </div>

            {/* During the Follow-up Visit */}
            <div className="p-5 bg-white border border-slate-200 rounded-lg">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
                    <HelpCircle size={20} className="mr-2 text-sky-600" />
                    Lors de la Visite de Suivi : Évaluer le Résultat
                </h3>
                <div className="space-y-4">
                    {/* Outcome 1: Maintained Control */}
                    <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-md">
                        <h4 className="font-semibold text-emerald-800 flex items-center">
                            <CheckCircle2 size={18} className="mr-2" />
                            Si le contrôle est maintenu :
                        </h4>
                        <ul className="list-disc list-inside text-sm text-emerald-700 mt-2 pl-6 space-y-1">
                            <li>La nouvelle dose réduite devient le traitement de fond actuel du patient.</li>
                            <li>Continuer la surveillance régulière.</li>
                            <li>Envisager une nouvelle diminution après 3 autres mois si le contrôle reste stable.</li>
                        </ul>
                    </div>

                    {/* Outcome 2: Lost Control */}
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                        <h4 className="font-semibold text-red-800 flex items-center">
                            <XCircle size={18} className="mr-2" />
                            Si le contrôle est perdu :
                        </h4>
                         <ul className="list-disc list-inside text-sm text-red-700 mt-2 pl-6 space-y-1">
                            <li>Reprendre rapidement la dose précédente qui assurait un bon contrôle.</li>
                            <li>Ne pas laisser le patient avec une dose de traitement inadéquate.</li>
                            <li>Investiguer la raison de la perte de contrôle (ex: infection virale, mauvaise observance, ou la dose était simplement trop faible).</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
                <Button
                    onClick={goBack}
                    variant="secondary"
                    leftIcon={<ArrowLeft />}
                >
                    Retour à l'Ajustement
                </Button>
                 <Button
                    onClick={() => resetNavigation()}
                    variant="success"
                    rightIcon={<RotateCcw />}
                >
                    Terminer le Guide
                </Button>
            </div>
        </Card>
    );
};

export default StepDownReviewStep;