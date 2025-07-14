

import React from 'react';
import { Activity, Droplets } from '../../../constants/icons';

const BiomarkerCard: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => {
    let clonedIcon = null;
    if (icon) {
        const existingClassName = (icon.props as any).className || '';
        let newClassName = 'mr-2.5';
        if (existingClassName) newClassName += ' ' + existingClassName;

        const iconProps = {
            size: 20,
            className: newClassName,
        };
        clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
    }
    return (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-md">
                {clonedIcon}
                {title}
            </h3>
            <div className="pl-[30px] space-y-2 text-slate-700 text-sm">
                {children}
            </div>
        </div>
    );
};

const BiomarkersContent: React.FC = () => {
    return (
        <div className="space-y-5">
            <p className="text-sm text-slate-600">
                Les biomarqueurs peuvent fournir des preuves supplémentaires pour un diagnostic d'asthme, en particulier pour identifier l'inflammation de type 2, qui prédit une bonne réponse au traitement par CSI.
            </p>

            <BiomarkerCard title="Fraction d'Oxyde Nitrique Exhalé (FeNO)" icon={<Activity className="text-sky-600" />}>
                <p>Le FeNO est un marqueur de l'inflammation éosinophilique des voies aériennes.</p>
                <ul className="list-disc list-inside">
                    <li><strong>{'FeNO > 50 ppb :'}</strong> Soutient fortement un diagnostic d'asthme éosinophilique et la probabilité d'une réponse aux CSI.</li>
                    <li><strong>FeNO 25-50 ppb :</strong> Intermédiaire. Peut soutenir le diagnostic dans un contexte de symptômes évocateurs.</li>
                    <li><strong>{'FeNO < 25 ppb :'}</strong> Faible probabilité d'inflammation éosinophilique. N'exclut pas l'asthme, mais suggère d'autres mécanismes ou une non-observance aux CSI.</li>
                </ul>
                <p className="text-xs text-slate-500 mt-2">
                    Note : Les niveaux de FeNO peuvent être affectés par le tabagisme, l'alimentation et les médicaments.
                </p>
            </BiomarkerCard>

            <BiomarkerCard title="Nombre d'Éosinophiles Sanguins" icon={<Droplets className="text-red-600" />}>
                <p>Un nombre d'éosinophiles dans le sang périphérique peut également indiquer une inflammation de type 2.</p>
                 <ul className="list-disc list-inside">
                    <li><strong>{'Éosinophiles >= 300 cellules/µL :'}</strong> Considéré comme un bon prédicteur de la réactivité aux CSI. Soutient un diagnostic d'asthme de type 2.</li>
                    <li><strong>Éosinophiles 150-300 cellules/µL :</strong> Intermédiaire. Peut apporter un certain soutien.</li>
                    <li><strong>{'Éosinophiles < 150 cellules/µL :'}</strong> Probabilité plus faible d'une réponse majeure aux CSI, mais n'exclut pas l'asthme.</li>
                </ul>
                <p className="text-xs text-slate-500 mt-2">
                    Note : Le nombre d'éosinophiles peut être variable et est influencé par des facteurs comme les infections et l'utilisation de CSO.
                </p>
            </BiomarkerCard>

             <div className="p-3 bg-slate-100 border-l-4 border-slate-400 text-slate-800 text-sm">
                <strong>Important :</strong> Les biomarqueurs sont des outils de soutien. Le diagnostic de l'asthme reste clinique, basé sur une anamnèse de symptômes caractéristiques et la démonstration d'une limitation variable du débit aérien.
            </div>
        </div>
    );
};

export default BiomarkersContent;
