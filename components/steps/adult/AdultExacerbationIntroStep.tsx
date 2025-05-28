
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { AlertTriangle, ChevronRight, BookOpen, Zap } from 'lucide-react';

const AdultExacerbationIntroStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <Card title="Prise en Charge des Exacerbations d'Asthme (Adultes)" icon={<Zap className="text-red-600"/>}>
      <p className="text-base text-slate-700 leading-relaxed mb-4">
        Une exacerbation d'asthme (crise) est une aggravation aiguë ou subaiguë des symptômes et de la fonction pulmonaire par rapport à l'état habituel du patient.
      </p>
      <p className="mb-6 text-sm text-slate-600">
        Une reconnaissance et une prise en charge rapides sont essentielles pour prévenir les issues graves.
        Cette section vous guidera dans l'évaluation de la sévérité et les actions appropriées basées sur les recommandations GINA.
      </p>
      
      <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
        <div className="flex items-start">
          <BookOpen size={20} className="mr-3 mt-1 text-sky-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-sky-800">Principes Clés de Prise en Charge :</h3>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>Évaluer rapidement la sévérité de l'exacerbation.</li>
              <li>Débuter rapidement le traitement de secours approprié.</li>
              <li>Pour les exacerbations modérées à sévères, des corticostéroïdes systémiques sont généralement requis.</li>
              <li>Identifier et traiter les facteurs déclenchants si possible.</li>
              <li>Fournir ou mettre à jour un plan d'action écrit pour l'asthme.</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mb-6 text-center font-medium text-slate-700">
        Commençons par déterminer la sévérité de l'exacerbation actuelle.
      </p>

      <div className="text-center">
        <Button 
          onClick={() => navigateTo('ADULT_EXACERBATION_SEVERITY_STEP')} 
          variant="danger" 
          size="xl"
          leftIcon={<AlertTriangle />}
          rightIcon={<ChevronRight />}
          aria-label="Évaluer la sévérité de l'exacerbation"
        >
          Évaluer la Sévérité
        </Button>
      </div>
    </Card>
  );
};

export default AdultExacerbationIntroStep;