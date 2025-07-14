
import React from 'react';
import AssessmentCard from './AssessmentCard';
import Button from '../../ui/Button';
import { useNavigation } from '../../../contexts/NavigationContext';
import { User, FileText } from 'lucide-react';

const Stage10_OngoingCare: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <AssessmentCard title="Soins Continus Collaboratifs" icon={<User />}>
      <div className="space-y-4">
        <h4 className="font-semibold text-lg text-slate-800">Objectifs de la Prise en Charge à Long Terme :</h4>
        <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
          <li>Atteindre une rémission clinique sous traitement si possible.</li>
          <li>Minimiser l'exposition aux CSO et les effets secondaires associés.</li>
          <li>Optimiser la qualité de vie et le statut fonctionnel.</li>
          <li>Répondre aux besoins sociaux et émotionnels du patient.</li>
          <li>Poursuivre la collaboration entre le spécialiste, le médecin traitant et le patient.</li>
          <li>Envisager l'inscription du patient dans des registres et/ou des essais cliniques pour faire progresser les connaissances.</li>
        </ul>
        <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <p className="text-sm font-medium text-green-800">
            Rappel : N'arrêtez pas complètement le traitement contenant des CSI, même avec une excellente réponse au traitement biologique, car cela entraîne un risque élevé de rechute.
          </p>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center">
          <Button
            onClick={() => navigateTo('SEVERE_ASTHMA_STAGE_11')}
            variant="success"
            size="lg"
            leftIcon={<FileText />}
          >
            Voir le Rapport Final
          </Button>
        </div>

      </div>
    </AssessmentCard>
  );
};

export default Stage10_OngoingCare;