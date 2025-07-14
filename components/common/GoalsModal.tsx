import React from 'react';
import { useUIState } from '../../contexts/UIStateContext';
import Button from '../ui/Button';
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle } from '../../constants/icons';

const goals = {
    longTerm: [
        "Prévenir les exacerbations et les décès liés à l'asthme.",
        "Préserver la fonction pulmonaire le plus longtemps possible.",
        "Prévenir les effets indésirables des médicaments."
    ],
    shortTerm: [
        "Obtenir un bon contrôle des symptômes de l'asthme.",
        "Maintenir des niveaux d'activité normaux.",
    ]
};

const GoalsModal: React.FC = () => {
  const { isGoalsModalOpen, closeGoalsModal } = useUIState();

  if (!isGoalsModalOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={closeGoalsModal}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="w-full max-w-2xl bg-slate-50 shadow-2xl rounded-lg z-50 flex flex-col transform transition-all duration-300 max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-t-lg border-b border-slate-700">
          <div className="flex items-center">
            <ShieldCheck className="text-emerald-400 mr-3" size={24} />
            <h2 className="text-lg font-semibold">Objectifs GINA de la Prise en Charge de l'Asthme</h2>
          </div>
          <Button variant="ghost" onClick={closeGoalsModal} size="sm" className="!p-2 text-white hover:bg-slate-700" aria-label="Fermer la fenêtre">
            <XCircle size={20} />
          </Button>
        </header>

        <main className="p-6 space-y-5 overflow-y-auto">
          <p className="text-sm text-slate-600">
            Les objectifs à long terme de la prise en charge de l'asthme sont d'obtenir un bon contrôle des symptômes et de minimiser le risque de futurs résultats défavorables.
          </p>

          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <CheckCircle2 size={20} className="mr-2 text-emerald-600" />
              Contrôle des Symptômes
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
              {goals.shortTerm.map((goal, index) => <li key={`short-${index}`}>{goal}</li>)}
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
              <AlertTriangle size={20} className="mr-2 text-amber-600" />
              Réduction des Risques
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
              {goals.longTerm.map((goal, index) => <li key={`long-${index}`}>{goal}</li>)}
            </ul>
          </div>
          <p className="text-xs text-slate-500 text-center">Référence : Rapport GINA 2025, Encadré 2-1</p>
        </main>

        <footer className="p-4 bg-slate-100 rounded-b-lg text-right border-t border-slate-200">
          <Button onClick={closeGoalsModal} variant="secondary">
            Fermer
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default GoalsModal;
