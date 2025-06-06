import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { ExacerbationSeverity } from '../../../types';
import { Thermometer, Activity, AlertTriangle, ChevronRight, HelpCircle, ShieldAlert } from 'lucide-react';

const AdultExacerbationSeverityStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleSeveritySelection = (severity: ExacerbationSeverity) => {
    navigateTo('ADULT_EXACERBATION_PLAN_STEP', { exacerbationSeverity: severity });
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
    <Card title="Évaluer la Sévérité de l'Exacerbation (Adultes & Adolescents)" icon={<ShieldAlert className="text-red-600" />}>
      <p className="mb-6 text-sm text-slate-600 leading-relaxed">
        Évaluez les symptômes et signes du patient pour classifier la sévérité de l'exacerbation.
        Cela guidera le plan de prise en charge immédiat (basé sur GINA 2025, Encart 9-4).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SeverityOptionCard
          title="Légère à Modérée"
          icon={<Activity className="text-amber-600" />}
          criteria={[
            "Parle avec des phrases",
            "Préfère être assis plutôt que couché",
            "Pas agité",
            "Fréquence respiratoire augmentée",
            "Muscles accessoires non utilisés",
            "Pouls 100-120 bpm",
            "SaO2 à l'air ambiant 90-95%",
            "DEP >50% du théorique/personnel meilleur",
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
            "Parle avec des mots",
            "Assis penché en avant",
            "Agité",
            "Fréquence respiratoire >30/min",
            "Muscles accessoires utilisés",
            "Pouls >120 bpm",
            "SaO2 à l'air ambiant <90%",
            "DEP ≤50% du théorique/personnel meilleur",
            "Signes de danger vital : Somnolence, confusion, silence auscultatoire.",
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
            <strong>Toujours considérer les signes de mise en jeu du pronostic vital :</strong> Somnolence, confusion, ou un silence auscultatoire indiquent une exacerbation nécessitant une intervention médicale d'urgence immédiate, quels que soient les autres signes.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AdultExacerbationSeverityStep;