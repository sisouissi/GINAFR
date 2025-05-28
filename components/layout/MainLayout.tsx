
import React, { ReactNode } from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { usePatientData } from '../../contexts/PatientDataContext';
import { ArrowLeft, RotateCcw, Info, Users, Stethoscope, FileText, BookOpen } from 'lucide-react'; // Ajout de BookOpen

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto max-w-5xl p-4 flex items-center">
        <FileText size={28} className="mr-3 text-sky-400" />
        <h1 className="text-xl font-medium tracking-tight">Guide de Prise en Charge de l'Asthme (GINA)</h1>
      </div>
    </header>
  );
};

const Footer: React.FC = () => {
  const { history, goBack, resetNavigation, currentStepId, navigateTo } = useNavigation();
  const { patientData } = usePatientData();

  return (
    <footer className="mt-auto py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex justify-between items-center mb-8">
          {history.length > 1 && currentStepId !== 'ABBREVIATIONS_STEP' ? (
            <button
              onClick={goBack}
              className="flex items-center px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md shadow-sm transition-colors duration-200 text-sm font-medium"
              aria-label="Aller à l'étape précédente"
            >
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </button>
          ) : (
             currentStepId === 'ABBREVIATIONS_STEP' ? ( // Si sur la page des abréviations, le bouton retour ramène à la page précédente
              <button
              onClick={goBack}
              className="flex items-center px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md shadow-sm transition-colors duration-200 text-sm font-medium"
              aria-label="Aller à l'étape précédente"
            >
              <ArrowLeft size={18} className="mr-2" />
              Retour au Guide
            </button>
             ) : 
            <div></div> // Placeholder si pas de retour possible
          )}
          <div className="flex items-center space-x-3">
            {currentStepId !== 'INITIAL_STEP' && currentStepId !== 'ABBREVIATIONS_STEP' && (
               <button
                  onClick={() => resetNavigation()}
                  className="flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md shadow-sm transition-colors duration-200 text-sm font-medium"
                  aria-label="Recommencer le guide"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Recommencer
              </button>
            )}
            {currentStepId !== 'ABBREVIATIONS_STEP' && (
                 <button
                    onClick={() => navigateTo('ABBREVIATIONS_STEP')}
                    className="flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md shadow-sm transition-colors duration-200 text-sm font-medium"
                    aria-label="Voir les abréviations"
                >
                    <BookOpen size={18} className="mr-2" />
                    Abréviations
                </button>
            )}
            {currentStepId === 'ABBREVIATIONS_STEP' && (
                 <button
                    onClick={() => resetNavigation()} // Recommencer ramène à l'accueil
                    className="flex items-center px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md shadow-sm transition-colors duration-200 text-sm font-medium"
                    aria-label="Retour à l'accueil"
                >
                    <RotateCcw size={18} className="mr-2" />
                    Accueil
                </button>
            )}
          </div>
        </div>

        <div className="bg-sky-50 border border-sky-300 p-4 rounded-lg text-sky-800 text-sm shadow-md">
          <div className="flex items-start">
            <Info size={20} className="mr-3 mt-0.5 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-sky-900">AVERTISSEMENT IMPORTANT</p>
              <p className="leading-relaxed">
                Cet outil est une aide à la décision basée sur les recommandations GINA. Il ne remplace PAS le jugement
                clinique professionnel. Toute décision thérapeutique doit être individualisée par un professionnel de santé.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">
          Outil GINA interactif développé par Dr Zouhair Souissi.
        </p>
        
        {/* Debug Info - can be removed for production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-slate-100 rounded-md text-xs text-slate-500 overflow-auto max-h-36 border border-slate-200">
            <p className="font-semibold text-slate-600">Infos de débogage :</p>
            <p>Étape actuelle : <span className="font-medium text-slate-700">{currentStepId}</span></p>
            <p>Historique : <span className="font-medium text-slate-700">{history.join(' -> ')}</span></p>
            <pre className="whitespace-pre-wrap break-all">Données Patient : {JSON.stringify(patientData, null, 2)}</pre>
          </div>
        )}
      </div>
    </footer>
  );
};

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col"> {/* Removed background from here, using body background */}
      <Header />
      <main className="container mx-auto max-w-5xl p-4 sm:p-6 md:p-8 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;