
import React, { useMemo, useCallback } from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useNavigation } from '../../../contexts/NavigationContext';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { Droplets, TestTubeDiagonal, ShieldCheck, TrendingUp, HelpCircle, ChevronRight, ArrowRight } from '../../../constants/icons';
import { getBiologicRecommendation } from '../../../constants/severeAsthmaData';

const RecommendationItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <div className="text-sm text-slate-600 mt-1">{children}</div>
    </div>
);

const RecommendationCard: React.FC<{ rec: any, rank: number }> = ({ rec, rank }) => {
    const colors = {
        0: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-800', bar: 'bg-emerald-500' },
        1: { border: 'border-sky-500', bg: 'bg-sky-50', text: 'text-sky-800', bar: 'bg-sky-500' },
        2: { border: 'border-slate-400', bg: 'bg-slate-50', text: 'text-slate-800', bar: 'bg-slate-500' },
    };
    const medals = ['🥇', '🥈', '🥉'];
    const style = colors[rank as keyof typeof colors] || colors[2];

    return (
        <div className={`border-2 rounded-xl p-4 ${style.border} ${style.bg} shadow-md`}>
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className={`font-bold text-xl ${style.text}`}>{medals[rank]} {rec.drug}</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${rec.strength.includes('Fortement') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{rec.strength}</span>
                </div>
                <div className="text-right"><div className={`text-3xl font-bold ${style.text}`}>{rec.score}</div><div className="text-xs text-slate-500">Score/100</div></div>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Raisonnement Clinique :</strong> {rec.reason}</p>
                <p><strong>Éligibilité :</strong> {rec.eligibility}</p>
            </div>
            <div className="mt-3"><div className="w-full bg-slate-200 rounded-full h-2.5"><div className={`h-2.5 rounded-full transition-all duration-300 ${style.bar}`} style={{ width: `${rec.score}%` }}></div></div></div>
        </div>
    );
};

const Stage7_TreatmentOptions: React.FC = () => {
    const { patientData, updatePatientData } = usePatientData();
    const { navigateTo } = useNavigation();
    const { type2Inflammation, eligibleForBiologics } = patientData.severeAsthmaAssessment;
    const { biologicsAvailable } = patientData.severeAsthma.medications;
    const recommendations = useMemo(() => getBiologicRecommendation(patientData), [patientData]);

     const handleBiologicsAvailableChange = useCallback((value: 'yes' | 'no') => {
        const updates = {
            ...patientData,
            severeAsthma: {
                ...patientData.severeAsthma,
                medications: {
                    ...patientData.severeAsthma.medications,
                    biologicsAvailable: value,
                }
            }
        };
        updatePatientData(updates);
    }, [patientData, updatePatientData]);


    const renderType2HighContent = () => (
        <>
            <AssessmentCard title="Phénotype : Asthme Sévère à Inflammation de Type 2 Élevée" icon={<Droplets className="text-teal-600" />}>
                {eligibleForBiologics && recommendations && recommendations.length > 0 ? (
                     <div className="space-y-4">
                        <p className="text-sm text-slate-600">Sur la base des données du patient, les thérapies biologiques suivantes sont recommandées, classées par score de pertinence :</p>
                        {recommendations.slice(0, 3).map((rec, index) => <RecommendationCard key={index} rec={rec} rank={index} />)}
                    </div>
                ) : (
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold text-amber-800 mb-2 text-md">Thérapie Biologique Non Indiquée</h4>
                        <p className="text-sm text-amber-700">
                            Bien qu'une inflammation de Type 2 soit présente, le patient ne remplit pas actuellement tous les critères GINA pour un asthme sévère nécessitant une thérapie biologique (ex: non contrôlé malgré un traitement optimisé). Veuillez revoir les étapes 1 à 4.
                        </p>
                    </div>
                )}
            </AssessmentCard>

            {eligibleForBiologics && (
                 <AssessmentCard title="Disponibilité de la Thérapie Biologique" icon={<HelpCircle className="text-sky-600"/>}>
                    <p className="text-sm text-center text-slate-700 mb-3">La thérapie biologique additionnelle de Type 2 est-elle disponible / abordable pour ce patient ?</p>
                    <div className="flex justify-center gap-4">
                        <Button 
                            onClick={() => handleBiologicsAvailableChange('yes')} 
                            variant={biologicsAvailable === 'yes' ? 'success' : 'secondary'}
                            aria-pressed={biologicsAvailable === 'yes'}
                        >Oui</Button>
                        <Button 
                            onClick={() => handleBiologicsAvailableChange('no')}
                            variant={biologicsAvailable === 'no' ? 'warning' : 'secondary'}
                             aria-pressed={biologicsAvailable === 'no'}
                        >Non</Button>
                    </div>
                 </AssessmentCard>
            )}
            
            {biologicsAvailable === 'yes' && eligibleForBiologics && (
                <div className="mt-4 text-center p-4 bg-slate-50 border rounded-lg">
                    <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_8')} size="lg" rightIcon={<ChevronRight/>}>Procéder aux Détails de la Thérapie Biologique (Étape 8)</Button>
                </div>
            )}
            
            {biologicsAvailable === 'no' && eligibleForBiologics && (
                <AssessmentCard title="Traitement Alternatif (Biologiques non disponibles)" icon={<TrendingUp className="text-amber-600"/>}>
                    <p className="text-sm text-slate-600 mb-3">Selon le GINA (p.152, Section 7.3), si la thérapie biologique ciblée de Type 2 n'est pas disponible/abordable, envisagez les options suivantes :</p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
                        <li>Envisager une dose plus élevée de CSI-BALA, si non utilisée.</li>
                        <li>Envisager d'autres traitements d'appoint, ex: AMLA, ARLT, azithromycine à faible dose, si non déjà utilisés.</li>
                        <li>En dernier recours, envisager d'ajouter des CSO à faible dose, mais mettre en œuvre des stratégies pour minimiser les effets secondaires.</li>
                        <li>Arrêter les thérapies d'appoint inefficaces.</li>
                        <li>Continuer à optimiser le traitement, y compris la technique d'inhalation, l'observance, les stratégies non pharmacologiques et le traitement des comorbidités.</li>
                    </ul>
                    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-slate-200 pt-4">
                        <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_3')} variant="secondary" leftIcon={<ArrowRight className="transform -rotate-180"/>}>Retour à l'Optimisation (Étape 3)</Button>
                        <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_10')} variant="primary" rightIcon={<ArrowRight/>}>Procéder aux Soins Continus (Étape 10)</Button>
                    </div>
                </AssessmentCard>
            )}
        </>
    );

    const renderLowType2Content = () => (
        <>
            <AssessmentCard title="Phénotype : Asthme Sévère avec Faibles Biomarqueurs de Type 2" icon={<TestTubeDiagonal className="text-slate-600" />}>
                <p className="mb-4 text-sm text-slate-600">
                    Le patient ne montre pas de signes d'inflammation de Type 2 persistante. Les options de traitement sont limitées et doivent être gérées par un spécialiste (GINA p.151, Section 7.1).
                </p>
                <div className="space-y-4">
                    <RecommendationItem title="Revoir les Bases">
                         <div className="flex items-center">
                            <ShieldCheck size={16} className="text-sky-600 mr-2 flex-shrink-0" />
                            <span>Re-confirmer le diagnostic, la technique d'inhalation, l'observance, et la gestion des comorbidités et des effets secondaires.</span>
                        </div>
                    </RecommendationItem>
                     <RecommendationItem title="Envisager un Essai de Traitements d'Appoint">
                         <ul className="list-disc list-inside space-y-1">
                            <li><strong>AMLA :</strong> Antagoniste Muscarinique à Longue Durée d'Action (ex: tiotropium) si non déjà essayé.</li>
                            <li><strong>Azithromycine à faible dose :</strong> Peut réduire les exacerbations. Dépister les contre-indications (allongement du QTc, mycobactéries atypiques).</li>
                            <li><strong>Tézéplumab (Anti-TSLP) :</strong> Un biologique efficace sur tous les phénotypes, y compris faible T2. Envisager si les autres options échouent.</li>
                        </ul>
                    </RecommendationItem>
                    <RecommendationItem title="Dernier Recours : CSO à faible dose">
                        Utiliser la plus faible dose possible pour maintenir le contrôle, avec des stratégies pour atténuer les effets secondaires.
                    </RecommendationItem>
                </div>
            </AssessmentCard>
            <div className="mt-4 text-center p-4 bg-slate-50 border rounded-lg">
                <Button onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_10')} size="lg" rightIcon={<ChevronRight/>}>Procéder aux Soins Continus (Étape 10)</Button>
            </div>
        </>
    );
    
    return (
        <div>
            {type2Inflammation ? renderType2HighContent() : renderLowType2Content()}
        </div>
    );
};

export default Stage7_TreatmentOptions;