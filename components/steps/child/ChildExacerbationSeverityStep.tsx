
import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { ExacerbationSeverity } from '../../../types';
import { Thermometer, Activity as IconActivity, AlertTriangle, ChevronRight, HelpCircle, ShieldAlert } from 'lucide-react'; // Renamed Activity to IconActivity to avoid conflict

const ChildExacerbationSeverityStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSeveritySelection = (severity: ExacerbationSeverity) => {
    navigateTo('CHILD_EXACERBATION_PLAN_STEP', { exacerbationSeverity: severity });
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
    <Card title="Évaluer la Sévérité de l'Exacerbation (Enfant 6-11 ans)" icon={<ShieldAlert className="text-red-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Évaluez les symptômes et signes de l'enfant. Chez l'enfant, observez attentivement le tirage (creusement thoracique) et l'état général.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeverityOptionCard
          title="Légère à Modérée"
          icon={<IconActivity className="text-amber-600" />}
          criteria={[
            "Parle avec des phrases, préfère être assis",
            "Non agité",
            "Fréquence respiratoire peut être augmentée",
            "Tirage léger ou absent",
            "Pouls habituellement <120-140 bpm (selon l'âge)",
            "SaO2 à l'air ambiant >92-94%",
            "Répond bien au BACA",
          ]}
          buttonLabel="Sélectionner Légère à Modérée"
          onClick={() => handleSeveritySelection('mildModerate')}
          variant="warning"
          className="border-amber-400 bg-amber-50 text-amber-800"
        />

        <SeverityOptionCard
          title="Sévère"
          icon={<AlertTriangle className="text-red-600" />}
          criteria={[
            "Parle avec mots/phrases courtes, assis penché",
            "Peut être agité ou en détresse",
            "Fréquence respiratoire souvent >30-40/min (selon l'âge)",
            "Tirage modéré à sévère, battement des ailes du nez",
            "Pouls souvent >140 bpm (selon l'âge)",
            "SaO2 à l'air ambiant ≤92%",
            "Faible réponse au BACA initial",
            "Signes de danger vital : Somnolence, confusion, silence auscultatoire, cyanose, épuisement.",
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
            <strong>Consulter immédiatement un médecin pour toute exacerbation sévère ou en cas de doute.</strong> Les signes de danger vital nécessitent une prise en charge médicale urgente (ex : ambulance).
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ChildExacerbationSeverityStep;
