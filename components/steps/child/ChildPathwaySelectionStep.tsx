
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ChildPathway } from '../../../types';
import { ChevronRight, HelpCircle, Route, Zap, Activity } from 'lucide-react';

const ChildPathwaySelectionStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handlePathwaySelection = (pathway: ChildPathway) => {
    navigateTo('CHILD_TREATMENT_PLAN_STEP', { child_pathway: pathway });
  };

  return (
    <Card title="Sélectionner la Voie Thérapeutique (Enfants 6-11 ans)" icon={<Route className="text-emerald-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Les recommandations GINA 2025 pour les enfants de 6 à 11 ans incluent un choix entre deux approches principales, différant principalement par le médicament de secours utilisé.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voie 1 */}
        <div className="flex flex-col p-5 bg-white border-2 border-teal-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-teal-700 mb-2">Voie 1 (MART)</h3>
          <p className="text-xs text-teal-600 mb-3 font-medium uppercase tracking-wider">Basée sur le Secours par CSI-Formotérol</p>
          
          <ul className="text-sm space-y-2 mb-4 text-slate-600 flex-grow list-disc list-inside pl-2">
            <li>Le traitement de secours est le CSI-formotérol à faible dose.</li>
            <li>Introduit au Palier 3 comme Thérapie de Fond et de Secours (MART).</li>
            <li>Les études montrent une réduction importante des exacerbations avec cette stratégie.</li>
          </ul>
          <Button 
            onClick={() => handlePathwaySelection('track1')} 
            fullWidth 
            variant="teal" 
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 1 (MART)"
            className="mt-auto"
          >
            Choisir la Voie 1 (MART)
          </Button>
        </div>

        {/* Voie 2 */}
        <div className="flex flex-col p-5 bg-white border-2 border-emerald-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2">Voie 2 (Classique)</h3>
          <p className="text-xs text-emerald-600 mb-3 font-medium uppercase tracking-wider">Basée sur le Secours par SABA</p>

          <ul className="text-sm space-y-2 mb-4 text-slate-600 flex-grow list-disc list-inside pl-2">
            <li>Le traitement de secours est un Bêta-2-agoniste à Courte Durée d'Action (SABA).</li>
            <li>Nécessite un traitement de fond quotidien séparé (CSI ou CSI-BALA).</li>
            <li>L'observance du traitement de fond quotidien est essentielle pour réduire le risque d'exacerbation.</li>
          </ul>
          <Button 
            onClick={() => handlePathwaySelection('track2')} 
            fullWidth
            variant="success" 
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 2 (Classique)"
            className="mt-auto"
          >
            Choisir la Voie 2 (Classique)
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-700">Considérations Importantes (Enfants 6-11 ans) :</p>
            <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
              <li>La Voie 1 (MART) est une option préférée à partir du Palier 3, simplifiant le traitement à un seul inhalateur et réduisant les exacerbations.</li>
              <li>La Voie 2 est l'approche standard pour les Paliers 1 & 2 et reste une option valide pour tous les paliers, surtout si le MART n'est pas disponible ou préféré.</li>
              <li>Assurez-vous que l'enfant et les parents comprennent parfaitement la stratégie choisie et la technique d'inhalation (toujours avec une chambre d'inhalation).</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChildPathwaySelectionStep;
