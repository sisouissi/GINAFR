
import React, { useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Stethoscope, User, Square, CheckSquare, AlertTriangle } from '../../../constants/icons';

const Stage5_SpecialistAssessment: React.FC = () => {
    const { patientData, updatePatientData } = usePatientData();
    const { navigateTo } = useNavigation();
    
    const updateInvestigation = useCallback((key: string, value: boolean) => {
        const updates = {
            ...patientData,
            severeAsthma: {
                ...patientData.severeAsthma,
                investigations: {
                    ...patientData.severeAsthma.investigations,
                    [key]: value,
                }
            }
        };
        updatePatientData(updates);
    }, [patientData, updatePatientData]);

    const investigationOptions = [
      { key: 'chestXray', label: 'Radiographie pulmonaire ou TDM haute résolution' },
      { key: 'allergyTesting', label: 'Tests allergologiques complets (prick-tests/IgE spécifiques)' },
      { key: 'boneDensity', label: 'Ostéodensitométrie (DEXA) - Risque CSO' },
      { key: 'parasiteScreen', label: 'Dépistage de parasites (si éosinophiles >= 300/μL)' },
      { key: 'cardiacAssessment', label: 'Évaluation cardiaque si indiquée' }
    ];

    const differentialDiagnoses = [
      "ABPA (Aspergillose bronchopulmonaire allergique)",
      "MREH (Maladie respiratoire exacerbée par l'aspirine)",
      "OLI/DCV (Obstruction laryngée inductible)",
      "SAOS (Syndrome d'apnées obstructives du sommeil)",
      "Bronchectasie",
      "Trachéobronchomalacie",
      "TB, MAC (Complexe Mycobacterium avium)",
      "GEPA (si hyperéosinophilie >= 1500/μL)",
    ];

    return (
        <div>
            <AssessmentCard title="Investigations et Évaluations Spécialisées" icon={<Stethoscope />}>
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <h5 className="font-semibold text-blue-800 mb-2">Clinique Multidisciplinaire de l'Asthme Sévère</h5>
                    <p className="text-sm text-blue-700">
                    L'évaluation devrait idéalement impliquer une équipe multidisciplinaire incluant des éducateurs certifiés en asthme, des orthophonistes, des ORL et des professionnels de la santé mentale.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h6 className="font-medium mb-3">Investigations Diagnostiques :</h6>
                        <div className="space-y-2">
                           {investigationOptions.map(item => (
                                <label 
                                    key={item.key} 
                                    className="flex items-center text-sm cursor-pointer"
                                    onClick={() => updateInvestigation(item.key, !patientData.severeAsthma.investigations[item.key as keyof typeof patientData.severeAsthma.investigations])}
                                >
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={patientData.severeAsthma.investigations[item.key as keyof typeof patientData.severeAsthma.investigations]}
                                    readOnly
                                />
                                {patientData.severeAsthma.investigations[item.key as keyof typeof patientData.severeAsthma.investigations] ? <CheckSquare size={20} className="text-sky-600 mr-2" /> : <Square size={20} className="text-slate-400 mr-2" />}
                                {item.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h6 className="font-medium mb-3">Diagnostics Différentiels à Exclure :</h6>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                            {differentialDiagnoses.map(dx => <li key={dx}>{dx}</li>)}
                        </ul>
                    </div>
                </div>
                 <div className="mt-4 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                    <h6 className="font-semibold text-yellow-800 mb-2">Points de Dépistage Critiques :</h6>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <p><strong>{'Éosinophiles sanguins >= 300/μL :'}</strong> Dépister les parasites (ex: sérologie Strongyloides).</p>
                      <p><strong>{'Hyperéosinophilie >= 1500/μL :'}</strong> Envisager la GEPA et d'autres causes systémiques.</p>
                      <p className="text-xs mt-1">Infection parasitaire + CSO/biologiques pourrait conduire à une maladie disséminée.</p>
                    </div>
                </div>
            </AssessmentCard>
            
            <AssessmentCard title="Soutien Psychosocial & Recherche" icon={<User />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h6 className="font-medium mb-2">Besoins en Soutien Psychosocial :</h6>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                            <li>Fardeau émotionnel de l'asthme sévère</li>
                            <li>Dépistage de l'anxiété et de la dépression</li>
                            <li>Impact social et financier</li>
                            <li>Limitations professionnelles et de carrière</li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="font-medium mb-2">Registre & Recherche :</h6>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                            <li>Envisager l'inscription à un registre de l'asthme sévère</li>
                            <li>Évaluer l'éligibilité aux essais cliniques</li>
                            <li>Contribuer aux données en vie réelle</li>
                        </ul>
                    </div>
                </div>
            </AssessmentCard>
             <div className="mt-6">
                <AssessmentCard title="Résultat de l'Évaluation Multidisciplinaire" icon={<AlertTriangle className="text-amber-600"/>}>
                    <p className="text-sm text-slate-700 mb-4 text-center">
                        Sur la base de l'évaluation spécialisée complète, des facteurs modifiables significatifs ou des diagnostics alternatifs ont-ils été identifiés, nécessitant une prise en charge avant de procéder à l'évaluation du phénotype ?
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
                        <Button
                            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_3')}
                            variant="warning"
                            size="lg"
                        >
                            Oui, Ré-optimiser la Prise en Charge
                        </Button>
                        <Button
                            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_6')}
                            variant="success"
                            size="lg"
                        >
                            Non, Procéder au Phénotypage
                        </Button>
                    </div>
                     <p className="text-xs text-slate-500 mt-4 text-center">
                        <strong>Oui :</strong> Un diagnostic alternatif a été confirmé, ou un facteur modifiable majeur (ex: comorbidité sévère non traitée, problème majeur d'observance) a été trouvé et doit être traité en premier.
                        <br/>
                        <strong>Non :</strong> Le diagnostic d'asthme sévère est maintenu, et aucun nouveau facteur modifiable majeur n'a été identifié.
                    </p>
                </AssessmentCard>
            </div>
        </div>
    );
};

export default Stage5_SpecialistAssessment;