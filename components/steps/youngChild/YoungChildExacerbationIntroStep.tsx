
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { AlertTriangle, ChevronRight, BookOpen, Baby, Zap } from 'lucide-react';

const YoungChildExacerbationIntroStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <Card title="Prise en Charge des Épisodes de Sibilances (Jeune Enfant ≤5 ans)" icon={<Zap className="text-red-600"/>}>
      <p className="text-base text-slate-700 leading-relaxed mb-4">
        Les épisodes de sibilances ou exacerbations d'asthme chez les jeunes enfants peuvent être angoissants et nécessitent une action rapide.
      </p>
      <p className="mb-6 text-sm text-slate-600">
        Cette section vous guidera dans l'évaluation de la sévérité et les étapes de prise en charge appropriées basées sur les recommandations GINA.
      </p>
      
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg"> {/* Violet theme */}
        <div className="flex items-start">
          <Baby size={20} className="mr-3 mt-1 text-violet-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-violet-800">Principes Clés pour les Jeunes Enfants :</h3>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>Toujours utiliser un pMDI avec une chambre d'inhalation dédiée et un masque facial.</li>
              <li>Une reconnaissance précoce par les parents/soignants et un traitement rapide sont cruciaux.</li>
              <li>Les parents devraient avoir un plan d'action écrit clair.</li>
              <li>Évaluer la sévérité (aspect général, vivacité, FR, signes de lutte, capacité à s'alimenter/parler).</li>
              <li>La surveillance de la SaO2 est utile si disponible.</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mb-6 text-center font-medium text-slate-700">
        Commençons par déterminer la sévérité de l'épisode de sibilances actuel.
      </p>

      <div className="text-center">
        <Button 
          onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_SEVERITY_STEP')} 
          variant="danger" 
          size="xl"
          leftIcon={<AlertTriangle />}
          rightIcon={<ChevronRight />}
          aria-label="Évaluer la sévérité de l'épisode"
        >
          Évaluer la Sévérité
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationIntroStep;