

import React from 'react';
import { Users, Baby, AlertTriangle, PersonStanding } from '../../../constants/icons';

const AgeGroupSection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => {
    let clonedIcon = null;
    if (icon) {
        const iconProps: { size: number; className: string } = {
            size: 22,
            className: 'mr-3'
        };
        const existingClassName = (icon.props as any).className;
        if (existingClassName) {
            iconProps.className += ' ' + existingClassName;
        }
        clonedIcon = React.cloneElement(icon as React.ReactElement<any>, iconProps);
    }

    return (
        <div className="mb-6">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-lg border-b border-slate-200 pb-2">
                {clonedIcon}
                {title}
            </h3>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
};


const DiagnosisRow: React.FC<{ symptoms: string; condition: string }> = ({ symptoms, condition }) => (
    <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/2 text-sm text-slate-600 mb-2 md:mb-0 md:pr-4">{symptoms}</div>
        <div className="md:w-1/2 text-sm font-semibold text-sky-700 md:border-l md:border-slate-200 md:pl-4">{condition}</div>
    </div>
);

const KeyPoints: React.FC<{ points: string[] }> = ({ points }) => (
    <div className="mt-6 p-4 bg-sky-50 border-l-4 border-sky-400 rounded-r-lg">
        <h4 className="font-semibold text-sky-800 mb-2 flex items-center">
            <AlertTriangle size={18} className="mr-2" />
            Points Clés
        </h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-sky-700">
            {points.map(point => <li key={point}>{point}</li>)}
        </ul>
    </div>
);

const Box13Content: React.FC = () => {
    const allAgesData = [
        { symptoms: 'Toux chronique sans dyspnée ni déclencheurs', condition: 'Syndrome de toux des voies aériennes supérieures, RGO' },
        { symptoms: 'Symptômes uniquement lors d\'infections des voies respiratoires supérieures', condition: 'Infection virale' },
        { symptoms: 'Voix rauque, stridor, difficulté à avaler', condition: 'Dysfonction des cordes vocales, obstruction laryngée' },
        { symptoms: 'Dyspnée importante sans sifflements', condition: 'Dysfonction des cordes vocales' },
        { symptoms: 'Symptômes uniquement lors d\'un exercice intense', condition: 'Bronchoconstriction induite par l\'exercice' },
        { symptoms: 'Débit expiratoire de pointe réduit de manière isolée', condition: 'Obstruction des voies aériennes supérieures' },
    ];

    const childrenData = [
        { symptoms: 'Symptômes dès la naissance, retard de croissance', condition: 'Mucoviscidose, dysplasie bronchopulmonaire' },
        { symptoms: 'Infections récurrentes, retard de croissance', condition: 'Immunodéficience, dyskinésie ciliaire' },
        { symptoms: 'Apparition soudaine avec toux, sifflements localisés', condition: 'Inhalation de corps étranger' },
        { symptoms: 'Vomissements, difficultés d\'alimentation', condition: 'Anneau vasculaire, fistule trachéo-œsophagienne' },
    ];

    const adultsData = [
        { symptoms: 'Tabagisme important, dyspnée d\'effort progressive', condition: 'BPCO' },
        { symptoms: 'Dyspnée aiguë, douleur thoracique, facteurs de risque', condition: 'Embolie pulmonaire' },
        { symptoms: 'Dyspnée orthopnéique, œdème périphérique', condition: 'Insuffisance cardiaque' },
        { symptoms: 'Exposition professionnelle/environnementale', condition: 'Pneumopathie d\'hypersensibilité, pneumoconiose' },
        { symptoms: 'Toux sèche progressive, dyspnée d\'effort', condition: 'Fibrose pulmonaire idiopathique' },
    ];

    const elderlyData = [
        { symptoms: 'Dyspnée avec épanchement pleural', condition: 'Cancer du poumon' },
        { symptoms: 'Syndrome de chevauchement asthme-BPCO', condition: 'ACO (Asthma-COPD Overlap)' },
        { symptoms: 'Médicaments (IEC, bêta-bloquants, AINS)', condition: 'Toux ou bronchospasme d\'origine médicamenteuse' },
    ];

    const keyPointsData = [
        'Rechercher activement ces diagnostics différentiels si la présentation clinique est atypique.',
        'La coexistence de plusieurs conditions est possible (ex: asthme + RGO).',
        'Une réponse inadéquate au traitement anti-asthmatique doit inciter à reconsidérer le diagnostic.',
        'Des investigations supplémentaires peuvent être nécessaires selon le contexte clinique.',
    ];

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">
                Envisagez des diagnostics alternatifs, surtout si les symptômes sont atypiques, si la réponse au traitement est faible, ou si la suspicion clinique pointe ailleurs. Le diagnostic différentiel varie selon le groupe d'âge et la présentation.
            </p>

            <AgeGroupSection title="Tous les âges" icon={<Users className="text-slate-600" />}>
                {allAgesData.map(item => <DiagnosisRow key={item.symptoms} {...item} />)}
            </AgeGroupSection>

            <AgeGroupSection title="Enfants" icon={<Baby className="text-violet-600" />}>
                {childrenData.map(item => <DiagnosisRow key={item.symptoms} {...item} />)}
            </AgeGroupSection>

            <AgeGroupSection title="Adultes" icon={<Users className="text-sky-600" />}>
                {adultsData.map(item => <DiagnosisRow key={item.symptoms} {...item} />)}
            </AgeGroupSection>

             <AgeGroupSection title="Personnes âgées" icon={<PersonStanding className="text-teal-600" />}>
                {elderlyData.map(item => <DiagnosisRow key={item.symptoms} {...item} />)}
            </AgeGroupSection>

            <KeyPoints points={keyPointsData} />
        </div>
    );
};

export default Box13Content;
