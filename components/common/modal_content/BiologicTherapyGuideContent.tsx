
import React from 'react';
import { CheckCircle2, Users, Calendar, ShieldCheck, AlertTriangle } from '../../../constants/icons';

const Section: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => {
    const clonedIcon = React.cloneElement(icon as React.ReactElement<any>, {
        className: `mr-3 mt-1 flex-shrink-0 ${(icon.props as { className?: string }).className || ''}`.trim(),
        size: 22,
    });

    return (
        <div className="bg-white border border-slate-200 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-start text-md">
                {clonedIcon}
                <span>{title}</span>
            </h3>
            <div className="pl-9 space-y-2 text-sm text-slate-700">
                {children}
            </div>
        </div>
    );
};

const BiologicTherapyGuideContent: React.FC = () => {
    return (
        <div className="space-y-5">
            <p className="text-sm text-slate-600">
                Ce guide résume les points clés pour l'ajout d'une biothérapie chez les patients atteints d'asthme sévère avec inflammation de Type 2, basé sur le GINA 2025 (Section 8). La décision doit être prise par un spécialiste.
            </p>

            <Section title="Quand envisager une biothérapie ?" icon={<CheckCircle2 className="text-emerald-600" />}>
                <p>La thérapie biologique est un traitement d'appoint pour les patients qui restent non contrôlés (symptômes ou exacerbations) malgré un traitement de fond optimisé par CSI-BALA à haute dose (Palier 5).</p>
                <p>Le patient doit présenter des preuves d'une inflammation de Type 2 :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Éosinophiles sanguins ≥150/μL, OU</li>
                    <li>FeNO ≥25 ppb, OU</li>
                    <li>Asthme cliniquement d'origine allergique, OU</li>
                    <li>Nécessité de corticostéroïdes oraux (CSO) de fond.</li>
                </ul>
            </Section>

            <Section title="Choisir le bon traitement biologique" icon={<Users className="text-sky-600" />}>
                <p>Le choix dépend du phénotype, des biomarqueurs et des comorbidités du patient :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Anti-IgE (Omalizumab) :</strong> Idéal pour l'asthme allergique sévère.</li>
                    <li><strong>Anti-IL5/5R (Mépolizumab, Benralizumab) :</strong> Cible l'asthme éosinophilique. Plus le taux d'éosinophiles est élevé, meilleure est la réponse.</li>
                    <li><strong>Anti-IL4R (Dupilumab) :</strong> Pour l'inflammation de Type 2 (éosinophiles et/ou FeNO élevés). Excellent choix en cas de dermatite atopique ou de polypose nasale sévère coexistante.</li>
                    <li><strong>Anti-TSLP (Tézéplumab) :</strong> Le spectre le plus large, efficace sur tous les asthmes sévères, y compris ceux avec de faibles biomarqueurs de Type 2.</li>
                </ul>
            </Section>

            <Section title="Essai thérapeutique et évaluation de la réponse" icon={<Calendar className="text-amber-600" />}>
                <p>Commencez un essai thérapeutique d'au moins <strong>4 mois</strong> avant d'évaluer de manière approfondie la réponse.</p>
                <p>Une bonne réponse est définie par une amélioration cliniquement significative d'un ou plusieurs des éléments suivants :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Diminution de la fréquence des exacerbations.</li>
                    <li>Réduction de la dose de CSO de fond.</li>
                    <li>Amélioration du contrôle des symptômes (ex: score ACT/ACQ).</li>
                    <li>Amélioration de la fonction pulmonaire (VEMS).</li>
                </ul>
            </Section>

            <Section title="Prise en charge à long terme" icon={<ShieldCheck className="text-violet-600" />}>
                <p>La gestion après la période d'essai dépend de la réponse du patient :</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Bonne réponse :</strong> Poursuivre la biothérapie. Envisager de réduire progressivement les autres traitements (CSO en premier), mais ne pas arrêter le traitement CSI-BALA.</li>
                    <li><strong>Réponse incertaine :</strong> Prolonger l'essai jusqu'à 6-12 mois avant de prendre une décision finale.</li>
                    <li><strong>Absence de réponse :</strong> Arrêter le traitement. Réévaluer le patient (diagnostic, observance, etc.) et envisager de passer à un autre biologique avec un mécanisme d'action différent.</li>
                </ul>
            </Section>
            
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                <div className="flex items-start">
                     <AlertTriangle className="text-red-600 mr-3 mt-1 flex-shrink-0" size={20} />
                     <p className="text-sm text-red-700">
                        Cette décision complexe doit être individualisée et gérée par un spécialiste de l'asthme sévère.
                     </p>
                </div>
            </div>

        </div>
    );
};

export default BiologicTherapyGuideContent;
