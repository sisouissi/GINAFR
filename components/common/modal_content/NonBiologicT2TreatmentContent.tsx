
import React from 'react';
import { Droplets, ShieldCheck } from '../../../constants/icons';

const NonBiologicT2TreatmentContent: React.FC = () => {
    return (
        <div className="space-y-5">
            <p className="text-sm text-slate-600">
                Pour les patients présentant des signes d'inflammation de type 2, il existe une option non biologique qui peut être envisagée dans des circonstances spécifiques, en particulier avant d'initier des thérapies biologiques plus coûteuses.
            </p>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-md">
                    <Droplets size={20} className="mr-2.5 text-teal-600" />
                    Immunothérapie Sublinguale (ITSL) pour les Acariens
                </h3>
                <div className="pl-[30px] space-y-2 text-slate-700 text-sm">
                    <p>Pour les adultes souffrant d'asthme allergique sensibilisés aux acariens et ayant une rhinite allergique, envisagez un essai d'ITSL aux acariens si :</p>
                     <ul className="list-disc list-inside mt-1">
                        <li>Le VEMS est supérieur à 70% de la valeur prédite.</li>
                        <li>Le patient est non contrôlé avec un CSI à faible ou moyenne dose.</li>
                    </ul>
                    <p>Cela peut réduire le risque d'exacerbations, mais l'effet est modeste par rapport aux produits biologiques.</p>
                     <p className="text-xs text-slate-500 mt-2">
                        Elle ne doit être initiée que par un spécialiste et ne remplace pas les médicaments de fond standards.
                    </p>
                </div>
            </div>
            <div className="p-3 bg-slate-100 border-l-4 border-slate-400 text-slate-800 text-sm">
                <strong>Remarque :</strong> L'immunothérapie allergénique n'est généralement pas recommandée pour l'asthme sévère en raison du risque d'anaphylaxie avec les voies sous-cutanées et du peu de preuves pour les voies sublinguales dans cette population par rapport à l'efficacité prouvée des thérapies biologiques.
            </div>
            <p className="text-xs text-slate-500 text-center">Référence : Rapport GINA 2025, p. 151</p>
        </div>
    );
};

export default NonBiologicT2TreatmentContent;