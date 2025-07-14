import React, { useState, useMemo } from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AlertTriangle, ChevronRight, CheckSquare, Square } from '../../../constants/icons';
import { adultRiskFactorsList } from '../../../constants/riskFactorData';
import RiskSummary from '../../common/RiskSummary';

const AdultRiskAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { patientData, updatePatientData } = usePatientData();
  const [selectedFactors, setSelectedFactors] = useState<string[]>(patientData.adult_riskFactors || []);

  const handleToggleFactor = (factorId: string) => {
    setSelectedFactors(prev =>
      prev.includes(factorId) ? prev.filter(id => id !== factorId) : [...prev, factorId]
    );
  };

  const handleContinue = () => {
    updatePatientData({ adult_riskFactors: selectedFactors });
    navigateTo('ADULT_PATHWAY_SELECTION_STEP');
  };

  const riskScore = useMemo(() => {
    return selectedFactors.reduce((score, factorId) => {
      const factor = adultRiskFactorsList.find(f => f.id === factorId);
      return score + (factor ? factor.weight : 0);
    }, 0);
  }, [selectedFactors]);

  return (
    <Card title="Évaluer les Facteurs de Risque d'Exacerbations (Adultes)" icon={<AlertTriangle className="text-amber-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Indépendamment du contrôle des symptômes, identifiez tout facteur de risque modifiable pour les exacerbations futures (basé sur l'Encadré 2-2B du GINA). Cette évaluation générera un profil de risque pour aider à guider les décisions de traitement.
      </p>
      
      <div className="space-y-2">
        {adultRiskFactorsList.map((factor) => {
          const isSelected = selectedFactors.includes(factor.id);
          return (
            <div
              key={factor.id}
              onClick={() => handleToggleFactor(factor.id)}
              role="checkbox"
              aria-checked={isSelected}
              className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border ${
                isSelected 
                ? 'bg-sky-50 border-sky-400' 
                : 'bg-white border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="mt-0.5 mr-3">
                {isSelected ? (
                    <CheckSquare size={20} className="text-sky-600 flex-shrink-0" />
                ) : (
                    <Square size={20} className="text-slate-400 flex-shrink-0" />
                )}
               </div>
              <span className={`flex-grow text-sm ${isSelected ? 'font-semibold text-slate-800' : 'text-slate-700'}`}>
                {factor.label}
              </span>
            </div>
          );
        })}
      </div>

      <RiskSummary score={riskScore} selectedFactors={selectedFactors} />

      <div className="mt-8">
        <Button onClick={handleContinue} fullWidth size="xl" rightIcon={<ChevronRight />}>
          Continuer vers la Sélection de la Voie
        </Button>
      </div>
    </Card>
  );
};

export default AdultRiskAssessmentStep;