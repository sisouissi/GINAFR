
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { AlertTriangle, ChevronRight, BookOpen, Zap, Activity } from 'lucide-react';

const ChildExacerbationIntroStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <Card title="Prise en Charge des Exacerbations (Enfant 6-11 ans)" icon={<Zap className="text-red-600"/>}>
      <p className="text-base text-slate-700 leading-relaxed mb-4">
        Les exacerbations d'asthme chez l'enfant nécessitent une prise en charge rapide et appropriée.
      </p>
      <p className="mb-6 text-sm text-slate-600">
        Cette section aide à évaluer la sévérité d'une exacerbation et décrit les actions recommandées basées sur les directives GINA.
      </p>
      
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"> {/* Green theme */}
        <div className="flex items-start">
          <BookOpen size={20} className="mr-3 mt-1 text-emerald-500 flex-shrink-0" />
          <div>
            <h3 className="text-md font-semibold text-emerald-800">Principes Clés pour les Enfants :</h3>
            <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
              <li>Utiliser une chambre d'inhalation avec le pMDI pour le médicament de secours.</li>
              <li>Une reconnaissance et un traitement précoces sont vitaux.</li>
              <li>Les parents/soignants doivent avoir un plan d'action écrit pour l'asthme.</li>
              <li>Évaluer la sévérité en fonction des symptômes, de la capacité à parler, de la fréquence respiratoire et des signes de lutte respiratoire.</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mb-6 text-center font-medium text-slate-700">
        Déterminons la sévérité de l'exacerbation actuelle.
      </p>

      <div className="text-center">
        <Button 
          onClick={() => navigateTo('CHILD_EXACERBATION_SEVERITY_STEP')} 
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

export default ChildExacerbationIntroStep;