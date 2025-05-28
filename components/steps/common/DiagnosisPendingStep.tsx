
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { HelpCircle, ArrowLeft, AlertTriangle } from 'lucide-react';

const DiagnosisPendingStep: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Card 
      title="Confirmation Diagnostique Nécessaire" 
      icon={<AlertTriangle className="text-amber-500" />}
      className="border-amber-300 bg-amber-50"
    >
      <p className="text-slate-700 leading-relaxed mb-4">
        Le diagnostic d'asthme doit être confirmé avant de poursuivre avec ce guide de prise en charge.
        Une évaluation clinique approfondie est requise.
      </p>
      <div className="mb-6 p-4 bg-white border border-slate-200 rounded-md">
        <h3 className="font-semibold text-slate-800 mb-2">Critères diagnostiques clés de l'asthme (GINA) :</h3>
        <ul className="list-disc list-inside mb-2 pl-4 space-y-1 text-slate-600 text-sm">
          <li>Antécédents de symptômes respiratoires variables (sibilances, essoufflement, oppression thoracique, toux).</li>
          <li>Confirmation d'une variabilité excessive de la fonction pulmonaire (ex : spirométrie avec réversibilité au bronchodilatateur, variabilité du DEP).</li>
        </ul>
        <p className="text-xs text-slate-500">
          Veuillez vous référer aux Encarts GINA 1-1 et 1-2 pour les critères et procédures diagnostiques détaillés.
          Il est important d'envisager des diagnostics alternatifs si les symptômes ne sont pas typiques ou ne répondent pas au traitement de l'asthme.
        </p>
      </div>
      
      <div className="text-center">
        <Button onClick={goBack} variant="secondary" leftIcon={<ArrowLeft />} size="lg">
          Retour
        </Button>
      </div>
    </Card>
  );
};

export default DiagnosisPendingStep;