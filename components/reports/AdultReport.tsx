import React from 'react';
import { usePatientData } from '../../contexts/PatientDataContext';
import { useNavigation } from '../../contexts/NavigationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { adultTreatments } from '../../constants/treatmentData';
import { Users, FileText, Printer, ArrowLeft, CheckCircle2, XCircle, Calendar, ClipboardList, Zap, ShieldCheck, AlertTriangle } from '../../constants/icons';
import { adultRiskFactorsList } from '../../constants/riskFactorData';
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

const AdultReport: React.FC = () => {
    const { patientData } = usePatientData();
    const { goBack } = useNavigation();
    
    const { 
        age, 
        diagnosisConfirmed,
        adult_controlLevel,
        adult_pathway,
        adult_currentGinaStep,
        adult_riskFactors,
        actHistory,
        acqHistory,
        adult_reviewReminderDate
    } = patientData;

    const controlLevelText = {
        wellControlled: 'Bien contrôlé',
        partlyControlled: 'Partiellement contrôlé',
        uncontrolled: 'Non contrôlé',
    };

    const pathwayText = {
        pathway1: 'Voie 1 (Secours par CSI-formotérol)',
        pathway2: 'Voie 2 (Secours par SABA)',
    };
    
    const treatmentDetails = (adult_pathway && adult_currentGinaStep) 
        ? adultTreatments[adult_pathway][adult_currentGinaStep]
        : null;

    const riskFactorsText = adult_riskFactors
        .map(id => adultRiskFactorsList.find(f => f.id === id)?.label)
        .filter(Boolean);

    return (
        <div id="print-area">
            <Card
                title="Rapport Clinique - Adultes & Adolescents"
                icon={<Users className="text-sky-600" />}
                className="print:shadow-none print:border-none"
                actions={
                    <div className="flex justify-between items-center no-print">
                        <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>Retour</Button>
                        <Button onClick={() => window.print()} variant="primary" leftIcon={<Printer />}>Imprimer</Button>
                    </div>
                }
            >
                <ReportSection title="Identité du Patient" icon={<Users />}>
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
                    <ReportItem label="Niveau de contrôle" value={adult_controlLevel ? controlLevelText[adult_controlLevel] : null} />
                    <ReportItem label="Voie thérapeutique choisie" value={adult_pathway ? pathwayText[adult_pathway] : null} />
                </ReportSection>

                <ReportSection title="Plan de Traitement Actuel" icon={<ShieldCheck />}>
                     <ReportItem label="Palier GINA" value={adult_currentGinaStep ? `Palier ${adult_currentGinaStep}` : null} />
                     {treatmentDetails && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                             <h4 className="font-semibold text-slate-800">{treatmentDetails.name}</h4>
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
                    <TestHistory history={actHistory} testName="ACT" />
                    <TestHistory history={acqHistory} testName="ACQ-5" />
                    {actHistory.length === 0 && acqHistory.length === 0 && <p className="text-slate-500 italic text-xs">Aucun historique de test enregistré.</p>}
                </ReportSection>

                <ReportSection title="Suivi" icon={<Calendar />}>
                    <ReportItem label="Date de rappel pour le suivi" value={adult_reviewReminderDate ? new Date(adult_reviewReminderDate).toLocaleDateString('fr-FR') : "Aucun rappel défini"} />
                </ReportSection>
            </Card>
        </div>
    );
};

export default AdultReport;
