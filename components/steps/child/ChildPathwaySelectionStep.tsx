
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ChildPathway } from '../../../types';
import { ChevronRight, HelpCircle, Route, Zap, Activity } from 'lucide-react'; // Zap for MART, Activity for SABA

const ChildPathwaySelectionStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handlePathwaySelection = (pathway: ChildPathway) => {
    navigateTo('CHILD_TREATMENT_PLAN_STEP', { child_pathway: pathway });
  };

  return (
    <Card title="Sélectionner la Voie Thérapeutique (Enfants 6-11 ans)" icon={<Route className="text-emerald-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Les recommandations GINA 2025 proposent deux voies thérapeutiques pour les enfants de 6-11 ans. La voie est choisie en fonction des préférences, de l'accès aux médicaments et des capacités de l'enfant et de sa famille.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voie 1 */}
        <div className="flex flex-col p-5 bg-white border-2 border-teal-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-teal-700 mb-2">Voie 1 (MART)</h3>
          <p className="text-xs text-teal-600 mb-3 font-medium uppercase tracking-wider">Basée sur CSI-Formotérol faible dose</p>
          
          <div className="text-sm space-y-1 mb-4 text-slate-600 flex-grow">
            <p><strong className="font-medium text-slate-700">Traitement de fond et de secours :</strong> CSI-formotérol (ex: Budésonide/Formotérol 80/4.5µg délivré) utilisé en traitement de fond ET comme soulageur PRN.</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-snug">
            Stratégie MART (Maintenance And Reliever Therapy). L'enfant utilise le même inhalateur pour son traitement de fond et pour soulager ses symptômes.
          </p>
          <Button 
            onClick={() => handlePathwaySelection('track1')} 
            fullWidth 
            variant="info" // Teal color often represented by 'info' or needs custom variant
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 1 (MART)"
            className="bg-teal-500 hover:bg-teal-600 focus:ring-teal-400 mt-auto"
          >
            Choisir Voie 1 (MART)
          </Button>
        </div>

        {/* Voie 2 */}
        <div className="flex flex-col p-5 bg-white border-2 border-emerald-500 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2">Voie 2 (Classique)</h3>
          <p className="text-xs text-emerald-600 mb-3 font-medium uppercase tracking-wider">Basée sur Soulageur BACA</p>

          <div className="text-sm space-y-1 mb-4 text-slate-600 flex-grow">
            <p><strong className="font-medium text-slate-700">Traitement de fond :</strong> CSI quotidien (ou CSI-BADA).</p>
            <p><strong className="font-medium text-slate-700">Traitement de secours :</strong> BACA PRN (si besoin).</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-snug">
            Utilise un Bêta-2 Agoniste de Courte Durée d'Action (BACA) pour le soulagement, avec un médicament de fond distinct pris régulièrement.
          </p>
          <Button 
            onClick={() => handlePathwaySelection('track2')} 
            fullWidth
            variant="success" 
            rightIcon={<ChevronRight />}
            aria-label="Sélectionner la Voie 2 (Classique)"
            className="mt-auto"
          >
            Choisir Voie 2 (Classique)
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-700">Considérations Importantes (Enfants 6-11 ans) :</p>
            <ul className="list-disc list-inside mt-1 text-slate-600 space-y-1">
              <li>La Voie 1 (MART) avec CSI-formotérol à faible dose peut être envisagée à partir du Palier 3 (ou comme option dès le Palier 1-2 dans certaines recommandations si l'enfant a des symptômes ≥2x/mois). Elle simplifie le traitement avec un seul inhalateur.</li>
              <li>La Voie 2 reste une option valide, en particulier si MART n'est pas disponible/préféré, ou si l'enfant est déjà bien contrôlé avec cette approche.</li>
              <li>Assurez-vous que l'enfant et les parents comprennent bien la stratégie choisie et la technique d'inhalation (avec chambre d'inhalation).</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChildPathwaySelectionStep;