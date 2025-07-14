import React from 'react';
import { usePatientData } from '../../contexts/PatientDataContext';
import { useNavigation } from '../../contexts/NavigationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { youngChildTreatments } from '../../constants/treatmentData';
import { Baby, FileText, Printer, ArrowLeft, CheckCircle2, XCircle, Square, CheckSquare, Calendar, ClipboardList, Zap, ShieldCheck } from '../../constants/icons';
import { YoungChildDiagnosisCriteria } from '../../types';
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

const DiagnosisCriteriaDisplay: React.FC<{ criteria: YoungChildDiagnosisCriteria | null }> = ({ criteria }) => {
    const criteriaList = [
        { id: 'criterion1', text: 'Épisode(s) de sifflement aigu récurrent(s)' },
        { id: 'criterion2', text: 'Aucune cause alternative probable' },
        { id: 'criterion3', text: 'Réponse clinique rapide au traitement' },
    ];
    if (!criteria) return null;
    return (
        <div className="mt-2 space-y-1">
            {criteriaList.map(item => {
                const isChecked = criteria[item.id as keyof YoungChildDiagnosisCriteria];
                return (
                    <div key={item.id} className="flex items-center text-xs">
                        {isChecked ? <CheckSquare size={16} className="text-green-600 mr-2" /> : <Square size={16} className="text-slate-400 mr-2" />}
                        {item.text}
                    </div>
                );
            })}
        </div>
    );
};

const YoungChildReport: React.FC = () => {
    const { patientData } = usePatientData();
    const { goBack } = useNavigation();
    
    const { 
        age, 
        diagnosisConfirmed,
        youngChild_diagnosisCriteria,
        youngChild_symptomPattern,
        youngChild_controlLevel,
        youngChild_currentGinaStep,
        youngChild_currentTreatmentStrategy,
        youngChild_reviewReminderDate,
        cactHistory 
    } = patientData;

    const symptomPatternText = youngChild_symptomPattern === 'infrequentViralWheeze' 
        ? "Sifflements viraux peu fréquents" 
        : youngChild_symptomPattern === 'persistentAsthmaOrFrequentWheeze'
        ? "Asthme persistant / Sifflements fréquents"
        : null;

    const controlLevelText = {
        wellControlled: 'Bien contrôlé',
        partlyControlled: 'Partiellement contrôlé',
        uncontrolled: 'Non contrôlé',
    };

    const treatmentStepDetails = youngChild_currentGinaStep ? youngChildTreatments[youngChild_currentGinaStep] : null;
    let activeTreatment = treatmentStepDetails?.preferred;
    if (youngChild_currentTreatmentStrategy !== 'preferred' && treatmentStepDetails?.alternatives) {
        activeTreatment = treatmentStepDetails.alternatives.find(alt => alt.id === youngChild_currentTreatmentStrategy) || activeTreatment;
    }

    return (
        <div id="print-area">
            <Card
                title="Rapport Clinique - Enfant ≤5 ans"
                icon={<Baby className="text-violet-600" />}
                className="print:shadow-none print:border-none"
                actions={
                    <div className="flex justify-between items-center no-print">
                        <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />}>Retour</Button>
                        <Button onClick={() => window.print()} variant="primary" leftIcon={<Printer />}>Imprimer</Button>
                    </div>
                }
            >
                <ReportSection title="Identité du Patient" icon={<Baby />}>
                    <ReportItem label="Groupe d'âge" value={age} />
                </ReportSection>
                
                <ReportSection title="Statut Diagnostique" icon={<FileText />}>
                    <ReportItem 
                        label="Diagnostic" 
                        value={diagnosisConfirmed === null ? "Non évalué" : (diagnosisConfirmed ? 
                            <span className="flex items-center text-green-700"><CheckCircle2 size={16} className="mr-1.5"/>Confirmé</span> : 
                            <span className="flex items-center text-amber-700"><XCircle size={16} className="mr-1.5"/>Suspecté / En cours</span>)} 
                    />
                    <DiagnosisCriteriaDisplay criteria={youngChild_diagnosisCriteria} />
                </ReportSection>

                <ReportSection title="Évaluation Actuelle" icon={<ClipboardList />}>
                    <ReportItem label="Schéma des symptômes" value={symptomPatternText} />
                    <ReportItem label="Niveau de contrôle" value={youngChild_controlLevel ? controlLevelText[youngChild_controlLevel] : null} />
                </ReportSection>

                <ReportSection title="Plan de Traitement Actuel" icon={<ShieldCheck />}>
                     <ReportItem label="Palier GINA" value={youngChild_currentGinaStep ? `Palier ${youngChild_currentGinaStep}` : null} />
                     {activeTreatment && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                             <h4 className="font-semibold text-slate-800">{activeTreatment.name}</h4>
                             {activeTreatment.controller && <p className="text-xs mt-1"><strong>Fond :</strong> {activeTreatment.controller}</p>}
                             {activeTreatment.reliever && <p className="text-xs mt-1"><strong>Secours :</strong> {activeTreatment.reliever}</p>}
                        </div>
                     )}
                </ReportSection>

                <ReportSection title="Historique des Tests" icon={<Zap />}>
                    <TestHistory history={cactHistory} testName="c-ACT" />
                    {cactHistory.length === 0 && <p className="text-slate-500 italic text-xs">Aucun historique de test c-ACT enregistré.</p>}
                </ReportSection>

                <ReportSection title="Suivi" icon={<Calendar />}>
                    <ReportItem label="Date de rappel pour le suivi" value={youngChild_reviewReminderDate ? new Date(youngChild_reviewReminderDate).toLocaleDateString('fr-FR') : "Aucun rappel défini"} />
                </ReportSection>
            </Card>
        </div>
    );
};

export default YoungChildReport;