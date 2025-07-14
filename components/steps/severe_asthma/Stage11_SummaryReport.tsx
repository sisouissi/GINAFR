
import React, { useMemo } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import AssessmentCard from './AssessmentCard';
import { User, Droplets, FlaskConical, ShieldAlert, CheckCircle, XCircle, FileText, ClipboardList } from 'lucide-react';
import { getBiologicRecommendation } from '../../../constants/severeAsthmaData';

const SummarySection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="py-3 border-b border-slate-200 last:border-b-0">
        <h3 className="font-semibold text-slate-800 mb-3 flex items-center text-md">
            {React.cloneElement(icon as React.ReactElement<any>, { size: 20, className: "mr-2.5 text-slate-500"})}
            {title}
        </h3>
        <div className="pl-9 space-y-2 text-sm text-slate-700">
            {children}
        </div>
    </div>
);

const SummaryItem: React.FC<{ label: string; value: string | number | boolean | null }> = ({ label, value }) => {
    let displayValue: React.ReactNode = value;
    if (typeof value === 'boolean') {
        displayValue = value ? 
            <CheckCircle size={16} className="text-green-600 inline-block" /> : 
            <XCircle size={16} className="text-red-600 inline-block" />;
    }
    if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
        displayValue = <span className="text-slate-400 italic">Non spécifié</span>;
    }
    return (
        <div className="flex justify-between items-center py-1">
            <span className="font-medium text-slate-600">{label}:</span>
            <span className="text-right font-semibold text-slate-800">{displayValue}</span>
        </div>
    );
};

const Stage11_SummaryReport: React.FC = () => {
    const { patientData } = usePatientData();
    const { severeAsthma: data, severeAsthmaAssessment: assessment } = patientData;
    const topRecommendation = useMemo(() => getBiologicRecommendation(patientData)?.[0], [patientData]);

    return (
        <div id="summary-report-content">
            <AssessmentCard title="Rapport de Synthèse du Patient" icon={<FileText />}>
                <SummarySection title="Données Démographiques & Antécédents" icon={<User />}>
                    <SummaryItem label="Âge" value={data.basicInfo.age || 'N/A'} />
                    <SummaryItem label="Apparition de l'asthme" value={data.basicInfo.asthmaOnset} />
                    <SummaryItem label="Exacerbations (année passée)" value={data.basicInfo.exacerbationsLastYear || 'N/A'} />
                    <SummaryItem label="Observance" value={data.medications.adherence} />
                    <SummaryItem label="Technique d'inhalation" value={data.medications.inhalerTechnique} />
                </SummarySection>

                <SummarySection title="Principaux Résultats de l'Évaluation" icon={<ClipboardList />}>
                    <SummaryItem label="Asthme difficile à traiter" value={assessment.difficultToTreat} />
                    <SummaryItem label="Asthme sévère confirmé" value={assessment.severeAsthma} />
                    <SummaryItem label="Phénotype inflammatoire" value={assessment.type2Inflammation ? 'Type 2 Élevé' : 'Faibles biomarqueurs de Type 2'} />
                </SummarySection>

                <SummarySection title="Biomarqueurs" icon={<FlaskConical />}>
                    <SummaryItem label="Éosinophiles sanguins (/μL)" value={data.biomarkers.bloodEosinophils || 'N/A'} />
                    <SummaryItem label="FeNO (ppb)" value={data.biomarkers.feNo || 'N/A'} />
                    <SummaryItem label="IgE Totales (UI/mL)" value={data.biomarkers.totalIgE || 'N/A'} />
                    <SummaryItem label="Sensibilisation allergénique" value={data.biomarkers.specificIgE || data.biomarkers.skinPrickTest} />
                </SummarySection>

                <SummarySection title="Principales Comorbidités & Facteurs de Risque" icon={<ShieldAlert />}>
                    <p className="font-medium text-slate-600 mb-1">Comorbidités :</p>
                    {data.comorbidities.length > 0 ? (
                        <ul className="list-disc list-inside text-xs">
                            {data.comorbidities.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    ) : <p className="text-slate-400 italic text-xs">Aucune spécifiée.</p>}

                    <p className="font-medium text-slate-600 mt-2 mb-1">Facteurs de risque :</p>
                     {data.riskFactors.length > 0 ? (
                        <ul className="list-disc list-inside text-xs">
                            {data.riskFactors.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    ) : <p className="text-slate-400 italic text-xs">Aucun spécifié.</p>}
                </SummarySection>
                
                 {assessment.eligibleForBiologics && topRecommendation && (
                    <SummarySection title="Meilleure Recommandation Biologique" icon={<Droplets />}>
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <h4 className="font-bold text-lg text-emerald-800">{topRecommendation.drug}</h4>
                            <p className="text-sm mt-1">{topRecommendation.reason}</p>
                        </div>
                    </SummarySection>
                )}
            </AssessmentCard>
        </div>
    );
};

export default Stage11_SummaryReport;