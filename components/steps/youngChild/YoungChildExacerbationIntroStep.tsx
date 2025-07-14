
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { AlertTriangle, ChevronRight, BookOpen, Baby, Zap } from 'lucide-react';

const YoungChildExacerbationIntroStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <Card title="Gestion des Épisodes de Sifflements (Jeune Enfant ≤5 ans)" icon={<Zap className="text-red-600"/>}>
      <p className="text-base text-slate-700 leading-relaxed mb-4">
        Les épisodes de sifflements ou les exacerbations d'asthme chez les jeunes enfants peuvent être angoissants et nécessitent une action rapide.
      </p>
      <p className="mb-6 text-sm text-slate-600">
        Cette section vous guidera dans l'évaluation de la gravité et les étapes de prise en charge appropriées basées sur les recommandations du GINA.
      </p>
      
      <div className="mb-6 p-4 bg-violet-50 border border-violet-200 rounded-lg"> {/* Thème violet */}
        <div className="flex items-start">
          <Baby size={20} className="mr-3 mt-1 text-violet-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-violet-800">Principes Clés pour les Jeunes Enfants :</h3>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>Toujours utiliser un aérosol-doseur avec une chambre d'inhalation à valve et un masque facial dédiés.</li>
              <li>La reconnaissance précoce par les parents/soignants et un traitement rapide sont cruciaux.</li>
              <li>Les parents doivent avoir un plan d'action écrit clair.</li>
              <li>Évaluer la gravité (aspect général, vigilance, fréquence respiratoire, signes de détresse, capacité à s'alimenter/parler).</li>
              <li>La surveillance de la SaO2 est utile si disponible.</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mb-6 text-center font-medium text-slate-700">
        Commençons par déterminer la gravité de l'épisode de sifflement actuel.
      </p>

      <div className="text-center">
        <Button 
          onClick={() => navigateTo('YOUNG_CHILD_EXACERBATION_SEVERITY_STEP')} 
          variant="danger" 
          size="xl"
          leftIcon={<AlertTriangle />}
          rightIcon={<ChevronRight />}
          aria-label="Évaluer la Gravité de l'Épisode"
        >
          Évaluer la Gravité
        </Button>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationIntroStep;
