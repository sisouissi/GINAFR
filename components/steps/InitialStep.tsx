
import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Users, User, Baby, FileText, Link, BookOpen, Leaf } from '../../constants/icons';
import { StepId, AgeGroup } from '../../types';
import DiagnosisPanel from '../common/DiagnosisPanel';
import SevereAsthmaPanel from '../common/SevereAsthmaPanel';
import NonPharmacologicalStrategyContent from '../common/modal_content/NonPharmacologicalStrategyContent';

const AgeSelectionPanel: React.FC = () => {
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();
    
    const handleAgeSelection = (
        ageGroup: AgeGroup,
        age: string,
        nextStep: StepId
      ) => {
        navigateTo(nextStep, { ageGroup, age });
      };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 text-slate-700">Options de prise en charge :</h2>
            <p className="text-sm text-slate-600 mb-4">Sélectionnez un groupe d'âge pour commencer le guide de prise en charge étape par étape.</p>
            <div className="space-y-3">
                <Button
                onClick={() => handleAgeSelection('adult', '12+ ans', 'ADULT_DIAGNOSIS_STEP')}
                leftIcon={<Users />}
                variant="primary" // Sky blue
                fullWidth
                aria-label="Adultes & Adolescents, 12 ans et plus"
                >
                Adultes & Adolescents <span className="font-normal opacity-80 ml-1">(12+ ans)</span>
                </Button>
                
                <Button
                onClick={() => handleAgeSelection('child', '6-11 ans', 'CHILD_DIAGNOSIS_STEP')}
                leftIcon={<User />} // Using User for child 6-11
                variant="success" // Emerald green
                fullWidth
                aria-label="Enfants, 6 à 11 ans"
                >
                Enfants <span className="font-normal opacity-80 ml-1">(6-11 ans)</span>
                </Button>

                <Button
                onClick={() => handleAgeSelection('youngChild', '<=5 ans', 'YOUNG_CHILD_DIAGNOSIS_STEP')}
                leftIcon={<Baby />}
                variant="violet"
                fullWidth
                aria-label="Jeunes Enfants, 5 ans et moins"
                >
                Jeunes Enfants <span className="font-normal opacity-80 ml-1">{'<=5 ans'}</span>
                </Button>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-200">
                <Button
                    onClick={() => openInfoModal("Stratégies Non Pharmacologiques", <NonPharmacologicalStrategyContent/>)}
                    leftIcon={<Leaf />}
                    variant="lime"
                    fullWidth
                    aria-label="Voir les stratégies non pharmacologiques"
                >
                    Stratégies Non Pharmacologiques
                </Button>
            </div>
        </div>
    );
};

export const InitialStep: React.FC = () => {
  const { activePanel } = useUIState();

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      {/* Sidebar for panels - conditional */}
      {activePanel && (
        <div className="w-full lg:w-1/3 lg:max-w-sm xl:max-w-md bg-white p-6 rounded-xl shadow-xl border border-slate-200 order-1 lg:order-none">
          {activePanel === 'management' && <AgeSelectionPanel />}
          {activePanel === 'diagnosis' && <DiagnosisPanel />}
          {activePanel === 'severeAsthma' && <SevereAsthmaPanel />}
        </div>
      )}

      {/* Main content area */}
      <div className={`w-full ${activePanel ? 'lg:w-2/3 order-none lg:order-1' : ''}`}>
        <Card
          icon={<FileText className="text-sky-600" />}
          title="Outil numérique d'aide au diagnostic, au traitement et au suivi de l'asthme"
          className="border-sky-300 bg-sky-50"
        >
          <p className="text-slate-700 leading-relaxed mb-3 text-justify">
            GINA est un guide de référence complet, fondé sur des preuves et mis à jour annuellement pour le diagnostic et la prise en charge de l'asthme. Cet outil interactif offre aux cliniciens une méthode rapide pour utiliser les informations du GINA afin d'aider à décider si une personne souffre d'asthme et de décider rapidement d'une prise en charge et d'un suivi appropriés. Cependant, les cliniciens doivent se référer au{' '}
            <a 
                href="https://ginasthma.org/2025-gina-summary-guide/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sky-600 hover:text-sky-700 underline font-medium inline-flex items-center"
            >
                Global Strategy for Asthma Management and Prevention 2025
                <Link size={12} className="ml-1" />
            </a>
            {' '}et si plus de détails sont nécessaires, se référer au site officiel de {' '}
             <a 
                href="https://ginasthma.org/2025-gina-strategy-report/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sky-600 hover:text-sky-700 underline font-medium inline-flex items-center"
            >
                Global Initiative for Asthma (GINA)
                <Link size={12} className="ml-1" />
            </a>.
          </p>
        </Card>
        
        {!activePanel && (
          <div className="mt-6 space-y-6">
              <Card
                  title="Qu'est-ce que l'asthme ? (Définition GINA 2025)"
                  icon={<BookOpen className="text-violet-600" />}
                  className="border-violet-200 bg-violet-50"
              >
                  <div className="text-slate-700 leading-relaxed text-justify">
                      <p>
                          L'asthme est une maladie hétérogène, habituellement caractérisée par une inflammation chronique des voies respiratoires. Il est défini par l'historique de symptômes respiratoires tels que sibilants, essoufflement, oppression thoracique et toux qui varient dans le temps et en intensité, associés à une limitation variable du débit expiratoire.
                      </p>
                  </div>
              </Card>
          </div>
        )}
      </div>
    </div>
  );
};
