import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import Card from '../ui/Card';
import Button from '../ui/Button'; // Importer le composant Button standard
import { Users, User, Baby, FileText, Link } from 'lucide-react'; // ChevronRight n'est plus nécessaire ici
import { StepId, AgeGroup } from '../../types';

// Le composant AgeSelectionButton personnalisé est supprimé.

export const InitialStep: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleAgeSelection = (
    ageGroup: AgeGroup,
    age: string,
    nextStep: StepId
  ) => {
    navigateTo(nextStep, { ageGroup, age });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      {/* Sidebar for age selection */}
      <div className="w-full lg:w-1/3 lg:max-w-xs xl:max-w-sm bg-white p-6 rounded-xl shadow-xl border border-slate-200 order-1 lg:order-none">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">Sélectionnez la Tranche d'Âge :</h2>
        <div className="space-y-4"> {/* Augmentation de l'espace pour un meilleur aspect */}
          <Button
            onClick={() => handleAgeSelection('adult', '12+', 'ADULT_DIAGNOSIS_STEP')}
            leftIcon={<Users />}
            variant="primary" // Bleu ciel
            className="w-full text-sm justify-start !py-3" // Tailwind `!py-3` pour forcer padding vertical
            size="md"
            aria-label="Adultes & Adolescents, 12 ans et plus"
          >
            Adultes & Adolescents <span className="font-normal opacity-80 ml-1">(12 ans et +)</span>
          </Button>
          
          <Button
            onClick={() => handleAgeSelection('child', '6-11', 'CHILD_DIAGNOSIS_STEP')}
            leftIcon={<User />}
            variant="success" // Vert émeraude
            className="w-full text-sm justify-start !py-3"
            size="md"
            aria-label="Enfants, 6 à 11 ans"
          >
            Enfants <span className="font-normal opacity-80 ml-1">(6-11 ans)</span>
          </Button>

          <Button
            onClick={() => handleAgeSelection('youngChild', '≤5', 'YOUNG_CHILD_DIAGNOSIS_STEP')}
            leftIcon={<Baby />}
            className="w-full text-sm justify-start !py-3 bg-violet-600 hover:bg-violet-700 text-white focus:ring-violet-500 shadow-sm"
            size="md"
            aria-label="Jeunes Enfants, 5 ans et moins"
          >
            Jeunes Enfants <span className="font-normal opacity-80 ml-1">(≤5 ans)</span>
          </Button>
        </div>
      </div>

      {/* Main content area for welcome message */}
      <div className="w-full lg:w-2/3 order-none lg:order-1">
        <Card
          icon={<FileText className="text-sky-600" />}
          title="GINA 2025 - Guide de Prise en Charge de l'Asthme"
          className="border-sky-300 bg-sky-50"
          footer={
            <p className="text-center text-xs text-slate-600">
              Application développée par Dr Zouhair Souissi.
            </p>
          }
        >
          <p className="text-slate-700 leading-relaxed mb-3">
            Bienvenue ! Cet outil interactif est conçu pour vous guider à travers les recommandations GINA 2025 pour la prise en charge de l'asthme.
            Veuillez sélectionner la tranche d'âge du patient pour commencer.
          </p>
          <p className="text-sm text-slate-600">
            Pour consulter le rapport complet GINA 2025, veuillez visiter : 
            <a 
              href="https://ginasthma.org/2025-gina-strategy-report/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sky-600 hover:text-sky-700 underline font-medium ml-1 inline-flex items-center"
            >
              ginasthma.org/2025-gina-strategy-report
              <Link size={14} className="ml-1" />
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};
