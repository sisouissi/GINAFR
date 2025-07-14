
import React, { ReactNode } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button'; 
import { ArrowLeft, RotateCcw, Info, BookOpen, MessageCircle, ShieldCheck, Stethoscope, ClipboardList, ShieldAlert, Users, Leaf, Home, Lightbulb } from '../../constants/icons';
import NonPharmacologicalStrategyContent from '../common/modal_content/NonPharmacologicalStrategyContent';
import ClinicalPhenotypesContent from '../common/modal_content/ClinicalPhenotypesContent';

const Header: React.FC = () => {
  const { currentStepId, navigateTo, resetNavigation } = useNavigation();

  return (
    <header className="bg-slate-900 text-white shadow-lg no-print">
      <div className="container mx-auto max-w-7xl p-4 flex items-center gap-4">
        <div className="flex items-center flex-1 min-w-0">
            <Lightbulb className="w-8 h-8 mr-3 text-amber-400 flex-shrink-0" />
            <h1 className="text-xl font-medium tracking-tight truncate">Outil conforme aux recommandations GINA 2025</h1>
        </div>
        <div className="flex items-center flex-shrink-0 space-x-3">
          <Button
            onClick={resetNavigation}
            leftIcon={<Home size={18} />}
            aria-label="Aller à l'accueil"
            variant="primary"
          >
            Accueil
          </Button>
          {currentStepId !== 'ABBREVIATIONS_STEP' && (
            <Button
              onClick={() => navigateTo('ABBREVIATIONS_STEP')}
              leftIcon={<BookOpen size={18} />}
              aria-label="Voir les abréviations"
              variant="yellow"
            >
              Abréviations
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  const { history, goBack, resetNavigation, currentStepId } = useNavigation();
  const { openGoalsModal, openManagementPanel, openDiagnosisPanel, openSevereAsthmaPanel, openInfoModal } = useUIState();

  const handleGoBack = () => {
    if (currentStepId === 'ABBREVIATIONS_STEP') {
      const prevHistory = [...history];
      prevHistory.pop(); 
      if(prevHistory.length > 0) {
         goBack(); 
      } else {
        resetNavigation();
      }
    } else {
      goBack();
    }
  };


  return (
    <footer className="py-8 no-print">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center mb-8">
          {history.length > 1 ? (
            <Button
              onClick={handleGoBack}
              variant="secondary"
              leftIcon={<ArrowLeft size={18} />}
              aria-label="Aller à l'étape précédente"
            >
              Retour
            </Button>
          ) : (
            <div></div> // Espace réservé si pas de retour possible
          )}
          <div className="flex items-center space-x-3">
            {currentStepId !== 'INITIAL_STEP' && (
               <Button
                  onClick={() => resetNavigation()}
                  variant="secondary"
                  leftIcon={<RotateCcw size={18} />}
                  aria-label="Recommencer le guide"
                >
                  Recommencer
              </Button>
            )}
             {currentStepId === 'INITIAL_STEP' && (
                <div className="flex flex-wrap gap-3 justify-end">
                  <Button
                      onClick={openSevereAsthmaPanel}
                      variant="danger"
                      leftIcon={<ShieldAlert size={18} />}
                      aria-label="Voir le guide de l'asthme sévère"
                  >
                      Asthme Sévère
                  </Button>
                   <Button
                      onClick={openManagementPanel}
                      variant="primary"
                      leftIcon={<ClipboardList size={18} />}
                      aria-label="Commencer le guide de prise en charge"
                  >
                      Prise en charge
                  </Button>
                  <Button
                      onClick={openDiagnosisPanel}
                      variant="info"
                      leftIcon={<Stethoscope size={18} />}
                      aria-label="Voir le guide de diagnostic initial GINA"
                  >
                      Diagnostic
                  </Button>
                   <Button
                      onClick={() => openInfoModal("Phénotypes de l'Asthme", <ClinicalPhenotypesContent />)}
                      variant="teal"
                      leftIcon={<Users size={18} />}
                      aria-label="Voir les phénotypes de l'asthme"
                  >
                      Phénotypes
                  </Button>
                   <Button
                      onClick={openGoalsModal}
                      variant="success"
                      leftIcon={<ShieldCheck size={18} />}
                      aria-label="Voir les objectifs de prise en charge GINA"
                  >
                      Objectifs
                  </Button>
                </div>
            )}
            {currentStepId !== 'INITIAL_STEP' && (
                 <Button
                    onClick={openGoalsModal}
                    variant="success"
                    leftIcon={<ShieldCheck size={18} />}
                    aria-label="Voir les objectifs de prise en charge GINA"
                >
                    Objectifs
                </Button>
            )}
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-300 p-4 rounded-lg text-sky-800 text-sm shadow-md">
          <div className="flex items-start">
            <Info size={20} className="mr-3 mt-0.5 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-sky-900">AVIS DE NON-RESPONSABILITÉ IMPORTANT</p>
              <p className="leading-relaxed">
                Cet outil est une aide à la décision basée sur les recommandations du GINA. Il NE remplace PAS le jugement
                clinique professionnel. Toutes les décisions de traitement doivent être individualisées par un professionnel de santé.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          © Application développée par le Dr. Zouhair Souissi
        </p>
      </div>
    </footer>
  );
};

export const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { openAIPanel } = useUIState();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
        {children}
      </main>
      <Footer />
      <div className="fixed bottom-6 right-6 z-30 no-print">
        <Button
            onClick={openAIPanel}
            variant="danger"
            className="rounded-full w-16 h-16 shadow-xl hover:shadow-2xl focus:shadow-xl flex items-center justify-center animate-pulse-shadow"
            aria-label="Demandez à l'expert"
        >
            <MessageCircle size={28} />
        </Button>
      </div>
    </div>
  );
};
