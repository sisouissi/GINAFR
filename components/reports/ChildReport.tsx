import React from 'react';
import { usePatientData } from '../../contexts/PatientDataContext';
import { useNavigation } from '../../contexts/NavigationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { childTreatments } from '../../constants/treatmentData';
import { User, FileText, Printer, ArrowLeft, CheckCircle2, XCircle, Calendar, ClipboardList, Zap, ShieldCheck, AlertTriangle } from '../../constants/icons';
import { childRiskFactorsList } from '../../constants/riskFactorData';
import TestHistory from '../common/TestHistory';

const ReportSection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <div className="py-4 border-b border-slate-200 last:border-b-0">
        <h3 className="font-semibold text-slate-800 mb-2 flex items-center text-lg">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 22, className: "mr-3 text-slate-500"})}
            {title}
        </h3>
        <div className="pl-10 space-y-2 text-sm">
            {children}
        </div>
    </div>
);

const ReportItem: React.FC<{ label: string; value: React.ReactNode | string | null; }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center py-1">
        <span className="font-medium text-slate-600">{label}:</span>
        <span className="text-left sm:text-right font-semibold text-slate-800">{value ?? <span className="text-slate-400 italic">Non spécifié</span>}</span>
    </div>
);

const ChildReport: React.FC = () => {
    const { patientData } = usePatientData();
    const { goBack } = useNavigation();
    
    const { 
        age, 
        diagnosisConfirmed,
        child_controlLevel,
        child_pathway,
        child_currentGinaStep,
        child_riskFactors,
        cactHistory,
        child_reviewReminderDate
    } = patientData;

    const controlLevelText = {
        wellControlled: 'Bien contrôlé',
        partlyControlled: 'Partiellement contrôlé',
        uncontrolled: 'Non contrôlé',
    };

    const pathwayText = {
        track1: 'Voie 1 (MART avec CSI-formotérol)',
        track2: 'Voie 2 (Secours par SABA)',
    };
    
    const treatmentDetails = (child_pathway && child_currentGinaStep && childTreatments[child_pathway])
        ? childTreatments[child_pathway][child_currentGinaStep]
        : null;

    const riskFactorsText = child_riskFactors
        .map(id => childRiskFactorsList.find(f => f.id === id)?.label)
        .filter(Boolean);

    return (
        <div id="print-area">
            <Card
                title="Rapport Clinique - Enfant 6-11 ans"
                icon={<User className="text-emerald-600" />}
                className="print:shadow-none print:border-none"
                actions={
                    <div className="flex justify-between items-center no-print">
                        <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>Retour</Button>
                        <Button onClick={() => window.print()} variant="primary" leftIcon={<Printer />}>Imprimer</Button>
                    </div>
                }
            >
                <ReportSection title="Identité du Patient" icon={<User />}>
                    <ReportItem label="Groupe d'âge" value={age} />
                </ReportSection>
                
                <ReportSection title="Statut Diagnostique" icon={<FileText />}>
                    <ReportItem 
                        label="Diagnostic" 
                        value={diagnosisConfirmed === null ? "Non évalué" : (diagnosisConfirmed ? 
                            <span className="flex items-center text-green-700"><CheckCircle2 size={16} className="mr-1.5"/>Confirmé</span> : 
                            <span className="flex items-center text-amber-700"><XCircle size={16} className="mr-1.5"/>Non confirmé</span>)} 
                    />
                </ReportSection>

                <ReportSection title="Évaluation Actuelle" icon={<ClipboardList />}>
                    <ReportItem label="Niveau de contrôle" value={child_controlLevel ? controlLevelText[child_controlLevel] : null} />
                    <ReportItem label="Voie thérapeutique choisie" value={child_pathway ? pathwayText[child_pathway] : null} />
                </ReportSection>

                <ReportSection title="Plan de Traitement Actuel" icon={<ShieldCheck />}>
                     <ReportItem label="Palier GINA" value={child_currentGinaStep ? `Palier ${child_currentGinaStep}` : null} />
                     {treatmentDetails && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                             <h4 className="font-semibold text-slate-800">{treatmentDetails.name || "Traitement Recommandé"}</h4>
                             {treatmentDetails.controller && <p className="text-xs mt-1"><strong>Fond :</strong> {treatmentDetails.controller}</p>}
                             {treatmentDetails.reliever && <p className="text-xs mt-1"><strong>Secours :</strong> {treatmentDetails.reliever}</p>}
                        </div>
                     )}
                </ReportSection>
                
                <ReportSection title="Facteurs de Risque" icon={<AlertTriangle />}>
                    {riskFactorsText.length > 0 ? (
                        <ul className="list-disc list-inside text-xs">
                            {riskFactorsText.map(text => <li key={text}>{text}</li>)}
                        </ul>
                    ) : <p className="text-slate-500 italic text-xs">Aucun facteur de risque majeur identifié.</p>}
                </ReportSection>

                <ReportSection title="Historique des Tests" icon={<Zap />}>
                    <TestHistory history={cactHistory} testName="c-ACT" />
                    {cactHistory.length === 0 && <p className="text-slate-500 italic text-xs">Aucun historique de test c-ACT enregistré.</p>}
                </ReportSection>

                <ReportSection title="Suivi" icon={<Calendar />}>
                    <ReportItem label="Date de rappel pour le suivi" value={child_reviewReminderDate ? new Date(child_reviewReminderDate).toLocaleDateString('fr-FR') : "Aucun rappel défini"} />
                </ReportSection>
            </Card>
        </div>
    );
};

export default ChildReport;
