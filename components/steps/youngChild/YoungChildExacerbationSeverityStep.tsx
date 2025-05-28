
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { ExacerbationSeverity } from '../../../types';
import { Thermometer, Activity, AlertTriangle, ChevronRight, HelpCircle, Baby, ShieldAlert } from 'lucide-react';

const YoungChildExacerbationSeverityStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSeveritySelection = (severity: ExacerbationSeverity) => {
    navigateTo('YOUNG_CHILD_EXACERBATION_PLAN_STEP', { exacerbationSeverity: severity });
  };

  const SeverityOptionCard: React.FC<{
    title: string;
    icon: React.ReactElement;
    criteria: string[];
    buttonLabel: string;
    onClick: () => void;
    variant: 'warning' | 'danger';
    className?: string;
  }> = ({ title, icon, criteria, buttonLabel, onClick, variant, className }) => (
    <div className={`p-5 border-2 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col ${className}`}>
      <div className="flex items-center mb-3">
        {React.cloneElement(icon as React.ReactElement<{ size?: number; className?: string }>, { 
            size: 24, 
            className: `mr-2 ${(icon.props as any)?.className || ''}`.trim() 
        })}
        <h3 className={`text-xl font-semibold`}>{title}</h3>
      </div>
      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 pl-2 mb-4 flex-grow">
        {criteria.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <Button 
        onClick={onClick} 
        fullWidth 
        variant={variant}
        rightIcon={<ChevronRight />}
        aria-label={buttonLabel}
        className="mt-auto"
        size="lg"
      >
        {buttonLabel}
      </Button>
    </div>
  );

  return (
    <Card title="Évaluer la Sévérité de l'Épisode (Jeune Enfant ≤5 ans)" icon={<ShieldAlert className="text-red-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Évaluez les symptômes et signes de l'enfant. Portez une attention particulière aux signes de lutte respiratoire (tirage, battement des ailes du nez, geignement expiratoire), à la vivacité et à la capacité à s'alimenter.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <SeverityOptionCard
          title="Épisode Léger à Modéré"
          icon={<Activity className="text-amber-600" />}
          criteria={[
            "Alerte, interactif",
            "Tirage absent ou léger",
            "FR peut être légèrement augmentée",
            "Capable de s'alimenter/boire",
            "Pas de cyanose",
            "Répond au BACA initial",
            "SaO2 typiquement >92-94% (si mesurable)",
          ]}
          buttonLabel="Sélectionner Léger à Modéré"
          onClick={() => handleSeveritySelection('mildModerate')}
          variant="warning"
          className="border-amber-400 bg-amber-50 text-amber-800"
        />

        <SeverityOptionCard
          title="Épisode Sévère"
          icon={<AlertTriangle className="text-red-600" />}
          criteria={[
            "Vivacité réduite, léthargique, ou agité",
            "Tirage marqué, battement ailes du nez, geignement",
            "Fréquence respiratoire rapide",
            "Difficulté à s'alimenter/parler",
            "Cyanose (lèvres/langue bleues)",
            "Réponse faible/minimale au BACA initial",
            "SaO2 ≤92% (si mesurable)",
            "Signes de danger vital : Léthargie extrême, épuisement, silence auscultatoire, respiration très lente/apnée.",
          ]}
          buttonLabel="Sélectionner Sévère"
          onClick={() => handleSeveritySelection('severe')}
          variant="danger"
          className="border-red-500 bg-red-50 text-red-800"
        />
      </div>
       <div className="mt-8 p-4 bg-slate-100 border border-slate-200 rounded-lg text-sm">
        <div className="flex items-start">
          <HelpCircle size={20} className="mr-3 mt-0.5 flex-shrink-0 text-slate-500" />
          <p className="text-slate-600 leading-relaxed">
            <strong>Consulter immédiatement un médecin pour tout épisode sévère ou en cas de doute.</strong> Les signes de danger vital (ex : léthargie importante, difficultés respiratoires majeures, cyanose) nécessitent une prise en charge médicale d'urgence immédiate.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default YoungChildExacerbationSeverityStep;
