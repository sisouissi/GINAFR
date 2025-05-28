
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AdultPathway } from '../../../types';
import { ListChecks, ChevronRight, HelpCircle, Route } from 'lucide-react';

const AdultPathwaySelectionStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handlePathwaySelection = (pathway: AdultPathway) => {
    navigateTo('ADULT_TREATMENT_PLAN_STEP', { adult_pathway: pathway });
  };

  return (
    <Card title="Sélectionner la Voie Thérapeutique (Adultes & Adolescents)" icon={<Route className="text-sky-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Les recommandations GINA proposent deux voies thérapeutiques principales. <strong className="font-semibold text-slate-700">La Voie 1 est préférée</strong> pour la plupart des patients car elle réduit le risque d'exacerbations sévères par rapport à la Voie 2.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voie 1 */}
        <div className="flex flex-col p-5 bg-white border-2 border-emerald-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2">Voie 1 (Préférée)</h3>
          <p className="text-xs text-emerald-600 mb-3 font-medium uppercase tracking-wider">Basée sur CSI-Formotérol</p>
          
          <div className="text-sm space-y-1 mb-4 text-slate-600 flex-grow">
            <p><strong className="font-medium text-slate-700">Traitement de fond :</strong> CSI-formotérol faible dose.</p>
            <p><strong className="font-medium text-slate-700">Traitement de secours :</strong> CSI-formotérol faible dose PRN (si besoin).</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-snug">
            Utilise un inhalateur combiné CSI-formotérol pour le traitement de fond (si applicable) et de secours (MART aux Paliers 3-5).
          </p>
          <Button 
            onClick={() => handlePathwaySelection('pathway1')} 
            fullWidth 
            variant="success" // Using success variant for preferred
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 1"
            className="mt-auto"
          >
            Choisir la Voie 1
          </Button>
        </div>

        {/* Voie 2 */}
        <div className="flex flex-col p-5 bg-white border-2 border-sky-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-sky-700 mb-2">Voie 2 (Alternative)</h3>
          <p className="text-xs text-sky-600 mb-3 font-medium uppercase tracking-wider">Basée sur Soulageur BACA</p>

          <div className="text-sm space-y-1 mb-4 text-slate-600 flex-grow">
            <p><strong className="font-medium text-slate-700">Traitement de fond :</strong> Autre schéma contenant des CSI.</p>
            <p><strong className="font-medium text-slate-700">Traitement de secours :</strong> BACA PRN (si besoin).</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-snug">
            Utilise un Bêta-2 Agoniste de Courte Durée d'Action (BACA) pour le soulagement, avec un médicament de fond distinct pris régulièrement.
          </p>
          <Button 
            onClick={() => handlePathwaySelection('pathway2')} 
            fullWidth
            variant="primary" // Standard primary for alternative
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 2"
            className="mt-auto"
          >
            Choisir la Voie 2
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-700">Considérations Importantes :</p>
            <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
              <li>La Voie 1 est généralement préférée en raison de preuves d'une réduction du risque d'exacerbations sévères.</li>
              <li>La Voie 2 peut être envisagée si la Voie 1 n'est pas possible, non préférée par le patient après discussion, ou en cas de préoccupations concernant l'observance du CSI-formotérol PRN (si besoin) aux Paliers 1-2.</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdultPathwaySelectionStep;