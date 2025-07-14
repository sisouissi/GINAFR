
import React from 'react';
import { usePatientData } from '../../../contexts/PatientDataContext';
import { useUIState } from '../../../contexts/UIStateContext';
import { AgeGroup } from '../../../types';
import Button from '../../ui/Button';
import { Calendar } from '../../../constants/icons';

interface SetReminderModalContentProps {
  ageGroup: AgeGroup;
}

const SetReminderModalContent: React.FC<SetReminderModalContentProps> = ({ ageGroup }) => {
  const { updatePatientData } = usePatientData();
  const { closeInfoModal } = useUIState();

  const handleSetReminder = (months: number) => {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + months);
    updatePatientData({ [`${ageGroup}_reviewReminderDate`]: futureDate.toISOString() });
    closeInfoModal();
  };

  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <Calendar className="h-6 w-6 text-blue-600" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-medium leading-6 text-slate-900">Définir un Rappel de Suivi</h3>
      <p className="text-sm text-slate-600">
        Quand le contrôle de l'asthme du patient doit-il être formellement réévalué ? Un intervalle de 3 mois est généralement recommandé pour les patients stables.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Button onClick={() => handleSetReminder(1)} variant="secondary">1 Mois</Button>
        <Button onClick={() => handleSetReminder(3)} variant="primary">3 Mois</Button>
        <Button onClick={() => handleSetReminder(6)} variant="secondary">6 Mois</Button>
      </div>
    </div>
  );
};

export default SetReminderModalContent;