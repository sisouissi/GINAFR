
import React from 'react';
import { Pill, Activity, ShieldAlert } from '../../../constants/icons';

const TreatmentItem: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => {
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
            <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-md">
                {clonedIcon}
                {title}
            </h3>
            <div className="pl-[30px] space-y-2 text-slate-700 text-sm">
                {children}
            </div>
        </div>
    );
};


const NonT2TreatmentContent: React.FC = () => {
    return (
        <div className="space-y-5">
            <p className="text-sm text-slate-600">
                Pour les patients atteints d'asthme sévère qui ne présentent pas de signes d'inflammation de type 2, les options de traitement sont limitées et doivent être gérées par un spécialiste.
            </p>

            <TreatmentItem title="Azithromycine (en complément)" icon={<Pill className="text-sky-600"/>}>
                <p>L'azithromycine à faible dose et à long terme peut être envisagée comme traitement d'appoint pour les adultes présentant des symptômes persistants malgré un traitement de Palier 5.</p>
                <ul className="list-disc list-inside mt-1">
                    <li>Elle peut réduire les exacerbations, mais a peu d'effet sur la fonction pulmonaire ou les symptômes.</li>
                    <li><strong>Important :</strong> Il faut dépister une infection à mycobactéries non tuberculeuses, vérifier l'ECG pour un allongement du QTc et être conscient du risque croissant de résistance aux antimicrobiens.</li>
                </ul>
            </TreatmentItem>

             <TreatmentItem title="AMLA (en complément)" icon={<Activity className="text-emerald-600"/>}>
                <p>S'il n'a pas déjà été ajouté, un AMLA (ex: tiotropium) devrait être essayé car il peut améliorer la fonction pulmonaire et réduire les exacerbations chez certains patients, quel que soit le phénotype.</p>
            </TreatmentItem>

            <TreatmentItem title="CSO à faible dose" icon={<ShieldAlert className="text-red-600"/>}>
                <p>Ceci doit être considéré comme un dernier recours en raison du risque important d'effets secondaires à long terme.</p>
                <ul className="list-disc list-inside mt-1">
                    <li>Utiliser la dose la plus faible possible qui maintient le contrôle.</li>
                    <li>Mettre en œuvre des stratégies pour surveiller et atténuer les effets secondaires (ex: densitométrie osseuse, surveillance métabolique).</li>
                </ul>
            </TreatmentItem>
        </div>
    );
};

export default NonT2TreatmentContent;
