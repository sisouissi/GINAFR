
import React from 'react';
import { useNavigation } from '../../../contexts/NavigationContext';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { ChevronRight, HelpCircle, ClipboardList } from 'lucide-react';
import { ChildGINASteps } from '../../../types';

const ChildInitialAssessmentStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSelection = (initialGinaStep: ChildGINASteps) => {
    navigateTo('CHILD_RISK_ASSESSMENT_STEP', {
      child_currentGinaStep: initialGinaStep,
    });
  };
  
  const FlowchartSection: React.FC<{
    title: string;
    description: React.ReactNode;
    startStep: string;
    recommendedTreatment: string;
    note?: string;
    children: React.ReactNode;
  }> = ({ title, description, startStep, recommendedTreatment, note, children }) => (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
      <h3 className="font-bold text-lg text-slate-800">{title}</h3>
      <div className="text-sm text-slate-600 my-2">{description}</div>
      <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-100">
        <p className="text-sm font-semibold text-slate-700">Début Recommandé : <span className="text-emerald-600 font-bold">{startStep}</span></p>
        <div className="mt-2 text-xs space-y-1">
          <p><strong className="text-emerald-700">Traitement Initial :</strong> {recommendedTreatment}</p>
          {note && <p className="mt-1 text-slate-500">{note}</p>}
        </div>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );

  return (
    <Card title="Organigramme pour le Traitement Initial (Enfants 6-11 ans)" icon={<ClipboardList className="text-emerald-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        En fonction du schéma symptomatique de l'enfant, sélectionnez le point de départ le plus approprié pour le traitement initial selon GINA 2025, Encadré 4-11.
      </p>
      <div className="space-y-6">
        
        <FlowchartSection
          title="Présentation Sévère / Risque Élevé"
          description={
            <p>Symptômes la plupart des jours ou réveil nocturne {'au moins une fois par semaine'}, <strong>ET</strong> fonction pulmonaire basse.</p>
          }
          startStep="Palier 3/4"
          recommendedTreatment="CSI-BALA à dose moyenne ou CSI à dose moyenne. Envisager un avis d'expert."
          note="Le MART est aussi une option. Le traitement initial peut être celui d'une exacerbation."
        >
          <Button 
            onClick={() => handleSelection(4)} // Commence techniquement au palier 4 si une orientation est envisagée.
            variant="danger"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner Présentation Sévère
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Symptômes Persistants Modérés"
          description={
            <p>Symptômes <strong>la plupart des jours</strong>, OU <strong>réveil nocturne</strong> une ou plusieurs fois par semaine.</p>
          }
          startStep="Palier 3"
          recommendedTreatment="CSI-BALA à faible dose ou CSI à dose moyenne, plus SABA à la demande. CSI-formotérol à très faible dose en MART est une alternative."
        >
          <Button
            onClick={() => handleSelection(3)}
            variant="orange"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner Symptômes Modérés
          </Button>
        </FlowchartSection>

        <FlowchartSection
          title="Symptômes Persistants Légers"
          description={
             <p>Symptômes <strong>2 à 5 jours par semaine</strong>.</p>
          }
          startStep="Palier 2"
          recommendedTreatment="CSI à faible dose quotidien plus SABA à la demande."
        >
          <Button
            onClick={() => handleSelection(2)}
            variant="yellow"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner Symptômes Légers
          </Button>
        </FlowchartSection>

         <FlowchartSection
          title="Symptômes Peu Fréquents"
          description={
             <p>Symptômes <strong>moins de deux jours par semaine</strong>.</p>
          }
          startStep="Palier 1"
          recommendedTreatment="Prendre un CSI à faible dose à chaque utilisation de SABA."
           note="L'observance au CSI quotidien est susceptible d'être très faible dans ce groupe, faisant du CSI à la demande une meilleure option."
        >
          <Button
            onClick={() => handleSelection(1)}
            variant="secondary"
            fullWidth
            rightIcon={<ChevronRight />}
            size="lg"
          >
            Sélectionner Symptômes Peu Fréquents
          </Button>
        </FlowchartSection>
      </div>

       <div className="mt-8 p-3 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={18} className="mr-2 mt-0.5 text-slate-500 flex-shrink-0" />
          <p className="text-slate-600">
            Cet organigramme guide le choix du palier de traitement GINA initial. L'écran suivant évaluera les facteurs de risque spécifiques.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ChildInitialAssessmentStep;
