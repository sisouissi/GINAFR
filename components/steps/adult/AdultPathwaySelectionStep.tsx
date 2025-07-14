
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import { usePatientData } from '../../../contexts/PatientDataContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { AdultPathway } from '../../../types';
import { ListChecks, ChevronRight, HelpCircle, Route, AlertTriangle } from 'lucide-react';

const AdultPathwaySelectionStep: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { patientData } = usePatientData();

  const startingAtHigherStep = patientData.adult_currentGinaStep && patientData.adult_currentGinaStep >= 3;

  const handlePathwaySelection = (pathway: AdultPathway) => {
    navigateTo('ADULT_TREATMENT_PLAN_STEP', { adult_pathway: pathway });
  };

  return (
    <Card title="Sélectionner la Voie Thérapeutique (Adultes & Adolescents)" icon={<Route className="text-sky-600" />}>
      
      {startingAtHigherStep && (
         <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-md">
            <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0"/>
                <div>
                    <h3 className="font-semibold text-amber-800">Charge de Symptômes Élevée Détectée</h3>
                    <p className="text-sm text-amber-700 mt-1">
                        Le patient commence au Palier {patientData.adult_currentGinaStep}. <strong>La Voie 1 (MART) est fortement préférée</strong> car elle fournit à la fois le traitement de fond et de secours dans un seul inhalateur, réduisant le risque d'exacerbations sévères.
                    </p>
                </div>
            </div>
        </div>
      )}
      
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Le GINA propose deux voies pour la prise en charge de l'asthme. Le choix dépend d'une décision partagée, de la disponibilité des médicaments et de facteurs spécifiques au patient.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voie 1 */}
        <div className="flex flex-col p-5 bg-white border-2 border-emerald-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2">Voie 1 (Préférée)</h3>
          <p className="text-xs text-emerald-600 mb-3 font-medium uppercase tracking-wider">Traitement de Secours par CSI-Formotérol</p>
          
          <ul className="text-sm space-y-2 mb-4 text-slate-600 flex-grow list-disc list-inside pl-2">
            <li>Le traitement de secours est le CSI-formotérol à faible dose.</li>
            <li>Réduit le risque d'exacerbations sévères.</li>
            <li>Simplifie le traitement (un seul inhalateur pour le secours, et pour le fond en MART aux Paliers 3-5).</li>
          </ul>
          <Button 
            onClick={() => handlePathwaySelection('pathway1')} 
            fullWidth 
            variant="success"
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
          <p className="text-xs text-sky-600 mb-3 font-medium uppercase tracking-wider">Traitement de Secours par SABA</p>

          <ul className="text-sm space-y-2 mb-4 text-slate-600 flex-grow list-disc list-inside pl-2">
             <li>Le traitement de secours est un Bêta-2-agoniste à Courte Durée d'Action (SABA).</li>
             <li>Nécessite un traitement de fond quotidien séparé (CSI ou CSI-BALA) à partir du Palier 2.</li>
             <li>L'observance du traitement de fond quotidien est cruciale pour réduire le risque d'exacerbation.</li>
          </ul>
          <Button 
            onClick={() => handlePathwaySelection('pathway2')} 
            fullWidth
            variant="primary"
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
            <p className="font-semibold text-slate-700">Considérations pour la Voie 2 :</p>
            <p className="mt-1 text-slate-600">
             Cette voie est une alternative si la Voie 1 n'est pas possible ou pas préférée par le patient. Elle peut également être appropriée pour les patients déjà stables avec un traitement de fond CSI et un secours SABA séparés, avec une bonne observance et sans exacerbations l'année précédente.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdultPathwaySelectionStep;
