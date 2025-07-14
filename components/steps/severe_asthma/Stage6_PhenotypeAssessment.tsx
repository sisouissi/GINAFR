
import React, { useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { FlaskConical, CheckCircle2, XCircle, ChevronRight, CheckSquare, Square } from '../../../constants/icons';

const Stage6_PhenotypeAssessment: React.FC = () => {
    const { patientData, updatePatientData } = usePatientData();
    const { navigateTo } = useNavigation();

    const updateBiomarker = useCallback((field: string, value: any) => {
        const updates = {
            ...patientData,
            severeAsthma: {
                ...patientData.severeAsthma,
                biomarkers: {
                    ...patientData.severeAsthma.biomarkers,
                    [field]: value,
                }
            }
        };
        updatePatientData(updates);
    }, [patientData, updatePatientData]);

    const { type2Inflammation } = patientData.severeAsthmaAssessment;
    const { biomarkers } = patientData.severeAsthma;

    return (
        <div>
            <AssessmentCard title="Évaluation du Phénotype Inflammatoire" icon={<FlaskConical />}>
                <p className="text-sm text-slate-600 mb-4">
                    Déterminez si l'asthme sévère est piloté par une inflammation de Type 2. Ces biomarqueurs sont cruciaux pour guider la sélection des thérapies biologiques.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                        label="Éosinophiles sanguins (cellules/μL)" 
                        type="number" 
                        value={biomarkers.bloodEosinophils} 
                        onChange={(e: any) => updateBiomarker('bloodEosinophils', e.target.value)} 
                        placeholder="≥150/μL est significatif"
                    />
                    <InputField 
                        label="FeNO (ppb)" 
                        type="number" 
                        value={biomarkers.feNo} 
                        onChange={(e: any) => updateBiomarker('feNo', e.target.value)} 
                        placeholder="≥25 ppb est significatif"
                    />
                     <InputField 
                        label="Éosinophiles dans les expectorations (%)" 
                        type="number" 
                        value={biomarkers.sputumEosinophils} 
                        onChange={(e: any) => updateBiomarker('sputumEosinophils', e.target.value)} 
                        placeholder="≥2% est significatif (si disponible)"
                    />
                    <InputField 
                        label="IgE totales (UI/mL)" 
                        type="number" 
                        value={biomarkers.totalIgE} 
                        onChange={(e: any) => updateBiomarker('totalIgE', e.target.value)} 
                        placeholder="Pour éligibilité Anti-IgE"
                    />
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                     <h5 className="font-medium mb-2 text-sm">Signes d'Atopie :</h5>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <Checkbox 
                            label="IgE spécifiques positives"
                            checked={biomarkers.specificIgE}
                            onChange={(e: any) => updateBiomarker('specificIgE', e.target.checked)}
                        />
                         <Checkbox 
                            label="Prick-tests cutanés positifs"
                            checked={biomarkers.skinPrickTest}
                            onChange={(e: any) => updateBiomarker('skinPrickTest', e.target.checked)}
                        />
                    </div>
                </div>
            </AssessmentCard>
            
             <div className={`mt-6 p-4 rounded-lg border-l-4 ${type2Inflammation ? 'bg-teal-50 border-teal-500' : 'bg-slate-100 border-slate-400'}`}>
                <div className="flex items-center">
                    {type2Inflammation ? 
                        <CheckCircle2 size={24} className="text-teal-600 mr-3" /> : 
                        <XCircle size={24} className="text-slate-600 mr-3" />
                    }
                    <div>
                        <h4 className="font-semibold text-lg">{type2Inflammation ? 'Phénotype : Inflammation de Type 2 Élevée' : 'Phénotype : Faibles Biomarqueurs de Type 2'}</h4>
                        <p className="text-sm text-slate-700">{type2Inflammation ? 'Le patient présente des signes d\'inflammation de Type 2, ce qui le rend éligible aux thérapies biologiques ciblées.' : 'Le patient ne présente pas de signes clairs d\'inflammation de Type 2. Les options de traitement sont plus limitées.'}</p>
                    </div>
                </div>
             </div>

            <div className="mt-6 border-t border-slate-300 pt-6">
                 <Button 
                    onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_7')}
                    fullWidth
                    size="lg"
                    variant="primary"
                    rightIcon={<ChevronRight />}
                 >
                    Procéder aux Options Thérapeutiques
                </Button>
            </div>
        </div>
    );
};

// Helper sub-components for form fields from Stage 1
const InputField: React.FC<any> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
        <input className="w-full p-2 border border-slate-300 rounded-md focus:ring-sky-500 focus:border-sky-500" {...props} />
    </div>
);

const Checkbox: React.FC<any> = ({ label, ...props }) => (
     <label className="flex items-center cursor-pointer text-sm">
        <input type="checkbox" className="sr-only" {...props} />
        {props.checked ? <CheckSquare size={20} className="text-sky-600 mr-2" /> : <Square size={20} className="text-slate-400 mr-2" />}
        {label}
    </label>
);

export default Stage6_PhenotypeAssessment;
