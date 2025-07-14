
import React from 'react';
import { ShieldCheck, ShieldAlert } from '../../constants/icons';

interface RiskSummaryProps {
  score: number;
  selectedFactors: string[];
}

const RiskSummary: React.FC<RiskSummaryProps> = ({ score, selectedFactors }) => {
  if (selectedFactors.length === 0) {
    return null;
  }

  let riskLevel: 'Faible' | 'Modéré' | 'Élevé';
  let colorClasses: string;
  let Icon: React.ElementType;

  if (score >= 4) {
    riskLevel = 'Élevé';
    colorClasses = 'bg-red-50 border-red-500 text-red-800';
    Icon = ShieldAlert;
  } else if (score >= 1) {
    riskLevel = 'Modéré';
    colorClasses = 'bg-amber-50 border-amber-500 text-amber-800';
    Icon = ShieldAlert;
  } else {
    riskLevel = 'Faible';
    colorClasses = 'bg-emerald-50 border-emerald-500 text-emerald-800';
    Icon = ShieldCheck;
  }

  const riskAdvice = {
    Faible: "Le patient a un faible nombre de facteurs de risque. Poursuivre la surveillance de routine.",
    Modéré: "Le patient a un risque modéré de futures exacerbations. Traiter les facteurs identifiés et envisager un suivi plus rapproché.",
    Élevé: "Le patient a un risque élevé de futures exacerbations. La Voie 1 (secours par CSI-formotérol) est fortement recommandée. Traiter les facteurs de manière urgente et assurer un plan d'action robuste.",
  };

  return (
    <div className={`mt-6 p-4 rounded-lg border-l-4 ${colorClasses}`}>
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-lg">Profil de Risque {riskLevel}</h3>
          <p className="text-sm">{riskAdvice[riskLevel]}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-2 pl-9">
        {selectedFactors.length} facteur(s) de risque identifié(s).
      </p>
    </div>
  );
};

export default RiskSummary;