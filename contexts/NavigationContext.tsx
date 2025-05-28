
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { StepId, PatientData } from '../types'; // PatientData might be needed for conditional navigation
import { usePatientData } from './PatientDataContext';


interface NavigationContextType {
  currentStepId: StepId;
  history: StepId[];
  navigateTo: (stepId: StepId, updates?: Partial<PatientData>) => void;
  goBack: () => void;
  resetNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStepId, setCurrentStepId] = useState<StepId>('INITIAL_STEP');
  const [history, setHistory] = useState<StepId[]>(['INITIAL_STEP']);
  const { updatePatientData: updatePatientDataContext, resetPatientData } = usePatientData();


  const navigateTo = useCallback((stepId: StepId, updates?: Partial<PatientData>) => {
    if (updates) {
      updatePatientDataContext(updates);
    }
    setCurrentStepId(stepId);
    setHistory(prevHistory => [...prevHistory, stepId]);
  }, [updatePatientDataContext]);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current step
      const previousStepId = newHistory[newHistory.length - 1]; // Get the new current step
      
      // Potentially reset parts of patientData that were set by the step we are leaving
      // This logic can be complex and specific to each step transition.
      // For simplicity, we are not doing deep data reset on back, but this is where it would go.
      // Example: if going back from ADULT_TREATMENT_PLAN_STEP to ADULT_PATHWAY_SELECTION_STEP,
      // you might want to clear adult_currentGinaStep or parts of treatment selection.

      setCurrentStepId(previousStepId);
      setHistory(newHistory);
    }
  }, [history]);

  const resetNavigation = useCallback(() => {
    resetPatientData(); // Also reset patient data
    setCurrentStepId('INITIAL_STEP');
    setHistory(['INITIAL_STEP']);
  }, [resetPatientData]);

  return (
    <NavigationContext.Provider value={{ currentStepId, history, navigateTo, goBack, resetNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
