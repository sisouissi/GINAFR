
import React from 'react';
import { usePatientData } from '../../contexts/PatientDataContext';
import { useNavigation } from '../../contexts/NavigationContext';
import { useUIState } from '../../contexts/UIStateContext';
import { AgeGroup, ControlLevel, StepId } from '../../types';
import Button from '../ui/Button';
import SetReminderModalContent from './modal_content/SetReminderModalContent';
import { ListChecks, Route, Calendar, Bell, XCircle, Info, Zap, Printer } from '../../constants/icons';

interface ManagementCycleWidgetProps {
    ageGroup: AgeGroup;
}

const CycleStep: React.FC<{ icon: React.ReactElement, title: string, active?: boolean }> = ({ icon, title, active }) => (
    <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${active ? 'bg-sky-500 border-sky-600 text-white shadow-lg' : 'bg-slate-200 border-slate-300 text-slate-500'}`}>
            {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
        </div>
        <p className={`mt-2 text-sm font-semibold ${active ? 'text-sky-700' : 'text-slate-600'}`}>{title}</p>
    </div>
);

const ManagementCycleWidget: React.FC<ManagementCycleWidgetProps> = ({ ageGroup }) => {
    const { patientData, updatePatientData } = usePatientData();
    const { navigateTo } = useNavigation();
    const { openInfoModal } = useUIState();

    const controlLevel = patientData[`${ageGroup}_controlLevel` as const] as ControlLevel | null;
    const reminderDate = patientData[`${ageGroup}_reviewReminderDate` as const] as string | null;
    
    const prefix = ageGroup === 'youngChild' ? 'YOUNG_CHILD' : ageGroup.toUpperCase();
    const assessmentStepId = `${prefix}_CONTROL_ASSESSMENT_STEP` as StepId;
    const exacerbationStepId = `${prefix}_EXACERBATION_INTRO_STEP` as StepId;
    const reportStepId = `${prefix}_PRINT_REPORT` as StepId;

    const handleSetReminder = () => {
        openInfoModal("Définir un Rappel de Suivi", <SetReminderModalContent ageGroup={ageGroup} />);
    };
    
    const handleClearReminder = () => {
        updatePatientData({ [`${ageGroup}_reviewReminderDate`]: null });
    };

    return (
        <div className="p-5 bg-slate-50 rounded-lg border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Cycle de Prise en Charge de l'Asthme</h3>
            <div className="flex justify-around items-center mb-6">
                <CycleStep icon={<ListChecks />} title="1. Évaluer" active={!controlLevel} />
                <div className="flex-1 h-1 bg-slate-300 mx-2"></div>
                <CycleStep icon={<Route />} title="2. Ajuster" active={!!controlLevel} />
                <div className="flex-1 h-1 bg-slate-300 mx-2"></div>
                <CycleStep icon={<Calendar />} title="3. Réévaluer" active={!!reminderDate} />
            </div>

            <div className="p-4 bg-white rounded-md border border-slate-200 text-center">
                <h4 className="font-medium text-slate-700 mb-3">Prochaines Actions :</h4>
                <div className="flex flex-wrap justify-center gap-3">
                    <Button
                        onClick={() => navigateTo(assessmentStepId)}
                        variant="primary"
                        leftIcon={<ListChecks size={18} />}
                        aria-label="Évaluer le contrôle actuel de l'asthme"
                    >
                        {controlLevel ? "Ré-évaluer le Contrôle" : "Évaluer le Contrôle Actuel"}
                    </Button>

                    <Button onClick={handleSetReminder} variant="success" leftIcon={<Bell size={18} />}>
                        {reminderDate ? "Modifier le Rappel" : "Définir un Rappel"}
                    </Button>
                    
                    <Button 
                        onClick={() => navigateTo(exacerbationStepId)} 
                        variant="warning" 
                        leftIcon={<Zap size={18} />}
                        aria-label="Voir le plan d'exacerbation"
                    >
                        Gérer une Exacerbation
                    </Button>
                    <Button
                        onClick={() => navigateTo(reportStepId)}
                        variant="info"
                        leftIcon={<Printer size={18} />}
                        aria-label="Imprimer le rapport clinique"
                    >
                        Imprimer le Rapport
                    </Button>
                </div>

                 {reminderDate && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center gap-4">
                        <div className="flex items-center text-blue-700">
                           <Calendar size={18} className="mr-2"/>
                           <span className="text-sm font-medium">Prochain suivi prévu pour le : {new Date(reminderDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <Button onClick={handleClearReminder} variant="ghost" size="sm" className="!p-1 text-slate-400 hover:text-red-500" aria-label="Annuler le rappel">
                            <XCircle size={18}/>
                        </Button>
                    </div>
                 )}
                 {!reminderDate && controlLevel === 'wellControlled' && (
                     <div className="mt-4 p-2 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex items-center justify-center gap-2">
                        <Info size={14}/>
                        L'asthme est bien contrôlé. Pensez à définir un rappel pour le suivi.
                    </div>
                 )}
            </div>
        </div>
    );
};

export default ManagementCycleWidget;
